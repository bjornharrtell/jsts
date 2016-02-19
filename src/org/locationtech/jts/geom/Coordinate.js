import NumberUtil from '../util/NumberUtil';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Comparator from '../../../../java/util/Comparator';
import Serializable from '../../../../java/io/Serializable';
import Assert from '../util/Assert';
export default function Coordinate() {
	this.x = null;
	this.y = null;
	this.z = null;
	if (arguments.length === 0) {
		Coordinate.call(this, 0.0, 0.0);
	} else if (arguments.length === 1) {
		let c = arguments[0];
		Coordinate.call(this, c.x, c.y, c.z);
	} else if (arguments.length === 2) {
		let x = arguments[0], y = arguments[1];
		Coordinate.call(this, x, y, Coordinate.NULL_ORDINATE);
	} else if (arguments.length === 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		this.x = x;
		this.y = y;
		this.z = z;
	}
}
extend(Coordinate.prototype, {
	setOrdinate: function (ordinateIndex, value) {
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
	},
	equals2D: function () {
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
	},
	getOrdinate: function (ordinateIndex) {
		switch (ordinateIndex) {
			case Coordinate.X:
				return this.x;
			case Coordinate.Y:
				return this.y;
			case Coordinate.Z:
				return this.z;
		}
		throw new IllegalArgumentException("Invalid ordinate index: " + ordinateIndex);
	},
	equals3D: function (other) {
		return this.x === other.x && this.y === other.y && (this.z === other.z || Double.isNaN(this.z) && Double.isNaN(other.z));
	},
	equals: function (other) {
		if (!(other instanceof Coordinate)) {
			return false;
		}
		return this.equals2D(other);
	},
	equalInZ: function (c, tolerance) {
		return NumberUtil.equalsWithTolerance(this.z, c.z, tolerance);
	},
	compareTo: function (o) {
		var other = o;
		if (this.x < other.x) return -1;
		if (this.x > other.x) return 1;
		if (this.y < other.y) return -1;
		if (this.y > other.y) return 1;
		return 0;
	},
	clone: function () {
		try {
			var coord = null;
			return coord;
		} catch (e) {
			if (e instanceof CloneNotSupportedException) {
				Assert.shouldNeverReachHere("this shouldn't happen because this class is Cloneable");
				return null;
			} else throw e;
		} finally {}
	},
	copy: function () {
		return new Coordinate(this);
	},
	toString: function () {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	},
	distance3D: function (c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		var dz = this.z - c.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	},
	distance: function (c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		return Math.sqrt(dx * dx + dy * dy);
	},
	hashCode: function () {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.x);
		result = 37 * result + Coordinate.hashCode(this.y);
		return result;
	},
	setCoordinate: function (other) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
	},
	interfaces_: function () {
		return [Comparable, Cloneable, Serializable];
	},
	getClass: function () {
		return Coordinate;
	}
});
Coordinate.hashCode = function () {
	if (arguments.length === 1) {
		let x = arguments[0];
		var f = Double.doubleToLongBits(x);
		return Math.trunc(f ^ f >>> 32);
	}
};
function DimensionalComparator() {
	this.dimensionsToTest = 2;
	if (arguments.length === 0) {
		DimensionalComparator.call(this, 2);
	} else if (arguments.length === 1) {
		let dimensionsToTest = arguments[0];
		if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException("only 2 or 3 dimensions may be specified");
		this.dimensionsToTest = dimensionsToTest;
	}
}
extend(DimensionalComparator.prototype, {
	compare: function (o1, o2) {
		var c1 = o1;
		var c2 = o2;
		var compX = DimensionalComparator.compare(c1.x, c2.x);
		if (compX !== 0) return compX;
		var compY = DimensionalComparator.compare(c1.y, c2.y);
		if (compY !== 0) return compY;
		if (this.dimensionsToTest <= 2) return 0;
		var compZ = DimensionalComparator.compare(c1.z, c2.z);
		return compZ;
	},
	interfaces_: function () {
		return [Comparator];
	},
	getClass: function () {
		return DimensionalComparator;
	}
});
DimensionalComparator.compare = function (a, b) {
	if (a < b) return -1;
	if (a > b) return 1;
	if (Double.isNaN(a)) {
		if (Double.isNaN(b)) return 0;
		return -1;
	}
	if (Double.isNaN(b)) return 1;
	return 0;
};
Coordinate.DimensionalComparator = DimensionalComparator;
Coordinate.serialVersionUID = 6683108902428366910;
Coordinate.NULL_ORDINATE = Double.NaN;
Coordinate.X = 0;
Coordinate.Y = 1;
Coordinate.Z = 2;

