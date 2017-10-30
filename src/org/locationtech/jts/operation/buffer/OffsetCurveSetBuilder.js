import Location from '../../geom/Location';
import LineString from '../../geom/LineString';
import Position from '../../geomgraph/Position';
import Point from '../../geom/Point';
import NodedSegmentString from '../../noding/NodedSegmentString';
import Polygon from '../../geom/Polygon';
import MultiPoint from '../../geom/MultiPoint';
import LinearRing from '../../geom/LinearRing';
import extend from '../../../../../extend';
import Orientation from '../../algorithm/Orientation';
import MultiPolygon from '../../geom/MultiPolygon';
import Label from '../../geomgraph/Label';
import GeometryCollection from '../../geom/GeometryCollection';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
import Distance from '../../algorithm/Distance';
import MultiLineString from '../../geom/MultiLineString';
import Triangle from '../../geom/Triangle';
export default function OffsetCurveSetBuilder() {
	this._inputGeom = null;
	this._distance = null;
	this._curveBuilder = null;
	this._curveList = new ArrayList();
	let inputGeom = arguments[0], distance = arguments[1], curveBuilder = arguments[2];
	this._inputGeom = inputGeom;
	this._distance = distance;
	this._curveBuilder = curveBuilder;
}
extend(OffsetCurveSetBuilder.prototype, {
	addPoint: function (p) {
		if (this._distance <= 0.0) return null;
		var coord = p.getCoordinates();
		var curve = this._curveBuilder.getLineCurve(coord, this._distance);
		this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
	},
	addPolygon: function (p) {
		var offsetDistance = this._distance;
		var offsetSide = Position.LEFT;
		if (this._distance < 0.0) {
			offsetDistance = -this._distance;
			offsetSide = Position.RIGHT;
		}
		var shell = p.getExteriorRing();
		var shellCoord = CoordinateArrays.removeRepeatedPoints(shell.getCoordinates());
		if (this._distance < 0.0 && this.isErodedCompletely(shell, this._distance)) return null;
		if (this._distance <= 0.0 && shellCoord.length < 3) return null;
		this.addPolygonRing(shellCoord, offsetDistance, offsetSide, Location.EXTERIOR, Location.INTERIOR);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			var holeCoord = CoordinateArrays.removeRepeatedPoints(hole.getCoordinates());
			if (this._distance > 0.0 && this.isErodedCompletely(hole, -this._distance)) continue;
			this.addPolygonRing(holeCoord, offsetDistance, Position.opposite(offsetSide), Location.INTERIOR, Location.EXTERIOR);
		}
	},
	isTriangleErodedCompletely: function (triangleCoord, bufferDistance) {
		var tri = new Triangle(triangleCoord[0], triangleCoord[1], triangleCoord[2]);
		var inCentre = tri.inCentre();
		var distToCentre = Distance.pointToSegment(inCentre, tri.p0, tri.p1);
		return distToCentre < Math.abs(bufferDistance);
	},
	addLineString: function (line) {
		if (this._distance <= 0.0 && !this._curveBuilder.getBufferParameters().isSingleSided()) return null;
		var coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
		var curve = this._curveBuilder.getLineCurve(coord, this._distance);
		this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
	},
	addCurve: function (coord, leftLoc, rightLoc) {
		if (coord === null || coord.length < 2) return null;
		var e = new NodedSegmentString(coord, new Label(0, Location.BOUNDARY, leftLoc, rightLoc));
		this._curveList.add(e);
	},
	getCurves: function () {
		this.add(this._inputGeom);
		return this._curveList;
	},
	addPolygonRing: function (coord, offsetDistance, side, cwLeftLoc, cwRightLoc) {
		if (offsetDistance === 0.0 && coord.length < LinearRing.MINIMUM_VALID_SIZE) return null;
		var leftLoc = cwLeftLoc;
		var rightLoc = cwRightLoc;
		if (coord.length >= LinearRing.MINIMUM_VALID_SIZE && Orientation.isCCW(coord)) {
			leftLoc = cwRightLoc;
			rightLoc = cwLeftLoc;
			side = Position.opposite(side);
		}
		var curve = this._curveBuilder.getRingCurve(coord, side, offsetDistance);
		this.addCurve(curve, leftLoc, rightLoc);
	},
	add: function (g) {
		if (g.isEmpty()) return null;
		if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof LineString) this.addLineString(g); else if (g instanceof Point) this.addPoint(g); else if (g instanceof MultiPoint) this.addCollection(g); else if (g instanceof MultiLineString) this.addCollection(g); else if (g instanceof MultiPolygon) this.addCollection(g); else if (g instanceof GeometryCollection) this.addCollection(g); else throw new UnsupportedOperationException(g.getClass().getName());
	},
	isErodedCompletely: function (ring, bufferDistance) {
		var ringCoord = ring.getCoordinates();
		var minDiam = 0.0;
		if (ringCoord.length < 4) return bufferDistance < 0;
		if (ringCoord.length === 4) return this.isTriangleErodedCompletely(ringCoord, bufferDistance);
		var env = ring.getEnvelopeInternal();
		var envMinDimension = Math.min(env.getHeight(), env.getWidth());
		if (bufferDistance < 0.0 && 2 * Math.abs(bufferDistance) > envMinDimension) return true;
		return false;
	},
	addCollection: function (gc) {
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = gc.getGeometryN(i);
			this.add(g);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OffsetCurveSetBuilder;
	}
});
