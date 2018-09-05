export default class NumberUtil {
	constructor() {
		NumberUtil.constructor_.apply(this, arguments);
	}
	static equalsWithTolerance(x1, x2, tolerance) {
		return Math.abs(x1 - x2) <= tolerance;
	}
	getClass() {
		return NumberUtil;
	}
	get interfaces_() {
		return [];
	}
}
NumberUtil.constructor_ = function () {};
