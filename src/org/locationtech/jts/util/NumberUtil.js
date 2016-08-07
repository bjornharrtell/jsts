import extend from '../../../../extend';
export default function NumberUtil() {}
extend(NumberUtil.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NumberUtil;
	}
});
NumberUtil.equalsWithTolerance = function (x1, x2, tolerance) {
	return Math.abs(x1 - x2) <= tolerance;
};
