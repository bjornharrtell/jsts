import NumberUtil from '../util/NumberUtil';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Double from '../../../../java/lang/Double';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Comparator from '../../../../java/util/Comparator';
import Serializable from '../../../../java/io/Serializable';
import Assert from '../util/Assert';
export default class Coordinate {
	constructor() {
		Coordinate.constructor_.apply(this, arguments);
	}
	static hashCode() {
		if (arguments.length === 1 && typeof arguments[0] === "number") {
			let x = arguments[0];
			var f = Double.doubleToLongBits(x);
			return Math.trunc(f ^ f >>> 32);
		}
	}
	setOrdinate(ordinateIndex, value) {
		switch (ordinateIndex) {
			case Coordinate.X:
				this.x = value;
				break;
			case Coordinate.Y:
				this.y = value;
				break;
			case Coordinate.Z:
				this.z = value;
				break;
			default:
				throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
		}
	}
	equals2D() {
		if (arguments.length === 1) {
			let other = arguments[0];
			if (this.x !== other.x) {
				return false;
			}
			if (this.y !== other.y) {
				return false;
			}
			return true;
		} else if (arguments.length === 2) {
			let c = arguments[0], tolerance = arguments[1];
			if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) {
				return false;
			}
			if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) {
				return false;
			}
			return true;
		}
	}
	getOrdinate(ordinateIndex) {
		switch (ordinateIndex) {
			case Coordinate.X:
				return this.x;
			case Coordinate.Y:
				return this.y;
			case Coordinate.Z:
				return this.z;
		}
		throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
	}
	equals3D(other) {
		return this.x === other.x && this.y === other.y && (this.z === other.z || Double.isNaN(this.z) && Double.isNaN(other.z));
	}
	equals(other) {
		if (!(other instanceof Coordinate)) {
			return false;
		}
		return this.equals2D(other);
	}
	equalInZ(c, tolerance) {
		return NumberUtil.equalsWithTolerance(this.z, c.z, tolerance);
	}
	compareTo(o) {
		var other = o;
		if (this.x < other.x) return -1;
		if (this.x > other.x) return 1;
		if (this.y < other.y) return -1;
		if (this.y > other.y) return 1;
		return 0;
	}
	clone() {
		try {
			var coord = null;
			return coord;
		} catch (e) {
			if (e instanceof CloneNotSupportedException) {
				Assert.shouldNeverReachHere("this shouldn't happen because this class is Cloneable");
				return null;
			} else throw e;
		} finally {}
	}
	copy() {
		return new Coordinate(this);
	}
	toString() {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	distance3D(c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		var dz = this.z - c.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
	distance(c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	hashCode() {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.x);
		result = 37 * result + Coordinate.hashCode(this.y);
		return result;
	}
	setCoordinate(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
	}
	getClass() {
		return Coordinate;
	}
	get interfaces_() {
		return [Comparable, Cloneable, Serializable];
	}
}
class DimensionalComparator {
	constructor() {
		DimensionalComparator.constructor_.apply(this, arguments);
	}
	static compare(a, b) {
		if (a < b) return -1;
		if (a > b) return 1;
		if (Double.isNaN(a)) {
			if (Double.isNaN(b)) return 0;
			return -1;
		}
		if (Double.isNaN(b)) return 1;
		return 0;
	}
	compare(o1, o2) {
		var c1 = o1;
		var c2 = o2;
		var compX = DimensionalComparator.compare(c1.x, c2.x);
		if (compX !== 0) return compX;
		var compY = DimensionalComparator.compare(c1.y, c2.y);
		if (compY !== 0) return compY;
		if (this._dimensionsToTest <= 2) return 0;
		var compZ = DimensionalComparator.compare(c1.z, c2.z);
		return compZ;
	}
	getClass() {
		return DimensionalComparator;
	}
	get interfaces_() {
		return [Comparator];
	}
}
DimensionalComparator.constructor_ = function () {
	this._dimensionsToTest = 2;
	if (arguments.length === 0) {
		DimensionalComparator.constructor_.call(this, 2);
	} else if (arguments.length === 1) {
		let dimensionsToTest = arguments[0];
		if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException("only 2 or 3 dimensions may be specified");
		this._dimensionsToTest = dimensionsToTest;
	}
};
Coordinate.DimensionalComparator = DimensionalComparator;
Coordinate.constructor_ = function () {
	this.x = null;
	this.y = null;
	this.z = null;
	if (arguments.length === 0) {
		Coordinate.constructor_.call(this, 0.0, 0.0);
	} else if (arguments.length === 1) {
		let c = arguments[0];
		Coordinate.constructor_.call(this, c.x, c.y, c.z);
	} else if (arguments.length === 2) {
		let x = arguments[0], y = arguments[1];
		Coordinate.constructor_.call(this, x, y, Coordinate.NULL_ORDINATE);
	} else if (arguments.length === 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		this.x = x;
		this.y = y;
		this.z = z;
	}
};
Coordinate.serialVersionUID = 6683108902428366910;
Coordinate.NULL_ORDINATE = Double.NaN;
Coordinate.X = 0;
Coordinate.Y = 1;
Coordinate.Z = 2;
