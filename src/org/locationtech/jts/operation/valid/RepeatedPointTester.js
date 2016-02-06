import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import MultiPoint from '../../geom/MultiPoint';
import GeometryCollection from '../../geom/GeometryCollection';
export default class RepeatedPointTester {
	constructor(...args) {
		(() => {
			this.repeatedCoord = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getCoordinate() {
		return this.repeatedCoord;
	}
	hasRepeatedPoint(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Geometry) {
						return ((...args) => {
							let [g] = args;
							if (g.isEmpty()) return false;
							if (g instanceof Point) return false; else if (g instanceof MultiPoint) return false; else if (g instanceof LineString) return this.hasRepeatedPoint(g.getCoordinates()); else if (g instanceof Polygon) return this.hasRepeatedPoint(g); else if (g instanceof GeometryCollection) return this.hasRepeatedPoint(g); else throw new UnsupportedOperationException(g.getClass().getName());
						})(...args);
					} else if (args[0] instanceof Array) {
						return ((...args) => {
							let [coord] = args;
							for (var i = 1; i < coord.length; i++) {
								if (coord[i - 1].equals(coord[i])) {
									this.repeatedCoord = coord[i];
									return true;
								}
							}
							return false;
						})(...args);
					} else if (args[0] instanceof Polygon) {
						return ((...args) => {
							let [p] = args;
							if (this.hasRepeatedPoint(p.getExteriorRing().getCoordinates())) return true;
							for (var i = 0; i < p.getNumInteriorRing(); i++) {
								if (this.hasRepeatedPoint(p.getInteriorRingN(i).getCoordinates())) return true;
							}
							return false;
						})(...args);
					} else if (args[0] instanceof GeometryCollection) {
						return ((...args) => {
							let [gc] = args;
							for (var i = 0; i < gc.getNumGeometries(); i++) {
								var g = gc.getGeometryN(i);
								if (this.hasRepeatedPoint(g)) return true;
							}
							return false;
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return RepeatedPointTester;
	}
}

