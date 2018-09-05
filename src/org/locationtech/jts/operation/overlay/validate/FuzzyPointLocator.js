import PointLocator from '../../../algorithm/PointLocator';
import Location from '../../../geom/Location';
import GeometryFactory from '../../../geom/GeometryFactory';
import Polygon from '../../../geom/Polygon';
import LineSegment from '../../../geom/LineSegment';
import ArrayList from '../../../../../../java/util/ArrayList';
import GeometryFilter from '../../../geom/GeometryFilter';
export default class FuzzyPointLocator {
	constructor() {
		FuzzyPointLocator.constructor_.apply(this, arguments);
	}
	isWithinToleranceOfBoundary(pt) {
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
	}
	getLocation(pt) {
		if (this.isWithinToleranceOfBoundary(pt)) return Location.BOUNDARY;
		return this._ptLocator.locate(pt, this._g);
	}
	extractLinework(g) {
		var extracter = new PolygonalLineworkExtracter();
		g.apply(extracter);
		var linework = extracter.getLinework();
		var lines = GeometryFactory.toLineStringArray(linework);
		return g.getFactory().createMultiLineString(lines);
	}
	getClass() {
		return FuzzyPointLocator;
	}
	get interfaces_() {
		return [];
	}
}
FuzzyPointLocator.constructor_ = function () {
	this._g = null;
	this._boundaryDistanceTolerance = null;
	this._linework = null;
	this._ptLocator = new PointLocator();
	this._seg = new LineSegment();
	let g = arguments[0], boundaryDistanceTolerance = arguments[1];
	this._g = g;
	this._boundaryDistanceTolerance = boundaryDistanceTolerance;
	this._linework = this.extractLinework(g);
};
class PolygonalLineworkExtracter {
	constructor() {
		PolygonalLineworkExtracter.constructor_.apply(this, arguments);
	}
	getLinework() {
		return this._linework;
	}
	filter(g) {
		if (g instanceof Polygon) {
			var poly = g;
			this._linework.add(poly.getExteriorRing());
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				this._linework.add(poly.getInteriorRingN(i));
			}
		}
	}
	getClass() {
		return PolygonalLineworkExtracter;
	}
	get interfaces_() {
		return [GeometryFilter];
	}
}
PolygonalLineworkExtracter.constructor_ = function () {
	this._linework = null;
	this._linework = new ArrayList();
};
