import Location from './Location';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import Dimension from './Dimension';
import Cloneable from '../../../../java/lang/Cloneable';
import StringBuilder from '../../../../java/lang/StringBuilder';
export default function IntersectionMatrix() {
	this._matrix = null;
	if (arguments.length === 0) {
		this._matrix = Array(3).fill().map(() => Array(3));
		this.setAll(Dimension.FALSE);
	} else if (arguments.length === 1) {
		if (typeof arguments[0] === "string") {
			let elements = arguments[0];
			IntersectionMatrix.call(this);
			this.set(elements);
		} else if (arguments[0] instanceof IntersectionMatrix) {
			let other = arguments[0];
			IntersectionMatrix.call(this);
			this._matrix[Location.INTERIOR][Location.INTERIOR] = other._matrix[Location.INTERIOR][Location.INTERIOR];
			this._matrix[Location.INTERIOR][Location.BOUNDARY] = other._matrix[Location.INTERIOR][Location.BOUNDARY];
			this._matrix[Location.INTERIOR][Location.EXTERIOR] = other._matrix[Location.INTERIOR][Location.EXTERIOR];
			this._matrix[Location.BOUNDARY][Location.INTERIOR] = other._matrix[Location.BOUNDARY][Location.INTERIOR];
			this._matrix[Location.BOUNDARY][Location.BOUNDARY] = other._matrix[Location.BOUNDARY][Location.BOUNDARY];
			this._matrix[Location.BOUNDARY][Location.EXTERIOR] = other._matrix[Location.BOUNDARY][Location.EXTERIOR];
			this._matrix[Location.EXTERIOR][Location.INTERIOR] = other._matrix[Location.EXTERIOR][Location.INTERIOR];
			this._matrix[Location.EXTERIOR][Location.BOUNDARY] = other._matrix[Location.EXTERIOR][Location.BOUNDARY];
			this._matrix[Location.EXTERIOR][Location.EXTERIOR] = other._matrix[Location.EXTERIOR][Location.EXTERIOR];
		}
	}
}
extend(IntersectionMatrix.prototype, {
	isIntersects: function () {
		return !this.isDisjoint();
	},
	isCovers: function () {
		var hasPointInCommon = IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]);
		return hasPointInCommon && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	},
	isCoveredBy: function () {
		var hasPointInCommon = IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]);
		return hasPointInCommon && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE;
	},
	set: function () {
		if (arguments.length === 1) {
			let dimensionSymbols = arguments[0];
			for (var i = 0; i < dimensionSymbols.length; i++) {
				var row = Math.trunc(i / 3);
				var col = i % 3;
				this._matrix[row][col] = Dimension.toDimensionValue(dimensionSymbols.charAt(i));
			}
		} else if (arguments.length === 3) {
			let row = arguments[0], column = arguments[1], dimensionValue = arguments[2];
			this._matrix[row][column] = dimensionValue;
		}
	},
	isContains: function () {
		return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	},
	setAtLeast: function () {
		if (arguments.length === 1) {
			let minimumDimensionSymbols = arguments[0];
			for (var i = 0; i < minimumDimensionSymbols.length; i++) {
				var row = Math.trunc(i / 3);
				var col = i % 3;
				this.setAtLeast(row, col, Dimension.toDimensionValue(minimumDimensionSymbols.charAt(i)));
			}
		} else if (arguments.length === 3) {
			let row = arguments[0], column = arguments[1], minimumDimensionValue = arguments[2];
			if (this._matrix[row][column] < minimumDimensionValue) {
				this._matrix[row][column] = minimumDimensionValue;
			}
		}
	},
	setAtLeastIfValid: function (row, column, minimumDimensionValue) {
		if (row >= 0 && column >= 0) {
			this.setAtLeast(row, column, minimumDimensionValue);
		}
	},
	isWithin: function () {
		return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE;
	},
	isTouches: function (dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA > dimensionOfGeometryB) {
			return this.isTouches(dimensionOfGeometryB, dimensionOfGeometryA);
		}
		if (dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L) {
			return this._matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && (IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]));
		}
		return false;
	},
	isOverlaps: function (dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A) {
			return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR]);
		}
		if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) {
			return this._matrix[Location.INTERIOR][Location.INTERIOR] === 1 && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR]);
		}
		return false;
	},
	isEquals: function (dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA !== dimensionOfGeometryB) {
			return false;
		}
		return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	},
	toString: function () {
		var builder = new StringBuilder("123456789");
		for (var ai = 0; ai < 3; ai++) {
			for (var bi = 0; bi < 3; bi++) {
				builder.setCharAt(3 * ai + bi, Dimension.toDimensionSymbol(this._matrix[ai][bi]));
			}
		}
		return builder.toString();
	},
	setAll: function (dimensionValue) {
		for (var ai = 0; ai < 3; ai++) {
			for (var bi = 0; bi < 3; bi++) {
				this._matrix[ai][bi] = dimensionValue;
			}
		}
	},
	get: function (row, column) {
		return this._matrix[row][column];
	},
	transpose: function () {
		var temp = this._matrix[1][0];
		this._matrix[1][0] = this._matrix[0][1];
		this._matrix[0][1] = temp;
		temp = this._matrix[2][0];
		this._matrix[2][0] = this._matrix[0][2];
		this._matrix[0][2] = temp;
		temp = this._matrix[2][1];
		this._matrix[2][1] = this._matrix[1][2];
		this._matrix[1][2] = temp;
		return this;
	},
	matches: function (requiredDimensionSymbols) {
		if (requiredDimensionSymbols.length !== 9) {
			throw new IllegalArgumentException("Should be length 9: " + requiredDimensionSymbols);
		}
		for (var ai = 0; ai < 3; ai++) {
			for (var bi = 0; bi < 3; bi++) {
				if (!IntersectionMatrix.matches(this._matrix[ai][bi], requiredDimensionSymbols.charAt(3 * ai + bi))) {
					return false;
				}
			}
		}
		return true;
	},
	add: function (im) {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				this.setAtLeast(i, j, im.get(i, j));
			}
		}
	},
	isDisjoint: function () {
		return this._matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.INTERIOR][Location.BOUNDARY] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.BOUNDARY] === Dimension.FALSE;
	},
	isCrosses: function (dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A) {
			return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]);
		}
		if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.L) {
			return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR]);
		}
		if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) {
			return this._matrix[Location.INTERIOR][Location.INTERIOR] === 0;
		}
		return false;
	},
	interfaces_: function () {
		return [Cloneable];
	},
	getClass: function () {
		return IntersectionMatrix;
	}
});
IntersectionMatrix.matches = function () {
	if (Number.isInteger(arguments[0]) && typeof arguments[1] === "string") {
		let actualDimensionValue = arguments[0], requiredDimensionSymbol = arguments[1];
		if (requiredDimensionSymbol === Dimension.SYM_DONTCARE) {
			return true;
		}
		if (requiredDimensionSymbol === Dimension.SYM_TRUE && (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE)) {
			return true;
		}
		if (requiredDimensionSymbol === Dimension.SYM_FALSE && actualDimensionValue === Dimension.FALSE) {
			return true;
		}
		if (requiredDimensionSymbol === Dimension.SYM_P && actualDimensionValue === Dimension.P) {
			return true;
		}
		if (requiredDimensionSymbol === Dimension.SYM_L && actualDimensionValue === Dimension.L) {
			return true;
		}
		if (requiredDimensionSymbol === Dimension.SYM_A && actualDimensionValue === Dimension.A) {
			return true;
		}
		return false;
	} else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
		let actualDimensionSymbols = arguments[0], requiredDimensionSymbols = arguments[1];
		var m = new IntersectionMatrix(actualDimensionSymbols);
		return m.matches(requiredDimensionSymbols);
	}
};
IntersectionMatrix.isTrue = function (actualDimensionValue) {
	if (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE) {
		return true;
	}
	return false;
};
