import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import MultiPoint from '../../geom/MultiPoint';
import extend from '../../../../../extend';
import GeometryCollection from '../../geom/GeometryCollection';
export default function RepeatedPointTester() {
	this.repeatedCoord = null;
}
extend(RepeatedPointTester.prototype, {
	getCoordinate: function () {
		return this.repeatedCoord;
	},
	hasRepeatedPoint: function () {
		if (arguments[0] instanceof Geometry) {
			let g = arguments[0];
			if (g.isEmpty()) return false;
			if (g instanceof Point) return false; else if (g instanceof MultiPoint) return false; else if (g instanceof LineString) return this.hasRepeatedPoint(g.getCoordinates()); else if (g instanceof Polygon) return this.hasRepeatedPoint(g); else if (g instanceof GeometryCollection) return this.hasRepeatedPoint(g); else throw new UnsupportedOperationException(g.getClass().getName());
		} else if (arguments[0] instanceof Array) {
			let coord = arguments[0];
			for (var i = 1; i < coord.length; i++) {
				if (coord[i - 1].equals(coord[i])) {
					this.repeatedCoord = coord[i];
					return true;
				}
			}
			return false;
		} else if (arguments[0] instanceof Polygon) {
			let p = arguments[0];
			if (this.hasRepeatedPoint(p.getExteriorRing().getCoordinates())) return true;
			for (var i = 0; i < p.getNumInteriorRing(); i++) {
				if (this.hasRepeatedPoint(p.getInteriorRingN(i).getCoordinates())) return true;
			}
			return false;
		} else if (arguments[0] instanceof GeometryCollection) {
			let gc = arguments[0];
			for (var i = 0; i < gc.getNumGeometries(); i++) {
				var g = gc.getGeometryN(i);
				if (this.hasRepeatedPoint(g)) return true;
			}
			return false;
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RepeatedPointTester;
	}
});

