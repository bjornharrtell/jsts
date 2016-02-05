import DoubleBits from './DoubleBits';
export default class IntervalSize {
	get interfaces_() {
		return [];
	}
	static isZeroWidth(min, max) {
		var width = max - min;
		if (width === 0.0) return true;
		var maxAbs = Math.max(Math.abs(min), Math.abs(max));
		var scaledInterval = width / maxAbs;
		var level = DoubleBits.exponent(scaledInterval);
		return level <= IntervalSize.MIN_BINARY_EXPONENT;
	}
	getClass() {
		return IntervalSize;
	}
}
IntervalSize.MIN_BINARY_EXPONENT = -50;

