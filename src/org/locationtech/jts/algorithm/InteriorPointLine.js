import LineString from '../geom/LineString';
import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import GeometryCollection from '../geom/GeometryCollection';
export default class InteriorPointLine {
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
						this.addInterior(g);
						if (this.interiorPoint === null) this.addEndpoints(g);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	addEndpoints(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Geometry) {
						return ((...args) => {
							let [geom] = args;
							if (geom instanceof LineString) {
								this.addEndpoints(geom.getCoordinates());
							} else if (geom instanceof GeometryCollection) {
								var gc = geom;
								for (var i = 0; i < gc.getNumGeometries(); i++) {
									this.addEndpoints(gc.getGeometryN(i));
								}
							}
						})(...args);
					} else if (args[0] instanceof Array) {
						return ((...args) => {
							let [pts] = args;
							this.add(pts[0]);
							this.add(pts[pts.length - 1]);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	addInterior(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Geometry) {
						return ((...args) => {
							let [geom] = args;
							if (geom instanceof LineString) {
								this.addInterior(geom.getCoordinates());
							} else if (geom instanceof GeometryCollection) {
								var gc = geom;
								for (var i = 0; i < gc.getNumGeometries(); i++) {
									this.addInterior(gc.getGeometryN(i));
								}
							}
						})(...args);
					} else if (args[0] instanceof Array) {
						return ((...args) => {
							let [pts] = args;
							for (var i = 1; i < pts.length - 1; i++) {
								this.add(pts[i]);
							}
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	add(point) {
		var dist = point.distance(this.centroid);
		if (dist < this.minDistance) {
			this.interiorPoint = new Coordinate(point);
			this.minDistance = dist;
		}
	}
	getClass() {
		return InteriorPointLine;
	}
}

