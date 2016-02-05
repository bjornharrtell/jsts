import PointLocator from '../../../algorithm/PointLocator';
import Location from '../../../geom/Location';
import GeometryFactory from '../../../geom/GeometryFactory';
import Polygon from '../../../geom/Polygon';
import LineSegment from '../../../geom/LineSegment';
import ArrayList from '../../../../../../java/util/ArrayList';
import GeometryFilter from '../../../geom/GeometryFilter';
export default class FuzzyPointLocator {
	constructor(...args) {
		(() => {
			this.g = null;
			this.boundaryDistanceTolerance = null;
			this.linework = null;
			this.ptLocator = new PointLocator();
			this.seg = new LineSegment();
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [g, boundaryDistanceTolerance] = args;
						this.g = g;
						this.boundaryDistanceTolerance = boundaryDistanceTolerance;
						this.linework = this.extractLinework(g);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	isWithinToleranceOfBoundary(pt) {
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
	}
	getLocation(pt) {
		if (this.isWithinToleranceOfBoundary(pt)) return Location.BOUNDARY;
		return this.ptLocator.locate(pt, this.g);
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
}
class PolygonalLineworkExtracter {
	constructor(...args) {
		(() => {
			this.linework = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						this.linework = new ArrayList();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	getLinework() {
		return this.linework;
	}
	filter(g) {
		if (g instanceof Polygon) {
			var poly = g;
			this.linework.add(poly.getExteriorRing());
			for (var i = 0; i < poly.getNumInteriorRing(); i++) {
				this.linework.add(poly.getInteriorRingN(i));
			}
		}
	}
	getClass() {
		return PolygonalLineworkExtracter;
	}
}

