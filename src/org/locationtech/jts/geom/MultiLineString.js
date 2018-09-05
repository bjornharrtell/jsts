import Geometry from './Geometry';
import BoundaryOp from '../operation/BoundaryOp';
import Lineal from './Lineal';
import GeometryCollection from './GeometryCollection';
import Dimension from './Dimension';
export default class MultiLineString extends GeometryCollection {
	constructor() {
		super();
		MultiLineString.constructor_.apply(this, arguments);
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
	getBoundaryDimension() {
		if (this.isClosed()) {
			return Dimension.FALSE;
		}
		return 0;
	}
	isClosed() {
		if (this.isEmpty()) {
			return false;
		}
		for (var i = 0; i < this._geometries.length; i++) {
			if (!this._geometries[i].isClosed()) {
				return false;
			}
		}
		return true;
	}
	getTypeCode() {
		return Geometry.TYPECODE_MULTILINESTRING;
	}
	getDimension() {
		return 1;
	}
	reverse() {
		var nLines = this._geometries.length;
		var revLines = new Array(nLines).fill(null);
		for (var i = 0; i < this._geometries.length; i++) {
			revLines[nLines - 1 - i] = this._geometries[i].reverse();
		}
		return this.getFactory().createMultiLineString(revLines);
	}
	getBoundary() {
		return new BoundaryOp(this).getBoundary();
	}
	getGeometryType() {
		return Geometry.TYPENAME_MULTILINESTRING;
	}
	copy() {
		var lineStrings = new Array(this._geometries.length).fill(null);
		for (var i = 0; i < lineStrings.length; i++) {
			lineStrings[i] = this._geometries[i].copy();
		}
		return new MultiLineString(lineStrings, this._factory);
	}
	getClass() {
		return MultiLineString;
	}
	get interfaces_() {
		return [Lineal];
	}
}
MultiLineString.constructor_ = function () {
	let lineStrings = arguments[0], factory = arguments[1];
	GeometryCollection.constructor_.call(this, lineStrings, factory);
};
MultiLineString.serialVersionUID = 8166665132445433741;
