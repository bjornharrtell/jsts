import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Point from '../geom/Point';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import GeometryCollection from '../geom/GeometryCollection';
export default function InteriorPointPoint() {
	this.centroid = null;
	this.minDistance = Double.MAX_VALUE;
	this.interiorPoint = null;
	let g = arguments[0];
	this.centroid = g.getCentroid().getCoordinate();
	this.add(g);
}
extend(InteriorPointPoint.prototype, {
	getInteriorPoint: function () {
		return this.interiorPoint;
	},
	add: function () {
		if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			if (geom instanceof Point) {
				this.add(geom.getCoordinate());
			} else if (geom instanceof GeometryCollection) {
				var gc = geom;
				for (var i = 0; i < gc.getNumGeometries(); i++) {
					this.add(gc.getGeometryN(i));
				}
			}
		} else if (arguments[0] instanceof Coordinate) {
			let point = arguments[0];
			var dist = point.distance(this.centroid);
			if (dist < this.minDistance) {
				this.interiorPoint = new Coordinate(point);
				this.minDistance = dist;
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return InteriorPointPoint;
	}
});

