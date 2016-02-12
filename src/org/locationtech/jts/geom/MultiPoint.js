import Geometry from './Geometry';
import GeometryCollection from './GeometryCollection';
import Dimension from './Dimension';
import Puntal from './Puntal';
export default class MultiPoint extends GeometryCollection {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [points, factory] = args;
			super(points, factory);
		}
	}
	get interfaces_() {
		return [Puntal];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_MULTIPOINT;
	}
	isValid() {
		return true;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return super.equalsExact(other, tolerance);
		} else return super.equalsExact(...args);
	}
	getCoordinate(...args) {
		if (args.length === 1) {
			let [n] = args;
			return this.geometries[n].getCoordinate();
		} else return super.getCoordinate(...args);
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	getDimension() {
		return 0;
	}
	getBoundary() {
		return this.getFactory().createGeometryCollection(null);
	}
	getGeometryType() {
		return "MultiPoint";
	}
	copy() {
		var points = new Array(this.geometries.length);
		for (var i = 0; i < points.length; i++) {
			points[i] = this.geometries[i].copy();
		}
		return new MultiPoint(points, this.factory);
	}
	getClass() {
		return MultiPoint;
	}
}
MultiPoint.serialVersionUID = -8048474874175355449;

