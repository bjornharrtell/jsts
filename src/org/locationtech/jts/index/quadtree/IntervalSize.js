import extend from '../../../../../extend';
import DoubleBits from './DoubleBits';
export default function IntervalSize() {}
extend(IntervalSize.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IntervalSize;
	}
});
IntervalSize.isZeroWidth = function (min, max) {
	var width = max - min;
	if (width === 0.0) return true;
	var maxAbs = Math.max(Math.abs(min), Math.abs(max));
	var scaledInterval = width / maxAbs;
	var level = DoubleBits.exponent(scaledInterval);
	return level <= IntervalSize.MIN_BINARY_EXPONENT;
};
IntervalSize.MIN_BINARY_EXPONENT = -50;

