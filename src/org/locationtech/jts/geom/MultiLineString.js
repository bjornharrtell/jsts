import Geometry from './Geometry';
import BoundaryOp from '../operation/BoundaryOp';
import Lineal from './Lineal';
import GeometryCollection from './GeometryCollection';
import Dimension from './Dimension';
export default class MultiLineString extends GeometryCollection {
	constructor(...args) {
		super();
		switch (args.length) {
			case 2:
				{
					let [lineStrings, factory] = args;
					super(lineStrings, factory);
					break;
				}
		}
	}
	get interfaces_() {
		return [Lineal];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_MULTILINESTRING;
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
		for (var i = 0; i < this.geometries.length; i++) {
			if (!this.geometries[i].isClosed()) {
				return false;
			}
		}
		return true;
	}
	getDimension() {
		return 1;
	}
	reverse() {
		var nLines = this.geometries.length;
		var revLines = new Array(nLines);
		for (var i = 0; i < this.geometries.length; i++) {
			revLines[nLines - 1 - i] = this.geometries[i].reverse();
		}
		return this.getFactory().createMultiLineString(revLines);
	}
	getBoundary() {
		return new BoundaryOp(this).getBoundary();
	}
	getGeometryType() {
		return "MultiLineString";
	}
	copy() {
		var lineStrings = new Array(this.geometries.length);
		for (var i = 0; i < lineStrings.length; i++) {
			lineStrings[i] = this.geometries[i].copy();
		}
		return new MultiLineString(lineStrings, this.factory);
	}
	getClass() {
		return MultiLineString;
	}
}
MultiLineString.serialVersionUID = 8166665132445433741;

