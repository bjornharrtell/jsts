import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
export default function MathUtil() {}
extend(MathUtil.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MathUtil;
	}
});
MathUtil.log10 = function (x) {
	var ln = Math.log(x);
	if (Double.isInfinite(ln)) return ln;
	if (Double.isNaN(ln)) return ln;
	return ln / MathUtil.LOG_10;
};
MathUtil.min = function (v1, v2, v3, v4) {
	var min = v1;
	if (v2 < min) min = v2;
	if (v3 < min) min = v3;
	if (v4 < min) min = v4;
	return min;
};
MathUtil.clamp = function () {
	if (typeof arguments[2] === "number" && (typeof arguments[0] === "number" && typeof arguments[1] === "number")) {
		let x = arguments[0], min = arguments[1], max = arguments[2];
		if (x < min) return min;
		if (x > max) return max;
		return x;
	} else if (Number.isInteger(arguments[2]) && (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1]))) {
		let x = arguments[0], min = arguments[1], max = arguments[2];
		if (x < min) return min;
		if (x > max) return max;
		return x;
	}
};
MathUtil.wrap = function (index, max) {
	if (index < 0) {
		return max - -index % max;
	}
	return index % max;
};
MathUtil.max = function () {
	if (arguments.length === 3) {
		let v1 = arguments[0], v2 = arguments[1], v3 = arguments[2];
		var max = v1;
		if (v2 > max) max = v2;
		if (v3 > max) max = v3;
		return max;
	} else if (arguments.length === 4) {
		let v1 = arguments[0], v2 = arguments[1], v3 = arguments[2], v4 = arguments[3];
		var max = v1;
		if (v2 > max) max = v2;
		if (v3 > max) max = v3;
		if (v4 > max) max = v4;
		return max;
	}
};
MathUtil.average = function (x1, x2) {
	return (x1 + x2) / 2.0;
};
MathUtil.LOG_10 = Math.log(10);

