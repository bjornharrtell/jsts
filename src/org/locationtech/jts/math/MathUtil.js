import Double from '../../../../java/lang/Double';
export default class MathUtil {
	get interfaces_() {
		return [];
	}
	static log10(x) {
		var ln = Math.log(x);
		if (Double.isInfinite(ln)) return ln;
		if (Double.isNaN(ln)) return ln;
		return ln / MathUtil.LOG_10;
	}
	static min(v1, v2, v3, v4) {
		var min = v1;
		if (v2 < min) min = v2;
		if (v3 < min) min = v3;
		if (v4 < min) min = v4;
		return min;
	}
	static clamp(...args) {
		switch (args.length) {
			case 3:
				if (typeof args[2] === "number" && (typeof args[0] === "number" && typeof args[1] === "number")) {
					return ((...args) => {
						let [x, min, max] = args;
						if (x < min) return min;
						if (x > max) return max;
						return x;
					})(...args);
				} else if (Number.isInteger(args[2]) && (Number.isInteger(args[0]) && Number.isInteger(args[1]))) {
					return ((...args) => {
						let [x, min, max] = args;
						if (x < min) return min;
						if (x > max) return max;
						return x;
					})(...args);
				}
		}
	}
	static wrap(index, max) {
		if (index < 0) {
			return max - -index % max;
		}
		return index % max;
	}
	static max(...args) {
		switch (args.length) {
			case 3:
				return ((...args) => {
					let [v1, v2, v3] = args;
					var max = v1;
					if (v2 > max) max = v2;
					if (v3 > max) max = v3;
					return max;
				})(...args);
			case 4:
				return ((...args) => {
					let [v1, v2, v3, v4] = args;
					var max = v1;
					if (v2 > max) max = v2;
					if (v3 > max) max = v3;
					if (v4 > max) max = v4;
					return max;
				})(...args);
		}
	}
	static average(x1, x2) {
		return (x1 + x2) / 2.0;
	}
	getClass() {
		return MathUtil;
	}
}
MathUtil.LOG_10 = Math.log(10);

