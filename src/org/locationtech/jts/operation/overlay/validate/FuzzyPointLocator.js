import PointLocator from '../../../algorithm/PointLocator';
import Location from '../../../geom/Location';
import GeometryFactory from '../../../geom/GeometryFactory';
import Polygon from '../../../geom/Polygon';
import extend from '../../../../../../extend';
import LineSegment from '../../../geom/LineSegment';
import ArrayList from '../../../../../../java/util/ArrayList';
import GeometryFilter from '../../../geom/GeometryFilter';
export default function FuzzyPointLocator() {
	this._g = null;
	this._boundaryDistanceTolerance = null;
	this._linework = null;
	this._ptLocator = new PointLocator();
	this._seg = new LineSegment();
	let g = arguments[0], boundaryDistanceTolerance = arguments[1];
	this._g = g;
	this._boundaryDistanceTolerance = boundaryDistanceTolerance;
	this._linework = this.extractLinework(g);
}
extend(FuzzyPointLocator.prototype, {
	isWithinToleranceOfBoundary: function (pt) {
		for (var i = 0; i < this._linework.getNumGeometries(); i++) {
			var line = this._linework.getGeometryN(i);
			var seq = line.getCoordinateSequence();
			for (var j = 0; j < seq.size() - 1; j++) {
				seq.getCoordinate(j, this._seg.p0);
				seq.getCoordinate(j + 1, this._seg.p1);
				var dist = this._seg.distance(pt);
				if (dist <= this._boundaryDistanceTolerance) return true;
			}
		}
		return false;
	},
	getLocation: function (pt) {
		if (this.isWithinToleranceOfBoundary(pt)) return Location.BOUNDARY;
		return this._ptLocator.locate(pt, this._g);
	},
	extractLinework: function (g) {
		var extracter = new PolygonalLineworkExtracter();
		g.apply(extracter);
		var linework = extracter.getLinework();
		var lines = GeometryFactory.toLineStringArray(linework);
		return g.getFactory().createMultiLineString(lines);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return FuzzyPointLocator;
	}
});
function PolygonalLineworkExtracter() {
	this._linework = null;
	this._linework = new ArrayList();
}
extend(PolygonalLineworkExtracter.prototype, {
	getLinework: function () {
		return this._linework;
	},
	filter: function (g) {
		if (g instanceof Polygon) {
			var poly = g;
			this._linework.add(poly.getExteriorRing());
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				this._linework.add(poly.getInteriorRingN(i));
			}
		}
	},
	interfaces_: function () {
		return [GeometryFilter];
	},
	getClass: function () {
		return PolygonalLineworkExtracter;
	}
});
