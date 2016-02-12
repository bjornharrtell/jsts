import StringBuffer from '../../../../java/lang/StringBuffer';
import Location from './Location';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Dimension from './Dimension';
import Cloneable from '../../../../java/lang/Cloneable';
export default class IntersectionMatrix {
	constructor(...args) {
		this.matrix = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						this.matrix = Array(3).fill().map(() => Array(3));
						this.setAll(Dimension.FALSE);
					})(...args);
				case 1:
					if (typeof args[0] === "string") {
						return ((...args) => {
							let [elements] = args;
							overloaded.call(this);
							this.set(elements);
						})(...args);
					} else if (args[0] instanceof IntersectionMatrix) {
						return ((...args) => {
							let [other] = args;
							overloaded.call(this);
							this.matrix[Location.INTERIOR][Location.INTERIOR] = other.matrix[Location.INTERIOR][Location.INTERIOR];
							this.matrix[Location.INTERIOR][Location.BOUNDARY] = other.matrix[Location.INTERIOR][Location.BOUNDARY];
							this.matrix[Location.INTERIOR][Location.EXTERIOR] = other.matrix[Location.INTERIOR][Location.EXTERIOR];
							this.matrix[Location.BOUNDARY][Location.INTERIOR] = other.matrix[Location.BOUNDARY][Location.INTERIOR];
							this.matrix[Location.BOUNDARY][Location.BOUNDARY] = other.matrix[Location.BOUNDARY][Location.BOUNDARY];
							this.matrix[Location.BOUNDARY][Location.EXTERIOR] = other.matrix[Location.BOUNDARY][Location.EXTERIOR];
							this.matrix[Location.EXTERIOR][Location.INTERIOR] = other.matrix[Location.EXTERIOR][Location.INTERIOR];
							this.matrix[Location.EXTERIOR][Location.BOUNDARY] = other.matrix[Location.EXTERIOR][Location.BOUNDARY];
							this.matrix[Location.EXTERIOR][Location.EXTERIOR] = other.matrix[Location.EXTERIOR][Location.EXTERIOR];
						})(...args);
					}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Cloneable];
	}
	static matches(...args) {
		switch (args.length) {
			case 2:
				if (Number.isInteger(args[0]) && typeof args[1] === "string") {
					return ((...args) => {
						let [actualDimensionValue, requiredDimensionSymbol] = args;
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
					})(...args);
				} else if (typeof args[0] === "string" && typeof args[1] === "string") {
					return ((...args) => {
						let [actualDimensionSymbols, requiredDimensionSymbols] = args;
						var m = new IntersectionMatrix(actualDimensionSymbols);
						return m.matches(requiredDimensionSymbols);
					})(...args);
				}
		}
	}
	static isTrue(actualDimensionValue) {
		if (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE) {
			return true;
		}
		return false;
	}
	isIntersects() {
		return !this.isDisjoint();
	}
	isCovers() {
		var hasPointInCommon = IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this.matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[Location.BOUNDARY][Location.BOUNDARY]);
		return hasPointInCommon && this.matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this.matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	}
	isCoveredBy() {
		var hasPointInCommon = IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this.matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[Location.BOUNDARY][Location.BOUNDARY]);
		return hasPointInCommon && this.matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this.matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE;
	}
	set(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [dimensionSymbols] = args;
					for (var i = 0; i < dimensionSymbols.length; i++) {
						var row = Math.trunc(i / 3);
						var col = i % 3;
						this.matrix[row][col] = Dimension.toDimensionValue(dimensionSymbols.charAt(i));
					}
				})(...args);
			case 3:
				return ((...args) => {
					let [row, column, dimensionValue] = args;
					this.matrix[row][column] = dimensionValue;
				})(...args);
		}
	}
	isContains() {
		return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && this.matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this.matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	}
	setAtLeast(...args) {
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [minimumDimensionSymbols] = args;
					for (var i = 0; i < minimumDimensionSymbols.length; i++) {
						var row = Math.trunc(i / 3);
						var col = i % 3;
						this.setAtLeast(row, col, Dimension.toDimensionValue(minimumDimensionSymbols.charAt(i)));
					}
				})(...args);
			case 3:
				return ((...args) => {
					let [row, column, minimumDimensionValue] = args;
					if (this.matrix[row][column] < minimumDimensionValue) {
						this.matrix[row][column] = minimumDimensionValue;
					}
				})(...args);
		}
	}
	setAtLeastIfValid(row, column, minimumDimensionValue) {
		if (row >= 0 && column >= 0) {
			this.setAtLeast(row, column, minimumDimensionValue);
		}
	}
	isWithin() {
		return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && this.matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this.matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE;
	}
	isTouches(dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA > dimensionOfGeometryB) {
			return this.isTouches(dimensionOfGeometryB, dimensionOfGeometryA);
		}
		if (dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L) {
			return this.matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && (IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this.matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this.matrix[Location.BOUNDARY][Location.BOUNDARY]));
		}
		return false;
	}
	isOverlaps(dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A) {
			return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this.matrix[Location.EXTERIOR][Location.INTERIOR]);
		}
		if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) {
			return this.matrix[Location.INTERIOR][Location.INTERIOR] === 1 && IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this.matrix[Location.EXTERIOR][Location.INTERIOR]);
		}
		return false;
	}
	isEquals(dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA !== dimensionOfGeometryB) {
			return false;
		}
		return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && this.matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this.matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE && this.matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this.matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	}
	toString() {
		var buf = new StringBuffer("123456789");
		for (var ai = 0; ai < 3; ai++) {
			for (var bi = 0; bi < 3; bi++) {
				buf.setCharAt(3 * ai + bi, Dimension.toDimensionSymbol(this.matrix[ai][bi]));
			}
		}
		return buf.toString();
	}
	setAll(dimensionValue) {
		for (var ai = 0; ai < 3; ai++) {
			for (var bi = 0; bi < 3; bi++) {
				this.matrix[ai][bi] = dimensionValue;
			}
		}
	}
	get(row, column) {
		return this.matrix[row][column];
	}
	transpose() {
		var temp = this.matrix[1][0];
		this.matrix[1][0] = this.matrix[0][1];
		this.matrix[0][1] = temp;
		temp = this.matrix[2][0];
		this.matrix[2][0] = this.matrix[0][2];
		this.matrix[0][2] = temp;
		temp = this.matrix[2][1];
		this.matrix[2][1] = this.matrix[1][2];
		this.matrix[1][2] = temp;
		return this;
	}
	matches(requiredDimensionSymbols) {
		if (requiredDimensionSymbols.length !== 9) {
			throw new IllegalArgumentException("Should be length 9: " + requiredDimensionSymbols);
		}
		for (var ai = 0; ai < 3; ai++) {
			for (var bi = 0; bi < 3; bi++) {
				if (!IntersectionMatrix.matches(this.matrix[ai][bi], requiredDimensionSymbols.charAt(3 * ai + bi))) {
					return false;
				}
			}
		}
		return true;
	}
	add(im) {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				this.setAtLeast(i, j, im.get(i, j));
			}
		}
	}
	isDisjoint() {
		return this.matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && this.matrix[Location.INTERIOR][Location.BOUNDARY] === Dimension.FALSE && this.matrix[Location.BOUNDARY][Location.INTERIOR] === Dimension.FALSE && this.matrix[Location.BOUNDARY][Location.BOUNDARY] === Dimension.FALSE;
	}
	isCrosses(dimensionOfGeometryA, dimensionOfGeometryB) {
		if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A) {
			return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.EXTERIOR]);
		}
		if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.L) {
			return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this.matrix[Location.EXTERIOR][Location.INTERIOR]);
		}
		if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) {
			return this.matrix[Location.INTERIOR][Location.INTERIOR] === 0;
		}
		return false;
	}
	getClass() {
		return IntersectionMatrix;
	}
}

