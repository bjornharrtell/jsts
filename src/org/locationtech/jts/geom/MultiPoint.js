import Geometry from './Geometry';
import GeometryCollection from './GeometryCollection';
import Dimension from './Dimension';
import Puntal from './Puntal';
export default class MultiPoint extends GeometryCollection {
	constructor() {
		super();
		MultiPoint.constructor_.apply(this, arguments);
	}
	isValid() {
		return true;
	}
	equalsExact() {
		if (arguments.length === 2 && (typeof arguments[1] === "number" && arguments[0] instanceof Geometry)) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return super.equalsExact.call(this, other, tolerance);
		} else return super.equalsExact.apply(this, arguments);
	}
	getCoordinate() {
		if (arguments.length === 1 && Number.isInteger(arguments[0])) {
			let n = arguments[0];
			return this._geometries[n].getCoordinate();
		} else return super.getCoordinate.apply(this, arguments);
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	getTypeCode() {
		return Geometry.TYPECODE_MULTIPOINT;
	}
	getDimension() {
		return 0;
	}
	getBoundary() {
		return this.getFactory().createGeometryCollection();
	}
	getGeometryType() {
		return Geometry.TYPENAME_MULTIPOINT;
	}
	copy() {
		var points = new Array(this._geometries.length).fill(null);
		for (var i = 0; i < points.length; i++) {
			points[i] = this._geometries[i].copy();
		}
		return new MultiPoint(points, this._factory);
	}
	getClass() {
		return MultiPoint;
	}
	get interfaces_() {
		return [Puntal];
	}
}
MultiPoint.constructor_ = function () {
	let points = arguments[0], factory = arguments[1];
	GeometryCollection.constructor_.call(this, points, factory);
};
MultiPoint.serialVersionUID = -8048474874175355449;
