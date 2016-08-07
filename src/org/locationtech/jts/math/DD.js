import StringBuffer from '../../../../java/lang/StringBuffer';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import Integer from '../../../../java/lang/Integer';
import Character from '../../../../java/lang/Character';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Serializable from '../../../../java/io/Serializable';
export default function DD() {
	this.hi = 0.0;
	this.lo = 0.0;
	if (arguments.length === 0) {
		this.init(0.0);
	} else if (arguments.length === 1) {
		if (typeof arguments[0] === "number") {
			let x = arguments[0];
			this.init(x);
		} else if (arguments[0] instanceof DD) {
			let dd = arguments[0];
			this.init(dd);
		} else if (typeof arguments[0] === "string") {
			let str = arguments[0];
			DD.call(this, DD.parse(str));
		}
	} else if (arguments.length === 2) {
		let hi = arguments[0], lo = arguments[1];
		this.init(hi, lo);
	}
}
extend(DD.prototype, {
	le: function (y) {
		return this.hi < y.hi || this.hi === y.hi && this.lo <= y.lo;
	},
	extractSignificantDigits: function (insertDecimalPoint, magnitude) {
		var y = this.abs();
		var mag = DD.magnitude(y.hi);
		var scale = DD.TEN.pow(mag);
		y = y.divide(scale);
		if (y.gt(DD.TEN)) {
			y = y.divide(DD.TEN);
			mag += 1;
		} else if (y.lt(DD.ONE)) {
			y = y.multiply(DD.TEN);
			mag -= 1;
		}
		var decimalPointPos = mag + 1;
		var buf = new StringBuffer();
		var numDigits = DD.MAX_PRINT_DIGITS - 1;
		for (var i = 0; i <= numDigits; i++) {
			if (insertDecimalPoint && i === decimalPointPos) {
				buf.append('.');
			}
			var digit = Math.trunc(y.hi);
			if (digit < 0 || digit > 9) {}
			if (digit < 0) {
				break;
			}
			var rebiasBy10 = false;
			var digitChar = 0;
			if (digit > 9) {
				rebiasBy10 = true;
				digitChar = '9';
			} else {
				digitChar = '0' + digit;
			}
			buf.append(digitChar);
			y = y.subtract(DD.valueOf(digit)).multiply(DD.TEN);
			if (rebiasBy10) y.selfAdd(DD.TEN);
			var continueExtractingDigits = true;
			var remMag = DD.magnitude(y.hi);
			if (remMag < 0 && Math.abs(remMag) >= numDigits - i) continueExtractingDigits = false;
			if (!continueExtractingDigits) break;
		}
		magnitude[0] = mag;
		return buf.toString();
	},
	sqr: function () {
		return this.multiply(this);
	},
	doubleValue: function () {
		return this.hi + this.lo;
	},
	subtract: function () {
		if (arguments[0] instanceof DD) {
			let y = arguments[0];
			return this.add(y.negate());
		} else if (typeof arguments[0] === "number") {
			let y = arguments[0];
			return this.add(-y);
		}
	},
	equals: function () {
		if (arguments.length === 1) {
			let y = arguments[0];
			return this.hi === y.hi && this.lo === y.lo;
		}
	},
	isZero: function () {
		return this.hi === 0.0 && this.lo === 0.0;
	},
	selfSubtract: function () {
		if (arguments[0] instanceof DD) {
			let y = arguments[0];
			if (this.isNaN()) return this;
			return this.selfAdd(-y.hi, -y.lo);
		} else if (typeof arguments[0] === "number") {
			let y = arguments[0];
			if (this.isNaN()) return this;
			return this.selfAdd(-y, 0.0);
		}
	},
	getSpecialNumberString: function () {
		if (this.isZero()) return "0.0";
		if (this.isNaN()) return "NaN ";
		return null;
	},
	min: function (x) {
		if (this.le(x)) {
			return this;
		} else {
			return x;
		}
	},
	selfDivide: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof DD) {
				let y = arguments[0];
				return this.selfDivide(y.hi, y.lo);
			} else if (typeof arguments[0] === "number") {
				let y = arguments[0];
				return this.selfDivide(y, 0.0);
			}
		} else if (arguments.length === 2) {
			let yhi = arguments[0], ylo = arguments[1];
			var hc = null, tc = null, hy = null, ty = null, C = null, c = null, U = null, u = null;
			C = this.hi / yhi;
			c = DD.SPLIT * C;
			hc = c - C;
			u = DD.SPLIT * yhi;
			hc = c - hc;
			tc = C - hc;
			hy = u - yhi;
			U = C * yhi;
			hy = u - hy;
			ty = yhi - hy;
			u = hc * hy - U + hc * ty + tc * hy + tc * ty;
			c = (this.hi - U - u + this.lo - C * ylo) / yhi;
			u = C + c;
			this.hi = u;
			this.lo = C - u + c;
			return this;
		}
	},
	dump: function () {
		return "DD<" + this.hi + ", " + this.lo + ">";
	},
	divide: function () {
		if (arguments[0] instanceof DD) {
			let y = arguments[0];
			var hc = null, tc = null, hy = null, ty = null, C = null, c = null, U = null, u = null;
			C = this.hi / y.hi;
			c = DD.SPLIT * C;
			hc = c - C;
			u = DD.SPLIT * y.hi;
			hc = c - hc;
			tc = C - hc;
			hy = u - y.hi;
			U = C * y.hi;
			hy = u - hy;
			ty = y.hi - hy;
			u = hc * hy - U + hc * ty + tc * hy + tc * ty;
			c = (this.hi - U - u + this.lo - C * y.lo) / y.hi;
			u = C + c;
			var zhi = u;
			var zlo = C - u + c;
			return new DD(zhi, zlo);
		} else if (typeof arguments[0] === "number") {
			let y = arguments[0];
			if (Double.isNaN(y)) return DD.createNaN();
			return DD.copy(this).selfDivide(y, 0.0);
		}
	},
	ge: function (y) {
		return this.hi > y.hi || this.hi === y.hi && this.lo >= y.lo;
	},
	pow: function (exp) {
		if (exp === 0.0) return DD.valueOf(1.0);
		var r = new DD(this);
		var s = DD.valueOf(1.0);
		var n = Math.abs(exp);
		if (n > 1) {
			while (n > 0) {
				if (n % 2 === 1) {
					s.selfMultiply(r);
				}
				n /= 2;
				if (n > 0) r = r.sqr();
			}
		} else {
			s = r;
		}
		if (exp < 0) return s.reciprocal();
		return s;
	},
	ceil: function () {
		if (this.isNaN()) return DD.NaN;
		var fhi = Math.ceil(this.hi);
		var flo = 0.0;
		if (fhi === this.hi) {
			flo = Math.ceil(this.lo);
		}
		return new DD(fhi, flo);
	},
	compareTo: function (o) {
		var other = o;
		if (this.hi < other.hi) return -1;
		if (this.hi > other.hi) return 1;
		if (this.lo < other.lo) return -1;
		if (this.lo > other.lo) return 1;
		return 0;
	},
	rint: function () {
		if (this.isNaN()) return this;
		var plus5 = this.add(0.5);
		return plus5.floor();
	},
	setValue: function () {
		if (arguments[0] instanceof DD) {
			let value = arguments[0];
			this.init(value);
			return this;
		} else if (typeof arguments[0] === "number") {
			let value = arguments[0];
			this.init(value);
			return this;
		}
	},
	max: function (x) {
		if (this.ge(x)) {
			return this;
		} else {
			return x;
		}
	},
	sqrt: function () {
		if (this.isZero()) return DD.valueOf(0.0);
		if (this.isNegative()) {
			return DD.NaN;
		}
		var x = 1.0 / Math.sqrt(this.hi);
		var ax = this.hi * x;
		var axdd = DD.valueOf(ax);
		var diffSq = this.subtract(axdd.sqr());
		var d2 = diffSq.hi * (x * 0.5);
		return axdd.add(d2);
	},
	selfAdd: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof DD) {
				let y = arguments[0];
				return this.selfAdd(y.hi, y.lo);
			} else if (typeof arguments[0] === "number") {
				let y = arguments[0];
				var H = null, h = null, S = null, s = null, e = null, f = null;
				S = this.hi + y;
				e = S - this.hi;
				s = S - e;
				s = y - e + (this.hi - s);
				f = s + this.lo;
				H = S + f;
				h = f + (S - H);
				this.hi = H + h;
				this.lo = h + (H - this.hi);
				return this;
			}
		} else if (arguments.length === 2) {
			let yhi = arguments[0], ylo = arguments[1];
			var H = null, h = null, T = null, t = null, S = null, s = null, e = null, f = null;
			S = this.hi + yhi;
			T = this.lo + ylo;
			e = S - this.hi;
			f = T - this.lo;
			s = S - e;
			t = T - f;
			s = yhi - e + (this.hi - s);
			t = ylo - f + (this.lo - t);
			e = s + T;
			H = S + e;
			h = e + (S - H);
			e = t + h;
			var zhi = H + e;
			var zlo = e + (H - zhi);
			this.hi = zhi;
			this.lo = zlo;
			return this;
		}
	},
	selfMultiply: function () {
		if (arguments.length === 1) {
			if (arguments[0] instanceof DD) {
				let y = arguments[0];
				return this.selfMultiply(y.hi, y.lo);
			} else if (typeof arguments[0] === "number") {
				let y = arguments[0];
				return this.selfMultiply(y, 0.0);
			}
		} else if (arguments.length === 2) {
			let yhi = arguments[0], ylo = arguments[1];
			var hx = null, tx = null, hy = null, ty = null, C = null, c = null;
			C = DD.SPLIT * this.hi;
			hx = C - this.hi;
			c = DD.SPLIT * yhi;
			hx = C - hx;
			tx = this.hi - hx;
			hy = c - yhi;
			C = this.hi * yhi;
			hy = c - hy;
			ty = yhi - hy;
			c = hx * hy - C + hx * ty + tx * hy + tx * ty + (this.hi * ylo + this.lo * yhi);
			var zhi = C + c;
			hx = C - zhi;
			var zlo = c + hx;
			this.hi = zhi;
			this.lo = zlo;
			return this;
		}
	},
	selfSqr: function () {
		return this.selfMultiply(this);
	},
	floor: function () {
		if (this.isNaN()) return DD.NaN;
		var fhi = Math.floor(this.hi);
		var flo = 0.0;
		if (fhi === this.hi) {
			flo = Math.floor(this.lo);
		}
		return new DD(fhi, flo);
	},
	negate: function () {
		if (this.isNaN()) return this;
		return new DD(-this.hi, -this.lo);
	},
	clone: function () {
		try {
			return null;
		} catch (ex) {
			if (ex instanceof CloneNotSupportedException) {
				return null;
			} else throw ex;
		} finally {}
	},
	multiply: function () {
		if (arguments[0] instanceof DD) {
			let y = arguments[0];
			if (y.isNaN()) return DD.createNaN();
			return DD.copy(this).selfMultiply(y);
		} else if (typeof arguments[0] === "number") {
			let y = arguments[0];
			if (Double.isNaN(y)) return DD.createNaN();
			return DD.copy(this).selfMultiply(y, 0.0);
		}
	},
	isNaN: function () {
		return Double.isNaN(this.hi);
	},
	intValue: function () {
		return Math.trunc(this.hi);
	},
	toString: function () {
		var mag = DD.magnitude(this.hi);
		if (mag >= -3 && mag <= 20) return this.toStandardNotation();
		return this.toSciNotation();
	},
	toStandardNotation: function () {
		var specialStr = this.getSpecialNumberString();
		if (specialStr !== null) return specialStr;
		var magnitude = new Array(1).fill(null);
		var sigDigits = this.extractSignificantDigits(true, magnitude);
		var decimalPointPos = magnitude[0] + 1;
		var num = sigDigits;
		if (sigDigits.charAt(0) === '.') {
			num = "0" + sigDigits;
		} else if (decimalPointPos < 0) {
			num = "0." + DD.stringOfChar('0', -decimalPointPos) + sigDigits;
		} else if (sigDigits.indexOf('.') === -1) {
			var numZeroes = decimalPointPos - sigDigits.length;
			var zeroes = DD.stringOfChar('0', numZeroes);
			num = sigDigits + zeroes + ".0";
		}
		if (this.isNegative()) return "-" + num;
		return num;
	},
	reciprocal: function () {
		var hc = null, tc = null, hy = null, ty = null, C = null, c = null, U = null, u = null;
		C = 1.0 / this.hi;
		c = DD.SPLIT * C;
		hc = c - C;
		u = DD.SPLIT * this.hi;
		hc = c - hc;
		tc = C - hc;
		hy = u - this.hi;
		U = C * this.hi;
		hy = u - hy;
		ty = this.hi - hy;
		u = hc * hy - U + hc * ty + tc * hy + tc * ty;
		c = (1.0 - U - u - C * this.lo) / this.hi;
		var zhi = C + c;
		var zlo = C - zhi + c;
		return new DD(zhi, zlo);
	},
	toSciNotation: function () {
		if (this.isZero()) return DD.SCI_NOT_ZERO;
		var specialStr = this.getSpecialNumberString();
		if (specialStr !== null) return specialStr;
		var magnitude = new Array(1).fill(null);
		var digits = this.extractSignificantDigits(false, magnitude);
		var expStr = DD.SCI_NOT_EXPONENT_CHAR + magnitude[0];
		if (digits.charAt(0) === '0') {
			throw new IllegalStateException("Found leading zero: " + digits);
		}
		var trailingDigits = "";
		if (digits.length > 1) trailingDigits = digits.substring(1);
		var digitsWithDecimal = digits.charAt(0) + "." + trailingDigits;
		if (this.isNegative()) return "-" + digitsWithDecimal + expStr;
		return digitsWithDecimal + expStr;
	},
	abs: function () {
		if (this.isNaN()) return DD.NaN;
		if (this.isNegative()) return this.negate();
		return new DD(this);
	},
	isPositive: function () {
		return this.hi > 0.0 || this.hi === 0.0 && this.lo > 0.0;
	},
	lt: function (y) {
		return this.hi < y.hi || this.hi === y.hi && this.lo < y.lo;
	},
	add: function () {
		if (arguments[0] instanceof DD) {
			let y = arguments[0];
			return DD.copy(this).selfAdd(y);
		} else if (typeof arguments[0] === "number") {
			let y = arguments[0];
			return DD.copy(this).selfAdd(y);
		}
	},
	init: function () {
		if (arguments.length === 1) {
			if (typeof arguments[0] === "number") {
				let x = arguments[0];
				this.hi = x;
				this.lo = 0.0;
			} else if (arguments[0] instanceof DD) {
				let dd = arguments[0];
				this.hi = dd.hi;
				this.lo = dd.lo;
			}
		} else if (arguments.length === 2) {
			let hi = arguments[0], lo = arguments[1];
			this.hi = hi;
			this.lo = lo;
		}
	},
	gt: function (y) {
		return this.hi > y.hi || this.hi === y.hi && this.lo > y.lo;
	},
	isNegative: function () {
		return this.hi < 0.0 || this.hi === 0.0 && this.lo < 0.0;
	},
	trunc: function () {
		if (this.isNaN()) return DD.NaN;
		if (this.isPositive()) return this.floor(); else return this.ceil();
	},
	signum: function () {
		if (this.hi > 0) return 1;
		if (this.hi < 0) return -1;
		if (this.lo > 0) return 1;
		if (this.lo < 0) return -1;
		return 0;
	},
	interfaces_: function () {
		return [Serializable, Comparable, Cloneable];
	},
	getClass: function () {
		return DD;
	}
});
DD.sqr = function (x) {
	return DD.valueOf(x).selfMultiply(x);
};
DD.valueOf = function () {
	if (typeof arguments[0] === "string") {
		let str = arguments[0];
		return DD.parse(str);
	} else if (typeof arguments[0] === "number") {
		let x = arguments[0];
		return new DD(x);
	}
};
DD.sqrt = function (x) {
	return DD.valueOf(x).sqrt();
};
DD.parse = function (str) {
	var i = 0;
	var strlen = str.length;
	while (Character.isWhitespace(str.charAt(i))) i++;
	var isNegative = false;
	if (i < strlen) {
		var signCh = str.charAt(i);
		if (signCh === '-' || signCh === '+') {
			i++;
			if (signCh === '-') isNegative = true;
		}
	}
	var val = new DD();
	var numDigits = 0;
	var numBeforeDec = 0;
	var exp = 0;
	while (true) {
		if (i >= strlen) break;
		var ch = str.charAt(i);
		i++;
		if (Character.isDigit(ch)) {
			var d = ch - '0';
			val.selfMultiply(DD.TEN);
			val.selfAdd(d);
			numDigits++;
			continue;
		}
		if (ch === '.') {
			numBeforeDec = numDigits;
			continue;
		}
		if (ch === 'e' || ch === 'E') {
			var expStr = str.substring(i);
			try {
				exp = Integer.parseInt(expStr);
			} catch (ex) {
				if (ex instanceof NumberFormatException) {
					throw new NumberFormatException("Invalid exponent " + expStr + " in string " + str);
				} else throw ex;
			} finally {}
			break;
		}
		throw new NumberFormatException("Unexpected character '" + ch + "' at position " + i + " in string " + str);
	}
	var val2 = val;
	var numDecPlaces = numDigits - numBeforeDec - exp;
	if (numDecPlaces === 0) {
		val2 = val;
	} else if (numDecPlaces > 0) {
		var scale = DD.TEN.pow(numDecPlaces);
		val2 = val.divide(scale);
	} else if (numDecPlaces < 0) {
		var scale = DD.TEN.pow(-numDecPlaces);
		val2 = val.multiply(scale);
	}
	if (isNegative) {
		return val2.negate();
	}
	return val2;
};
DD.createNaN = function () {
	return new DD(Double.NaN, Double.NaN);
};
DD.copy = function (dd) {
	return new DD(dd);
};
DD.magnitude = function (x) {
	var xAbs = Math.abs(x);
	var xLog10 = Math.log(xAbs) / Math.log(10);
	var xMag = Math.trunc(Math.floor(xLog10));
	var xApprox = Math.pow(10, xMag);
	if (xApprox * 10 <= xAbs) xMag += 1;
	return xMag;
};
DD.stringOfChar = function (ch, len) {
	var buf = new StringBuffer();
	for (var i = 0; i < len; i++) {
		buf.append(ch);
	}
	return buf.toString();
};
DD.PI = new DD(3.141592653589793116e+00, 1.224646799147353207e-16);
DD.TWO_PI = new DD(6.283185307179586232e+00, 2.449293598294706414e-16);
DD.PI_2 = new DD(1.570796326794896558e+00, 6.123233995736766036e-17);
DD.E = new DD(2.718281828459045091e+00, 1.445646891729250158e-16);
DD.NaN = new DD(Double.NaN, Double.NaN);
DD.EPS = 1.23259516440783e-32;
DD.SPLIT = 134217729.0;
DD.MAX_PRINT_DIGITS = 32;
DD.TEN = DD.valueOf(10.0);
DD.ONE = DD.valueOf(1.0);
DD.SCI_NOT_EXPONENT_CHAR = "E";
DD.SCI_NOT_ZERO = "0.0E0";
