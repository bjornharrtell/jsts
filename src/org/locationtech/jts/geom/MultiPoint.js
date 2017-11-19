import Geometry from './Geometry';
import extend from '../../../../extend';
import GeometryCollection from './GeometryCollection';
import Dimension from './Dimension';
import Puntal from './Puntal';
import inherits from '../../../../inherits';
export default function MultiPoint() {
	let points = arguments[0], factory = arguments[1];
	GeometryCollection.call(this, points, factory);
}
inherits(MultiPoint, GeometryCollection);
extend(MultiPoint.prototype, {
	isValid: function () {
		return true;
	},
	equalsExact: function () {
		if (arguments.length === 2 && (typeof arguments[1] === "number" && arguments[0] instanceof Geometry)) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return GeometryCollection.prototype.equalsExact.call(this, other, tolerance);
		} else return GeometryCollection.prototype.equalsExact.apply(this, arguments);
	},
	getCoordinate: function () {
		if (arguments.length === 1 && Number.isInteger(arguments[0])) {
			let n = arguments[0];
			return this._geometries[n].getCoordinate();
		} else return GeometryCollection.prototype.getCoordinate.apply(this, arguments);
	},
	getBoundaryDimension: function () {
		return Dimension.FALSE;
	},
	getTypeCode: function () {
		return Geometry.TYPECODE_MULTIPOINT;
	},
	getDimension: function () {
		return 0;
	},
	getBoundary: function () {
		return this.getFactory().createGeometryCollection();
	},
	getGeometryType: function () {
		return Geometry.TYPENAME_MULTIPOINT;
	},
	copy: function () {
		var points = new Array(this._geometries.length).fill(null);
		for (var i = 0; i < points.length; i++) {
			points[i] = this._geometries[i].copy();
		}
		return new MultiPoint(points, this._factory);
	},
	interfaces_: function () {
		return [Puntal];
	},
	getClass: function () {
		return MultiPoint;
	}
});
MultiPoint.serialVersionUID = -8048474874175355449;
