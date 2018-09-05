import LineString from '../geom/LineString';
import Geometry from '../geom/Geometry';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import GeometryCollection from '../geom/GeometryCollection';
export default class InteriorPointLine {
	constructor() {
		InteriorPointLine.constructor_.apply(this, arguments);
	}
	addEndpoints() {
		if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			if (geom instanceof LineString) {
				this.addEndpoints(geom.getCoordinates());
			} else if (geom instanceof GeometryCollection) {
				var gc = geom;
				for (var i = 0; i < gc.getNumGeometries(); i++) {
					this.addEndpoints(gc.getGeometryN(i));
				}
			}
		} else if (arguments[0] instanceof Array) {
			let pts = arguments[0];
			this.add(pts[0]);
			this.add(pts[pts.length - 1]);
		}
	}
	getInteriorPoint() {
		return this._interiorPoint;
	}
	addInterior() {
		if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			if (geom instanceof LineString) {
				this.addInterior(geom.getCoordinates());
			} else if (geom instanceof GeometryCollection) {
				var gc = geom;
				for (var i = 0; i < gc.getNumGeometries(); i++) {
					this.addInterior(gc.getGeometryN(i));
				}
			}
		} else if (arguments[0] instanceof Array) {
			let pts = arguments[0];
			for (var i = 1; i < pts.length - 1; i++) {
				this.add(pts[i]);
			}
		}
	}
	add(point) {
		var dist = point.distance(this._centroid);
		if (dist < this._minDistance) {
			this._interiorPoint = new Coordinate(point);
			this._minDistance = dist;
		}
	}
	getClass() {
		return InteriorPointLine;
	}
	get interfaces_() {
		return [];
	}
}
InteriorPointLine.constructor_ = function () {
	this._centroid = null;
	this._minDistance = Double.MAX_VALUE;
	this._interiorPoint = null;
	let g = arguments[0];
	this._centroid = g.getCentroid().getCoordinate();
	this.addInterior(g);
	if (this._interiorPoint === null) this.addEndpoints(g);
};
