import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import MultiPoint from '../../geom/MultiPoint';
import GeometryCollection from '../../geom/GeometryCollection';
export default class RepeatedPointTester {
	constructor(...args) {
		this.repeatedCoord = null;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinate() {
		return this.repeatedCoord;
	}
	hasRepeatedPoint(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Geometry) {
					let [g] = args;
					if (g.isEmpty()) return false;
					if (g instanceof Point) return false; else if (g instanceof MultiPoint) return false; else if (g instanceof LineString) return this.hasRepeatedPoint(g.getCoordinates()); else if (g instanceof Polygon) return this.hasRepeatedPoint(g); else if (g instanceof GeometryCollection) return this.hasRepeatedPoint(g); else throw new UnsupportedOperationException(g.getClass().getName());
				} else if (args[0] instanceof Array) {
					let [coord] = args;
					for (var i = 1; i < coord.length; i++) {
						if (coord[i - 1].equals(coord[i])) {
							this.repeatedCoord = coord[i];
							return true;
						}
					}
					return false;
				} else if (args[0] instanceof Polygon) {
					let [p] = args;
					if (this.hasRepeatedPoint(p.getExteriorRing().getCoordinates())) return true;
					for (var i = 0; i < p.getNumInteriorRing(); i++) {
						if (this.hasRepeatedPoint(p.getInteriorRingN(i).getCoordinates())) return true;
					}
					return false;
				} else if (args[0] instanceof GeometryCollection) {
					let [gc] = args;
					for (var i = 0; i < gc.getNumGeometries(); i++) {
						var g = gc.getGeometryN(i);
						if (this.hasRepeatedPoint(g)) return true;
					}
					return false;
				}
				break;
		}
	}
	getClass() {
		return RepeatedPointTester;
	}
}

