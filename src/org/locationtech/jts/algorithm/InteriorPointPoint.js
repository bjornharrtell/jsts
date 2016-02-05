import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Point from '../geom/Point';
import Double from '../../../../java/lang/Double';
import GeometryCollection from '../geom/GeometryCollection';
export default class InteriorPointPoint {
	constructor(...args) {
		(() => {
			this.centroid = null;
			this.minDistance = Double.MAX_VALUE;
			this.interiorPoint = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [g] = args;
						this.centroid = g.getCentroid().getCoordinate();
						this.add(g);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	add(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Coordinate) {
						return ((...args) => {
							let [point] = args;
							var dist = point.distance(this.centroid);
							if (dist < this.minDistance) {
								this.interiorPoint = new Coordinate(point);
								this.minDistance = dist;
							}
						})(...args);
					} else if (args[0] instanceof Geometry) {
						return ((...args) => {
							let [geom] = args;
							if (geom instanceof Point) {
								this.add(geom.getCoordinate());
							} else if (geom instanceof GeometryCollection) {
								var gc = geom;
								for (var i = 0; i < gc.getNumGeometries(); i++) {
									this.add(gc.getGeometryN(i));
								}
							}
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return InteriorPointPoint;
	}
}

