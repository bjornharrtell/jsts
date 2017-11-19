import Geometry from './Geometry';
import BoundaryOp from '../operation/BoundaryOp';
import extend from '../../../../extend';
import Lineal from './Lineal';
import GeometryCollection from './GeometryCollection';
import Dimension from './Dimension';
import inherits from '../../../../inherits';
export default function MultiLineString() {
	let lineStrings = arguments[0], factory = arguments[1];
	GeometryCollection.call(this, lineStrings, factory);
}
inherits(MultiLineString, GeometryCollection);
extend(MultiLineString.prototype, {
	equalsExact: function () {
		if (arguments.length === 2 && (typeof arguments[1] === "number" && arguments[0] instanceof Geometry)) {
			let other = arguments[0], tolerance = arguments[1];
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return GeometryCollection.prototype.equalsExact.call(this, other, tolerance);
		} else return GeometryCollection.prototype.equalsExact.apply(this, arguments);
	},
	getBoundaryDimension: function () {
		if (this.isClosed()) {
			return Dimension.FALSE;
		}
		return 0;
	},
	isClosed: function () {
		if (this.isEmpty()) {
			return false;
		}
		for (var i = 0; i < this._geometries.length; i++) {
			if (!this._geometries[i].isClosed()) {
				return false;
			}
		}
		return true;
	},
	getTypeCode: function () {
		return Geometry.TYPECODE_MULTILINESTRING;
	},
	getDimension: function () {
		return 1;
	},
	reverse: function () {
		var nLines = this._geometries.length;
		var revLines = new Array(nLines).fill(null);
		for (var i = 0; i < this._geometries.length; i++) {
			revLines[nLines - 1 - i] = this._geometries[i].reverse();
		}
		return this.getFactory().createMultiLineString(revLines);
	},
	getBoundary: function () {
		return new BoundaryOp(this).getBoundary();
	},
	getGeometryType: function () {
		return Geometry.TYPENAME_MULTILINESTRING;
	},
	copy: function () {
		var lineStrings = new Array(this._geometries.length).fill(null);
		for (var i = 0; i < lineStrings.length; i++) {
			lineStrings[i] = this._geometries[i].copy();
		}
		return new MultiLineString(lineStrings, this._factory);
	},
	interfaces_: function () {
		return [Lineal];
	},
	getClass: function () {
		return MultiLineString;
	}
});
MultiLineString.serialVersionUID = 8166665132445433741;
