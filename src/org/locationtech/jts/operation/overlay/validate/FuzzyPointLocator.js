import PointLocator from '../../../algorithm/PointLocator';
import Location from '../../../geom/Location';
import GeometryFactory from '../../../geom/GeometryFactory';
import Polygon from '../../../geom/Polygon';
import extend from '../../../../../../extend';
import LineSegment from '../../../geom/LineSegment';
import ArrayList from '../../../../../../java/util/ArrayList';
import GeometryFilter from '../../../geom/GeometryFilter';
export default function FuzzyPointLocator() {
	this.g = null;
	this.boundaryDistanceTolerance = null;
	this.linework = null;
	this.ptLocator = new PointLocator();
	this.seg = new LineSegment();
	let g = arguments[0], boundaryDistanceTolerance = arguments[1];
	this.g = g;
	this.boundaryDistanceTolerance = boundaryDistanceTolerance;
	this.linework = this.extractLinework(g);
}
extend(FuzzyPointLocator.prototype, {
	isWithinToleranceOfBoundary: function (pt) {
		for (var i = 0; i < this.linework.getNumGeometries(); i++) {
			var line = this.linework.getGeometryN(i);
			var seq = line.getCoordinateSequence();
			for (var j = 0; j < seq.size() - 1; j++) {
				seq.getCoordinate(j, this.seg.p0);
				seq.getCoordinate(j + 1, this.seg.p1);
				var dist = this.seg.distance(pt);
				if (dist <= this.boundaryDistanceTolerance) return true;
			}
		}
		return false;
	},
	getLocation: function (pt) {
		if (this.isWithinToleranceOfBoundary(pt)) return Location.BOUNDARY;
		return this.ptLocator.locate(pt, this.g);
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
	this.linework = null;
	this.linework = new ArrayList();
}
extend(PolygonalLineworkExtracter.prototype, {
	getLinework: function () {
		return this.linework;
	},
	filter: function (g) {
		if (g instanceof Polygon) {
			var poly = g;
			this.linework.add(poly.getExteriorRing());
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				this.linework.add(poly.getInteriorRingN(i));
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

