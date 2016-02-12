import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Point from '../geom/Point';
import Double from '../../../../java/lang/Double';
import GeometryCollection from '../geom/GeometryCollection';
export default class InteriorPointPoint {
	constructor(...args) {
		this.centroid = null;
		this.minDistance = Double.MAX_VALUE;
		this.interiorPoint = null;
		switch (args.length) {
			case 1:
				{
					let [g] = args;
					this.centroid = g.getCentroid().getCoordinate();
					this.add(g);
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	add(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Geometry) {
					let [geom] = args;
					if (geom instanceof Point) {
						this.add(geom.getCoordinate());
					} else if (geom instanceof GeometryCollection) {
						var gc = geom;
						for (var i = 0; i < gc.getNumGeometries(); i++) {
							this.add(gc.getGeometryN(i));
						}
					}
				} else if (args[0] instanceof Coordinate) {
					let [point] = args;
					var dist = point.distance(this.centroid);
					if (dist < this.minDistance) {
						this.interiorPoint = new Coordinate(point);
						this.minDistance = dist;
					}
				}
				break;
		}
	}
	getClass() {
		return InteriorPointPoint;
	}
}

