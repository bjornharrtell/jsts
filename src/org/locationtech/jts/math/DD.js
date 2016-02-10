import StringBuffer from '../../../../java/lang/StringBuffer';
import Double from '../../../../java/lang/Double';
import Integer from '../../../../java/lang/Integer';
import Character from '../../../../java/lang/Character';
import Comparable from '../../../../java/lang/Comparable';
import Cloneable from '../../../../java/lang/Cloneable';
import Serializable from '../../../../java/io/Serializable';
export default class DD {
	constructor(...args) {
		this.hi = 0.0;
		this.lo = 0.0;
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						this.init(0.0);
					})(...args);
				case 1:
					if (typeof args[0] === "number") {
						return ((...args) => {
							let [x] = args;
							this.init(x);
						})(...args);
					} else if (args[0] instanceof DD) {
						return ((...args) => {
							let [dd] = args;
							this.init(dd);
						})(...args);
					} else if (typeof args[0] === "string") {
						return ((...args) => {
							let [str] = args;
							overloads.call(this, DD.parse(str));
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [hi, lo] = args;
						this.init(hi, lo);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Serializable, Comparable, Cloneable];
	}
	static sqr(x) {
		return DD.valueOf(x).selfMultiply(x);
	}
	static valueOf(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (typeof args[0] === "string") {
						return ((...args) => {
							let [str] = args;
							return DD.parse(str);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [x] = args;
							return new DD(x);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	static sqrt(x) {
		return DD.valueOf(x).sqrt();
	}
	static parse(str) {
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
	}
	static createNaN() {
		return new DD(Double.NaN, Double.NaN);
	}
	static copy(dd) {
		return new DD(dd);
	}
	static magnitude(x) {
		var xAbs = Math.abs(x);
		var xLog10 = Math.log(xAbs) / Math.log(10);
		var xMag = Math.trunc(Math.floor(xLog10));
		var xApprox = Math.pow(10, xMag);
		if (xApprox * 10 <= xAbs) xMag += 1;
		return xMag;
	}
	static stringOfChar(ch, len) {
		var buf = new StringBuffer();
		for (var i = 0; i < len; i++) {
			buf.append(ch);
		}
		return buf.toString();
	}
	le(y) {
		return this.hi < y.hi || this.hi === y.hi && this.lo <= y.lo;
	}
	extractSignificantDigits(insertDecimalPoint, magnitude) {
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
	}
	sqr() {
		return this.multiply(this);
	}
	doubleValue() {
		return this.hi + this.lo;
	}
	subtract(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							return this.add(y.negate());
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							return this.add(-y);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	equals(...args) {
		if (args.length === 1) {
			let [y] = args;
			return this.hi === y.hi && this.lo === y.lo;
		} else return super.equals(...args);
	}
	isZero() {
		return this.hi === 0.0 && this.lo === 0.0;
	}
	selfSubtract(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							if (this.isNaN()) return this;
							return this.selfAdd(-y.hi, -y.lo);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							if (this.isNaN()) return this;
							return this.selfAdd(-y, 0.0);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getSpecialNumberString() {
		if (this.isZero()) return "0.0";
		if (this.isNaN()) return "NaN ";
		return null;
	}
	min(x) {
		if (this.le(x)) {
			return this;
		} else {
			return x;
		}
	}
	selfDivide(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							return this.selfDivide(y.hi, y.lo);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							return this.selfDivide(y, 0.0);
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [yhi, ylo] = args;
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
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	dump() {
		return "DD<" + this.hi + ", " + this.lo + ">";
	}
	divide(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
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
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							if (Double.isNaN(y)) return DD.createNaN();
							return DD.copy(this).selfDivide(y, 0.0);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	ge(y) {
		return this.hi > y.hi || this.hi === y.hi && this.lo >= y.lo;
	}
	pow(exp) {
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
	}
	ceil() {
		if (this.isNaN()) return DD.NaN;
		var fhi = Math.ceil(this.hi);
		var flo = 0.0;
		if (fhi === this.hi) {
			flo = Math.ceil(this.lo);
		}
		return new DD(fhi, flo);
	}
	compareTo(o) {
		var other = o;
		if (this.hi < other.hi) return -1;
		if (this.hi > other.hi) return 1;
		if (this.lo < other.lo) return -1;
		if (this.lo > other.lo) return 1;
		return 0;
	}
	rint() {
		if (this.isNaN()) return this;
		var plus5 = this.add(0.5);
		return plus5.floor();
	}
	setValue(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [value] = args;
							this.init(value);
							return this;
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [value] = args;
							this.init(value);
							return this;
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	max(x) {
		if (this.ge(x)) {
			return this;
		} else {
			return x;
		}
	}
	sqrt() {
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
	}
	selfAdd(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							return this.selfAdd(y.hi, y.lo);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
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
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [yhi, ylo] = args;
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
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	selfMultiply(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							return this.selfMultiply(y.hi, y.lo);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							return this.selfMultiply(y, 0.0);
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [yhi, ylo] = args;
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
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	selfSqr() {
		return this.selfMultiply(this);
	}
	floor() {
		if (this.isNaN()) return DD.NaN;
		var fhi = Math.floor(this.hi);
		var flo = 0.0;
		if (fhi === this.hi) {
			flo = Math.floor(this.lo);
		}
		return new DD(fhi, flo);
	}
	negate() {
		if (this.isNaN()) return this;
		return new DD(-this.hi, -this.lo);
	}
	clone() {
		try {
			return super.clone();
		} catch (ex) {
			if (ex instanceof CloneNotSupportedException) {
				return null;
			} else throw ex;
		} finally {}
	}
	multiply(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							if (y.isNaN()) return DD.createNaN();
							return DD.copy(this).selfMultiply(y);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							if (Double.isNaN(y)) return DD.createNaN();
							return DD.copy(this).selfMultiply(y, 0.0);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	isNaN() {
		return Double.isNaN(this.hi);
	}
	intValue() {
		return Math.trunc(this.hi);
	}
	toString() {
		var mag = DD.magnitude(this.hi);
		if (mag >= -3 && mag <= 20) return this.toStandardNotation();
		return this.toSciNotation();
	}
	toStandardNotation() {
		var specialStr = this.getSpecialNumberString();
		if (specialStr !== null) return specialStr;
		var magnitude = new Array(1);
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
	}
	reciprocal() {
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
	}
	toSciNotation() {
		if (this.isZero()) return DD.SCI_NOT_ZERO;
		var specialStr = this.getSpecialNumberString();
		if (specialStr !== null) return specialStr;
		var magnitude = new Array(1);
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
	}
	abs() {
		if (this.isNaN()) return DD.NaN;
		if (this.isNegative()) return this.negate();
		return new DD(this);
	}
	isPositive() {
		return this.hi > 0.0 || this.hi === 0.0 && this.lo > 0.0;
	}
	lt(y) {
		return this.hi < y.hi || this.hi === y.hi && this.lo < y.lo;
	}
	add(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof DD) {
						return ((...args) => {
							let [y] = args;
							return DD.copy(this).selfAdd(y);
						})(...args);
					} else if (typeof args[0] === "number") {
						return ((...args) => {
							let [y] = args;
							return DD.copy(this).selfAdd(y);
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	init(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (typeof args[0] === "number") {
						return ((...args) => {
							let [x] = args;
							this.hi = x;
							this.lo = 0.0;
						})(...args);
					} else if (args[0] instanceof DD) {
						return ((...args) => {
							let [dd] = args;
							this.hi = dd.hi;
							this.lo = dd.lo;
						})(...args);
					}
				case 2:
					return ((...args) => {
						let [hi, lo] = args;
						this.hi = hi;
						this.lo = lo;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	gt(y) {
		return this.hi > y.hi || this.hi === y.hi && this.lo > y.lo;
	}
	isNegative() {
		return this.hi < 0.0 || this.hi === 0.0 && this.lo < 0.0;
	}
	trunc() {
		if (this.isNaN()) return DD.NaN;
		if (this.isPositive()) return this.floor(); else return this.ceil();
	}
	signum() {
		if (this.hi > 0) return 1;
		if (this.hi < 0) return -1;
		if (this.lo > 0) return 1;
		if (this.lo < 0) return -1;
		return 0;
	}
	getClass() {
		return DD;
	}
}
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

