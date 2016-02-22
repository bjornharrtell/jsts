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
	getSortIndex: function () {
		return Geometry.SORTINDEX_MULTILINESTRING;
	},
	equalsExact: function () {
		if (arguments.length === 2) {
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
		for (var i = 0; i < this.geometries.length; i++) {
			if (!this.geometries[i].isClosed()) {
				return false;
			}
		}
		return true;
	},
	getDimension: function () {
		return 1;
	},
	reverse: function () {
		var nLines = this.geometries.length;
		var revLines = new Array(nLines).fill(null);
		for (var i = 0; i < this.geometries.length; i++) {
			revLines[nLines - 1 - i] = this.geometries[i].reverse();
		}
		return this.getFactory().createMultiLineString(revLines);
	},
	getBoundary: function () {
		return new BoundaryOp(this).getBoundary();
	},
	getGeometryType: function () {
		return "MultiLineString";
	},
	copy: function () {
		var lineStrings = new Array(this.geometries.length).fill(null);
		for (var i = 0; i < lineStrings.length; i++) {
			lineStrings[i] = this.geometries[i].copy();
		}
		return new MultiLineString(lineStrings, this.factory);
	},
	interfaces_: function () {
		return [Lineal];
	},
	getClass: function () {
		return MultiLineString;
	}
});
MultiLineString.serialVersionUID = 8166665132445433741;

