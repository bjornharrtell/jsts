'use strict';

class NumberUtil {
	get interfaces_() {
		return [];
	}
	static equalsWithTolerance(x1, x2, tolerance) {
		return Math.abs(x1 - x2) <= tolerance;
	}
	getClass() {
		return NumberUtil;
	}
}

class IllegalArgumentException$1 {}

class Double {
  static isNaN(n) {
    return Number.isNaN(n)
  }
  static doubleToLongBits(n) {
    return n
  }
  static longBitsToDouble(n) {
    return n
  }
  static isInfinite(n) {
    return !Number.isFinite(n)
  }
}

class Comparable {}

class Clonable {}

class Comparator {}

class Serializable {}

class RuntimeException {}

class AssertionFailedException extends RuntimeException {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
					super();
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [message] = args;
					super(message);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return AssertionFailedException;
	}
}

class Assert {
	get interfaces_() {
		return [];
	}
	static shouldNeverReachHere(...args) {
		if (args.length === 0) {
			let [] = args;
			Assert.shouldNeverReachHere(null);
		} else if (args.length === 1) {
			let [message] = args;
			throw new AssertionFailedException("Should never reach here" + (message !== null ? ": " + message : ""));
		}
	}
	static isTrue(...args) {
		if (args.length === 1) {
			let [assertion] = args;
			Assert.isTrue(assertion, null);
		} else if (args.length === 2) {
			let [assertion, message] = args;
			if (!assertion) {
				if (message === null) {
					throw new AssertionFailedException();
				} else {
					throw new AssertionFailedException(message);
				}
			}
		}
	}
	static equals(...args) {
		if (args.length === 2) {
			let [expectedValue, actualValue] = args;
			Assert.equals(expectedValue, actualValue, null);
		} else if (args.length === 3) {
			let [expectedValue, actualValue, message] = args;
			if (!actualValue.equals(expectedValue)) {
				throw new AssertionFailedException("Expected " + expectedValue + " but encountered " + actualValue + (message !== null ? ": " + message : ""));
			}
		}
	}
	getClass() {
		return Assert;
	}
}

class Coordinate {
	constructor(...args) {
		this.x = null;
		this.y = null;
		this.z = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				overloaded.call(this, 0.0, 0.0);
			} else if (args.length === 1) {
				let [c] = args;
				overloaded.call(this, c.x, c.y, c.z);
			} else if (args.length === 2) {
				let [x, y] = args;
				overloaded.call(this, x, y, Coordinate.NULL_ORDINATE);
			} else if (args.length === 3) {
				let [x, y, z] = args;
				this.x = x;
				this.y = y;
				this.z = z;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparable, Clonable, Serializable];
	}
	static get DimensionalComparator() {
		return DimensionalComparator;
	}
	static hashCode(...args) {
		if (args.length === 1) {
			let [x] = args;
			var f = Double.doubleToLongBits(x);
			return Math.trunc(f ^ f >>> 32);
		} else return super.hashCode(...args);
	}
	setOrdinate(ordinateIndex, value) {
		switch (ordinateIndex) {
			case Coordinate.X:
				this.x = value;
				break;
			case Coordinate.Y:
				this.y = value;
				break;
			case Coordinate.Z:
				this.z = value;
				break;
			default:
				throw new IllegalArgumentException$1("Invalid ordinate index: " + ordinateIndex);
		}
	}
	equals2D(...args) {
		if (args.length === 1) {
			let [other] = args;
			if (this.x !== other.x) {
				return false;
			}
			if (this.y !== other.y) {
				return false;
			}
			return true;
		} else if (args.length === 2) {
			let [c, tolerance] = args;
			if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) {
				return false;
			}
			if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) {
				return false;
			}
			return true;
		}
	}
	getOrdinate(ordinateIndex) {
		switch (ordinateIndex) {
			case Coordinate.X:
				return this.x;
			case Coordinate.Y:
				return this.y;
			case Coordinate.Z:
				return this.z;
		}
		throw new IllegalArgumentException$1("Invalid ordinate index: " + ordinateIndex);
	}
	equals3D(other) {
		return this.x === other.x && this.y === other.y && (this.z === other.z || Double.isNaN(this.z) && Double.isNaN(other.z));
	}
	equals(other) {
		if (!(other instanceof Coordinate)) {
			return false;
		}
		return this.equals2D(other);
	}
	equalInZ(c, tolerance) {
		return NumberUtil.equalsWithTolerance(this.z, c.z, tolerance);
	}
	compareTo(o) {
		var other = o;
		if (this.x < other.x) return -1;
		if (this.x > other.x) return 1;
		if (this.y < other.y) return -1;
		if (this.y > other.y) return 1;
		return 0;
	}
	clone() {
		try {
			var coord = super.clone();
			return coord;
		} catch (e) {
			if (e instanceof CloneNotSupportedException) {
				Assert.shouldNeverReachHere("this shouldn't happen because this class is Cloneable");
				return null;
			} else throw e;
		} finally {}
	}
	copy() {
		return new Coordinate(this);
	}
	toString() {
		return "(" + this.x + ", " + this.y + ", " + this.z + ")";
	}
	distance3D(c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		var dz = this.z - c.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
	distance(c) {
		var dx = this.x - c.x;
		var dy = this.y - c.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	hashCode() {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.x);
		result = 37 * result + Coordinate.hashCode(this.y);
		return result;
	}
	setCoordinate(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
	}
	getClass() {
		return Coordinate;
	}
}
class DimensionalComparator {
	constructor(...args) {
		this.dimensionsToTest = 2;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				overloaded.call(this, 2);
			} else if (args.length === 1) {
				let [dimensionsToTest] = args;
				if (dimensionsToTest !== 2 && dimensionsToTest !== 3) throw new IllegalArgumentException$1("only 2 or 3 dimensions may be specified");
				this.dimensionsToTest = dimensionsToTest;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparator];
	}
	static compare(a, b) {
		if (a < b) return -1;
		if (a > b) return 1;
		if (Double.isNaN(a)) {
			if (Double.isNaN(b)) return 0;
			return -1;
		}
		if (Double.isNaN(b)) return 1;
		return 0;
	}
	compare(o1, o2) {
		var c1 = o1;
		var c2 = o2;
		var compX = DimensionalComparator.compare(c1.x, c2.x);
		if (compX !== 0) return compX;
		var compY = DimensionalComparator.compare(c1.y, c2.y);
		if (compY !== 0) return compY;
		if (this.dimensionsToTest <= 2) return 0;
		var compZ = DimensionalComparator.compare(c1.z, c2.z);
		return compZ;
	}
	getClass() {
		return DimensionalComparator;
	}
}
Coordinate.serialVersionUID = 6683108902428366910;
Coordinate.NULL_ORDINATE = Double.NaN;
Coordinate.X = 0;
Coordinate.Y = 1;
Coordinate.Z = 2;

class CoordinateSequence {
	get interfaces_() {
		return [Clonable];
	}
	setOrdinate(index, ordinateIndex, value) {}
	size() {}
	getOrdinate(index, ordinateIndex) {}
	getCoordinate(...args) {
		if (args.length === 1) {
			let [i] = args;
		} else if (args.length === 2) {
			let [index, coord] = args;
		}
	}
	getCoordinateCopy(i) {}
	getDimension() {}
	getX(index) {}
	clone() {}
	expandEnvelope(env) {}
	copy() {}
	getY(index) {}
	toCoordinateArray() {}
	getClass() {
		return CoordinateSequence;
	}
}
CoordinateSequence.X = 0;
CoordinateSequence.Y = 1;
CoordinateSequence.Z = 2;
CoordinateSequence.M = 3;

class CoordinateSequenceFactory {
	get interfaces_() {
		return [];
	}
	create(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordSeq] = args;
			}
		} else if (args.length === 2) {
			let [size, dimension] = args;
		}
	}
	getClass() {
		return CoordinateSequenceFactory;
	}
}

class Location {
	get interfaces_() {
		return [];
	}
	static toLocationSymbol(locationValue) {
		switch (locationValue) {
			case Location.EXTERIOR:
				return 'e';
			case Location.BOUNDARY:
				return 'b';
			case Location.INTERIOR:
				return 'i';
			case Location.NONE:
				return '-';
		}
		throw new IllegalArgumentException$1("Unknown location value: " + locationValue);
	}
	getClass() {
		return Location;
	}
}
Location.INTERIOR = 0;
Location.BOUNDARY = 1;
Location.EXTERIOR = 2;
Location.NONE = -1;

class MathUtil {
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
		if (args.length === 3) {
			if (typeof args[2] === "number" && (typeof args[0] === "number" && typeof args[1] === "number")) {
				let [x, min, max] = args;
				if (x < min) return min;
				if (x > max) return max;
				return x;
			} else if (Number.isInteger(args[2]) && (Number.isInteger(args[0]) && Number.isInteger(args[1]))) {
				let [x, min, max] = args;
				if (x < min) return min;
				if (x > max) return max;
				return x;
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
		if (args.length === 3) {
			let [v1, v2, v3] = args;
			var max = v1;
			if (v2 > max) max = v2;
			if (v3 > max) max = v3;
			return max;
		} else if (args.length === 4) {
			let [v1, v2, v3, v4] = args;
			var max = v1;
			if (v2 > max) max = v2;
			if (v3 > max) max = v3;
			if (v4 > max) max = v4;
			return max;
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

class StringBuffer {
  constructor(str) {
    this.str = str
  }
  
  append(e) {
    this.str += e
  }
  
  setCharAt(i, c) {
    return this.str.substr(0, i) + c + this.str.substr(i+1)
  }
  
  toString() {
    return this.str
  }
}

class Integer {
  constructor(value) {
    this.value = value
  }
  static isNaN(n) {
    return Number.isNaN(n)
  }
  intValue() {
    return this.value
  }
  compareTo(o) {
    if (this.value < o) return -1;
    if (this.value > o) return 1;
    return 0;
  }
}

class Character {}
Character.isWhitespace = c => ((c <= 32 && c >= 0) || c == 127)
Character.toUpperCase = c => c.toUpperCase()

class DD {
	constructor(...args) {
		this.hi = 0.0;
		this.lo = 0.0;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.init(0.0);
			} else if (args.length === 1) {
				if (typeof args[0] === "number") {
					let [x] = args;
					this.init(x);
				} else if (args[0] instanceof DD) {
					let [dd] = args;
					this.init(dd);
				} else if (typeof args[0] === "string") {
					let [str] = args;
					overloaded.call(this, DD.parse(str));
				}
			} else if (args.length === 2) {
				let [hi, lo] = args;
				this.init(hi, lo);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Serializable, Comparable, Clonable];
	}
	static sqr(x) {
		return DD.valueOf(x).selfMultiply(x);
	}
	static valueOf(...args) {
		if (args.length === 1) {
			if (typeof args[0] === "string") {
				let [str] = args;
				return DD.parse(str);
			} else if (typeof args[0] === "number") {
				let [x] = args;
				return new DD(x);
			}
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				return this.add(y.negate());
			} else if (typeof args[0] === "number") {
				let [y] = args;
				return this.add(-y);
			}
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				if (this.isNaN()) return this;
				return this.selfAdd(-y.hi, -y.lo);
			} else if (typeof args[0] === "number") {
				let [y] = args;
				if (this.isNaN()) return this;
				return this.selfAdd(-y, 0.0);
			}
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				return this.selfDivide(y.hi, y.lo);
			} else if (typeof args[0] === "number") {
				let [y] = args;
				return this.selfDivide(y, 0.0);
			}
		} else if (args.length === 2) {
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
		}
	}
	dump() {
		return "DD<" + this.hi + ", " + this.lo + ">";
	}
	divide(...args) {
		if (args.length === 1) {
			if (args[0] instanceof DD) {
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
			} else if (typeof args[0] === "number") {
				let [y] = args;
				if (Double.isNaN(y)) return DD.createNaN();
				return DD.copy(this).selfDivide(y, 0.0);
			}
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [value] = args;
				this.init(value);
				return this;
			} else if (typeof args[0] === "number") {
				let [value] = args;
				this.init(value);
				return this;
			}
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				return this.selfAdd(y.hi, y.lo);
			} else if (typeof args[0] === "number") {
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
			}
		} else if (args.length === 2) {
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
		}
	}
	selfMultiply(...args) {
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				return this.selfMultiply(y.hi, y.lo);
			} else if (typeof args[0] === "number") {
				let [y] = args;
				return this.selfMultiply(y, 0.0);
			}
		} else if (args.length === 2) {
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
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				if (y.isNaN()) return DD.createNaN();
				return DD.copy(this).selfMultiply(y);
			} else if (typeof args[0] === "number") {
				let [y] = args;
				if (Double.isNaN(y)) return DD.createNaN();
				return DD.copy(this).selfMultiply(y, 0.0);
			}
		}
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
		if (args.length === 1) {
			if (args[0] instanceof DD) {
				let [y] = args;
				return DD.copy(this).selfAdd(y);
			} else if (typeof args[0] === "number") {
				let [y] = args;
				return DD.copy(this).selfAdd(y);
			}
		}
	}
	init(...args) {
		if (args.length === 1) {
			if (typeof args[0] === "number") {
				let [x] = args;
				this.hi = x;
				this.lo = 0.0;
			} else if (args[0] instanceof DD) {
				let [dd] = args;
				this.hi = dd.hi;
				this.lo = dd.lo;
			}
		} else if (args.length === 2) {
			let [hi, lo] = args;
			this.hi = hi;
			this.lo = lo;
		}
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

class CGAlgorithmsDD {
	get interfaces_() {
		return [];
	}
	static orientationIndex(p1, p2, q) {
		var index = CGAlgorithmsDD.orientationIndexFilter(p1, p2, q);
		if (index <= 1) return index;
		var dx1 = DD.valueOf(p2.x).selfAdd(-p1.x);
		var dy1 = DD.valueOf(p2.y).selfAdd(-p1.y);
		var dx2 = DD.valueOf(q.x).selfAdd(-p2.x);
		var dy2 = DD.valueOf(q.y).selfAdd(-p2.y);
		return dx1.selfMultiply(dy2).selfSubtract(dy1.selfMultiply(dx2)).signum();
	}
	static signOfDet2x2(x1, y1, x2, y2) {
		var det = x1.multiply(y2).selfSubtract(y1.multiply(x2));
		return det.signum();
	}
	static intersection(p1, p2, q1, q2) {
		var denom1 = DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p2.x).selfSubtract(p1.x));
		var denom2 = DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p2.y).selfSubtract(p1.y));
		var denom = denom1.subtract(denom2);
		var numx1 = DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y));
		var numx2 = DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x));
		var numx = numx1.subtract(numx2);
		var fracP = numx.selfDivide(denom).doubleValue();
		var x = DD.valueOf(p1.x).selfAdd(DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(fracP)).doubleValue();
		var numy1 = DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y));
		var numy2 = DD.valueOf(p2.y).selfSubtract(p1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x));
		var numy = numy1.subtract(numy2);
		var fracQ = numy.selfDivide(denom).doubleValue();
		var y = DD.valueOf(q1.y).selfAdd(DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(fracQ)).doubleValue();
		return new Coordinate(x, y);
	}
	static orientationIndexFilter(pa, pb, pc) {
		var detsum = null;
		var detleft = (pa.x - pc.x) * (pb.y - pc.y);
		var detright = (pa.y - pc.y) * (pb.x - pc.x);
		var det = detleft - detright;
		if (detleft > 0.0) {
			if (detright <= 0.0) {
				return CGAlgorithmsDD.signum(det);
			} else {
				detsum = detleft + detright;
			}
		} else if (detleft < 0.0) {
			if (detright >= 0.0) {
				return CGAlgorithmsDD.signum(det);
			} else {
				detsum = -detleft - detright;
			}
		} else {
			return CGAlgorithmsDD.signum(det);
		}
		var errbound = CGAlgorithmsDD.DP_SAFE_EPSILON * detsum;
		if (det >= errbound || -det >= errbound) {
			return CGAlgorithmsDD.signum(det);
		}
		return 2;
	}
	static signum(x) {
		if (x > 0) return 1;
		if (x < 0) return -1;
		return 0;
	}
	getClass() {
		return CGAlgorithmsDD;
	}
}
CGAlgorithmsDD.DP_SAFE_EPSILON = 1e-15;

class Exception {}

class NotRepresentableException extends Exception {
	constructor(...args) {
		super();
		if (args.length === 0) {
			let [] = args;
			super("Projective point not representable on the Cartesian plane.");
		}
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return NotRepresentableException;
	}
}

class System {
  static arraycopy (src, srcPos, dest, destPos, len) {
    let c = 0
    for (let i = srcPos; i < srcPos + len; i++) {
      dest[destPos + c] = src[i]
      c++
    }
  }
  static getProperty (name) {
    return {
      'line.separator': '\n'
    }[name]
  }
}

class HCoordinate {
	constructor(...args) {
		this.x = null;
		this.y = null;
		this.w = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.x = 0.0;
				this.y = 0.0;
				this.w = 1.0;
			} else if (args.length === 1) {
				let [p] = args;
				this.x = p.x;
				this.y = p.y;
				this.w = 1.0;
			} else if (args.length === 2) {
				if (typeof args[0] === "number" && typeof args[1] === "number") {
					let [_x, _y] = args;
					this.x = _x;
					this.y = _y;
					this.w = 1.0;
				} else if (args[0] instanceof HCoordinate && args[1] instanceof HCoordinate) {
					let [p1, p2] = args;
					this.x = p1.y * p2.w - p2.y * p1.w;
					this.y = p2.x * p1.w - p1.x * p2.w;
					this.w = p1.x * p2.y - p2.x * p1.y;
				} else if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
					let [p1, p2] = args;
					this.x = p1.y - p2.y;
					this.y = p2.x - p1.x;
					this.w = p1.x * p2.y - p2.x * p1.y;
				}
			} else if (args.length === 3) {
				let [_x, _y, _w] = args;
				this.x = _x;
				this.y = _y;
				this.w = _w;
			} else if (args.length === 4) {
				let [p1, p2, q1, q2] = args;
				var px = p1.y - p2.y;
				var py = p2.x - p1.x;
				var pw = p1.x * p2.y - p2.x * p1.y;
				var qx = q1.y - q2.y;
				var qy = q2.x - q1.x;
				var qw = q1.x * q2.y - q2.x * q1.y;
				this.x = py * qw - qy * pw;
				this.y = qx * pw - px * qw;
				this.w = px * qy - qx * py;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static intersection(p1, p2, q1, q2) {
		var px = p1.y - p2.y;
		var py = p2.x - p1.x;
		var pw = p1.x * p2.y - p2.x * p1.y;
		var qx = q1.y - q2.y;
		var qy = q2.x - q1.x;
		var qw = q1.x * q2.y - q2.x * q1.y;
		var x = py * qw - qy * pw;
		var y = qx * pw - px * qw;
		var w = px * qy - qx * py;
		var xInt = x / w;
		var yInt = y / w;
		if (Double.isNaN(xInt) || (Double.isInfinite(xInt) || Double.isNaN(yInt)) || Double.isInfinite(yInt)) {
			throw new NotRepresentableException();
		}
		return new Coordinate(xInt, yInt);
	}
	getY() {
		var a = this.y / this.w;
		if (Double.isNaN(a) || Double.isInfinite(a)) {
			throw new NotRepresentableException();
		}
		return a;
	}
	getX() {
		var a = this.x / this.w;
		if (Double.isNaN(a) || Double.isInfinite(a)) {
			throw new NotRepresentableException();
		}
		return a;
	}
	getCoordinate() {
		var p = new Coordinate();
		p.x = this.getX();
		p.y = this.getY();
		return p;
	}
	getClass() {
		return HCoordinate;
	}
}

class Envelope {
	constructor(...args) {
		this.minx = null;
		this.maxx = null;
		this.miny = null;
		this.maxy = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.init();
			} else if (args.length === 1) {
				if (args[0] instanceof Coordinate) {
					let [p] = args;
					this.init(p.x, p.x, p.y, p.y);
				} else if (args[0] instanceof Envelope) {
					let [env] = args;
					this.init(env);
				}
			} else if (args.length === 2) {
				let [p1, p2] = args;
				this.init(p1.x, p2.x, p1.y, p2.y);
			} else if (args.length === 4) {
				let [x1, x2, y1, y2] = args;
				this.init(x1, x2, y1, y2);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparable, Serializable];
	}
	static intersects(...args) {
		if (args.length === 3) {
			let [p1, p2, q] = args;
			if (q.x >= (p1.x < p2.x ? p1.x : p2.x) && q.x <= (p1.x > p2.x ? p1.x : p2.x) && (q.y >= (p1.y < p2.y ? p1.y : p2.y) && q.y <= (p1.y > p2.y ? p1.y : p2.y))) {
				return true;
			}
			return false;
		} else if (args.length === 4) {
			let [p1, p2, q1, q2] = args;
			var minq = Math.min(q1.x, q2.x);
			var maxq = Math.max(q1.x, q2.x);
			var minp = Math.min(p1.x, p2.x);
			var maxp = Math.max(p1.x, p2.x);
			if (minp > maxq) return false;
			if (maxp < minq) return false;
			minq = Math.min(q1.y, q2.y);
			maxq = Math.max(q1.y, q2.y);
			minp = Math.min(p1.y, p2.y);
			maxp = Math.max(p1.y, p2.y);
			if (minp > maxq) return false;
			if (maxp < minq) return false;
			return true;
		}
	}
	getArea() {
		return this.getWidth() * this.getHeight();
	}
	equals(other) {
		if (!(other instanceof Envelope)) {
			return false;
		}
		var otherEnvelope = other;
		if (this.isNull()) {
			return otherEnvelope.isNull();
		}
		return this.maxx === otherEnvelope.getMaxX() && this.maxy === otherEnvelope.getMaxY() && this.minx === otherEnvelope.getMinX() && this.miny === otherEnvelope.getMinY();
	}
	intersection(env) {
		if (this.isNull() || env.isNull() || !this.intersects(env)) return new Envelope();
		var intMinX = this.minx > env.minx ? this.minx : env.minx;
		var intMinY = this.miny > env.miny ? this.miny : env.miny;
		var intMaxX = this.maxx < env.maxx ? this.maxx : env.maxx;
		var intMaxY = this.maxy < env.maxy ? this.maxy : env.maxy;
		return new Envelope(intMinX, intMaxX, intMinY, intMaxY);
	}
	isNull() {
		return this.maxx < this.minx;
	}
	getMaxX() {
		return this.maxx;
	}
	covers(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [p] = args;
				return this.covers(p.x, p.y);
			} else if (args[0] instanceof Envelope) {
				let [other] = args;
				if (this.isNull() || other.isNull()) {
					return false;
				}
				return other.getMinX() >= this.minx && other.getMaxX() <= this.maxx && other.getMinY() >= this.miny && other.getMaxY() <= this.maxy;
			}
		} else if (args.length === 2) {
			let [x, y] = args;
			if (this.isNull()) return false;
			return x >= this.minx && x <= this.maxx && y >= this.miny && y <= this.maxy;
		}
	}
	intersects(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Envelope) {
				let [other] = args;
				if (this.isNull() || other.isNull()) {
					return false;
				}
				return !(other.minx > this.maxx || other.maxx < this.minx || other.miny > this.maxy || other.maxy < this.miny);
			} else if (args[0] instanceof Coordinate) {
				let [p] = args;
				return this.intersects(p.x, p.y);
			}
		} else if (args.length === 2) {
			let [x, y] = args;
			if (this.isNull()) return false;
			return !(x > this.maxx || x < this.minx || y > this.maxy || y < this.miny);
		}
	}
	getMinY() {
		return this.miny;
	}
	getMinX() {
		return this.minx;
	}
	expandToInclude(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [p] = args;
				this.expandToInclude(p.x, p.y);
			} else if (args[0] instanceof Envelope) {
				let [other] = args;
				if (other.isNull()) {
					return null;
				}
				if (this.isNull()) {
					this.minx = other.getMinX();
					this.maxx = other.getMaxX();
					this.miny = other.getMinY();
					this.maxy = other.getMaxY();
				} else {
					if (other.minx < this.minx) {
						this.minx = other.minx;
					}
					if (other.maxx > this.maxx) {
						this.maxx = other.maxx;
					}
					if (other.miny < this.miny) {
						this.miny = other.miny;
					}
					if (other.maxy > this.maxy) {
						this.maxy = other.maxy;
					}
				}
			}
		} else if (args.length === 2) {
			let [x, y] = args;
			if (this.isNull()) {
				this.minx = x;
				this.maxx = x;
				this.miny = y;
				this.maxy = y;
			} else {
				if (x < this.minx) {
					this.minx = x;
				}
				if (x > this.maxx) {
					this.maxx = x;
				}
				if (y < this.miny) {
					this.miny = y;
				}
				if (y > this.maxy) {
					this.maxy = y;
				}
			}
		}
	}
	minExtent() {
		if (this.isNull()) return 0.0;
		var w = this.getWidth();
		var h = this.getHeight();
		if (w < h) return w;
		return h;
	}
	getWidth() {
		if (this.isNull()) {
			return 0;
		}
		return this.maxx - this.minx;
	}
	compareTo(o) {
		var env = o;
		if (this.isNull()) {
			if (env.isNull()) return 0;
			return -1;
		} else {
			if (env.isNull()) return 1;
		}
		if (this.minx < env.minx) return -1;
		if (this.minx > env.minx) return 1;
		if (this.miny < env.miny) return -1;
		if (this.miny > env.miny) return 1;
		if (this.maxx < env.maxx) return -1;
		if (this.maxx > env.maxx) return 1;
		if (this.maxy < env.maxy) return -1;
		if (this.maxy > env.maxy) return 1;
		return 0;
	}
	translate(transX, transY) {
		if (this.isNull()) {
			return null;
		}
		this.init(this.getMinX() + transX, this.getMaxX() + transX, this.getMinY() + transY, this.getMaxY() + transY);
	}
	toString() {
		return "Env[" + this.minx + " : " + this.maxx + ", " + this.miny + " : " + this.maxy + "]";
	}
	setToNull() {
		this.minx = 0;
		this.maxx = -1;
		this.miny = 0;
		this.maxy = -1;
	}
	getHeight() {
		if (this.isNull()) {
			return 0;
		}
		return this.maxy - this.miny;
	}
	maxExtent() {
		if (this.isNull()) return 0.0;
		var w = this.getWidth();
		var h = this.getHeight();
		if (w > h) return w;
		return h;
	}
	expandBy(...args) {
		if (args.length === 1) {
			let [distance] = args;
			this.expandBy(distance, distance);
		} else if (args.length === 2) {
			let [deltaX, deltaY] = args;
			if (this.isNull()) return null;
			this.minx -= deltaX;
			this.maxx += deltaX;
			this.miny -= deltaY;
			this.maxy += deltaY;
			if (this.minx > this.maxx || this.miny > this.maxy) this.setToNull();
		}
	}
	contains(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Envelope) {
				let [other] = args;
				return this.covers(other);
			} else if (args[0] instanceof Coordinate) {
				let [p] = args;
				return this.covers(p);
			}
		} else if (args.length === 2) {
			let [x, y] = args;
			return this.covers(x, y);
		}
	}
	centre() {
		if (this.isNull()) return null;
		return new Coordinate((this.getMinX() + this.getMaxX()) / 2.0, (this.getMinY() + this.getMaxY()) / 2.0);
	}
	init(...args) {
		if (args.length === 0) {
			let [] = args;
			this.setToNull();
		} else if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [p] = args;
				this.init(p.x, p.x, p.y, p.y);
			} else if (args[0] instanceof Envelope) {
				let [env] = args;
				this.minx = env.minx;
				this.maxx = env.maxx;
				this.miny = env.miny;
				this.maxy = env.maxy;
			}
		} else if (args.length === 2) {
			let [p1, p2] = args;
			this.init(p1.x, p2.x, p1.y, p2.y);
		} else if (args.length === 4) {
			let [x1, x2, y1, y2] = args;
			if (x1 < x2) {
				this.minx = x1;
				this.maxx = x2;
			} else {
				this.minx = x2;
				this.maxx = x1;
			}
			if (y1 < y2) {
				this.miny = y1;
				this.maxy = y2;
			} else {
				this.miny = y2;
				this.maxy = y1;
			}
		}
	}
	getMaxY() {
		return this.maxy;
	}
	distance(env) {
		if (this.intersects(env)) return 0;
		var dx = 0.0;
		if (this.maxx < env.minx) dx = env.minx - this.maxx; else if (this.minx > env.maxx) dx = this.minx - env.maxx;
		var dy = 0.0;
		if (this.maxy < env.miny) dy = env.miny - this.maxy; else if (this.miny > env.maxy) dy = this.miny - env.maxy;
		if (dx === 0.0) return dy;
		if (dy === 0.0) return dx;
		return Math.sqrt(dx * dx + dy * dy);
	}
	hashCode() {
		var result = 17;
		result = 37 * result + Coordinate.hashCode(this.minx);
		result = 37 * result + Coordinate.hashCode(this.maxx);
		result = 37 * result + Coordinate.hashCode(this.miny);
		result = 37 * result + Coordinate.hashCode(this.maxy);
		return result;
	}
	getClass() {
		return Envelope;
	}
}
Envelope.serialVersionUID = 5873921885273102420;

const regExes = {
  'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
  'emptyTypeStr': /^\s*(\w+)\s*EMPTY\s*$/,
  'spaces': /\s+/,
  'parenComma': /\)\s*,\s*\(/,
  'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/, // can't use {2} here
  'trimParens': /^\s*\(?(.*?)\)?\s*$/
}

/**
 * Class for reading and writing Well-Known Text.
 *
 * NOTE: Adapted from OpenLayers 2.11 implementation.
 * @private
 */
class WKTParser {
  /**
   * Create a new parser for WKT
   *
   * @param {GeometryFactory}
   *          geometryFactory
   * @return An instance of WKTParser.
   */
  constructor (geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
  }

  /**
   * Deserialize a WKT string and return a geometry. Supports WKT for POINT,
   * MULTIPOINT, LINESTRING, LINEARRING, MULTILINESTRING, POLYGON, MULTIPOLYGON,
   * and GEOMETRYCOLLECTION.
   *
   * @param {String} wkt A WKT string.
   * @return {Geometry} A geometry instance.
   */
  read (wkt) {
    var geometry, type, str
    wkt = wkt.replace(/[\n\r]/g, ' ')
    var matches = regExes.typeStr.exec(wkt)
    if (wkt.search('EMPTY') !== -1) {
      matches = regExes.emptyTypeStr.exec(wkt)
      matches[2] = undefined
    }
    if (matches) {
      type = matches[1].toLowerCase()
      str = matches[2]
      if (parse$1[type]) {
        geometry = parse$1[type].apply(this, [str])
      }
    }

    if (geometry === undefined) throw new Error('Could not parse WKT ' + wkt)

    return geometry
  }

  /**
   * Serialize a geometry into a WKT string.
   *
   * @param {Geometry} geometry A feature or array of features.
   * @return {String} The WKT string representation of the input geometries.
   */
  write (geometry) {
    return this.extractGeometry(geometry)
  }

  /**
   * Entry point to construct the WKT for a single Geometry object.
   *
   * @param {Geometry} geometry
   * @return {String} A WKT string of representing the geometry.
   */
  extractGeometry (geometry) {
    var type = geometry.getGeometryType().toLowerCase()
    if (!extract$1[type]) {
      return null
    }
    var wktType = type.toUpperCase()
    var data
    if (geometry.isEmpty()) {
      data = wktType + ' EMPTY'
    } else {
      data = wktType + '(' + extract$1[type].apply(this, [geometry]) + ')'
    }
    return data
  }
}

/**
 * Object with properties corresponding to the geometry types. Property values
 * are functions that do the actual data extraction.
 */
const extract$1 = {
  coordinate (coordinate) {
    return coordinate.x + ' ' + coordinate.y
  },

  /**
   * Return a space delimited string of point coordinates.
   *
   * @param {Point}
   *          point
   * @return {String} A string of coordinates representing the point.
   */
  point (point) {
    return extract$1.coordinate.call(this, point.coordinates.coordinates[0])
  },

  /**
   * Return a comma delimited string of point coordinates from a multipoint.
   *
   * @param {MultiPoint}
   *          multipoint
   * @return {String} A string of point coordinate strings representing the
   *         multipoint.
   */
  multipoint (multipoint) {
    var array = []
    for (let i = 0, len = multipoint.geometries.length; i < len; ++i) {
      array.push('(' + extract$1.point.apply(this, [multipoint.geometries[i]]) + ')')
    }
    return array.join(',')
  },

  /**
   * Return a comma delimited string of point coordinates from a line.
   *
   * @param {LineString} linestring
   * @return {String} A string of point coordinate strings representing the linestring.
   */
  linestring (linestring) {
    var array = []
    for (let i = 0, len = linestring.points.coordinates.length; i < len; ++i) {
      array.push(extract$1.coordinate.apply(this, [linestring.points.coordinates[i]]))
    }
    return array.join(',')
  },

  linearring (linearring) {
    var array = []
    for (let i = 0, len = linearring.points.coordinates.length; i < len; ++i) {
      array.push(extract$1.coordinate.apply(this, [linearring.points.coordinates[i]]))
    }
    return array.join(',')
  },

  /**
   * Return a comma delimited string of linestring strings from a
   * multilinestring.
   *
   * @param {MultiLineString} multilinestring
   * @return {String} A string of of linestring strings representing the multilinestring.
   */
  multilinestring (multilinestring) {
    var array = []
    for (let i = 0, len = multilinestring.geometries.length; i < len; ++i) {
      array.push('(' +
        extract$1.linestring.apply(this, [multilinestring.geometries[i]]) +
        ')')
    }
    return array.join(',')
  },

  /**
   * Return a comma delimited string of linear ring arrays from a polygon.
   *
   * @param {Polygon} polygon
   * @return {String} An array of linear ring arrays representing the polygon.
   */
  polygon (polygon) {
    var array = []
    array.push('(' + extract$1.linestring.apply(this, [polygon.shell]) + ')')
    for (let i = 0, len = polygon.holes.length; i < len; ++i) {
      array.push('(' + extract$1.linestring.apply(this, [polygon.holes[i]]) + ')')
    }
    return array.join(',')
  },

  /**
   * Return an array of polygon arrays from a multipolygon.
   *
   * @param {MultiPolygon} multipolygon
   * @return {String} An array of polygon arrays representing the multipolygon.
   */
  multipolygon (multipolygon) {
    var array = []
    for (let i = 0, len = multipolygon.geometries.length; i < len; ++i) {
      array.push('(' + extract$1.polygon.apply(this, [multipolygon.geometries[i]]) + ')')
    }
    return array.join(',')
  },

  /**
   * Return the WKT portion between 'GEOMETRYCOLLECTION(' and ')' for an
   * geometrycollection.
   *
   * @param {GeometryCollection} collection
   * @return {String} internal WKT representation of the collection.
   */
  geometrycollection (collection) {
    var array = []
    for (let i = 0, len = collection.geometries.length; i < len; ++i) {
      array.push(this.extractGeometry(collection.geometries[i]))
    }
    return array.join(',')
  }
}

/**
 * Object with properties corresponding to the geometry types. Property values
 * are functions that do the actual parsing.
 */
const parse$1 = {
  /**
   * Return point geometry given a point WKT fragment.
   *
   * @param {String} str A WKT fragment representing the point.
   * @return {Point} A point geometry.
   * @private
   */
  point (str) {
    if (str === undefined) {
      return this.geometryFactory.createPoint()
    }

    var coords = str.trim().split(regExes.spaces)
    return this.geometryFactory.createPoint(new Coordinate(Number.parseFloat(coords[0]),
      Number.parseFloat(coords[1])))
  },

  /**
   * Return a multipoint geometry given a multipoint WKT fragment.
   *
   * @param {String} str A WKT fragment representing the multipoint.
   * @return {Point} A multipoint feature.
   * @private
   */
  multipoint (str) {
    if (str === undefined) {
      return this.geometryFactory.createMultiPoint()
    }

    var point
    var points = str.trim().split(',')
    var components = []
    for (let i = 0, len = points.length; i < len; ++i) {
      point = points[i].replace(regExes.trimParens, '$1')
      components.push(parse$1.point.apply(this, [point]))
    }
    return this.geometryFactory.createMultiPoint(components)
  },

  /**
   * Return a linestring geometry given a linestring WKT fragment.
   *
   * @param {String} str A WKT fragment representing the linestring.
   * @return {LineString} A linestring geometry.
   * @private
   */
  linestring (str) {
    if (str === undefined) {
      return this.geometryFactory.createLineString()
    }

    var points = str.trim().split(',')
    var components = []
    var coords
    for (let i = 0, len = points.length; i < len; ++i) {
      coords = points[i].trim().split(regExes.spaces)
      components.push(new Coordinate(Number.parseFloat(coords[0]), Number.parseFloat(coords[1])))
    }
    return this.geometryFactory.createLineString(components)
  },

  /**
   * Return a linearring geometry given a linearring WKT fragment.
   *
   * @param {String} str A WKT fragment representing the linearring.
   * @return {LinearRing} A linearring geometry.
   * @private
   */
  linearring (str) {
    if (str === undefined) {
      return this.geometryFactory.createLinearRing()
    }

    var points = str.trim().split(',')
    var components = []
    var coords
    for (let i = 0, len = points.length; i < len; ++i) {
      coords = points[i].trim().split(regExes.spaces)
      components.push(new Coordinate(Number.parseFloat(coords[0]), Number.parseFloat(coords[1])))
    }
    return this.geometryFactory.createLinearRing(components)
  },

  /**
   * Return a multilinestring geometry given a multilinestring WKT fragment.
   *
   * @param {String} str A WKT fragment representing the multilinestring.
   * @return {MultiLineString} A multilinestring geometry.
   * @private
   */
  multilinestring (str) {
    if (str === undefined) {
      return this.geometryFactory.createMultiLineString()
    }

    var line
    var lines = str.trim().split(regExes.parenComma)
    var components = []
    for (let i = 0, len = lines.length; i < len; ++i) {
      line = lines[i].replace(regExes.trimParens, '$1')
      components.push(parse$1.linestring.apply(this, [line]))
    }
    return this.geometryFactory.createMultiLineString(components)
  },

  /**
   * Return a polygon geometry given a polygon WKT fragment.
   *
   * @param {String} str A WKT fragment representing the polygon.
   * @return {Polygon} A polygon geometry.
   * @private
   */
  polygon (str) {
    if (str === undefined) {
      return this.geometryFactory.createPolygon()
    }

    var ring, linestring, linearring
    var rings = str.trim().split(regExes.parenComma)
    var shell
    var holes = []
    for (let i = 0, len = rings.length; i < len; ++i) {
      ring = rings[i].replace(regExes.trimParens, '$1')
      linestring = parse$1.linestring.apply(this, [ring])
      linearring = this.geometryFactory.createLinearRing(linestring.points)
      if (i === 0) {
        shell = linearring
      } else {
        holes.push(linearring)
      }
    }
    return this.geometryFactory.createPolygon(shell, holes)
  },

  /**
   * Return a multipolygon geometry given a multipolygon WKT fragment.
   *
   * @param {String} str A WKT fragment representing the multipolygon.
   * @return {MultiPolygon} A multipolygon geometry.
   * @private
   */
  multipolygon (str) {
    if (str === undefined) {
      return this.geometryFactory.createMultiPolygon()
    }

    var polygon
    var polygons = str.trim().split(regExes.doubleParenComma)
    var components = []
    for (let i = 0, len = polygons.length; i < len; ++i) {
      polygon = polygons[i].replace(regExes.trimParens, '$1')
      components.push(parse$1.polygon.apply(this, [polygon]))
    }
    return this.geometryFactory.createMultiPolygon(components)
  },

  /**
   * Return a geometrycollection given a geometrycollection WKT fragment.
   *
   * @param {String} str A WKT fragment representing the geometrycollection.
   * @return {GeometryCollection}
   * @private
   */
  geometrycollection (str) {
    if (str === undefined) {
      return this.geometryFactory.createGeometryCollection()
    }

    // separate components of the collection with |
    str = str.replace(/,\s*([A-Za-z])/g, '|$1')
    var wktArray = str.trim().split('|')
    var components = []
    for (let i = 0, len = wktArray.length; i < len; ++i) {
      components.push(this.read(wktArray[i]))
    }
    return this.geometryFactory.createGeometryCollection(components)
  }
}

/**
 * Writes the Well-Known Text representation of a {@link Geometry}. The
 * Well-Known Text format is defined in the <A
 * HREF="http://www.opengis.org/techno/specs.htm"> OGC Simple Features
 * Specification for SQL</A>.
 * <p>
 * The <code>WKTWriter</code> outputs coordinates rounded to the precision
 * model. Only the maximum number of decimal places necessary to represent the
 * ordinates to the required precision will be output.
 * <p>
 * The SFS WKT spec does not define a special tag for {@link LinearRing}s.
 * Under the spec, rings are output as <code>LINESTRING</code>s.
 */
class WKTWriter {
  constructor (geometryFactory) {
    this.parser = new WKTParser(geometryFactory)
  }

  /**
   * Converts a <code>Geometry</code> to its Well-known Text representation.
   *
   * @param {Geometry}
   *          geometry a <code>Geometry</code> to process.
   * @return {string} a <Geometry Tagged Text> string (see the OpenGIS Simple
   *         Features Specification).
   */
  write (geometry) {
    return this.parser.write(geometry)
  }

  /**
   * Generates the WKT for a <tt>LINESTRING</tt> specified by two
   * {@link Coordinate}s.
   *
   * @param p0
   *          the first coordinate.
   * @param p1
   *          the second coordinate.
   *
   * @return the WKT.
   */
  toLineString (p0, p1) {
    if (arguments.length !== 2) {
      throw new Error('Not implemented')
    }

    return 'LINESTRING ( ' + p0.x + ' ' + p0.y + ', ' + p1.x + ' ' + p1.y + ' )'
  }
}

class LineIntersector {
	constructor(...args) {
		this.result = null;
		this.inputLines = Array(2).fill().map(() => Array(2));
		this.intPt = new Array(2);
		this.intLineIndex = null;
		this._isProper = null;
		this.pa = null;
		this.pb = null;
		this.precisionModel = null;
		if (args.length === 0) {
			let [] = args;
			this.intPt[0] = new Coordinate();
			this.intPt[1] = new Coordinate();
			this.pa = this.intPt[0];
			this.pb = this.intPt[1];
			this.result = 0;
		}
	}
	get interfaces_() {
		return [];
	}
	static computeEdgeDistance(p, p0, p1) {
		var dx = Math.abs(p1.x - p0.x);
		var dy = Math.abs(p1.y - p0.y);
		var dist = -1.0;
		if (p.equals(p0)) {
			dist = 0.0;
		} else if (p.equals(p1)) {
			if (dx > dy) dist = dx; else dist = dy;
		} else {
			var pdx = Math.abs(p.x - p0.x);
			var pdy = Math.abs(p.y - p0.y);
			if (dx > dy) dist = pdx; else dist = pdy;
			if (dist === 0.0 && !p.equals(p0)) {
				dist = Math.max(pdx, pdy);
			}
		}
		Assert.isTrue(!(dist === 0.0 && !p.equals(p0)), "Bad distance calculation");
		return dist;
	}
	static nonRobustComputeEdgeDistance(p, p1, p2) {
		var dx = p.x - p1.x;
		var dy = p.y - p1.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		Assert.isTrue(!(dist === 0.0 && !p.equals(p1)), "Invalid distance calculation");
		return dist;
	}
	getIndexAlongSegment(segmentIndex, intIndex) {
		this.computeIntLineIndex();
		return this.intLineIndex[segmentIndex][intIndex];
	}
	getTopologySummary() {
		var catBuf = new StringBuffer();
		if (this.isEndPoint()) catBuf.append(" endpoint");
		if (this._isProper) catBuf.append(" proper");
		if (this.isCollinear()) catBuf.append(" collinear");
		return catBuf.toString();
	}
	computeIntersection(p1, p2, p3, p4) {
		this.inputLines[0][0] = p1;
		this.inputLines[0][1] = p2;
		this.inputLines[1][0] = p3;
		this.inputLines[1][1] = p4;
		this.result = this.computeIntersect(p1, p2, p3, p4);
	}
	getIntersectionNum() {
		return this.result;
	}
	computeIntLineIndex(...args) {
		if (args.length === 0) {
			let [] = args;
			if (this.intLineIndex === null) {
				this.intLineIndex = Array(2).fill().map(() => Array(2));
				this.computeIntLineIndex(0);
				this.computeIntLineIndex(1);
			}
		} else if (args.length === 1) {
			let [segmentIndex] = args;
			var dist0 = this.getEdgeDistance(segmentIndex, 0);
			var dist1 = this.getEdgeDistance(segmentIndex, 1);
			if (dist0 > dist1) {
				this.intLineIndex[segmentIndex][0] = 0;
				this.intLineIndex[segmentIndex][1] = 1;
			} else {
				this.intLineIndex[segmentIndex][0] = 1;
				this.intLineIndex[segmentIndex][1] = 0;
			}
		}
	}
	isProper() {
		return this.hasIntersection() && this._isProper;
	}
	setPrecisionModel(precisionModel) {
		this.precisionModel = precisionModel;
	}
	isInteriorIntersection(...args) {
		if (args.length === 0) {
			let [] = args;
			if (this.isInteriorIntersection(0)) return true;
			if (this.isInteriorIntersection(1)) return true;
			return false;
		} else if (args.length === 1) {
			let [inputLineIndex] = args;
			for (var i = 0; i < this.result; i++) {
				if (!(this.intPt[i].equals2D(this.inputLines[inputLineIndex][0]) || this.intPt[i].equals2D(this.inputLines[inputLineIndex][1]))) {
					return true;
				}
			}
			return false;
		}
	}
	getIntersection(intIndex) {
		return this.intPt[intIndex];
	}
	isEndPoint() {
		return this.hasIntersection() && !this._isProper;
	}
	hasIntersection() {
		return this.result !== LineIntersector.NO_INTERSECTION;
	}
	getEdgeDistance(segmentIndex, intIndex) {
		var dist = LineIntersector.computeEdgeDistance(this.intPt[intIndex], this.inputLines[segmentIndex][0], this.inputLines[segmentIndex][1]);
		return dist;
	}
	isCollinear() {
		return this.result === LineIntersector.COLLINEAR_INTERSECTION;
	}
	toString() {
		return WKTWriter.toLineString(this.inputLines[0][0], this.inputLines[0][1]) + " - " + WKTWriter.toLineString(this.inputLines[1][0], this.inputLines[1][1]) + this.getTopologySummary();
	}
	getEndpoint(segmentIndex, ptIndex) {
		return this.inputLines[segmentIndex][ptIndex];
	}
	isIntersection(pt) {
		for (var i = 0; i < this.result; i++) {
			if (this.intPt[i].equals2D(pt)) {
				return true;
			}
		}
		return false;
	}
	getIntersectionAlongSegment(segmentIndex, intIndex) {
		this.computeIntLineIndex();
		return this.intPt[this.intLineIndex[segmentIndex][intIndex]];
	}
	getClass() {
		return LineIntersector;
	}
}
LineIntersector.DONT_INTERSECT = 0;
LineIntersector.DO_INTERSECT = 1;
LineIntersector.COLLINEAR = 2;
LineIntersector.NO_INTERSECTION = 0;
LineIntersector.POINT_INTERSECTION = 1;
LineIntersector.COLLINEAR_INTERSECTION = 2;

class RobustLineIntersector extends LineIntersector {
	constructor(...args) {
		super();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static nearestEndpoint(p1, p2, q1, q2) {
		var nearestPt = p1;
		var minDist = CGAlgorithms.distancePointLine(p1, q1, q2);
		var dist = CGAlgorithms.distancePointLine(p2, q1, q2);
		if (dist < minDist) {
			minDist = dist;
			nearestPt = p2;
		}
		dist = CGAlgorithms.distancePointLine(q1, p1, p2);
		if (dist < minDist) {
			minDist = dist;
			nearestPt = q1;
		}
		dist = CGAlgorithms.distancePointLine(q2, p1, p2);
		if (dist < minDist) {
			minDist = dist;
			nearestPt = q2;
		}
		return nearestPt;
	}
	isInSegmentEnvelopes(intPt) {
		var env0 = new Envelope(this.inputLines[0][0], this.inputLines[0][1]);
		var env1 = new Envelope(this.inputLines[1][0], this.inputLines[1][1]);
		return env0.contains(intPt) && env1.contains(intPt);
	}
	computeIntersection(...args) {
		if (args.length === 3) {
			let [p, p1, p2] = args;
			this._isProper = false;
			if (Envelope.intersects(p1, p2, p)) {
				if (CGAlgorithms.orientationIndex(p1, p2, p) === 0 && CGAlgorithms.orientationIndex(p2, p1, p) === 0) {
					this._isProper = true;
					if (p.equals(p1) || p.equals(p2)) {
						this._isProper = false;
					}
					this.result = LineIntersector.POINT_INTERSECTION;
					return null;
				}
			}
			this.result = LineIntersector.NO_INTERSECTION;
		} else return super.computeIntersection(...args);
	}
	normalizeToMinimum(n1, n2, n3, n4, normPt) {
		normPt.x = this.smallestInAbsValue(n1.x, n2.x, n3.x, n4.x);
		normPt.y = this.smallestInAbsValue(n1.y, n2.y, n3.y, n4.y);
		n1.x -= normPt.x;
		n1.y -= normPt.y;
		n2.x -= normPt.x;
		n2.y -= normPt.y;
		n3.x -= normPt.x;
		n3.y -= normPt.y;
		n4.x -= normPt.x;
		n4.y -= normPt.y;
	}
	safeHCoordinateIntersection(p1, p2, q1, q2) {
		var intPt = null;
		try {
			intPt = HCoordinate.intersection(p1, p2, q1, q2);
		} catch (e) {
			if (e instanceof NotRepresentableException) {
				intPt = RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2);
			} else throw e;
		} finally {}
		return intPt;
	}
	intersection(p1, p2, q1, q2) {
		var intPt = this.intersectionWithNormalization(p1, p2, q1, q2);
		if (!this.isInSegmentEnvelopes(intPt)) {
			intPt = new Coordinate(RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2));
		}
		if (this.precisionModel !== null) {
			this.precisionModel.makePrecise(intPt);
		}
		return intPt;
	}
	smallestInAbsValue(x1, x2, x3, x4) {
		var x = x1;
		var xabs = Math.abs(x);
		if (Math.abs(x2) < xabs) {
			x = x2;
			xabs = Math.abs(x2);
		}
		if (Math.abs(x3) < xabs) {
			x = x3;
			xabs = Math.abs(x3);
		}
		if (Math.abs(x4) < xabs) {
			x = x4;
		}
		return x;
	}
	checkDD(p1, p2, q1, q2, intPt) {
		var intPtDD = CGAlgorithmsDD.intersection(p1, p2, q1, q2);
		var isIn = this.isInSegmentEnvelopes(intPtDD);
		System.out.println("DD in env = " + isIn + "  --------------------- " + intPtDD);
		if (intPt.distance(intPtDD) > 0.0001) {
			System.out.println("Distance = " + intPt.distance(intPtDD));
		}
	}
	intersectionWithNormalization(p1, p2, q1, q2) {
		var n1 = new Coordinate(p1);
		var n2 = new Coordinate(p2);
		var n3 = new Coordinate(q1);
		var n4 = new Coordinate(q2);
		var normPt = new Coordinate();
		this.normalizeToEnvCentre(n1, n2, n3, n4, normPt);
		var intPt = this.safeHCoordinateIntersection(n1, n2, n3, n4);
		intPt.x += normPt.x;
		intPt.y += normPt.y;
		return intPt;
	}
	computeCollinearIntersection(p1, p2, q1, q2) {
		var p1q1p2 = Envelope.intersects(p1, p2, q1);
		var p1q2p2 = Envelope.intersects(p1, p2, q2);
		var q1p1q2 = Envelope.intersects(q1, q2, p1);
		var q1p2q2 = Envelope.intersects(q1, q2, p2);
		if (p1q1p2 && p1q2p2) {
			this.intPt[0] = q1;
			this.intPt[1] = q2;
			return LineIntersector.COLLINEAR_INTERSECTION;
		}
		if (q1p1q2 && q1p2q2) {
			this.intPt[0] = p1;
			this.intPt[1] = p2;
			return LineIntersector.COLLINEAR_INTERSECTION;
		}
		if (p1q1p2 && q1p1q2) {
			this.intPt[0] = q1;
			this.intPt[1] = p1;
			return q1.equals(p1) && !p1q2p2 && !q1p2q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
		}
		if (p1q1p2 && q1p2q2) {
			this.intPt[0] = q1;
			this.intPt[1] = p2;
			return q1.equals(p2) && !p1q2p2 && !q1p1q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
		}
		if (p1q2p2 && q1p1q2) {
			this.intPt[0] = q2;
			this.intPt[1] = p1;
			return q2.equals(p1) && !p1q1p2 && !q1p2q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
		}
		if (p1q2p2 && q1p2q2) {
			this.intPt[0] = q2;
			this.intPt[1] = p2;
			return q2.equals(p2) && !p1q1p2 && !q1p1q2 ? LineIntersector.POINT_INTERSECTION : LineIntersector.COLLINEAR_INTERSECTION;
		}
		return LineIntersector.NO_INTERSECTION;
	}
	normalizeToEnvCentre(n00, n01, n10, n11, normPt) {
		var minX0 = n00.x < n01.x ? n00.x : n01.x;
		var minY0 = n00.y < n01.y ? n00.y : n01.y;
		var maxX0 = n00.x > n01.x ? n00.x : n01.x;
		var maxY0 = n00.y > n01.y ? n00.y : n01.y;
		var minX1 = n10.x < n11.x ? n10.x : n11.x;
		var minY1 = n10.y < n11.y ? n10.y : n11.y;
		var maxX1 = n10.x > n11.x ? n10.x : n11.x;
		var maxY1 = n10.y > n11.y ? n10.y : n11.y;
		var intMinX = minX0 > minX1 ? minX0 : minX1;
		var intMaxX = maxX0 < maxX1 ? maxX0 : maxX1;
		var intMinY = minY0 > minY1 ? minY0 : minY1;
		var intMaxY = maxY0 < maxY1 ? maxY0 : maxY1;
		var intMidX = (intMinX + intMaxX) / 2.0;
		var intMidY = (intMinY + intMaxY) / 2.0;
		normPt.x = intMidX;
		normPt.y = intMidY;
		n00.x -= normPt.x;
		n00.y -= normPt.y;
		n01.x -= normPt.x;
		n01.y -= normPt.y;
		n10.x -= normPt.x;
		n10.y -= normPt.y;
		n11.x -= normPt.x;
		n11.y -= normPt.y;
	}
	computeIntersect(p1, p2, q1, q2) {
		this._isProper = false;
		if (!Envelope.intersects(p1, p2, q1, q2)) return LineIntersector.NO_INTERSECTION;
		var Pq1 = CGAlgorithms.orientationIndex(p1, p2, q1);
		var Pq2 = CGAlgorithms.orientationIndex(p1, p2, q2);
		if (Pq1 > 0 && Pq2 > 0 || Pq1 < 0 && Pq2 < 0) {
			return LineIntersector.NO_INTERSECTION;
		}
		var Qp1 = CGAlgorithms.orientationIndex(q1, q2, p1);
		var Qp2 = CGAlgorithms.orientationIndex(q1, q2, p2);
		if (Qp1 > 0 && Qp2 > 0 || Qp1 < 0 && Qp2 < 0) {
			return LineIntersector.NO_INTERSECTION;
		}
		var collinear = Pq1 === 0 && Pq2 === 0 && Qp1 === 0 && Qp2 === 0;
		if (collinear) {
			return this.computeCollinearIntersection(p1, p2, q1, q2);
		}
		if (Pq1 === 0 || Pq2 === 0 || Qp1 === 0 || Qp2 === 0) {
			this._isProper = false;
			if (p1.equals2D(q1) || p1.equals2D(q2)) {
				this.intPt[0] = p1;
			} else if (p2.equals2D(q1) || p2.equals2D(q2)) {
				this.intPt[0] = p2;
			} else if (Pq1 === 0) {
				this.intPt[0] = new Coordinate(q1);
			} else if (Pq2 === 0) {
				this.intPt[0] = new Coordinate(q2);
			} else if (Qp1 === 0) {
				this.intPt[0] = new Coordinate(p1);
			} else if (Qp2 === 0) {
				this.intPt[0] = new Coordinate(p2);
			}
		} else {
			this._isProper = true;
			this.intPt[0] = this.intersection(p1, p2, q1, q2);
		}
		return LineIntersector.POINT_INTERSECTION;
	}
	getClass() {
		return RobustLineIntersector;
	}
}

class RobustDeterminant {
	get interfaces_() {
		return [];
	}
	static orientationIndex(p1, p2, q) {
		var dx1 = p2.x - p1.x;
		var dy1 = p2.y - p1.y;
		var dx2 = q.x - p2.x;
		var dy2 = q.y - p2.y;
		return RobustDeterminant.signOfDet2x2(dx1, dy1, dx2, dy2);
	}
	static signOfDet2x2(x1, y1, x2, y2) {
		var sign = null;
		var swap = null;
		var k = null;
		var count = 0;
		sign = 1;
		if (x1 === 0.0 || y2 === 0.0) {
			if (y1 === 0.0 || x2 === 0.0) {
				return 0;
			} else if (y1 > 0) {
				if (x2 > 0) {
					return -sign;
				} else {
					return sign;
				}
			} else {
				if (x2 > 0) {
					return sign;
				} else {
					return -sign;
				}
			}
		}
		if (y1 === 0.0 || x2 === 0.0) {
			if (y2 > 0) {
				if (x1 > 0) {
					return sign;
				} else {
					return -sign;
				}
			} else {
				if (x1 > 0) {
					return -sign;
				} else {
					return sign;
				}
			}
		}
		if (0.0 < y1) {
			if (0.0 < y2) {
				if (y1 <= y2) {
					;
				} else {
					sign = -sign;
					swap = x1;
					x1 = x2;
					x2 = swap;
					swap = y1;
					y1 = y2;
					y2 = swap;
				}
			} else {
				if (y1 <= -y2) {
					sign = -sign;
					x2 = -x2;
					y2 = -y2;
				} else {
					swap = x1;
					x1 = -x2;
					x2 = swap;
					swap = y1;
					y1 = -y2;
					y2 = swap;
				}
			}
		} else {
			if (0.0 < y2) {
				if (-y1 <= y2) {
					sign = -sign;
					x1 = -x1;
					y1 = -y1;
				} else {
					swap = -x1;
					x1 = x2;
					x2 = swap;
					swap = -y1;
					y1 = y2;
					y2 = swap;
				}
			} else {
				if (y1 >= y2) {
					x1 = -x1;
					y1 = -y1;
					x2 = -x2;
					y2 = -y2;
					;
				} else {
					sign = -sign;
					swap = -x1;
					x1 = -x2;
					x2 = swap;
					swap = -y1;
					y1 = -y2;
					y2 = swap;
				}
			}
		}
		if (0.0 < x1) {
			if (0.0 < x2) {
				if (x1 <= x2) {
					;
				} else {
					return sign;
				}
			} else {
				return sign;
			}
		} else {
			if (0.0 < x2) {
				return -sign;
			} else {
				if (x1 >= x2) {
					sign = -sign;
					x1 = -x1;
					x2 = -x2;
					;
				} else {
					return -sign;
				}
			}
		}
		while (true) {
			count = count + 1;
			k = Math.floor(x2 / x1);
			x2 = x2 - k * x1;
			y2 = y2 - k * y1;
			if (y2 < 0.0) {
				return -sign;
			}
			if (y2 > y1) {
				return sign;
			}
			if (x1 > x2 + x2) {
				if (y1 < y2 + y2) {
					return sign;
				}
			} else {
				if (y1 > y2 + y2) {
					return -sign;
				} else {
					x2 = x1 - x2;
					y2 = y1 - y2;
					sign = -sign;
				}
			}
			if (y2 === 0.0) {
				if (x2 === 0.0) {
					return 0;
				} else {
					return -sign;
				}
			}
			if (x2 === 0.0) {
				return sign;
			}
			k = Math.floor(x1 / x2);
			x1 = x1 - k * x2;
			y1 = y1 - k * y2;
			if (y1 < 0.0) {
				return sign;
			}
			if (y1 > y2) {
				return -sign;
			}
			if (x2 > x1 + x1) {
				if (y2 < y1 + y1) {
					return -sign;
				}
			} else {
				if (y2 > y1 + y1) {
					return sign;
				} else {
					x1 = x2 - x1;
					y1 = y2 - y1;
					sign = -sign;
				}
			}
			if (y1 === 0.0) {
				if (x1 === 0.0) {
					return 0;
				} else {
					return sign;
				}
			}
			if (x1 === 0.0) {
				return -sign;
			}
		}
	}
	getClass() {
		return RobustDeterminant;
	}
}

class RayCrossingCounter {
	constructor(...args) {
		this.p = null;
		this.crossingCount = 0;
		this.isPointOnSegment = false;
		if (args.length === 1) {
			let [p] = args;
			this.p = p;
		}
	}
	get interfaces_() {
		return [];
	}
	static locatePointInRing(...args) {
		if (args.length === 2) {
			if (args[0] instanceof Coordinate && (args[1].interfaces_ && args[1].interfaces_.indexOf(CoordinateSequence) > -1)) {
				let [p, ring] = args;
				var counter = new RayCrossingCounter(p);
				var p1 = new Coordinate();
				var p2 = new Coordinate();
				for (var i = 1; i < ring.size(); i++) {
					ring.getCoordinate(i, p1);
					ring.getCoordinate(i - 1, p2);
					counter.countSegment(p1, p2);
					if (counter.isOnSegment()) return counter.getLocation();
				}
				return counter.getLocation();
			} else if (args[0] instanceof Coordinate && args[1] instanceof Array) {
				let [p, ring] = args;
				var counter = new RayCrossingCounter(p);
				for (var i = 1; i < ring.length; i++) {
					var p1 = ring[i];
					var p2 = ring[i - 1];
					counter.countSegment(p1, p2);
					if (counter.isOnSegment()) return counter.getLocation();
				}
				return counter.getLocation();
			}
		}
	}
	countSegment(p1, p2) {
		if (p1.x < this.p.x && p2.x < this.p.x) return null;
		if (this.p.x === p2.x && this.p.y === p2.y) {
			this.isPointOnSegment = true;
			return null;
		}
		if (p1.y === this.p.y && p2.y === this.p.y) {
			var minx = p1.x;
			var maxx = p2.x;
			if (minx > maxx) {
				minx = p2.x;
				maxx = p1.x;
			}
			if (this.p.x >= minx && this.p.x <= maxx) {
				this.isPointOnSegment = true;
			}
			return null;
		}
		if (p1.y > this.p.y && p2.y <= this.p.y || p2.y > this.p.y && p1.y <= this.p.y) {
			var x1 = p1.x - this.p.x;
			var y1 = p1.y - this.p.y;
			var x2 = p2.x - this.p.x;
			var y2 = p2.y - this.p.y;
			var xIntSign = RobustDeterminant.signOfDet2x2(x1, y1, x2, y2);
			if (xIntSign === 0.0) {
				this.isPointOnSegment = true;
				return null;
			}
			if (y2 < y1) xIntSign = -xIntSign;
			if (xIntSign > 0.0) {
				this.crossingCount++;
			}
		}
	}
	isPointInPolygon() {
		return this.getLocation() !== Location.EXTERIOR;
	}
	getLocation() {
		if (this.isPointOnSegment) return Location.BOUNDARY;
		if (this.crossingCount % 2 === 1) {
			return Location.INTERIOR;
		}
		return Location.EXTERIOR;
	}
	isOnSegment() {
		return this.isPointOnSegment;
	}
	getClass() {
		return RayCrossingCounter;
	}
}

class CGAlgorithms {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static orientationIndex(p1, p2, q) {
		return CGAlgorithmsDD.orientationIndex(p1, p2, q);
	}
	static signedArea(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [ring] = args;
				if (ring.length < 3) return 0.0;
				var sum = 0.0;
				var x0 = ring[0].x;
				for (var i = 1; i < ring.length - 1; i++) {
					var x = ring[i].x - x0;
					var y1 = ring[i + 1].y;
					var y2 = ring[i - 1].y;
					sum += x * (y2 - y1);
				}
				return sum / 2.0;
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [ring] = args;
				var n = ring.size();
				if (n < 3) return 0.0;
				var p0 = new Coordinate();
				var p1 = new Coordinate();
				var p2 = new Coordinate();
				ring.getCoordinate(0, p1);
				ring.getCoordinate(1, p2);
				var x0 = p1.x;
				p2.x -= x0;
				var sum = 0.0;
				for (var i = 1; i < n - 1; i++) {
					p0.y = p1.y;
					p1.x = p2.x;
					p1.y = p2.y;
					ring.getCoordinate(i + 1, p2);
					p2.x -= x0;
					sum += p1.x * (p0.y - p2.y);
				}
				return sum / 2.0;
			}
		}
	}
	static distanceLineLine(A, B, C, D) {
		if (A.equals(B)) return CGAlgorithms.distancePointLine(A, C, D);
		if (C.equals(D)) return CGAlgorithms.distancePointLine(D, A, B);
		var noIntersection = false;
		if (!Envelope.intersects(A, B, C, D)) {
			noIntersection = true;
		} else {
			var denom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
			if (denom === 0) {
				noIntersection = true;
			} else {
				var r_num = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
				var s_num = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
				var s = s_num / denom;
				var r = r_num / denom;
				if (r < 0 || r > 1 || s < 0 || s > 1) {
					noIntersection = true;
				}
			}
		}
		if (noIntersection) {
			return MathUtil.min(CGAlgorithms.distancePointLine(A, C, D), CGAlgorithms.distancePointLine(B, C, D), CGAlgorithms.distancePointLine(C, A, B), CGAlgorithms.distancePointLine(D, A, B));
		}
		return 0.0;
	}
	static isPointInRing(p, ring) {
		return CGAlgorithms.locatePointInRing(p, ring) !== Location.EXTERIOR;
	}
	static isCCW(ring) {
		var nPts = ring.length - 1;
		if (nPts < 3) throw new IllegalArgumentException$1("Ring has fewer than 4 points, so orientation cannot be determined");
		var hiPt = ring[0];
		var hiIndex = 0;
		for (var i = 1; i <= nPts; i++) {
			var p = ring[i];
			if (p.y > hiPt.y) {
				hiPt = p;
				hiIndex = i;
			}
		}
		var iPrev = hiIndex;
		do {
			iPrev = iPrev - 1;
			if (iPrev < 0) iPrev = nPts;
		} while (ring[iPrev].equals2D(hiPt) && iPrev !== hiIndex);
		var iNext = hiIndex;
		do {
			iNext = (iNext + 1) % nPts;
		} while (ring[iNext].equals2D(hiPt) && iNext !== hiIndex);
		var prev = ring[iPrev];
		var next = ring[iNext];
		if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) return false;
		var disc = CGAlgorithms.computeOrientation(prev, hiPt, next);
		var isCCW = false;
		if (disc === 0) {
			isCCW = prev.x > next.x;
		} else {
			isCCW = disc > 0;
		}
		return isCCW;
	}
	static locatePointInRing(p, ring) {
		return RayCrossingCounter.locatePointInRing(p, ring);
	}
	static distancePointLinePerpendicular(p, A, B) {
		var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
		var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
		return Math.abs(s) * Math.sqrt(len2);
	}
	static computeOrientation(p1, p2, q) {
		return CGAlgorithms.orientationIndex(p1, p2, q);
	}
	static length(pts) {
		var n = pts.size();
		if (n <= 1) return 0.0;
		var len = 0.0;
		var p = new Coordinate();
		pts.getCoordinate(0, p);
		var x0 = p.x;
		var y0 = p.y;
		for (var i = 1; i < n; i++) {
			pts.getCoordinate(i, p);
			var x1 = p.x;
			var y1 = p.y;
			var dx = x1 - x0;
			var dy = y1 - y0;
			len += Math.sqrt(dx * dx + dy * dy);
			x0 = x1;
			y0 = y1;
		}
		return len;
	}
	static distancePointLine(...args) {
		if (args.length === 2) {
			let [p, line] = args;
			if (line.length === 0) throw new IllegalArgumentException$1("Line array must contain at least one vertex");
			var minDistance = p.distance(line[0]);
			for (var i = 0; i < line.length - 1; i++) {
				var dist = CGAlgorithms.distancePointLine(p, line[i], line[i + 1]);
				if (dist < minDistance) {
					minDistance = dist;
				}
			}
			return minDistance;
		} else if (args.length === 3) {
			let [p, A, B] = args;
			if (A.x === B.x && A.y === B.y) return p.distance(A);
			var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
			var r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) / len2;
			if (r <= 0.0) return p.distance(A);
			if (r >= 1.0) return p.distance(B);
			var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
			return Math.abs(s) * Math.sqrt(len2);
		}
	}
	static isOnLine(p, pt) {
		var lineIntersector = new RobustLineIntersector();
		for (var i = 1; i < pt.length; i++) {
			var p0 = pt[i - 1];
			var p1 = pt[i];
			lineIntersector.computeIntersection(p, p0, p1);
			if (lineIntersector.hasIntersection()) {
				return true;
			}
		}
		return false;
	}
	getClass() {
		return CGAlgorithms;
	}
}
CGAlgorithms.CLOCKWISE = -1;
CGAlgorithms.RIGHT = CGAlgorithms.CLOCKWISE;
CGAlgorithms.COUNTERCLOCKWISE = 1;
CGAlgorithms.LEFT = CGAlgorithms.COUNTERCLOCKWISE;
CGAlgorithms.COLLINEAR = 0;
CGAlgorithms.STRAIGHT = CGAlgorithms.COLLINEAR;

class Geometry {
	constructor(...args) {
		this.envelope = null;
		this.factory = null;
		this.SRID = null;
		this.userData = null;
		if (args.length === 1) {
			let [factory] = args;
			this.factory = factory;
			this.SRID = factory.getSRID();
		}
	}
	get interfaces_() {
		return [Clonable, Comparable, Serializable];
	}
	static hasNonEmptyElements(geometries) {
		for (var i = 0; i < geometries.length; i++) {
			if (!geometries[i].isEmpty()) {
				return true;
			}
		}
		return false;
	}
	static hasNullElements(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === null) {
				return true;
			}
		}
		return false;
	}
	isGeometryCollection() {
		return this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION;
	}
	getFactory() {
		return this.factory;
	}
	getGeometryN(n) {
		return this;
	}
	getArea() {
		return 0.0;
	}
	union(...args) {
		if (args.length === 0) {
			let [] = args;
			return UnaryUnionOp.union(this);
		} else if (args.length === 1) {
			let [other] = args;
			if (this.isEmpty() || other.isEmpty()) {
				if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, this, other, this.factory);
				if (this.isEmpty()) return other.copy();
				if (other.isEmpty()) return this.copy();
			}
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(other);
			return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.UNION);
		}
	}
	isValid() {
		return IsValidOp.isValid(this);
	}
	isRectangle() {
		return false;
	}
	equals(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [g] = args;
				if (g === null) return false;
				return this.equalsTopo(g);
			} else if (args[0] instanceof Object) {
				let [o] = args;
				if (!(o instanceof Geometry)) return false;
				var g = o;
				return this.equalsExact(g);
			}
		}
	}
	equalsExact(other) {
		return this === other || this.equalsExact(other, 0);
	}
	intersection(other) {
		if (this.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, this, other, this.factory);
		if (this.isGeometryCollection()) {
			var g2 = other;
			return GeometryCollectionMapper.map(this, new (class {
				map(g) {
					return g.intersection(g2);
				}
				get interfaces_() {
					return [MapOp];
				}
			})());
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.INTERSECTION);
	}
	covers(g) {
		if (!this.getEnvelopeInternal().covers(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return true;
		}
		return this.relate(g).isCovers();
	}
	intersects(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return RectangleIntersects.intersects(this, g);
		}
		if (g.isRectangle()) {
			return RectangleIntersects.intersects(g, this);
		}
		return this.relate(g).isIntersects();
	}
	touches(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isTouches(this.getDimension(), g.getDimension());
	}
	geometryChanged() {
		this.apply(Geometry.geometryChangedFilter);
	}
	within(g) {
		return g.contains(this);
	}
	geometryChangedAction() {
		this.envelope = null;
	}
	buffer(...args) {
		if (args.length === 1) {
			let [distance] = args;
			return BufferOp.bufferOp(this, distance);
		} else if (args.length === 2) {
			let [distance, quadrantSegments] = args;
			return BufferOp.bufferOp(this, distance, quadrantSegments);
		} else if (args.length === 3) {
			let [distance, quadrantSegments, endCapStyle] = args;
			return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle);
		}
	}
	equalsNorm(g) {
		if (g === null) return false;
		return this.norm().equalsExact(g.norm());
	}
	getLength() {
		return 0.0;
	}
	getNumGeometries() {
		return 1;
	}
	compareTo(...args) {
		if (args.length === 1) {
			let [o] = args;
			var other = o;
			if (this.getSortIndex() !== other.getSortIndex()) {
				return this.getSortIndex() - other.getSortIndex();
			}
			if (this.isEmpty() && other.isEmpty()) {
				return 0;
			}
			if (this.isEmpty()) {
				return -1;
			}
			if (other.isEmpty()) {
				return 1;
			}
			return this.compareToSameClass(o);
		} else if (args.length === 2) {
			let [o, comp] = args;
			var other = o;
			if (this.getSortIndex() !== other.getSortIndex()) {
				return this.getSortIndex() - other.getSortIndex();
			}
			if (this.isEmpty() && other.isEmpty()) {
				return 0;
			}
			if (this.isEmpty()) {
				return -1;
			}
			if (other.isEmpty()) {
				return 1;
			}
			return this.compareToSameClass(o, comp);
		}
	}
	convexHull() {
		return new ConvexHull(this).getConvexHull();
	}
	equalsTopo(g) {
		if (!this.getEnvelopeInternal().equals(g.getEnvelopeInternal())) return false;
		return this.relate(g).isEquals(this.getDimension(), g.getDimension());
	}
	coveredBy(g) {
		return g.covers(this);
	}
	getUserData() {
		return this.userData;
	}
	getSRID() {
		return this.SRID;
	}
	getEnvelope() {
		return this.getFactory().toGeometry(this.getEnvelopeInternal());
	}
	checkNotGeometryCollection(g) {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION) {
			throw new IllegalArgumentException("This method does not support GeometryCollection arguments");
		}
	}
	equal(a, b, tolerance) {
		if (tolerance === 0) {
			return a.equals(b);
		}
		return a.distance(b) <= tolerance;
	}
	relate(...args) {
		if (args.length === 1) {
			let [g] = args;
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(g);
			return RelateOp.relate(this, g);
		} else if (args.length === 2) {
			let [g, intersectionPattern] = args;
			return this.relate(g).matches(intersectionPattern);
		}
	}
	overlaps(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isOverlaps(this.getDimension(), g.getDimension());
	}
	norm() {
		var copy = this.copy();
		copy.normalize();
		return copy;
	}
	getPrecisionModel() {
		return this.factory.getPrecisionModel();
	}
	getCentroid() {
		if (this.isEmpty()) return this.factory.createPoint();
		var centPt = Centroid.getCentroid(this);
		return this.createPointFromInternalCoord(centPt, this);
	}
	getEnvelopeInternal() {
		if (this.envelope === null) {
			this.envelope = this.computeEnvelopeInternal();
		}
		return new Envelope(this.envelope);
	}
	isEquivalentClass(other) {
		return this.name === other.getClass().getName();
	}
	clone() {
		try {
			var clone = super.clone();
			if (clone.envelope !== null) {
				clone.envelope = new Envelope(clone.envelope);
			}
			return clone;
		} catch (e) {
			if (e instanceof CloneNotSupportedException) {
				Assert.shouldNeverReachHere();
				return null;
			} else throw e;
		} finally {}
	}
	setSRID(SRID) {
		this.SRID = SRID;
	}
	getInteriorPoint() {
		if (this.isEmpty()) return this.factory.createPoint();
		var interiorPt = null;
		var dim = this.getDimension();
		if (dim === 0) {
			var intPt = new InteriorPointPoint(this);
			interiorPt = intPt.getInteriorPoint();
		} else if (dim === 1) {
			var intPt = new InteriorPointLine(this);
			interiorPt = intPt.getInteriorPoint();
		} else {
			var intPt = new InteriorPointArea(this);
			interiorPt = intPt.getInteriorPoint();
		}
		return this.createPointFromInternalCoord(interiorPt, this);
	}
	symDifference(other) {
		if (this.isEmpty() || other.isEmpty()) {
			if (this.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, this, other, this.factory);
			if (this.isEmpty()) return other.copy();
			if (other.isEmpty()) return this.copy();
		}
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.SYMDIFFERENCE);
	}
	setUserData(userData) {
		this.userData = userData;
	}
	toString() {
		return this.toText();
	}
	createPointFromInternalCoord(coord, exemplar) {
		exemplar.getPrecisionModel().makePrecise(coord);
		return exemplar.getFactory().createPoint(coord);
	}
	disjoint(g) {
		return !this.intersects(g);
	}
	crosses(g) {
		if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
		return this.relate(g).isCrosses(this.getDimension(), g.getDimension());
	}
	contains(g) {
		if (!this.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
		if (this.isRectangle()) {
			return RectangleContains.contains(this, g);
		}
		return this.relate(g).isContains();
	}
	difference(other) {
		if (this.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, this, other, this.factory);
		if (other.isEmpty()) return this.copy();
		this.checkNotGeometryCollection(this);
		this.checkNotGeometryCollection(other);
		return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.DIFFERENCE);
	}
	isSimple() {
		var op = new IsSimpleOp(this);
		return op.isSimple();
	}
	compare(a, b) {
		var i = a.iterator();
		var j = b.iterator();
		while (i.hasNext() && j.hasNext()) {
			var aElement = i.next();
			var bElement = j.next();
			var comparison = aElement.compareTo(bElement);
			if (comparison !== 0) {
				return comparison;
			}
		}
		if (i.hasNext()) {
			return 1;
		}
		if (j.hasNext()) {
			return -1;
		}
		return 0;
	}
	isWithinDistance(geom, distance) {
		var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
		if (envDist > distance) return false;
		return DistanceOp.isWithinDistance(this, geom, distance);
	}
	distance(g) {
		return DistanceOp.distance(this, g);
	}
	hashCode() {
		return this.getEnvelopeInternal().hashCode();
	}
	isGeometryCollectionOrDerived() {
		if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOINT || this.getSortIndex() === Geometry.SORTINDEX_MULTILINESTRING || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOLYGON) {
			return true;
		}
		return false;
	}
	getClass() {
		return Geometry;
	}
}
Geometry.serialVersionUID = 8763622679187376702;
Geometry.SORTINDEX_POINT = 0;
Geometry.SORTINDEX_MULTIPOINT = 1;
Geometry.SORTINDEX_LINESTRING = 2;
Geometry.SORTINDEX_LINEARRING = 3;
Geometry.SORTINDEX_MULTILINESTRING = 4;
Geometry.SORTINDEX_POLYGON = 5;
Geometry.SORTINDEX_MULTIPOLYGON = 6;
Geometry.SORTINDEX_GEOMETRYCOLLECTION = 7;
Geometry.geometryChangedFilter = new (class {
	filter(geom) {
		geom.geometryChangedAction();
	}
	get interfaces_() {
		return [GeometryComponentFilter];
	}
})();

class CoordinateFilter {
	get interfaces_() {
		return [];
	}
	filter(coord) {}
	getClass() {
		return CoordinateFilter;
	}
}

class BoundaryNodeRule {
	get interfaces_() {
		return [];
	}
	static get Mod2BoundaryNodeRule() {
		return Mod2BoundaryNodeRule;
	}
	static get EndPointBoundaryNodeRule() {
		return EndPointBoundaryNodeRule;
	}
	static get MultiValentEndPointBoundaryNodeRule() {
		return MultiValentEndPointBoundaryNodeRule;
	}
	static get MonoValentEndPointBoundaryNodeRule() {
		return MonoValentEndPointBoundaryNodeRule;
	}
	isInBoundary(boundaryCount) {}
	getClass() {
		return BoundaryNodeRule;
	}
}
class Mod2BoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount % 2 === 1;
	}
	getClass() {
		return Mod2BoundaryNodeRule;
	}
}
class EndPointBoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount > 0;
	}
	getClass() {
		return EndPointBoundaryNodeRule;
	}
}
class MultiValentEndPointBoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount > 1;
	}
	getClass() {
		return MultiValentEndPointBoundaryNodeRule;
	}
}
class MonoValentEndPointBoundaryNodeRule {
	get interfaces_() {
		return [BoundaryNodeRule];
	}
	isInBoundary(boundaryCount) {
		return boundaryCount === 1;
	}
	getClass() {
		return MonoValentEndPointBoundaryNodeRule;
	}
}
BoundaryNodeRule.MOD2_BOUNDARY_RULE = new Mod2BoundaryNodeRule();
BoundaryNodeRule.ENDPOINT_BOUNDARY_RULE = new EndPointBoundaryNodeRule();
BoundaryNodeRule.MULTIVALENT_ENDPOINT_BOUNDARY_RULE = new MultiValentEndPointBoundaryNodeRule();
BoundaryNodeRule.MONOVALENT_ENDPOINT_BOUNDARY_RULE = new MonoValentEndPointBoundaryNodeRule();
BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE = BoundaryNodeRule.MOD2_BOUNDARY_RULE;

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @constructor
 */
function Iterator() {};

/**
 * Returns true if the iteration has more elements.
 * @return {boolean}
 */
Iterator.prototype.hasNext = function() {};

/**
 * Returns the next element in the iteration.
 * @return {Object}
 */
Iterator.prototype.next = function() {};

/**
 * Removes from the underlying collection the last element returned by the
 * iterator (optional operation).
 */
Iterator.prototype.remove = function() {};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Collection.html
 *
 * @constructor
 */
function Collection() {};

/**
 * Ensures that this collection contains the specified element (optional
 * operation).
 * @param {Object} e
 * @return {boolean}
 */
Collection.prototype.add = function() {};


/**
 * Appends all of the elements in the specified collection to the end of this
 * list, in the order that they are returned by the specified collection's
 * iterator (optional operation).
 * @param {javascript.util.Collection} c
 * @return {boolean}
 */
Collection.prototype.addAll = function() {};


/**
 * Returns true if this collection contains no elements.
 * @return {boolean}
 */
Collection.prototype.isEmpty = function() {};


/**
 * Returns an iterator over the elements in this collection.
 * @return {javascript.util.Iterator}
 */
Collection.prototype.iterator = function() {};


/**
 * Returns an iterator over the elements in this collection.
 * @return {number}
 */
Collection.prototype.size = function() {};


/**
 * Returns an array containing all of the elements in this collection.
 * @return {Array}
 */
Collection.prototype.toArray = function() {};


/**
 * Removes a single instance of the specified element from this collection if it
 * is present. (optional)
 * @param {Object} e
 * @return {boolean}
 */
Collection.prototype.remove = function() {};

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
function IndexOutOfBoundsException$1(message) {
  this.message = message || '';
};
IndexOutOfBoundsException$1.prototype = new Error();

/**
 * @type {string}
 */
IndexOutOfBoundsException$1.prototype.name = 'IndexOutOfBoundsException';

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/List.html
 *
 * @extends {javascript.util.Collection}
 * @constructor
 */
function List() { };
List.prototype = new Collection();


/**
 * Returns the element at the specified position in this list.
 * @param {number} index
 * @return {Object}
 */
List.prototype.get = function() { };


/**
 * Replaces the element at the specified position in this list with the
 * specified element (optional operation).
 * @param {number} index
 * @param {Object} e
 * @return {Object}
 */
List.prototype.set = function() { };


/**
 * Returns true if this collection contains no elements.
 * @return {boolean}
 */
List.prototype.isEmpty = function() { };

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
function NoSuchElementException(message) {
  this.message = message || '';
};
NoSuchElementException.prototype = new Error();


/**
 * @type {string}
 */
NoSuchElementException.prototype.name = 'NoSuchElementException';

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
function OperationNotSupported(message) {
  this.message = message || '';
};
OperationNotSupported.prototype = new Error();


/**
 * @type {string}
 */
OperationNotSupported.prototype.name = 'OperationNotSupported';

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/ArrayList.html
 *
 * @extends List
 * @private
 */
class ArrayList extends List {
  constructor() {
    super();

    /**
     * @type {Array}
     * @private
    */
    this.array_ = [];

    if (arguments[0] instanceof Collection) {
      this.addAll(arguments[0]);
    }
  }

  ensureCapacity () {}
  get interfaces_() { return [List, Collection] }
};


/**
 * @override
 */
ArrayList.prototype.add = function(e) {
  this.array_.push(e);
  return true;
};


/**
 * @override
 */
ArrayList.prototype.addAll = function(c) {
  for (var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};


/**
 * @override
 */
ArrayList.prototype.set = function(index, element) {
  var oldElement = this.array_[index];
  this.array_[index] = element;
  return oldElement;
};


/**
 * @override
 */
ArrayList.prototype.iterator = function() {
  return new Iterator_(this);
};


/**
 * @override
 */
ArrayList.prototype.get = function(index) {
  if (index < 0 || index >= this.size()) {
    throw new IndexOutOfBoundsException$1();
  }

  return this.array_[index];
};


/**
 * @override
 */
ArrayList.prototype.isEmpty = function() {
  return this.array_.length === 0;
};


/**
 * @override
 */
ArrayList.prototype.size = function() {
  return this.array_.length;
};


/**
 * @override
 */
ArrayList.prototype.toArray = function() {
  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i]);
  }

  return array;
};


/**
 * @override
 */
ArrayList.prototype.remove = function(o) {
  var found = false;

  for (var i = 0, len = this.array_.length; i < len; i++) {
    if (this.array_[i] === o) {
      this.array_.splice(i, 1);
      found = true;
      break;
    }
  }

  return found;
};



/**
 * @extends {Iterator}
 * @param {ArrayList} arrayList
 * @constructor
 * @private
 */
var Iterator_ = function(arrayList) {
  /**
   * @type {ArrayList}
   * @private
  */
  this.arrayList_ = arrayList;
  /**
   * @type {number}
   * @private
  */
  this.position_ = 0;
};


/**
 * @override
 */
Iterator_.prototype.next = function() {
  if (this.position_ === this.arrayList_.size()) {
    throw new NoSuchElementException();
  }
  return this.arrayList_.get(this.position_++);
};


/**
 * @override
 */
Iterator_.prototype.hasNext = function() {
  if (this.position_ < this.arrayList_.size()) {
    return true;
  } else {
    return false;
  }
};

/**
 * TODO: should be in ListIterator
 * @override
 */
Iterator_.prototype.set = function(element) {
  return this.arrayList_.set(this.position_ - 1, element);
};


/**
 * @override
 */
Iterator_.prototype.remove = function() {
  throw new OperationNotSupported();
};

class CoordinateList extends ArrayList {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
					super();
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [coord] = args;
					this.ensureCapacity(coord.length);
					this.add(coord, true);
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [coord, allowRepeated] = args;
					this.ensureCapacity(coord.length);
					this.add(coord, allowRepeated);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getCoordinate(i) {
		return this.get(i);
	}
	addAll(...args) {
		if (args.length === 2) {
			let [coll, allowRepeated] = args;
			var isChanged = false;
			for (var i = coll.iterator(); i.hasNext(); ) {
				this.add(i.next(), allowRepeated);
				isChanged = true;
			}
			return isChanged;
		} else return super.addAll(...args);
	}
	clone() {
		var clone = super.clone();
		for (var i = 0; i < this.size(); i++) {
			clone.add(i, this.get(i).copy());
		}
		return clone;
	}
	toCoordinateArray() {
		return this.toArray(CoordinateList.coordArrayType);
	}
	add(...args) {
		if (args.length === 1) {
			let [coord] = args;
			super.add(coord);
		} else if (args.length === 2) {
			if (args[0] instanceof Array && typeof args[1] === "boolean") {
				let [coord, allowRepeated] = args;
				this.add(coord, allowRepeated, true);
				return true;
			} else if (args[0] instanceof Coordinate && typeof args[1] === "boolean") {
				let [coord, allowRepeated] = args;
				if (!allowRepeated) {
					if (this.size() >= 1) {
						var last = this.get(this.size() - 1);
						if (last.equals2D(coord)) return null;
					}
				}
				super.add(coord);
			} else if (args[0] instanceof Object && typeof args[1] === "boolean") {
				let [obj, allowRepeated] = args;
				this.add(obj, allowRepeated);
				return true;
			}
		} else if (args.length === 3) {
			if (typeof args[2] === "boolean" && (args[0] instanceof Array && typeof args[1] === "boolean")) {
				let [coord, allowRepeated, direction] = args;
				if (direction) {
					for (var i = 0; i < coord.length; i++) {
						this.add(coord[i], allowRepeated);
					}
				} else {
					for (var i = coord.length - 1; i >= 0; i--) {
						this.add(coord[i], allowRepeated);
					}
				}
				return true;
			} else if (typeof args[2] === "boolean" && (Number.isInteger(args[0]) && args[1] instanceof Coordinate)) {
				let [i, coord, allowRepeated] = args;
				if (!allowRepeated) {
					var size = this.size();
					if (size > 0) {
						if (i > 0) {
							var prev = this.get(i - 1);
							if (prev.equals2D(coord)) return null;
						}
						if (i < size) {
							var next = this.get(i);
							if (next.equals2D(coord)) return null;
						}
					}
				}
				super.add(i, coord);
			}
		} else if (args.length === 4) {
			let [coord, allowRepeated, start, end] = args;
			var inc = 1;
			if (start > end) inc = -1;
			for (var i = start; i !== end; i += inc) {
				this.add(coord[i], allowRepeated);
			}
			return true;
		}
	}
	closeRing() {
		if (this.size() > 0) this.add(new Coordinate(this.get(0)), false);
	}
	getClass() {
		return CoordinateList;
	}
}
CoordinateList.coordArrayType = new Array(0);

class CoordinateArrays {
	get interfaces_() {
		return [];
	}
	static get ForwardComparator() {
		return ForwardComparator;
	}
	static get BidirectionalComparator() {
		return BidirectionalComparator;
	}
	static isRing(pts) {
		if (pts.length < 4) return false;
		if (!pts[0].equals2D(pts[pts.length - 1])) return false;
		return true;
	}
	static ptNotInList(testPts, pts) {
		for (var i = 0; i < testPts.length; i++) {
			var testPt = testPts[i];
			if (CoordinateArrays.indexOf(testPt, pts) < 0) return testPt;
		}
		return null;
	}
	static scroll(coordinates, firstCoordinate) {
		var i = CoordinateArrays.indexOf(firstCoordinate, coordinates);
		if (i < 0) return null;
		var newCoordinates = new Array(coordinates.length);
		System.arraycopy(coordinates, i, newCoordinates, 0, coordinates.length - i);
		System.arraycopy(coordinates, 0, newCoordinates, coordinates.length - i, i);
		System.arraycopy(newCoordinates, 0, coordinates, 0, coordinates.length);
	}
	static equals(...args) {
		if (args.length === 2) {
			let [coord1, coord2] = args;
			if (coord1 === coord2) return true;
			if (coord1 === null || coord2 === null) return false;
			if (coord1.length !== coord2.length) return false;
			for (var i = 0; i < coord1.length; i++) {
				if (!coord1[i].equals(coord2[i])) return false;
			}
			return true;
		} else if (args.length === 3) {
			let [coord1, coord2, coordinateComparator] = args;
			if (coord1 === coord2) return true;
			if (coord1 === null || coord2 === null) return false;
			if (coord1.length !== coord2.length) return false;
			for (var i = 0; i < coord1.length; i++) {
				if (coordinateComparator.compare(coord1[i], coord2[i]) !== 0) return false;
			}
			return true;
		}
	}
	static intersection(coordinates, env) {
		var coordList = new CoordinateList();
		for (var i = 0; i < coordinates.length; i++) {
			if (env.intersects(coordinates[i])) coordList.add(coordinates[i], true);
		}
		return coordList.toCoordinateArray();
	}
	static hasRepeatedPoints(coord) {
		for (var i = 1; i < coord.length; i++) {
			if (coord[i - 1].equals(coord[i])) {
				return true;
			}
		}
		return false;
	}
	static removeRepeatedPoints(coord) {
		if (!CoordinateArrays.hasRepeatedPoints(coord)) return coord;
		var coordList = new CoordinateList(coord, false);
		return coordList.toCoordinateArray();
	}
	static reverse(coord) {
		var last = coord.length - 1;
		var mid = Math.trunc(last / 2);
		for (var i = 0; i <= mid; i++) {
			var tmp = coord[i];
			coord[i] = coord[last - i];
			coord[last - i] = tmp;
		}
	}
	static removeNull(coord) {
		var nonNull = 0;
		for (var i = 0; i < coord.length; i++) {
			if (coord[i] !== null) nonNull++;
		}
		var newCoord = new Array(nonNull);
		if (nonNull === 0) return newCoord;
		var j = 0;
		for (var i = 0; i < coord.length; i++) {
			if (coord[i] !== null) newCoord[j++] = coord[i];
		}
		return newCoord;
	}
	static copyDeep(...args) {
		if (args.length === 1) {
			let [coordinates] = args;
			var copy = new Array(coordinates.length);
			for (var i = 0; i < coordinates.length; i++) {
				copy[i] = new Coordinate(coordinates[i]);
			}
			return copy;
		} else if (args.length === 5) {
			let [src, srcStart, dest, destStart, length] = args;
			for (var i = 0; i < length; i++) {
				dest[destStart + i] = new Coordinate(src[srcStart + i]);
			}
		}
	}
	static isEqualReversed(pts1, pts2) {
		for (var i = 0; i < pts1.length; i++) {
			var p1 = pts1[i];
			var p2 = pts2[pts1.length - i - 1];
			if (p1.compareTo(p2) !== 0) return false;
		}
		return true;
	}
	static envelope(coordinates) {
		var env = new Envelope();
		for (var i = 0; i < coordinates.length; i++) {
			env.expandToInclude(coordinates[i]);
		}
		return env;
	}
	static toCoordinateArray(coordList) {
		return coordList.toArray(CoordinateArrays.coordArrayType);
	}
	static atLeastNCoordinatesOrNothing(n, c) {
		return c.length >= n ? c : [];
	}
	static indexOf(coordinate, coordinates) {
		for (var i = 0; i < coordinates.length; i++) {
			if (coordinate.equals(coordinates[i])) {
				return i;
			}
		}
		return -1;
	}
	static increasingDirection(pts) {
		for (var i = 0; i < Math.trunc(pts.length / 2); i++) {
			var j = pts.length - 1 - i;
			var comp = pts[i].compareTo(pts[j]);
			if (comp !== 0) return comp;
		}
		return 1;
	}
	static compare(pts1, pts2) {
		var i = 0;
		while (i < pts1.length && i < pts2.length) {
			var compare = pts1[i].compareTo(pts2[i]);
			if (compare !== 0) return compare;
			i++;
		}
		if (i < pts2.length) return -1;
		if (i < pts1.length) return 1;
		return 0;
	}
	static minCoordinate(coordinates) {
		var minCoord = null;
		for (var i = 0; i < coordinates.length; i++) {
			if (minCoord === null || minCoord.compareTo(coordinates[i]) > 0) {
				minCoord = coordinates[i];
			}
		}
		return minCoord;
	}
	static extract(pts, start, end) {
		start = MathUtil.clamp(start, 0, pts.length);
		end = MathUtil.clamp(end, -1, pts.length);
		var npts = end - start + 1;
		if (end < 0) npts = 0;
		if (start >= pts.length) npts = 0;
		if (end < start) npts = 0;
		var extractPts = new Array(npts);
		if (npts === 0) return extractPts;
		var iPts = 0;
		for (var i = start; i <= end; i++) {
			extractPts[iPts++] = pts[i];
		}
		return extractPts;
	}
	getClass() {
		return CoordinateArrays;
	}
}
class ForwardComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(o1, o2) {
		var pts1 = o1;
		var pts2 = o2;
		return CoordinateArrays.compare(pts1, pts2);
	}
	getClass() {
		return ForwardComparator;
	}
}
class BidirectionalComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(o1, o2) {
		var pts1 = o1;
		var pts2 = o2;
		if (pts1.length < pts2.length) return -1;
		if (pts1.length > pts2.length) return 1;
		if (pts1.length === 0) return 0;
		var forwardComp = CoordinateArrays.compare(pts1, pts2);
		var isEqualRev = BidirectionalComparator.isEqualReversed(pts1, pts2);
		if (isEqualRev) return 0;
		return forwardComp;
	}
	OLDcompare(o1, o2) {
		var pts1 = o1;
		var pts2 = o2;
		if (pts1.length < pts2.length) return -1;
		if (pts1.length > pts2.length) return 1;
		if (pts1.length === 0) return 0;
		var dir1 = BidirectionalComparator.increasingDirection(pts1);
		var dir2 = BidirectionalComparator.increasingDirection(pts2);
		var i1 = dir1 > 0 ? 0 : pts1.length - 1;
		var i2 = dir2 > 0 ? 0 : pts1.length - 1;
		for (var i = 0; i < pts1.length; i++) {
			var comparePt = pts1[i1].compareTo(pts2[i2]);
			if (comparePt !== 0) return comparePt;
			i1 += dir1;
			i2 += dir2;
		}
		return 0;
	}
	getClass() {
		return BidirectionalComparator;
	}
}
CoordinateArrays.coordArrayType = new Array(0);

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Map.html
 *
 * @constructor
 */
function Map$1() {};


/**
 * Returns the value to which the specified key is mapped, or null if this map
 * contains no mapping for the key.
 * @param {Object} key
 * @return {Object}
 */
Map$1.prototype.get = function() {};


/**
 * Associates the specified value with the specified key in this map (optional
 * operation).
 * @param {Object} key
 * @param {Object} value
 * @return {Object}
 */
Map$1.prototype.put = function() {};


/**
 * Returns the number of key-value mappings in this map.
 * @return {number}
 */
Map$1.prototype.size = function() {};


/**
 * Returns a Collection view of the values contained in this map.
 * @return {javascript.util.Collection}
 */
Map$1.prototype.values = function() {};

/**
 * Returns a {@link Set} view of the mappings contained in this map.
 * The set is backed by the map, so changes to the map are
 * reflected in the set, and vice-versa.  If the map is modified
 * while an iteration over the set is in progress (except through
 * the iterator's own <tt>remove</tt> operation, or through the
 * <tt>setValue</tt> operation on a map entry returned by the
 * iterator) the results of the iteration are undefined.  The set
 * supports element removal, which removes the corresponding
 * mapping from the map, via the <tt>Iterator.remove</tt>,
 * <tt>Set.remove</tt>, <tt>removeAll</tt>, <tt>retainAll</tt> and
 * <tt>clear</tt> operations.  It does not support the
 * <tt>add</tt> or <tt>addAll</tt> operations.
 *
 * @return {Set} a set view of the mappings contained in this map
 */
Map$1.prototype.entrySet = function() {};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedMap.html
 *
 * @extends {Map}
 * @constructor
 */
function SortedMap() {};
SortedMap.prototype = new Map$1();

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Set.html
 *
 * @extends {Collection}
 * @constructor
 */
function Set() {};
Set.prototype = new Collection();


/**
 * Returns true if this set contains the specified element. More formally,
 * returns true if and only if this set contains an element e such that (o==null ?
 * e==null : o.equals(e)).
 * @param {Object} e
 * @return {boolean}
 */
Set.prototype.contains = function() {};

/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 *
 * @extends {javascript.util.Set}
 * @constructor
 * @export
 */
function HashSet() {
  /**
   * @type {Array}
   * @private
  */
  this.array_ = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};
HashSet.prototype = new Set();


/**
 * @override
 */
HashSet.prototype.contains = function(o) {
  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this.array_[i];
    if (e === o) {
      return true;
    }
  }
  return false;
};


/**
 * @override
 */
HashSet.prototype.add = function(o) {
  if (this.contains(o)) {
    return false;
  }

  this.array_.push(o);

  return true;
};


/**
 * @override
 */
HashSet.prototype.addAll = function(c) {
  for (var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};


/**
 * @override
 */
HashSet.prototype.remove = function(o) {
  throw new javascript.util.OperationNotSupported();
};


/**
 * @override
 */
HashSet.prototype.size = function() {
  return this.array_.length;
};


/**
 * @override
 */
HashSet.prototype.isEmpty = function() {
  return this.array_.length === 0;
};


/**
 * @override
 */
HashSet.prototype.toArray = function() {
  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i]);
  }

  return array;
};


/**
 * @override
 */
HashSet.prototype.iterator = function() {
  return new Iterator_$2(this);
};



/**
 * @extends {Iterator}
 * @param {HashSet} hashSet
 * @constructor
 * @private
 */
var Iterator_$2 = function(hashSet) {
  /**
   * @type {HashSet}
   * @private
   */
  this.hashSet_ = hashSet;
  /**
   * @type {number}
   * @private
   */
  this.position_ = 0;
};


/**
 * @override
 */
Iterator_$2.prototype.next = function() {
  if (this.position_ === this.hashSet_.size()) {
    throw new NoSuchElementException();
  }
  return this.hashSet_.array_[this.position_++];
};


/**
 * @override
 */
Iterator_$2.prototype.hasNext = function() {
  if (this.position_ < this.hashSet_.size()) {
    return true;
  } else {
    return false;
  }
};


/**
 * @override
 */
Iterator_$2.prototype.remove = function() {
  throw new OperationNotSupported();
};

const BLACK = 0
const RED = 1
function colorOf (p) { return (p == null ? BLACK : p.color) }
function parentOf (p) { return (p == null ? null : p.parent) }
function setColor (p, c) { if (p !== null) p.color = c }
function leftOf (p) { return (p == null ? null : p.left) }
function rightOf (p) { return (p == null ? null : p.right) }

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeMap.html
 *
 * @extends {SortedMap}
 * @constructor
 */
function TreeMap() {
  /**
   * @type {Object}
   * @private
   */
  this.root_ = null;
  /**
   * @type {number}
   * @private
  */
  this.size_ = 0;
};
TreeMap.prototype = new SortedMap();


/**
 * @override
 */
TreeMap.prototype.get = function(key) {
  var p = this.root_;
  while (p !== null) {
    var cmp = key['compareTo'](p.key);
    if (cmp < 0) {
      p = p.left;
    } else if (cmp > 0) {
      p = p.right;
    } else {
      return p.value;
    }
  }
  return null;
};


/**
 * @override
 */
TreeMap.prototype.put = function(key, value) {
  if (this.root_ === null) {
    this.root_ = {
      key: key,
      value: value,
      left: null,
      right: null,
      parent: null,
      color: BLACK,
      getValue() { return this.value },
      getKey() { return this.key }
    };
    this.size_ = 1;
    return null;
  }
  var t = this.root_, parent, cmp;
  do {
    parent = t;
    cmp = key['compareTo'](t.key);
    if (cmp < 0) {
      t = t.left;
    } else if (cmp > 0) {
      t = t.right;
    } else {
      var oldValue = t.value;
      t.value = value;
      return oldValue;
    }
  } while (t !== null);
  var e = {
    key: key,
    left: null,
    right: null,
    value: value,
    parent: parent,
    color: BLACK,
    getValue() { return this.value },
    getKey() { return this.key }
  };
  if (cmp < 0) {
    parent.left = e;
  } else {
    parent.right = e;
  }
  this.fixAfterInsertion(e);
  this.size_++;
  return null;
};


/**
 * @param {Object} x
 */
TreeMap.prototype.fixAfterInsertion = function(x) {
  x.color = RED;
  while (x != null && x != this.root_ && x.parent.color == RED) {
    if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
      var y = rightOf(parentOf(parentOf(x)));
      if (colorOf(y) == RED) {
        setColor(parentOf(x), BLACK);
        setColor(y, BLACK);
        setColor(parentOf(parentOf(x)), RED);
        x = parentOf(parentOf(x));
      } else {
        if (x == rightOf(parentOf(x))) {
          x = parentOf(x);
          this.rotateLeft(x);
        }
        setColor(parentOf(x), BLACK);
        setColor(parentOf(parentOf(x)), RED);
        this.rotateRight(parentOf(parentOf(x)));
      }
    } else {
      var y = leftOf(parentOf(parentOf(x)));
      if (colorOf(y) == RED) {
        setColor(parentOf(x), BLACK);
        setColor(y, BLACK);
        setColor(parentOf(parentOf(x)), RED);
        x = parentOf(parentOf(x));
      } else {
        if (x == leftOf(parentOf(x))) {
          x = parentOf(x);
          this.rotateRight(x);
        }
        setColor(parentOf(x), BLACK);
        setColor(parentOf(parentOf(x)), RED);
        this.rotateLeft(parentOf(parentOf(x)));
      }
    }
  }
  this.root_.color = BLACK;
};


/**
 * @override
 */
TreeMap.prototype.values = function() {
  var arrayList = new ArrayList();
  var p = this.getFirstEntry();
  if (p !== null) {
    arrayList.add(p.value);
    while ((p = TreeMap.successor(p)) !== null) {
      arrayList.add(p.value);
    }
  }
  return arrayList;
};


/**
 * @override
 */
TreeMap.prototype.entrySet = function() {
  var hashSet = new HashSet();
  var p = this.getFirstEntry();
  if (p !== null) {
    hashSet.add(p);
    while ((p = TreeMap.successor(p)) !== null) {
      hashSet.add(p);
    }
  }
  return hashSet;
};


/**
 * @param {Object} p
 */
TreeMap.prototype.rotateLeft = function(p) {
  if (p != null) {
    var r = p.right;
    p.right = r.left;
    if (r.left != null)
      r.left.parent = p;
    r.parent = p.parent;
    if (p.parent == null)
      this.root_ = r;
    else if (p.parent.left == p)
      p.parent.left = r;
    else
      p.parent.right = r;
    r.left = p;
    p.parent = r;
  }
};


/**
 * @param {Object} p
 */
TreeMap.prototype.rotateRight = function(p) {
  if (p != null) {
    var l = p.left;
    p.left = l.right;
    if (l.right != null) l.right.parent = p;
    l.parent = p.parent;
    if (p.parent == null)
      this.root_ = l;
    else if (p.parent.right == p)
      p.parent.right = l;
    else p.parent.left = l;
    l.right = p;
    p.parent = l;
  }
};


/**
 * @return {Object}
 */
TreeMap.prototype.getFirstEntry = function() {
  var p = this.root_;
  if (p != null) {
    while (p.left != null) {
      p = p.left;
    }
  }
  return p;
};


/**
 * @param {Object} t
 * @return {Object}
 * @private
 */
TreeMap.successor = function(t) {
  if (t === null)
    return null;
  else if (t.right !== null) {
    var p = t.right;
    while (p.left !== null) {
      p = p.left;
    }
    return p;
  } else {
    var p = t.parent;
    var ch = t;
    while (p !== null && ch === p.right) {
      ch = p;
      p = p.parent;
    }
    return p;
  }
};


/**
 * @override
 */
TreeMap.prototype.size = function() {
  return this.size_;
};

class Lineal {
	get interfaces_() {
		return [];
	}
	getClass() {
		return Lineal;
	}
}

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedSet.html
 *
 * @extends {Set}
 * @constructor
 */
function SortedSet() {};
SortedSet.prototype = new Set();

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 *
 * @extends {SortedSet}
 * @constructor
 */
function TreeSet() {
  /**
   * @type {Array}
   * @private
  */
  this.array_ = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
};
TreeSet.prototype = new SortedSet();


/**
 * @override
 */
TreeSet.prototype.contains = function(o) {
  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this.array_[i];
    if (e['compareTo'](o) === 0) {
      return true;
    }
  }
  return false;
};


/**
 * @override
 */
TreeSet.prototype.add = function(o) {
  if (this.contains(o)) {
    return false;
  }

  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this.array_[i];
    if (e['compareTo'](o) === 1) {
      this.array_.splice(i, 0, o);
      return true;
    }
  }

  this.array_.push(o);

  return true;
};


/**
 * @override
 */
TreeSet.prototype.addAll = function(c) {
  for (var i = c.iterator(); i.hasNext();) {
    this.add(i.next());
  }
  return true;
};


/**
 * @override
 */
TreeSet.prototype.remove = function(e) {
  throw new OperationNotSupported();
};


/**
 * @override
 */
TreeSet.prototype.size = function() {
  return this.array_.length;
};


/**
 * @override
 */
TreeSet.prototype.isEmpty = function() {
  return this.array_.length === 0;
};


/**
 * @override
 */
TreeSet.prototype.toArray = function() {
  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i]);
  }

  return array;
};


/**
 * @override
 */
TreeSet.prototype.iterator = function() {
  return new Iterator_$1(this);
};



/**
 * @extends {javascript.util.Iterator}
 * @param {javascript.util.TreeSet} treeSet
 * @constructor
 * @private
 */
var Iterator_$1 = function(treeSet) {
  /**
   * @type {javascript.util.TreeSet}
   * @private
   */
  this.treeSet_ = treeSet;
  /**
   * @type {number}
   * @private
   */
  this.position_ = 0;
};


/**
 * @override
 */
Iterator_$1.prototype.next = function() {
  if (this.position_ === this.treeSet_.size()) {
    throw new NoSuchElementException();
  }
  return this.treeSet_.array_[this.position_++];
};


/**
 * @override
 */
Iterator_$1.prototype.hasNext = function() {
  if (this.position_ < this.treeSet_.size()) {
    return true;
  } else {
    return false;
  }
};


/**
 * @override
 */
Iterator_$1.prototype.remove = function() {
  throw new OperationNotSupported();
};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 *
 * @constructor
 */
function Arrays() {};

/**
 */
Arrays.sort = function() {
  var a = arguments[0], i, t, comparator, compare;
  if (arguments.length === 1) {
    compare = function(a, b) {
      return a.compareTo(b);
    }
    a.sort(compare);
    return;
  } else if (arguments.length === 2) {
    comparator = arguments[1];
    compare = function(a, b) {
      return comparator['compare'](a, b);
    };
    a.sort(compare);
  } else if (arguments.length === 3) {
    t = a.slice(arguments[1], arguments[2]);
    t.sort();
    var r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  } else if (arguments.length === 4) {
    t = a.slice(arguments[1], arguments[2]);
    comparator = arguments[3];
    compare = function(a, b) {
      return comparator['compare'](a, b);
    };
    t.sort(compare);
    r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
    return;
  }
};


/**
 * @param {Array} array
 * @return {ArrayList}
 */
Arrays.asList = function(array) {
  var arrayList = new ArrayList();
  for (var i = 0, len = array.length; i < len; i++) {
    arrayList.add(array[i]);
  }
  return arrayList;
};

class GeometryComponentFilter$1 {
	get interfaces_() {
		return [];
	}
	filter(geom) {}
	getClass() {
		return GeometryComponentFilter$1;
	}
}

class Dimension {
	get interfaces_() {
		return [];
	}
	static toDimensionSymbol(dimensionValue) {
		switch (dimensionValue) {
			case Dimension.FALSE:
				return Dimension.SYM_FALSE;
			case Dimension.TRUE:
				return Dimension.SYM_TRUE;
			case Dimension.DONTCARE:
				return Dimension.SYM_DONTCARE;
			case Dimension.P:
				return Dimension.SYM_P;
			case Dimension.L:
				return Dimension.SYM_L;
			case Dimension.A:
				return Dimension.SYM_A;
		}
		throw new IllegalArgumentException$1("Unknown dimension value: " + dimensionValue);
	}
	static toDimensionValue(dimensionSymbol) {
		switch (Character.toUpperCase(dimensionSymbol)) {
			case Dimension.SYM_FALSE:
				return Dimension.FALSE;
			case Dimension.SYM_TRUE:
				return Dimension.TRUE;
			case Dimension.SYM_DONTCARE:
				return Dimension.DONTCARE;
			case Dimension.SYM_P:
				return Dimension.P;
			case Dimension.SYM_L:
				return Dimension.L;
			case Dimension.SYM_A:
				return Dimension.A;
		}
		throw new IllegalArgumentException$1("Unknown dimension symbol: " + dimensionSymbol);
	}
	getClass() {
		return Dimension;
	}
}
Dimension.P = 0;
Dimension.L = 1;
Dimension.A = 2;
Dimension.FALSE = -1;
Dimension.TRUE = -2;
Dimension.DONTCARE = -3;
Dimension.SYM_FALSE = 'F';
Dimension.SYM_TRUE = 'T';
Dimension.SYM_DONTCARE = '*';
Dimension.SYM_P = '0';
Dimension.SYM_L = '1';
Dimension.SYM_A = '2';

class GeometryFilter {
	get interfaces_() {
		return [];
	}
	filter(geom) {}
	getClass() {
		return GeometryFilter;
	}
}

class CoordinateSequenceFilter {
	get interfaces_() {
		return [];
	}
	filter(seq, i) {}
	isDone() {}
	isGeometryChanged() {}
	getClass() {
		return CoordinateSequenceFilter;
	}
}

class GeometryCollection extends Geometry {
	constructor(...args) {
		super();
		this.geometries = null;
		if (args.length === 2) {
			let [geometries, factory] = args;
			super(factory);
			if (geometries === null) {
				geometries = [];
			}
			if (GeometryCollection.hasNullElements(geometries)) {
				throw new IllegalArgumentException$1("geometries must not contain null elements");
			}
			this.geometries = geometries;
		}
	}
	get interfaces_() {
		return [];
	}
	computeEnvelopeInternal() {
		var envelope = new Envelope();
		for (var i = 0; i < this.geometries.length; i++) {
			envelope.expandToInclude(this.geometries[i].getEnvelopeInternal());
		}
		return envelope;
	}
	getGeometryN(n) {
		return this.geometries[n];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_GEOMETRYCOLLECTION;
	}
	getCoordinates() {
		var coordinates = new Array(this.getNumPoints());
		var k = -1;
		for (var i = 0; i < this.geometries.length; i++) {
			var childCoordinates = this.geometries[i].getCoordinates();
			for (var j = 0; j < childCoordinates.length; j++) {
				k++;
				coordinates[k] = childCoordinates[j];
			}
		}
		return coordinates;
	}
	getArea() {
		var area = 0.0;
		for (var i = 0; i < this.geometries.length; i++) {
			area += this.geometries[i].getArea();
		}
		return area;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherCollection = other;
			if (this.geometries.length !== otherCollection.geometries.length) {
				return false;
			}
			for (var i = 0; i < this.geometries.length; i++) {
				if (!this.geometries[i].equalsExact(otherCollection.geometries[i], tolerance)) {
					return false;
				}
			}
			return true;
		} else return super.equalsExact(...args);
	}
	normalize() {
		for (var i = 0; i < this.geometries.length; i++) {
			this.geometries[i].normalize();
		}
		Arrays.sort(this.geometries);
	}
	getCoordinate() {
		if (this.isEmpty()) return null;
		return this.geometries[0].getCoordinate();
	}
	getBoundaryDimension() {
		var dimension = Dimension.FALSE;
		for (var i = 0; i < this.geometries.length; i++) {
			dimension = Math.max(dimension, this.geometries[i].getBoundaryDimension());
		}
		return dimension;
	}
	getDimension() {
		var dimension = Dimension.FALSE;
		for (var i = 0; i < this.geometries.length; i++) {
			dimension = Math.max(dimension, this.geometries[i].getDimension());
		}
		return dimension;
	}
	getLength() {
		var sum = 0.0;
		for (var i = 0; i < this.geometries.length; i++) {
			sum += this.geometries[i].getLength();
		}
		return sum;
	}
	getNumPoints() {
		var numPoints = 0;
		for (var i = 0; i < this.geometries.length; i++) {
			numPoints += this.geometries[i].getNumPoints();
		}
		return numPoints;
	}
	getNumGeometries() {
		return this.geometries.length;
	}
	reverse() {
		var n = this.geometries.length;
		var revGeoms = new Array(n);
		for (var i = 0; i < this.geometries.length; i++) {
			revGeoms[i] = this.geometries[i].reverse();
		}
		return this.getFactory().createGeometryCollection(revGeoms);
	}
	compareToSameClass(...args) {
		if (args.length === 1) {
			let [o] = args;
			var theseElements = new TreeSet(Arrays.asList(this.geometries));
			var otherElements = new TreeSet(Arrays.asList(o.geometries));
			return this.compare(theseElements, otherElements);
		} else if (args.length === 2) {
			let [o, comp] = args;
			var gc = o;
			var n1 = this.getNumGeometries();
			var n2 = gc.getNumGeometries();
			var i = 0;
			while (i < n1 && i < n2) {
				var thisGeom = this.getGeometryN(i);
				var otherGeom = gc.getGeometryN(i);
				var holeComp = thisGeom.compareToSameClass(otherGeom, comp);
				if (holeComp !== 0) return holeComp;
				i++;
			}
			if (i < n1) return 1;
			if (i < n2) return -1;
			return 0;
		}
	}
	apply(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
				let [filter] = args;
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
				let [filter] = args;
				if (this.geometries.length === 0) return null;
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
					if (filter.isDone()) {
						break;
					}
				}
				if (filter.isGeometryChanged()) this.geometryChanged();
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter$1) > -1) {
				let [filter] = args;
				filter.filter(this);
				for (var i = 0; i < this.geometries.length; i++) {
					this.geometries[i].apply(filter);
				}
			}
		}
	}
	getBoundary() {
		this.checkNotGeometryCollection(this);
		Assert.shouldNeverReachHere();
		return null;
	}
	clone() {
		var gc = super.clone();
		gc.geometries = new Array(this.geometries.length);
		for (var i = 0; i < this.geometries.length; i++) {
			gc.geometries[i] = this.geometries[i].clone();
		}
		return gc;
	}
	getGeometryType() {
		return "GeometryCollection";
	}
	copy() {
		var geometries = new Array(this.geometries.length);
		for (var i = 0; i < geometries.length; i++) {
			geometries[i] = this.geometries[i].copy();
		}
		return new GeometryCollection(geometries, this.factory);
	}
	isEmpty() {
		for (var i = 0; i < this.geometries.length; i++) {
			if (!this.geometries[i].isEmpty()) {
				return false;
			}
		}
		return true;
	}
	getClass() {
		return GeometryCollection;
	}
}
GeometryCollection.serialVersionUID = -5694727726395021467;

class MultiLineString extends GeometryCollection {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [lineStrings, factory] = args;
			super(lineStrings, factory);
		}
	}
	get interfaces_() {
		return [Lineal];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_MULTILINESTRING;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return super.equalsExact(other, tolerance);
		} else return super.equalsExact(...args);
	}
	getBoundaryDimension() {
		if (this.isClosed()) {
			return Dimension.FALSE;
		}
		return 0;
	}
	isClosed() {
		if (this.isEmpty()) {
			return false;
		}
		for (var i = 0; i < this.geometries.length; i++) {
			if (!this.geometries[i].isClosed()) {
				return false;
			}
		}
		return true;
	}
	getDimension() {
		return 1;
	}
	reverse() {
		var nLines = this.geometries.length;
		var revLines = new Array(nLines);
		for (var i = 0; i < this.geometries.length; i++) {
			revLines[nLines - 1 - i] = this.geometries[i].reverse();
		}
		return this.getFactory().createMultiLineString(revLines);
	}
	getBoundary() {
		return new BoundaryOp(this).getBoundary();
	}
	getGeometryType() {
		return "MultiLineString";
	}
	copy() {
		var lineStrings = new Array(this.geometries.length);
		for (var i = 0; i < lineStrings.length; i++) {
			lineStrings[i] = this.geometries[i].copy();
		}
		return new MultiLineString(lineStrings, this.factory);
	}
	getClass() {
		return MultiLineString;
	}
}
MultiLineString.serialVersionUID = 8166665132445433741;

class BoundaryOp {
	constructor(...args) {
		this.geom = null;
		this.geomFact = null;
		this.bnRule = null;
		this.endpointMap = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [geom] = args;
				overloaded.call(this, geom, BoundaryNodeRule.MOD2_BOUNDARY_RULE);
			} else if (args.length === 2) {
				let [geom, bnRule] = args;
				this.geom = geom;
				this.geomFact = geom.getFactory();
				this.bnRule = bnRule;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static getBoundary(...args) {
		if (args.length === 1) {
			let [g] = args;
			var bop = new BoundaryOp(g);
			return bop.getBoundary();
		} else if (args.length === 2) {
			let [g, bnRule] = args;
			var bop = new BoundaryOp(g, bnRule);
			return bop.getBoundary();
		}
	}
	boundaryMultiLineString(mLine) {
		if (this.geom.isEmpty()) {
			return this.getEmptyMultiPoint();
		}
		var bdyPts = this.computeBoundaryCoordinates(mLine);
		if (bdyPts.length === 1) {
			return this.geomFact.createPoint(bdyPts[0]);
		}
		return this.geomFact.createMultiPointFromCoords(bdyPts);
	}
	getBoundary() {
		if (this.geom instanceof LineString) return this.boundaryLineString(this.geom);
		if (this.geom instanceof MultiLineString) return this.boundaryMultiLineString(this.geom);
		return this.geom.getBoundary();
	}
	boundaryLineString(line) {
		if (this.geom.isEmpty()) {
			return this.getEmptyMultiPoint();
		}
		if (line.isClosed()) {
			var closedEndpointOnBoundary = this.bnRule.isInBoundary(2);
			if (closedEndpointOnBoundary) {
				return line.getStartPoint();
			} else {
				return this.geomFact.createMultiPoint();
			}
		}
		return this.geomFact.createMultiPoint([line.getStartPoint(), line.getEndPoint()]);
	}
	getEmptyMultiPoint() {
		return this.geomFact.createMultiPoint();
	}
	computeBoundaryCoordinates(mLine) {
		var bdyPts = new ArrayList();
		this.endpointMap = new TreeMap();
		for (var i = 0; i < mLine.getNumGeometries(); i++) {
			var line = mLine.getGeometryN(i);
			if (line.getNumPoints() === 0) continue;
			this.addEndpoint(line.getCoordinateN(0));
			this.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1));
		}
		for (var it = this.endpointMap.entrySet().iterator(); it.hasNext(); ) {
			var entry = it.next();
			var counter = entry.getValue();
			var valence = counter.count;
			if (this.bnRule.isInBoundary(valence)) {
				bdyPts.add(entry.getKey());
			}
		}
		return CoordinateArrays.toCoordinateArray(bdyPts);
	}
	addEndpoint(pt) {
		var counter = this.endpointMap.get(pt);
		if (counter === null) {
			counter = new Counter();
			this.endpointMap.put(pt, counter);
		}
		counter.count++;
	}
	getClass() {
		return BoundaryOp;
	}
}
class Counter {
	constructor(...args) {
		this.count = null;
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return Counter;
	}
}

class PrintStream {}

class StringReader {}

class DecimalFormat {}

class ByteArrayOutputStream {}

class IOException {}

class LineNumberReader {}

class StringUtil {
	get interfaces_() {
		return [];
	}
	static chars(c, n) {
		var ch = new Array(n);
		for (var i = 0; i < n; i++) {
			ch[i] = c;
		}
		return new String(ch);
	}
	static getStackTrace(...args) {
		if (args.length === 1) {
			let [t] = args;
			var os = new ByteArrayOutputStream();
			var ps = new PrintStream(os);
			t.printStackTrace(ps);
			return os.toString();
		} else if (args.length === 2) {
			let [t, depth] = args;
			var stackTrace = "";
			var stringReader = new StringReader(StringUtil.getStackTrace(t));
			var lineNumberReader = new LineNumberReader(stringReader);
			for (var i = 0; i < depth; i++) {
				try {
					stackTrace += lineNumberReader.readLine() + StringUtil.NEWLINE;
				} catch (e) {
					if (e instanceof IOException) {
						Assert.shouldNeverReachHere();
					} else throw e;
				} finally {}
			}
			return stackTrace;
		}
	}
	static split(s, separator) {
		var separatorlen = separator.length;
		var tokenList = new ArrayList();
		var tmpString = "" + s;
		var pos = tmpString.indexOf(separator);
		while (pos >= 0) {
			var token = tmpString.substring(0, pos);
			tokenList.add(token);
			tmpString = tmpString.substring(pos + separatorlen);
			pos = tmpString.indexOf(separator);
		}
		if (tmpString.length > 0) tokenList.add(tmpString);
		var res = new Array(tokenList.size());
		for (var i = 0; i < res.length; i++) {
			res[i] = tokenList.get(i);
		}
		return res;
	}
	static toString(...args) {
		if (args.length === 1) {
			let [d] = args;
			return StringUtil.SIMPLE_ORDINATE_FORMAT.format(d);
		} else return super.toString(...args);
	}
	static spaces(n) {
		return StringUtil.chars(' ', n);
	}
	getClass() {
		return StringUtil;
	}
}
StringUtil.NEWLINE = System.getProperty("line.separator");
StringUtil.SIMPLE_ORDINATE_FORMAT = new DecimalFormat("0.#");

class CoordinateSequences {
	get interfaces_() {
		return [];
	}
	static copyCoord(src, srcPos, dest, destPos) {
		var minDim = Math.min(src.getDimension(), dest.getDimension());
		for (var dim = 0; dim < minDim; dim++) {
			dest.setOrdinate(destPos, dim, src.getOrdinate(srcPos, dim));
		}
	}
	static isRing(seq) {
		var n = seq.size();
		if (n === 0) return true;
		if (n <= 3) return false;
		return seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y);
	}
	static isEqual(cs1, cs2) {
		var cs1Size = cs1.size();
		var cs2Size = cs2.size();
		if (cs1Size !== cs2Size) return false;
		var dim = Math.min(cs1.getDimension(), cs2.getDimension());
		for (var i = 0; i < cs1Size; i++) {
			for (var d = 0; d < dim; d++) {
				var v1 = cs1.getOrdinate(i, d);
				var v2 = cs2.getOrdinate(i, d);
				if (cs1.getOrdinate(i, d) === cs2.getOrdinate(i, d)) continue;
				if (Double.isNaN(v1) && Double.isNaN(v2)) continue;
				return false;
			}
		}
		return true;
	}
	static extend(fact, seq, size) {
		var newseq = fact.create(size, seq.getDimension());
		var n = seq.size();
		CoordinateSequences.copy(seq, 0, newseq, 0, n);
		if (n > 0) {
			for (var i = n; i < size; i++) CoordinateSequences.copy(seq, n - 1, newseq, i, 1);
		}
		return newseq;
	}
	static reverse(seq) {
		var last = seq.size() - 1;
		var mid = Math.trunc(last / 2);
		for (var i = 0; i <= mid; i++) {
			CoordinateSequences.swap(seq, i, last - i);
		}
	}
	static swap(seq, i, j) {
		if (i === j) return null;
		for (var dim = 0; dim < seq.getDimension(); dim++) {
			var tmp = seq.getOrdinate(i, dim);
			seq.setOrdinate(i, dim, seq.getOrdinate(j, dim));
			seq.setOrdinate(j, dim, tmp);
		}
	}
	static copy(src, srcPos, dest, destPos, length) {
		for (var i = 0; i < length; i++) {
			CoordinateSequences.copyCoord(src, srcPos + i, dest, destPos + i);
		}
	}
	static toString(...args) {
		if (args.length === 1) {
			let [cs] = args;
			var size = cs.size();
			if (size === 0) return "()";
			var dim = cs.getDimension();
			var buf = new StringBuffer();
			buf.append('(');
			for (var i = 0; i < size; i++) {
				if (i > 0) buf.append(" ");
				for (var d = 0; d < dim; d++) {
					if (d > 0) buf.append(",");
					buf.append(StringUtil.toString(cs.getOrdinate(i, d)));
				}
			}
			buf.append(')');
			return buf.toString();
		} else return super.toString(...args);
	}
	static ensureValidRing(fact, seq) {
		var n = seq.size();
		if (n === 0) return seq;
		if (n <= 3) return CoordinateSequences.createClosedRing(fact, seq, 4);
		var isClosed = seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y);
		if (isClosed) return seq;
		return CoordinateSequences.createClosedRing(fact, seq, n + 1);
	}
	static createClosedRing(fact, seq, size) {
		var newseq = fact.create(size, seq.getDimension());
		var n = seq.size();
		CoordinateSequences.copy(seq, 0, newseq, 0, n);
		for (var i = n; i < size; i++) CoordinateSequences.copy(seq, 0, newseq, i, 1);
		return newseq;
	}
	getClass() {
		return CoordinateSequences;
	}
}

class LineString extends Geometry {
	constructor(...args) {
		super();
		this.points = null;
		if (args.length === 2) {
			let [points, factory] = args;
			super(factory);
			this.init(points);
		}
	}
	get interfaces_() {
		return [Lineal];
	}
	computeEnvelopeInternal() {
		if (this.isEmpty()) {
			return new Envelope();
		}
		return this.points.expandEnvelope(new Envelope());
	}
	isRing() {
		return this.isClosed() && this.isSimple();
	}
	getSortIndex() {
		return Geometry.SORTINDEX_LINESTRING;
	}
	getCoordinates() {
		return this.points.toCoordinateArray();
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherLineString = other;
			if (this.points.size() !== otherLineString.points.size()) {
				return false;
			}
			for (var i = 0; i < this.points.size(); i++) {
				if (!this.equal(this.points.getCoordinate(i), otherLineString.points.getCoordinate(i), tolerance)) {
					return false;
				}
			}
			return true;
		} else return super.equalsExact(...args);
	}
	normalize() {
		for (var i = 0; i < Math.trunc(this.points.size() / 2); i++) {
			var j = this.points.size() - 1 - i;
			if (!this.points.getCoordinate(i).equals(this.points.getCoordinate(j))) {
				if (this.points.getCoordinate(i).compareTo(this.points.getCoordinate(j)) > 0) {
					CoordinateSequences.reverse(this.points);
				}
				return null;
			}
		}
	}
	getCoordinate() {
		if (this.isEmpty()) return null;
		return this.points.getCoordinate(0);
	}
	getBoundaryDimension() {
		if (this.isClosed()) {
			return Dimension.FALSE;
		}
		return 0;
	}
	isClosed() {
		if (this.isEmpty()) {
			return false;
		}
		return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1));
	}
	getEndPoint() {
		if (this.isEmpty()) {
			return null;
		}
		return this.getPointN(this.getNumPoints() - 1);
	}
	getDimension() {
		return 1;
	}
	getLength() {
		return CGAlgorithms.length(this.points);
	}
	getNumPoints() {
		return this.points.size();
	}
	reverse() {
		var seq = this.points.clone();
		CoordinateSequences.reverse(seq);
		var revLine = this.getFactory().createLineString(seq);
		return revLine;
	}
	compareToSameClass(...args) {
		if (args.length === 1) {
			let [o] = args;
			var line = o;
			var i = 0;
			var j = 0;
			while (i < this.points.size() && j < line.points.size()) {
				var comparison = this.points.getCoordinate(i).compareTo(line.points.getCoordinate(j));
				if (comparison !== 0) {
					return comparison;
				}
				i++;
				j++;
			}
			if (i < this.points.size()) {
				return 1;
			}
			if (j < line.points.size()) {
				return -1;
			}
			return 0;
		} else if (args.length === 2) {
			let [o, comp] = args;
			var line = o;
			return comp.compare(this.points, line.points);
		}
	}
	apply(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
				let [filter] = args;
				for (var i = 0; i < this.points.size(); i++) {
					filter.filter(this.points.getCoordinate(i));
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
				let [filter] = args;
				if (this.points.size() === 0) return null;
				for (var i = 0; i < this.points.size(); i++) {
					filter.filter(this.points, i);
					if (filter.isDone()) break;
				}
				if (filter.isGeometryChanged()) this.geometryChanged();
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter$1) > -1) {
				let [filter] = args;
				filter.filter(this);
			}
		}
	}
	getBoundary() {
		return new BoundaryOp(this).getBoundary();
	}
	isEquivalentClass(other) {
		return other instanceof LineString;
	}
	clone() {
		var ls = super.clone();
		ls.points = this.points.clone();
		return ls;
	}
	getCoordinateN(n) {
		return this.points.getCoordinate(n);
	}
	getGeometryType() {
		return "LineString";
	}
	copy() {
		return new LineString(this.points.copy(), this.factory);
	}
	getCoordinateSequence() {
		return this.points;
	}
	isEmpty() {
		return this.points.size() === 0;
	}
	init(points) {
		if (points === null) {
			points = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		if (points.size() === 1) {
			throw new IllegalArgumentException$1("Invalid number of points in LineString (found " + points.size() + " - must be 0 or >= 2)");
		}
		this.points = points;
	}
	isCoordinate(pt) {
		for (var i = 0; i < this.points.size(); i++) {
			if (this.points.getCoordinate(i).equals(pt)) {
				return true;
			}
		}
		return false;
	}
	getStartPoint() {
		if (this.isEmpty()) {
			return null;
		}
		return this.getPointN(0);
	}
	getPointN(n) {
		return this.getFactory().createPoint(this.points.getCoordinate(n));
	}
	getClass() {
		return LineString;
	}
}
LineString.serialVersionUID = 3110669828065365560;

class Puntal {
	get interfaces_() {
		return [];
	}
	getClass() {
		return Puntal;
	}
}

class Point extends Geometry {
	constructor(...args) {
		super();
		this.coordinates = null;
		if (args.length === 2) {
			let [coordinates, factory] = args;
			super(factory);
			this.init(coordinates);
		}
	}
	get interfaces_() {
		return [Puntal];
	}
	computeEnvelopeInternal() {
		if (this.isEmpty()) {
			return new Envelope();
		}
		var env = new Envelope();
		env.expandToInclude(this.coordinates.getX(0), this.coordinates.getY(0));
		return env;
	}
	getSortIndex() {
		return Geometry.SORTINDEX_POINT;
	}
	getCoordinates() {
		return this.isEmpty() ? [] : [this.getCoordinate()];
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			if (this.isEmpty() && other.isEmpty()) {
				return true;
			}
			if (this.isEmpty() !== other.isEmpty()) {
				return false;
			}
			return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance);
		} else return super.equalsExact(...args);
	}
	normalize() {}
	getCoordinate() {
		return this.coordinates.size() !== 0 ? this.coordinates.getCoordinate(0) : null;
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	getDimension() {
		return 0;
	}
	getNumPoints() {
		return this.isEmpty() ? 0 : 1;
	}
	reverse() {
		return this.copy();
	}
	getX() {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getX called on empty Point");
		}
		return this.getCoordinate().x;
	}
	compareToSameClass(...args) {
		if (args.length === 1) {
			let [other] = args;
			var point = other;
			return this.getCoordinate().compareTo(point.getCoordinate());
		} else if (args.length === 2) {
			let [other, comp] = args;
			var point = other;
			return comp.compare(this.coordinates, point.coordinates);
		}
	}
	apply(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
				let [filter] = args;
				if (this.isEmpty()) {
					return null;
				}
				filter.filter(this.getCoordinate());
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
				let [filter] = args;
				if (this.isEmpty()) return null;
				filter.filter(this.coordinates, 0);
				if (filter.isGeometryChanged()) this.geometryChanged();
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter$1) > -1) {
				let [filter] = args;
				filter.filter(this);
			}
		}
	}
	getBoundary() {
		return this.getFactory().createGeometryCollection(null);
	}
	clone() {
		var p = super.clone();
		p.coordinates = this.coordinates.clone();
		return p;
	}
	getGeometryType() {
		return "Point";
	}
	copy() {
		return new Point(this.coordinates.copy(), this.factory);
	}
	getCoordinateSequence() {
		return this.coordinates;
	}
	getY() {
		if (this.getCoordinate() === null) {
			throw new IllegalStateException("getY called on empty Point");
		}
		return this.getCoordinate().y;
	}
	isEmpty() {
		return this.coordinates.size() === 0;
	}
	init(coordinates) {
		if (coordinates === null) {
			coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
		}
		Assert.isTrue(coordinates.size() <= 1);
		this.coordinates = coordinates;
	}
	isSimple() {
		return true;
	}
	getClass() {
		return Point;
	}
}
Point.serialVersionUID = 4902022702746614570;

class Polygonal {
	get interfaces_() {
		return [];
	}
	getClass() {
		return Polygonal;
	}
}

class Polygon extends Geometry {
	constructor(...args) {
		super();
		this.shell = null;
		this.holes = null;
		if (args.length === 3) {
			let [shell, holes, factory] = args;
			super(factory);
			if (shell === null) {
				shell = this.getFactory().createLinearRing();
			}
			if (holes === null) {
				holes = [];
			}
			if (Polygon.hasNullElements(holes)) {
				throw new IllegalArgumentException$1("holes must not contain null elements");
			}
			if (shell.isEmpty() && Polygon.hasNonEmptyElements(holes)) {
				throw new IllegalArgumentException$1("shell is empty but holes are not");
			}
			this.shell = shell;
			this.holes = holes;
		}
	}
	get interfaces_() {
		return [Polygonal];
	}
	computeEnvelopeInternal() {
		return this.shell.getEnvelopeInternal();
	}
	getSortIndex() {
		return Geometry.SORTINDEX_POLYGON;
	}
	getCoordinates() {
		if (this.isEmpty()) {
			return [];
		}
		var coordinates = new Array(this.getNumPoints());
		var k = -1;
		var shellCoordinates = this.shell.getCoordinates();
		for (var x = 0; x < shellCoordinates.length; x++) {
			k++;
			coordinates[k] = shellCoordinates[x];
		}
		for (var i = 0; i < this.holes.length; i++) {
			var childCoordinates = this.holes[i].getCoordinates();
			for (var j = 0; j < childCoordinates.length; j++) {
				k++;
				coordinates[k] = childCoordinates[j];
			}
		}
		return coordinates;
	}
	getArea() {
		var area = 0.0;
		area += Math.abs(CGAlgorithms.signedArea(this.shell.getCoordinateSequence()));
		for (var i = 0; i < this.holes.length; i++) {
			area -= Math.abs(CGAlgorithms.signedArea(this.holes[i].getCoordinateSequence()));
		}
		return area;
	}
	isRectangle() {
		if (this.getNumInteriorRing() !== 0) return false;
		if (this.shell === null) return false;
		if (this.shell.getNumPoints() !== 5) return false;
		var seq = this.shell.getCoordinateSequence();
		var env = this.getEnvelopeInternal();
		for (var i = 0; i < 5; i++) {
			var x = seq.getX(i);
			if (!(x === env.getMinX() || x === env.getMaxX())) return false;
			var y = seq.getY(i);
			if (!(y === env.getMinY() || y === env.getMaxY())) return false;
		}
		var prevX = seq.getX(0);
		var prevY = seq.getY(0);
		for (var i = 1; i <= 4; i++) {
			var x = seq.getX(i);
			var y = seq.getY(i);
			var xChanged = x !== prevX;
			var yChanged = y !== prevY;
			if (xChanged === yChanged) return false;
			prevX = x;
			prevY = y;
		}
		return true;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			var otherPolygon = other;
			var thisShell = this.shell;
			var otherPolygonShell = otherPolygon.shell;
			if (!thisShell.equalsExact(otherPolygonShell, tolerance)) {
				return false;
			}
			if (this.holes.length !== otherPolygon.holes.length) {
				return false;
			}
			for (var i = 0; i < this.holes.length; i++) {
				if (!this.holes[i].equalsExact(otherPolygon.holes[i], tolerance)) {
					return false;
				}
			}
			return true;
		} else return super.equalsExact(...args);
	}
	normalize(...args) {
		if (args.length === 0) {
			let [] = args;
			this.normalize(this.shell, true);
			for (var i = 0; i < this.holes.length; i++) {
				this.normalize(this.holes[i], false);
			}
			Arrays.sort(this.holes);
		} else if (args.length === 2) {
			let [ring, clockwise] = args;
			if (ring.isEmpty()) {
				return null;
			}
			var uniqueCoordinates = new Array(ring.getCoordinates().length - 1);
			System.arraycopy(ring.getCoordinates(), 0, uniqueCoordinates, 0, uniqueCoordinates.length);
			var minCoordinate = CoordinateArrays.minCoordinate(ring.getCoordinates());
			CoordinateArrays.scroll(uniqueCoordinates, minCoordinate);
			System.arraycopy(uniqueCoordinates, 0, ring.getCoordinates(), 0, uniqueCoordinates.length);
			ring.getCoordinates()[uniqueCoordinates.length] = uniqueCoordinates[0];
			if (CGAlgorithms.isCCW(ring.getCoordinates()) === clockwise) {
				CoordinateArrays.reverse(ring.getCoordinates());
			}
		}
	}
	getCoordinate() {
		return this.shell.getCoordinate();
	}
	getNumInteriorRing() {
		return this.holes.length;
	}
	getBoundaryDimension() {
		return 1;
	}
	getDimension() {
		return 2;
	}
	getLength() {
		var len = 0.0;
		len += this.shell.getLength();
		for (var i = 0; i < this.holes.length; i++) {
			len += this.holes[i].getLength();
		}
		return len;
	}
	getNumPoints() {
		var numPoints = this.shell.getNumPoints();
		for (var i = 0; i < this.holes.length; i++) {
			numPoints += this.holes[i].getNumPoints();
		}
		return numPoints;
	}
	reverse() {
		var poly = this.copy();
		poly.shell = this.shell.clone().reverse();
		poly.holes = new Array(this.holes.length);
		for (var i = 0; i < this.holes.length; i++) {
			poly.holes[i] = this.holes[i].clone().reverse();
		}
		return poly;
	}
	convexHull() {
		return this.getExteriorRing().convexHull();
	}
	compareToSameClass(...args) {
		if (args.length === 1) {
			let [o] = args;
			var thisShell = this.shell;
			var otherShell = o.shell;
			return thisShell.compareToSameClass(otherShell);
		} else if (args.length === 2) {
			let [o, comp] = args;
			var poly = o;
			var thisShell = this.shell;
			var otherShell = poly.shell;
			var shellComp = thisShell.compareToSameClass(otherShell, comp);
			if (shellComp !== 0) return shellComp;
			var nHole1 = this.getNumInteriorRing();
			var nHole2 = poly.getNumInteriorRing();
			var i = 0;
			while (i < nHole1 && i < nHole2) {
				var thisHole = this.getInteriorRingN(i);
				var otherHole = poly.getInteriorRingN(i);
				var holeComp = thisHole.compareToSameClass(otherHole, comp);
				if (holeComp !== 0) return holeComp;
				i++;
			}
			if (i < nHole1) return 1;
			if (i < nHole2) return -1;
			return 0;
		}
	}
	apply(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateFilter) > -1) {
				let [filter] = args;
				this.shell.apply(filter);
				for (var i = 0; i < this.holes.length; i++) {
					this.holes[i].apply(filter);
				}
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFilter) > -1) {
				let [filter] = args;
				this.shell.apply(filter);
				if (!filter.isDone()) {
					for (var i = 0; i < this.holes.length; i++) {
						this.holes[i].apply(filter);
						if (filter.isDone()) break;
					}
				}
				if (filter.isGeometryChanged()) this.geometryChanged();
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryFilter) > -1) {
				let [filter] = args;
				filter.filter(this);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(GeometryComponentFilter$1) > -1) {
				let [filter] = args;
				filter.filter(this);
				this.shell.apply(filter);
				for (var i = 0; i < this.holes.length; i++) {
					this.holes[i].apply(filter);
				}
			}
		}
	}
	getBoundary() {
		if (this.isEmpty()) {
			return this.getFactory().createMultiLineString();
		}
		var rings = new Array(this.holes.length + 1);
		rings[0] = this.shell;
		for (var i = 0; i < this.holes.length; i++) {
			rings[i + 1] = this.holes[i];
		}
		if (rings.length <= 1) return this.getFactory().createLinearRing(rings[0].getCoordinateSequence());
		return this.getFactory().createMultiLineString(rings);
	}
	clone() {
		var poly = super.clone();
		poly.shell = this.shell.clone();
		poly.holes = new Array(this.holes.length);
		for (var i = 0; i < this.holes.length; i++) {
			poly.holes[i] = this.holes[i].clone();
		}
		return poly;
	}
	getGeometryType() {
		return "Polygon";
	}
	copy() {
		var shell = this.shell.copy();
		var holes = new Array(this.holes.length);
		for (var i = 0; i < holes.length; i++) {
			holes[i] = this.holes[i].copy();
		}
		return new Polygon(shell, holes, this.factory);
	}
	getExteriorRing() {
		return this.shell;
	}
	isEmpty() {
		return this.shell.isEmpty();
	}
	getInteriorRingN(n) {
		return this.holes[n];
	}
	getClass() {
		return Polygon;
	}
}
Polygon.serialVersionUID = -3494792200821764533;

class MultiPoint extends GeometryCollection {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [points, factory] = args;
			super(points, factory);
		}
	}
	get interfaces_() {
		return [Puntal];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_MULTIPOINT;
	}
	isValid() {
		return true;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return super.equalsExact(other, tolerance);
		} else return super.equalsExact(...args);
	}
	getCoordinate(...args) {
		if (args.length === 1) {
			let [n] = args;
			return this.geometries[n].getCoordinate();
		} else return super.getCoordinate(...args);
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	getDimension() {
		return 0;
	}
	getBoundary() {
		return this.getFactory().createGeometryCollection(null);
	}
	getGeometryType() {
		return "MultiPoint";
	}
	copy() {
		var points = new Array(this.geometries.length);
		for (var i = 0; i < points.length; i++) {
			points[i] = this.geometries[i].copy();
		}
		return new MultiPoint(points, this.factory);
	}
	getClass() {
		return MultiPoint;
	}
}
MultiPoint.serialVersionUID = -8048474874175355449;

class LinearRing extends LineString {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			if (args.length === 2) {
				if (args[0] instanceof Coordinate && args[1] instanceof GeometryFactory) {
					return ((...args) => {
						let [points, factory] = args;
						overloaded.call(this, factory.getCoordinateSequenceFactory().create(points), factory);
					})(...args);
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1 && args[1] instanceof GeometryFactory) {
					return ((...args) => {
						let [points, factory] = args;
						super(points, factory);
						this.validateConstruction();
					})(...args);
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_LINEARRING;
	}
	getBoundaryDimension() {
		return Dimension.FALSE;
	}
	isClosed() {
		if (this.isEmpty()) {
			return true;
		}
		return super.isClosed();
	}
	reverse() {
		var seq = this.points.clone();
		CoordinateSequences.reverse(seq);
		var rev = this.getFactory().createLinearRing(seq);
		return rev;
	}
	validateConstruction() {
		if (!this.isEmpty() && !super.isClosed()) {
			throw new IllegalArgumentException$1("Points of LinearRing do not form a closed linestring");
		}
		if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) {
			throw new IllegalArgumentException$1("Invalid number of points in LinearRing (found " + this.getCoordinateSequence().size() + " - must be 0 or >= 4)");
		}
	}
	getGeometryType() {
		return "LinearRing";
	}
	copy() {
		return new LinearRing(this.points.copy(), this.factory);
	}
	getClass() {
		return LinearRing;
	}
}
LinearRing.MINIMUM_VALID_SIZE = 4;
LinearRing.serialVersionUID = -4261142084085851829;

class MultiPolygon extends GeometryCollection {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [polygons, factory] = args;
			super(polygons, factory);
		}
	}
	get interfaces_() {
		return [Polygonal];
	}
	getSortIndex() {
		return Geometry.SORTINDEX_MULTIPOLYGON;
	}
	equalsExact(...args) {
		if (args.length === 2) {
			let [other, tolerance] = args;
			if (!this.isEquivalentClass(other)) {
				return false;
			}
			return super.equalsExact(other, tolerance);
		} else return super.equalsExact(...args);
	}
	getBoundaryDimension() {
		return 1;
	}
	getDimension() {
		return 2;
	}
	reverse() {
		var n = this.geometries.length;
		var revGeoms = new Array(n);
		for (var i = 0; i < this.geometries.length; i++) {
			revGeoms[i] = this.geometries[i].reverse();
		}
		return this.getFactory().createMultiPolygon(revGeoms);
	}
	getBoundary() {
		if (this.isEmpty()) {
			return this.getFactory().createMultiLineString();
		}
		var allRings = new ArrayList();
		for (var i = 0; i < this.geometries.length; i++) {
			var polygon = this.geometries[i];
			var rings = polygon.getBoundary();
			for (var j = 0; j < rings.getNumGeometries(); j++) {
				allRings.add(rings.getGeometryN(j));
			}
		}
		var allRingsArray = new Array(allRings.size());
		return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray));
	}
	getGeometryType() {
		return "MultiPolygon";
	}
	copy() {
		var polygons = new Array(this.geometries.length);
		for (var i = 0; i < polygons.length; i++) {
			polygons[i] = this.geometries[i].copy();
		}
		return new MultiPolygon(polygons, this.factory);
	}
	getClass() {
		return MultiPolygon;
	}
}
MultiPolygon.serialVersionUID = -551033529766975875;

class GeometryEditor {
	constructor(...args) {
		this.factory = null;
		this.isUserDataCopied = false;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [factory] = args;
				this.factory = factory;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get GeometryEditorOperation() {
		return GeometryEditorOperation;
	}
	static get NoOpGeometryOperation() {
		return NoOpGeometryOperation;
	}
	static get CoordinateOperation() {
		return CoordinateOperation;
	}
	static get CoordinateSequenceOperation() {
		return CoordinateSequenceOperation$1;
	}
	setCopyUserData(isUserDataCopied) {
		this.isUserDataCopied = isUserDataCopied;
	}
	edit(geometry, operation) {
		if (geometry === null) return null;
		var result = this.editInternal(geometry, operation);
		if (this.isUserDataCopied) {
			result.setUserData(geometry.getUserData());
		}
		return result;
	}
	editInternal(geometry, operation) {
		if (this.factory === null) this.factory = geometry.getFactory();
		if (geometry instanceof GeometryCollection) {
			return this.editGeometryCollection(geometry, operation);
		}
		if (geometry instanceof Polygon) {
			return this.editPolygon(geometry, operation);
		}
		if (geometry instanceof Point) {
			return operation.edit(geometry, this.factory);
		}
		if (geometry instanceof LineString) {
			return operation.edit(geometry, this.factory);
		}
		Assert.shouldNeverReachHere("Unsupported Geometry class: " + geometry.getClass().getName());
		return null;
	}
	editGeometryCollection(collection, operation) {
		var collectionForType = operation.edit(collection, this.factory);
		var geometries = new ArrayList();
		for (var i = 0; i < collectionForType.getNumGeometries(); i++) {
			var geometry = this.edit(collectionForType.getGeometryN(i), operation);
			if (geometry === null || geometry.isEmpty()) {
				continue;
			}
			geometries.add(geometry);
		}
		if (collectionForType.getClass() === MultiPoint) {
			return this.factory.createMultiPoint(geometries.toArray([]));
		}
		if (collectionForType.getClass() === MultiLineString) {
			return this.factory.createMultiLineString(geometries.toArray([]));
		}
		if (collectionForType.getClass() === MultiPolygon) {
			return this.factory.createMultiPolygon(geometries.toArray([]));
		}
		return this.factory.createGeometryCollection(geometries.toArray([]));
	}
	editPolygon(polygon, operation) {
		var newPolygon = operation.edit(polygon, this.factory);
		if (newPolygon === null) newPolygon = this.factory.createPolygon(null);
		if (newPolygon.isEmpty()) {
			return newPolygon;
		}
		var shell = this.edit(newPolygon.getExteriorRing(), operation);
		if (shell === null || shell.isEmpty()) {
			return this.factory.createPolygon();
		}
		var holes = new ArrayList();
		for (var i = 0; i < newPolygon.getNumInteriorRing(); i++) {
			var hole = this.edit(newPolygon.getInteriorRingN(i), operation);
			if (hole === null || hole.isEmpty()) {
				continue;
			}
			holes.add(hole);
		}
		return this.factory.createPolygon(shell, holes.toArray([]));
	}
	getClass() {
		return GeometryEditor;
	}
}
class GeometryEditorOperation {}
class NoOpGeometryOperation {
	get interfaces_() {
		return [GeometryEditorOperation];
	}
	edit(geometry, factory) {
		return geometry;
	}
	getClass() {
		return NoOpGeometryOperation;
	}
}
class CoordinateOperation {
	get interfaces_() {
		return [GeometryEditorOperation];
	}
	edit(geometry, factory) {
		if (geometry instanceof LinearRing) {
			return factory.createLinearRing(this.editCoordinates(geometry.getCoordinates(), geometry));
		}
		if (geometry instanceof LineString) {
			return factory.createLineString(this.editCoordinates(geometry.getCoordinates(), geometry));
		}
		if (geometry instanceof Point) {
			var newCoordinates = this.editCoordinates(geometry.getCoordinates(), geometry);
			if (newCoordinates.length > 0) {
				return factory.createPoint(newCoordinates[0]);
			} else {
				return factory.createPoint();
			}
		}
		return geometry;
	}
	getClass() {
		return CoordinateOperation;
	}
}
class CoordinateSequenceOperation$1 {
	get interfaces_() {
		return [GeometryEditorOperation];
	}
	edit(geometry, factory) {
		if (geometry instanceof LinearRing) {
			return factory.createLinearRing(this.edit(geometry.getCoordinateSequence(), geometry));
		}
		if (geometry instanceof LineString) {
			return factory.createLineString(this.edit(geometry.getCoordinateSequence(), geometry));
		}
		if (geometry instanceof Point) {
			return factory.createPoint(this.edit(geometry.getCoordinateSequence(), geometry));
		}
		return geometry;
	}
	getClass() {
		return CoordinateSequenceOperation$1;
	}
}

class CoordinateArraySequence {
	constructor(...args) {
		this.dimension = 3;
		this.coordinates = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				if (args[0] instanceof Array) {
					let [coordinates] = args;
					overloaded.call(this, coordinates, 3);
				} else if (Number.isInteger(args[0])) {
					let [size] = args;
					this.coordinates = new Array(size);
					for (var i = 0; i < size; i++) {
						this.coordinates[i] = new Coordinate();
					}
				} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
					let [coordSeq] = args;
					if (coordSeq === null) {
						this.coordinates = new Array(0);
						return null;
					}
					this.dimension = coordSeq.getDimension();
					this.coordinates = new Array(coordSeq.size());
					for (var i = 0; i < this.coordinates.length; i++) {
						this.coordinates[i] = coordSeq.getCoordinateCopy(i);
					}
				}
			} else if (args.length === 2) {
				if (args[0] instanceof Array && Number.isInteger(args[1])) {
					let [coordinates, dimension] = args;
					this.coordinates = coordinates;
					this.dimension = dimension;
					if (coordinates === null) this.coordinates = new Array(0);
				} else if (Number.isInteger(args[0]) && Number.isInteger(args[1])) {
					let [size, dimension] = args;
					this.coordinates = new Array(size);
					this.dimension = dimension;
					for (var i = 0; i < size; i++) {
						this.coordinates[i] = new Coordinate();
					}
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateSequence, Serializable];
	}
	setOrdinate(index, ordinateIndex, value) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				this.coordinates[index].x = value;
				break;
			case CoordinateSequence.Y:
				this.coordinates[index].y = value;
				break;
			case CoordinateSequence.Z:
				this.coordinates[index].z = value;
				break;
			default:
				throw new IllegalArgumentException$1("invalid ordinateIndex");
		}
	}
	size() {
		return this.coordinates.length;
	}
	getOrdinate(index, ordinateIndex) {
		switch (ordinateIndex) {
			case CoordinateSequence.X:
				return this.coordinates[index].x;
			case CoordinateSequence.Y:
				return this.coordinates[index].y;
			case CoordinateSequence.Z:
				return this.coordinates[index].z;
		}
		return Double.NaN;
	}
	getCoordinate(...args) {
		if (args.length === 1) {
			let [i] = args;
			return this.coordinates[i];
		} else if (args.length === 2) {
			let [index, coord] = args;
			coord.x = this.coordinates[index].x;
			coord.y = this.coordinates[index].y;
			coord.z = this.coordinates[index].z;
		}
	}
	getCoordinateCopy(i) {
		return new Coordinate(this.coordinates[i]);
	}
	getDimension() {
		return this.dimension;
	}
	getX(index) {
		return this.coordinates[index].x;
	}
	clone() {
		var cloneCoordinates = new Array(this.size());
		for (var i = 0; i < this.coordinates.length; i++) {
			cloneCoordinates[i] = this.coordinates[i].clone();
		}
		return new CoordinateArraySequence(cloneCoordinates, this.dimension);
	}
	expandEnvelope(env) {
		for (var i = 0; i < this.coordinates.length; i++) {
			env.expandToInclude(this.coordinates[i]);
		}
		return env;
	}
	copy() {
		var cloneCoordinates = new Array(this.size());
		for (var i = 0; i < this.coordinates.length; i++) {
			cloneCoordinates[i] = this.coordinates[i].copy();
		}
		return new CoordinateArraySequence(cloneCoordinates, this.dimension);
	}
	toString() {
		if (this.coordinates.length > 0) {
			var strBuf = new StringBuffer(17 * this.coordinates.length);
			strBuf.append('(');
			strBuf.append(this.coordinates[0]);
			for (var i = 1; i < this.coordinates.length; i++) {
				strBuf.append(", ");
				strBuf.append(this.coordinates[i]);
			}
			strBuf.append(')');
			return strBuf.toString();
		} else {
			return "()";
		}
	}
	getY(index) {
		return this.coordinates[index].y;
	}
	toCoordinateArray() {
		return this.coordinates;
	}
	getClass() {
		return CoordinateArraySequence;
	}
}
CoordinateArraySequence.serialVersionUID = -915438501601840650;

class CoordinateArraySequenceFactory {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [CoordinateSequenceFactory, Serializable];
	}
	static instance() {
		return CoordinateArraySequenceFactory.instanceObject;
	}
	readResolve() {
		return CoordinateArraySequenceFactory.instance();
	}
	create(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
				return new CoordinateArraySequence(coordinates);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordSeq] = args;
				return new CoordinateArraySequence(coordSeq);
			}
		} else if (args.length === 2) {
			let [size, dimension] = args;
			if (dimension > 3) dimension = 3;
			if (dimension < 2) return new CoordinateArraySequence(size);
			return new CoordinateArraySequence(size, dimension);
		}
	}
	getClass() {
		return CoordinateArraySequenceFactory;
	}
}
CoordinateArraySequenceFactory.serialVersionUID = -4099577099607551657;
CoordinateArraySequenceFactory.instanceObject = new CoordinateArraySequenceFactory();

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
 *
 * @extends {javascript.util.Map}
 * @constructor
 * @export
 */
function HashMap () {
  /**
   * @type {Object}
   * @private
  */
  this.map_ = new Map()
}
HashMap.prototype = new Map$1()

/**
 * @override
 */
HashMap.prototype.get = function (key) {
  return this.map_.get(key) || null
}

/**
 * @override
 */
HashMap.prototype.put = function (key, value) {
  this.map_.set(key, value)
  return value
}

/**
 * @override
 */
HashMap.prototype.values = function () {
  const arrayList = new ArrayList()
  Array.from(this.map_.values()).forEach(value => arrayList.add(value))
  return arrayList
}

/**
 * @override
 */
HashMap.prototype.entrySet = function () {
  const hashSet = new HashSet()
  this.map_.entries().forEach(entry => hashSet.add(entry))
  return hashSet
}

/**
 * @override
 */
HashMap.prototype.size = function () {
  return this.map_.size()
}

class PrecisionModel {
	constructor(...args) {
		this.modelType = null;
		this.scale = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.modelType = PrecisionModel.FLOATING;
			} else if (args.length === 1) {
				if (args[0] instanceof Type) {
					let [modelType] = args;
					this.modelType = modelType;
					if (modelType === PrecisionModel.FIXED) {
						this.setScale(1.0);
					}
				} else if (typeof args[0] === "number") {
					let [scale] = args;
					this.modelType = PrecisionModel.FIXED;
					this.setScale(scale);
				} else if (args[0] instanceof PrecisionModel) {
					let [pm] = args;
					this.modelType = pm.modelType;
					this.scale = pm.scale;
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Serializable, Comparable];
	}
	static get Type() {
		return Type;
	}
	static mostPrecise(pm1, pm2) {
		if (pm1.compareTo(pm2) >= 0) return pm1;
		return pm2;
	}
	equals(other) {
		if (!(other instanceof PrecisionModel)) {
			return false;
		}
		var otherPrecisionModel = other;
		return this.modelType === otherPrecisionModel.modelType && this.scale === otherPrecisionModel.scale;
	}
	compareTo(o) {
		var other = o;
		var sigDigits = this.getMaximumSignificantDigits();
		var otherSigDigits = other.getMaximumSignificantDigits();
		return new Integer(sigDigits).compareTo(new Integer(otherSigDigits));
	}
	getScale() {
		return this.scale;
	}
	isFloating() {
		return this.modelType === PrecisionModel.FLOATING || this.modelType === PrecisionModel.FLOATING_SINGLE;
	}
	getType() {
		return this.modelType;
	}
	toString() {
		var description = "UNKNOWN";
		if (this.modelType === PrecisionModel.FLOATING) {
			description = "Floating";
		} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
			description = "Floating-Single";
		} else if (this.modelType === PrecisionModel.FIXED) {
			description = "Fixed (Scale=" + this.getScale() + ")";
		}
		return description;
	}
	makePrecise(...args) {
		if (args.length === 1) {
			if (typeof args[0] === "number") {
				let [val] = args;
				if (Double.isNaN(val)) return val;
				if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
					var floatSingleVal = val;
					return floatSingleVal;
				}
				if (this.modelType === PrecisionModel.FIXED) {
					return Math.round(val * this.scale) / this.scale;
				}
				return val;
			} else if (args[0] instanceof Coordinate) {
				let [coord] = args;
				if (this.modelType === PrecisionModel.FLOATING) return null;
				coord.x = this.makePrecise(coord.x);
				coord.y = this.makePrecise(coord.y);
			}
		}
	}
	getMaximumSignificantDigits() {
		var maxSigDigits = 16;
		if (this.modelType === PrecisionModel.FLOATING) {
			maxSigDigits = 16;
		} else if (this.modelType === PrecisionModel.FLOATING_SINGLE) {
			maxSigDigits = 6;
		} else if (this.modelType === PrecisionModel.FIXED) {
			maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)));
		}
		return maxSigDigits;
	}
	setScale(scale) {
		this.scale = Math.abs(scale);
	}
	getClass() {
		return PrecisionModel;
	}
}
class Type {
	constructor(...args) {
		this.name = null;
		if (args.length === 1) {
			let [name] = args;
			this.name = name;
			Type.nameToTypeMap.put(name, this);
		}
	}
	get interfaces_() {
		return [Serializable];
	}
	readResolve() {
		return Type.nameToTypeMap.get(this.name);
	}
	toString() {
		return this.name;
	}
	getClass() {
		return Type;
	}
}
Type.serialVersionUID = -5528602631731589822;
Type.nameToTypeMap = new HashMap();
PrecisionModel.serialVersionUID = 7777263578777803835;
PrecisionModel.FIXED = new Type("FIXED");
PrecisionModel.FLOATING = new Type("FLOATING");
PrecisionModel.FLOATING_SINGLE = new Type("FLOATING SINGLE");
PrecisionModel.maximumPreciseValue = 9007199254740992.0;

class GeometryFactory {
	constructor(...args) {
		this.precisionModel = null;
		this.coordinateSequenceFactory = null;
		this.SRID = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				overloaded.call(this, new PrecisionModel(), 0);
			} else if (args.length === 1) {
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequenceFactory) > -1) {
					let [coordinateSequenceFactory] = args;
					overloaded.call(this, new PrecisionModel(), 0, coordinateSequenceFactory);
				} else if (args[0] instanceof PrecisionModel) {
					let [precisionModel] = args;
					overloaded.call(this, precisionModel, 0, GeometryFactory.getDefaultCoordinateSequenceFactory());
				}
			} else if (args.length === 2) {
				let [precisionModel, SRID] = args;
				overloaded.call(this, precisionModel, SRID, GeometryFactory.getDefaultCoordinateSequenceFactory());
			} else if (args.length === 3) {
				let [precisionModel, SRID, coordinateSequenceFactory] = args;
				this.precisionModel = precisionModel;
				this.coordinateSequenceFactory = coordinateSequenceFactory;
				this.SRID = SRID;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Serializable];
	}
	static toMultiPolygonArray(multiPolygons) {
		var multiPolygonArray = new Array(multiPolygons.size());
		return multiPolygons.toArray(multiPolygonArray);
	}
	static toGeometryArray(geometries) {
		if (geometries === null) return null;
		var geometryArray = new Array(geometries.size());
		return geometries.toArray(geometryArray);
	}
	static getDefaultCoordinateSequenceFactory() {
		return CoordinateArraySequenceFactory.instance();
	}
	static toMultiLineStringArray(multiLineStrings) {
		var multiLineStringArray = new Array(multiLineStrings.size());
		return multiLineStrings.toArray(multiLineStringArray);
	}
	static toLineStringArray(lineStrings) {
		var lineStringArray = new Array(lineStrings.size());
		return lineStrings.toArray(lineStringArray);
	}
	static toMultiPointArray(multiPoints) {
		var multiPointArray = new Array(multiPoints.size());
		return multiPoints.toArray(multiPointArray);
	}
	static toLinearRingArray(linearRings) {
		var linearRingArray = new Array(linearRings.size());
		return linearRings.toArray(linearRingArray);
	}
	static toPointArray(points) {
		var pointArray = new Array(points.size());
		return points.toArray(pointArray);
	}
	static toPolygonArray(polygons) {
		var polygonArray = new Array(polygons.size());
		return polygons.toArray(polygonArray);
	}
	static createPointFromInternalCoord(coord, exemplar) {
		exemplar.getPrecisionModel().makePrecise(coord);
		return exemplar.getFactory().createPoint(coord);
	}
	toGeometry(envelope) {
		if (envelope.isNull()) {
			return this.createPoint(null);
		}
		if (envelope.getMinX() === envelope.getMaxX() && envelope.getMinY() === envelope.getMaxY()) {
			return this.createPoint(new Coordinate(envelope.getMinX(), envelope.getMinY()));
		}
		if (envelope.getMinX() === envelope.getMaxX() || envelope.getMinY() === envelope.getMaxY()) {
			return this.createLineString([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY())]);
		}
		return this.createPolygon(this.createLinearRing([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMinY())]), null);
	}
	createLineString(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.createLineString(this.getCoordinateSequenceFactory().create([]));
		} else if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createLineString(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return new LineString(coordinates, this);
			}
		}
	}
	createMultiLineString(...args) {
		if (args.length === 0) {
			let [] = args;
			return new MultiLineString(null, this);
		} else if (args.length === 1) {
			let [lineStrings] = args;
			return new MultiLineString(lineStrings, this);
		}
	}
	buildGeometry(geomList) {
		var geomClass = null;
		var isHeterogeneous = false;
		var hasGeometryCollection = false;
		for (var i = geomList.iterator(); i.hasNext(); ) {
			var geom = i.next();
			var partClass = geom.getClass();
			if (geomClass === null) {
				geomClass = partClass;
			}
			if (partClass !== geomClass) {
				isHeterogeneous = true;
			}
			if (geom.isGeometryCollectionOrDerived()) hasGeometryCollection = true;
		}
		if (geomClass === null) {
			return this.createGeometryCollection();
		}
		if (isHeterogeneous || hasGeometryCollection) {
			return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList));
		}
		var geom0 = geomList.iterator().next();
		var isCollection = geomList.size() > 1;
		if (isCollection) {
			if (geom0 instanceof Polygon) {
				return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList));
			} else if (geom0 instanceof LineString) {
				return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList));
			} else if (geom0 instanceof Point) {
				return this.createMultiPoint(GeometryFactory.toPointArray(geomList));
			}
			Assert.shouldNeverReachHere("Unhandled class: " + geom0.getClass().getName());
		}
		return geom0;
	}
	createMultiPointFromCoords(coordinates) {
		return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
	}
	createPoint(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.createPoint(this.getCoordinateSequenceFactory().create([]));
		} else if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [coordinate] = args;
				return this.createPoint(coordinate !== null ? this.getCoordinateSequenceFactory().create([coordinate]) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return new Point(coordinates, this);
			}
		}
	}
	getCoordinateSequenceFactory() {
		return this.coordinateSequenceFactory;
	}
	createPolygon(...args) {
		if (args.length === 0) {
			let [] = args;
			return new Polygon(null, null, this);
		} else if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return this.createPolygon(this.createLinearRing(coordinates));
			} else if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createPolygon(this.createLinearRing(coordinates));
			} else if (args[0] instanceof LinearRing) {
				let [shell] = args;
				return this.createPolygon(shell, null);
			}
		} else if (args.length === 2) {
			let [shell, holes] = args;
			return new Polygon(shell, holes, this);
		}
	}
	getSRID() {
		return this.SRID;
	}
	createGeometryCollection(...args) {
		if (args.length === 0) {
			let [] = args;
			return new GeometryCollection(null, this);
		} else if (args.length === 1) {
			let [geometries] = args;
			return new GeometryCollection(geometries, this);
		}
	}
	createGeometry(g) {
		var editor = new GeometryEditor(this);
		return editor.edit(g, new (class extends CoordinateSequenceOperation {
			edit(...args) {
				if (args.length === 2) {
					let [coordSeq, geometry] = args;
					return this.coordinateSequenceFactory.create(coordSeq);
				} else return super.edit(...args);
			}
		})());
	}
	getPrecisionModel() {
		return this.precisionModel;
	}
	createLinearRing(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));
		} else if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createLinearRing(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				return new LinearRing(coordinates, this);
			}
		}
	}
	createMultiPolygon(...args) {
		if (args.length === 0) {
			let [] = args;
			return new MultiPolygon(null, this);
		} else if (args.length === 1) {
			let [polygons] = args;
			return new MultiPolygon(polygons, this);
		}
	}
	createMultiPoint(...args) {
		if (args.length === 0) {
			let [] = args;
			return new MultiPoint(null, this);
		} else if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [point] = args;
				return new MultiPoint(point, this);
			} else if (args[0] instanceof Array) {
				let [coordinates] = args;
				return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(CoordinateSequence) > -1) {
				let [coordinates] = args;
				if (coordinates === null) {
					return this.createMultiPoint(new Array(0));
				}
				var points = new Array(coordinates.size());
				for (var i = 0; i < coordinates.size(); i++) {
					var ptSeq = this.getCoordinateSequenceFactory().create(1, coordinates.getDimension());
					CoordinateSequences.copy(coordinates, i, ptSeq, 0, 1);
					points[i] = this.createPoint(ptSeq);
				}
				return this.createMultiPoint(points);
			}
		}
	}
	getClass() {
		return GeometryFactory;
	}
}
GeometryFactory.serialVersionUID = -6820524753094095635;

class GeometryTransformer {
	constructor(...args) {
		this.inputGeom = null;
		this.factory = null;
		this.pruneEmptyGeometry = true;
		this.preserveGeometryCollectionType = true;
		this.preserveCollections = false;
		this.preserveType = false;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	transformPoint(geom, parent) {
		return this.factory.createPoint(this.transformCoordinates(geom.getCoordinateSequence(), geom));
	}
	transformPolygon(geom, parent) {
		var isAllValidLinearRings = true;
		var shell = this.transformLinearRing(geom.getExteriorRing(), geom);
		if (shell === null || !(shell instanceof LinearRing) || shell.isEmpty()) isAllValidLinearRings = false;
		var holes = new ArrayList();
		for (var i = 0; i < geom.getNumInteriorRing(); i++) {
			var hole = this.transformLinearRing(geom.getInteriorRingN(i), geom);
			if (hole === null || hole.isEmpty()) {
				continue;
			}
			if (!(hole instanceof LinearRing)) isAllValidLinearRings = false;
			holes.add(hole);
		}
		if (isAllValidLinearRings) return this.factory.createPolygon(shell, holes.toArray([])); else {
			var components = new ArrayList();
			if (shell !== null) components.add(shell);
			components.addAll(holes);
			return this.factory.buildGeometry(components);
		}
	}
	createCoordinateSequence(coords) {
		return this.factory.getCoordinateSequenceFactory().create(coords);
	}
	getInputGeometry() {
		return this.inputGeom;
	}
	transformMultiLineString(geom, parent) {
		var transGeomList = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var transformGeom = this.transformLineString(geom.getGeometryN(i), geom);
			if (transformGeom === null) continue;
			if (transformGeom.isEmpty()) continue;
			transGeomList.add(transformGeom);
		}
		return this.factory.buildGeometry(transGeomList);
	}
	transformCoordinates(coords, parent) {
		return this.copy(coords);
	}
	transformLineString(geom, parent) {
		return this.factory.createLineString(this.transformCoordinates(geom.getCoordinateSequence(), geom));
	}
	transformMultiPoint(geom, parent) {
		var transGeomList = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var transformGeom = this.transformPoint(geom.getGeometryN(i), geom);
			if (transformGeom === null) continue;
			if (transformGeom.isEmpty()) continue;
			transGeomList.add(transformGeom);
		}
		return this.factory.buildGeometry(transGeomList);
	}
	transformMultiPolygon(geom, parent) {
		var transGeomList = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var transformGeom = this.transformPolygon(geom.getGeometryN(i), geom);
			if (transformGeom === null) continue;
			if (transformGeom.isEmpty()) continue;
			transGeomList.add(transformGeom);
		}
		return this.factory.buildGeometry(transGeomList);
	}
	copy(seq) {
		return seq.clone();
	}
	transformGeometryCollection(geom, parent) {
		var transGeomList = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var transformGeom = this.transform(geom.getGeometryN(i));
			if (transformGeom === null) continue;
			if (this.pruneEmptyGeometry && transformGeom.isEmpty()) continue;
			transGeomList.add(transformGeom);
		}
		if (this.preserveGeometryCollectionType) return this.factory.createGeometryCollection(GeometryFactory.toGeometryArray(transGeomList));
		return this.factory.buildGeometry(transGeomList);
	}
	transform(inputGeom) {
		this.inputGeom = inputGeom;
		this.factory = inputGeom.getFactory();
		if (inputGeom instanceof Point) return this.transformPoint(inputGeom, null);
		if (inputGeom instanceof MultiPoint) return this.transformMultiPoint(inputGeom, null);
		if (inputGeom instanceof LinearRing) return this.transformLinearRing(inputGeom, null);
		if (inputGeom instanceof LineString) return this.transformLineString(inputGeom, null);
		if (inputGeom instanceof MultiLineString) return this.transformMultiLineString(inputGeom, null);
		if (inputGeom instanceof Polygon) return this.transformPolygon(inputGeom, null);
		if (inputGeom instanceof MultiPolygon) return this.transformMultiPolygon(inputGeom, null);
		if (inputGeom instanceof GeometryCollection) return this.transformGeometryCollection(inputGeom, null);
		throw new IllegalArgumentException$1("Unknown Geometry subtype: " + inputGeom.getClass().getName());
	}
	transformLinearRing(geom, parent) {
		var seq = this.transformCoordinates(geom.getCoordinateSequence(), geom);
		if (seq === null) return this.factory.createLinearRing(null);
		var seqSize = seq.size();
		if (seqSize > 0 && seqSize < 4 && !this.preserveType) return this.factory.createLineString(seq);
		return this.factory.createLinearRing(seq);
	}
	getClass() {
		return GeometryTransformer;
	}
}

class LineSegment {
	constructor(...args) {
		this.p0 = null;
		this.p1 = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				overloaded.call(this, new Coordinate(), new Coordinate());
			} else if (args.length === 1) {
				let [ls] = args;
				overloaded.call(this, ls.p0, ls.p1);
			} else if (args.length === 2) {
				let [p0, p1] = args;
				this.p0 = p0;
				this.p1 = p1;
			} else if (args.length === 4) {
				let [x0, y0, x1, y1] = args;
				overloaded.call(this, new Coordinate(x0, y0), new Coordinate(x1, y1));
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparable, Serializable];
	}
	static midPoint(p0, p1) {
		return new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
	}
	minX() {
		return Math.min(this.p0.x, this.p1.x);
	}
	orientationIndex(...args) {
		if (args.length === 1) {
			if (args[0] instanceof LineSegment) {
				let [seg] = args;
				var orient0 = CGAlgorithms.orientationIndex(this.p0, this.p1, seg.p0);
				var orient1 = CGAlgorithms.orientationIndex(this.p0, this.p1, seg.p1);
				if (orient0 >= 0 && orient1 >= 0) return Math.max(orient0, orient1);
				if (orient0 <= 0 && orient1 <= 0) return Math.max(orient0, orient1);
				return 0;
			} else if (args[0] instanceof Coordinate) {
				let [p] = args;
				return CGAlgorithms.orientationIndex(this.p0, this.p1, p);
			}
		}
	}
	toGeometry(geomFactory) {
		return geomFactory.createLineString([this.p0, this.p1]);
	}
	isVertical() {
		return this.p0.x === this.p1.x;
	}
	equals(o) {
		if (!(o instanceof LineSegment)) {
			return false;
		}
		var other = o;
		return this.p0.equals(other.p0) && this.p1.equals(other.p1);
	}
	intersection(line) {
		var li = new RobustLineIntersector();
		li.computeIntersection(this.p0, this.p1, line.p0, line.p1);
		if (li.hasIntersection()) return li.getIntersection(0);
		return null;
	}
	project(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [p] = args;
				if (p.equals(this.p0) || p.equals(this.p1)) return new Coordinate(p);
				var r = this.projectionFactor(p);
				var coord = new Coordinate();
				coord.x = this.p0.x + r * (this.p1.x - this.p0.x);
				coord.y = this.p0.y + r * (this.p1.y - this.p0.y);
				return coord;
			} else if (args[0] instanceof LineSegment) {
				let [seg] = args;
				var pf0 = this.projectionFactor(seg.p0);
				var pf1 = this.projectionFactor(seg.p1);
				if (pf0 >= 1.0 && pf1 >= 1.0) return null;
				if (pf0 <= 0.0 && pf1 <= 0.0) return null;
				var newp0 = this.project(seg.p0);
				if (pf0 < 0.0) newp0 = this.p0;
				if (pf0 > 1.0) newp0 = this.p1;
				var newp1 = this.project(seg.p1);
				if (pf1 < 0.0) newp1 = this.p0;
				if (pf1 > 1.0) newp1 = this.p1;
				return new LineSegment(newp0, newp1);
			}
		}
	}
	normalize() {
		if (this.p1.compareTo(this.p0) < 0) this.reverse();
	}
	angle() {
		return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
	}
	getCoordinate(i) {
		if (i === 0) return this.p0;
		return this.p1;
	}
	distancePerpendicular(p) {
		return CGAlgorithms.distancePointLinePerpendicular(p, this.p0, this.p1);
	}
	minY() {
		return Math.min(this.p0.y, this.p1.y);
	}
	midPoint() {
		return LineSegment.midPoint(this.p0, this.p1);
	}
	projectionFactor(p) {
		if (p.equals(this.p0)) return 0.0;
		if (p.equals(this.p1)) return 1.0;
		var dx = this.p1.x - this.p0.x;
		var dy = this.p1.y - this.p0.y;
		var len = dx * dx + dy * dy;
		if (len <= 0.0) return Double.NaN;
		var r = ((p.x - this.p0.x) * dx + (p.y - this.p0.y) * dy) / len;
		return r;
	}
	closestPoints(line) {
		var intPt = this.intersection(line);
		if (intPt !== null) {
			return [intPt, intPt];
		}
		var closestPt = new Array(2);
		var minDistance = Double.MAX_VALUE;
		var dist = null;
		var close00 = this.closestPoint(line.p0);
		minDistance = close00.distance(line.p0);
		closestPt[0] = close00;
		closestPt[1] = line.p0;
		var close01 = this.closestPoint(line.p1);
		dist = close01.distance(line.p1);
		if (dist < minDistance) {
			minDistance = dist;
			closestPt[0] = close01;
			closestPt[1] = line.p1;
		}
		var close10 = line.closestPoint(this.p0);
		dist = close10.distance(this.p0);
		if (dist < minDistance) {
			minDistance = dist;
			closestPt[0] = this.p0;
			closestPt[1] = close10;
		}
		var close11 = line.closestPoint(this.p1);
		dist = close11.distance(this.p1);
		if (dist < minDistance) {
			minDistance = dist;
			closestPt[0] = this.p1;
			closestPt[1] = close11;
		}
		return closestPt;
	}
	closestPoint(p) {
		var factor = this.projectionFactor(p);
		if (factor > 0 && factor < 1) {
			return this.project(p);
		}
		var dist0 = this.p0.distance(p);
		var dist1 = this.p1.distance(p);
		if (dist0 < dist1) return this.p0;
		return this.p1;
	}
	maxX() {
		return Math.max(this.p0.x, this.p1.x);
	}
	getLength() {
		return this.p0.distance(this.p1);
	}
	compareTo(o) {
		var other = o;
		var comp0 = this.p0.compareTo(other.p0);
		if (comp0 !== 0) return comp0;
		return this.p1.compareTo(other.p1);
	}
	reverse() {
		var temp = this.p0;
		this.p0 = this.p1;
		this.p1 = temp;
	}
	equalsTopo(other) {
		return this.p0.equals(other.p0) && this.p1.equals(other.p1) || this.p0.equals(other.p1) && this.p1.equals(other.p0);
	}
	lineIntersection(line) {
		try {
			var intPt = HCoordinate.intersection(this.p0, this.p1, line.p0, line.p1);
			return intPt;
		} catch (ex) {
			if (ex instanceof NotRepresentableException) {} else throw ex;
		} finally {}
		return null;
	}
	maxY() {
		return Math.max(this.p0.y, this.p1.y);
	}
	pointAlongOffset(segmentLengthFraction, offsetDistance) {
		var segx = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
		var segy = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
		var dx = this.p1.x - this.p0.x;
		var dy = this.p1.y - this.p0.y;
		var len = Math.sqrt(dx * dx + dy * dy);
		var ux = 0.0;
		var uy = 0.0;
		if (offsetDistance !== 0.0) {
			if (len <= 0.0) throw new IllegalStateException("Cannot compute offset from zero-length line segment");
			ux = offsetDistance * dx / len;
			uy = offsetDistance * dy / len;
		}
		var offsetx = segx - uy;
		var offsety = segy + ux;
		var coord = new Coordinate(offsetx, offsety);
		return coord;
	}
	setCoordinates(...args) {
		if (args.length === 1) {
			let [ls] = args;
			this.setCoordinates(ls.p0, ls.p1);
		} else if (args.length === 2) {
			let [p0, p1] = args;
			this.p0.x = p0.x;
			this.p0.y = p0.y;
			this.p1.x = p1.x;
			this.p1.y = p1.y;
		}
	}
	segmentFraction(inputPt) {
		var segFrac = this.projectionFactor(inputPt);
		if (segFrac < 0.0) segFrac = 0.0; else if (segFrac > 1.0 || Double.isNaN(segFrac)) segFrac = 1.0;
		return segFrac;
	}
	toString() {
		return "LINESTRING( " + this.p0.x + " " + this.p0.y + ", " + this.p1.x + " " + this.p1.y + ")";
	}
	isHorizontal() {
		return this.p0.y === this.p1.y;
	}
	distance(...args) {
		if (args.length === 1) {
			if (args[0] instanceof LineSegment) {
				let [ls] = args;
				return CGAlgorithms.distanceLineLine(this.p0, this.p1, ls.p0, ls.p1);
			} else if (args[0] instanceof Coordinate) {
				let [p] = args;
				return CGAlgorithms.distancePointLine(p, this.p0, this.p1);
			}
		}
	}
	pointAlong(segmentLengthFraction) {
		var coord = new Coordinate();
		coord.x = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
		coord.y = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
		return coord;
	}
	hashCode() {
		var bits0 = java.lang.Double.doubleToLongBits(this.p0.x);
		bits0 ^= java.lang.Double.doubleToLongBits(this.p0.y) * 31;
		var hash0 = Math.trunc(bits0) ^ Math.trunc(bits0 >> 32);
		var bits1 = java.lang.Double.doubleToLongBits(this.p1.x);
		bits1 ^= java.lang.Double.doubleToLongBits(this.p1.y) * 31;
		var hash1 = Math.trunc(bits1) ^ Math.trunc(bits1 >> 32);
		return hash0 ^ hash1;
	}
	getClass() {
		return LineSegment;
	}
}
LineSegment.serialVersionUID = 3252005833466256227;

class Densifier {
	constructor(...args) {
		this.inputGeom = null;
		this.distanceTolerance = null;
		if (args.length === 1) {
			let [inputGeom] = args;
			this.inputGeom = inputGeom;
		}
	}
	get interfaces_() {
		return [];
	}
	static get DensifyTransformer() {
		return DensifyTransformer;
	}
	static densifyPoints(pts, distanceTolerance, precModel) {
		var seg = new LineSegment();
		var coordList = new CoordinateList();
		for (var i = 0; i < pts.length - 1; i++) {
			seg.p0 = pts[i];
			seg.p1 = pts[i + 1];
			coordList.add(seg.p0, false);
			var len = seg.getLength();
			var densifiedSegCount = Math.trunc(len / distanceTolerance) + 1;
			if (densifiedSegCount > 1) {
				var densifiedSegLen = len / densifiedSegCount;
				for (var j = 1; j < densifiedSegCount; j++) {
					var segFract = j * densifiedSegLen / len;
					var p = seg.pointAlong(segFract);
					precModel.makePrecise(p);
					coordList.add(p, false);
				}
			}
		}
		coordList.add(pts[pts.length - 1], false);
		return coordList.toCoordinateArray();
	}
	static densify(geom, distanceTolerance) {
		var densifier = new Densifier(geom);
		densifier.setDistanceTolerance(distanceTolerance);
		return densifier.getResultGeometry();
	}
	getResultGeometry() {
		return new DensifyTransformer(this.distanceTolerance).transform(this.inputGeom);
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance <= 0.0) throw new IllegalArgumentException$1("Tolerance must be positive");
		this.distanceTolerance = distanceTolerance;
	}
	getClass() {
		return Densifier;
	}
}
class DensifyTransformer extends GeometryTransformer {
	constructor(...args) {
		super();
		this.distanceTolerance = null;
		if (args.length === 1) {
			let [distanceTolerance] = args;
			this.distanceTolerance = distanceTolerance;
		}
	}
	get interfaces_() {
		return [];
	}
	transformMultiPolygon(geom, parent) {
		var roughGeom = super.transformMultiPolygon(geom, parent);
		return this.createValidArea(roughGeom);
	}
	transformPolygon(geom, parent) {
		var roughGeom = super.transformPolygon(geom, parent);
		if (parent instanceof MultiPolygon) {
			return roughGeom;
		}
		return this.createValidArea(roughGeom);
	}
	transformCoordinates(coords, parent) {
		var inputPts = coords.toCoordinateArray();
		var newPts = Densifier.densifyPoints(inputPts, this.distanceTolerance, parent.getPrecisionModel());
		if (parent instanceof LineString && newPts.length === 1) {
			newPts = new Array(0);
		}
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	}
	createValidArea(roughAreaGeom) {
		return roughAreaGeom.buffer(0.0);
	}
	getClass() {
		return DensifyTransformer;
	}
}

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 */
function EmptyStackException(message) {
  this.message = message || '';
};
EmptyStackException.prototype = new Error();


/**
 * @type {string}
 */
EmptyStackException.prototype.name = 'EmptyStackException';

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Stack.html
 *
 * @extends {List}
 * @constructor
 */
function Stack() {
  /**
   * @type {Array}
   * @private
   */
  this.array_ = [];
};
Stack.prototype = new List();


/**
 * @override
 */
Stack.prototype.add = function(e) {
  this.array_.push(e);
  return true;
};


/**
 * @override
 */
Stack.prototype.get = function(index) {
  if (index < 0 || index >= this.size()) {
    throw new IndexOutOfBoundsException();
  }

  return this.array_[index];
};


/**
 * Pushes an item onto the top of this stack.
 * @param {Object} e
 * @return {Object}
 */
Stack.prototype.push = function(e) {
  this.array_.push(e);
  return e;
};


/**
 * Pushes an item onto the top of this stack.
 * @param {Object} e
 * @return {Object}
 */
Stack.prototype.pop = function(e) {
  if (this.array_.length === 0) {
    throw new EmptyStackException();
  }

  return this.array_.pop();
};


/**
 * Looks at the object at the top of this stack without removing it from the
 * stack.
 * @return {Object}
 */
Stack.prototype.peek = function() {
  if (this.array_.length === 0) {
    throw new EmptyStackException();
  }

  return this.array_[this.array_.length - 1];
};


/**
 * Tests if this stack is empty.
 * @return {boolean} true if and only if this stack contains no items; false
 *         otherwise.
 */
Stack.prototype.empty = function() {
  if (this.array_.length === 0) {
    return true;
  } else {
    return false;
  }
};


/**
 * @return {boolean}
 */
Stack.prototype.isEmpty = function() {
  return this.empty();
};


/**
 * Returns the 1-based position where an object is on this stack. If the object
 * o occurs as an item in this stack, this method returns the distance from the
 * top of the stack of the occurrence nearest the top of the stack; the topmost
 * item on the stack is considered to be at distance 1. The equals method is
 * used to compare o to the items in this stack.
 *
 * NOTE: does not currently actually use equals. (=== is used)
 *
 * @param {Object} o
 * @return {number} the 1-based position from the top of the stack where the
 *         object is located; the return value -1 indicates that the object is
 *         not on the stack.
 */
Stack.prototype.search = function(o) {
  return this.array_.indexOf(o);
};


/**
 * @return {number}
 * @export
 */
Stack.prototype.size = function() {
  return this.array_.length;
};


/**
 * @return {Array}
 */
Stack.prototype.toArray = function() {
  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this.array_[i]);
  }

  return array;
};

class Quadrant {
	get interfaces_() {
		return [];
	}
	static isNorthern(quad) {
		return quad === Quadrant.NE || quad === Quadrant.NW;
	}
	static isOpposite(quad1, quad2) {
		if (quad1 === quad2) return false;
		var diff = (quad1 - quad2 + 4) % 4;
		if (diff === 2) return true;
		return false;
	}
	static commonHalfPlane(quad1, quad2) {
		if (quad1 === quad2) return quad1;
		var diff = (quad1 - quad2 + 4) % 4;
		if (diff === 2) return -1;
		var min = quad1 < quad2 ? quad1 : quad2;
		var max = quad1 > quad2 ? quad1 : quad2;
		if (min === 0 && max === 3) return 3;
		return min;
	}
	static isInHalfPlane(quad, halfPlane) {
		if (halfPlane === Quadrant.SE) {
			return quad === Quadrant.SE || quad === Quadrant.SW;
		}
		return quad === halfPlane || quad === halfPlane + 1;
	}
	static quadrant(...args) {
		if (args.length === 2) {
			if (typeof args[0] === "number" && typeof args[1] === "number") {
				let [dx, dy] = args;
				if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException$1("Cannot compute the quadrant for point ( " + dx + ", " + dy + " )");
				if (dx >= 0.0) {
					if (dy >= 0.0) return Quadrant.NE; else return Quadrant.SE;
				} else {
					if (dy >= 0.0) return Quadrant.NW; else return Quadrant.SW;
				}
			} else if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
				let [p0, p1] = args;
				if (p1.x === p0.x && p1.y === p0.y) throw new IllegalArgumentException$1("Cannot compute the quadrant for two identical points " + p0);
				if (p1.x >= p0.x) {
					if (p1.y >= p0.y) return Quadrant.NE; else return Quadrant.SE;
				} else {
					if (p1.y >= p0.y) return Quadrant.NW; else return Quadrant.SW;
				}
			}
		}
	}
	getClass() {
		return Quadrant;
	}
}
Quadrant.NE = 0;
Quadrant.NW = 1;
Quadrant.SW = 2;
Quadrant.SE = 3;

class HalfEdge {
	constructor(...args) {
		this._orig = null;
		this._sym = null;
		this._next = null;
		if (args.length === 1) {
			let [orig] = args;
			this._orig = orig;
		}
	}
	get interfaces_() {
		return [];
	}
	static init(e0, e1) {
		if (e0._sym !== null || e1._sym !== null || e0._next !== null || e1._next !== null) throw new IllegalStateException("Edges are already initialized");
		e0.init(e1);
		return e0;
	}
	static create(p0, p1) {
		var e0 = new HalfEdge(p0);
		var e1 = new HalfEdge(p1);
		e0.init(e1);
		return e0;
	}
	find(dest) {
		var oNext = this;
		do {
			if (oNext === null) return null;
			if (oNext.dest().equals2D(dest)) return oNext;
			oNext = oNext.oNext();
		} while (oNext !== this);
		return null;
	}
	dest() {
		return this._sym._orig;
	}
	oNext() {
		return this._sym._next;
	}
	insert(e) {
		if (this.oNext() === this) {
			this.insertAfter(e);
			return null;
		}
		var ecmp = this.compareTo(e);
		var ePrev = this;
		do {
			var oNext = ePrev.oNext();
			var cmp = oNext.compareTo(e);
			if (cmp !== ecmp || oNext === this) {
				ePrev.insertAfter(e);
				return null;
			}
			ePrev = oNext;
		} while (ePrev !== this);
		Assert.shouldNeverReachHere();
	}
	insertAfter(e) {
		Assert.equals(this._orig, e.orig());
		var save = this.oNext();
		this._sym.setNext(e);
		e.sym().setNext(save);
	}
	degree() {
		var degree = 0;
		var e = this;
		do {
			degree++;
			e = e.oNext();
		} while (e !== this);
		return degree;
	}
	equals(...args) {
		if (args.length === 2) {
			let [p0, p1] = args;
			return this._orig.equals2D(p0) && this._sym._orig.equals(p1);
		} else return super.equals(...args);
	}
	deltaY() {
		return this._sym._orig.y - this._orig.y;
	}
	sym() {
		return this._sym;
	}
	prev() {
		return this._sym.next()._sym;
	}
	compareAngularDirection(e) {
		var dx = this.deltaX();
		var dy = this.deltaY();
		var dx2 = e.deltaX();
		var dy2 = e.deltaY();
		if (dx === dx2 && dy === dy2) return 0;
		var quadrant = Quadrant.quadrant(dx, dy);
		var quadrant2 = Quadrant.quadrant(dx2, dy2);
		if (quadrant > quadrant2) return 1;
		if (quadrant < quadrant2) return -1;
		return CGAlgorithms.computeOrientation(e._orig, e.dest(), this.dest());
	}
	prevNode() {
		var e = this;
		while (e.degree() === 2) {
			e = e.prev();
			if (e === this) return null;
		}
		return e;
	}
	compareTo(obj) {
		var e = obj;
		var comp = this.compareAngularDirection(e);
		return comp;
	}
	next() {
		return this._next;
	}
	setSym(e) {
		this._sym = e;
	}
	orig() {
		return this._orig;
	}
	toString() {
		return "HE(" + this._orig.x + " " + this._orig.y + ", " + this._sym._orig.x + " " + this._sym._orig.y + ")";
	}
	setNext(e) {
		this._next = e;
	}
	init(e) {
		this.setSym(e);
		e.setSym(this);
		this.setNext(e);
		e.setNext(this);
	}
	deltaX() {
		return this._sym._orig.x - this._orig.x;
	}
	getClass() {
		return HalfEdge;
	}
}

class MarkHalfEdge extends HalfEdge {
	constructor(...args) {
		super();
		this._isMarked = false;
		if (args.length === 1) {
			let [orig] = args;
			super(orig);
		}
	}
	get interfaces_() {
		return [];
	}
	static setMarkBoth(e, isMarked) {
		e.setMark(isMarked);
		e.sym().setMark(isMarked);
	}
	static isMarked(e) {
		return e.isMarked();
	}
	static setMark(e, isMarked) {
		e.setMark(isMarked);
	}
	static markBoth(e) {
		e.mark();
		e.sym().mark();
	}
	static mark(e) {
		e.mark();
	}
	mark() {
		this._isMarked = true;
	}
	setMark(isMarked) {
		this._isMarked = isMarked;
	}
	isMarked() {
		return this._isMarked;
	}
	getClass() {
		return MarkHalfEdge;
	}
}

class EdgeGraph {
	constructor(...args) {
		this.vertexMap = new HashMap();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static isValidEdge(orig, dest) {
		var cmp = dest.compareTo(orig);
		return cmp !== 0;
	}
	insert(orig, dest, eAdj) {
		var e = this.create(orig, dest);
		if (eAdj !== null) {
			eAdj.insert(e);
		} else {
			this.vertexMap.put(orig, e);
		}
		var eAdjDest = this.vertexMap.get(dest);
		if (eAdjDest !== null) {
			eAdjDest.insert(e.sym());
		} else {
			this.vertexMap.put(dest, e.sym());
		}
		return e;
	}
	create(p0, p1) {
		var e0 = this.createEdge(p0);
		var e1 = this.createEdge(p1);
		HalfEdge.init(e0, e1);
		return e0;
	}
	createEdge(orig) {
		return new HalfEdge(orig);
	}
	addEdge(orig, dest) {
		if (!EdgeGraph.isValidEdge(orig, dest)) return null;
		var eAdj = this.vertexMap.get(orig);
		var eSame = null;
		if (eAdj !== null) {
			eSame = eAdj.find(dest);
		}
		if (eSame !== null) {
			return eSame;
		}
		var e = this.insert(orig, dest, eAdj);
		return e;
	}
	getVertexEdges() {
		return this.vertexMap.values();
	}
	findEdge(orig, dest) {
		var e = this.vertexMap.get(orig);
		if (e === null) return null;
		return e.find(dest);
	}
	getClass() {
		return EdgeGraph;
	}
}

class DissolveHalfEdge extends MarkHalfEdge {
	constructor(...args) {
		super();
		this._isStart = false;
		if (args.length === 1) {
			let [orig] = args;
			super(orig);
		}
	}
	get interfaces_() {
		return [];
	}
	setStart() {
		this._isStart = true;
	}
	isStart() {
		return this._isStart;
	}
	getClass() {
		return DissolveHalfEdge;
	}
}

class DissolveEdgeGraph extends EdgeGraph {
	get interfaces_() {
		return [];
	}
	createEdge(p0) {
		return new DissolveHalfEdge(p0);
	}
	getClass() {
		return DissolveEdgeGraph;
	}
}

class LineDissolver {
	constructor(...args) {
		this.result = null;
		this.factory = null;
		this.graph = null;
		this.lines = new ArrayList();
		this.nodeEdgeStack = new Stack();
		this.ringStartEdge = null;
		if (args.length === 0) {
			let [] = args;
			this.graph = new DissolveEdgeGraph();
		}
	}
	get interfaces_() {
		return [];
	}
	static dissolve(g) {
		var d = new LineDissolver();
		d.add(g);
		return d.getResult();
	}
	addLine(line) {
		this.lines.add(this.factory.createLineString(line.toCoordinateArray()));
	}
	updateRingStartEdge(e) {
		if (!e.isStart()) {
			e = e.sym();
			if (!e.isStart()) return null;
		}
		if (this.ringStartEdge === null) {
			this.ringStartEdge = e;
			return null;
		}
		if (e.orig().compareTo(this.ringStartEdge.orig()) < 0) {
			this.ringStartEdge = e;
		}
	}
	getResult() {
		if (this.result === null) this.computeResult();
		return this.result;
	}
	process(e) {
		var eNode = e.prevNode();
		if (eNode === null) eNode = e;
		this.stackEdges(eNode);
		this.buildLines();
	}
	buildRing(eStartRing) {
		var line = new CoordinateList();
		var e = eStartRing;
		line.add(e.orig().copy(), false);
		while (e.sym().degree() === 2) {
			var eNext = e.next();
			if (eNext === eStartRing) break;
			line.add(eNext.orig().copy(), false);
			e = eNext;
		}
		line.add(e.dest().copy(), false);
		this.addLine(line);
	}
	buildLine(eStart) {
		var line = new CoordinateList();
		var e = eStart;
		this.ringStartEdge = null;
		MarkHalfEdge.markBoth(e);
		line.add(e.orig().copy(), false);
		while (e.sym().degree() === 2) {
			this.updateRingStartEdge(e);
			var eNext = e.next();
			if (eNext === eStart) {
				this.buildRing(this.ringStartEdge);
				return null;
			}
			line.add(eNext.orig().copy(), false);
			e = eNext;
			MarkHalfEdge.markBoth(e);
		}
		line.add(e.dest().copy(), false);
		this.stackEdges(e.sym());
		this.addLine(line);
	}
	stackEdges(node) {
		var e = node;
		do {
			if (!MarkHalfEdge.isMarked(e)) this.nodeEdgeStack.add(e);
			e = e.oNext();
		} while (e !== node);
	}
	computeResult() {
		var edges = this.graph.getVertexEdges();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			if (MarkHalfEdge.isMarked(e)) continue;
			this.process(e);
		}
		this.result = this.factory.buildGeometry(this.lines);
	}
	buildLines() {
		while (!this.nodeEdgeStack.empty()) {
			var e = this.nodeEdgeStack.pop();
			if (MarkHalfEdge.isMarked(e)) continue;
			this.buildLine(e);
		}
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geometry] = args;
				geometry.apply(new (class {
					filter(component) {
						if (component instanceof LineString) {
							this.add(component);
						}
					}
					get interfaces_() {
						return [GeometryComponentFilter$1];
					}
				})());
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geometries] = args;
				for (var i = geometries.iterator(); i.hasNext(); ) {
					var geometry = i.next();
					this.add(geometry);
				}
			} else if (args[0] instanceof LineString) {
				let [lineString] = args;
				if (this.factory === null) {
					this.factory = lineString.getFactory();
				}
				var seq = lineString.getCoordinateSequence();
				var doneStart = false;
				for (var i = 1; i < seq.size(); i++) {
					var e = this.graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i));
					if (e === null) continue;
					if (!doneStart) {
						e.setStart();
						doneStart = true;
					}
				}
			}
		}
	}
	getClass() {
		return LineDissolver;
	}
}

const geometryTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon']

/**
 * Class for reading and writing Well-Known Text.Create a new parser for GeoJSON
 * NOTE: Adapted from OpenLayers 2.11 implementation.
 * @private
 */
class GeoJSONParser {
  /**
   * Create a new parser for GeoJSON
   *
   * @param {GeometryFactory}
   *          geometryFactory
   * @return An instance of GeoJsonParser.
   */
  constructor (geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
  }

  /**
   * Deserialize a GeoJSON object and return the Geometry or Feature(Collection) with JSTS Geometries
   *
   * @param {}
   *          A GeoJSON object.
   * @return {} A Geometry instance or object representing a Feature(Collection) with Geometry instances.
   */
  read (json) {
    let obj
    if (typeof json === 'string') {
      obj = JSON.parse(json)
    } else {
      obj = json
    }

    const type = obj.type

    if (!parse[type]) {
      throw new Error('Unknown GeoJSON type: ' + obj.type)
    }

    if (geometryTypes.indexOf(type) !== -1) {
      return parse[type].apply(this, [obj.coordinates])
    } else if (type === 'GeometryCollection') {
      return parse[type].apply(this, [obj.geometries])
    }

    // feature or feature collection
    return this.parse[type].apply(this, [obj])
  }

  /**
   * Serialize a Geometry object into GeoJSON
   *
   * @param {Geometry}
   *          geometry A Geometry or array of Geometries.
   * @return {Object} A GeoJSON object represting the input Geometry/Geometries.
   */
  write (geometry) {
    const type = geometry.getGeometryType()

    if (!extract[type]) {
      throw new Error('Geometry is not supported')
    }

    return extract[type].apply(this, [geometry])
  }
}

const parse = {
  /**
   * Parse a GeoJSON Feature object
   *
   * @param {Object}
   *          obj Object to parse.
   *
   * @return {Object} Feature with geometry/bbox converted to JSTS Geometries.
   */
  Feature: function (obj) {
    const feature = {}

    // copy features
    for (let key in obj) {
      feature[key] = obj[key]
    }

    // parse geometry
    if (obj.geometry) {
      const type = obj.geometry.type
      if (!this.parse[type]) {
        throw new Error('Unknown GeoJSON type: ' + obj.type)
      }
      feature.geometry = this.read(obj.geometry)
    }

    // bbox
    if (obj.bbox) {
      feature.bbox = this.parse.bbox.apply(this, [obj.bbox])
    }

    return feature
  },

  /**
   * Parse a GeoJSON FeatureCollection object
   *
   * @param {Object}
   *          obj Object to parse.
   *
   * @return {Object} FeatureCollection with geometry/bbox converted to JSTS Geometries.
   */
  FeatureCollection: function (obj) {
    const featureCollection = {}

    if (obj.features) {
      featureCollection.features = []

      for (let i = 0; i < obj.features.length; ++i) {
        featureCollection.features.push(this.read(obj.features[i]))
      }
    }

    if (obj.bbox) {
      featureCollection.bbox = this.parse.bbox.apply(this, [obj.bbox])
    }

    return featureCollection
  },

  /**
   * Convert the ordinates in an array to an array of Coordinates
   *
   * @param {Array}
   *          array Array with {Number}s.
   *
   * @return {Array} Array with Coordinates.
   */
  coordinates: function (array) {
    const coordinates = []
    for (let i = 0; i < array.length; ++i) {
      const sub = array[i]
      coordinates.push(new Coordinate(sub[0], sub[1]))
    }
    return coordinates
  },

  /**
   * Convert the bbox to a LinearRing
   *
   * @param {Array}
   *          array Array with [xMin, yMin, xMax, yMax].
   *
   * @return {Array} Array with Coordinates.
   */
  bbox: function (array) {
    return this.geometryFactory.createLinearRing([
      new Coordinate(array[0], array[1]),
      new Coordinate(array[2], array[1]),
      new Coordinate(array[2], array[3]),
      new Coordinate(array[0], array[3]),
      new Coordinate(array[0], array[1])
    ])
  },

  /**
   * Convert an Array with ordinates to a Point
   *
   * @param {Array}
   *          array Array with ordinates.
   *
   * @return {Point} Point.
   */
  Point: function (array) {
    const coordinate = new Coordinate(array[0], array[1])
    return this.geometryFactory.createPoint(coordinate)
  },

  /**
   * Convert an Array with coordinates to a MultiPoint
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {MultiPoint} MultiPoint.
   */
  MultiPoint: function (array) {
    const points = []
    for (let i = 0; i < array.length; ++i) {
      points.push(parse.Point.apply(this, [array[i]]))
    }
    return this.geometryFactory.createMultiPoint(points)
  },

  /**
   * Convert an Array with coordinates to a LineString
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {LineString} LineString.
   */
  LineString: function (array) {
    const coordinates = parse.coordinates.apply(this, [array])
    return this.geometryFactory.createLineString(coordinates)
  },

  /**
   * Convert an Array with coordinates to a MultiLineString
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {MultiLineString} MultiLineString.
   */
  MultiLineString: function (array) {
    const lineStrings = []
    for (let i = 0; i < array.length; ++i) {
      lineStrings.push(parse.LineString.apply(this, [array[i]]))
    }
    return this.geometryFactory.createMultiLineString(lineStrings)
  },

  /**
   * Convert an Array to a Polygon
   *
   * @param {Array}
   *          array Array with shell and holes.
   *
   * @return {Polygon} Polygon.
   */
  Polygon: function (array) {
    const shellCoordinates = parse.coordinates.apply(this, [array[0]])
    const shell = this.geometryFactory.createLinearRing(shellCoordinates)
    const holes = []
    for (let i = 1; i < array.length; ++i) {
      var hole = array[i]
      var coordinates = parse.coordinates.apply(this, [hole])
      var linearRing = this.geometryFactory.createLinearRing(coordinates)
      holes.push(linearRing)
    }
    return this.geometryFactory.createPolygon(shell, holes)
  },

  /**
   * Convert an Array to a MultiPolygon
   *
   * @param {Array}
   *          array Array of arrays with shell and rings.
   *
   * @return {MultiPolygon} MultiPolygon.
   */
  MultiPolygon: function (array) {
    const polygons = []
    for (let i = 0; i < array.length; ++i) {
      const polygon = array[i]
      polygons.push(parse.Polygon.apply(this, [polygon]))
    }
    return this.geometryFactory.createMultiPolygon(polygons)
  },

  /**
   * Convert an Array to a GeometryCollection
   *
   * @param {Array}
   *          array Array of GeoJSON geometries.
   *
   * @return {GeometryCollection} GeometryCollection.
   */
  GeometryCollection: function (array) {
    const geometries = []
    for (let i = 0; i < array.length; ++i) {
      const geometry = array[i]
      geometries.push(this.read(geometry))
    }
    return this.geometryFactory.createGeometryCollection(geometries)
  }
}

const extract = {
  /**
   * Convert a Coordinate to an Array
   *
   * @param {Coordinate}
   *          coordinate Coordinate to convert.
   *
   * @return {Array} Array of ordinates.
   */
  coordinate: function (coordinate) {
    return [coordinate.x, coordinate.y]
  },

  /**
   * Convert a Point to a GeoJSON object
   *
   * @param {Point}
   *          point Point to convert.
   *
   * @return {Array} Array of 2 ordinates (paired to a coordinate).
   */
  Point: function (point) {
    const array = extract.coordinate.apply(this, [point.getCoordinate()])
    return {
      type: 'Point',
      coordinates: array
    }
  },

  /**
   * Convert a MultiPoint to a GeoJSON object
   *
   * @param {MultiPoint}
   *          multipoint MultiPoint to convert.
   *
   * @return {Array} Array of coordinates.
   */
  MultiPoint: function (multipoint) {
    const array = []
    for (let i = 0; i < multipoint.geometries.length; ++i) {
      const point = multipoint.geometries[i]
      const geoJson = extract.Point.apply(this, [point])
      array.push(geoJson.coordinates)
    }
    return {
      type: 'MultiPoint',
      coordinates: array
    }
  },

  /**
   * Convert a LineString to a GeoJSON object
   *
   * @param {LineString}
   *          linestring LineString to convert.
   *
   * @return {Array} Array of coordinates.
   */
  LineString: function (linestring) {
    const array = []
    for (let i = 0; i < linestring.points.length; ++i) {
      const coordinate = linestring.points[i]
      array.push(extract.coordinate.apply(this, [coordinate]))
    }
    return {
      type: 'LineString',
      coordinates: array
    }
  },

  /**
   * Convert a MultiLineString to a GeoJSON object
   *
   * @param {MultiLineString}
   *          multilinestring MultiLineString to convert.
   *
   * @return {Array} Array of Array of coordinates.
   */
  MultiLineString: function (multilinestring) {
    const array = []
    for (let i = 0; i < multilinestring.geometries.length; ++i) {
      const linestring = multilinestring.geometries[i]
      const geoJson = extract.LineString.apply(this, [linestring])
      array.push(geoJson.coordinates)
    }
    return {
      type: 'MultiLineString',
      coordinates: array
    }
  },

  /**
   * Convert a Polygon to a GeoJSON object
   *
   * @param {Polygon}
   *          polygon Polygon to convert.
   *
   * @return {Array} Array with shell, holes.
   */
  Polygon: function (polygon) {
    const array = []
    const shellGeoJson = extract.LineString.apply(this, [polygon.shell])
    array.push(shellGeoJson.coordinates)
    for (let i = 0; i < polygon.holes.length; ++i) {
      const hole = polygon.holes[i]
      const holeGeoJson = extract.LineString.apply(this, [hole])
      array.push(holeGeoJson.coordinates)
    }
    return {
      type: 'Polygon',
      coordinates: array
    }
  },

  /**
   * Convert a MultiPolygon to a GeoJSON object
   *
   * @param {MultiPolygon}
   *          multipolygon MultiPolygon to convert.
   *
   * @return {Array} Array of polygons.
   */
  MultiPolygon: function (multipolygon) {
    const array = []
    for (let i = 0; i < multipolygon.geometries.length; ++i) {
      const polygon = multipolygon.geometries[i]
      const geoJson = extract.Polygon.apply(this, [polygon])
      array.push(geoJson.coordinates)
    }
    return {
      type: 'MultiPolygon',
      coordinates: array
    }
  },

  /**
   * Convert a GeometryCollection to a GeoJSON object
   *
   * @param {GeometryCollection}
   *          collection GeometryCollection to convert.
   *
   * @return {Array} Array of geometries.
   */
  GeometryCollection: function (collection) {
    const array = []
    for (let i = 0; i < collection.geometries.length; ++i) {
      const geometry = collection.geometries[i]
      const type = geometry.getGeometryType().slice(10)
      array.push(extract[type].apply(this, [geometry]))
    }
    return {
      type: 'GeometryCollection',
      geometries: array
    }
  }
}

class GeoJSONReader {
  /**
   * Converts a geometry in GeoJSON to a {@link Geometry}.
   * <p>
   * A <code>GeoJSONReader</code> is parameterized by a <code>GeometryFactory</code>,
   * to allow it to create <code>Geometry</code> objects of the appropriate
   * implementation. In particular, the <code>GeometryFactory</code> determines
   * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
   * <P>
   */
  constructor (geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
    this.precisionModel = this.geometryFactory.getPrecisionModel()
    this.parser = new GeoJSONParser(this.geometryFactory)
  }

  /**
   * Reads a GeoJSON representation of a {@link Geometry}
   *
   * @param {object}
   *          geoJson a GeoJSON Object or String.
   * @return {Geometry} a <code>Geometry.</code>
   */
  read (geoJson) {
    var geometry = this.parser.read(geoJson)

    if (this.precisionModel.getType() === PrecisionModel.FIXED) {
      this.reducePrecision(geometry)
    }

    return geometry
  }

  // NOTE: this is a hack
  reducePrecision (geometry) {
    var i, len

    if (geometry.coordinate) {
      this.precisionModel.makePrecise(geometry.coordinate)
    } else if (geometry.points) {
      for (i = 0, len = geometry.points.length; i < len; i++) {
        this.precisionModel.makePrecise(geometry.points[i])
      }
    } else if (geometry.geometries) {
      for (i = 0, len = geometry.geometries.length; i < len; i++) {
        this.reducePrecision(geometry.geometries[i])
      }
    }
  }
}

class GeoJSONWriter {
  /**
   * Writes the GeoJSON representation of a {@link Geometry}. The
   * The GeoJSON format is defined <A
   * HREF="http://geojson.org/geojson-spec.html">here</A>.
   * <p>
   * The <code>GeoJSONWriter</code> outputs coordinates rounded to the precision
   * model. Only the maximum number of decimal places necessary to represent the
   * ordinates to the required precision will be output.
   * <p>
   */
  constructor () {
    this.parser = new GeoJSONParser(this.geometryFactory)
  }

  /**
   * Converts a <code>Geometry</code> to its GeoJSON representation.
   *
   * @param {Geometry}
   *          geometry a <code>Geometry</code> to process.
   * @return {Object} The GeoJSON representation of the Geometry.
   */
  write (geometry) {
    return this.parser.write(geometry)
  }
}

/**
 * Converts a geometry in Well-Known Text format to a {@link Geometry}.
 * <p>
 * <code>WKTReader</code> supports extracting <code>Geometry</code> objects
 * from either {@link Reader}s or {@link String}s. This allows it to function
 * as a parser to read <code>Geometry</code> objects from text blocks embedded
 * in other data formats (e.g. XML).
 */
class WKTReader {
  /**
   * A <code>WKTReader</code> is parameterized by a <code>GeometryFactory</code>,
   * to allow it to create <code>Geometry</code> objects of the appropriate
   * implementation. In particular, the <code>GeometryFactory</code> determines
   * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
   * <P>
   */
  constructor (geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
    this.precisionModel = this.geometryFactory.getPrecisionModel()
    this.parser = new WKTParser(this.geometryFactory)
  }

  /**
   * Reads a Well-Known Text representation of a {@link Geometry}
   *
   * @param {string}
   *          wkt a <Geometry Tagged Text> string (see the OpenGIS Simple Features
   *          Specification).
   * @return {jsts.geom.Geometry} a <code>Geometry</code> read from
   *         <code>string.</code>
   */
  read (wkt) {
    var geometry = this.parser.read(wkt)

    // TODO: port and use GeometryPrecisionReducer, this is a hack
    if (this.precisionModel.getType() === PrecisionModel.FIXED) {
      this.reducePrecision(geometry)
    }

    return geometry
  }

  reducePrecision (geometry) {
    if (geometry.coordinate) {
      this.precisionModel.makePrecise(geometry.coordinate)
    } else if (geometry.points) {
      for (let i = 0, len = geometry.points.coordinates.length; i < len; i++) {
        this.precisionModel.makePrecise(geometry.points.coordinates[i])
      }
    } else if (geometry.geometries) {
      for (let i = 0, len = geometry.geometries.length; i < len; i++) {
        this.reducePrecision(geometry.geometries[i])
      }
    }
  }
}

function p2c (p) { return [p.x, p.y] }

/**
 * OpenLayers 3 Geometry parser and writer
 */
class OL3Parser {
  constructor (geometryFactory) {
    this.geometryFactory = geometryFactory || new GeometryFactory()
  }

  /**
   * @param geometry
   *          {ol.geom.Geometry}
   * @return {Geometry}
   */
  read (geometry) {
    if (geometry instanceof ol.geom.Point) {
      return this.convertFromPoint(geometry)
    } else if (geometry instanceof ol.geom.LineString) {
      return this.convertFromLineString(geometry)
    } else if (geometry instanceof ol.geom.LinearRing) {
      return this.convertFromLinearRing(geometry)
    } else if (geometry instanceof ol.geom.Polygon) {
      return this.convertFromPolygon(geometry)
    } else if (geometry instanceof ol.geom.MultiPoint) {
      return this.convertFromMultiPoint(geometry)
    } else if (geometry instanceof ol.geom.MultiLineString) {
      return this.convertFromMultiLineString(geometry)
    } else if (geometry instanceof ol.geom.MultiPolygon) {
      return this.convertFromMultiPolygon(geometry)
    } else if (geometry instanceof ol.geom.GeometryCollection) {
      return this.convertFromCollection(geometry)
    }
  }

  convertFromPoint (point) {
    var coordinates = point.getCoordinates()
    return this.geometryFactory.createPoint(new Coordinate(coordinates[0], coordinates[1]))
  }

  convertFromLineString (lineString) {
    return this.geometryFactory.createLineString(lineString.getCoordinates().map(function (coordinates) {
      return new Coordinate(coordinates[0], coordinates[1])
    }))
  }

  convertFromLinearRing (linearRing) {
    return this.geometryFactory.createLinearRing(linearRing.getCoordinates().map(function (coordinates) {
      return new Coordinate(coordinates[0], coordinates[1])
    }))
  }

  convertFromPolygon (polygon) {
    const linearRings = polygon.getLinearRings()
    var shell = null
    var holes = []
    for (let i = 0; i < linearRings.length; i++) {
      const linearRing = this.convertFromLinearRing(linearRings[i])
      if (i === 0) {
        shell = linearRing
      } else {
        holes.push(linearRing)
      }
    }
    return this.geometryFactory.createPolygon(shell, holes)
  }

  convertFromMultiPoint (multiPoint) {
    const points = multiPoint.getPoints().map(function (point) {
      return this.convertFromPoint(point)
    }, this)
    return this.geometryFactory.createMultiPoint(points)
  }

  convertFromMultiLineString (multiLineString) {
    const lineStrings = multiLineString.getLineStrings().map(function (lineString) {
      return this.convertFromLineString(lineString)
    }, this)
    return this.geometryFactory.createMultiLineString(lineStrings)
  }

  convertFromMultiPolygon (multiPolygon) {
    const polygons = multiPolygon.getPolygons().map(function (polygon) {
      return this.convertFromPolygon(polygon)
    }, this)
    return this.geometryFactory.createMultiPolygon(polygons)
  }

  convertFromCollection (collection) {
    const geometries = collection.getGeometries().map(function (geometry) {
      return this.read(geometry)
    }, this)
    return this.geometryFactory.createGeometryCollection(geometries)
  }

  /**
   * @param geometry
   *          {Geometry}
   * @return {ol.geom.Geometry}
   */
  write (geometry) {
    if (geometry.getGeometryType() === 'Point') {
      return this.convertToPoint(geometry.getCoordinate())
    } else if (geometry.getGeometryType() === 'LineString') {
      return this.convertToLineString(geometry)
    } else if (geometry.getGeometryType() === 'LinearRing') {
      return this.convertToLinearRing(geometry)
    } else if (geometry.getGeometryType() === 'Polygon') {
      return this.convertToPolygon(geometry)
    } else if (geometry.getGeometryType() === 'MultiPoint') {
      return this.convertToMultiPoint(geometry)
    } else if (geometry.getGeometryType() === 'MultiLineString') {
      return this.convertToMultiLineString(geometry)
    } else if (geometry.getGeometryType() === 'MultiPolygon') {
      return this.convertToMultiPolygon(geometry)
    } else if (geometry.getGeometryType() === 'GeometryCollection') {
      return this.convertToCollection(geometry)
    }
  }

  convertToPoint (coordinate) {
    return new ol.geom.Point([coordinate.x, coordinate.y])
  }

  convertToLineString (lineString) {
    var points = lineString.points.coordinates.map(p2c)
    return new ol.geom.LineString(points)
  }

  convertToLinearRing (linearRing) {
    var points = linearRing.points.coordinates.map(p2c)
    return new ol.geom.LinearRing(points)
  }

  convertToPolygon (polygon) {
    var rings = [polygon.shell.points.coordinates.map(p2c)]
    for (let i = 0; i < polygon.holes.length; i++) {
      rings.push(polygon.holes[i].points.coordinates.map(p2c))
    }
    return new ol.geom.Polygon(rings)
  }

  convertToMultiPoint (multiPoint) {
    return new ol.geom.MultiPoint(multiPoint.getCoordinates().map(p2c))
  }

  convertToMultiLineString (multiLineString) {
    var lineStrings = []
    for (let i = 0; i < multiLineString.geometries.length; i++) {
      lineStrings.push(this.convertToLineString(multiLineString.geometries[i]).getCoordinates())
    }
    return new ol.geom.MultiLineString(lineStrings)
  }

  convertToMultiPolygon (multiPolygon) {
    var polygons = []
    for (let i = 0; i < multiPolygon.geometries.length; i++) {
      polygons.push(this.convertToPolygon(multiPolygon.geometries[i]).getCoordinates())
    }
    return new ol.geom.MultiPolygon(polygons)
  }

  convertToCollection (geometryCollection) {
    var geometries = []
    for (let i = 0; i < geometryCollection.geometries.length; i++) {
      var geometry = geometryCollection.geometries[i]
      geometries.push(this.write(geometry))
    }
    return new ol.geom.GeometryCollection(geometries)
  }

}

class GeometryCollectionIterator {
	constructor(...args) {
		this.parent = null;
		this.atStart = null;
		this.max = null;
		this.index = null;
		this.subcollectionIterator = null;
		if (args.length === 1) {
			let [parent] = args;
			this.parent = parent;
			this.atStart = true;
			this.index = 0;
			this.max = parent.getNumGeometries();
		}
	}
	get interfaces_() {
		return [Iterator];
	}
	static isAtomic(geom) {
		return !(geom instanceof GeometryCollection);
	}
	next() {
		if (this.atStart) {
			this.atStart = false;
			if (GeometryCollectionIterator.isAtomic(this.parent)) this.index++;
			return this.parent;
		}
		if (this.subcollectionIterator !== null) {
			if (this.subcollectionIterator.hasNext()) {
				return this.subcollectionIterator.next();
			} else {
				this.subcollectionIterator = null;
			}
		}
		if (this.index >= this.max) {
			throw new NoSuchElementException();
		}
		var obj = this.parent.getGeometryN(this.index++);
		if (obj instanceof GeometryCollection) {
			this.subcollectionIterator = new GeometryCollectionIterator(obj);
			return this.subcollectionIterator.next();
		}
		return obj;
	}
	remove() {
		throw new UnsupportedOperationException(this.getClass().getName());
	}
	hasNext() {
		if (this.atStart) {
			return true;
		}
		if (this.subcollectionIterator !== null) {
			if (this.subcollectionIterator.hasNext()) {
				return true;
			}
			this.subcollectionIterator = null;
		}
		if (this.index >= this.max) {
			return false;
		}
		return true;
	}
	getClass() {
		return GeometryCollectionIterator;
	}
}

class PointLocator {
	constructor(...args) {
		this.boundaryRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
		this.isIn = null;
		this.numBoundaries = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [boundaryRule] = args;
				if (boundaryRule === null) throw new IllegalArgumentException$1("Rule must be non-null");
				this.boundaryRule = boundaryRule;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	locateInPolygonRing(p, ring) {
		if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
		return CGAlgorithms.locatePointInRing(p, ring.getCoordinates());
	}
	intersects(p, geom) {
		return this.locate(p, geom) !== Location.EXTERIOR;
	}
	updateLocationInfo(loc) {
		if (loc === Location.INTERIOR) this.isIn = true;
		if (loc === Location.BOUNDARY) this.numBoundaries++;
	}
	computeLocation(p, geom) {
		if (geom instanceof Point) {
			this.updateLocationInfo(this.locate(p, geom));
		}
		if (geom instanceof LineString) {
			this.updateLocationInfo(this.locate(p, geom));
		} else if (geom instanceof Polygon) {
			this.updateLocationInfo(this.locate(p, geom));
		} else if (geom instanceof MultiLineString) {
			var ml = geom;
			for (var i = 0; i < ml.getNumGeometries(); i++) {
				var l = ml.getGeometryN(i);
				this.updateLocationInfo(this.locate(p, l));
			}
		} else if (geom instanceof MultiPolygon) {
			var mpoly = geom;
			for (var i = 0; i < mpoly.getNumGeometries(); i++) {
				var poly = mpoly.getGeometryN(i);
				this.updateLocationInfo(this.locate(p, poly));
			}
		} else if (geom instanceof GeometryCollection) {
			var geomi = new GeometryCollectionIterator(geom);
			while (geomi.hasNext()) {
				var g2 = geomi.next();
				if (g2 !== geom) this.computeLocation(p, g2);
			}
		}
	}
	locate(...args) {
		if (args.length === 2) {
			if (args[0] instanceof Coordinate && args[1] instanceof Polygon) {
				let [p, poly] = args;
				if (poly.isEmpty()) return Location.EXTERIOR;
				var shell = poly.getExteriorRing();
				var shellLoc = this.locateInPolygonRing(p, shell);
				if (shellLoc === Location.EXTERIOR) return Location.EXTERIOR;
				if (shellLoc === Location.BOUNDARY) return Location.BOUNDARY;
				for (var i = 0; i < poly.getNumInteriorRing(); i++) {
					var hole = poly.getInteriorRingN(i);
					var holeLoc = this.locateInPolygonRing(p, hole);
					if (holeLoc === Location.INTERIOR) return Location.EXTERIOR;
					if (holeLoc === Location.BOUNDARY) return Location.BOUNDARY;
				}
				return Location.INTERIOR;
			} else if (args[0] instanceof Coordinate && args[1] instanceof LineString) {
				let [p, l] = args;
				if (!l.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR;
				var pt = l.getCoordinates();
				if (!l.isClosed()) {
					if (p.equals(pt[0]) || p.equals(pt[pt.length - 1])) {
						return Location.BOUNDARY;
					}
				}
				if (CGAlgorithms.isOnLine(p, pt)) return Location.INTERIOR;
				return Location.EXTERIOR;
			} else if (args[0] instanceof Coordinate && args[1] instanceof Point) {
				let [p, pt] = args;
				var ptCoord = pt.getCoordinate();
				if (ptCoord.equals2D(p)) return Location.INTERIOR;
				return Location.EXTERIOR;
			} else if (args[0] instanceof Coordinate && args[1] instanceof Geometry) {
				let [p, geom] = args;
				if (geom.isEmpty()) return Location.EXTERIOR;
				if (geom instanceof LineString) {
					return this.locate(p, geom);
				} else if (geom instanceof Polygon) {
					return this.locate(p, geom);
				}
				this.isIn = false;
				this.numBoundaries = 0;
				this.computeLocation(p, geom);
				if (this.boundaryRule.isInBoundary(this.numBoundaries)) return Location.BOUNDARY;
				if (this.numBoundaries > 0 || this.isIn) return Location.INTERIOR;
				return Location.EXTERIOR;
			}
		}
	}
	getClass() {
		return PointLocator;
	}
}

class Position {
	get interfaces_() {
		return [];
	}
	static opposite(position) {
		if (position === Position.LEFT) return Position.RIGHT;
		if (position === Position.RIGHT) return Position.LEFT;
		return position;
	}
	getClass() {
		return Position;
	}
}
Position.ON = 0;
Position.LEFT = 1;
Position.RIGHT = 2;

class MonotoneChain {
	constructor(...args) {
		this.mce = null;
		this.chainIndex = null;
		if (args.length === 2) {
			let [mce, chainIndex] = args;
			this.mce = mce;
			this.chainIndex = chainIndex;
		}
	}
	get interfaces_() {
		return [];
	}
	computeIntersections(mc, si) {
		this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
	}
	getClass() {
		return MonotoneChain;
	}
}

class SweepLineEvent {
	constructor(...args) {
		this.label = null;
		this.xValue = null;
		this.eventType = null;
		this.insertEvent = null;
		this.deleteEventIndex = null;
		this.obj = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				let [x, insertEvent] = args;
				this.eventType = SweepLineEvent.DELETE;
				this.xValue = x;
				this.insertEvent = insertEvent;
			} else if (args.length === 3) {
				let [label, x, obj] = args;
				this.eventType = SweepLineEvent.INSERT;
				this.label = label;
				this.xValue = x;
				this.obj = obj;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparable];
	}
	isDelete() {
		return this.eventType === SweepLineEvent.DELETE;
	}
	setDeleteEventIndex(deleteEventIndex) {
		this.deleteEventIndex = deleteEventIndex;
	}
	getObject() {
		return this.obj;
	}
	compareTo(o) {
		var pe = o;
		if (this.xValue < pe.xValue) return -1;
		if (this.xValue > pe.xValue) return 1;
		if (this.eventType < pe.eventType) return -1;
		if (this.eventType > pe.eventType) return 1;
		return 0;
	}
	getInsertEvent() {
		return this.insertEvent;
	}
	isInsert() {
		return this.eventType === SweepLineEvent.INSERT;
	}
	isSameLabel(ev) {
		if (this.label === null) return false;
		return this.label === ev.label;
	}
	getDeleteEventIndex() {
		return this.deleteEventIndex;
	}
	getClass() {
		return SweepLineEvent;
	}
}
SweepLineEvent.INSERT = 1;
SweepLineEvent.DELETE = 2;

class EdgeSetIntersector {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	getClass() {
		return EdgeSetIntersector;
	}
}

class Collections {
  static reverseOrder() {
    return {
      compare(a, b) {
        return b.compareTo(a)
      }
    }
  }
  static min(l) {
    Collections.sort(l)
    return l.get(0)
  }
  static sort(l, c) {
    const a = l.toArray();
    if (c) {
      Arrays.sort(a, c);
    } else {
      Arrays.sort(a);
    }
    const i = l.iterator();
    for (let pos = 0, alen = a.length;  pos < alen;  pos++) {
      i.next();
      i.set(a[pos]);
    }
  }
}

class SegmentIntersector {
	constructor(...args) {
		this._hasIntersection = false;
		this.hasProper = false;
		this.hasProperInterior = false;
		this.properIntersectionPoint = null;
		this.li = null;
		this.includeProper = null;
		this.recordIsolated = null;
		this.isSelfIntersection = null;
		this.numIntersections = 0;
		this.numTests = 0;
		this.bdyNodes = null;
		this._isDone = false;
		this.isDoneWhenProperInt = false;
		if (args.length === 3) {
			let [li, includeProper, recordIsolated] = args;
			this.li = li;
			this.includeProper = includeProper;
			this.recordIsolated = recordIsolated;
		}
	}
	get interfaces_() {
		return [];
	}
	static isAdjacentSegments(i1, i2) {
		return Math.abs(i1 - i2) === 1;
	}
	isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1) {
			if (this.li.getIntersectionNum() === 1) {
				if (SegmentIntersector.isAdjacentSegments(segIndex0, segIndex1)) return true;
				if (e0.isClosed()) {
					var maxSegIndex = e0.getNumPoints() - 1;
					if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) {
						return true;
					}
				}
			}
		}
		return false;
	}
	getProperIntersectionPoint() {
		return this.properIntersectionPoint;
	}
	setIsDoneIfProperInt(isDoneWhenProperInt) {
		this.isDoneWhenProperInt = isDoneWhenProperInt;
	}
	hasProperInteriorIntersection() {
		return this.hasProperInterior;
	}
	isBoundaryPointInternal(li, bdyNodes) {
		for (var i = bdyNodes.iterator(); i.hasNext(); ) {
			var node = i.next();
			var pt = node.getCoordinate();
			if (li.isIntersection(pt)) return true;
		}
		return false;
	}
	hasProperIntersection() {
		return this.hasProper;
	}
	hasIntersection() {
		return this._hasIntersection;
	}
	isDone() {
		return this._isDone;
	}
	isBoundaryPoint(li, bdyNodes) {
		if (bdyNodes === null) return false;
		if (this.isBoundaryPointInternal(li, bdyNodes[0])) return true;
		if (this.isBoundaryPointInternal(li, bdyNodes[1])) return true;
		return false;
	}
	setBoundaryNodes(bdyNodes0, bdyNodes1) {
		this.bdyNodes = new Array(2);
		this.bdyNodes[0] = bdyNodes0;
		this.bdyNodes[1] = bdyNodes1;
	}
	addIntersections(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		this.numTests++;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			if (this.recordIsolated) {
				e0.setIsolated(false);
				e1.setIsolated(false);
			}
			this.numIntersections++;
			if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
				this._hasIntersection = true;
				if (this.includeProper || !this.li.isProper()) {
					e0.addIntersections(this.li, segIndex0, 0);
					e1.addIntersections(this.li, segIndex1, 1);
				}
				if (this.li.isProper()) {
					this.properIntersectionPoint = this.li.getIntersection(0).copy();
					this.hasProper = true;
					if (this.isDoneWhenProperInt) {
						this._isDone = true;
					}
					if (!this.isBoundaryPoint(this.li, this.bdyNodes)) this.hasProperInterior = true;
				}
			}
		}
	}
	getClass() {
		return SegmentIntersector;
	}
}

class SimpleMCSweepLineIntersector extends EdgeSetIntersector {
	constructor(...args) {
		super();
		this.events = new ArrayList();
		this.nOverlaps = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	prepareEvents() {
		Collections.sort(this.events);
		for (var i = 0; i < this.events.size(); i++) {
			var ev = this.events.get(i);
			if (ev.isDelete()) {
				ev.getInsertEvent().setDeleteEventIndex(i);
			}
		}
	}
	computeIntersections(...args) {
		if (args.length === 1) {
			let [si] = args;
			this.nOverlaps = 0;
			this.prepareEvents();
			for (var i = 0; i < this.events.size(); i++) {
				var ev = this.events.get(i);
				if (ev.isInsert()) {
					this.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
				}
				if (si.isDone()) {
					break;
				}
			}
		} else if (args.length === 3) {
			if (args[2] instanceof SegmentIntersector && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
				let [edges0, edges1, si] = args;
				this.addEdges(edges0, edges0);
				this.addEdges(edges1, edges1);
				this.computeIntersections(si);
			} else if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && args[1] instanceof SegmentIntersector)) {
				let [edges, si, testAllSegments] = args;
				if (testAllSegments) this.addEdges(edges, null); else this.addEdges(edges);
				this.computeIntersections(si);
			}
		}
	}
	addEdge(edge, edgeSet) {
		var mce = edge.getMonotoneChainEdge();
		var startIndex = mce.getStartIndexes();
		for (var i = 0; i < startIndex.length - 1; i++) {
			var mc = new MonotoneChain(mce, i);
			var insertEvent = new SweepLineEvent(edgeSet, mce.getMinX(i), mc);
			this.events.add(insertEvent);
			this.events.add(new SweepLineEvent(mce.getMaxX(i), insertEvent));
		}
	}
	processOverlaps(start, end, ev0, si) {
		var mc0 = ev0.getObject();
		for (var i = start; i < end; i++) {
			var ev1 = this.events.get(i);
			if (ev1.isInsert()) {
				var mc1 = ev1.getObject();
				if (!ev0.isSameLabel(ev1)) {
					mc0.computeIntersections(mc1, si);
					this.nOverlaps++;
				}
			}
		}
	}
	addEdges(...args) {
		if (args.length === 1) {
			let [edges] = args;
			for (var i = edges.iterator(); i.hasNext(); ) {
				var edge = i.next();
				this.addEdge(edge, edge);
			}
		} else if (args.length === 2) {
			let [edges, edgeSet] = args;
			for (var i = edges.iterator(); i.hasNext(); ) {
				var edge = i.next();
				this.addEdge(edge, edgeSet);
			}
		}
	}
	getClass() {
		return SimpleMCSweepLineIntersector;
	}
}

class TopologyLocation {
	constructor(...args) {
		this.location = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				if (args[0] instanceof Array) {
					let [location] = args;
					this.init(location.length);
				} else if (Number.isInteger(args[0])) {
					let [on] = args;
					this.init(1);
					this.location[Position.ON] = on;
				} else if (args[0] instanceof TopologyLocation) {
					let [gl] = args;
					this.init(gl.location.length);
					if (gl !== null) {
						for (var i = 0; i < this.location.length; i++) {
							this.location[i] = gl.location[i];
						}
					}
				}
			} else if (args.length === 3) {
				let [on, left, right] = args;
				this.init(3);
				this.location[Position.ON] = on;
				this.location[Position.LEFT] = left;
				this.location[Position.RIGHT] = right;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setAllLocations(locValue) {
		for (var i = 0; i < this.location.length; i++) {
			this.location[i] = locValue;
		}
	}
	isNull() {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] !== Location.NONE) return false;
		}
		return true;
	}
	setAllLocationsIfNull(locValue) {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE) this.location[i] = locValue;
		}
	}
	isLine() {
		return this.location.length === 1;
	}
	merge(gl) {
		if (gl.location.length > this.location.length) {
			var newLoc = new Array(3);
			newLoc[Position.ON] = this.location[Position.ON];
			newLoc[Position.LEFT] = Location.NONE;
			newLoc[Position.RIGHT] = Location.NONE;
			this.location = newLoc;
		}
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE && i < gl.location.length) this.location[i] = gl.location[i];
		}
	}
	getLocations() {
		return this.location;
	}
	flip() {
		if (this.location.length <= 1) return null;
		var temp = this.location[Position.LEFT];
		this.location[Position.LEFT] = this.location[Position.RIGHT];
		this.location[Position.RIGHT] = temp;
	}
	toString() {
		var buf = new StringBuffer();
		if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.LEFT]));
		buf.append(Location.toLocationSymbol(this.location[Position.ON]));
		if (this.location.length > 1) buf.append(Location.toLocationSymbol(this.location[Position.RIGHT]));
		return buf.toString();
	}
	setLocations(on, left, right) {
		this.location[Position.ON] = on;
		this.location[Position.LEFT] = left;
		this.location[Position.RIGHT] = right;
	}
	get(posIndex) {
		if (posIndex < this.location.length) return this.location[posIndex];
		return Location.NONE;
	}
	isArea() {
		return this.location.length > 1;
	}
	isAnyNull() {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] === Location.NONE) return true;
		}
		return false;
	}
	setLocation(...args) {
		if (args.length === 1) {
			let [locValue] = args;
			this.setLocation(Position.ON, locValue);
		} else if (args.length === 2) {
			let [locIndex, locValue] = args;
			this.location[locIndex] = locValue;
		}
	}
	init(size) {
		this.location = new Array(size);
		this.setAllLocations(Location.NONE);
	}
	isEqualOnSide(le, locIndex) {
		return this.location[locIndex] === le.location[locIndex];
	}
	allPositionsEqual(loc) {
		for (var i = 0; i < this.location.length; i++) {
			if (this.location[i] !== loc) return false;
		}
		return true;
	}
	getClass() {
		return TopologyLocation;
	}
}

class Label {
	constructor(...args) {
		this.elt = new Array(2);
		const overloaded = (...args) => {
			if (args.length === 1) {
				if (Number.isInteger(args[0])) {
					let [onLoc] = args;
					this.elt[0] = new TopologyLocation(onLoc);
					this.elt[1] = new TopologyLocation(onLoc);
				} else if (args[0] instanceof Label) {
					let [lbl] = args;
					this.elt[0] = new TopologyLocation(lbl.elt[0]);
					this.elt[1] = new TopologyLocation(lbl.elt[1]);
				}
			} else if (args.length === 2) {
				let [geomIndex, onLoc] = args;
				this.elt[0] = new TopologyLocation(Location.NONE);
				this.elt[1] = new TopologyLocation(Location.NONE);
				this.elt[geomIndex].setLocation(onLoc);
			} else if (args.length === 3) {
				let [onLoc, leftLoc, rightLoc] = args;
				this.elt[0] = new TopologyLocation(onLoc, leftLoc, rightLoc);
				this.elt[1] = new TopologyLocation(onLoc, leftLoc, rightLoc);
			} else if (args.length === 4) {
				let [geomIndex, onLoc, leftLoc, rightLoc] = args;
				this.elt[0] = new TopologyLocation(Location.NONE, Location.NONE, Location.NONE);
				this.elt[1] = new TopologyLocation(Location.NONE, Location.NONE, Location.NONE);
				this.elt[geomIndex].setLocations(onLoc, leftLoc, rightLoc);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static toLineLabel(label) {
		var lineLabel = new Label(Location.NONE);
		for (var i = 0; i < 2; i++) {
			lineLabel.setLocation(i, label.getLocation(i));
		}
		return lineLabel;
	}
	getGeometryCount() {
		var count = 0;
		if (!this.elt[0].isNull()) count++;
		if (!this.elt[1].isNull()) count++;
		return count;
	}
	setAllLocations(geomIndex, location) {
		this.elt[geomIndex].setAllLocations(location);
	}
	isNull(geomIndex) {
		return this.elt[geomIndex].isNull();
	}
	setAllLocationsIfNull(...args) {
		if (args.length === 1) {
			let [location] = args;
			this.setAllLocationsIfNull(0, location);
			this.setAllLocationsIfNull(1, location);
		} else if (args.length === 2) {
			let [geomIndex, location] = args;
			this.elt[geomIndex].setAllLocationsIfNull(location);
		}
	}
	isLine(geomIndex) {
		return this.elt[geomIndex].isLine();
	}
	merge(lbl) {
		for (var i = 0; i < 2; i++) {
			if (this.elt[i] === null && lbl.elt[i] !== null) {
				this.elt[i] = new TopologyLocation(lbl.elt[i]);
			} else {
				this.elt[i].merge(lbl.elt[i]);
			}
		}
	}
	flip() {
		this.elt[0].flip();
		this.elt[1].flip();
	}
	getLocation(...args) {
		if (args.length === 1) {
			let [geomIndex] = args;
			return this.elt[geomIndex].get(Position.ON);
		} else if (args.length === 2) {
			let [geomIndex, posIndex] = args;
			return this.elt[geomIndex].get(posIndex);
		}
	}
	toString() {
		var buf = new StringBuffer();
		if (this.elt[0] !== null) {
			buf.append("A:");
			buf.append(this.elt[0].toString());
		}
		if (this.elt[1] !== null) {
			buf.append(" B:");
			buf.append(this.elt[1].toString());
		}
		return buf.toString();
	}
	isArea(...args) {
		if (args.length === 0) {
			let [] = args;
			return this.elt[0].isArea() || this.elt[1].isArea();
		} else if (args.length === 1) {
			let [geomIndex] = args;
			return this.elt[geomIndex].isArea();
		}
	}
	isAnyNull(geomIndex) {
		return this.elt[geomIndex].isAnyNull();
	}
	setLocation(...args) {
		if (args.length === 2) {
			let [geomIndex, location] = args;
			this.elt[geomIndex].setLocation(Position.ON, location);
		} else if (args.length === 3) {
			let [geomIndex, posIndex, location] = args;
			this.elt[geomIndex].setLocation(posIndex, location);
		}
	}
	isEqualOnSide(lbl, side) {
		return this.elt[0].isEqualOnSide(lbl.elt[0], side) && this.elt[1].isEqualOnSide(lbl.elt[1], side);
	}
	allPositionsEqual(geomIndex, loc) {
		return this.elt[geomIndex].allPositionsEqual(loc);
	}
	toLine(geomIndex) {
		if (this.elt[geomIndex].isArea()) this.elt[geomIndex] = new TopologyLocation(this.elt[geomIndex].location[0]);
	}
	getClass() {
		return Label;
	}
}

class ItemVisitor {
	get interfaces_() {
		return [];
	}
	visitItem(item) {}
	getClass() {
		return ItemVisitor;
	}
}

class PointOnGeometryLocator {
	get interfaces_() {
		return [];
	}
	locate(p) {}
	getClass() {
		return PointOnGeometryLocator;
	}
}

class IntervalRTreeNode$1 {
	constructor(...args) {
		this.min = Double.POSITIVE_INFINITY;
		this.max = Double.NEGATIVE_INFINITY;
	}
	get interfaces_() {
		return [];
	}
	static get NodeComparator() {
		return NodeComparator;
	}
	getMin() {
		return this.min;
	}
	intersects(queryMin, queryMax) {
		if (this.min > queryMax || this.max < queryMin) return false;
		return true;
	}
	getMax() {
		return this.max;
	}
	toString() {
		return WKTWriter.toLineString(new Coordinate(this.min, 0), new Coordinate(this.max, 0));
	}
	getClass() {
		return IntervalRTreeNode$1;
	}
}
class NodeComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(o1, o2) {
		var n1 = o1;
		var n2 = o2;
		var mid1 = (n1.min + n1.max) / 2;
		var mid2 = (n2.min + n2.max) / 2;
		if (mid1 < mid2) return -1;
		if (mid1 > mid2) return 1;
		return 0;
	}
	getClass() {
		return NodeComparator;
	}
}

class IntervalRTreeLeafNode extends IntervalRTreeNode$1 {
	constructor(...args) {
		super();
		this.item = null;
		if (args.length === 3) {
			let [min, max, item] = args;
			this.min = min;
			this.max = max;
			this.item = item;
		}
	}
	get interfaces_() {
		return [];
	}
	query(queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) return null;
		visitor.visitItem(this.item);
	}
	getClass() {
		return IntervalRTreeLeafNode;
	}
}

class IntervalRTreeBranchNode extends IntervalRTreeNode$1 {
	constructor(...args) {
		super();
		this.node1 = null;
		this.node2 = null;
		if (args.length === 2) {
			let [n1, n2] = args;
			this.node1 = n1;
			this.node2 = n2;
			this.buildExtent(this.node1, this.node2);
		}
	}
	get interfaces_() {
		return [];
	}
	buildExtent(n1, n2) {
		this.min = Math.min(n1.min, n2.min);
		this.max = Math.max(n1.max, n2.max);
	}
	query(queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) {
			return null;
		}
		if (this.node1 !== null) this.node1.query(queryMin, queryMax, visitor);
		if (this.node2 !== null) this.node2.query(queryMin, queryMax, visitor);
	}
	getClass() {
		return IntervalRTreeBranchNode;
	}
}

class SortedPackedIntervalRTree {
	constructor(...args) {
		this.leaves = new ArrayList();
		this.root = null;
		this.level = 0;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	buildTree() {
		Collections.sort(this.leaves, new IntervalRTreeNode.NodeComparator());
		var src = this.leaves;
		var temp = null;
		var dest = new ArrayList();
		while (true) {
			this.buildLevel(src, dest);
			if (dest.size() === 1) return dest.get(0);
			temp = src;
			src = dest;
			dest = temp;
		}
	}
	insert(min, max, item) {
		if (this.root !== null) throw new IllegalStateException("Index cannot be added to once it has been queried");
		this.leaves.add(new IntervalRTreeLeafNode(min, max, item));
	}
	query(min, max, visitor) {
		this.init();
		this.root.query(min, max, visitor);
	}
	buildRoot() {
		if (this.root !== null) return null;
		this.root = this.buildTree();
	}
	printNode(node) {
		System.out.println(WKTWriter.toLineString(new Coordinate(node.min, this.level), new Coordinate(node.max, this.level)));
	}
	init() {
		if (this.root !== null) return null;
		this.buildRoot();
	}
	buildLevel(src, dest) {
		this.level++;
		dest.clear();
		for (var i = 0; i < src.size(); i += 2) {
			var n1 = src.get(i);
			var n2 = i + 1 < src.size() ? src.get(i) : null;
			if (n2 === null) {
				dest.add(n1);
			} else {
				var node = new IntervalRTreeBranchNode(src.get(i), src.get(i + 1));
				dest.add(node);
			}
		}
	}
	getClass() {
		return SortedPackedIntervalRTree;
	}
}

class LinearComponentExtracter {
	constructor(...args) {
		this.lines = null;
		this.isForcedToLineString = false;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [lines] = args;
				this.lines = lines;
			} else if (args.length === 2) {
				let [lines, isForcedToLineString] = args;
				this.lines = lines;
				this.isForcedToLineString = isForcedToLineString;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [GeometryComponentFilter$1];
	}
	static getGeometry(...args) {
		if (args.length === 1) {
			let [geom] = args;
			return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom));
		} else if (args.length === 2) {
			let [geom, forceToLineString] = args;
			return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom, forceToLineString));
		}
	}
	static getLines(...args) {
		if (args.length === 1) {
			let [geom] = args;
			return LinearComponentExtracter.getLines(geom, false);
		} else if (args.length === 2) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1)) {
				let [geoms, lines] = args;
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var g = i.next();
					LinearComponentExtracter.getLines(g, lines);
				}
				return lines;
			} else if (args[0] instanceof Geometry && typeof args[1] === "boolean") {
				let [geom, forceToLineString] = args;
				var lines = new ArrayList();
				geom.apply(new LinearComponentExtracter(lines, forceToLineString));
				return lines;
			} else if (args[0] instanceof Geometry && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1)) {
				let [geom, lines] = args;
				if (geom instanceof LineString) {
					lines.add(geom);
				} else {
					geom.apply(new LinearComponentExtracter(lines));
				}
				return lines;
			}
		} else if (args.length === 3) {
			if (typeof args[2] === "boolean" && (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1))) {
				let [geoms, lines, forceToLineString] = args;
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var g = i.next();
					LinearComponentExtracter.getLines(g, lines, forceToLineString);
				}
				return lines;
			} else if (typeof args[2] === "boolean" && (args[0] instanceof Geometry && (args[1].interfaces_ && args[1].interfaces_.indexOf(Collection) > -1))) {
				let [geom, lines, forceToLineString] = args;
				geom.apply(new LinearComponentExtracter(lines, forceToLineString));
				return lines;
			}
		}
	}
	filter(geom) {
		if (this.isForcedToLineString && geom instanceof LinearRing) {
			var line = geom.getFactory().createLineString(geom.getCoordinateSequence());
			this.lines.add(line);
			return null;
		}
		if (geom instanceof LineString) this.lines.add(geom);
	}
	setForceToLineString(isForcedToLineString) {
		this.isForcedToLineString = isForcedToLineString;
	}
	getClass() {
		return LinearComponentExtracter;
	}
}

class ArrayListVisitor {
	constructor(...args) {
		this.items = new ArrayList();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [ItemVisitor];
	}
	visitItem(item) {
		this.items.add(item);
	}
	getItems() {
		return this.items;
	}
	getClass() {
		return ArrayListVisitor;
	}
}

class IndexedPointInAreaLocator {
	constructor(...args) {
		this.index = null;
		if (args.length === 1) {
			let [g] = args;
			if (!(g.interfaces_ && g.interfaces_.indexOf(Polygonal) > -1)) throw new IllegalArgumentException$1("Argument must be Polygonal");
			this.index = new IntervalIndexedGeometry(g);
		}
	}
	get interfaces_() {
		return [PointOnGeometryLocator];
	}
	static get SegmentVisitor() {
		return SegmentVisitor;
	}
	static get IntervalIndexedGeometry() {
		return IntervalIndexedGeometry;
	}
	locate(p) {
		var rcc = new RayCrossingCounter(p);
		var visitor = new SegmentVisitor(rcc);
		this.index.query(p.y, p.y, visitor);
		return rcc.getLocation();
	}
	getClass() {
		return IndexedPointInAreaLocator;
	}
}
class SegmentVisitor {
	constructor(...args) {
		this.counter = null;
		if (args.length === 1) {
			let [counter] = args;
			this.counter = counter;
		}
	}
	get interfaces_() {
		return [ItemVisitor];
	}
	visitItem(item) {
		var seg = item;
		this.counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
	}
	getClass() {
		return SegmentVisitor;
	}
}
class IntervalIndexedGeometry {
	constructor(...args) {
		this.index = new SortedPackedIntervalRTree();
		if (args.length === 1) {
			let [geom] = args;
			this.init(geom);
		}
	}
	get interfaces_() {
		return [];
	}
	init(geom) {
		var lines = LinearComponentExtracter.getLines(geom);
		for (var i = lines.iterator(); i.hasNext(); ) {
			var line = i.next();
			var pts = line.getCoordinates();
			this.addLine(pts);
		}
	}
	addLine(pts) {
		for (var i = 1; i < pts.length; i++) {
			var seg = new LineSegment(pts[i - 1], pts[i]);
			var min = Math.min(seg.p0.y, seg.p1.y);
			var max = Math.max(seg.p0.y, seg.p1.y);
			this.index.insert(min, max, seg);
		}
	}
	query(...args) {
		if (args.length === 2) {
			let [min, max] = args;
			var visitor = new ArrayListVisitor();
			this.index.query(min, max, visitor);
			return visitor.getItems();
		} else if (args.length === 3) {
			let [min, max, visitor] = args;
			this.index.query(min, max, visitor);
		}
	}
	getClass() {
		return IntervalIndexedGeometry;
	}
}

class EdgeIntersection {
	constructor(...args) {
		this.coord = null;
		this.segmentIndex = null;
		this.dist = null;
		if (args.length === 3) {
			let [coord, segmentIndex, dist] = args;
			this.coord = new Coordinate(coord);
			this.segmentIndex = segmentIndex;
			this.dist = dist;
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	getSegmentIndex() {
		return this.segmentIndex;
	}
	getCoordinate() {
		return this.coord;
	}
	print(out) {
		out.print(this.coord);
		out.print(" seg # = " + this.segmentIndex);
		out.println(" dist = " + this.dist);
	}
	compareTo(obj) {
		var other = obj;
		return this.compare(other.segmentIndex, other.dist);
	}
	isEndPoint(maxSegmentIndex) {
		if (this.segmentIndex === 0 && this.dist === 0.0) return true;
		if (this.segmentIndex === maxSegmentIndex) return true;
		return false;
	}
	toString() {
		return this.coord + " seg # = " + this.segmentIndex + " dist = " + this.dist;
	}
	getDistance() {
		return this.dist;
	}
	compare(segmentIndex, dist) {
		if (this.segmentIndex < segmentIndex) return -1;
		if (this.segmentIndex > segmentIndex) return 1;
		if (this.dist < dist) return -1;
		if (this.dist > dist) return 1;
		return 0;
	}
	getClass() {
		return EdgeIntersection;
	}
}

class EdgeIntersectionList {
	constructor(...args) {
		this.nodeMap = new TreeMap();
		this.edge = null;
		if (args.length === 1) {
			let [edge] = args;
			this.edge = edge;
		}
	}
	get interfaces_() {
		return [];
	}
	print(out) {
		out.println("Intersections:");
		for (var it = this.iterator(); it.hasNext(); ) {
			var ei = it.next();
			ei.print(out);
		}
	}
	iterator() {
		return this.nodeMap.values().iterator();
	}
	addSplitEdges(edgeList) {
		this.addEndpoints();
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			var newEdge = this.createSplitEdge(eiPrev, ei);
			edgeList.add(newEdge);
			eiPrev = ei;
		}
	}
	addEndpoints() {
		var maxSegIndex = this.edge.pts.length - 1;
		this.add(this.edge.pts[0], 0, 0.0);
		this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
	}
	createSplitEdge(ei0, ei1) {
		var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
		var lastSegStartPt = this.edge.pts[ei1.segmentIndex];
		var useIntPt1 = ei1.dist > 0.0 || !ei1.coord.equals2D(lastSegStartPt);
		if (!useIntPt1) {
			npts--;
		}
		var pts = new Array(npts);
		var ipt = 0;
		pts[ipt++] = new Coordinate(ei0.coord);
		for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
			pts[ipt++] = this.edge.pts[i];
		}
		if (useIntPt1) pts[ipt] = ei1.coord;
		return new Edge(pts, new Label(this.edge.label));
	}
	add(intPt, segmentIndex, dist) {
		var eiNew = new EdgeIntersection(intPt, segmentIndex, dist);
		var ei = this.nodeMap.get(eiNew);
		if (ei !== null) {
			return ei;
		}
		this.nodeMap.put(eiNew, eiNew);
		return eiNew;
	}
	isIntersection(pt) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var ei = it.next();
			if (ei.coord.equals(pt)) return true;
		}
		return false;
	}
	getClass() {
		return EdgeIntersectionList;
	}
}

class MonotoneChainIndexer {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static toIntArray(list) {
		var array = new Array(list.size());
		for (var i = 0; i < array.length; i++) {
			array[i] = list.get(i).intValue();
		}
		return array;
	}
	getChainStartIndices(pts) {
		var start = 0;
		var startIndexList = new ArrayList();
		startIndexList.add(new Integer(start));
		do {
			var last = this.findChainEnd(pts, start);
			startIndexList.add(new Integer(last));
			start = last;
		} while (start < pts.length - 1);
		var startIndex = MonotoneChainIndexer.toIntArray(startIndexList);
		return startIndex;
	}
	findChainEnd(pts, start) {
		var chainQuad = Quadrant.quadrant(pts[start], pts[start + 1]);
		var last = start + 1;
		while (last < pts.length) {
			var quad = Quadrant.quadrant(pts[last - 1], pts[last]);
			if (quad !== chainQuad) break;
			last++;
		}
		return last - 1;
	}
	getClass() {
		return MonotoneChainIndexer;
	}
}

class MonotoneChainEdge {
	constructor(...args) {
		this.e = null;
		this.pts = null;
		this.startIndex = null;
		this.env1 = new Envelope();
		this.env2 = new Envelope();
		if (args.length === 1) {
			let [e] = args;
			this.e = e;
			this.pts = e.getCoordinates();
			var mcb = new MonotoneChainIndexer();
			this.startIndex = mcb.getChainStartIndices(this.pts);
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinates() {
		return this.pts;
	}
	getMaxX(chainIndex) {
		var x1 = this.pts[this.startIndex[chainIndex]].x;
		var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
		return x1 > x2 ? x1 : x2;
	}
	getMinX(chainIndex) {
		var x1 = this.pts[this.startIndex[chainIndex]].x;
		var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
		return x1 < x2 ? x1 : x2;
	}
	computeIntersectsForChain(...args) {
		if (args.length === 4) {
			let [chainIndex0, mce, chainIndex1, si] = args;
			this.computeIntersectsForChain(this.startIndex[chainIndex0], this.startIndex[chainIndex0 + 1], mce, mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1], si);
		} else if (args.length === 6) {
			let [start0, end0, mce, start1, end1, ei] = args;
			var p00 = this.pts[start0];
			var p01 = this.pts[end0];
			var p10 = mce.pts[start1];
			var p11 = mce.pts[end1];
			if (end0 - start0 === 1 && end1 - start1 === 1) {
				ei.addIntersections(this.e, start0, mce.e, start1);
				return null;
			}
			this.env1.init(p00, p01);
			this.env2.init(p10, p11);
			if (!this.env1.intersects(this.env2)) return null;
			var mid0 = Math.trunc((start0 + end0) / 2);
			var mid1 = Math.trunc((start1 + end1) / 2);
			if (start0 < mid0) {
				if (start1 < mid1) this.computeIntersectsForChain(start0, mid0, mce, start1, mid1, ei);
				if (mid1 < end1) this.computeIntersectsForChain(start0, mid0, mce, mid1, end1, ei);
			}
			if (mid0 < end0) {
				if (start1 < mid1) this.computeIntersectsForChain(mid0, end0, mce, start1, mid1, ei);
				if (mid1 < end1) this.computeIntersectsForChain(mid0, end0, mce, mid1, end1, ei);
			}
		}
	}
	getStartIndexes() {
		return this.startIndex;
	}
	computeIntersects(mce, si) {
		for (var i = 0; i < this.startIndex.length - 1; i++) {
			for (var j = 0; j < mce.startIndex.length - 1; j++) {
				this.computeIntersectsForChain(i, mce, j, si);
			}
		}
	}
	getClass() {
		return MonotoneChainEdge;
	}
}

class Depth {
	constructor(...args) {
		this.depth = Array(2).fill().map(() => Array(3));
		if (args.length === 0) {
			let [] = args;
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 3; j++) {
					this.depth[i][j] = Depth.NULL_VALUE;
				}
			}
		}
	}
	get interfaces_() {
		return [];
	}
	static depthAtLocation(location) {
		if (location === Location.EXTERIOR) return 0;
		if (location === Location.INTERIOR) return 1;
		return Depth.NULL_VALUE;
	}
	getDepth(geomIndex, posIndex) {
		return this.depth[geomIndex][posIndex];
	}
	setDepth(geomIndex, posIndex, depthValue) {
		this.depth[geomIndex][posIndex] = depthValue;
	}
	isNull(...args) {
		if (args.length === 0) {
			let [] = args;
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 3; j++) {
					if (this.depth[i][j] !== Depth.NULL_VALUE) return false;
				}
			}
			return true;
		} else if (args.length === 1) {
			let [geomIndex] = args;
			return this.depth[geomIndex][1] === Depth.NULL_VALUE;
		} else if (args.length === 2) {
			let [geomIndex, posIndex] = args;
			return this.depth[geomIndex][posIndex] === Depth.NULL_VALUE;
		}
	}
	normalize() {
		for (var i = 0; i < 2; i++) {
			if (!this.isNull(i)) {
				var minDepth = this.depth[i][1];
				if (this.depth[i][2] < minDepth) minDepth = this.depth[i][2];
				if (minDepth < 0) minDepth = 0;
				for (var j = 1; j < 3; j++) {
					var newValue = 0;
					if (this.depth[i][j] > minDepth) newValue = 1;
					this.depth[i][j] = newValue;
				}
			}
		}
	}
	getDelta(geomIndex) {
		return this.depth[geomIndex][Position.RIGHT] - this.depth[geomIndex][Position.LEFT];
	}
	getLocation(geomIndex, posIndex) {
		if (this.depth[geomIndex][posIndex] <= 0) return Location.EXTERIOR;
		return Location.INTERIOR;
	}
	toString() {
		return "A: " + this.depth[0][1] + "," + this.depth[0][2] + " B: " + this.depth[1][1] + "," + this.depth[1][2];
	}
	add(...args) {
		if (args.length === 1) {
			let [lbl] = args;
			for (var i = 0; i < 2; i++) {
				for (var j = 1; j < 3; j++) {
					var loc = lbl.getLocation(i, j);
					if (loc === Location.EXTERIOR || loc === Location.INTERIOR) {
						if (this.isNull(i, j)) {
							this.depth[i][j] = Depth.depthAtLocation(loc);
						} else this.depth[i][j] += Depth.depthAtLocation(loc);
					}
				}
			}
		} else if (args.length === 3) {
			let [geomIndex, posIndex, location] = args;
			if (location === Location.INTERIOR) this.depth[geomIndex][posIndex]++;
		}
	}
	getClass() {
		return Depth;
	}
}
Depth.NULL_VALUE = -1;

class GraphComponent$1 {
	constructor(...args) {
		this.label = null;
		this._isInResult = false;
		this._isCovered = false;
		this._isCoveredSet = false;
		this._isVisited = false;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [label] = args;
				this.label = label;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	setVisited(isVisited) {
		this._isVisited = isVisited;
	}
	setInResult(isInResult) {
		this._isInResult = isInResult;
	}
	isCovered() {
		return this._isCovered;
	}
	isCoveredSet() {
		return this._isCoveredSet;
	}
	setLabel(label) {
		this.label = label;
	}
	getLabel() {
		return this.label;
	}
	setCovered(isCovered) {
		this._isCovered = isCovered;
		this._isCoveredSet = true;
	}
	updateIM(im) {
		Assert.isTrue(this.label.getGeometryCount() >= 2, "found partial label");
		this.computeIM(im);
	}
	isInResult() {
		return this._isInResult;
	}
	isVisited() {
		return this._isVisited;
	}
	getClass() {
		return GraphComponent$1;
	}
}

class Edge extends GraphComponent$1 {
	constructor(...args) {
		super();
		this.pts = null;
		this.env = null;
		this.eiList = new EdgeIntersectionList(this);
		this.name = null;
		this.mce = null;
		this._isIsolated = true;
		this.depth = new Depth();
		this.depthDelta = 0;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [pts] = args;
					overloaded.call(this, pts, null);
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [pts, label] = args;
					this.pts = pts;
					this.label = label;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static updateIM(...args) {
		if (args.length === 2) {
			let [label, im] = args;
			im.setAtLeastIfValid(label.getLocation(0, Position.ON), label.getLocation(1, Position.ON), 1);
			if (label.isArea()) {
				im.setAtLeastIfValid(label.getLocation(0, Position.LEFT), label.getLocation(1, Position.LEFT), 2);
				im.setAtLeastIfValid(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), 2);
			}
		} else return super.updateIM(...args);
	}
	getDepth() {
		return this.depth;
	}
	getCollapsedEdge() {
		var newPts = new Array(2);
		newPts[0] = this.pts[0];
		newPts[1] = this.pts[1];
		var newe = new Edge(newPts, Label.toLineLabel(this.label));
		return newe;
	}
	isIsolated() {
		return this._isIsolated;
	}
	getCoordinates() {
		return this.pts;
	}
	setIsolated(isIsolated) {
		this._isIsolated = isIsolated;
	}
	setName(name) {
		this.name = name;
	}
	equals(o) {
		if (!(o instanceof Edge)) return false;
		var e = o;
		if (this.pts.length !== e.pts.length) return false;
		var isEqualForward = true;
		var isEqualReverse = true;
		var iRev = this.pts.length;
		for (var i = 0; i < this.pts.length; i++) {
			if (!this.pts[i].equals2D(e.pts[i])) {
				isEqualForward = false;
			}
			if (!this.pts[i].equals2D(e.pts[-- iRev])) {
				isEqualReverse = false;
			}
			if (!isEqualForward && !isEqualReverse) return false;
		}
		return true;
	}
	getCoordinate(...args) {
		if (args.length === 0) {
			let [] = args;
			if (this.pts.length > 0) return this.pts[0];
			return null;
		} else if (args.length === 1) {
			let [i] = args;
			return this.pts[i];
		}
	}
	print(out) {
		out.print("edge " + this.name + ": ");
		out.print("LINESTRING (");
		for (var i = 0; i < this.pts.length; i++) {
			if (i > 0) out.print(",");
			out.print(this.pts[i].x + " " + this.pts[i].y);
		}
		out.print(")  " + this.label + " " + this.depthDelta);
	}
	computeIM(im) {
		Edge.updateIM(this.label, im);
	}
	isCollapsed() {
		if (!this.label.isArea()) return false;
		if (this.pts.length !== 3) return false;
		if (this.pts[0].equals(this.pts[2])) return true;
		return false;
	}
	isClosed() {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	}
	getMaximumSegmentIndex() {
		return this.pts.length - 1;
	}
	getDepthDelta() {
		return this.depthDelta;
	}
	getNumPoints() {
		return this.pts.length;
	}
	printReverse(out) {
		out.print("edge " + this.name + ": ");
		for (var i = this.pts.length - 1; i >= 0; i--) {
			out.print(this.pts[i] + " ");
		}
		out.println("");
	}
	getMonotoneChainEdge() {
		if (this.mce === null) this.mce = new MonotoneChainEdge(this);
		return this.mce;
	}
	getEnvelope() {
		if (this.env === null) {
			this.env = new Envelope();
			for (var i = 0; i < this.pts.length; i++) {
				this.env.expandToInclude(this.pts[i]);
			}
		}
		return this.env;
	}
	addIntersection(li, segmentIndex, geomIndex, intIndex) {
		var intPt = new Coordinate(li.getIntersection(intIndex));
		var normalizedSegmentIndex = segmentIndex;
		var dist = li.getEdgeDistance(geomIndex, intIndex);
		var nextSegIndex = normalizedSegmentIndex + 1;
		if (nextSegIndex < this.pts.length) {
			var nextPt = this.pts[nextSegIndex];
			if (intPt.equals2D(nextPt)) {
				normalizedSegmentIndex = nextSegIndex;
				dist = 0.0;
			}
		}
		var ei = this.eiList.add(intPt, normalizedSegmentIndex, dist);
	}
	toString() {
		var buf = new StringBuffer();
		buf.append("edge " + this.name + ": ");
		buf.append("LINESTRING (");
		for (var i = 0; i < this.pts.length; i++) {
			if (i > 0) buf.append(",");
			buf.append(this.pts[i].x + " " + this.pts[i].y);
		}
		buf.append(")  " + this.label + " " + this.depthDelta);
		return buf.toString();
	}
	isPointwiseEqual(e) {
		if (this.pts.length !== e.pts.length) return false;
		for (var i = 0; i < this.pts.length; i++) {
			if (!this.pts[i].equals2D(e.pts[i])) {
				return false;
			}
		}
		return true;
	}
	setDepthDelta(depthDelta) {
		this.depthDelta = depthDelta;
	}
	getEdgeIntersectionList() {
		return this.eiList;
	}
	addIntersections(li, segmentIndex, geomIndex) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			this.addIntersection(li, segmentIndex, geomIndex, i);
		}
	}
	getClass() {
		return Edge;
	}
}

class Node$1 extends GraphComponent$1 {
	constructor(...args) {
		super();
		this.coord = null;
		this.edges = null;
		if (args.length === 2) {
			let [coord, edges] = args;
			this.coord = coord;
			this.edges = edges;
			this.label = new Label(0, Location.NONE);
		}
	}
	get interfaces_() {
		return [];
	}
	isIncidentEdgeInResult() {
		for (var it = this.getEdges().getEdges().iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getEdge().isInResult()) return true;
		}
		return false;
	}
	isIsolated() {
		return this.label.getGeometryCount() === 1;
	}
	getCoordinate() {
		return this.coord;
	}
	print(out) {
		out.println("node " + this.coord + " lbl: " + this.label);
	}
	computeIM(im) {}
	computeMergedLocation(label2, eltIndex) {
		var loc = Location.NONE;
		loc = this.label.getLocation(eltIndex);
		if (!label2.isNull(eltIndex)) {
			var nLoc = label2.getLocation(eltIndex);
			if (loc !== Location.BOUNDARY) loc = nLoc;
		}
		return loc;
	}
	setLabel(...args) {
		if (args.length === 2) {
			let [argIndex, onLocation] = args;
			if (this.label === null) {
				this.label = new Label(argIndex, onLocation);
			} else this.label.setLocation(argIndex, onLocation);
		} else return super.setLabel(...args);
	}
	getEdges() {
		return this.edges;
	}
	mergeLabel(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Node$1) {
				let [n] = args;
				this.mergeLabel(n.label);
			} else if (args[0] instanceof Label) {
				let [label2] = args;
				for (var i = 0; i < 2; i++) {
					var loc = this.computeMergedLocation(label2, i);
					var thisLoc = this.label.getLocation(i);
					if (thisLoc === Location.NONE) this.label.setLocation(i, loc);
				}
			}
		}
	}
	add(e) {
		this.edges.insert(e);
		e.setNode(this);
	}
	setLabelBoundary(argIndex) {
		if (this.label === null) return null;
		var loc = Location.NONE;
		if (this.label !== null) loc = this.label.getLocation(argIndex);
		var newLoc = null;
		switch (loc) {
			case Location.BOUNDARY:
				newLoc = Location.INTERIOR;
				break;
			case Location.INTERIOR:
				newLoc = Location.BOUNDARY;
				break;
			default:
				newLoc = Location.BOUNDARY;
				break;
		}
		this.label.setLocation(argIndex, newLoc);
	}
	getClass() {
		return Node$1;
	}
}

class NodeMap {
	constructor(...args) {
		this.nodeMap = new TreeMap();
		this.nodeFact = null;
		if (args.length === 1) {
			let [nodeFact] = args;
			this.nodeFact = nodeFact;
		}
	}
	get interfaces_() {
		return [];
	}
	find(coord) {
		return this.nodeMap.get(coord);
	}
	addNode(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Coordinate) {
				let [coord] = args;
				var node = this.nodeMap.get(coord);
				if (node === null) {
					node = this.nodeFact.createNode(coord);
					this.nodeMap.put(coord, node);
				}
				return node;
			} else if (args[0] instanceof Node$1) {
				let [n] = args;
				var node = this.nodeMap.get(n.getCoordinate());
				if (node === null) {
					this.nodeMap.put(n.getCoordinate(), n);
					return n;
				}
				node.mergeLabel(n);
				return node;
			}
		}
	}
	print(out) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var n = it.next();
			n.print(out);
		}
	}
	iterator() {
		return this.nodeMap.values().iterator();
	}
	values() {
		return this.nodeMap.values();
	}
	getBoundaryNodes(geomIndex) {
		var bdyNodes = new ArrayList();
		for (var i = this.iterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getLabel().getLocation(geomIndex) === Location.BOUNDARY) bdyNodes.add(node);
		}
		return bdyNodes;
	}
	add(e) {
		var p = e.getCoordinate();
		var n = this.addNode(p);
		n.add(e);
	}
	getClass() {
		return NodeMap;
	}
}

class EdgeEnd {
	constructor(...args) {
		this.edge = null;
		this.label = null;
		this.node = null;
		this.p0 = null;
		this.p1 = null;
		this.dx = null;
		this.dy = null;
		this.quadrant = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [edge] = args;
				this.edge = edge;
			} else if (args.length === 3) {
				let [edge, p0, p1] = args;
				overloaded.call(this, edge, p0, p1, null);
			} else if (args.length === 4) {
				let [edge, p0, p1, label] = args;
				overloaded.call(this, edge);
				this.init(p0, p1);
				this.label = label;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Comparable];
	}
	compareDirection(e) {
		if (this.dx === e.dx && this.dy === e.dy) return 0;
		if (this.quadrant > e.quadrant) return 1;
		if (this.quadrant < e.quadrant) return -1;
		return CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
	}
	getDy() {
		return this.dy;
	}
	getCoordinate() {
		return this.p0;
	}
	setNode(node) {
		this.node = node;
	}
	print(out) {
		var angle = Math.atan2(this.dy, this.dx);
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + angle + "   " + this.label);
	}
	compareTo(obj) {
		var e = obj;
		return this.compareDirection(e);
	}
	getDirectedCoordinate() {
		return this.p1;
	}
	getDx() {
		return this.dx;
	}
	getLabel() {
		return this.label;
	}
	getEdge() {
		return this.edge;
	}
	getQuadrant() {
		return this.quadrant;
	}
	getNode() {
		return this.node;
	}
	toString() {
		var angle = Math.atan2(this.dy, this.dx);
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		return "  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + angle + "   " + this.label;
	}
	computeLabel(boundaryNodeRule) {}
	init(p0, p1) {
		this.p0 = p0;
		this.p1 = p1;
		this.dx = p1.x - p0.x;
		this.dy = p1.y - p0.y;
		this.quadrant = Quadrant.quadrant(this.dx, this.dy);
		Assert.isTrue(!(this.dx === 0 && this.dy === 0), "EdgeEnd with identical endpoints found");
	}
	getClass() {
		return EdgeEnd;
	}
}

class TopologyException extends RuntimeException {
	constructor(...args) {
		super();
		this.pt = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [msg] = args;
					super(msg);
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [msg, pt] = args;
					super(TopologyException.msgWithCoord(msg, pt));
					this.pt = new Coordinate(pt);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static msgWithCoord(msg, pt) {
		if (pt !== null) return msg + " [ " + pt + " ]";
		return msg;
	}
	getCoordinate() {
		return this.pt;
	}
	getClass() {
		return TopologyException;
	}
}

class DirectedEdge extends EdgeEnd {
	constructor(...args) {
		super();
		this._isForward = null;
		this._isInResult = false;
		this._isVisited = false;
		this.sym = null;
		this.next = null;
		this.nextMin = null;
		this.edgeRing = null;
		this.minEdgeRing = null;
		this.depth = [0, -999, -999];
		if (args.length === 2) {
			let [edge, isForward] = args;
			super(edge);
			this._isForward = isForward;
			if (isForward) {
				this.init(edge.getCoordinate(0), edge.getCoordinate(1));
			} else {
				var n = edge.getNumPoints() - 1;
				this.init(edge.getCoordinate(n), edge.getCoordinate(n - 1));
			}
			this.computeDirectedLabel();
		}
	}
	get interfaces_() {
		return [];
	}
	static depthFactor(currLocation, nextLocation) {
		if (currLocation === Location.EXTERIOR && nextLocation === Location.INTERIOR) return 1; else if (currLocation === Location.INTERIOR && nextLocation === Location.EXTERIOR) return -1;
		return 0;
	}
	getNextMin() {
		return this.nextMin;
	}
	getDepth(position) {
		return this.depth[position];
	}
	setVisited(isVisited) {
		this._isVisited = isVisited;
	}
	computeDirectedLabel() {
		this.label = new Label(this.edge.getLabel());
		if (!this._isForward) this.label.flip();
	}
	getNext() {
		return this.next;
	}
	setDepth(position, depthVal) {
		if (this.depth[position] !== -999) {
			if (this.depth[position] !== depthVal) throw new TopologyException("assigned depths do not match", this.getCoordinate());
		}
		this.depth[position] = depthVal;
	}
	isInteriorAreaEdge() {
		var isInteriorAreaEdge = true;
		for (var i = 0; i < 2; i++) {
			if (!(this.label.isArea(i) && this.label.getLocation(i, Position.LEFT) === Location.INTERIOR && this.label.getLocation(i, Position.RIGHT) === Location.INTERIOR)) {
				isInteriorAreaEdge = false;
			}
		}
		return isInteriorAreaEdge;
	}
	setNextMin(nextMin) {
		this.nextMin = nextMin;
	}
	print(out) {
		super.print(out);
		out.print(" " + this.depth[Position.LEFT] + "/" + this.depth[Position.RIGHT]);
		out.print(" (" + this.getDepthDelta() + ")");
		if (this._isInResult) out.print(" inResult");
	}
	setMinEdgeRing(minEdgeRing) {
		this.minEdgeRing = minEdgeRing;
	}
	isLineEdge() {
		var isLine = this.label.isLine(0) || this.label.isLine(1);
		var isExteriorIfArea0 = !this.label.isArea(0) || this.label.allPositionsEqual(0, Location.EXTERIOR);
		var isExteriorIfArea1 = !this.label.isArea(1) || this.label.allPositionsEqual(1, Location.EXTERIOR);
		return isLine && isExteriorIfArea0 && isExteriorIfArea1;
	}
	setEdgeRing(edgeRing) {
		this.edgeRing = edgeRing;
	}
	getMinEdgeRing() {
		return this.minEdgeRing;
	}
	getDepthDelta() {
		var depthDelta = this.edge.getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		return depthDelta;
	}
	setInResult(isInResult) {
		this._isInResult = isInResult;
	}
	getSym() {
		return this.sym;
	}
	isForward() {
		return this._isForward;
	}
	getEdge() {
		return this.edge;
	}
	printEdge(out) {
		this.print(out);
		out.print(" ");
		if (this._isForward) this.edge.print(out); else this.edge.printReverse(out);
	}
	setSym(de) {
		this.sym = de;
	}
	setVisitedEdge(isVisited) {
		this.setVisited(isVisited);
		this.sym.setVisited(isVisited);
	}
	setEdgeDepths(position, depth) {
		var depthDelta = this.getEdge().getDepthDelta();
		if (!this._isForward) depthDelta = -depthDelta;
		var directionFactor = 1;
		if (position === Position.LEFT) directionFactor = -1;
		var oppositePos = Position.opposite(position);
		var delta = depthDelta * directionFactor;
		var oppositeDepth = depth + delta;
		this.setDepth(position, depth);
		this.setDepth(oppositePos, oppositeDepth);
	}
	getEdgeRing() {
		return this.edgeRing;
	}
	isInResult() {
		return this._isInResult;
	}
	setNext(next) {
		this.next = next;
	}
	isVisited() {
		return this._isVisited;
	}
	getClass() {
		return DirectedEdge;
	}
}

class NodeFactory {
	get interfaces_() {
		return [];
	}
	createNode(coord) {
		return new Node$1(coord, null);
	}
	getClass() {
		return NodeFactory;
	}
}

class PlanarGraph {
	constructor(...args) {
		this.edges = new ArrayList();
		this.nodes = null;
		this.edgeEndList = new ArrayList();
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.nodes = new NodeMap(new NodeFactory());
			} else if (args.length === 1) {
				let [nodeFact] = args;
				this.nodes = new NodeMap(nodeFact);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static linkResultDirectedEdges(nodes) {
		for (var nodeit = nodes.iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().linkResultDirectedEdges();
		}
	}
	printEdges(out) {
		out.println("Edges:");
		for (var i = 0; i < this.edges.size(); i++) {
			out.println("edge " + i + ":");
			var e = this.edges.get(i);
			e.print(out);
			e.eiList.print(out);
		}
	}
	find(coord) {
		return this.nodes.find(coord);
	}
	addNode(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Node$1) {
				let [node] = args;
				return this.nodes.addNode(node);
			} else if (args[0] instanceof Coordinate) {
				let [coord] = args;
				return this.nodes.addNode(coord);
			}
		}
	}
	getNodeIterator() {
		return this.nodes.iterator();
	}
	linkResultDirectedEdges() {
		for (var nodeit = this.nodes.iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().linkResultDirectedEdges();
		}
	}
	debugPrintln(o) {
		System.out.println(o);
	}
	isBoundaryNode(geomIndex, coord) {
		var node = this.nodes.find(coord);
		if (node === null) return false;
		var label = node.getLabel();
		if (label !== null && label.getLocation(geomIndex) === Location.BOUNDARY) return true;
		return false;
	}
	linkAllDirectedEdges() {
		for (var nodeit = this.nodes.iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().linkAllDirectedEdges();
		}
	}
	matchInSameDirection(p0, p1, ep0, ep1) {
		if (!p0.equals(ep0)) return false;
		if (CGAlgorithms.computeOrientation(p0, p1, ep1) === CGAlgorithms.COLLINEAR && Quadrant.quadrant(p0, p1) === Quadrant.quadrant(ep0, ep1)) return true;
		return false;
	}
	getEdgeEnds() {
		return this.edgeEndList;
	}
	debugPrint(o) {
		System.out.print(o);
	}
	getEdgeIterator() {
		return this.edges.iterator();
	}
	findEdgeInSameDirection(p0, p1) {
		for (var i = 0; i < this.edges.size(); i++) {
			var e = this.edges.get(i);
			var eCoord = e.getCoordinates();
			if (this.matchInSameDirection(p0, p1, eCoord[0], eCoord[1])) return e;
			if (this.matchInSameDirection(p0, p1, eCoord[eCoord.length - 1], eCoord[eCoord.length - 2])) return e;
		}
		return null;
	}
	insertEdge(e) {
		this.edges.add(e);
	}
	findEdgeEnd(e) {
		for (var i = this.getEdgeEnds().iterator(); i.hasNext(); ) {
			var ee = i.next();
			if (ee.getEdge() === e) return ee;
		}
		return null;
	}
	addEdges(edgesToAdd) {
		for (var it = edgesToAdd.iterator(); it.hasNext(); ) {
			var e = it.next();
			this.edges.add(e);
			var de1 = new DirectedEdge(e, true);
			var de2 = new DirectedEdge(e, false);
			de1.setSym(de2);
			de2.setSym(de1);
			this.add(de1);
			this.add(de2);
		}
	}
	add(e) {
		this.nodes.add(e);
		this.edgeEndList.add(e);
	}
	getNodes() {
		return this.nodes.values();
	}
	findEdge(p0, p1) {
		for (var i = 0; i < this.edges.size(); i++) {
			var e = this.edges.get(i);
			var eCoord = e.getCoordinates();
			if (p0.equals(eCoord[0]) && p1.equals(eCoord[1])) return e;
		}
		return null;
	}
	getClass() {
		return PlanarGraph;
	}
}

class GeometryGraph extends PlanarGraph {
	constructor(...args) {
		super();
		this.parentGeom = null;
		this.lineEdgeMap = new HashMap();
		this.boundaryNodeRule = null;
		this.useBoundaryDeterminationRule = true;
		this.argIndex = null;
		this.boundaryNodes = null;
		this._hasTooFewPoints = false;
		this.invalidPoint = null;
		this.areaPtLocator = null;
		this.ptLocator = new PointLocator();
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [argIndex, parentGeom] = args;
					overloaded.call(this, argIndex, parentGeom, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE);
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [argIndex, parentGeom, boundaryNodeRule] = args;
					this.argIndex = argIndex;
					this.parentGeom = parentGeom;
					this.boundaryNodeRule = boundaryNodeRule;
					if (parentGeom !== null) {
						this.add(parentGeom);
					}
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static determineBoundary(boundaryNodeRule, boundaryCount) {
		return boundaryNodeRule.isInBoundary(boundaryCount) ? Location.BOUNDARY : Location.INTERIOR;
	}
	insertBoundaryPoint(argIndex, coord) {
		var n = this.nodes.addNode(coord);
		var lbl = n.getLabel();
		var boundaryCount = 1;
		var loc = Location.NONE;
		loc = lbl.getLocation(argIndex, Position.ON);
		if (loc === Location.BOUNDARY) boundaryCount++;
		var newLoc = GeometryGraph.determineBoundary(this.boundaryNodeRule, boundaryCount);
		lbl.setLocation(argIndex, newLoc);
	}
	computeSelfNodes(...args) {
		if (args.length === 2) {
			let [li, computeRingSelfNodes] = args;
			return this.computeSelfNodes(li, computeRingSelfNodes, false);
		} else if (args.length === 3) {
			let [li, computeRingSelfNodes, isDoneIfProperInt] = args;
			var si = new SegmentIntersector(li, true, false);
			si.setIsDoneIfProperInt(isDoneIfProperInt);
			var esi = this.createEdgeSetIntersector();
			var isRings = this.parentGeom instanceof LinearRing || this.parentGeom instanceof Polygon || this.parentGeom instanceof MultiPolygon;
			var computeAllSegments = computeRingSelfNodes || !isRings;
			esi.computeIntersections(this.edges, si, computeAllSegments);
			this.addSelfIntersectionNodes(this.argIndex);
			return si;
		}
	}
	computeSplitEdges(edgelist) {
		for (var i = this.edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			e.eiList.addSplitEdges(edgelist);
		}
	}
	computeEdgeIntersections(g, li, includeProper) {
		var si = new SegmentIntersector(li, includeProper, true);
		si.setBoundaryNodes(this.getBoundaryNodes(), g.getBoundaryNodes());
		var esi = this.createEdgeSetIntersector();
		esi.computeIntersections(this.edges, g.edges, si);
		return si;
	}
	getGeometry() {
		return this.parentGeom;
	}
	getBoundaryNodeRule() {
		return this.boundaryNodeRule;
	}
	hasTooFewPoints() {
		return this._hasTooFewPoints;
	}
	addPoint(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Point) {
				let [p] = args;
				var coord = p.getCoordinate();
				this.insertPoint(this.argIndex, coord, Location.INTERIOR);
			} else if (args[0] instanceof Coordinate) {
				let [pt] = args;
				this.insertPoint(this.argIndex, pt, Location.INTERIOR);
			}
		}
	}
	addPolygon(p) {
		this.addPolygonRing(p.getExteriorRing(), Location.EXTERIOR, Location.INTERIOR);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			this.addPolygonRing(hole, Location.INTERIOR, Location.EXTERIOR);
		}
	}
	addEdge(e) {
		this.insertEdge(e);
		var coord = e.getCoordinates();
		this.insertPoint(this.argIndex, coord[0], Location.BOUNDARY);
		this.insertPoint(this.argIndex, coord[coord.length - 1], Location.BOUNDARY);
	}
	addLineString(line) {
		var coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
		if (coord.length < 2) {
			this._hasTooFewPoints = true;
			this.invalidPoint = coord[0];
			return null;
		}
		var e = new Edge(coord, new Label(this.argIndex, Location.INTERIOR));
		this.lineEdgeMap.put(line, e);
		this.insertEdge(e);
		Assert.isTrue(coord.length >= 2, "found LineString with single point");
		this.insertBoundaryPoint(this.argIndex, coord[0]);
		this.insertBoundaryPoint(this.argIndex, coord[coord.length - 1]);
	}
	getInvalidPoint() {
		return this.invalidPoint;
	}
	getBoundaryPoints() {
		var coll = this.getBoundaryNodes();
		var pts = new Array(coll.size());
		var i = 0;
		for (var it = coll.iterator(); it.hasNext(); ) {
			var node = it.next();
			pts[i++] = node.getCoordinate().copy();
		}
		return pts;
	}
	getBoundaryNodes() {
		if (this.boundaryNodes === null) this.boundaryNodes = this.nodes.getBoundaryNodes(this.argIndex);
		return this.boundaryNodes;
	}
	addSelfIntersectionNode(argIndex, coord, loc) {
		if (this.isBoundaryNode(argIndex, coord)) return null;
		if (loc === Location.BOUNDARY && this.useBoundaryDeterminationRule) this.insertBoundaryPoint(argIndex, coord); else this.insertPoint(argIndex, coord, loc);
	}
	addPolygonRing(lr, cwLeft, cwRight) {
		if (lr.isEmpty()) return null;
		var coord = CoordinateArrays.removeRepeatedPoints(lr.getCoordinates());
		if (coord.length < 4) {
			this._hasTooFewPoints = true;
			this.invalidPoint = coord[0];
			return null;
		}
		var left = cwLeft;
		var right = cwRight;
		if (CGAlgorithms.isCCW(coord)) {
			left = cwRight;
			right = cwLeft;
		}
		var e = new Edge(coord, new Label(this.argIndex, Location.BOUNDARY, left, right));
		this.lineEdgeMap.put(lr, e);
		this.insertEdge(e);
		this.insertPoint(this.argIndex, coord[0], Location.BOUNDARY);
	}
	insertPoint(argIndex, coord, onLocation) {
		var n = this.nodes.addNode(coord);
		var lbl = n.getLabel();
		if (lbl === null) {
			n.label = new Label(argIndex, onLocation);
		} else lbl.setLocation(argIndex, onLocation);
	}
	createEdgeSetIntersector() {
		return new SimpleMCSweepLineIntersector();
	}
	addSelfIntersectionNodes(argIndex) {
		for (var i = this.edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			var eLoc = e.getLabel().getLocation(argIndex);
			for (var eiIt = e.eiList.iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				this.addSelfIntersectionNode(argIndex, ei.coord, eLoc);
			}
		}
	}
	add(...args) {
		if (args.length === 1) {
			let [g] = args;
			if (g.isEmpty()) return null;
			if (g instanceof MultiPolygon) this.useBoundaryDeterminationRule = false;
			if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof LineString) this.addLineString(g); else if (g instanceof Point) this.addPoint(g); else if (g instanceof MultiPoint) this.addCollection(g); else if (g instanceof MultiLineString) this.addCollection(g); else if (g instanceof MultiPolygon) this.addCollection(g); else if (g instanceof GeometryCollection) this.addCollection(g); else throw new UnsupportedOperationException(g.getClass().getName());
		} else return super.add(...args);
	}
	addCollection(gc) {
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = gc.getGeometryN(i);
			this.add(g);
		}
	}
	locate(pt) {
		if ((this.parentGeom.interfaces_ && this.parentGeom.interfaces_.indexOf(Polygonal) > -1) && this.parentGeom.getNumGeometries() > 50) {
			if (this.areaPtLocator === null) {
				this.areaPtLocator = new IndexedPointInAreaLocator(this.parentGeom);
			}
			return this.areaPtLocator.locate(pt);
		}
		return this.ptLocator.locate(pt, this.parentGeom);
	}
	findEdge(...args) {
		if (args.length === 1) {
			let [line] = args;
			return this.lineEdgeMap.get(line);
		} else return super.findEdge(...args);
	}
	getClass() {
		return GeometryGraph;
	}
}

class IsSimpleOp$1 {
	constructor(...args) {
		this.inputGeom = null;
		this.isClosedEndpointsInInterior = true;
		this.nonSimpleLocation = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [geom] = args;
				this.inputGeom = geom;
			} else if (args.length === 2) {
				let [geom, boundaryNodeRule] = args;
				this.inputGeom = geom;
				this.isClosedEndpointsInInterior = !boundaryNodeRule.isInBoundary(2);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get EndpointInfo() {
		return EndpointInfo;
	}
	isSimpleMultiPoint(mp) {
		if (mp.isEmpty()) return true;
		var points = new TreeSet();
		for (var i = 0; i < mp.getNumGeometries(); i++) {
			var pt = mp.getGeometryN(i);
			var p = pt.getCoordinate();
			if (points.contains(p)) {
				this.nonSimpleLocation = p;
				return false;
			}
			points.add(p);
		}
		return true;
	}
	isSimplePolygonal(geom) {
		var rings = LinearComponentExtracter.getLines(geom);
		for (var i = rings.iterator(); i.hasNext(); ) {
			var ring = i.next();
			if (!this.isSimpleLinearGeometry(ring)) return false;
		}
		return true;
	}
	hasClosedEndpointIntersection(graph) {
		var endPoints = new TreeMap();
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var maxSegmentIndex = e.getMaximumSegmentIndex();
			var isClosed = e.isClosed();
			var p0 = e.getCoordinate(0);
			this.addEndpoint(endPoints, p0, isClosed);
			var p1 = e.getCoordinate(e.getNumPoints() - 1);
			this.addEndpoint(endPoints, p1, isClosed);
		}
		for (var i = endPoints.values().iterator(); i.hasNext(); ) {
			var eiInfo = i.next();
			if (eiInfo.isClosed && eiInfo.degree !== 2) {
				this.nonSimpleLocation = eiInfo.getCoordinate();
				return true;
			}
		}
		return false;
	}
	getNonSimpleLocation() {
		return this.nonSimpleLocation;
	}
	isSimpleLinearGeometry(geom) {
		if (geom.isEmpty()) return true;
		var graph = new GeometryGraph(0, geom);
		var li = new RobustLineIntersector();
		var si = graph.computeSelfNodes(li, true);
		if (!si.hasIntersection()) return true;
		if (si.hasProperIntersection()) {
			this.nonSimpleLocation = si.getProperIntersectionPoint();
			return false;
		}
		if (this.hasNonEndpointIntersection(graph)) return false;
		if (this.isClosedEndpointsInInterior) {
			if (this.hasClosedEndpointIntersection(graph)) return false;
		}
		return true;
	}
	hasNonEndpointIntersection(graph) {
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var maxSegmentIndex = e.getMaximumSegmentIndex();
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				if (!ei.isEndPoint(maxSegmentIndex)) {
					this.nonSimpleLocation = ei.getCoordinate();
					return true;
				}
			}
		}
		return false;
	}
	addEndpoint(endPoints, p, isClosed) {
		var eiInfo = endPoints.get(p);
		if (eiInfo === null) {
			eiInfo = new EndpointInfo(p);
			endPoints.put(p, eiInfo);
		}
		eiInfo.addEndpoint(isClosed);
	}
	computeSimple(geom) {
		this.nonSimpleLocation = null;
		if (geom.isEmpty()) return true;
		if (geom instanceof LineString) return this.isSimpleLinearGeometry(geom);
		if (geom instanceof MultiLineString) return this.isSimpleLinearGeometry(geom);
		if (geom instanceof MultiPoint) return this.isSimpleMultiPoint(geom);
		if (geom.interfaces_ && geom.interfaces_.indexOf(Polygonal) > -1) return this.isSimplePolygonal(geom);
		if (geom instanceof GeometryCollection) return this.isSimpleGeometryCollection(geom);
		return true;
	}
	isSimple() {
		this.nonSimpleLocation = null;
		return this.computeSimple(this.inputGeom);
	}
	isSimpleGeometryCollection(geom) {
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var comp = geom.getGeometryN(i);
			if (!this.computeSimple(comp)) return false;
		}
		return true;
	}
	getClass() {
		return IsSimpleOp$1;
	}
}
class EndpointInfo {
	constructor(...args) {
		this.pt = null;
		this.isClosed = null;
		this.degree = null;
		if (args.length === 1) {
			let [pt] = args;
			this.pt = pt;
			this.isClosed = false;
			this.degree = 0;
		}
	}
	get interfaces_() {
		return [];
	}
	addEndpoint(isClosed) {
		this.degree++;
		this.isClosed |= isClosed;
	}
	getCoordinate() {
		return this.pt;
	}
	getClass() {
		return EndpointInfo;
	}
}

class BufferParameters {
	constructor(...args) {
		this.quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
		this.endCapStyle = BufferParameters.CAP_ROUND;
		this.joinStyle = BufferParameters.JOIN_ROUND;
		this.mitreLimit = BufferParameters.DEFAULT_MITRE_LIMIT;
		this._isSingleSided = false;
		this.simplifyFactor = BufferParameters.DEFAULT_SIMPLIFY_FACTOR;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [quadrantSegments] = args;
				this.setQuadrantSegments(quadrantSegments);
			} else if (args.length === 2) {
				let [quadrantSegments, endCapStyle] = args;
				this.setQuadrantSegments(quadrantSegments);
				this.setEndCapStyle(endCapStyle);
			} else if (args.length === 4) {
				let [quadrantSegments, endCapStyle, joinStyle, mitreLimit] = args;
				this.setQuadrantSegments(quadrantSegments);
				this.setEndCapStyle(endCapStyle);
				this.setJoinStyle(joinStyle);
				this.setMitreLimit(mitreLimit);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static bufferDistanceError(quadSegs) {
		var alpha = Math.PI / 2.0 / quadSegs;
		return 1 - Math.cos(alpha / 2.0);
	}
	getEndCapStyle() {
		return this.endCapStyle;
	}
	isSingleSided() {
		return this._isSingleSided;
	}
	setQuadrantSegments(quadSegs) {
		this.quadrantSegments = quadSegs;
		if (this.quadrantSegments === 0) this.joinStyle = BufferParameters.JOIN_BEVEL;
		if (this.quadrantSegments < 0) {
			this.joinStyle = BufferParameters.JOIN_MITRE;
			this.mitreLimit = Math.abs(this.quadrantSegments);
		}
		if (quadSegs <= 0) {
			this.quadrantSegments = 1;
		}
		if (this.joinStyle !== BufferParameters.JOIN_ROUND) {
			this.quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
		}
	}
	getJoinStyle() {
		return this.joinStyle;
	}
	setJoinStyle(joinStyle) {
		this.joinStyle = joinStyle;
	}
	setSimplifyFactor(simplifyFactor) {
		this.simplifyFactor = simplifyFactor < 0 ? 0 : simplifyFactor;
	}
	getSimplifyFactor() {
		return this.simplifyFactor;
	}
	getQuadrantSegments() {
		return this.quadrantSegments;
	}
	setEndCapStyle(endCapStyle) {
		this.endCapStyle = endCapStyle;
	}
	getMitreLimit() {
		return this.mitreLimit;
	}
	setMitreLimit(mitreLimit) {
		this.mitreLimit = mitreLimit;
	}
	setSingleSided(isSingleSided) {
		this._isSingleSided = isSingleSided;
	}
	getClass() {
		return BufferParameters;
	}
}
BufferParameters.CAP_ROUND = 1;
BufferParameters.CAP_FLAT = 2;
BufferParameters.CAP_SQUARE = 3;
BufferParameters.JOIN_ROUND = 1;
BufferParameters.JOIN_MITRE = 2;
BufferParameters.JOIN_BEVEL = 3;
BufferParameters.DEFAULT_QUADRANT_SEGMENTS = 8;
BufferParameters.DEFAULT_MITRE_LIMIT = 5.0;
BufferParameters.DEFAULT_SIMPLIFY_FACTOR = 0.01;

class RightmostEdgeFinder {
	constructor(...args) {
		this.minIndex = -1;
		this.minCoord = null;
		this.minDe = null;
		this.orientedDe = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinate() {
		return this.minCoord;
	}
	getRightmostSide(de, index) {
		var side = this.getRightmostSideOfSegment(de, index);
		if (side < 0) side = this.getRightmostSideOfSegment(de, index - 1);
		if (side < 0) {
			this.minCoord = null;
			this.checkForRightmostCoordinate(de);
		}
		return side;
	}
	findRightmostEdgeAtVertex() {
		var pts = this.minDe.getEdge().getCoordinates();
		Assert.isTrue(this.minIndex > 0 && this.minIndex < pts.length, "rightmost point expected to be interior vertex of edge");
		var pPrev = pts[this.minIndex - 1];
		var pNext = pts[this.minIndex + 1];
		var orientation = CGAlgorithms.computeOrientation(this.minCoord, pNext, pPrev);
		var usePrev = false;
		if (pPrev.y < this.minCoord.y && pNext.y < this.minCoord.y && orientation === CGAlgorithms.COUNTERCLOCKWISE) {
			usePrev = true;
		} else if (pPrev.y > this.minCoord.y && pNext.y > this.minCoord.y && orientation === CGAlgorithms.CLOCKWISE) {
			usePrev = true;
		}
		if (usePrev) {
			this.minIndex = this.minIndex - 1;
		}
	}
	getRightmostSideOfSegment(de, i) {
		var e = de.getEdge();
		var coord = e.getCoordinates();
		if (i < 0 || i + 1 >= coord.length) return -1;
		if (coord[i].y === coord[i + 1].y) return -1;
		var pos = Position.LEFT;
		if (coord[i].y < coord[i + 1].y) pos = Position.RIGHT;
		return pos;
	}
	getEdge() {
		return this.orientedDe;
	}
	checkForRightmostCoordinate(de) {
		var coord = de.getEdge().getCoordinates();
		for (var i = 0; i < coord.length - 1; i++) {
			if (this.minCoord === null || coord[i].x > this.minCoord.x) {
				this.minDe = de;
				this.minIndex = i;
				this.minCoord = coord[i];
			}
		}
	}
	findRightmostEdgeAtNode() {
		var node = this.minDe.getNode();
		var star = node.getEdges();
		this.minDe = star.getRightmostEdge();
		if (!this.minDe.isForward()) {
			this.minDe = this.minDe.getSym();
			this.minIndex = this.minDe.getEdge().getCoordinates().length - 1;
		}
	}
	findEdge(dirEdgeList) {
		for (var i = dirEdgeList.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (!de.isForward()) continue;
			this.checkForRightmostCoordinate(de);
		}
		Assert.isTrue(this.minIndex !== 0 || this.minCoord.equals(this.minDe.getCoordinate()), "inconsistency in rightmost processing");
		if (this.minIndex === 0) {
			this.findRightmostEdgeAtNode();
		} else {
			this.findRightmostEdgeAtVertex();
		}
		this.orientedDe = this.minDe;
		var rightmostSide = this.getRightmostSide(this.minDe, this.minIndex);
		if (rightmostSide === Position.LEFT) {
			this.orientedDe = this.minDe.getSym();
		}
	}
	getClass() {
		return RightmostEdgeFinder;
	}
}

class LinkedList {
  constructor() {
    this.array_ = []
  }
  addLast(e) {
    this.array_.push(e)
  }
  removeFirst() {
    return this.array_.shift()
  }
  isEmpty() {
    return this.array_.length === 0
  }
}

class BufferSubgraph {
	constructor(...args) {
		this.finder = null;
		this.dirEdgeList = new ArrayList();
		this.nodes = new ArrayList();
		this.rightMostCoord = null;
		this.env = null;
		if (args.length === 0) {
			let [] = args;
			this.finder = new RightmostEdgeFinder();
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	clearVisitedEdges() {
		for (var it = this.dirEdgeList.iterator(); it.hasNext(); ) {
			var de = it.next();
			de.setVisited(false);
		}
	}
	getRightmostCoordinate() {
		return this.rightMostCoord;
	}
	computeNodeDepth(n) {
		var startEdge = null;
		for (var i = n.getEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isVisited() || de.getSym().isVisited()) {
				startEdge = de;
				break;
			}
		}
		if (startEdge === null) throw new TopologyException("unable to find edge to compute depths at " + n.getCoordinate());
		n.getEdges().computeDepths(startEdge);
		for (var i = n.getEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			de.setVisited(true);
			this.copySymDepths(de);
		}
	}
	computeDepth(outsideDepth) {
		this.clearVisitedEdges();
		var de = this.finder.getEdge();
		var n = de.getNode();
		var label = de.getLabel();
		de.setEdgeDepths(Position.RIGHT, outsideDepth);
		this.copySymDepths(de);
		this.computeDepths(de);
	}
	create(node) {
		this.addReachable(node);
		this.finder.findEdge(this.dirEdgeList);
		this.rightMostCoord = this.finder.getCoordinate();
	}
	findResultEdges() {
		for (var it = this.dirEdgeList.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getDepth(Position.RIGHT) >= 1 && de.getDepth(Position.LEFT) <= 0 && !de.isInteriorAreaEdge()) {
				de.setInResult(true);
			}
		}
	}
	computeDepths(startEdge) {
		var nodesVisited = new HashSet();
		var nodeQueue = new LinkedList();
		var startNode = startEdge.getNode();
		nodeQueue.addLast(startNode);
		nodesVisited.add(startNode);
		startEdge.setVisited(true);
		while (!nodeQueue.isEmpty()) {
			var n = nodeQueue.removeFirst();
			nodesVisited.add(n);
			this.computeNodeDepth(n);
			for (var i = n.getEdges().iterator(); i.hasNext(); ) {
				var de = i.next();
				var sym = de.getSym();
				if (sym.isVisited()) continue;
				var adjNode = sym.getNode();
				if (!nodesVisited.contains(adjNode)) {
					nodeQueue.addLast(adjNode);
					nodesVisited.add(adjNode);
				}
			}
		}
	}
	compareTo(o) {
		var graph = o;
		if (this.rightMostCoord.x < graph.rightMostCoord.x) {
			return -1;
		}
		if (this.rightMostCoord.x > graph.rightMostCoord.x) {
			return 1;
		}
		return 0;
	}
	getEnvelope() {
		if (this.env === null) {
			var edgeEnv = new Envelope();
			for (var it = this.dirEdgeList.iterator(); it.hasNext(); ) {
				var dirEdge = it.next();
				var pts = dirEdge.getEdge().getCoordinates();
				for (var i = 0; i < pts.length - 1; i++) {
					edgeEnv.expandToInclude(pts[i]);
				}
			}
			this.env = edgeEnv;
		}
		return this.env;
	}
	addReachable(startNode) {
		var nodeStack = new Stack();
		nodeStack.add(startNode);
		while (!nodeStack.empty()) {
			var node = nodeStack.pop();
			this.add(node, nodeStack);
		}
	}
	copySymDepths(de) {
		var sym = de.getSym();
		sym.setDepth(Position.LEFT, de.getDepth(Position.RIGHT));
		sym.setDepth(Position.RIGHT, de.getDepth(Position.LEFT));
	}
	add(node, nodeStack) {
		node.setVisited(true);
		this.nodes.add(node);
		for (var i = node.getEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			this.dirEdgeList.add(de);
			var sym = de.getSym();
			var symNode = sym.getNode();
			if (!symNode.isVisited()) nodeStack.push(symNode);
		}
	}
	getNodes() {
		return this.nodes;
	}
	getDirectedEdges() {
		return this.dirEdgeList;
	}
	getClass() {
		return BufferSubgraph;
	}
}

class EdgeRing$1 {
	constructor(...args) {
		this.startDe = null;
		this.maxNodeDegree = -1;
		this.edges = new ArrayList();
		this.pts = new ArrayList();
		this.label = new Label(Location.NONE);
		this.ring = null;
		this._isHole = null;
		this.shell = null;
		this.holes = new ArrayList();
		this.geometryFactory = null;
		if (args.length === 2) {
			let [start, geometryFactory] = args;
			this.geometryFactory = geometryFactory;
			this.computePoints(start);
			this.computeRing();
		}
	}
	get interfaces_() {
		return [];
	}
	computeRing() {
		if (this.ring !== null) return null;
		var coord = new Array(this.pts.size());
		for (var i = 0; i < this.pts.size(); i++) {
			coord[i] = this.pts.get(i);
		}
		this.ring = this.geometryFactory.createLinearRing(coord);
		this._isHole = CGAlgorithms.isCCW(this.ring.getCoordinates());
	}
	isIsolated() {
		return this.label.getGeometryCount() === 1;
	}
	computePoints(start) {
		this.startDe = start;
		var de = start;
		var isFirstEdge = true;
		do {
			if (de === null) throw new TopologyException("Found null DirectedEdge");
			if (de.getEdgeRing() === this) throw new TopologyException("Directed Edge visited twice during ring-building at " + de.getCoordinate());
			this.edges.add(de);
			var label = de.getLabel();
			Assert.isTrue(label.isArea());
			this.mergeLabel(label);
			this.addPoints(de.getEdge(), de.isForward(), isFirstEdge);
			isFirstEdge = false;
			this.setEdgeRing(de, this);
			de = this.getNext(de);
		} while (de !== this.startDe);
	}
	getLinearRing() {
		return this.ring;
	}
	getCoordinate(i) {
		return this.pts.get(i);
	}
	computeMaxNodeDegree() {
		this.maxNodeDegree = 0;
		var de = this.startDe;
		do {
			var node = de.getNode();
			var degree = node.getEdges().getOutgoingDegree(this);
			if (degree > this.maxNodeDegree) this.maxNodeDegree = degree;
			de = this.getNext(de);
		} while (de !== this.startDe);
		this.maxNodeDegree *= 2;
	}
	addPoints(edge, isForward, isFirstEdge) {
		var edgePts = edge.getCoordinates();
		if (isForward) {
			var startIndex = 1;
			if (isFirstEdge) startIndex = 0;
			for (var i = startIndex; i < edgePts.length; i++) {
				this.pts.add(edgePts[i]);
			}
		} else {
			var startIndex = edgePts.length - 2;
			if (isFirstEdge) startIndex = edgePts.length - 1;
			for (var i = startIndex; i >= 0; i--) {
				this.pts.add(edgePts[i]);
			}
		}
	}
	isHole() {
		return this._isHole;
	}
	setInResult() {
		var de = this.startDe;
		do {
			de.getEdge().setInResult(true);
			de = de.getNext();
		} while (de !== this.startDe);
	}
	containsPoint(p) {
		var shell = this.getLinearRing();
		var env = shell.getEnvelopeInternal();
		if (!env.contains(p)) return false;
		if (!CGAlgorithms.isPointInRing(p, shell.getCoordinates())) return false;
		for (var i = this.holes.iterator(); i.hasNext(); ) {
			var hole = i.next();
			if (hole.containsPoint(p)) return false;
		}
		return true;
	}
	addHole(ring) {
		this.holes.add(ring);
	}
	isShell() {
		return this.shell === null;
	}
	getLabel() {
		return this.label;
	}
	getEdges() {
		return this.edges;
	}
	getMaxNodeDegree() {
		if (this.maxNodeDegree < 0) this.computeMaxNodeDegree();
		return this.maxNodeDegree;
	}
	getShell() {
		return this.shell;
	}
	mergeLabel(...args) {
		if (args.length === 1) {
			let [deLabel] = args;
			this.mergeLabel(deLabel, 0);
			this.mergeLabel(deLabel, 1);
		} else if (args.length === 2) {
			let [deLabel, geomIndex] = args;
			var loc = deLabel.getLocation(geomIndex, Position.RIGHT);
			if (loc === Location.NONE) return null;
			if (this.label.getLocation(geomIndex) === Location.NONE) {
				this.label.setLocation(geomIndex, loc);
				return null;
			}
		}
	}
	setShell(shell) {
		this.shell = shell;
		if (shell !== null) shell.addHole(this);
	}
	toPolygon(geometryFactory) {
		var holeLR = new Array(this.holes.size());
		for (var i = 0; i < this.holes.size(); i++) {
			holeLR[i] = this.holes.get(i).getLinearRing();
		}
		var poly = geometryFactory.createPolygon(this.getLinearRing(), holeLR);
		return poly;
	}
	getClass() {
		return EdgeRing$1;
	}
}

class MinimalEdgeRing extends EdgeRing$1 {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [start, geometryFactory] = args;
			super(start, geometryFactory);
		}
	}
	get interfaces_() {
		return [];
	}
	setEdgeRing(de, er) {
		de.setMinEdgeRing(er);
	}
	getNext(de) {
		return de.getNextMin();
	}
	getClass() {
		return MinimalEdgeRing;
	}
}

class MaximalEdgeRing extends EdgeRing$1 {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [start, geometryFactory] = args;
			super(start, geometryFactory);
		}
	}
	get interfaces_() {
		return [];
	}
	buildMinimalRings() {
		var minEdgeRings = new ArrayList();
		var de = this.startDe;
		do {
			if (de.getMinEdgeRing() === null) {
				var minEr = new MinimalEdgeRing(de, this.geometryFactory);
				minEdgeRings.add(minEr);
			}
			de = de.getNext();
		} while (de !== this.startDe);
		return minEdgeRings;
	}
	setEdgeRing(de, er) {
		de.setEdgeRing(er);
	}
	linkDirectedEdgesForMinimalEdgeRings() {
		var de = this.startDe;
		do {
			var node = de.getNode();
			node.getEdges().linkMinimalDirectedEdges(this);
			de = de.getNext();
		} while (de !== this.startDe);
	}
	getNext(de) {
		return de.getNext();
	}
	getClass() {
		return MaximalEdgeRing;
	}
}

class PolygonBuilder {
	constructor(...args) {
		this.geometryFactory = null;
		this.shellList = new ArrayList();
		if (args.length === 1) {
			let [geometryFactory] = args;
			this.geometryFactory = geometryFactory;
		}
	}
	get interfaces_() {
		return [];
	}
	sortShellsAndHoles(edgeRings, shellList, freeHoleList) {
		for (var it = edgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.isHole()) {
				freeHoleList.add(er);
			} else {
				shellList.add(er);
			}
		}
	}
	computePolygons(shellList) {
		var resultPolyList = new ArrayList();
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var er = it.next();
			var poly = er.toPolygon(this.geometryFactory);
			resultPolyList.add(poly);
		}
		return resultPolyList;
	}
	placeFreeHoles(shellList, freeHoleList) {
		for (var it = freeHoleList.iterator(); it.hasNext(); ) {
			var hole = it.next();
			if (hole.getShell() === null) {
				var shell = this.findEdgeRingContaining(hole, shellList);
				if (shell === null) throw new TopologyException("unable to assign hole to a shell", hole.getCoordinate(0));
				hole.setShell(shell);
			}
		}
	}
	buildMinimalEdgeRings(maxEdgeRings, shellList, freeHoleList) {
		var edgeRings = new ArrayList();
		for (var it = maxEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.getMaxNodeDegree() > 2) {
				er.linkDirectedEdgesForMinimalEdgeRings();
				var minEdgeRings = er.buildMinimalRings();
				var shell = this.findShell(minEdgeRings);
				if (shell !== null) {
					this.placePolygonHoles(shell, minEdgeRings);
					shellList.add(shell);
				} else {
					freeHoleList.addAll(minEdgeRings);
				}
			} else {
				edgeRings.add(er);
			}
		}
		return edgeRings;
	}
	containsPoint(p) {
		for (var it = this.shellList.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.containsPoint(p)) return true;
		}
		return false;
	}
	buildMaximalEdgeRings(dirEdges) {
		var maxEdgeRings = new ArrayList();
		for (var it = dirEdges.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() && de.getLabel().isArea()) {
				if (de.getEdgeRing() === null) {
					var er = new MaximalEdgeRing(de, this.geometryFactory);
					maxEdgeRings.add(er);
					er.setInResult();
				}
			}
		}
		return maxEdgeRings;
	}
	placePolygonHoles(shell, minEdgeRings) {
		for (var it = minEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (er.isHole()) {
				er.setShell(shell);
			}
		}
	}
	getPolygons() {
		var resultPolyList = this.computePolygons(this.shellList);
		return resultPolyList;
	}
	findEdgeRingContaining(testEr, shellList) {
		var testRing = testEr.getLinearRing();
		var testEnv = testRing.getEnvelopeInternal();
		var testPt = testRing.getCoordinateN(0);
		var minShell = null;
		var minEnv = null;
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var tryShell = it.next();
			var tryRing = tryShell.getLinearRing();
			var tryEnv = tryRing.getEnvelopeInternal();
			if (minShell !== null) minEnv = minShell.getLinearRing().getEnvelopeInternal();
			var isContained = false;
			if (tryEnv.contains(testEnv) && CGAlgorithms.isPointInRing(testPt, tryRing.getCoordinates())) isContained = true;
			if (isContained) {
				if (minShell === null || minEnv.contains(tryEnv)) {
					minShell = tryShell;
				}
			}
		}
		return minShell;
	}
	findShell(minEdgeRings) {
		var shellCount = 0;
		var shell = null;
		for (var it = minEdgeRings.iterator(); it.hasNext(); ) {
			var er = it.next();
			if (!er.isHole()) {
				shell = er;
				shellCount++;
			}
		}
		Assert.isTrue(shellCount <= 1, "found two shells in MinimalEdgeRing list");
		return shell;
	}
	add(...args) {
		if (args.length === 1) {
			let [graph] = args;
			this.add(graph.getEdgeEnds(), graph.getNodes());
		} else if (args.length === 2) {
			let [dirEdges, nodes] = args;
			PlanarGraph.linkResultDirectedEdges(nodes);
			var maxEdgeRings = this.buildMaximalEdgeRings(dirEdges);
			var freeHoleList = new ArrayList();
			var edgeRings = this.buildMinimalEdgeRings(maxEdgeRings, this.shellList, freeHoleList);
			this.sortShellsAndHoles(edgeRings, this.shellList, freeHoleList);
			this.placeFreeHoles(this.shellList, freeHoleList);
		}
	}
	getClass() {
		return PolygonBuilder;
	}
}

class Boundable {
	get interfaces_() {
		return [];
	}
	getBounds() {}
	getClass() {
		return Boundable;
	}
}

class ItemBoundable {
	constructor(...args) {
		this.bounds = null;
		this.item = null;
		if (args.length === 2) {
			let [bounds, item] = args;
			this.bounds = bounds;
			this.item = item;
		}
	}
	get interfaces_() {
		return [Boundable, Serializable];
	}
	getItem() {
		return this.item;
	}
	getBounds() {
		return this.bounds;
	}
	getClass() {
		return ItemBoundable;
	}
}

class PriorityQueue {
	constructor(...args) {
		this._size = null;
		this.items = null;
		if (args.length === 0) {
			let [] = args;
			this._size = 0;
			this.items = new ArrayList();
			this.items.add(null);
		}
	}
	get interfaces_() {
		return [];
	}
	poll() {
		if (this.isEmpty()) return null;
		var minItem = this.items.get(1);
		this.items.set(1, this.items.get(this._size));
		this._size -= 1;
		this.reorder(1);
		return minItem;
	}
	size() {
		return this._size;
	}
	reorder(hole) {
		var child = null;
		var tmp = this.items.get(hole);
		for (; hole * 2 <= this._size; hole = child) {
			child = hole * 2;
			if (child !== this._size && this.items.get(child + 1).compareTo(this.items.get(child)) < 0) child++;
			if (this.items.get(child).compareTo(tmp) < 0) this.items.set(hole, this.items.get(child)); else break;
		}
		this.items.set(hole, tmp);
	}
	clear() {
		this._size = 0;
		this.items.clear();
	}
	isEmpty() {
		return this._size === 0;
	}
	add(x) {
		this.items.add(null);
		this._size += 1;
		var hole = this._size;
		this.items.set(0, x);
		for (; x.compareTo(this.items.get(Math.trunc(hole / 2))) < 0; hole /= 2) {
			this.items.set(hole, this.items.get(Math.trunc(hole / 2)));
		}
		this.items.set(hole, x);
	}
	getClass() {
		return PriorityQueue;
	}
}

class SpatialIndex {
	get interfaces_() {
		return [];
	}
	insert(itemEnv, item) {}
	remove(itemEnv, item) {}
	query(...args) {
		if (args.length === 1) {
			let [searchEnv] = args;
		} else if (args.length === 2) {
			let [searchEnv, visitor] = args;
		}
	}
	getClass() {
		return SpatialIndex;
	}
}

class AbstractNode {
	constructor(...args) {
		this.childBoundables = new ArrayList();
		this.bounds = null;
		this.level = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [level] = args;
				this.level = level;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Boundable, Serializable];
	}
	getLevel() {
		return this.level;
	}
	size() {
		return this.childBoundables.size();
	}
	getChildBoundables() {
		return this.childBoundables;
	}
	addChildBoundable(childBoundable) {
		Assert.isTrue(this.bounds === null);
		this.childBoundables.add(childBoundable);
	}
	isEmpty() {
		return this.childBoundables.isEmpty();
	}
	getBounds() {
		if (this.bounds === null) {
			this.bounds = this.computeBounds();
		}
		return this.bounds;
	}
	getClass() {
		return AbstractNode;
	}
}
AbstractNode.serialVersionUID = 6493722185909573708;

class BoundablePair {
	constructor(...args) {
		this.boundable1 = null;
		this.boundable2 = null;
		this._distance = null;
		this.itemDistance = null;
		if (args.length === 3) {
			let [boundable1, boundable2, itemDistance] = args;
			this.boundable1 = boundable1;
			this.boundable2 = boundable2;
			this.itemDistance = itemDistance;
			this._distance = this.distance();
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	static area(b) {
		return b.getBounds().getArea();
	}
	static isComposite(item) {
		return item instanceof AbstractNode;
	}
	expandToQueue(priQ, minDistance) {
		var isComp1 = BoundablePair.isComposite(this.boundable1);
		var isComp2 = BoundablePair.isComposite(this.boundable2);
		if (isComp1 && isComp2) {
			if (BoundablePair.area(this.boundable1) > BoundablePair.area(this.boundable2)) {
				this.expand(this.boundable1, this.boundable2, priQ, minDistance);
				return null;
			} else {
				this.expand(this.boundable2, this.boundable1, priQ, minDistance);
				return null;
			}
		} else if (isComp1) {
			this.expand(this.boundable1, this.boundable2, priQ, minDistance);
			return null;
		} else if (isComp2) {
			this.expand(this.boundable2, this.boundable1, priQ, minDistance);
			return null;
		}
		throw new IllegalArgumentException$1("neither boundable is composite");
	}
	isLeaves() {
		return !(BoundablePair.isComposite(this.boundable1) || BoundablePair.isComposite(this.boundable2));
	}
	compareTo(o) {
		var nd = o;
		if (this._distance < nd._distance) return -1;
		if (this._distance > nd._distance) return 1;
		return 0;
	}
	expand(bndComposite, bndOther, priQ, minDistance) {
		var children = bndComposite.getChildBoundables();
		for (var i = children.iterator(); i.hasNext(); ) {
			var child = i.next();
			var bp = new BoundablePair(child, bndOther, this.itemDistance);
			if (bp.getDistance() < minDistance) {
				priQ.add(bp);
			}
		}
	}
	getBoundable(i) {
		if (i === 0) return this.boundable1;
		return this.boundable2;
	}
	getDistance() {
		return this._distance;
	}
	distance() {
		if (this.isLeaves()) {
			return this.itemDistance.distance(this.boundable1, this.boundable2);
		}
		return this.boundable1.getBounds().distance(this.boundable2.getBounds());
	}
	getClass() {
		return BoundablePair;
	}
}

class AbstractSTRtree {
	constructor(...args) {
		this.root = null;
		this.built = false;
		this.itemBoundables = new ArrayList();
		this.nodeCapacity = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				overloaded.call(this, AbstractSTRtree.DEFAULT_NODE_CAPACITY);
			} else if (args.length === 1) {
				let [nodeCapacity] = args;
				Assert.isTrue(nodeCapacity > 1, "Node capacity must be greater than 1");
				this.nodeCapacity = nodeCapacity;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Serializable];
	}
	static get IntersectsOp() {
		return IntersectsOp$1;
	}
	static get IntersectsOp() {
		return IntersectsOp$1;
	}
	static compareDoubles(a, b) {
		return a > b ? 1 : a < b ? -1 : 0;
	}
	getNodeCapacity() {
		return this.nodeCapacity;
	}
	lastNode(nodes) {
		return nodes.get(nodes.size() - 1);
	}
	size(...args) {
		if (args.length === 0) {
			let [] = args;
			if (this.isEmpty()) {
				return 0;
			}
			this.build();
			return this.size(this.root);
		} else if (args.length === 1) {
			let [node] = args;
			var size = 0;
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (childBoundable instanceof AbstractNode) {
					size += this.size(childBoundable);
				} else if (childBoundable instanceof ItemBoundable) {
					size += 1;
				}
			}
			return size;
		}
	}
	removeItem(node, item) {
		var childToRemove = null;
		for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
			var childBoundable = i.next();
			if (childBoundable instanceof ItemBoundable) {
				if (childBoundable.getItem() === item) childToRemove = childBoundable;
			}
		}
		if (childToRemove !== null) {
			node.getChildBoundables().remove(childToRemove);
			return true;
		}
		return false;
	}
	itemsTree(...args) {
		if (args.length === 0) {
			let [] = args;
			this.build();
			var valuesTree = this.itemsTree(this.root);
			if (valuesTree === null) return new ArrayList();
			return valuesTree;
		} else if (args.length === 1) {
			let [node] = args;
			var valuesTreeForNode = new ArrayList();
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (childBoundable instanceof AbstractNode) {
					var valuesTreeForChild = this.itemsTree(childBoundable);
					if (valuesTreeForChild !== null) valuesTreeForNode.add(valuesTreeForChild);
				} else if (childBoundable instanceof ItemBoundable) {
					valuesTreeForNode.add(childBoundable.getItem());
				} else {
					Assert.shouldNeverReachHere();
				}
			}
			if (valuesTreeForNode.size() <= 0) return null;
			return valuesTreeForNode;
		}
	}
	insert(bounds, item) {
		Assert.isTrue(!this.built, "Cannot insert items into an STR packed R-tree after it has been built.");
		this.itemBoundables.add(new ItemBoundable(bounds, item));
	}
	boundablesAtLevel(...args) {
		if (args.length === 1) {
			let [level] = args;
			var boundables = new ArrayList();
			this.boundablesAtLevel(level, this.root, boundables);
			return boundables;
		} else if (args.length === 3) {
			let [level, top, boundables] = args;
			Assert.isTrue(level > -2);
			if (top.getLevel() === level) {
				boundables.add(top);
				return null;
			}
			for (var i = top.getChildBoundables().iterator(); i.hasNext(); ) {
				var boundable = i.next();
				if (boundable instanceof AbstractNode) {
					this.boundablesAtLevel(level, boundable, boundables);
				} else {
					Assert.isTrue(boundable instanceof ItemBoundable);
					if (level === -1) {
						boundables.add(boundable);
					}
				}
			}
			return null;
		}
	}
	query(...args) {
		if (args.length === 1) {
			let [searchBounds] = args;
			this.build();
			var matches = new ArrayList();
			if (this.isEmpty()) {
				return matches;
			}
			if (this.getIntersectsOp().intersects(this.root.getBounds(), searchBounds)) {
				this.query(searchBounds, this.root, matches);
			}
			return matches;
		} else if (args.length === 2) {
			let [searchBounds, visitor] = args;
			this.build();
			if (this.isEmpty()) {
				return null;
			}
			if (this.getIntersectsOp().intersects(this.root.getBounds(), searchBounds)) {
				this.query(searchBounds, this.root, visitor);
			}
		} else if (args.length === 3) {
			if (args[2].interfaces_ && args[2].interfaces_.indexOf(ItemVisitor) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
				let [searchBounds, node, visitor] = args;
				var childBoundables = node.getChildBoundables();
				for (var i = 0; i < childBoundables.size(); i++) {
					var childBoundable = childBoundables.get(i);
					if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) {
						continue;
					}
					if (childBoundable instanceof AbstractNode) {
						this.query(searchBounds, childBoundable, visitor);
					} else if (childBoundable instanceof ItemBoundable) {
						visitor.visitItem(childBoundable.getItem());
					} else {
						Assert.shouldNeverReachHere();
					}
				}
			} else if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
				let [searchBounds, node, matches] = args;
				var childBoundables = node.getChildBoundables();
				for (var i = 0; i < childBoundables.size(); i++) {
					var childBoundable = childBoundables.get(i);
					if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) {
						continue;
					}
					if (childBoundable instanceof AbstractNode) {
						this.query(searchBounds, childBoundable, matches);
					} else if (childBoundable instanceof ItemBoundable) {
						matches.add(childBoundable.getItem());
					} else {
						Assert.shouldNeverReachHere();
					}
				}
			}
		}
	}
	build() {
		if (this.built) return null;
		this.root = this.itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this.itemBoundables, -1);
		this.itemBoundables = null;
		this.built = true;
	}
	getRoot() {
		this.build();
		return this.root;
	}
	remove(...args) {
		if (args.length === 2) {
			let [searchBounds, item] = args;
			this.build();
			if (this.getIntersectsOp().intersects(this.root.getBounds(), searchBounds)) {
				return this.remove(searchBounds, this.root, item);
			}
			return false;
		} else if (args.length === 3) {
			let [searchBounds, node, item] = args;
			var found = this.removeItem(node, item);
			if (found) return true;
			var childToPrune = null;
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (!this.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds)) {
					continue;
				}
				if (childBoundable instanceof AbstractNode) {
					found = this.remove(searchBounds, childBoundable, item);
					if (found) {
						childToPrune = childBoundable;
						break;
					}
				}
			}
			if (childToPrune !== null) {
				if (childToPrune.getChildBoundables().isEmpty()) {
					node.getChildBoundables().remove(childToPrune);
				}
			}
			return found;
		}
	}
	createHigherLevels(boundablesOfALevel, level) {
		Assert.isTrue(!boundablesOfALevel.isEmpty());
		var parentBoundables = this.createParentBoundables(boundablesOfALevel, level + 1);
		if (parentBoundables.size() === 1) {
			return parentBoundables.get(0);
		}
		return this.createHigherLevels(parentBoundables, level + 1);
	}
	depth(...args) {
		if (args.length === 0) {
			let [] = args;
			if (this.isEmpty()) {
				return 0;
			}
			this.build();
			return this.depth(this.root);
		} else if (args.length === 1) {
			let [node] = args;
			var maxChildDepth = 0;
			for (var i = node.getChildBoundables().iterator(); i.hasNext(); ) {
				var childBoundable = i.next();
				if (childBoundable instanceof AbstractNode) {
					var childDepth = this.depth(childBoundable);
					if (childDepth > maxChildDepth) maxChildDepth = childDepth;
				}
			}
			return maxChildDepth + 1;
		}
	}
	createParentBoundables(childBoundables, newLevel) {
		Assert.isTrue(!childBoundables.isEmpty());
		var parentBoundables = new ArrayList();
		parentBoundables.add(this.createNode(newLevel));
		var sortedChildBoundables = new ArrayList(childBoundables);
		Collections.sort(sortedChildBoundables, this.getComparator());
		for (var i = sortedChildBoundables.iterator(); i.hasNext(); ) {
			var childBoundable = i.next();
			if (this.lastNode(parentBoundables).getChildBoundables().size() === this.getNodeCapacity()) {
				parentBoundables.add(this.createNode(newLevel));
			}
			this.lastNode(parentBoundables).addChildBoundable(childBoundable);
		}
		return parentBoundables;
	}
	isEmpty() {
		if (!this.built) return this.itemBoundables.isEmpty();
		return this.root.isEmpty();
	}
	getClass() {
		return AbstractSTRtree;
	}
}
class IntersectsOp$1 {}
AbstractSTRtree.serialVersionUID = -3886435814360241337;
AbstractSTRtree.DEFAULT_NODE_CAPACITY = 10;

class ItemDistance {
	get interfaces_() {
		return [];
	}
	distance(item1, item2) {}
	getClass() {
		return ItemDistance;
	}
}

class STRtree extends AbstractSTRtree {
	constructor(...args) {
		super();
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
					overloaded.call(this, STRtree.DEFAULT_NODE_CAPACITY);
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [nodeCapacity] = args;
					super(nodeCapacity);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [SpatialIndex, Serializable];
	}
	static get STRtreeNode() {
		return STRtreeNode;
	}
	static centreX(e) {
		return STRtree.avg(e.getMinX(), e.getMaxX());
	}
	static avg(a, b) {
		return (a + b) / 2;
	}
	static centreY(e) {
		return STRtree.avg(e.getMinY(), e.getMaxY());
	}
	createParentBoundablesFromVerticalSlices(verticalSlices, newLevel) {
		Assert.isTrue(verticalSlices.length > 0);
		var parentBoundables = new ArrayList();
		for (var i = 0; i < verticalSlices.length; i++) {
			parentBoundables.addAll(this.createParentBoundablesFromVerticalSlice(verticalSlices[i], newLevel));
		}
		return parentBoundables;
	}
	createNode(level) {
		return new STRtreeNode(level);
	}
	size(...args) {
		if (args.length === 0) {
			let [] = args;
			return super.size();
		} else return super.size(...args);
	}
	insert(...args) {
		if (args.length === 2) {
			let [itemEnv, item] = args;
			if (itemEnv.isNull()) {
				return null;
			}
			super.insert(itemEnv, item);
		} else return super.insert(...args);
	}
	getIntersectsOp() {
		return STRtree.intersectsOp;
	}
	verticalSlices(childBoundables, sliceCount) {
		var sliceCapacity = Math.trunc(Math.ceil(childBoundables.size() / sliceCount));
		var slices = new Array(sliceCount);
		var i = childBoundables.iterator();
		for (var j = 0; j < sliceCount; j++) {
			slices[j] = new ArrayList();
			var boundablesAddedToSlice = 0;
			while (i.hasNext() && boundablesAddedToSlice < sliceCapacity) {
				var childBoundable = i.next();
				slices[j].add(childBoundable);
				boundablesAddedToSlice++;
			}
		}
		return slices;
	}
	query(...args) {
		if (args.length === 1) {
			let [searchEnv] = args;
			return super.query(searchEnv);
		} else if (args.length === 2) {
			let [searchEnv, visitor] = args;
			super.query(searchEnv, visitor);
		} else if (args.length === 3) {
			if (args[2].interfaces_ && args[2].interfaces_.indexOf(ItemVisitor) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
				let [searchBounds, node, visitor] = args;
				super.query(searchBounds, node, visitor);
			} else if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Object && args[1] instanceof AbstractNode)) {
				let [searchBounds, node, matches] = args;
				super.query(searchBounds, node, matches);
			}
		}
	}
	getComparator() {
		return STRtree.yComparator;
	}
	createParentBoundablesFromVerticalSlice(childBoundables, newLevel) {
		return super.createParentBoundables(childBoundables, newLevel);
	}
	remove(...args) {
		if (args.length === 2) {
			let [itemEnv, item] = args;
			return super.remove(itemEnv, item);
		} else return super.remove(...args);
	}
	depth(...args) {
		if (args.length === 0) {
			let [] = args;
			return super.depth();
		} else return super.depth(...args);
	}
	createParentBoundables(childBoundables, newLevel) {
		Assert.isTrue(!childBoundables.isEmpty());
		var minLeafCount = Math.trunc(Math.ceil(childBoundables.size() / this.getNodeCapacity()));
		var sortedChildBoundables = new ArrayList(childBoundables);
		Collections.sort(sortedChildBoundables, STRtree.xComparator);
		var verticalSlices = this.verticalSlices(sortedChildBoundables, Math.trunc(Math.ceil(Math.sqrt(minLeafCount))));
		return this.createParentBoundablesFromVerticalSlices(verticalSlices, newLevel);
	}
	nearestNeighbour(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(ItemDistance) > -1) {
				let [itemDist] = args;
				var bp = new BoundablePair(this.getRoot(), this.getRoot(), itemDist);
				return this.nearestNeighbour(bp);
			} else if (args[0] instanceof BoundablePair) {
				let [initBndPair] = args;
				return this.nearestNeighbour(initBndPair, Double.POSITIVE_INFINITY);
			}
		} else if (args.length === 2) {
			if (args[0] instanceof STRtree && (args[1].interfaces_ && args[1].interfaces_.indexOf(ItemDistance) > -1)) {
				let [tree, itemDist] = args;
				var bp = new BoundablePair(this.getRoot(), tree.getRoot(), itemDist);
				return this.nearestNeighbour(bp);
			} else if (args[0] instanceof BoundablePair && typeof args[1] === "number") {
				let [initBndPair, maxDistance] = args;
				var distanceLowerBound = maxDistance;
				var minPair = null;
				var priQ = new PriorityQueue();
				priQ.add(initBndPair);
				while (!priQ.isEmpty() && distanceLowerBound > 0.0) {
					var bndPair = priQ.poll();
					var currentDistance = bndPair.getDistance();
					if (currentDistance >= distanceLowerBound) break;
					if (bndPair.isLeaves()) {
						distanceLowerBound = currentDistance;
						minPair = bndPair;
					} else {
						bndPair.expandToQueue(priQ, distanceLowerBound);
					}
				}
				return [minPair.getBoundable(0).getItem(), minPair.getBoundable(1).getItem()];
			}
		} else if (args.length === 3) {
			let [env, item, itemDist] = args;
			var bnd = new ItemBoundable(env, item);
			var bp = new BoundablePair(this.getRoot(), bnd, itemDist);
			return this.nearestNeighbour(bp)[0];
		}
	}
	getClass() {
		return STRtree;
	}
}
class STRtreeNode extends AbstractNode {
	constructor(...args) {
		super();
		if (args.length === 1) {
			let [level] = args;
			super(level);
		}
	}
	get interfaces_() {
		return [];
	}
	computeBounds() {
		var bounds = null;
		for (var i = this.getChildBoundables().iterator(); i.hasNext(); ) {
			var childBoundable = i.next();
			if (bounds === null) {
				bounds = new Envelope(childBoundable.getBounds());
			} else {
				bounds.expandToInclude(childBoundable.getBounds());
			}
		}
		return bounds;
	}
	getClass() {
		return STRtreeNode;
	}
}
STRtree.serialVersionUID = 259274702368956900;
STRtree.xComparator = new (class {
	compare(o1, o2) {
		return STRtree.compareDoubles(STRtree.centreX(o1.getBounds()), STRtree.centreX(o2.getBounds()));
	}
	get interfaces_() {
		return [Comparator];
	}
})();
STRtree.yComparator = new (class {
	compare(o1, o2) {
		return STRtree.compareDoubles(STRtree.centreY(o1.getBounds()), STRtree.centreY(o2.getBounds()));
	}
	get interfaces_() {
		return [Comparator];
	}
})();
STRtree.intersectsOp = new (class {
	intersects(aBounds, bBounds) {
		return aBounds.intersects(bBounds);
	}
	get interfaces_() {
		return [IntersectsOp];
	}
})();
STRtree.DEFAULT_NODE_CAPACITY = 10;

class SegmentPointComparator {
	get interfaces_() {
		return [];
	}
	static relativeSign(x0, x1) {
		if (x0 < x1) return -1;
		if (x0 > x1) return 1;
		return 0;
	}
	static compare(octant, p0, p1) {
		if (p0.equals2D(p1)) return 0;
		var xSign = SegmentPointComparator.relativeSign(p0.x, p1.x);
		var ySign = SegmentPointComparator.relativeSign(p0.y, p1.y);
		switch (octant) {
			case 0:
				return SegmentPointComparator.compareValue(xSign, ySign);
			case 1:
				return SegmentPointComparator.compareValue(ySign, xSign);
			case 2:
				return SegmentPointComparator.compareValue(ySign, -xSign);
			case 3:
				return SegmentPointComparator.compareValue(-xSign, ySign);
			case 4:
				return SegmentPointComparator.compareValue(-xSign, -ySign);
			case 5:
				return SegmentPointComparator.compareValue(-ySign, -xSign);
			case 6:
				return SegmentPointComparator.compareValue(-ySign, xSign);
			case 7:
				return SegmentPointComparator.compareValue(xSign, -ySign);
		}
		Assert.shouldNeverReachHere("invalid octant value");
		return 0;
	}
	static compareValue(compareSign0, compareSign1) {
		if (compareSign0 < 0) return -1;
		if (compareSign0 > 0) return 1;
		if (compareSign1 < 0) return -1;
		if (compareSign1 > 0) return 1;
		return 0;
	}
	getClass() {
		return SegmentPointComparator;
	}
}

class SegmentNode {
	constructor(...args) {
		this.segString = null;
		this.coord = null;
		this.segmentIndex = null;
		this.segmentOctant = null;
		this._isInterior = null;
		if (args.length === 4) {
			let [segString, coord, segmentIndex, segmentOctant] = args;
			this.segString = segString;
			this.coord = new Coordinate(coord);
			this.segmentIndex = segmentIndex;
			this.segmentOctant = segmentOctant;
			this._isInterior = !coord.equals2D(segString.getCoordinate(segmentIndex));
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	getCoordinate() {
		return this.coord;
	}
	print(out) {
		out.print(this.coord);
		out.print(" seg # = " + this.segmentIndex);
	}
	compareTo(obj) {
		var other = obj;
		if (this.segmentIndex < other.segmentIndex) return -1;
		if (this.segmentIndex > other.segmentIndex) return 1;
		if (this.coord.equals2D(other.coord)) return 0;
		return SegmentPointComparator.compare(this.segmentOctant, this.coord, other.coord);
	}
	isEndPoint(maxSegmentIndex) {
		if (this.segmentIndex === 0 && !this._isInterior) return true;
		if (this.segmentIndex === maxSegmentIndex) return true;
		return false;
	}
	isInterior() {
		return this._isInterior;
	}
	getClass() {
		return SegmentNode;
	}
}

class SegmentNodeList {
	constructor(...args) {
		this.nodeMap = new TreeMap();
		this.edge = null;
		if (args.length === 1) {
			let [edge] = args;
			this.edge = edge;
		}
	}
	get interfaces_() {
		return [];
	}
	getSplitCoordinates() {
		var coordList = new CoordinateList();
		this.addEndpoints();
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			this.addEdgeCoordinates(eiPrev, ei, coordList);
			eiPrev = ei;
		}
		return coordList.toCoordinateArray();
	}
	addCollapsedNodes() {
		var collapsedVertexIndexes = new ArrayList();
		this.findCollapsesFromInsertedNodes(collapsedVertexIndexes);
		this.findCollapsesFromExistingVertices(collapsedVertexIndexes);
		for (var it = collapsedVertexIndexes.iterator(); it.hasNext(); ) {
			var vertexIndex = it.next().intValue();
			this.add(this.edge.getCoordinate(vertexIndex), vertexIndex);
		}
	}
	print(out) {
		out.println("Intersections:");
		for (var it = this.iterator(); it.hasNext(); ) {
			var ei = it.next();
			ei.print(out);
		}
	}
	findCollapsesFromExistingVertices(collapsedVertexIndexes) {
		for (var i = 0; i < this.edge.size() - 2; i++) {
			var p0 = this.edge.getCoordinate(i);
			var p1 = this.edge.getCoordinate(i + 1);
			var p2 = this.edge.getCoordinate(i + 2);
			if (p0.equals2D(p2)) {
				collapsedVertexIndexes.add(new Integer(i + 1));
			}
		}
	}
	addEdgeCoordinates(ei0, ei1, coordList) {
		var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
		var lastSegStartPt = this.edge.getCoordinate(ei1.segmentIndex);
		var useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
		if (!useIntPt1) {
			npts--;
		}
		var ipt = 0;
		coordList.add(new Coordinate(ei0.coord), false);
		for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
			coordList.add(this.edge.getCoordinate(i));
		}
		if (useIntPt1) {
			coordList.add(new Coordinate(ei1.coord));
		}
	}
	iterator() {
		return this.nodeMap.values().iterator();
	}
	addSplitEdges(edgeList) {
		this.addEndpoints();
		this.addCollapsedNodes();
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			var newEdge = this.createSplitEdge(eiPrev, ei);
			edgeList.add(newEdge);
			eiPrev = ei;
		}
	}
	findCollapseIndex(ei0, ei1, collapsedVertexIndex) {
		if (!ei0.coord.equals2D(ei1.coord)) return false;
		var numVerticesBetween = ei1.segmentIndex - ei0.segmentIndex;
		if (!ei1.isInterior()) {
			numVerticesBetween--;
		}
		if (numVerticesBetween === 1) {
			collapsedVertexIndex[0] = ei0.segmentIndex + 1;
			return true;
		}
		return false;
	}
	findCollapsesFromInsertedNodes(collapsedVertexIndexes) {
		var collapsedVertexIndex = new Array(1);
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			var isCollapsed = this.findCollapseIndex(eiPrev, ei, collapsedVertexIndex);
			if (isCollapsed) collapsedVertexIndexes.add(new Integer(collapsedVertexIndex[0]));
			eiPrev = ei;
		}
	}
	getEdge() {
		return this.edge;
	}
	addEndpoints() {
		var maxSegIndex = this.edge.size() - 1;
		this.add(this.edge.getCoordinate(0), 0);
		this.add(this.edge.getCoordinate(maxSegIndex), maxSegIndex);
	}
	createSplitEdge(ei0, ei1) {
		var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
		var lastSegStartPt = this.edge.getCoordinate(ei1.segmentIndex);
		var useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
		if (!useIntPt1) {
			npts--;
		}
		var pts = new Array(npts);
		var ipt = 0;
		pts[ipt++] = new Coordinate(ei0.coord);
		for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
			pts[ipt++] = this.edge.getCoordinate(i);
		}
		if (useIntPt1) pts[ipt] = new Coordinate(ei1.coord);
		return new NodedSegmentString(pts, this.edge.getData());
	}
	add(intPt, segmentIndex) {
		var eiNew = new SegmentNode(this.edge, intPt, segmentIndex, this.edge.getSegmentOctant(segmentIndex));
		var ei = this.nodeMap.get(eiNew);
		if (ei !== null) {
			Assert.isTrue(ei.coord.equals2D(intPt), "Found equal nodes with different coordinates");
			return ei;
		}
		this.nodeMap.put(eiNew, eiNew);
		return eiNew;
	}
	checkSplitEdgesCorrectness(splitEdges) {
		var edgePts = this.edge.getCoordinates();
		var split0 = splitEdges.get(0);
		var pt0 = split0.getCoordinate(0);
		if (!pt0.equals2D(edgePts[0])) throw new RuntimeException("bad split edge start point at " + pt0);
		var splitn = splitEdges.get(splitEdges.size() - 1);
		var splitnPts = splitn.getCoordinates();
		var ptn = splitnPts[splitnPts.length - 1];
		if (!ptn.equals2D(edgePts[edgePts.length - 1])) throw new RuntimeException("bad split edge end point at " + ptn);
	}
	getClass() {
		return SegmentNodeList;
	}
}

class Octant {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static octant(...args) {
		if (args.length === 2) {
			if (typeof args[0] === "number" && typeof args[1] === "number") {
				let [dx, dy] = args;
				if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException$1("Cannot compute the octant for point ( " + dx + ", " + dy + " )");
				var adx = Math.abs(dx);
				var ady = Math.abs(dy);
				if (dx >= 0) {
					if (dy >= 0) {
						if (adx >= ady) return 0; else return 1;
					} else {
						if (adx >= ady) return 7; else return 6;
					}
				} else {
					if (dy >= 0) {
						if (adx >= ady) return 3; else return 2;
					} else {
						if (adx >= ady) return 4; else return 5;
					}
				}
			} else if (args[0] instanceof Coordinate && args[1] instanceof Coordinate) {
				let [p0, p1] = args;
				var dx = p1.x - p0.x;
				var dy = p1.y - p0.y;
				if (dx === 0.0 && dy === 0.0) throw new IllegalArgumentException$1("Cannot compute the octant for two identical points " + p0);
				return Octant.octant(dx, dy);
			}
		}
	}
	getClass() {
		return Octant;
	}
}

class SegmentString {
	get interfaces_() {
		return [];
	}
	getCoordinates() {}
	size() {}
	getCoordinate(i) {}
	isClosed() {}
	setData(data) {}
	getData() {}
	getClass() {
		return SegmentString;
	}
}

class NodableSegmentString {
	get interfaces_() {
		return [SegmentString];
	}
	addIntersection(intPt, segmentIndex) {}
	getClass() {
		return NodableSegmentString;
	}
}

class NodedSegmentString {
	constructor(...args) {
		this.nodeList = new SegmentNodeList(this);
		this.pts = null;
		this.data = null;
		if (args.length === 2) {
			let [pts, data] = args;
			this.pts = pts;
			this.data = data;
		}
	}
	get interfaces_() {
		return [NodableSegmentString];
	}
	static getNodedSubstrings(...args) {
		if (args.length === 1) {
			let [segStrings] = args;
			var resultEdgelist = new ArrayList();
			NodedSegmentString.getNodedSubstrings(segStrings, resultEdgelist);
			return resultEdgelist;
		} else if (args.length === 2) {
			let [segStrings, resultEdgelist] = args;
			for (var i = segStrings.iterator(); i.hasNext(); ) {
				var ss = i.next();
				ss.getNodeList().addSplitEdges(resultEdgelist);
			}
		}
	}
	getCoordinates() {
		return this.pts;
	}
	size() {
		return this.pts.length;
	}
	getCoordinate(i) {
		return this.pts[i];
	}
	isClosed() {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	}
	getSegmentOctant(index) {
		if (index === this.pts.length - 1) return -1;
		return this.safeOctant(this.getCoordinate(index), this.getCoordinate(index + 1));
	}
	setData(data) {
		this.data = data;
	}
	safeOctant(p0, p1) {
		if (p0.equals2D(p1)) return 0;
		return Octant.octant(p0, p1);
	}
	getData() {
		return this.data;
	}
	addIntersection(...args) {
		if (args.length === 2) {
			let [intPt, segmentIndex] = args;
			this.addIntersectionNode(intPt, segmentIndex);
		} else if (args.length === 4) {
			let [li, segmentIndex, geomIndex, intIndex] = args;
			var intPt = new Coordinate(li.getIntersection(intIndex));
			this.addIntersection(intPt, segmentIndex);
		}
	}
	toString() {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.pts));
	}
	getNodeList() {
		return this.nodeList;
	}
	addIntersectionNode(intPt, segmentIndex) {
		var normalizedSegmentIndex = segmentIndex;
		var nextSegIndex = normalizedSegmentIndex + 1;
		if (nextSegIndex < this.pts.length) {
			var nextPt = this.pts[nextSegIndex];
			if (intPt.equals2D(nextPt)) {
				normalizedSegmentIndex = nextSegIndex;
			}
		}
		var ei = this.nodeList.add(intPt, normalizedSegmentIndex);
		return ei;
	}
	addIntersections(li, segmentIndex, geomIndex) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			this.addIntersection(li, segmentIndex, geomIndex, i);
		}
	}
	getClass() {
		return NodedSegmentString;
	}
}

class MonotoneChainOverlapAction {
	constructor(...args) {
		this.tempEnv1 = new Envelope();
		this.tempEnv2 = new Envelope();
		this.overlapSeg1 = new LineSegment();
		this.overlapSeg2 = new LineSegment();
	}
	get interfaces_() {
		return [];
	}
	overlap(...args) {
		if (args.length === 2) {
			let [seg1, seg2] = args;
		} else if (args.length === 4) {
			let [mc1, start1, mc2, start2] = args;
			mc1.getLineSegment(start1, this.overlapSeg1);
			mc2.getLineSegment(start2, this.overlapSeg2);
			this.overlap(this.overlapSeg1, this.overlapSeg2);
		}
	}
	getClass() {
		return MonotoneChainOverlapAction;
	}
}

class MonotoneChain$1 {
	constructor(...args) {
		this.pts = null;
		this.start = null;
		this.end = null;
		this.env = null;
		this.context = null;
		this.id = null;
		if (args.length === 4) {
			let [pts, start, end, context] = args;
			this.pts = pts;
			this.start = start;
			this.end = end;
			this.context = context;
		}
	}
	get interfaces_() {
		return [];
	}
	getLineSegment(index, ls) {
		ls.p0 = this.pts[index];
		ls.p1 = this.pts[index + 1];
	}
	computeSelect(searchEnv, start0, end0, mcs) {
		var p0 = this.pts[start0];
		var p1 = this.pts[end0];
		mcs.tempEnv1.init(p0, p1);
		if (end0 - start0 === 1) {
			mcs.select(this, start0);
			return null;
		}
		if (!searchEnv.intersects(mcs.tempEnv1)) return null;
		var mid = Math.trunc((start0 + end0) / 2);
		if (start0 < mid) {
			this.computeSelect(searchEnv, start0, mid, mcs);
		}
		if (mid < end0) {
			this.computeSelect(searchEnv, mid, end0, mcs);
		}
	}
	getCoordinates() {
		var coord = new Array(this.end - this.start + 1);
		var index = 0;
		for (var i = this.start; i <= this.end; i++) {
			coord[index++] = this.pts[i];
		}
		return coord;
	}
	computeOverlaps(mc, mco) {
		this.computeOverlapsInternal(this.start, this.end, mc, mc.start, mc.end, mco);
	}
	setId(id) {
		this.id = id;
	}
	select(searchEnv, mcs) {
		this.computeSelect(searchEnv, this.start, this.end, mcs);
	}
	getEnvelope() {
		if (this.env === null) {
			var p0 = this.pts[this.start];
			var p1 = this.pts[this.end];
			this.env = new Envelope(p0, p1);
		}
		return this.env;
	}
	getEndIndex() {
		return this.end;
	}
	getStartIndex() {
		return this.start;
	}
	getContext() {
		return this.context;
	}
	getId() {
		return this.id;
	}
	computeOverlapsInternal(start0, end0, mc, start1, end1, mco) {
		var p00 = this.pts[start0];
		var p01 = this.pts[end0];
		var p10 = mc.pts[start1];
		var p11 = mc.pts[end1];
		if (end0 - start0 === 1 && end1 - start1 === 1) {
			mco.overlap(this, start0, mc, start1);
			return null;
		}
		mco.tempEnv1.init(p00, p01);
		mco.tempEnv2.init(p10, p11);
		if (!mco.tempEnv1.intersects(mco.tempEnv2)) return null;
		var mid0 = Math.trunc((start0 + end0) / 2);
		var mid1 = Math.trunc((start1 + end1) / 2);
		if (start0 < mid0) {
			if (start1 < mid1) this.computeOverlapsInternal(start0, mid0, mc, start1, mid1, mco);
			if (mid1 < end1) this.computeOverlapsInternal(start0, mid0, mc, mid1, end1, mco);
		}
		if (mid0 < end0) {
			if (start1 < mid1) this.computeOverlapsInternal(mid0, end0, mc, start1, mid1, mco);
			if (mid1 < end1) this.computeOverlapsInternal(mid0, end0, mc, mid1, end1, mco);
		}
	}
	getClass() {
		return MonotoneChain$1;
	}
}

class MonotoneChainBuilder {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static getChainStartIndices(pts) {
		var start = 0;
		var startIndexList = new ArrayList();
		startIndexList.add(new Integer(start));
		do {
			var last = MonotoneChainBuilder.findChainEnd(pts, start);
			startIndexList.add(new Integer(last));
			start = last;
		} while (start < pts.length - 1);
		var startIndex = MonotoneChainBuilder.toIntArray(startIndexList);
		return startIndex;
	}
	static findChainEnd(pts, start) {
		var safeStart = start;
		while (safeStart < pts.length - 1 && pts[safeStart].equals2D(pts[safeStart + 1])) {
			safeStart++;
		}
		if (safeStart >= pts.length - 1) {
			return pts.length - 1;
		}
		var chainQuad = Quadrant.quadrant(pts[safeStart], pts[safeStart + 1]);
		var last = start + 1;
		while (last < pts.length) {
			if (!pts[last - 1].equals2D(pts[last])) {
				var quad = Quadrant.quadrant(pts[last - 1], pts[last]);
				if (quad !== chainQuad) break;
			}
			last++;
		}
		return last - 1;
	}
	static getChains(...args) {
		if (args.length === 1) {
			let [pts] = args;
			return MonotoneChainBuilder.getChains(pts, null);
		} else if (args.length === 2) {
			let [pts, context] = args;
			var mcList = new ArrayList();
			var startIndex = MonotoneChainBuilder.getChainStartIndices(pts);
			for (var i = 0; i < startIndex.length - 1; i++) {
				var mc = new MonotoneChain$1(pts, startIndex[i], startIndex[i + 1], context);
				mcList.add(mc);
			}
			return mcList;
		}
	}
	static toIntArray(list) {
		var array = new Array(list.size());
		for (var i = 0; i < array.length; i++) {
			array[i] = list.get(i).intValue();
		}
		return array;
	}
	getClass() {
		return MonotoneChainBuilder;
	}
}

class Noder {
	get interfaces_() {
		return [];
	}
	computeNodes(segStrings) {}
	getNodedSubstrings() {}
	getClass() {
		return Noder;
	}
}

class SinglePassNoder {
	constructor(...args) {
		this.segInt = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
			} else if (args.length === 1) {
				let [segInt] = args;
				this.setSegmentIntersector(segInt);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Noder];
	}
	setSegmentIntersector(segInt) {
		this.segInt = segInt;
	}
	getClass() {
		return SinglePassNoder;
	}
}

class MCIndexNoder extends SinglePassNoder {
	constructor(...args) {
		super();
		this.monoChains = new ArrayList();
		this.index = new STRtree();
		this.idCounter = 0;
		this.nodedSegStrings = null;
		this.nOverlaps = 0;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [si] = args;
					super(si);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get SegmentOverlapAction() {
		return SegmentOverlapAction;
	}
	getMonotoneChains() {
		return this.monoChains;
	}
	getNodedSubstrings() {
		return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);
	}
	getIndex() {
		return this.index;
	}
	add(segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			mc.setId(this.idCounter++);
			this.index.insert(mc.getEnvelope(), mc);
			this.monoChains.add(mc);
		}
	}
	computeNodes(inputSegStrings) {
		this.nodedSegStrings = inputSegStrings;
		for (var i = inputSegStrings.iterator(); i.hasNext(); ) {
			this.add(i.next());
		}
		this.intersectChains();
	}
	intersectChains() {
		var overlapAction = new SegmentOverlapAction(this.segInt);
		for (var i = this.monoChains.iterator(); i.hasNext(); ) {
			var queryChain = i.next();
			var overlapChains = this.index.query(queryChain.getEnvelope());
			for (var j = overlapChains.iterator(); j.hasNext(); ) {
				var testChain = j.next();
				if (testChain.getId() > queryChain.getId()) {
					queryChain.computeOverlaps(testChain, overlapAction);
					this.nOverlaps++;
				}
				if (this.segInt.isDone()) return null;
			}
		}
	}
	getClass() {
		return MCIndexNoder;
	}
}
class SegmentOverlapAction extends MonotoneChainOverlapAction {
	constructor(...args) {
		super();
		this.si = null;
		if (args.length === 1) {
			let [si] = args;
			this.si = si;
		}
	}
	get interfaces_() {
		return [];
	}
	overlap(...args) {
		if (args.length === 4) {
			let [mc1, start1, mc2, start2] = args;
			var ss1 = mc1.getContext();
			var ss2 = mc2.getContext();
			this.si.processIntersections(ss1, start1, ss2, start2);
		} else return super.overlap(...args);
	}
	getClass() {
		return SegmentOverlapAction;
	}
}

class BufferInputLineSimplifier {
	constructor(...args) {
		this.inputLine = null;
		this.distanceTol = null;
		this.isDeleted = null;
		this.angleOrientation = CGAlgorithms.COUNTERCLOCKWISE;
		if (args.length === 1) {
			let [inputLine] = args;
			this.inputLine = inputLine;
		}
	}
	get interfaces_() {
		return [];
	}
	static simplify(inputLine, distanceTol) {
		var simp = new BufferInputLineSimplifier(inputLine);
		return simp.simplify(distanceTol);
	}
	isDeletable(i0, i1, i2, distanceTol) {
		var p0 = this.inputLine[i0];
		var p1 = this.inputLine[i1];
		var p2 = this.inputLine[i2];
		if (!this.isConcave(p0, p1, p2)) return false;
		if (!this.isShallow(p0, p1, p2, distanceTol)) return false;
		return this.isShallowSampled(p0, p1, i0, i2, distanceTol);
	}
	deleteShallowConcavities() {
		var index = 1;
		var maxIndex = this.inputLine.length - 1;
		var midIndex = this.findNextNonDeletedIndex(index);
		var lastIndex = this.findNextNonDeletedIndex(midIndex);
		var isChanged = false;
		while (lastIndex < this.inputLine.length) {
			var isMiddleVertexDeleted = false;
			if (this.isDeletable(index, midIndex, lastIndex, this.distanceTol)) {
				this.isDeleted[midIndex] = BufferInputLineSimplifier.DELETE;
				isMiddleVertexDeleted = true;
				isChanged = true;
			}
			if (isMiddleVertexDeleted) index = lastIndex; else index = midIndex;
			midIndex = this.findNextNonDeletedIndex(index);
			lastIndex = this.findNextNonDeletedIndex(midIndex);
		}
		return isChanged;
	}
	isShallowConcavity(p0, p1, p2, distanceTol) {
		var orientation = CGAlgorithms.computeOrientation(p0, p1, p2);
		var isAngleToSimplify = orientation === this.angleOrientation;
		if (!isAngleToSimplify) return false;
		var dist = CGAlgorithms.distancePointLine(p1, p0, p2);
		return dist < distanceTol;
	}
	isShallowSampled(p0, p2, i0, i2, distanceTol) {
		var inc = Math.trunc((i2 - i0) / BufferInputLineSimplifier.NUM_PTS_TO_CHECK);
		if (inc <= 0) inc = 1;
		for (var i = i0; i < i2; i += inc) {
			if (!this.isShallow(p0, p2, this.inputLine[i], distanceTol)) return false;
		}
		return true;
	}
	isConcave(p0, p1, p2) {
		var orientation = CGAlgorithms.computeOrientation(p0, p1, p2);
		var isConcave = orientation === this.angleOrientation;
		return isConcave;
	}
	simplify(distanceTol) {
		this.distanceTol = Math.abs(distanceTol);
		if (distanceTol < 0) this.angleOrientation = CGAlgorithms.CLOCKWISE;
		this.isDeleted = new Array(this.inputLine.length);
		var isChanged = false;
		do {
			isChanged = this.deleteShallowConcavities();
		} while (isChanged);
		return this.collapseLine();
	}
	findNextNonDeletedIndex(index) {
		var next = index + 1;
		while (next < this.inputLine.length && this.isDeleted[next] === BufferInputLineSimplifier.DELETE) next++;
		return next;
	}
	isShallow(p0, p1, p2, distanceTol) {
		var dist = CGAlgorithms.distancePointLine(p1, p0, p2);
		return dist < distanceTol;
	}
	collapseLine() {
		var coordList = new CoordinateList();
		for (var i = 0; i < this.inputLine.length; i++) {
			if (this.isDeleted[i] !== BufferInputLineSimplifier.DELETE) coordList.add(this.inputLine[i]);
		}
		return coordList.toCoordinateArray();
	}
	getClass() {
		return BufferInputLineSimplifier;
	}
}
BufferInputLineSimplifier.INIT = 0;
BufferInputLineSimplifier.DELETE = 1;
BufferInputLineSimplifier.KEEP = 1;
BufferInputLineSimplifier.NUM_PTS_TO_CHECK = 10;

class OffsetSegmentString {
	constructor(...args) {
		this.ptList = null;
		this.precisionModel = null;
		this.minimimVertexDistance = 0.0;
		if (args.length === 0) {
			let [] = args;
			this.ptList = new ArrayList();
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinates() {
		var coord = this.ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);
		return coord;
	}
	setPrecisionModel(precisionModel) {
		this.precisionModel = precisionModel;
	}
	addPt(pt) {
		var bufPt = new Coordinate(pt);
		this.precisionModel.makePrecise(bufPt);
		if (this.isRedundant(bufPt)) return null;
		this.ptList.add(bufPt);
	}
	reverse() {}
	addPts(pt, isForward) {
		if (isForward) {
			for (var i = 0; i < pt.length; i++) {
				this.addPt(pt[i]);
			}
		} else {
			for (var i = pt.length - 1; i >= 0; i--) {
				this.addPt(pt[i]);
			}
		}
	}
	isRedundant(pt) {
		if (this.ptList.size() < 1) return false;
		var lastPt = this.ptList.get(this.ptList.size() - 1);
		var ptDist = pt.distance(lastPt);
		if (ptDist < this.minimimVertexDistance) return true;
		return false;
	}
	toString() {
		var fact = new GeometryFactory();
		var line = fact.createLineString(this.getCoordinates());
		return line.toString();
	}
	closeRing() {
		if (this.ptList.size() < 1) return null;
		var startPt = new Coordinate(this.ptList.get(0));
		var lastPt = this.ptList.get(this.ptList.size() - 1);
		var last2Pt = null;
		if (this.ptList.size() >= 2) last2Pt = this.ptList.get(this.ptList.size() - 2);
		if (startPt.equals(lastPt)) return null;
		this.ptList.add(startPt);
	}
	setMinimumVertexDistance(minimimVertexDistance) {
		this.minimimVertexDistance = minimimVertexDistance;
	}
	getClass() {
		return OffsetSegmentString;
	}
}
OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0);

class Angle$1 {
	get interfaces_() {
		return [];
	}
	static toDegrees(radians) {
		return radians * 180 / Math.PI;
	}
	static normalize(angle) {
		while (angle > Math.PI) angle -= Angle$1.PI_TIMES_2;
		while (angle <= -Math.PI) angle += Angle$1.PI_TIMES_2;
		return angle;
	}
	static angle(...args) {
		if (args.length === 1) {
			let [p] = args;
			return Math.atan2(p.y, p.x);
		} else if (args.length === 2) {
			let [p0, p1] = args;
			var dx = p1.x - p0.x;
			var dy = p1.y - p0.y;
			return Math.atan2(dy, dx);
		}
	}
	static isAcute(p0, p1, p2) {
		var dx0 = p0.x - p1.x;
		var dy0 = p0.y - p1.y;
		var dx1 = p2.x - p1.x;
		var dy1 = p2.y - p1.y;
		var dotprod = dx0 * dx1 + dy0 * dy1;
		return dotprod > 0;
	}
	static isObtuse(p0, p1, p2) {
		var dx0 = p0.x - p1.x;
		var dy0 = p0.y - p1.y;
		var dx1 = p2.x - p1.x;
		var dy1 = p2.y - p1.y;
		var dotprod = dx0 * dx1 + dy0 * dy1;
		return dotprod < 0;
	}
	static interiorAngle(p0, p1, p2) {
		var anglePrev = Angle$1.angle(p1, p0);
		var angleNext = Angle$1.angle(p1, p2);
		return Math.abs(angleNext - anglePrev);
	}
	static normalizePositive(angle) {
		if (angle < 0.0) {
			while (angle < 0.0) angle += Angle$1.PI_TIMES_2;
			if (angle >= Angle$1.PI_TIMES_2) angle = 0.0;
		} else {
			while (angle >= Angle$1.PI_TIMES_2) angle -= Angle$1.PI_TIMES_2;
			if (angle < 0.0) angle = 0.0;
		}
		return angle;
	}
	static angleBetween(tip1, tail, tip2) {
		var a1 = Angle$1.angle(tail, tip1);
		var a2 = Angle$1.angle(tail, tip2);
		return Angle$1.diff(a1, a2);
	}
	static diff(ang1, ang2) {
		var delAngle = null;
		if (ang1 < ang2) {
			delAngle = ang2 - ang1;
		} else {
			delAngle = ang1 - ang2;
		}
		if (delAngle > Math.PI) {
			delAngle = 2 * Math.PI - delAngle;
		}
		return delAngle;
	}
	static toRadians(angleDegrees) {
		return angleDegrees * Math.PI / 180.0;
	}
	static getTurn(ang1, ang2) {
		var crossproduct = Math.sin(ang2 - ang1);
		if (crossproduct > 0) {
			return Angle$1.COUNTERCLOCKWISE;
		}
		if (crossproduct < 0) {
			return Angle$1.CLOCKWISE;
		}
		return Angle$1.NONE;
	}
	static angleBetweenOriented(tip1, tail, tip2) {
		var a1 = Angle$1.angle(tail, tip1);
		var a2 = Angle$1.angle(tail, tip2);
		var angDel = a2 - a1;
		if (angDel <= -Math.PI) return angDel + Angle$1.PI_TIMES_2;
		if (angDel > Math.PI) return angDel - Angle$1.PI_TIMES_2;
		return angDel;
	}
	getClass() {
		return Angle$1;
	}
}
Angle$1.PI_TIMES_2 = 2.0 * Math.PI;
Angle$1.PI_OVER_2 = Math.PI / 2.0;
Angle$1.PI_OVER_4 = Math.PI / 4.0;
Angle$1.COUNTERCLOCKWISE = CGAlgorithms.COUNTERCLOCKWISE;
Angle$1.CLOCKWISE = CGAlgorithms.CLOCKWISE;
Angle$1.NONE = CGAlgorithms.COLLINEAR;

class OffsetSegmentGenerator {
	constructor(...args) {
		this.maxCurveSegmentError = 0.0;
		this.filletAngleQuantum = null;
		this.closingSegLengthFactor = 1;
		this.segList = null;
		this.distance = 0.0;
		this.precisionModel = null;
		this.bufParams = null;
		this.li = null;
		this.s0 = null;
		this.s1 = null;
		this.s2 = null;
		this.seg0 = new LineSegment();
		this.seg1 = new LineSegment();
		this.offset0 = new LineSegment();
		this.offset1 = new LineSegment();
		this.side = 0;
		this._hasNarrowConcaveAngle = false;
		if (args.length === 3) {
			let [precisionModel, bufParams, distance] = args;
			this.precisionModel = precisionModel;
			this.bufParams = bufParams;
			this.li = new RobustLineIntersector();
			this.filletAngleQuantum = Math.PI / 2.0 / bufParams.getQuadrantSegments();
			if (bufParams.getQuadrantSegments() >= 8 && bufParams.getJoinStyle() === BufferParameters.JOIN_ROUND) this.closingSegLengthFactor = OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR;
			this.init(distance);
		}
	}
	get interfaces_() {
		return [];
	}
	addNextSegment(p, addStartPoint) {
		this.s0 = this.s1;
		this.s1 = this.s2;
		this.s2 = p;
		this.seg0.setCoordinates(this.s0, this.s1);
		this.computeOffsetSegment(this.seg0, this.side, this.distance, this.offset0);
		this.seg1.setCoordinates(this.s1, this.s2);
		this.computeOffsetSegment(this.seg1, this.side, this.distance, this.offset1);
		if (this.s1.equals(this.s2)) return null;
		var orientation = CGAlgorithms.computeOrientation(this.s0, this.s1, this.s2);
		var outsideTurn = orientation === CGAlgorithms.CLOCKWISE && this.side === Position.LEFT || orientation === CGAlgorithms.COUNTERCLOCKWISE && this.side === Position.RIGHT;
		if (orientation === 0) {
			this.addCollinear(addStartPoint);
		} else if (outsideTurn) {
			this.addOutsideTurn(orientation, addStartPoint);
		} else {
			this.addInsideTurn(orientation, addStartPoint);
		}
	}
	addLineEndCap(p0, p1) {
		var seg = new LineSegment(p0, p1);
		var offsetL = new LineSegment();
		this.computeOffsetSegment(seg, Position.LEFT, this.distance, offsetL);
		var offsetR = new LineSegment();
		this.computeOffsetSegment(seg, Position.RIGHT, this.distance, offsetR);
		var dx = p1.x - p0.x;
		var dy = p1.y - p0.y;
		var angle = Math.atan2(dy, dx);
		switch (this.bufParams.getEndCapStyle()) {
			case BufferParameters.CAP_ROUND:
				this.segList.addPt(offsetL.p1);
				this.addFilletArc(p1, angle + Math.PI / 2, angle - Math.PI / 2, CGAlgorithms.CLOCKWISE, this.distance);
				this.segList.addPt(offsetR.p1);
				break;
			case BufferParameters.CAP_FLAT:
				this.segList.addPt(offsetL.p1);
				this.segList.addPt(offsetR.p1);
				break;
			case BufferParameters.CAP_SQUARE:
				var squareCapSideOffset = new Coordinate();
				squareCapSideOffset.x = Math.abs(this.distance) * Math.cos(angle);
				squareCapSideOffset.y = Math.abs(this.distance) * Math.sin(angle);
				var squareCapLOffset = new Coordinate(offsetL.p1.x + squareCapSideOffset.x, offsetL.p1.y + squareCapSideOffset.y);
				var squareCapROffset = new Coordinate(offsetR.p1.x + squareCapSideOffset.x, offsetR.p1.y + squareCapSideOffset.y);
				this.segList.addPt(squareCapLOffset);
				this.segList.addPt(squareCapROffset);
				break;
		}
	}
	getCoordinates() {
		var pts = this.segList.getCoordinates();
		return pts;
	}
	addMitreJoin(p, offset0, offset1, distance) {
		var isMitreWithinLimit = true;
		var intPt = null;
		try {
			intPt = HCoordinate.intersection(offset0.p0, offset0.p1, offset1.p0, offset1.p1);
			var mitreRatio = distance <= 0.0 ? 1.0 : intPt.distance(p) / Math.abs(distance);
			if (mitreRatio > this.bufParams.getMitreLimit()) isMitreWithinLimit = false;
		} catch (ex) {
			if (ex instanceof NotRepresentableException) {
				intPt = new Coordinate(0, 0);
				isMitreWithinLimit = false;
			} else throw ex;
		} finally {}
		if (isMitreWithinLimit) {
			this.segList.addPt(intPt);
		} else {
			this.addLimitedMitreJoin(offset0, offset1, distance, this.bufParams.getMitreLimit());
		}
	}
	addFilletCorner(p, p0, p1, direction, radius) {
		var dx0 = p0.x - p.x;
		var dy0 = p0.y - p.y;
		var startAngle = Math.atan2(dy0, dx0);
		var dx1 = p1.x - p.x;
		var dy1 = p1.y - p.y;
		var endAngle = Math.atan2(dy1, dx1);
		if (direction === CGAlgorithms.CLOCKWISE) {
			if (startAngle <= endAngle) startAngle += 2.0 * Math.PI;
		} else {
			if (startAngle >= endAngle) startAngle -= 2.0 * Math.PI;
		}
		this.segList.addPt(p0);
		this.addFilletArc(p, startAngle, endAngle, direction, radius);
		this.segList.addPt(p1);
	}
	addOutsideTurn(orientation, addStartPoint) {
		if (this.offset0.p1.distance(this.offset1.p0) < this.distance * OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR) {
			this.segList.addPt(this.offset0.p1);
			return null;
		}
		if (this.bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
			this.addMitreJoin(this.s1, this.offset0, this.offset1, this.distance);
		} else if (this.bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL) {
			this.addBevelJoin(this.offset0, this.offset1);
		} else {
			if (addStartPoint) this.segList.addPt(this.offset0.p1);
			this.addFilletCorner(this.s1, this.offset0.p1, this.offset1.p0, orientation, this.distance);
			this.segList.addPt(this.offset1.p0);
		}
	}
	createSquare(p) {
		this.segList.addPt(new Coordinate(p.x + this.distance, p.y + this.distance));
		this.segList.addPt(new Coordinate(p.x + this.distance, p.y - this.distance));
		this.segList.addPt(new Coordinate(p.x - this.distance, p.y - this.distance));
		this.segList.addPt(new Coordinate(p.x - this.distance, p.y + this.distance));
		this.segList.closeRing();
	}
	addSegments(pt, isForward) {
		this.segList.addPts(pt, isForward);
	}
	addFirstSegment() {
		this.segList.addPt(this.offset1.p0);
	}
	addLastSegment() {
		this.segList.addPt(this.offset1.p1);
	}
	initSideSegments(s1, s2, side) {
		this.s1 = s1;
		this.s2 = s2;
		this.side = side;
		this.seg1.setCoordinates(s1, s2);
		this.computeOffsetSegment(this.seg1, side, this.distance, this.offset1);
	}
	addLimitedMitreJoin(offset0, offset1, distance, mitreLimit) {
		var basePt = this.seg0.p1;
		var ang0 = Angle.angle(basePt, this.seg0.p0);
		var ang1 = Angle.angle(basePt, this.seg1.p1);
		var angDiff = Angle.angleBetweenOriented(this.seg0.p0, basePt, this.seg1.p1);
		var angDiffHalf = angDiff / 2;
		var midAng = Angle.normalize(ang0 + angDiffHalf);
		var mitreMidAng = Angle.normalize(midAng + Math.PI);
		var mitreDist = mitreLimit * distance;
		var bevelDelta = mitreDist * Math.abs(Math.sin(angDiffHalf));
		var bevelHalfLen = distance - bevelDelta;
		var bevelMidX = basePt.x + mitreDist * Math.cos(mitreMidAng);
		var bevelMidY = basePt.y + mitreDist * Math.sin(mitreMidAng);
		var bevelMidPt = new Coordinate(bevelMidX, bevelMidY);
		var mitreMidLine = new LineSegment(basePt, bevelMidPt);
		var bevelEndLeft = mitreMidLine.pointAlongOffset(1.0, bevelHalfLen);
		var bevelEndRight = mitreMidLine.pointAlongOffset(1.0, -bevelHalfLen);
		if (this.side === Position.LEFT) {
			this.segList.addPt(bevelEndLeft);
			this.segList.addPt(bevelEndRight);
		} else {
			this.segList.addPt(bevelEndRight);
			this.segList.addPt(bevelEndLeft);
		}
	}
	computeOffsetSegment(seg, side, distance, offset) {
		var sideSign = side === Position.LEFT ? 1 : -1;
		var dx = seg.p1.x - seg.p0.x;
		var dy = seg.p1.y - seg.p0.y;
		var len = Math.sqrt(dx * dx + dy * dy);
		var ux = sideSign * distance * dx / len;
		var uy = sideSign * distance * dy / len;
		offset.p0.x = seg.p0.x - uy;
		offset.p0.y = seg.p0.y + ux;
		offset.p1.x = seg.p1.x - uy;
		offset.p1.y = seg.p1.y + ux;
	}
	addFilletArc(p, startAngle, endAngle, direction, radius) {
		var directionFactor = direction === CGAlgorithms.CLOCKWISE ? -1 : 1;
		var totalAngle = Math.abs(startAngle - endAngle);
		var nSegs = Math.trunc(totalAngle / this.filletAngleQuantum + 0.5);
		if (nSegs < 1) return null;
		var initAngle = null, currAngleInc = null;
		initAngle = 0.0;
		currAngleInc = totalAngle / nSegs;
		var currAngle = initAngle;
		var pt = new Coordinate();
		while (currAngle < totalAngle) {
			var angle = startAngle + directionFactor * currAngle;
			pt.x = p.x + radius * Math.cos(angle);
			pt.y = p.y + radius * Math.sin(angle);
			this.segList.addPt(pt);
			currAngle += currAngleInc;
		}
	}
	addInsideTurn(orientation, addStartPoint) {
		this.li.computeIntersection(this.offset0.p0, this.offset0.p1, this.offset1.p0, this.offset1.p1);
		if (this.li.hasIntersection()) {
			this.segList.addPt(this.li.getIntersection(0));
		} else {
			this._hasNarrowConcaveAngle = true;
			if (this.offset0.p1.distance(this.offset1.p0) < this.distance * OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) {
				this.segList.addPt(this.offset0.p1);
			} else {
				this.segList.addPt(this.offset0.p1);
				if (this.closingSegLengthFactor > 0) {
					var mid0 = new Coordinate((this.closingSegLengthFactor * this.offset0.p1.x + this.s1.x) / (this.closingSegLengthFactor + 1), (this.closingSegLengthFactor * this.offset0.p1.y + this.s1.y) / (this.closingSegLengthFactor + 1));
					this.segList.addPt(mid0);
					var mid1 = new Coordinate((this.closingSegLengthFactor * this.offset1.p0.x + this.s1.x) / (this.closingSegLengthFactor + 1), (this.closingSegLengthFactor * this.offset1.p0.y + this.s1.y) / (this.closingSegLengthFactor + 1));
					this.segList.addPt(mid1);
				} else {
					this.segList.addPt(this.s1);
				}
				this.segList.addPt(this.offset1.p0);
			}
		}
	}
	createCircle(p) {
		var pt = new Coordinate(p.x + this.distance, p.y);
		this.segList.addPt(pt);
		this.addFilletArc(p, 0.0, 2.0 * Math.PI, -1, this.distance);
		this.segList.closeRing();
	}
	addBevelJoin(offset0, offset1) {
		this.segList.addPt(offset0.p1);
		this.segList.addPt(offset1.p0);
	}
	init(distance) {
		this.distance = distance;
		this.maxCurveSegmentError = distance * (1 - Math.cos(this.filletAngleQuantum / 2.0));
		this.segList = new OffsetSegmentString();
		this.segList.setPrecisionModel(this.precisionModel);
		this.segList.setMinimumVertexDistance(distance * OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
	}
	addCollinear(addStartPoint) {
		this.li.computeIntersection(this.s0, this.s1, this.s1, this.s2);
		var numInt = this.li.getIntersectionNum();
		if (numInt >= 2) {
			if (this.bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL || this.bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
				if (addStartPoint) this.segList.addPt(this.offset0.p1);
				this.segList.addPt(this.offset1.p0);
			} else {
				this.addFilletCorner(this.s1, this.offset0.p1, this.offset1.p0, CGAlgorithms.CLOCKWISE, this.distance);
			}
		}
	}
	closeRing() {
		this.segList.closeRing();
	}
	hasNarrowConcaveAngle() {
		return this._hasNarrowConcaveAngle;
	}
	getClass() {
		return OffsetSegmentGenerator;
	}
}
OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR = 1.0E-3;
OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR = 1.0E-3;
OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR = 1.0E-6;
OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR = 80;

class OffsetCurveBuilder {
	constructor(...args) {
		this.distance = 0.0;
		this.precisionModel = null;
		this.bufParams = null;
		if (args.length === 2) {
			let [precisionModel, bufParams] = args;
			this.precisionModel = precisionModel;
			this.bufParams = bufParams;
		}
	}
	get interfaces_() {
		return [];
	}
	static copyCoordinates(pts) {
		var copy = new Array(pts.length);
		for (var i = 0; i < copy.length; i++) {
			copy[i] = new Coordinate(pts[i]);
		}
		return copy;
	}
	getOffsetCurve(inputPts, distance) {
		this.distance = distance;
		if (distance === 0.0) return null;
		var isRightSide = distance < 0.0;
		var posDistance = Math.abs(distance);
		var segGen = this.getSegGen(posDistance);
		if (inputPts.length <= 1) {
			this.computePointCurve(inputPts[0], segGen);
		} else {
			this.computeOffsetCurve(inputPts, isRightSide, segGen);
		}
		var curvePts = segGen.getCoordinates();
		if (isRightSide) CoordinateArrays.reverse(curvePts);
		return curvePts;
	}
	computeSingleSidedBufferCurve(inputPts, isRightSide, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		if (isRightSide) {
			segGen.addSegments(inputPts, true);
			var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
			var n2 = simp2.length - 1;
			segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = n2 - 2; i >= 0; i--) {
				segGen.addNextSegment(simp2[i], true);
			}
		} else {
			segGen.addSegments(inputPts, false);
			var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
			var n1 = simp1.length - 1;
			segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = 2; i <= n1; i++) {
				segGen.addNextSegment(simp1[i], true);
			}
		}
		segGen.addLastSegment();
		segGen.closeRing();
	}
	computeRingBufferCurve(inputPts, side, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		if (side === Position.RIGHT) distTol = -distTol;
		var simp = BufferInputLineSimplifier.simplify(inputPts, distTol);
		var n = simp.length - 1;
		segGen.initSideSegments(simp[n - 1], simp[0], side);
		for (var i = 1; i <= n; i++) {
			var addStartPoint = i !== 1;
			segGen.addNextSegment(simp[i], addStartPoint);
		}
		segGen.closeRing();
	}
	computeLineBufferCurve(inputPts, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
		var n1 = simp1.length - 1;
		segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
		for (var i = 2; i <= n1; i++) {
			segGen.addNextSegment(simp1[i], true);
		}
		segGen.addLastSegment();
		segGen.addLineEndCap(simp1[n1 - 1], simp1[n1]);
		var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
		var n2 = simp2.length - 1;
		segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
		for (var i = n2 - 2; i >= 0; i--) {
			segGen.addNextSegment(simp2[i], true);
		}
		segGen.addLastSegment();
		segGen.addLineEndCap(simp2[1], simp2[0]);
		segGen.closeRing();
	}
	computePointCurve(pt, segGen) {
		switch (this.bufParams.getEndCapStyle()) {
			case BufferParameters.CAP_ROUND:
				segGen.createCircle(pt);
				break;
			case BufferParameters.CAP_SQUARE:
				segGen.createSquare(pt);
				break;
		}
	}
	getLineCurve(inputPts, distance) {
		this.distance = distance;
		if (distance < 0.0 && !this.bufParams.isSingleSided()) return null;
		if (distance === 0.0) return null;
		var posDistance = Math.abs(distance);
		var segGen = this.getSegGen(posDistance);
		if (inputPts.length <= 1) {
			this.computePointCurve(inputPts[0], segGen);
		} else {
			if (this.bufParams.isSingleSided()) {
				var isRightSide = distance < 0.0;
				this.computeSingleSidedBufferCurve(inputPts, isRightSide, segGen);
			} else this.computeLineBufferCurve(inputPts, segGen);
		}
		var lineCoord = segGen.getCoordinates();
		return lineCoord;
	}
	getBufferParameters() {
		return this.bufParams;
	}
	simplifyTolerance(bufDistance) {
		return bufDistance * this.bufParams.getSimplifyFactor();
	}
	getRingCurve(inputPts, side, distance) {
		this.distance = distance;
		if (inputPts.length <= 2) return this.getLineCurve(inputPts, distance);
		if (distance === 0.0) {
			return OffsetCurveBuilder.copyCoordinates(inputPts);
		}
		var segGen = this.getSegGen(distance);
		this.computeRingBufferCurve(inputPts, side, segGen);
		return segGen.getCoordinates();
	}
	computeOffsetCurve(inputPts, isRightSide, segGen) {
		var distTol = this.simplifyTolerance(this.distance);
		if (isRightSide) {
			var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
			var n2 = simp2.length - 1;
			segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = n2 - 2; i >= 0; i--) {
				segGen.addNextSegment(simp2[i], true);
			}
		} else {
			var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
			var n1 = simp1.length - 1;
			segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
			segGen.addFirstSegment();
			for (var i = 2; i <= n1; i++) {
				segGen.addNextSegment(simp1[i], true);
			}
		}
		segGen.addLastSegment();
	}
	getSegGen(distance) {
		return new OffsetSegmentGenerator(this.precisionModel, this.bufParams, distance);
	}
	getClass() {
		return OffsetCurveBuilder;
	}
}

class SubgraphDepthLocater {
	constructor(...args) {
		this.subgraphs = null;
		this.seg = new LineSegment();
		this.cga = new CGAlgorithms();
		if (args.length === 1) {
			let [subgraphs] = args;
			this.subgraphs = subgraphs;
		}
	}
	get interfaces_() {
		return [];
	}
	static get DepthSegment() {
		return DepthSegment;
	}
	findStabbedSegments(...args) {
		if (args.length === 1) {
			let [stabbingRayLeftPt] = args;
			var stabbedSegments = new ArrayList();
			for (var i = this.subgraphs.iterator(); i.hasNext(); ) {
				var bsg = i.next();
				var env = bsg.getEnvelope();
				if (stabbingRayLeftPt.y < env.getMinY() || stabbingRayLeftPt.y > env.getMaxY()) continue;
				this.findStabbedSegments(stabbingRayLeftPt, bsg.getDirectedEdges(), stabbedSegments);
			}
			return stabbedSegments;
		} else if (args.length === 3) {
			if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Coordinate && args[1] instanceof DirectedEdge)) {
				let [stabbingRayLeftPt, dirEdge, stabbedSegments] = args;
				var pts = dirEdge.getEdge().getCoordinates();
				for (var i = 0; i < pts.length - 1; i++) {
					this.seg.p0 = pts[i];
					this.seg.p1 = pts[i + 1];
					if (this.seg.p0.y > this.seg.p1.y) this.seg.reverse();
					var maxx = Math.max(this.seg.p0.x, this.seg.p1.x);
					if (maxx < stabbingRayLeftPt.x) continue;
					if (this.seg.isHorizontal()) continue;
					if (stabbingRayLeftPt.y < this.seg.p0.y || stabbingRayLeftPt.y > this.seg.p1.y) continue;
					if (CGAlgorithms.computeOrientation(this.seg.p0, this.seg.p1, stabbingRayLeftPt) === CGAlgorithms.RIGHT) continue;
					var depth = dirEdge.getDepth(Position.LEFT);
					if (!this.seg.p0.equals(pts[i])) depth = dirEdge.getDepth(Position.RIGHT);
					var ds = new DepthSegment(this.seg, depth);
					stabbedSegments.add(ds);
				}
			} else if (args[2].interfaces_ && args[2].interfaces_.indexOf(List) > -1 && (args[0] instanceof Coordinate && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
				let [stabbingRayLeftPt, dirEdges, stabbedSegments] = args;
				for (var i = dirEdges.iterator(); i.hasNext(); ) {
					var de = i.next();
					if (!de.isForward()) continue;
					this.findStabbedSegments(stabbingRayLeftPt, de, stabbedSegments);
				}
			}
		}
	}
	getDepth(p) {
		var stabbedSegments = this.findStabbedSegments(p);
		if (stabbedSegments.size() === 0) return 0;
		var ds = Collections.min(stabbedSegments);
		return ds.leftDepth;
	}
	getClass() {
		return SubgraphDepthLocater;
	}
}
class DepthSegment {
	constructor(...args) {
		this.upwardSeg = null;
		this.leftDepth = null;
		if (args.length === 2) {
			let [seg, depth] = args;
			this.upwardSeg = new LineSegment(seg);
			this.leftDepth = depth;
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	compareTo(obj) {
		var other = obj;
		if (this.upwardSeg.minX() >= other.upwardSeg.maxX()) return 1;
		if (this.upwardSeg.maxX() <= other.upwardSeg.minX()) return -1;
		var orientIndex = this.upwardSeg.orientationIndex(other.upwardSeg);
		if (orientIndex !== 0) return orientIndex;
		orientIndex = -1 * other.upwardSeg.orientationIndex(this.upwardSeg);
		if (orientIndex !== 0) return orientIndex;
		return this.upwardSeg.compareTo(other.upwardSeg);
	}
	compareX(seg0, seg1) {
		var compare0 = seg0.p0.compareTo(seg1.p0);
		if (compare0 !== 0) return compare0;
		return seg0.p1.compareTo(seg1.p1);
	}
	toString() {
		return this.upwardSeg.toString();
	}
	getClass() {
		return DepthSegment;
	}
}

class Triangle {
	constructor(...args) {
		this.p0 = null;
		this.p1 = null;
		this.p2 = null;
		if (args.length === 3) {
			let [p0, p1, p2] = args;
			this.p0 = p0;
			this.p1 = p1;
			this.p2 = p2;
		}
	}
	get interfaces_() {
		return [];
	}
	static area(a, b, c) {
		return Math.abs(((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2);
	}
	static signedArea(a, b, c) {
		return ((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2;
	}
	static det(m00, m01, m10, m11) {
		return m00 * m11 - m01 * m10;
	}
	static interpolateZ(p, v0, v1, v2) {
		var x0 = v0.x;
		var y0 = v0.y;
		var a = v1.x - x0;
		var b = v2.x - x0;
		var c = v1.y - y0;
		var d = v2.y - y0;
		var det = a * d - b * c;
		var dx = p.x - x0;
		var dy = p.y - y0;
		var t = (d * dx - b * dy) / det;
		var u = (-c * dx + a * dy) / det;
		var z = v0.z + t * (v1.z - v0.z) + u * (v2.z - v0.z);
		return z;
	}
	static longestSideLength(a, b, c) {
		var lenAB = a.distance(b);
		var lenBC = b.distance(c);
		var lenCA = c.distance(a);
		var maxLen = lenAB;
		if (lenBC > maxLen) maxLen = lenBC;
		if (lenCA > maxLen) maxLen = lenCA;
		return maxLen;
	}
	static isAcute(a, b, c) {
		if (!Angle.isAcute(a, b, c)) return false;
		if (!Angle.isAcute(b, c, a)) return false;
		if (!Angle.isAcute(c, a, b)) return false;
		return true;
	}
	static circumcentre(a, b, c) {
		var cx = c.x;
		var cy = c.y;
		var ax = a.x - cx;
		var ay = a.y - cy;
		var bx = b.x - cx;
		var by = b.y - cy;
		var denom = 2 * Triangle.det(ax, ay, bx, by);
		var numx = Triangle.det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
		var numy = Triangle.det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
		var ccx = cx - numx / denom;
		var ccy = cy + numy / denom;
		return new Coordinate(ccx, ccy);
	}
	static perpendicularBisector(a, b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var l1 = new HCoordinate(a.x + dx / 2.0, a.y + dy / 2.0, 1.0);
		var l2 = new HCoordinate(a.x - dy + dx / 2.0, a.y + dx + dy / 2.0, 1.0);
		return new HCoordinate(l1, l2);
	}
	static angleBisector(a, b, c) {
		var len0 = b.distance(a);
		var len2 = b.distance(c);
		var frac = len0 / (len0 + len2);
		var dx = c.x - a.x;
		var dy = c.y - a.y;
		var splitPt = new Coordinate(a.x + frac * dx, a.y + frac * dy);
		return splitPt;
	}
	static area3D(a, b, c) {
		var ux = b.x - a.x;
		var uy = b.y - a.y;
		var uz = b.z - a.z;
		var vx = c.x - a.x;
		var vy = c.y - a.y;
		var vz = c.z - a.z;
		var crossx = uy * vz - uz * vy;
		var crossy = uz * vx - ux * vz;
		var crossz = ux * vy - uy * vx;
		var absSq = crossx * crossx + crossy * crossy + crossz * crossz;
		var area3D = Math.sqrt(absSq) / 2;
		return area3D;
	}
	static centroid(a, b, c) {
		var x = (a.x + b.x + c.x) / 3;
		var y = (a.y + b.y + c.y) / 3;
		return new Coordinate(x, y);
	}
	static inCentre(a, b, c) {
		var len0 = b.distance(c);
		var len1 = a.distance(c);
		var len2 = a.distance(b);
		var circum = len0 + len1 + len2;
		var inCentreX = (len0 * a.x + len1 * b.x + len2 * c.x) / circum;
		var inCentreY = (len0 * a.y + len1 * b.y + len2 * c.y) / circum;
		return new Coordinate(inCentreX, inCentreY);
	}
	area() {
		return Triangle.area(this.p0, this.p1, this.p2);
	}
	signedArea() {
		return Triangle.signedArea(this.p0, this.p1, this.p2);
	}
	interpolateZ(p) {
		if (p === null) throw new IllegalArgumentException$1("Supplied point is null.");
		return Triangle.interpolateZ(p, this.p0, this.p1, this.p2);
	}
	longestSideLength() {
		return Triangle.longestSideLength(this.p0, this.p1, this.p2);
	}
	isAcute() {
		return Triangle.isAcute(this.p0, this.p1, this.p2);
	}
	circumcentre() {
		return Triangle.circumcentre(this.p0, this.p1, this.p2);
	}
	area3D() {
		return Triangle.area3D(this.p0, this.p1, this.p2);
	}
	centroid() {
		return Triangle.centroid(this.p0, this.p1, this.p2);
	}
	inCentre() {
		return Triangle.inCentre(this.p0, this.p1, this.p2);
	}
	getClass() {
		return Triangle;
	}
}

class OffsetCurveSetBuilder {
	constructor(...args) {
		this.inputGeom = null;
		this.distance = null;
		this.curveBuilder = null;
		this.curveList = new ArrayList();
		if (args.length === 3) {
			let [inputGeom, distance, curveBuilder] = args;
			this.inputGeom = inputGeom;
			this.distance = distance;
			this.curveBuilder = curveBuilder;
		}
	}
	get interfaces_() {
		return [];
	}
	addPoint(p) {
		if (this.distance <= 0.0) return null;
		var coord = p.getCoordinates();
		var curve = this.curveBuilder.getLineCurve(coord, this.distance);
		this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
	}
	addPolygon(p) {
		var offsetDistance = this.distance;
		var offsetSide = Position.LEFT;
		if (this.distance < 0.0) {
			offsetDistance = -this.distance;
			offsetSide = Position.RIGHT;
		}
		var shell = p.getExteriorRing();
		var shellCoord = CoordinateArrays.removeRepeatedPoints(shell.getCoordinates());
		if (this.distance < 0.0 && this.isErodedCompletely(shell, this.distance)) return null;
		if (this.distance <= 0.0 && shellCoord.length < 3) return null;
		this.addPolygonRing(shellCoord, offsetDistance, offsetSide, Location.EXTERIOR, Location.INTERIOR);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			var holeCoord = CoordinateArrays.removeRepeatedPoints(hole.getCoordinates());
			if (this.distance > 0.0 && this.isErodedCompletely(hole, -this.distance)) continue;
			this.addPolygonRing(holeCoord, offsetDistance, Position.opposite(offsetSide), Location.INTERIOR, Location.EXTERIOR);
		}
	}
	isTriangleErodedCompletely(triangleCoord, bufferDistance) {
		var tri = new Triangle(triangleCoord[0], triangleCoord[1], triangleCoord[2]);
		var inCentre = tri.inCentre();
		var distToCentre = CGAlgorithms.distancePointLine(inCentre, tri.p0, tri.p1);
		return distToCentre < Math.abs(bufferDistance);
	}
	addLineString(line) {
		if (this.distance <= 0.0 && !this.curveBuilder.getBufferParameters().isSingleSided()) return null;
		var coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
		var curve = this.curveBuilder.getLineCurve(coord, this.distance);
		this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
	}
	addCurve(coord, leftLoc, rightLoc) {
		if (coord === null || coord.length < 2) return null;
		var e = new NodedSegmentString(coord, new Label(0, Location.BOUNDARY, leftLoc, rightLoc));
		this.curveList.add(e);
	}
	getCurves() {
		this.add(this.inputGeom);
		return this.curveList;
	}
	addPolygonRing(coord, offsetDistance, side, cwLeftLoc, cwRightLoc) {
		if (offsetDistance === 0.0 && coord.length < LinearRing.MINIMUM_VALID_SIZE) return null;
		var leftLoc = cwLeftLoc;
		var rightLoc = cwRightLoc;
		if (coord.length >= LinearRing.MINIMUM_VALID_SIZE && CGAlgorithms.isCCW(coord)) {
			leftLoc = cwRightLoc;
			rightLoc = cwLeftLoc;
			side = Position.opposite(side);
		}
		var curve = this.curveBuilder.getRingCurve(coord, side, offsetDistance);
		this.addCurve(curve, leftLoc, rightLoc);
	}
	add(g) {
		if (g.isEmpty()) return null;
		if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof LineString) this.addLineString(g); else if (g instanceof Point) this.addPoint(g); else if (g instanceof MultiPoint) this.addCollection(g); else if (g instanceof MultiLineString) this.addCollection(g); else if (g instanceof MultiPolygon) this.addCollection(g); else if (g instanceof GeometryCollection) this.addCollection(g); else throw new UnsupportedOperationException(g.getClass().getName());
	}
	isErodedCompletely(ring, bufferDistance) {
		var ringCoord = ring.getCoordinates();
		var minDiam = 0.0;
		if (ringCoord.length < 4) return bufferDistance < 0;
		if (ringCoord.length === 4) return this.isTriangleErodedCompletely(ringCoord, bufferDistance);
		var env = ring.getEnvelopeInternal();
		var envMinDimension = Math.min(env.getHeight(), env.getWidth());
		if (bufferDistance < 0.0 && 2 * Math.abs(bufferDistance) > envMinDimension) return true;
		return false;
	}
	addCollection(gc) {
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = gc.getGeometryN(i);
			this.add(g);
		}
	}
	getClass() {
		return OffsetCurveSetBuilder;
	}
}

class SimplePointInAreaLocator {
	constructor(...args) {
		this.geom = null;
		if (args.length === 1) {
			let [geom] = args;
			this.geom = geom;
		}
	}
	get interfaces_() {
		return [PointOnGeometryLocator];
	}
	static isPointInRing(p, ring) {
		if (!ring.getEnvelopeInternal().intersects(p)) return false;
		return CGAlgorithms.isPointInRing(p, ring.getCoordinates());
	}
	static containsPointInPolygon(p, poly) {
		if (poly.isEmpty()) return false;
		var shell = poly.getExteriorRing();
		if (!SimplePointInAreaLocator.isPointInRing(p, shell)) return false;
		for (var i = 0; i < poly.getNumInteriorRing(); i++) {
			var hole = poly.getInteriorRingN(i);
			if (SimplePointInAreaLocator.isPointInRing(p, hole)) return false;
		}
		return true;
	}
	static containsPoint(p, geom) {
		if (geom instanceof Polygon) {
			return SimplePointInAreaLocator.containsPointInPolygon(p, geom);
		} else if (geom instanceof GeometryCollection) {
			var geomi = new GeometryCollectionIterator(geom);
			while (geomi.hasNext()) {
				var g2 = geomi.next();
				if (g2 !== geom) if (SimplePointInAreaLocator.containsPoint(p, g2)) return true;
			}
		}
		return false;
	}
	static locate(p, geom) {
		if (geom.isEmpty()) return Location.EXTERIOR;
		if (SimplePointInAreaLocator.containsPoint(p, geom)) return Location.INTERIOR;
		return Location.EXTERIOR;
	}
	locate(p) {
		return SimplePointInAreaLocator.locate(p, this.geom);
	}
	getClass() {
		return SimplePointInAreaLocator;
	}
}

class EdgeEndStar {
	constructor(...args) {
		this.edgeMap = new TreeMap();
		this.edgeList = null;
		this.ptInAreaLocation = [Location.NONE, Location.NONE];
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	getNextCW(ee) {
		this.getEdges();
		var i = this.edgeList.indexOf(ee);
		var iNextCW = i - 1;
		if (i === 0) iNextCW = this.edgeList.size() - 1;
		return this.edgeList.get(iNextCW);
	}
	propagateSideLabels(geomIndex) {
		var startLoc = Location.NONE;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			if (label.isArea(geomIndex) && label.getLocation(geomIndex, Position.LEFT) !== Location.NONE) startLoc = label.getLocation(geomIndex, Position.LEFT);
		}
		if (startLoc === Location.NONE) return null;
		var currLoc = startLoc;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			if (label.getLocation(geomIndex, Position.ON) === Location.NONE) label.setLocation(geomIndex, Position.ON, currLoc);
			if (label.isArea(geomIndex)) {
				var leftLoc = label.getLocation(geomIndex, Position.LEFT);
				var rightLoc = label.getLocation(geomIndex, Position.RIGHT);
				if (rightLoc !== Location.NONE) {
					if (rightLoc !== currLoc) throw new TopologyException("side location conflict", e.getCoordinate());
					if (leftLoc === Location.NONE) {
						Assert.shouldNeverReachHere("found single null side (at " + e.getCoordinate() + ")");
					}
					currLoc = leftLoc;
				} else {
					Assert.isTrue(label.getLocation(geomIndex, Position.LEFT) === Location.NONE, "found single null side");
					label.setLocation(geomIndex, Position.RIGHT, currLoc);
					label.setLocation(geomIndex, Position.LEFT, currLoc);
				}
			}
		}
	}
	getCoordinate() {
		var it = this.iterator();
		if (!it.hasNext()) return null;
		var e = it.next();
		return e.getCoordinate();
	}
	print(out) {
		System.out.println("EdgeEndStar:   " + this.getCoordinate());
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			e.print(out);
		}
	}
	isAreaLabelsConsistent(geomGraph) {
		this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule());
		return this.checkAreaLabelsConsistent(0);
	}
	checkAreaLabelsConsistent(geomIndex) {
		var edges = this.getEdges();
		if (edges.size() <= 0) return true;
		var lastEdgeIndex = edges.size() - 1;
		var startLabel = edges.get(lastEdgeIndex).getLabel();
		var startLoc = startLabel.getLocation(geomIndex, Position.LEFT);
		Assert.isTrue(startLoc !== Location.NONE, "Found unlabelled area edge");
		var currLoc = startLoc;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			Assert.isTrue(label.isArea(geomIndex), "Found non-area edge");
			var leftLoc = label.getLocation(geomIndex, Position.LEFT);
			var rightLoc = label.getLocation(geomIndex, Position.RIGHT);
			if (leftLoc === rightLoc) {
				return false;
			}
			if (rightLoc !== currLoc) {
				return false;
			}
			currLoc = leftLoc;
		}
		return true;
	}
	findIndex(eSearch) {
		this.iterator();
		for (var i = 0; i < this.edgeList.size(); i++) {
			var e = this.edgeList.get(i);
			if (e === eSearch) return i;
		}
		return -1;
	}
	iterator() {
		return this.getEdges().iterator();
	}
	getEdges() {
		if (this.edgeList === null) {
			this.edgeList = new ArrayList(this.edgeMap.values());
		}
		return this.edgeList;
	}
	getLocation(geomIndex, p, geom) {
		if (this.ptInAreaLocation[geomIndex] === Location.NONE) {
			this.ptInAreaLocation[geomIndex] = SimplePointInAreaLocator.locate(p, geom[geomIndex].getGeometry());
		}
		return this.ptInAreaLocation[geomIndex];
	}
	toString() {
		var buf = new StringBuffer();
		buf.append("EdgeEndStar:   " + this.getCoordinate());
		buf.append("\n");
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			buf.append(e);
			buf.append("\n");
		}
		return buf.toString();
	}
	computeEdgeEndLabels(boundaryNodeRule) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			ee.computeLabel(boundaryNodeRule);
		}
	}
	computeLabelling(geomGraph) {
		this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule());
		this.propagateSideLabels(0);
		this.propagateSideLabels(1);
		var hasDimensionalCollapseEdge = [false, false];
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			for (var geomi = 0; geomi < 2; geomi++) {
				if (label.isLine(geomi) && label.getLocation(geomi) === Location.BOUNDARY) hasDimensionalCollapseEdge[geomi] = true;
			}
		}
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			for (var geomi = 0; geomi < 2; geomi++) {
				if (label.isAnyNull(geomi)) {
					var loc = Location.NONE;
					if (hasDimensionalCollapseEdge[geomi]) {
						loc = Location.EXTERIOR;
					} else {
						var p = e.getCoordinate();
						loc = this.getLocation(geomi, p, geomGraph);
					}
					label.setAllLocationsIfNull(geomi, loc);
				}
			}
		}
	}
	getDegree() {
		return this.edgeMap.size();
	}
	insertEdgeEnd(e, obj) {
		this.edgeMap.put(e, obj);
		this.edgeList = null;
	}
	getClass() {
		return EdgeEndStar;
	}
}

class DirectedEdgeStar extends EdgeEndStar {
	constructor(...args) {
		super();
		this.resultAreaEdgeList = null;
		this.label = null;
		this.SCANNING_FOR_INCOMING = 1;
		this.LINKING_TO_OUTGOING = 2;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	linkResultDirectedEdges() {
		this.getResultAreaEdges();
		var firstOut = null;
		var incoming = null;
		var state = this.SCANNING_FOR_INCOMING;
		for (var i = 0; i < this.resultAreaEdgeList.size(); i++) {
			var nextOut = this.resultAreaEdgeList.get(i);
			var nextIn = nextOut.getSym();
			if (!nextOut.getLabel().isArea()) continue;
			if (firstOut === null && nextOut.isInResult()) firstOut = nextOut;
			switch (state) {
				case this.SCANNING_FOR_INCOMING:
					if (!nextIn.isInResult()) continue;
					incoming = nextIn;
					state = this.LINKING_TO_OUTGOING;
					break;
				case this.LINKING_TO_OUTGOING:
					if (!nextOut.isInResult()) continue;
					incoming.setNext(nextOut);
					state = this.SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this.LINKING_TO_OUTGOING) {
			if (firstOut === null) throw new TopologyException("no outgoing dirEdge found", this.getCoordinate());
			Assert.isTrue(firstOut.isInResult(), "unable to link last incoming dirEdge");
			incoming.setNext(firstOut);
		}
	}
	insert(ee) {
		var de = ee;
		this.insertEdgeEnd(de, de);
	}
	getRightmostEdge() {
		var edges = this.getEdges();
		var size = edges.size();
		if (size < 1) return null;
		var de0 = edges.get(0);
		if (size === 1) return de0;
		var deLast = edges.get(size - 1);
		var quad0 = de0.getQuadrant();
		var quad1 = deLast.getQuadrant();
		if (Quadrant.isNorthern(quad0) && Quadrant.isNorthern(quad1)) return de0; else if (!Quadrant.isNorthern(quad0) && !Quadrant.isNorthern(quad1)) return deLast; else {
			var nonHorizontalEdge = null;
			if (de0.getDy() !== 0) return de0; else if (deLast.getDy() !== 0) return deLast;
		}
		Assert.shouldNeverReachHere("found two horizontal edges incident on node");
		return null;
	}
	print(out) {
		System.out.println("DirectedEdgeStar: " + this.getCoordinate());
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			out.print("out ");
			de.print(out);
			out.println();
			out.print("in ");
			de.getSym().print(out);
			out.println();
		}
	}
	getResultAreaEdges() {
		if (this.resultAreaEdgeList !== null) return this.resultAreaEdgeList;
		this.resultAreaEdgeList = new ArrayList();
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() || de.getSym().isInResult()) this.resultAreaEdgeList.add(de);
		}
		return this.resultAreaEdgeList;
	}
	updateLabelling(nodeLabel) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			label.setAllLocationsIfNull(0, nodeLabel.getLocation(0));
			label.setAllLocationsIfNull(1, nodeLabel.getLocation(1));
		}
	}
	linkAllDirectedEdges() {
		this.getEdges();
		var prevOut = null;
		var firstIn = null;
		for (var i = this.edgeList.size() - 1; i >= 0; i--) {
			var nextOut = this.edgeList.get(i);
			var nextIn = nextOut.getSym();
			if (firstIn === null) firstIn = nextIn;
			if (prevOut !== null) nextIn.setNext(prevOut);
			prevOut = nextOut;
		}
		firstIn.setNext(prevOut);
	}
	computeDepths(...args) {
		if (args.length === 1) {
			let [de] = args;
			var edgeIndex = this.findIndex(de);
			var label = de.getLabel();
			var startDepth = de.getDepth(Position.LEFT);
			var targetLastDepth = de.getDepth(Position.RIGHT);
			var nextDepth = this.computeDepths(edgeIndex + 1, this.edgeList.size(), startDepth);
			var lastDepth = this.computeDepths(0, edgeIndex, nextDepth);
			if (lastDepth !== targetLastDepth) throw new TopologyException("depth mismatch at " + de.getCoordinate());
		} else if (args.length === 3) {
			let [startIndex, endIndex, startDepth] = args;
			var currDepth = startDepth;
			for (var i = startIndex; i < endIndex; i++) {
				var nextDe = this.edgeList.get(i);
				var label = nextDe.getLabel();
				nextDe.setEdgeDepths(Position.RIGHT, currDepth);
				currDepth = nextDe.getDepth(Position.LEFT);
			}
			return currDepth;
		}
	}
	mergeSymLabels() {
		for (var it = this.iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			label.merge(de.getSym().getLabel());
		}
	}
	linkMinimalDirectedEdges(er) {
		var firstOut = null;
		var incoming = null;
		var state = this.SCANNING_FOR_INCOMING;
		for (var i = this.resultAreaEdgeList.size() - 1; i >= 0; i--) {
			var nextOut = this.resultAreaEdgeList.get(i);
			var nextIn = nextOut.getSym();
			if (firstOut === null && nextOut.getEdgeRing() === er) firstOut = nextOut;
			switch (state) {
				case this.SCANNING_FOR_INCOMING:
					if (nextIn.getEdgeRing() !== er) continue;
					incoming = nextIn;
					state = this.LINKING_TO_OUTGOING;
					break;
				case this.LINKING_TO_OUTGOING:
					if (nextOut.getEdgeRing() !== er) continue;
					incoming.setNextMin(nextOut);
					state = this.SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this.LINKING_TO_OUTGOING) {
			Assert.isTrue(firstOut !== null, "found null for first outgoing dirEdge");
			Assert.isTrue(firstOut.getEdgeRing() === er, "unable to link last incoming dirEdge");
			incoming.setNextMin(firstOut);
		}
	}
	getOutgoingDegree(...args) {
		if (args.length === 0) {
			let [] = args;
			var degree = 0;
			for (var it = this.iterator(); it.hasNext(); ) {
				var de = it.next();
				if (de.isInResult()) degree++;
			}
			return degree;
		} else if (args.length === 1) {
			let [er] = args;
			var degree = 0;
			for (var it = this.iterator(); it.hasNext(); ) {
				var de = it.next();
				if (de.getEdgeRing() === er) degree++;
			}
			return degree;
		}
	}
	getLabel() {
		return this.label;
	}
	findCoveredLineEdges() {
		var startLoc = Location.NONE;
		for (var it = this.iterator(); it.hasNext(); ) {
			var nextOut = it.next();
			var nextIn = nextOut.getSym();
			if (!nextOut.isLineEdge()) {
				if (nextOut.isInResult()) {
					startLoc = Location.INTERIOR;
					break;
				}
				if (nextIn.isInResult()) {
					startLoc = Location.EXTERIOR;
					break;
				}
			}
		}
		if (startLoc === Location.NONE) return null;
		var currLoc = startLoc;
		for (var it = this.iterator(); it.hasNext(); ) {
			var nextOut = it.next();
			var nextIn = nextOut.getSym();
			if (nextOut.isLineEdge()) {
				nextOut.getEdge().setCovered(currLoc === Location.INTERIOR);
			} else {
				if (nextOut.isInResult()) currLoc = Location.EXTERIOR;
				if (nextIn.isInResult()) currLoc = Location.INTERIOR;
			}
		}
	}
	computeLabelling(geom) {
		super.computeLabelling(geom);
		this.label = new Label(Location.NONE);
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			var e = ee.getEdge();
			var eLabel = e.getLabel();
			for (var i = 0; i < 2; i++) {
				var eLoc = eLabel.getLocation(i);
				if (eLoc === Location.INTERIOR || eLoc === Location.BOUNDARY) this.label.setLocation(i, Location.INTERIOR);
			}
		}
	}
	getClass() {
		return DirectedEdgeStar;
	}
}

class OverlayNodeFactory extends NodeFactory {
	get interfaces_() {
		return [];
	}
	createNode(coord) {
		return new Node$1(coord, new DirectedEdgeStar());
	}
	getClass() {
		return OverlayNodeFactory;
	}
}

class OrientedCoordinateArray {
	constructor(...args) {
		this.pts = null;
		this._orientation = null;
		if (args.length === 1) {
			let [pts] = args;
			this.pts = pts;
			this._orientation = OrientedCoordinateArray.orientation(pts);
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	static orientation(pts) {
		return CoordinateArrays.increasingDirection(pts) === 1;
	}
	static compareOriented(pts1, orientation1, pts2, orientation2) {
		var dir1 = orientation1 ? 1 : -1;
		var dir2 = orientation2 ? 1 : -1;
		var limit1 = orientation1 ? pts1.length : -1;
		var limit2 = orientation2 ? pts2.length : -1;
		var i1 = orientation1 ? 0 : pts1.length - 1;
		var i2 = orientation2 ? 0 : pts2.length - 1;
		var comp = 0;
		while (true) {
			var compPt = pts1[i1].compareTo(pts2[i2]);
			if (compPt !== 0) return compPt;
			i1 += dir1;
			i2 += dir2;
			var done1 = i1 === limit1;
			var done2 = i2 === limit2;
			if (done1 && !done2) return -1;
			if (!done1 && done2) return 1;
			if (done1 && done2) return 0;
		}
	}
	compareTo(o1) {
		var oca = o1;
		var comp = OrientedCoordinateArray.compareOriented(this.pts, this._orientation, oca.pts, oca._orientation);
		return comp;
	}
	getClass() {
		return OrientedCoordinateArray;
	}
}

class EdgeList {
	constructor(...args) {
		this.edges = new ArrayList();
		this.ocaMap = new TreeMap();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	print(out) {
		out.print("MULTILINESTRING ( ");
		for (var j = 0; j < this.edges.size(); j++) {
			var e = this.edges.get(j);
			if (j > 0) out.print(",");
			out.print("(");
			var pts = e.getCoordinates();
			for (var i = 0; i < pts.length; i++) {
				if (i > 0) out.print(",");
				out.print(pts[i].x + " " + pts[i].y);
			}
			out.println(")");
		}
		out.print(")  ");
	}
	addAll(edgeColl) {
		for (var i = edgeColl.iterator(); i.hasNext(); ) {
			this.add(i.next());
		}
	}
	findEdgeIndex(e) {
		for (var i = 0; i < this.edges.size(); i++) {
			if (this.edges.get(i).equals(e)) return i;
		}
		return -1;
	}
	iterator() {
		return this.edges.iterator();
	}
	getEdges() {
		return this.edges;
	}
	get(i) {
		return this.edges.get(i);
	}
	findEqualEdge(e) {
		var oca = new OrientedCoordinateArray(e.getCoordinates());
		var matchEdge = this.ocaMap.get(oca);
		return matchEdge;
	}
	add(e) {
		this.edges.add(e);
		var oca = new OrientedCoordinateArray(e.getCoordinates());
		this.ocaMap.put(oca, e);
	}
	getClass() {
		return EdgeList;
	}
}

class SegmentIntersector$1 {
	get interfaces_() {
		return [];
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {}
	isDone() {}
	getClass() {
		return SegmentIntersector$1;
	}
}

class IntersectionAdder {
	constructor(...args) {
		this._hasIntersection = false;
		this.hasProper = false;
		this.hasProperInterior = false;
		this.hasInterior = false;
		this.properIntersectionPoint = null;
		this.li = null;
		this.isSelfIntersection = null;
		this.numIntersections = 0;
		this.numInteriorIntersections = 0;
		this.numProperIntersections = 0;
		this.numTests = 0;
		if (args.length === 1) {
			let [li] = args;
			this.li = li;
		}
	}
	get interfaces_() {
		return [SegmentIntersector$1];
	}
	static isAdjacentSegments(i1, i2) {
		return Math.abs(i1 - i2) === 1;
	}
	isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1) {
			if (this.li.getIntersectionNum() === 1) {
				if (IntersectionAdder.isAdjacentSegments(segIndex0, segIndex1)) return true;
				if (e0.isClosed()) {
					var maxSegIndex = e0.size() - 1;
					if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) {
						return true;
					}
				}
			}
		}
		return false;
	}
	getProperIntersectionPoint() {
		return this.properIntersectionPoint;
	}
	hasProperInteriorIntersection() {
		return this.hasProperInterior;
	}
	getLineIntersector() {
		return this.li;
	}
	hasProperIntersection() {
		return this.hasProper;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		this.numTests++;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			this.numIntersections++;
			if (this.li.isInteriorIntersection()) {
				this.numInteriorIntersections++;
				this.hasInterior = true;
			}
			if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
				this._hasIntersection = true;
				e0.addIntersections(this.li, segIndex0, 0);
				e1.addIntersections(this.li, segIndex1, 1);
				if (this.li.isProper()) {
					this.numProperIntersections++;
					this.hasProper = true;
					this.hasProperInterior = true;
				}
			}
		}
	}
	hasIntersection() {
		return this._hasIntersection;
	}
	isDone() {
		return false;
	}
	hasInteriorIntersection() {
		return this.hasInterior;
	}
	getClass() {
		return IntersectionAdder;
	}
}

class BufferBuilder {
	constructor(...args) {
		this.bufParams = null;
		this.workingPrecisionModel = null;
		this.workingNoder = null;
		this.geomFact = null;
		this.graph = null;
		this.edgeList = new EdgeList();
		if (args.length === 1) {
			let [bufParams] = args;
			this.bufParams = bufParams;
		}
	}
	get interfaces_() {
		return [];
	}
	static depthDelta(label) {
		var lLoc = label.getLocation(0, Position.LEFT);
		var rLoc = label.getLocation(0, Position.RIGHT);
		if (lLoc === Location.INTERIOR && rLoc === Location.EXTERIOR) return 1; else if (lLoc === Location.EXTERIOR && rLoc === Location.INTERIOR) return -1;
		return 0;
	}
	static convertSegStrings(it) {
		var fact = new GeometryFactory();
		var lines = new ArrayList();
		while (it.hasNext()) {
			var ss = it.next();
			var line = fact.createLineString(ss.getCoordinates());
			lines.add(line);
		}
		return fact.buildGeometry(lines);
	}
	setWorkingPrecisionModel(pm) {
		this.workingPrecisionModel = pm;
	}
	insertUniqueEdge(e) {
		var existingEdge = this.edgeList.findEqualEdge(e);
		if (existingEdge !== null) {
			var existingLabel = existingEdge.getLabel();
			var labelToMerge = e.getLabel();
			if (!existingEdge.isPointwiseEqual(e)) {
				labelToMerge = new Label(e.getLabel());
				labelToMerge.flip();
			}
			existingLabel.merge(labelToMerge);
			var mergeDelta = BufferBuilder.depthDelta(labelToMerge);
			var existingDelta = existingEdge.getDepthDelta();
			var newDelta = existingDelta + mergeDelta;
			existingEdge.setDepthDelta(newDelta);
		} else {
			this.edgeList.add(e);
			e.setDepthDelta(BufferBuilder.depthDelta(e.getLabel()));
		}
	}
	buildSubgraphs(subgraphList, polyBuilder) {
		var processedGraphs = new ArrayList();
		for (var i = subgraphList.iterator(); i.hasNext(); ) {
			var subgraph = i.next();
			var p = subgraph.getRightmostCoordinate();
			var locater = new SubgraphDepthLocater(processedGraphs);
			var outsideDepth = locater.getDepth(p);
			subgraph.computeDepth(outsideDepth);
			subgraph.findResultEdges();
			processedGraphs.add(subgraph);
			polyBuilder.add(subgraph.getDirectedEdges(), subgraph.getNodes());
		}
	}
	createSubgraphs(graph) {
		var subgraphList = new ArrayList();
		for (var i = graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (!node.isVisited()) {
				var subgraph = new BufferSubgraph();
				subgraph.create(node);
				subgraphList.add(subgraph);
			}
		}
		Collections.sort(subgraphList, Collections.reverseOrder());
		return subgraphList;
	}
	createEmptyResultGeometry() {
		var emptyGeom = this.geomFact.createPolygon();
		return emptyGeom;
	}
	getNoder(precisionModel) {
		if (this.workingNoder !== null) return this.workingNoder;
		var noder = new MCIndexNoder();
		var li = new RobustLineIntersector();
		li.setPrecisionModel(precisionModel);
		noder.setSegmentIntersector(new IntersectionAdder(li));
		return noder;
	}
	buffer(g, distance) {
		var precisionModel = this.workingPrecisionModel;
		if (precisionModel === null) precisionModel = g.getPrecisionModel();
		this.geomFact = g.getFactory();
		var curveBuilder = new OffsetCurveBuilder(precisionModel, this.bufParams);
		var curveSetBuilder = new OffsetCurveSetBuilder(g, distance, curveBuilder);
		var bufferSegStrList = curveSetBuilder.getCurves();
		if (bufferSegStrList.size() <= 0) {
			return this.createEmptyResultGeometry();
		}
		this.computeNodedEdges(bufferSegStrList, precisionModel);
		this.graph = new PlanarGraph(new OverlayNodeFactory());
		this.graph.addEdges(this.edgeList.getEdges());
		var subgraphList = this.createSubgraphs(this.graph);
		var polyBuilder = new PolygonBuilder(this.geomFact);
		this.buildSubgraphs(subgraphList, polyBuilder);
		var resultPolyList = polyBuilder.getPolygons();
		if (resultPolyList.size() <= 0) {
			return this.createEmptyResultGeometry();
		}
		var resultGeom = this.geomFact.buildGeometry(resultPolyList);
		return resultGeom;
	}
	computeNodedEdges(bufferSegStrList, precisionModel) {
		var noder = this.getNoder(precisionModel);
		noder.computeNodes(bufferSegStrList);
		var nodedSegStrings = noder.getNodedSubstrings();
		for (var i = nodedSegStrings.iterator(); i.hasNext(); ) {
			var segStr = i.next();
			var pts = segStr.getCoordinates();
			if (pts.length === 2 && pts[0].equals2D(pts[1])) continue;
			var oldLabel = segStr.getData();
			var edge = new Edge(segStr.getCoordinates(), new Label(oldLabel));
			this.insertUniqueEdge(edge);
		}
	}
	setNoder(noder) {
		this.workingNoder = noder;
	}
	getClass() {
		return BufferBuilder;
	}
}

class ScaledNoder {
	constructor(...args) {
		this.noder = null;
		this.scaleFactor = null;
		this.offsetX = null;
		this.offsetY = null;
		this.isScaled = false;
		const overloaded = (...args) => {
			if (args.length === 2) {
				let [noder, scaleFactor] = args;
				overloaded.call(this, noder, scaleFactor, 0, 0);
			} else if (args.length === 4) {
				let [noder, scaleFactor, offsetX, offsetY] = args;
				this.noder = noder;
				this.scaleFactor = scaleFactor;
				this.isScaled = !this.isIntegerPrecision();
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Noder];
	}
	rescale(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [segStrings] = args;
				for (var i = segStrings.iterator(); i.hasNext(); ) {
					var ss = i.next();
					this.rescale(ss.getCoordinates());
				}
			} else if (args[0] instanceof Array) {
				let [pts] = args;
				var p0 = null;
				var p1 = null;
				if (pts.length === 2) {
					p0 = new Coordinate(pts[0]);
					p1 = new Coordinate(pts[1]);
				}
				for (var i = 0; i < pts.length; i++) {
					pts[i].x = pts[i].x / this.scaleFactor + this.offsetX;
					pts[i].y = pts[i].y / this.scaleFactor + this.offsetY;
				}
				if (pts.length === 2 && pts[0].equals2D(pts[1])) {
					System.out.println(pts);
				}
			}
		}
	}
	scale(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [segStrings] = args;
				var nodedSegmentStrings = new ArrayList();
				for (var i = segStrings.iterator(); i.hasNext(); ) {
					var ss = i.next();
					nodedSegmentStrings.add(new NodedSegmentString(this.scale(ss.getCoordinates()), ss.getData()));
				}
				return nodedSegmentStrings;
			} else if (args[0] instanceof Array) {
				let [pts] = args;
				var roundPts = new Array(pts.length);
				for (var i = 0; i < pts.length; i++) {
					roundPts[i] = new Coordinate(Math.round((pts[i].x - this.offsetX) * this.scaleFactor), Math.round((pts[i].y - this.offsetY) * this.scaleFactor), pts[i].z);
				}
				var roundPtsNoDup = CoordinateArrays.removeRepeatedPoints(roundPts);
				return roundPtsNoDup;
			}
		}
	}
	isIntegerPrecision() {
		return this.scaleFactor === 1.0;
	}
	getNodedSubstrings() {
		var splitSS = this.noder.getNodedSubstrings();
		if (this.isScaled) this.rescale(splitSS);
		return splitSS;
	}
	computeNodes(inputSegStrings) {
		var intSegStrings = inputSegStrings;
		if (this.isScaled) intSegStrings = this.scale(inputSegStrings);
		this.noder.computeNodes(intSegStrings);
	}
	getClass() {
		return ScaledNoder;
	}
}

class NodingValidator {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.segStrings = null;
		if (args.length === 1) {
			let [segStrings] = args;
			this.segStrings = segStrings;
		}
	}
	get interfaces_() {
		return [];
	}
	checkEndPtVertexIntersections(...args) {
		if (args.length === 0) {
			let [] = args;
			for (var i = this.segStrings.iterator(); i.hasNext(); ) {
				var ss = i.next();
				var pts = ss.getCoordinates();
				this.checkEndPtVertexIntersections(pts[0], this.segStrings);
				this.checkEndPtVertexIntersections(pts[pts.length - 1], this.segStrings);
			}
		} else if (args.length === 2) {
			let [testPt, segStrings] = args;
			for (var i = segStrings.iterator(); i.hasNext(); ) {
				var ss = i.next();
				var pts = ss.getCoordinates();
				for (var j = 1; j < pts.length - 1; j++) {
					if (pts[j].equals(testPt)) throw new RuntimeException("found endpt/interior pt intersection at index " + j + " :pt " + testPt);
				}
			}
		}
	}
	checkInteriorIntersections(...args) {
		if (args.length === 0) {
			let [] = args;
			for (var i = this.segStrings.iterator(); i.hasNext(); ) {
				var ss0 = i.next();
				for (var j = this.segStrings.iterator(); j.hasNext(); ) {
					var ss1 = j.next();
					this.checkInteriorIntersections(ss0, ss1);
				}
			}
		} else if (args.length === 2) {
			let [ss0, ss1] = args;
			var pts0 = ss0.getCoordinates();
			var pts1 = ss1.getCoordinates();
			for (var i0 = 0; i0 < pts0.length - 1; i0++) {
				for (var i1 = 0; i1 < pts1.length - 1; i1++) {
					this.checkInteriorIntersections(ss0, i0, ss1, i1);
				}
			}
		} else if (args.length === 4) {
			let [e0, segIndex0, e1, segIndex1] = args;
			if (e0 === e1 && segIndex0 === segIndex1) return null;
			var p00 = e0.getCoordinates()[segIndex0];
			var p01 = e0.getCoordinates()[segIndex0 + 1];
			var p10 = e1.getCoordinates()[segIndex1];
			var p11 = e1.getCoordinates()[segIndex1 + 1];
			this.li.computeIntersection(p00, p01, p10, p11);
			if (this.li.hasIntersection()) {
				if (this.li.isProper() || this.hasInteriorIntersection(this.li, p00, p01) || this.hasInteriorIntersection(this.li, p10, p11)) {
					throw new RuntimeException("found non-noded intersection at " + p00 + "-" + p01 + " and " + p10 + "-" + p11);
				}
			}
		}
	}
	checkValid() {
		this.checkEndPtVertexIntersections();
		this.checkInteriorIntersections();
		this.checkCollapses();
	}
	checkCollapses(...args) {
		if (args.length === 0) {
			let [] = args;
			for (var i = this.segStrings.iterator(); i.hasNext(); ) {
				var ss = i.next();
				this.checkCollapses(ss);
			}
		} else if (args.length === 1) {
			let [ss] = args;
			var pts = ss.getCoordinates();
			for (var i = 0; i < pts.length - 2; i++) {
				this.checkCollapse(pts[i], pts[i + 1], pts[i + 2]);
			}
		}
	}
	hasInteriorIntersection(li, p0, p1) {
		for (var i = 0; i < li.getIntersectionNum(); i++) {
			var intPt = li.getIntersection(i);
			if (!(intPt.equals(p0) || intPt.equals(p1))) return true;
		}
		return false;
	}
	checkCollapse(p0, p1, p2) {
		if (p0.equals(p2)) throw new RuntimeException("found non-noded collapse at " + NodingValidator.fact.createLineString([p0, p1, p2]));
	}
	getClass() {
		return NodingValidator;
	}
}
NodingValidator.fact = new GeometryFactory();

class HotPixel {
	constructor(...args) {
		this.li = null;
		this.pt = null;
		this.originalPt = null;
		this.ptScaled = null;
		this.p0Scaled = null;
		this.p1Scaled = null;
		this.scaleFactor = null;
		this.minx = null;
		this.maxx = null;
		this.miny = null;
		this.maxy = null;
		this.corner = new Array(4);
		this.safeEnv = null;
		if (args.length === 3) {
			let [pt, scaleFactor, li] = args;
			this.originalPt = pt;
			this.pt = pt;
			this.scaleFactor = scaleFactor;
			this.li = li;
			if (scaleFactor <= 0) throw new IllegalArgumentException$1("Scale factor must be non-zero");
			if (scaleFactor !== 1.0) {
				this.pt = new Coordinate(this.scale(pt.x), this.scale(pt.y));
				this.p0Scaled = new Coordinate();
				this.p1Scaled = new Coordinate();
			}
			this.initCorners(this.pt);
		}
	}
	get interfaces_() {
		return [];
	}
	intersectsScaled(p0, p1) {
		var segMinx = Math.min(p0.x, p1.x);
		var segMaxx = Math.max(p0.x, p1.x);
		var segMiny = Math.min(p0.y, p1.y);
		var segMaxy = Math.max(p0.y, p1.y);
		var isOutsidePixelEnv = this.maxx < segMinx || this.minx > segMaxx || this.maxy < segMiny || this.miny > segMaxy;
		if (isOutsidePixelEnv) return false;
		var intersects = this.intersectsToleranceSquare(p0, p1);
		Assert.isTrue(!(isOutsidePixelEnv && intersects), "Found bad envelope test");
		return intersects;
	}
	initCorners(pt) {
		var tolerance = 0.5;
		this.minx = pt.x - tolerance;
		this.maxx = pt.x + tolerance;
		this.miny = pt.y - tolerance;
		this.maxy = pt.y + tolerance;
		this.corner[0] = new Coordinate(this.maxx, this.maxy);
		this.corner[1] = new Coordinate(this.minx, this.maxy);
		this.corner[2] = new Coordinate(this.minx, this.miny);
		this.corner[3] = new Coordinate(this.maxx, this.miny);
	}
	intersects(p0, p1) {
		if (this.scaleFactor === 1.0) return this.intersectsScaled(p0, p1);
		this.copyScaled(p0, this.p0Scaled);
		this.copyScaled(p1, this.p1Scaled);
		return this.intersectsScaled(this.p0Scaled, this.p1Scaled);
	}
	scale(val) {
		return Math.round(val * this.scaleFactor);
	}
	getCoordinate() {
		return this.originalPt;
	}
	copyScaled(p, pScaled) {
		pScaled.x = this.scale(p.x);
		pScaled.y = this.scale(p.y);
	}
	getSafeEnvelope() {
		if (this.safeEnv === null) {
			var safeTolerance = HotPixel.SAFE_ENV_EXPANSION_FACTOR / this.scaleFactor;
			this.safeEnv = new Envelope(this.originalPt.x - safeTolerance, this.originalPt.x + safeTolerance, this.originalPt.y - safeTolerance, this.originalPt.y + safeTolerance);
		}
		return this.safeEnv;
	}
	intersectsPixelClosure(p0, p1) {
		this.li.computeIntersection(p0, p1, this.corner[0], this.corner[1]);
		if (this.li.hasIntersection()) return true;
		this.li.computeIntersection(p0, p1, this.corner[1], this.corner[2]);
		if (this.li.hasIntersection()) return true;
		this.li.computeIntersection(p0, p1, this.corner[2], this.corner[3]);
		if (this.li.hasIntersection()) return true;
		this.li.computeIntersection(p0, p1, this.corner[3], this.corner[0]);
		if (this.li.hasIntersection()) return true;
		return false;
	}
	intersectsToleranceSquare(p0, p1) {
		var intersectsLeft = false;
		var intersectsBottom = false;
		this.li.computeIntersection(p0, p1, this.corner[0], this.corner[1]);
		if (this.li.isProper()) return true;
		this.li.computeIntersection(p0, p1, this.corner[1], this.corner[2]);
		if (this.li.isProper()) return true;
		if (this.li.hasIntersection()) intersectsLeft = true;
		this.li.computeIntersection(p0, p1, this.corner[2], this.corner[3]);
		if (this.li.isProper()) return true;
		if (this.li.hasIntersection()) intersectsBottom = true;
		this.li.computeIntersection(p0, p1, this.corner[3], this.corner[0]);
		if (this.li.isProper()) return true;
		if (intersectsLeft && intersectsBottom) return true;
		if (p0.equals(this.pt)) return true;
		if (p1.equals(this.pt)) return true;
		return false;
	}
	addSnappedNode(segStr, segIndex) {
		var p0 = segStr.getCoordinate(segIndex);
		var p1 = segStr.getCoordinate(segIndex + 1);
		if (this.intersects(p0, p1)) {
			segStr.addIntersection(this.getCoordinate(), segIndex);
			return true;
		}
		return false;
	}
	getClass() {
		return HotPixel;
	}
}
HotPixel.SAFE_ENV_EXPANSION_FACTOR = 0.75;

class MonotoneChainSelectAction {
	constructor(...args) {
		this.tempEnv1 = new Envelope();
		this.selectedSegment = new LineSegment();
	}
	get interfaces_() {
		return [];
	}
	select(...args) {
		if (args.length === 1) {
			let [seg] = args;
		} else if (args.length === 2) {
			let [mc, startIndex] = args;
			mc.getLineSegment(startIndex, this.selectedSegment);
			this.select(this.selectedSegment);
		}
	}
	getClass() {
		return MonotoneChainSelectAction;
	}
}

class MCIndexPointSnapper {
	constructor(...args) {
		this.index = null;
		if (args.length === 1) {
			let [index] = args;
			this.index = index;
		}
	}
	get interfaces_() {
		return [];
	}
	static get HotPixelSnapAction() {
		return HotPixelSnapAction;
	}
	snap(...args) {
		if (args.length === 1) {
			let [hotPixel] = args;
			return this.snap(hotPixel, null, -1);
		} else if (args.length === 3) {
			let [hotPixel, parentEdge, hotPixelVertexIndex] = args;
			var pixelEnv = hotPixel.getSafeEnvelope();
			var hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex);
			this.index.query(pixelEnv, new (class {
				visitItem(item) {
					var testChain = item;
					testChain.select(pixelEnv, hotPixelSnapAction);
				}
				get interfaces_() {
					return [ItemVisitor];
				}
			})());
			return hotPixelSnapAction.isNodeAdded();
		}
	}
	getClass() {
		return MCIndexPointSnapper;
	}
}
class HotPixelSnapAction extends MonotoneChainSelectAction {
	constructor(...args) {
		super();
		this.hotPixel = null;
		this.parentEdge = null;
		this.hotPixelVertexIndex = null;
		this._isNodeAdded = false;
		if (args.length === 3) {
			let [hotPixel, parentEdge, hotPixelVertexIndex] = args;
			this.hotPixel = hotPixel;
			this.parentEdge = parentEdge;
			this.hotPixelVertexIndex = hotPixelVertexIndex;
		}
	}
	get interfaces_() {
		return [];
	}
	isNodeAdded() {
		return this._isNodeAdded;
	}
	select(...args) {
		if (args.length === 2) {
			let [mc, startIndex] = args;
			var ss = mc.getContext();
			if (this.parentEdge !== null) {
				if (ss === this.parentEdge && startIndex === this.hotPixelVertexIndex) return null;
			}
			this._isNodeAdded = this.hotPixel.addSnappedNode(ss, startIndex);
		} else return super.select(...args);
	}
	getClass() {
		return HotPixelSnapAction;
	}
}

class InteriorIntersectionFinderAdder {
	constructor(...args) {
		this.li = null;
		this.interiorIntersections = null;
		if (args.length === 1) {
			let [li] = args;
			this.li = li;
			this.interiorIntersections = new ArrayList();
		}
	}
	get interfaces_() {
		return [SegmentIntersector$1];
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			if (this.li.isInteriorIntersection()) {
				for (var intIndex = 0; intIndex < this.li.getIntersectionNum(); intIndex++) {
					this.interiorIntersections.add(this.li.getIntersection(intIndex));
				}
				e0.addIntersections(this.li, segIndex0, 0);
				e1.addIntersections(this.li, segIndex1, 1);
			}
		}
	}
	isDone() {
		return false;
	}
	getInteriorIntersections() {
		return this.interiorIntersections;
	}
	getClass() {
		return InteriorIntersectionFinderAdder;
	}
}

class MCIndexSnapRounder {
	constructor(...args) {
		this.pm = null;
		this.li = null;
		this.scaleFactor = null;
		this.noder = null;
		this.pointSnapper = null;
		this.nodedSegStrings = null;
		if (args.length === 1) {
			let [pm] = args;
			this.pm = pm;
			this.li = new RobustLineIntersector();
			this.li.setPrecisionModel(pm);
			this.scaleFactor = pm.getScale();
		}
	}
	get interfaces_() {
		return [Noder];
	}
	checkCorrectness(inputSegmentStrings) {
		var resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings);
		var nv = new NodingValidator(resultSegStrings);
		try {
			nv.checkValid();
		} catch (ex) {
			if (ex instanceof Exception) {
				ex.printStackTrace();
			} else throw ex;
		} finally {}
	}
	getNodedSubstrings() {
		return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);
	}
	snapRound(segStrings, li) {
		var intersections = this.findInteriorIntersections(segStrings, li);
		this.computeIntersectionSnaps(intersections);
		this.computeVertexSnaps(segStrings);
	}
	findInteriorIntersections(segStrings, li) {
		var intFinderAdder = new InteriorIntersectionFinderAdder(li);
		this.noder.setSegmentIntersector(intFinderAdder);
		this.noder.computeNodes(segStrings);
		return intFinderAdder.getInteriorIntersections();
	}
	computeVertexSnaps(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [edges] = args;
				for (var i0 = edges.iterator(); i0.hasNext(); ) {
					var edge0 = i0.next();
					this.computeVertexSnaps(edge0);
				}
			} else if (args[0] instanceof NodedSegmentString) {
				let [e] = args;
				var pts0 = e.getCoordinates();
				for (var i = 0; i < pts0.length; i++) {
					var hotPixel = new HotPixel(pts0[i], this.scaleFactor, this.li);
					var isNodeAdded = this.pointSnapper.snap(hotPixel, e, i);
					if (isNodeAdded) {
						e.addIntersection(pts0[i], i);
					}
				}
			}
		}
	}
	computeNodes(inputSegmentStrings) {
		this.nodedSegStrings = inputSegmentStrings;
		this.noder = new MCIndexNoder();
		this.pointSnapper = new MCIndexPointSnapper(this.noder.getIndex());
		this.snapRound(inputSegmentStrings, this.li);
	}
	computeIntersectionSnaps(snapPts) {
		for (var it = snapPts.iterator(); it.hasNext(); ) {
			var snapPt = it.next();
			var hotPixel = new HotPixel(snapPt, this.scaleFactor, this.li);
			this.pointSnapper.snap(hotPixel);
		}
	}
	getClass() {
		return MCIndexSnapRounder;
	}
}

class BufferOp$1 {
	constructor(...args) {
		this.argGeom = null;
		this.distance = null;
		this.bufParams = new BufferParameters();
		this.resultGeometry = null;
		this.saveException = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [g] = args;
				this.argGeom = g;
			} else if (args.length === 2) {
				let [g, bufParams] = args;
				this.argGeom = g;
				this.bufParams = bufParams;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static bufferOp(...args) {
		if (args.length === 2) {
			let [g, distance] = args;
			var gBuf = new BufferOp$1(g);
			var geomBuf = gBuf.getResultGeometry(distance);
			return geomBuf;
		} else if (args.length === 3) {
			if (Number.isInteger(args[2]) && (args[0] instanceof Geometry && typeof args[1] === "number")) {
				let [g, distance, quadrantSegments] = args;
				var bufOp = new BufferOp$1(g);
				bufOp.setQuadrantSegments(quadrantSegments);
				var geomBuf = bufOp.getResultGeometry(distance);
				return geomBuf;
			} else if (args[2] instanceof BufferParameters && (args[0] instanceof Geometry && typeof args[1] === "number")) {
				let [g, distance, params] = args;
				var bufOp = new BufferOp$1(g, params);
				var geomBuf = bufOp.getResultGeometry(distance);
				return geomBuf;
			}
		} else if (args.length === 4) {
			let [g, distance, quadrantSegments, endCapStyle] = args;
			var bufOp = new BufferOp$1(g);
			bufOp.setQuadrantSegments(quadrantSegments);
			bufOp.setEndCapStyle(endCapStyle);
			var geomBuf = bufOp.getResultGeometry(distance);
			return geomBuf;
		}
	}
	static precisionScaleFactor(g, distance, maxPrecisionDigits) {
		var env = g.getEnvelopeInternal();
		var envMax = MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()));
		var expandByDistance = distance > 0.0 ? distance : 0.0;
		var bufEnvMax = envMax + 2 * expandByDistance;
		var bufEnvPrecisionDigits = Math.trunc(Math.log(bufEnvMax) / Math.log(10) + 1.0);
		var minUnitLog10 = maxPrecisionDigits - bufEnvPrecisionDigits;
		var scaleFactor = Math.pow(10.0, minUnitLog10);
		return scaleFactor;
	}
	bufferFixedPrecision(fixedPM) {
		var noder = new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1.0)), fixedPM.getScale());
		var bufBuilder = new BufferBuilder(this.bufParams);
		bufBuilder.setWorkingPrecisionModel(fixedPM);
		bufBuilder.setNoder(noder);
		this.resultGeometry = bufBuilder.buffer(this.argGeom, this.distance);
	}
	bufferReducedPrecision(...args) {
		if (args.length === 0) {
			let [] = args;
			for (var precDigits = BufferOp$1.MAX_PRECISION_DIGITS; precDigits >= 0; precDigits--) {
				try {
					this.bufferReducedPrecision(precDigits);
				} catch (ex) {
					if (ex instanceof TopologyException) {
						this.saveException = ex;
					} else throw ex;
				} finally {}
				if (this.resultGeometry !== null) return null;
			}
			throw this.saveException;
		} else if (args.length === 1) {
			let [precisionDigits] = args;
			var sizeBasedScaleFactor = BufferOp$1.precisionScaleFactor(this.argGeom, this.distance, precisionDigits);
			var fixedPM = new PrecisionModel(sizeBasedScaleFactor);
			this.bufferFixedPrecision(fixedPM);
		}
	}
	computeGeometry() {
		this.bufferOriginalPrecision();
		if (this.resultGeometry !== null) return null;
		var argPM = this.argGeom.getFactory().getPrecisionModel();
		if (argPM.getType() === PrecisionModel.FIXED) this.bufferFixedPrecision(argPM); else this.bufferReducedPrecision();
	}
	setQuadrantSegments(quadrantSegments) {
		this.bufParams.setQuadrantSegments(quadrantSegments);
	}
	bufferOriginalPrecision() {
		try {
			var bufBuilder = new BufferBuilder(this.bufParams);
			this.resultGeometry = bufBuilder.buffer(this.argGeom, this.distance);
		} catch (ex) {
			if (ex instanceof RuntimeException) {
				this.saveException = ex;
			} else throw ex;
		} finally {}
	}
	getResultGeometry(distance) {
		this.distance = distance;
		this.computeGeometry();
		return this.resultGeometry;
	}
	setEndCapStyle(endCapStyle) {
		this.bufParams.setEndCapStyle(endCapStyle);
	}
	getClass() {
		return BufferOp$1;
	}
}
BufferOp$1.CAP_ROUND = BufferParameters.CAP_ROUND;
BufferOp$1.CAP_BUTT = BufferParameters.CAP_FLAT;
BufferOp$1.CAP_FLAT = BufferParameters.CAP_FLAT;
BufferOp$1.CAP_SQUARE = BufferParameters.CAP_SQUARE;
BufferOp$1.MAX_PRECISION_DIGITS = 12;

class PolygonExtracter {
	constructor(...args) {
		this.comps = null;
		if (args.length === 1) {
			let [comps] = args;
			this.comps = comps;
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getPolygons(...args) {
		if (args.length === 1) {
			let [geom] = args;
			return PolygonExtracter.getPolygons(geom, new ArrayList());
		} else if (args.length === 2) {
			let [geom, list] = args;
			if (geom instanceof Polygon) {
				list.add(geom);
			} else if (geom instanceof GeometryCollection) {
				geom.apply(new PolygonExtracter(list));
			}
			return list;
		}
	}
	filter(geom) {
		if (geom instanceof Polygon) this.comps.add(geom);
	}
	getClass() {
		return PolygonExtracter;
	}
}

class GeometryLocation {
	constructor(...args) {
		this.component = null;
		this.segIndex = null;
		this.pt = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				let [component, pt] = args;
				overloaded.call(this, component, GeometryLocation.INSIDE_AREA, pt);
			} else if (args.length === 3) {
				let [component, segIndex, pt] = args;
				this.component = component;
				this.segIndex = segIndex;
				this.pt = pt;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	isInsideArea() {
		return this.segIndex === GeometryLocation.INSIDE_AREA;
	}
	getCoordinate() {
		return this.pt;
	}
	getGeometryComponent() {
		return this.component;
	}
	getSegmentIndex() {
		return this.segIndex;
	}
	getClass() {
		return GeometryLocation;
	}
}
GeometryLocation.INSIDE_AREA = -1;

class PointExtracter {
	constructor(...args) {
		this.pts = null;
		if (args.length === 1) {
			let [pts] = args;
			this.pts = pts;
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getPoints(...args) {
		if (args.length === 1) {
			let [geom] = args;
			if (geom instanceof Point) {
				return Collections.singletonList(geom);
			}
			return PointExtracter.getPoints(geom, new ArrayList());
		} else if (args.length === 2) {
			let [geom, list] = args;
			if (geom instanceof Point) {
				list.add(geom);
			} else if (geom instanceof GeometryCollection) {
				geom.apply(new PointExtracter(list));
			}
			return list;
		}
	}
	filter(geom) {
		if (geom instanceof Point) this.pts.add(geom);
	}
	getClass() {
		return PointExtracter;
	}
}

class ConnectedElementLocationFilter {
	constructor(...args) {
		this.locations = null;
		if (args.length === 1) {
			let [locations] = args;
			this.locations = locations;
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static getLocations(geom) {
		var locations = new ArrayList();
		geom.apply(new ConnectedElementLocationFilter(locations));
		return locations;
	}
	filter(geom) {
		if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) this.locations.add(new GeometryLocation(geom, 0, geom.getCoordinate()));
	}
	getClass() {
		return ConnectedElementLocationFilter;
	}
}

class DistanceOp$1 {
	constructor(...args) {
		this.geom = null;
		this.terminateDistance = 0.0;
		this.ptLocator = new PointLocator();
		this.minDistanceLocation = null;
		this.minDistance = Double.MAX_VALUE;
		const overloaded = (...args) => {
			if (args.length === 2) {
				let [g0, g1] = args;
				overloaded.call(this, g0, g1, 0.0);
			} else if (args.length === 3) {
				let [g0, g1, terminateDistance] = args;
				this.geom = new Array(2);
				this.geom[0] = g0;
				this.geom[1] = g1;
				this.terminateDistance = terminateDistance;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static distance(g0, g1) {
		var distOp = new DistanceOp$1(g0, g1);
		return distOp.distance();
	}
	static isWithinDistance(g0, g1, distance) {
		var distOp = new DistanceOp$1(g0, g1, distance);
		return distOp.distance() <= distance;
	}
	static nearestPoints(g0, g1) {
		var distOp = new DistanceOp$1(g0, g1);
		return distOp.nearestPoints();
	}
	computeContainmentDistance(...args) {
		if (args.length === 0) {
			let [] = args;
			var locPtPoly = new Array(2);
			this.computeContainmentDistance(0, locPtPoly);
			if (this.minDistance <= this.terminateDistance) return null;
			this.computeContainmentDistance(1, locPtPoly);
		} else if (args.length === 2) {
			let [polyGeomIndex, locPtPoly] = args;
			var locationsIndex = 1 - polyGeomIndex;
			var polys = PolygonExtracter.getPolygons(this.geom[polyGeomIndex]);
			if (polys.size() > 0) {
				var insideLocs = ConnectedElementLocationFilter.getLocations(this.geom[locationsIndex]);
				this.computeContainmentDistance(insideLocs, polys, locPtPoly);
				if (this.minDistance <= this.terminateDistance) {
					this.minDistanceLocation[locationsIndex] = locPtPoly[0];
					this.minDistanceLocation[polyGeomIndex] = locPtPoly[1];
					return null;
				}
			}
		} else if (args.length === 3) {
			if (args[2] instanceof Array && (args[0].interfaces_ && args[0].interfaces_.indexOf(List) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(List) > -1))) {
				let [locs, polys, locPtPoly] = args;
				for (var i = 0; i < locs.size(); i++) {
					var loc = locs.get(i);
					for (var j = 0; j < polys.size(); j++) {
						this.computeContainmentDistance(loc, polys.get(j), locPtPoly);
						if (this.minDistance <= this.terminateDistance) return null;
					}
				}
			} else if (args[2] instanceof Array && (args[0] instanceof GeometryLocation && args[1] instanceof Polygon)) {
				let [ptLoc, poly, locPtPoly] = args;
				var pt = ptLoc.getCoordinate();
				if (Location.EXTERIOR !== this.ptLocator.locate(pt, poly)) {
					this.minDistance = 0.0;
					locPtPoly[0] = ptLoc;
					locPtPoly[1] = new GeometryLocation(poly, pt);
					;
					return null;
				}
			}
		}
	}
	computeMinDistanceLinesPoints(lines, points, locGeom) {
		for (var i = 0; i < lines.size(); i++) {
			var line = lines.get(i);
			for (var j = 0; j < points.size(); j++) {
				var pt = points.get(j);
				this.computeMinDistance(line, pt, locGeom);
				if (this.minDistance <= this.terminateDistance) return null;
			}
		}
	}
	computeFacetDistance() {
		var locGeom = new Array(2);
		var lines0 = LinearComponentExtracter.getLines(this.geom[0]);
		var lines1 = LinearComponentExtracter.getLines(this.geom[1]);
		var pts0 = PointExtracter.getPoints(this.geom[0]);
		var pts1 = PointExtracter.getPoints(this.geom[1]);
		this.computeMinDistanceLines(lines0, lines1, locGeom);
		this.updateMinDistance(locGeom, false);
		if (this.minDistance <= this.terminateDistance) return null;
		locGeom[0] = null;
		locGeom[1] = null;
		this.computeMinDistanceLinesPoints(lines0, pts1, locGeom);
		this.updateMinDistance(locGeom, false);
		if (this.minDistance <= this.terminateDistance) return null;
		locGeom[0] = null;
		locGeom[1] = null;
		this.computeMinDistanceLinesPoints(lines1, pts0, locGeom);
		this.updateMinDistance(locGeom, true);
		if (this.minDistance <= this.terminateDistance) return null;
		locGeom[0] = null;
		locGeom[1] = null;
		this.computeMinDistancePoints(pts0, pts1, locGeom);
		this.updateMinDistance(locGeom, false);
	}
	nearestLocations() {
		this.computeMinDistance();
		return this.minDistanceLocation;
	}
	updateMinDistance(locGeom, flip) {
		if (locGeom[0] === null) return null;
		if (flip) {
			this.minDistanceLocation[0] = locGeom[1];
			this.minDistanceLocation[1] = locGeom[0];
		} else {
			this.minDistanceLocation[0] = locGeom[0];
			this.minDistanceLocation[1] = locGeom[1];
		}
	}
	nearestPoints() {
		this.computeMinDistance();
		var nearestPts = [this.minDistanceLocation[0].getCoordinate(), this.minDistanceLocation[1].getCoordinate()];
		return nearestPts;
	}
	computeMinDistance(...args) {
		if (args.length === 0) {
			let [] = args;
			if (this.minDistanceLocation !== null) return null;
			this.minDistanceLocation = new Array(2);
			this.computeContainmentDistance();
			if (this.minDistance <= this.terminateDistance) return null;
			this.computeFacetDistance();
		} else if (args.length === 3) {
			if (args[2] instanceof Array && (args[0] instanceof LineString && args[1] instanceof Point)) {
				let [line, pt, locGeom] = args;
				if (line.getEnvelopeInternal().distance(pt.getEnvelopeInternal()) > this.minDistance) return null;
				var coord0 = line.getCoordinates();
				var coord = pt.getCoordinate();
				for (var i = 0; i < coord0.length - 1; i++) {
					var dist = CGAlgorithms.distancePointLine(coord, coord0[i], coord0[i + 1]);
					if (dist < this.minDistance) {
						this.minDistance = dist;
						var seg = new LineSegment(coord0[i], coord0[i + 1]);
						var segClosestPoint = seg.closestPoint(coord);
						locGeom[0] = new GeometryLocation(line, i, segClosestPoint);
						locGeom[1] = new GeometryLocation(pt, 0, coord);
					}
					if (this.minDistance <= this.terminateDistance) return null;
				}
			} else if (args[2] instanceof Array && (args[0] instanceof LineString && args[1] instanceof LineString)) {
				let [line0, line1, locGeom] = args;
				if (line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal()) > this.minDistance) return null;
				var coord0 = line0.getCoordinates();
				var coord1 = line1.getCoordinates();
				for (var i = 0; i < coord0.length - 1; i++) {
					for (var j = 0; j < coord1.length - 1; j++) {
						var dist = CGAlgorithms.distanceLineLine(coord0[i], coord0[i + 1], coord1[j], coord1[j + 1]);
						if (dist < this.minDistance) {
							this.minDistance = dist;
							var seg0 = new LineSegment(coord0[i], coord0[i + 1]);
							var seg1 = new LineSegment(coord1[j], coord1[j + 1]);
							var closestPt = seg0.closestPoints(seg1);
							locGeom[0] = new GeometryLocation(line0, i, closestPt[0]);
							locGeom[1] = new GeometryLocation(line1, j, closestPt[1]);
						}
						if (this.minDistance <= this.terminateDistance) return null;
					}
				}
			}
		}
	}
	computeMinDistancePoints(points0, points1, locGeom) {
		for (var i = 0; i < points0.size(); i++) {
			var pt0 = points0.get(i);
			for (var j = 0; j < points1.size(); j++) {
				var pt1 = points1.get(j);
				var dist = pt0.getCoordinate().distance(pt1.getCoordinate());
				if (dist < this.minDistance) {
					this.minDistance = dist;
					locGeom[0] = new GeometryLocation(pt0, 0, pt0.getCoordinate());
					locGeom[1] = new GeometryLocation(pt1, 0, pt1.getCoordinate());
				}
				if (this.minDistance <= this.terminateDistance) return null;
			}
		}
	}
	distance() {
		if (this.geom[0] === null || this.geom[1] === null) throw new IllegalArgumentException$1("null geometries are not supported");
		if (this.geom[0].isEmpty() || this.geom[1].isEmpty()) return 0.0;
		this.computeMinDistance();
		return this.minDistance;
	}
	computeMinDistanceLines(lines0, lines1, locGeom) {
		for (var i = 0; i < lines0.size(); i++) {
			var line0 = lines0.get(i);
			for (var j = 0; j < lines1.size(); j++) {
				var line1 = lines1.get(j);
				this.computeMinDistance(line0, line1, locGeom);
				if (this.minDistance <= this.terminateDistance) return null;
			}
		}
	}
	getClass() {
		return DistanceOp$1;
	}
}

class EdgeString {
	constructor(...args) {
		this.factory = null;
		this.directedEdges = new ArrayList();
		this.coordinates = null;
		if (args.length === 1) {
			let [factory] = args;
			this.factory = factory;
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinates() {
		if (this.coordinates === null) {
			var forwardDirectedEdges = 0;
			var reverseDirectedEdges = 0;
			var coordinateList = new CoordinateList();
			for (var i = this.directedEdges.iterator(); i.hasNext(); ) {
				var directedEdge = i.next();
				if (directedEdge.getEdgeDirection()) {
					forwardDirectedEdges++;
				} else {
					reverseDirectedEdges++;
				}
				coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection());
			}
			this.coordinates = coordinateList.toCoordinateArray();
			if (reverseDirectedEdges > forwardDirectedEdges) {
				CoordinateArrays.reverse(this.coordinates);
			}
		}
		return this.coordinates;
	}
	toLineString() {
		return this.factory.createLineString(this.getCoordinates());
	}
	add(directedEdge) {
		this.directedEdges.add(directedEdge);
	}
	getClass() {
		return EdgeString;
	}
}

class GraphComponent {
	constructor(...args) {
		this._isMarked = false;
		this._isVisited = false;
		this.data = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static getComponentWithVisitedState(i, visitedState) {
		while (i.hasNext()) {
			var comp = i.next();
			if (comp.isVisited() === visitedState) return comp;
		}
		return null;
	}
	static setVisited(i, visited) {
		while (i.hasNext()) {
			var comp = i.next();
			comp.setVisited(visited);
		}
	}
	static setMarked(i, marked) {
		while (i.hasNext()) {
			var comp = i.next();
			comp.setMarked(marked);
		}
	}
	setVisited(isVisited) {
		this._isVisited = isVisited;
	}
	isMarked() {
		return this._isMarked;
	}
	setData(data) {
		this.data = data;
	}
	getData() {
		return this.data;
	}
	setMarked(isMarked) {
		this._isMarked = isMarked;
	}
	getContext() {
		return this.data;
	}
	isVisited() {
		return this._isVisited;
	}
	setContext(data) {
		this.data = data;
	}
	getClass() {
		return GraphComponent;
	}
}

class DirectedEdge$1 extends GraphComponent {
	constructor(...args) {
		super();
		this.parentEdge = null;
		this.from = null;
		this.to = null;
		this.p0 = null;
		this.p1 = null;
		this.sym = null;
		this.edgeDirection = null;
		this.quadrant = null;
		this.angle = null;
		if (args.length === 4) {
			let [from, to, directionPt, edgeDirection] = args;
			this.from = from;
			this.to = to;
			this.edgeDirection = edgeDirection;
			this.p0 = from.getCoordinate();
			this.p1 = directionPt;
			var dx = this.p1.x - this.p0.x;
			var dy = this.p1.y - this.p0.y;
			this.quadrant = Quadrant.quadrant(dx, dy);
			this.angle = Math.atan2(dy, dx);
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	static toEdges(dirEdges) {
		var edges = new ArrayList();
		for (var i = dirEdges.iterator(); i.hasNext(); ) {
			edges.add(i.next().parentEdge);
		}
		return edges;
	}
	isRemoved() {
		return this.parentEdge === null;
	}
	compareDirection(e) {
		if (this.quadrant > e.quadrant) return 1;
		if (this.quadrant < e.quadrant) return -1;
		return CGAlgorithms.computeOrientation(e.p0, e.p1, this.p1);
	}
	getCoordinate() {
		return this.from.getCoordinate();
	}
	print(out) {
		var className = this.getClass().getName();
		var lastDotPos = className.lastIndexOf('.');
		var name = className.substring(lastDotPos + 1);
		out.print("  " + name + ": " + this.p0 + " - " + this.p1 + " " + this.quadrant + ":" + this.angle);
	}
	getDirectionPt() {
		return this.p1;
	}
	getAngle() {
		return this.angle;
	}
	compareTo(obj) {
		var de = obj;
		return this.compareDirection(de);
	}
	getFromNode() {
		return this.from;
	}
	getSym() {
		return this.sym;
	}
	setEdge(parentEdge) {
		this.parentEdge = parentEdge;
	}
	remove() {
		this.sym = null;
		this.parentEdge = null;
	}
	getEdge() {
		return this.parentEdge;
	}
	getQuadrant() {
		return this.quadrant;
	}
	setSym(sym) {
		this.sym = sym;
	}
	getToNode() {
		return this.to;
	}
	getEdgeDirection() {
		return this.edgeDirection;
	}
	getClass() {
		return DirectedEdge$1;
	}
}

class LineMergeDirectedEdge extends DirectedEdge$1 {
	constructor(...args) {
		super();
		if (args.length === 4) {
			let [from, to, directionPt, edgeDirection] = args;
			super(from, to, directionPt, edgeDirection);
		}
	}
	get interfaces_() {
		return [];
	}
	getNext() {
		if (this.getToNode().getDegree() !== 2) {
			return null;
		}
		if (this.getToNode().getOutEdges().getEdges().get(0) === this.getSym()) {
			return this.getToNode().getOutEdges().getEdges().get(1);
		}
		Assert.isTrue(this.getToNode().getOutEdges().getEdges().get(1) === this.getSym());
		return this.getToNode().getOutEdges().getEdges().get(0);
	}
	getClass() {
		return LineMergeDirectedEdge;
	}
}

class Edge$1 extends GraphComponent {
	constructor(...args) {
		super();
		this.dirEdge = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [de0, de1] = args;
					this.setDirectedEdges(de0, de1);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	isRemoved() {
		return this.dirEdge === null;
	}
	setDirectedEdges(de0, de1) {
		this.dirEdge = [de0, de1];
		de0.setEdge(this);
		de1.setEdge(this);
		de0.setSym(de1);
		de1.setSym(de0);
		de0.getFromNode().addOutEdge(de0);
		de1.getFromNode().addOutEdge(de1);
	}
	getDirEdge(...args) {
		if (args.length === 1) {
			if (Number.isInteger(args[0])) {
				let [i] = args;
				return this.dirEdge[i];
			} else if (args[0] instanceof Node) {
				let [fromNode] = args;
				if (this.dirEdge[0].getFromNode() === fromNode) return this.dirEdge[0];
				if (this.dirEdge[1].getFromNode() === fromNode) return this.dirEdge[1];
				return null;
			}
		}
	}
	remove() {
		this.dirEdge = null;
	}
	getOppositeNode(node) {
		if (this.dirEdge[0].getFromNode() === node) return this.dirEdge[0].getToNode();
		if (this.dirEdge[1].getFromNode() === node) return this.dirEdge[1].getToNode();
		return null;
	}
	getClass() {
		return Edge$1;
	}
}

class DirectedEdgeStar$1 {
	constructor(...args) {
		this.outEdges = new ArrayList();
		this.sorted = false;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	getNextEdge(dirEdge) {
		var i = this.getIndex(dirEdge);
		return this.outEdges.get(this.getIndex(i + 1));
	}
	getCoordinate() {
		var it = this.iterator();
		if (!it.hasNext()) return null;
		var e = it.next();
		return e.getCoordinate();
	}
	iterator() {
		this.sortEdges();
		return this.outEdges.iterator();
	}
	sortEdges() {
		if (!this.sorted) {
			Collections.sort(this.outEdges);
			this.sorted = true;
		}
	}
	remove(de) {
		this.outEdges.remove(de);
	}
	getEdges() {
		this.sortEdges();
		return this.outEdges;
	}
	getNextCWEdge(dirEdge) {
		var i = this.getIndex(dirEdge);
		return this.outEdges.get(this.getIndex(i - 1));
	}
	getIndex(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Edge$1) {
				let [edge] = args;
				this.sortEdges();
				for (var i = 0; i < this.outEdges.size(); i++) {
					var de = this.outEdges.get(i);
					if (de.getEdge() === edge) return i;
				}
				return -1;
			} else if (args[0] instanceof DirectedEdge$1) {
				let [dirEdge] = args;
				this.sortEdges();
				for (var i = 0; i < this.outEdges.size(); i++) {
					var de = this.outEdges.get(i);
					if (de === dirEdge) return i;
				}
				return -1;
			} else if (Number.isInteger(args[0])) {
				let [i] = args;
				var modi = i % this.outEdges.size();
				if (modi < 0) modi += this.outEdges.size();
				return modi;
			}
		}
	}
	add(de) {
		this.outEdges.add(de);
		this.sorted = false;
	}
	getDegree() {
		return this.outEdges.size();
	}
	getClass() {
		return DirectedEdgeStar$1;
	}
}

class Node extends GraphComponent {
	constructor(...args) {
		super();
		this.pt = null;
		this.deStar = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [pt] = args;
					overloaded.call(this, pt, new DirectedEdgeStar$1());
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [pt, deStar] = args;
					this.pt = pt;
					this.deStar = deStar;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static getEdgesBetween(node0, node1) {
		var edges0 = DirectedEdge$1.toEdges(node0.getOutEdges().getEdges());
		var commonEdges = new HashSet(edges0);
		var edges1 = DirectedEdge$1.toEdges(node1.getOutEdges().getEdges());
		commonEdges.retainAll(edges1);
		return commonEdges;
	}
	isRemoved() {
		return this.pt === null;
	}
	addOutEdge(de) {
		this.deStar.add(de);
	}
	getCoordinate() {
		return this.pt;
	}
	getOutEdges() {
		return this.deStar;
	}
	remove(...args) {
		if (args.length === 0) {
			let [] = args;
			this.pt = null;
		} else if (args.length === 1) {
			let [de] = args;
			this.deStar.remove(de);
		}
	}
	getIndex(edge) {
		return this.deStar.getIndex(edge);
	}
	getDegree() {
		return this.deStar.getDegree();
	}
	getClass() {
		return Node;
	}
}

class LineMergeEdge extends Edge$1 {
	constructor(...args) {
		super();
		this.line = null;
		if (args.length === 1) {
			let [line] = args;
			this.line = line;
		}
	}
	get interfaces_() {
		return [];
	}
	getLine() {
		return this.line;
	}
	getClass() {
		return LineMergeEdge;
	}
}

class NodeMap$1 {
	constructor(...args) {
		this.nodeMap = new TreeMap();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	find(coord) {
		return this.nodeMap.get(coord);
	}
	iterator() {
		return this.nodeMap.values().iterator();
	}
	remove(pt) {
		return this.nodeMap.remove(pt);
	}
	values() {
		return this.nodeMap.values();
	}
	add(n) {
		this.nodeMap.put(n.getCoordinate(), n);
		return n;
	}
	getClass() {
		return NodeMap$1;
	}
}

class PlanarGraph$1 {
	constructor(...args) {
		this.edges = new HashSet();
		this.dirEdges = new HashSet();
		this.nodeMap = new NodeMap$1();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	findNodesOfDegree(degree) {
		var nodesFound = new ArrayList();
		for (var i = this.nodeIterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() === degree) nodesFound.add(node);
		}
		return nodesFound;
	}
	dirEdgeIterator() {
		return this.dirEdges.iterator();
	}
	edgeIterator() {
		return this.edges.iterator();
	}
	remove(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Edge$1) {
				let [edge] = args;
				this.remove(edge.getDirEdge(0));
				this.remove(edge.getDirEdge(1));
				this.edges.remove(edge);
				edge.remove();
			} else if (args[0] instanceof DirectedEdge$1) {
				let [de] = args;
				var sym = de.getSym();
				if (sym !== null) sym.setSym(null);
				de.getFromNode().remove(de);
				de.remove();
				this.dirEdges.remove(de);
			} else if (args[0] instanceof Node) {
				let [node] = args;
				var outEdges = node.getOutEdges().getEdges();
				for (var i = outEdges.iterator(); i.hasNext(); ) {
					var de = i.next();
					var sym = de.getSym();
					if (sym !== null) this.remove(sym);
					this.dirEdges.remove(de);
					var edge = de.getEdge();
					if (edge !== null) {
						this.edges.remove(edge);
					}
				}
				this.nodeMap.remove(node.getCoordinate());
				node.remove();
			}
		}
	}
	findNode(pt) {
		return this.nodeMap.find(pt);
	}
	getEdges() {
		return this.edges;
	}
	nodeIterator() {
		return this.nodeMap.iterator();
	}
	contains(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Edge$1) {
				let [e] = args;
				return this.edges.contains(e);
			} else if (args[0] instanceof DirectedEdge$1) {
				let [de] = args;
				return this.dirEdges.contains(de);
			}
		}
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Node) {
				let [node] = args;
				this.nodeMap.add(node);
			} else if (args[0] instanceof Edge$1) {
				let [edge] = args;
				this.edges.add(edge);
				this.add(edge.getDirEdge(0));
				this.add(edge.getDirEdge(1));
			} else if (args[0] instanceof DirectedEdge$1) {
				let [dirEdge] = args;
				this.dirEdges.add(dirEdge);
			}
		}
	}
	getNodes() {
		return this.nodeMap.values();
	}
	getClass() {
		return PlanarGraph$1;
	}
}

class LineMergeGraph extends PlanarGraph$1 {
	get interfaces_() {
		return [];
	}
	addEdge(lineString) {
		if (lineString.isEmpty()) {
			return null;
		}
		var coordinates = CoordinateArrays.removeRepeatedPoints(lineString.getCoordinates());
		if (coordinates.length <= 1) return null;
		var startCoordinate = coordinates[0];
		var endCoordinate = coordinates[coordinates.length - 1];
		var startNode = this.getNode(startCoordinate);
		var endNode = this.getNode(endCoordinate);
		var directedEdge0 = new LineMergeDirectedEdge(startNode, endNode, coordinates[1], true);
		var directedEdge1 = new LineMergeDirectedEdge(endNode, startNode, coordinates[coordinates.length - 2], false);
		var edge = new LineMergeEdge(lineString);
		edge.setDirectedEdges(directedEdge0, directedEdge1);
		this.add(edge);
	}
	getNode(coordinate) {
		var node = this.findNode(coordinate);
		if (node === null) {
			node = new Node(coordinate);
			this.add(node);
		}
		return node;
	}
	getClass() {
		return LineMergeGraph;
	}
}

class LineMerger {
	constructor(...args) {
		this.graph = new LineMergeGraph();
		this.mergedLineStrings = null;
		this.factory = null;
		this.edgeStrings = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	buildEdgeStringsForUnprocessedNodes() {
		for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (!node.isMarked()) {
				Assert.isTrue(node.getDegree() === 2);
				this.buildEdgeStringsStartingAt(node);
				node.setMarked(true);
			}
		}
	}
	buildEdgeStringsForNonDegree2Nodes() {
		for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() !== 2) {
				this.buildEdgeStringsStartingAt(node);
				node.setMarked(true);
			}
		}
	}
	buildEdgeStringsForObviousStartNodes() {
		this.buildEdgeStringsForNonDegree2Nodes();
	}
	getMergedLineStrings() {
		this.merge();
		return this.mergedLineStrings;
	}
	buildEdgeStringsStartingAt(node) {
		for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
			var directedEdge = i.next();
			if (directedEdge.getEdge().isMarked()) {
				continue;
			}
			this.edgeStrings.add(this.buildEdgeStringStartingWith(directedEdge));
		}
	}
	merge() {
		if (this.mergedLineStrings !== null) {
			return null;
		}
		GraphComponent.setMarked(this.graph.nodeIterator(), false);
		GraphComponent.setMarked(this.graph.edgeIterator(), false);
		this.edgeStrings = new ArrayList();
		this.buildEdgeStringsForObviousStartNodes();
		this.buildEdgeStringsForIsolatedLoops();
		this.mergedLineStrings = new ArrayList();
		for (var i = this.edgeStrings.iterator(); i.hasNext(); ) {
			var edgeString = i.next();
			this.mergedLineStrings.add(edgeString.toLineString());
		}
	}
	buildEdgeStringStartingWith(start) {
		var edgeString = new EdgeString(this.factory);
		var current = start;
		do {
			edgeString.add(current);
			current.getEdge().setMarked(true);
			current = current.getNext();
		} while (current !== null && current !== start);
		return edgeString;
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geometry] = args;
				geometry.apply(new (class {
					filter(component) {
						if (component instanceof LineString) {
							this.add(component);
						}
					}
					get interfaces_() {
						return [GeometryComponentFilter$1];
					}
				})());
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geometries] = args;
				this.mergedLineStrings = null;
				for (var i = geometries.iterator(); i.hasNext(); ) {
					var geometry = i.next();
					this.add(geometry);
				}
			} else if (args[0] instanceof LineString) {
				let [lineString] = args;
				if (this.factory === null) {
					this.factory = lineString.getFactory();
				}
				this.graph.addEdge(lineString);
			}
		}
	}
	buildEdgeStringsForIsolatedLoops() {
		this.buildEdgeStringsForUnprocessedNodes();
	}
	getClass() {
		return LineMerger;
	}
}

class BasicSegmentString {
	constructor(...args) {
		this.pts = null;
		this.data = null;
		if (args.length === 2) {
			let [pts, data] = args;
			this.pts = pts;
			this.data = data;
		}
	}
	get interfaces_() {
		return [SegmentString];
	}
	getCoordinates() {
		return this.pts;
	}
	size() {
		return this.pts.length;
	}
	getCoordinate(i) {
		return this.pts[i];
	}
	isClosed() {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	}
	getSegmentOctant(index) {
		if (index === this.pts.length - 1) return -1;
		return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1));
	}
	setData(data) {
		this.data = data;
	}
	getData() {
		return this.data;
	}
	toString() {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.pts));
	}
	getClass() {
		return BasicSegmentString;
	}
}

class InteriorIntersectionFinder {
	constructor(...args) {
		this.findAllIntersections = false;
		this.isCheckEndSegmentsOnly = false;
		this.li = null;
		this.interiorIntersection = null;
		this.intSegments = null;
		this.intersections = new ArrayList();
		this.intersectionCount = 0;
		this.keepIntersections = true;
		if (args.length === 1) {
			let [li] = args;
			this.li = li;
			this.interiorIntersection = null;
		}
	}
	get interfaces_() {
		return [SegmentIntersector$1];
	}
	static createAllIntersectionsFinder(li) {
		var finder = new InteriorIntersectionFinder(li);
		finder.setFindAllIntersections(true);
		return finder;
	}
	static createAnyIntersectionFinder(li) {
		return new InteriorIntersectionFinder(li);
	}
	static createIntersectionCounter(li) {
		var finder = new InteriorIntersectionFinder(li);
		finder.setFindAllIntersections(true);
		finder.setKeepIntersections(false);
		return finder;
	}
	getInteriorIntersection() {
		return this.interiorIntersection;
	}
	setCheckEndSegmentsOnly(isCheckEndSegmentsOnly) {
		this.isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
	}
	getIntersectionSegments() {
		return this.intSegments;
	}
	count() {
		return this.intersectionCount;
	}
	getIntersections() {
		return this.intersections;
	}
	setFindAllIntersections(findAllIntersections) {
		this.findAllIntersections = findAllIntersections;
	}
	setKeepIntersections(keepIntersections) {
		this.keepIntersections = keepIntersections;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (!this.findAllIntersections && this.hasIntersection()) return null;
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		if (this.isCheckEndSegmentsOnly) {
			var isEndSegPresent = this.isEndSegment(e0, segIndex0) || this.isEndSegment(e1, segIndex1);
			if (!isEndSegPresent) return null;
		}
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			if (this.li.isInteriorIntersection()) {
				this.intSegments = new Array(4);
				this.intSegments[0] = p00;
				this.intSegments[1] = p01;
				this.intSegments[2] = p10;
				this.intSegments[3] = p11;
				this.interiorIntersection = this.li.getIntersection(0);
				if (this.keepIntersections) this.intersections.add(this.interiorIntersection);
				this.intersectionCount++;
			}
		}
	}
	isEndSegment(segStr, index) {
		if (index === 0) return true;
		if (index >= segStr.size() - 2) return true;
		return false;
	}
	hasIntersection() {
		return this.interiorIntersection !== null;
	}
	isDone() {
		if (this.findAllIntersections) return false;
		return this.interiorIntersection !== null;
	}
	getClass() {
		return InteriorIntersectionFinder;
	}
}

class FastNodingValidator {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.segStrings = null;
		this.findAllIntersections = false;
		this.segInt = null;
		this._isValid = true;
		if (args.length === 1) {
			let [segStrings] = args;
			this.segStrings = segStrings;
		}
	}
	get interfaces_() {
		return [];
	}
	static computeIntersections(segStrings) {
		var nv = new FastNodingValidator(segStrings);
		nv.setFindAllIntersections(true);
		nv.isValid();
		return nv.getIntersections();
	}
	execute() {
		if (this.segInt !== null) return null;
		this.checkInteriorIntersections();
	}
	getIntersections() {
		return this.segInt.getIntersections();
	}
	isValid() {
		this.execute();
		return this._isValid;
	}
	setFindAllIntersections(findAllIntersections) {
		this.findAllIntersections = findAllIntersections;
	}
	checkInteriorIntersections() {
		this._isValid = true;
		this.segInt = new InteriorIntersectionFinder(this.li);
		this.segInt.setFindAllIntersections(this.findAllIntersections);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(this.segInt);
		noder.computeNodes(this.segStrings);
		if (this.segInt.hasIntersection()) {
			this._isValid = false;
			return null;
		}
	}
	checkValid() {
		this.execute();
		if (!this._isValid) throw new TopologyException(this.getErrorMessage(), this.segInt.getInteriorIntersection());
	}
	getErrorMessage() {
		if (this._isValid) return "no intersections found";
		var intSegs = this.segInt.getIntersectionSegments();
		return "found non-noded intersection between " + WKTWriter.toLineString(intSegs[0], intSegs[1]) + " and " + WKTWriter.toLineString(intSegs[2], intSegs[3]);
	}
	getClass() {
		return FastNodingValidator;
	}
}

class EdgeNodingValidator {
	constructor(...args) {
		this.nv = null;
		if (args.length === 1) {
			let [edges] = args;
			this.nv = new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges));
		}
	}
	get interfaces_() {
		return [];
	}
	static toSegmentStrings(edges) {
		var segStrings = new ArrayList();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			segStrings.add(new BasicSegmentString(e.getCoordinates(), e));
		}
		return segStrings;
	}
	static checkValid(edges) {
		var validator = new EdgeNodingValidator(edges);
		validator.checkValid();
	}
	checkValid() {
		this.nv.checkValid();
	}
	getClass() {
		return EdgeNodingValidator;
	}
}

class LineBuilder {
	constructor(...args) {
		this.op = null;
		this.geometryFactory = null;
		this.ptLocator = null;
		this.lineEdgesList = new ArrayList();
		this.resultLineList = new ArrayList();
		if (args.length === 3) {
			let [op, geometryFactory, ptLocator] = args;
			this.op = op;
			this.geometryFactory = geometryFactory;
			this.ptLocator = ptLocator;
		}
	}
	get interfaces_() {
		return [];
	}
	collectLines(opCode) {
		for (var it = this.op.getGraph().getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			this.collectLineEdge(de, opCode, this.lineEdgesList);
			this.collectBoundaryTouchEdge(de, opCode, this.lineEdgesList);
		}
	}
	labelIsolatedLine(e, targetIndex) {
		var loc = this.ptLocator.locate(e.getCoordinate(), this.op.getArgGeometry(targetIndex));
		e.getLabel().setLocation(targetIndex, loc);
	}
	build(opCode) {
		this.findCoveredLineEdges();
		this.collectLines(opCode);
		this.buildLines(opCode);
		return this.resultLineList;
	}
	collectLineEdge(de, opCode, edges) {
		var label = de.getLabel();
		var e = de.getEdge();
		if (de.isLineEdge()) {
			if (!de.isVisited() && OverlayOp$1.isResultOfOp(label, opCode) && !e.isCovered()) {
				edges.add(e);
				de.setVisitedEdge(true);
			}
		}
	}
	findCoveredLineEdges() {
		for (var nodeit = this.op.getGraph().getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().findCoveredLineEdges();
		}
		for (var it = this.op.getGraph().getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var e = de.getEdge();
			if (de.isLineEdge() && !e.isCoveredSet()) {
				var isCovered = this.op.isCoveredByA(de.getCoordinate());
				e.setCovered(isCovered);
			}
		}
	}
	labelIsolatedLines(edgesList) {
		for (var it = edgesList.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			if (e.isIsolated()) {
				if (label.isNull(0)) this.labelIsolatedLine(e, 0); else this.labelIsolatedLine(e, 1);
			}
		}
	}
	buildLines(opCode) {
		for (var it = this.lineEdgesList.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			var line = this.geometryFactory.createLineString(e.getCoordinates());
			this.resultLineList.add(line);
			e.setInResult(true);
		}
	}
	collectBoundaryTouchEdge(de, opCode, edges) {
		var label = de.getLabel();
		if (de.isLineEdge()) return null;
		if (de.isVisited()) return null;
		if (de.isInteriorAreaEdge()) return null;
		if (de.getEdge().isInResult()) return null;
		Assert.isTrue(!(de.isInResult() || de.getSym().isInResult()) || !de.getEdge().isInResult());
		if (OverlayOp$1.isResultOfOp(label, opCode) && opCode === OverlayOp$1.INTERSECTION) {
			edges.add(de.getEdge());
			de.setVisitedEdge(true);
		}
	}
	getClass() {
		return LineBuilder;
	}
}

class PointBuilder {
	constructor(...args) {
		this.op = null;
		this.geometryFactory = null;
		this.resultPointList = new ArrayList();
		if (args.length === 3) {
			let [op, geometryFactory, ptLocator] = args;
			this.op = op;
			this.geometryFactory = geometryFactory;
		}
	}
	get interfaces_() {
		return [];
	}
	filterCoveredNodeToPoint(n) {
		var coord = n.getCoordinate();
		if (!this.op.isCoveredByLA(coord)) {
			var pt = this.geometryFactory.createPoint(coord);
			this.resultPointList.add(pt);
		}
	}
	extractNonCoveredResultNodes(opCode) {
		for (var nodeit = this.op.getGraph().getNodes().iterator(); nodeit.hasNext(); ) {
			var n = nodeit.next();
			if (n.isInResult()) continue;
			if (n.isIncidentEdgeInResult()) continue;
			if (n.getEdges().getDegree() === 0 || opCode === OverlayOp$1.INTERSECTION) {
				var label = n.getLabel();
				if (OverlayOp$1.isResultOfOp(label, opCode)) {
					this.filterCoveredNodeToPoint(n);
				}
			}
		}
	}
	build(opCode) {
		this.extractNonCoveredResultNodes(opCode);
		return this.resultPointList;
	}
	getClass() {
		return PointBuilder;
	}
}

class GeometryGraphOperation {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.resultPrecisionModel = null;
		this.arg = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [g0] = args;
				this.setComputationPrecision(g0.getPrecisionModel());
				this.arg = new Array(1);
				this.arg[0] = new GeometryGraph(0, g0);
				;
			} else if (args.length === 2) {
				let [g0, g1] = args;
				overloaded.call(this, g0, g1, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE);
			} else if (args.length === 3) {
				let [g0, g1, boundaryNodeRule] = args;
				if (g0.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) this.setComputationPrecision(g0.getPrecisionModel()); else this.setComputationPrecision(g1.getPrecisionModel());
				this.arg = new Array(2);
				this.arg[0] = new GeometryGraph(0, g0, boundaryNodeRule);
				this.arg[1] = new GeometryGraph(1, g1, boundaryNodeRule);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getArgGeometry(i) {
		return this.arg[i].getGeometry();
	}
	setComputationPrecision(pm) {
		this.resultPrecisionModel = pm;
		this.li.setPrecisionModel(this.resultPrecisionModel);
	}
	getClass() {
		return GeometryGraphOperation;
	}
}

class OverlayOp$1 extends GeometryGraphOperation {
	constructor(...args) {
		super();
		this.ptLocator = new PointLocator();
		this.geomFact = null;
		this.resultGeom = null;
		this.graph = null;
		this.edgeList = new EdgeList();
		this.resultPolyList = new ArrayList();
		this.resultLineList = new ArrayList();
		this.resultPointList = new ArrayList();
		if (args.length === 2) {
			let [g0, g1] = args;
			super(g0, g1);
			this.graph = new PlanarGraph(new OverlayNodeFactory());
			this.geomFact = g0.getFactory();
		}
	}
	get interfaces_() {
		return [];
	}
	static overlayOp(geom0, geom1, opCode) {
		var gov = new OverlayOp$1(geom0, geom1);
		var geomOv = gov.getResultGeometry(opCode);
		return geomOv;
	}
	static isResultOfOp(...args) {
		if (args.length === 2) {
			let [label, opCode] = args;
			var loc0 = label.getLocation(0);
			var loc1 = label.getLocation(1);
			return OverlayOp$1.isResultOfOp(loc0, loc1, opCode);
		} else if (args.length === 3) {
			let [loc0, loc1, overlayOpCode] = args;
			if (loc0 === Location.BOUNDARY) loc0 = Location.INTERIOR;
			if (loc1 === Location.BOUNDARY) loc1 = Location.INTERIOR;
			switch (overlayOpCode) {
				case OverlayOp$1.INTERSECTION:
					return loc0 === Location.INTERIOR && loc1 === Location.INTERIOR;
				case OverlayOp$1.UNION:
					return loc0 === Location.INTERIOR || loc1 === Location.INTERIOR;
				case OverlayOp$1.DIFFERENCE:
					return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR;
				case OverlayOp$1.SYMDIFFERENCE:
					return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR || loc0 !== Location.INTERIOR && loc1 === Location.INTERIOR;
			}
			return false;
		}
	}
	static createEmptyResult(overlayOpCode, a, b, geomFact) {
		var result = null;
		switch (OverlayOp$1.resultDimension(overlayOpCode, a, b)) {
			case -1:
				result = geomFact.createGeometryCollection(new Array(0));
				break;
			case 0:
				result = geomFact.createPoint();
				break;
			case 1:
				result = geomFact.createLineString();
				break;
			case 2:
				result = geomFact.createPolygon();
				break;
		}
		return result;
	}
	static resultDimension(opCode, g0, g1) {
		var dim0 = g0.getDimension();
		var dim1 = g1.getDimension();
		var resultDimension = -1;
		switch (opCode) {
			case OverlayOp$1.INTERSECTION:
				resultDimension = Math.min(dim0, dim1);
				break;
			case OverlayOp$1.UNION:
				resultDimension = Math.max(dim0, dim1);
				break;
			case OverlayOp$1.DIFFERENCE:
				resultDimension = dim0;
				break;
			case OverlayOp$1.SYMDIFFERENCE:
				resultDimension = Math.max(dim0, dim1);
				break;
		}
		return resultDimension;
	}
	insertUniqueEdge(e) {
		var existingEdge = this.edgeList.findEqualEdge(e);
		if (existingEdge !== null) {
			var existingLabel = existingEdge.getLabel();
			var labelToMerge = e.getLabel();
			if (!existingEdge.isPointwiseEqual(e)) {
				labelToMerge = new Label(e.getLabel());
				labelToMerge.flip();
			}
			var depth = existingEdge.getDepth();
			if (depth.isNull()) {
				depth.add(existingLabel);
			}
			depth.add(labelToMerge);
			existingLabel.merge(labelToMerge);
		} else {
			this.edgeList.add(e);
		}
	}
	getGraph() {
		return this.graph;
	}
	cancelDuplicateResultEdges() {
		for (var it = this.graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var sym = de.getSym();
			if (de.isInResult() && sym.isInResult()) {
				de.setInResult(false);
				sym.setInResult(false);
			}
		}
	}
	isCoveredByLA(coord) {
		if (this.isCovered(coord, this.resultLineList)) return true;
		if (this.isCovered(coord, this.resultPolyList)) return true;
		return false;
	}
	computeGeometry(resultPointList, resultLineList, resultPolyList, opcode) {
		var geomList = new ArrayList();
		geomList.addAll(resultPointList);
		geomList.addAll(resultLineList);
		geomList.addAll(resultPolyList);
		if (geomList.isEmpty()) return OverlayOp$1.createEmptyResult(opcode, this.arg[0].getGeometry(), this.arg[1].getGeometry(), this.geomFact);
		return this.geomFact.buildGeometry(geomList);
	}
	mergeSymLabels() {
		for (var nodeit = this.graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().mergeSymLabels();
		}
	}
	isCovered(coord, geomList) {
		for (var it = geomList.iterator(); it.hasNext(); ) {
			var geom = it.next();
			var loc = this.ptLocator.locate(coord, geom);
			if (loc !== Location.EXTERIOR) return true;
		}
		return false;
	}
	replaceCollapsedEdges() {
		var newEdges = new ArrayList();
		for (var it = this.edgeList.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.isCollapsed()) {
				it.remove();
				newEdges.add(e.getCollapsedEdge());
			}
		}
		this.edgeList.addAll(newEdges);
	}
	updateNodeLabelling() {
		for (var nodeit = this.graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			var lbl = node.getEdges().getLabel();
			node.getLabel().merge(lbl);
		}
	}
	getResultGeometry(overlayOpCode) {
		this.computeOverlay(overlayOpCode);
		return this.resultGeom;
	}
	insertUniqueEdges(edges) {
		for (var i = edges.iterator(); i.hasNext(); ) {
			var e = i.next();
			this.insertUniqueEdge(e);
		}
	}
	computeOverlay(opCode) {
		this.copyPoints(0);
		this.copyPoints(1);
		this.arg[0].computeSelfNodes(this.li, false);
		this.arg[1].computeSelfNodes(this.li, false);
		this.arg[0].computeEdgeIntersections(this.arg[1], this.li, true);
		var baseSplitEdges = new ArrayList();
		this.arg[0].computeSplitEdges(baseSplitEdges);
		this.arg[1].computeSplitEdges(baseSplitEdges);
		var splitEdges = baseSplitEdges;
		this.insertUniqueEdges(baseSplitEdges);
		this.computeLabelsFromDepths();
		this.replaceCollapsedEdges();
		EdgeNodingValidator.checkValid(this.edgeList.getEdges());
		this.graph.addEdges(this.edgeList.getEdges());
		this.computeLabelling();
		this.labelIncompleteNodes();
		this.findResultAreaEdges(opCode);
		this.cancelDuplicateResultEdges();
		var polyBuilder = new PolygonBuilder(this.geomFact);
		polyBuilder.add(this.graph);
		this.resultPolyList = polyBuilder.getPolygons();
		var lineBuilder = new LineBuilder(this, this.geomFact, this.ptLocator);
		this.resultLineList = lineBuilder.build(opCode);
		var pointBuilder = new PointBuilder(this, this.geomFact, this.ptLocator);
		this.resultPointList = pointBuilder.build(opCode);
		this.resultGeom = this.computeGeometry(this.resultPointList, this.resultLineList, this.resultPolyList, opCode);
	}
	labelIncompleteNode(n, targetIndex) {
		var loc = this.ptLocator.locate(n.getCoordinate(), this.arg[targetIndex].getGeometry());
		n.getLabel().setLocation(targetIndex, loc);
	}
	copyPoints(argIndex) {
		for (var i = this.arg[argIndex].getNodeIterator(); i.hasNext(); ) {
			var graphNode = i.next();
			var newNode = this.graph.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	}
	findResultAreaEdges(opCode) {
		for (var it = this.graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var label = de.getLabel();
			if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp$1.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) {
				de.setInResult(true);
			}
		}
	}
	computeLabelsFromDepths() {
		for (var it = this.edgeList.iterator(); it.hasNext(); ) {
			var e = it.next();
			var lbl = e.getLabel();
			var depth = e.getDepth();
			if (!depth.isNull()) {
				depth.normalize();
				for (var i = 0; i < 2; i++) {
					if (!lbl.isNull(i) && lbl.isArea() && !depth.isNull(i)) {
						if (depth.getDelta(i) === 0) {
							lbl.toLine(i);
						} else {
							Assert.isTrue(!depth.isNull(i, Position.LEFT), "depth of LEFT side has not been initialized");
							lbl.setLocation(i, Position.LEFT, depth.getLocation(i, Position.LEFT));
							Assert.isTrue(!depth.isNull(i, Position.RIGHT), "depth of RIGHT side has not been initialized");
							lbl.setLocation(i, Position.RIGHT, depth.getLocation(i, Position.RIGHT));
						}
					}
				}
			}
		}
	}
	computeLabelling() {
		for (var nodeit = this.graph.getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().computeLabelling(this.arg);
		}
		this.mergeSymLabels();
		this.updateNodeLabelling();
	}
	labelIncompleteNodes() {
		var nodeCount = 0;
		for (var ni = this.graph.getNodes().iterator(); ni.hasNext(); ) {
			var n = ni.next();
			var label = n.getLabel();
			if (n.isIsolated()) {
				nodeCount++;
				if (label.isNull(0)) this.labelIncompleteNode(n, 0); else this.labelIncompleteNode(n, 1);
			}
			n.getEdges().updateLabelling(label);
		}
	}
	isCoveredByA(coord) {
		if (this.isCovered(coord, this.resultPolyList)) return true;
		return false;
	}
	getClass() {
		return OverlayOp$1;
	}
}
OverlayOp$1.INTERSECTION = 1;
OverlayOp$1.UNION = 2;
OverlayOp$1.DIFFERENCE = 3;
OverlayOp$1.SYMDIFFERENCE = 4;

class PolygonizeDirectedEdge extends DirectedEdge$1 {
	constructor(...args) {
		super();
		this.edgeRing = null;
		this.next = null;
		this.label = -1;
		if (args.length === 4) {
			let [from, to, directionPt, edgeDirection] = args;
			super(from, to, directionPt, edgeDirection);
		}
	}
	get interfaces_() {
		return [];
	}
	getNext() {
		return this.next;
	}
	isInRing() {
		return this.edgeRing !== null;
	}
	setRing(edgeRing) {
		this.edgeRing = edgeRing;
	}
	setLabel(label) {
		this.label = label;
	}
	getLabel() {
		return this.label;
	}
	setNext(next) {
		this.next = next;
	}
	getRing() {
		return this.edgeRing;
	}
	getClass() {
		return PolygonizeDirectedEdge;
	}
}

class PolygonizeEdge extends Edge$1 {
	constructor(...args) {
		super();
		this.line = null;
		if (args.length === 1) {
			let [line] = args;
			this.line = line;
		}
	}
	get interfaces_() {
		return [];
	}
	getLine() {
		return this.line;
	}
	getClass() {
		return PolygonizeEdge;
	}
}

class EdgeRing {
	constructor(...args) {
		this.factory = null;
		this.deList = new ArrayList();
		this.lowestEdge = null;
		this.ring = null;
		this.ringPts = null;
		this.holes = null;
		this.shell = null;
		this._isHole = null;
		this._isProcessed = false;
		this._isIncludedSet = false;
		this._isIncluded = false;
		if (args.length === 1) {
			let [factory] = args;
			this.factory = factory;
		}
	}
	get interfaces_() {
		return [];
	}
	static get EnvelopeComparator() {
		return EnvelopeComparator;
	}
	static findDirEdgesInRing(startDE) {
		var de = startDE;
		var edges = new ArrayList();
		do {
			edges.add(de);
			de = de.getNext();
			Assert.isTrue(de !== null, "found null DE in ring");
			Assert.isTrue(de === startDE || !de.isInRing(), "found DE already in ring");
		} while (de !== startDE);
		return edges;
	}
	static addEdge(coords, isForward, coordList) {
		if (isForward) {
			for (var i = 0; i < coords.length; i++) {
				coordList.add(coords[i], false);
			}
		} else {
			for (var i = coords.length - 1; i >= 0; i--) {
				coordList.add(coords[i], false);
			}
		}
	}
	static findEdgeRingContaining(testEr, shellList) {
		var testRing = testEr.getRing();
		var testEnv = testRing.getEnvelopeInternal();
		var testPt = testRing.getCoordinateN(0);
		var minShell = null;
		var minShellEnv = null;
		for (var it = shellList.iterator(); it.hasNext(); ) {
			var tryShell = it.next();
			var tryShellRing = tryShell.getRing();
			var tryShellEnv = tryShellRing.getEnvelopeInternal();
			if (tryShellEnv.equals(testEnv)) continue;
			if (!tryShellEnv.contains(testEnv)) continue;
			testPt = CoordinateArrays.ptNotInList(testRing.getCoordinates(), tryShellRing.getCoordinates());
			var isContained = false;
			if (CGAlgorithms.isPointInRing(testPt, tryShellRing.getCoordinates())) isContained = true;
			if (isContained) {
				if (minShell === null || minShellEnv.contains(tryShellEnv)) {
					minShell = tryShell;
					minShellEnv = minShell.getRing().getEnvelopeInternal();
				}
			}
		}
		return minShell;
	}
	isIncluded() {
		return this._isIncluded;
	}
	getCoordinates() {
		if (this.ringPts === null) {
			var coordList = new CoordinateList();
			for (var i = this.deList.iterator(); i.hasNext(); ) {
				var de = i.next();
				var edge = de.getEdge();
				EdgeRing.addEdge(edge.getLine().getCoordinates(), de.getEdgeDirection(), coordList);
			}
			this.ringPts = coordList.toCoordinateArray();
		}
		return this.ringPts;
	}
	isIncludedSet() {
		return this._isIncludedSet;
	}
	isValid() {
		this.getCoordinates();
		if (this.ringPts.length <= 3) return false;
		this.getRing();
		return this.ring.isValid();
	}
	build(startDE) {
		var de = startDE;
		do {
			this.add(de);
			de.setRing(this);
			de = de.getNext();
			Assert.isTrue(de !== null, "found null DE in ring");
			Assert.isTrue(de === startDE || !de.isInRing(), "found DE already in ring");
		} while (de !== startDE);
	}
	isOuterHole() {
		if (!this._isHole) return false;
		return !this.hasShell();
	}
	getPolygon() {
		var holeLR = null;
		if (this.holes !== null) {
			holeLR = new Array(this.holes.size());
			for (var i = 0; i < this.holes.size(); i++) {
				holeLR[i] = this.holes.get(i);
			}
		}
		var poly = this.factory.createPolygon(this.ring, holeLR);
		return poly;
	}
	isHole() {
		return this._isHole;
	}
	isProcessed() {
		return this._isProcessed;
	}
	addHole(...args) {
		if (args.length === 1) {
			if (args[0] instanceof LinearRing) {
				let [hole] = args;
				if (this.holes === null) this.holes = new ArrayList();
				this.holes.add(hole);
			} else if (args[0] instanceof EdgeRing) {
				let [holeER] = args;
				holeER.setShell(this);
				var hole = holeER.getRing();
				if (this.holes === null) this.holes = new ArrayList();
				this.holes.add(hole);
			}
		}
	}
	setIncluded(isIncluded) {
		this._isIncluded = isIncluded;
		this._isIncludedSet = true;
	}
	getOuterHole() {
		if (this.isHole()) return null;
		for (var i = 0; i < this.deList.size(); i++) {
			var de = this.deList.get(i);
			var adjRing = de.getSym().getRing();
			if (adjRing.isOuterHole()) return adjRing;
		}
		return null;
	}
	computeHole() {
		var ring = this.getRing();
		this._isHole = CGAlgorithms.isCCW(ring.getCoordinates());
	}
	hasShell() {
		return this.shell !== null;
	}
	isOuterShell() {
		return this.getOuterHole() !== null;
	}
	getLineString() {
		this.getCoordinates();
		return this.factory.createLineString(this.ringPts);
	}
	toString() {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.getCoordinates()));
	}
	getShell() {
		if (this.isHole()) return this.shell;
		return this;
	}
	add(de) {
		this.deList.add(de);
	}
	getRing() {
		if (this.ring !== null) return this.ring;
		this.getCoordinates();
		if (this.ringPts.length < 3) System.out.println(this.ringPts);
		try {
			this.ring = this.factory.createLinearRing(this.ringPts);
		} catch (ex) {
			if (ex instanceof Exception) {
				System.out.println(this.ringPts);
			} else throw ex;
		} finally {}
		return this.ring;
	}
	updateIncluded() {
		if (this.isHole()) return null;
		for (var i = 0; i < this.deList.size(); i++) {
			var de = this.deList.get(i);
			var adjShell = de.getSym().getRing().getShell();
			if (adjShell !== null && adjShell.isIncludedSet()) {
				this.setIncluded(!adjShell.isIncluded());
				return null;
			}
		}
	}
	setShell(shell) {
		this.shell = shell;
	}
	setProcessed(isProcessed) {
		this._isProcessed = isProcessed;
	}
	getClass() {
		return EdgeRing;
	}
}
class EnvelopeComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(obj0, obj1) {
		var r0 = obj0;
		var r1 = obj1;
		return r0.getRing().getEnvelope().compareTo(r1.getRing().getEnvelope());
	}
	getClass() {
		return EnvelopeComparator;
	}
}

class PolygonizeGraph extends PlanarGraph$1 {
	constructor(...args) {
		super();
		this.factory = null;
		if (args.length === 1) {
			let [factory] = args;
			this.factory = factory;
		}
	}
	get interfaces_() {
		return [];
	}
	static findLabeledEdgeRings(dirEdges) {
		var edgeRingStarts = new ArrayList();
		var currLabel = 1;
		for (var i = dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isMarked()) continue;
			if (de.getLabel() >= 0) continue;
			edgeRingStarts.add(de);
			var edges = EdgeRing.findDirEdgesInRing(de);
			PolygonizeGraph.label(edges, currLabel);
			currLabel++;
		}
		return edgeRingStarts;
	}
	static getDegreeNonDeleted(node) {
		var edges = node.getOutEdges().getEdges();
		var degree = 0;
		for (var i = edges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (!de.isMarked()) degree++;
		}
		return degree;
	}
	static deleteAllEdges(node) {
		var edges = node.getOutEdges().getEdges();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var de = i.next();
			de.setMarked(true);
			var sym = de.getSym();
			if (sym !== null) sym.setMarked(true);
		}
	}
	static label(dirEdges, label) {
		for (var i = dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			de.setLabel(label);
		}
	}
	static computeNextCWEdges(node) {
		var deStar = node.getOutEdges();
		var startDE = null;
		var prevDE = null;
		for (var i = deStar.getEdges().iterator(); i.hasNext(); ) {
			var outDE = i.next();
			if (outDE.isMarked()) continue;
			if (startDE === null) startDE = outDE;
			if (prevDE !== null) {
				var sym = prevDE.getSym();
				sym.setNext(outDE);
			}
			prevDE = outDE;
		}
		if (prevDE !== null) {
			var sym = prevDE.getSym();
			sym.setNext(startDE);
		}
	}
	static computeNextCCWEdges(node, label) {
		var deStar = node.getOutEdges();
		var firstOutDE = null;
		var prevInDE = null;
		var edges = deStar.getEdges();
		for (var i = edges.size() - 1; i >= 0; i--) {
			var de = edges.get(i);
			var sym = de.getSym();
			var outDE = null;
			if (de.getLabel() === label) outDE = de;
			var inDE = null;
			if (sym.getLabel() === label) inDE = sym;
			if (outDE === null && inDE === null) continue;
			if (inDE !== null) {
				prevInDE = inDE;
			}
			if (outDE !== null) {
				if (prevInDE !== null) {
					prevInDE.setNext(outDE);
					prevInDE = null;
				}
				if (firstOutDE === null) firstOutDE = outDE;
			}
		}
		if (prevInDE !== null) {
			Assert.isTrue(firstOutDE !== null);
			prevInDE.setNext(firstOutDE);
		}
	}
	static getDegree(node, label) {
		var edges = node.getOutEdges().getEdges();
		var degree = 0;
		for (var i = edges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.getLabel() === label) degree++;
		}
		return degree;
	}
	static findIntersectionNodes(startDE, label) {
		var de = startDE;
		var intNodes = null;
		do {
			var node = de.getFromNode();
			if (PolygonizeGraph.getDegree(node, label) > 1) {
				if (intNodes === null) intNodes = new ArrayList();
				intNodes.add(node);
			}
			de = de.getNext();
			Assert.isTrue(de !== null, "found null DE in ring");
			Assert.isTrue(de === startDE || !de.isInRing(), "found DE already in ring");
		} while (de !== startDE);
		return intNodes;
	}
	findEdgeRing(startDE) {
		var er = new EdgeRing(this.factory);
		er.build(startDE);
		return er;
	}
	computeDepthParity(...args) {
		if (args.length === 0) {
			let [] = args;
			while (true) {
				var de = null;
				if (de === null) return null;
				this.computeDepthParity(de);
			}
		} else if (args.length === 1) {
			let [de] = args;
		}
	}
	computeNextCWEdges() {
		for (var iNode = this.nodeIterator(); iNode.hasNext(); ) {
			var node = iNode.next();
			PolygonizeGraph.computeNextCWEdges(node);
		}
	}
	addEdge(line) {
		if (line.isEmpty()) {
			return null;
		}
		var linePts = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
		if (linePts.length < 2) {
			return null;
		}
		var startPt = linePts[0];
		var endPt = linePts[linePts.length - 1];
		var nStart = this.getNode(startPt);
		var nEnd = this.getNode(endPt);
		var de0 = new PolygonizeDirectedEdge(nStart, nEnd, linePts[1], true);
		var de1 = new PolygonizeDirectedEdge(nEnd, nStart, linePts[linePts.length - 2], false);
		var edge = new PolygonizeEdge(line);
		edge.setDirectedEdges(de0, de1);
		this.add(edge);
	}
	deleteCutEdges() {
		this.computeNextCWEdges();
		PolygonizeGraph.findLabeledEdgeRings(this.dirEdges);
		var cutLines = new ArrayList();
		for (var i = this.dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isMarked()) continue;
			var sym = de.getSym();
			if (de.getLabel() === sym.getLabel()) {
				de.setMarked(true);
				sym.setMarked(true);
				var e = de.getEdge();
				cutLines.add(e.getLine());
			}
		}
		return cutLines;
	}
	getEdgeRings() {
		this.computeNextCWEdges();
		PolygonizeGraph.label(this.dirEdges, -1);
		var maximalRings = PolygonizeGraph.findLabeledEdgeRings(this.dirEdges);
		this.convertMaximalToMinimalEdgeRings(maximalRings);
		var edgeRingList = new ArrayList();
		for (var i = this.dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isMarked()) continue;
			if (de.isInRing()) continue;
			var er = this.findEdgeRing(de);
			edgeRingList.add(er);
		}
		return edgeRingList;
	}
	getNode(pt) {
		var node = this.findNode(pt);
		if (node === null) {
			node = new Node(pt);
			this.add(node);
		}
		return node;
	}
	convertMaximalToMinimalEdgeRings(ringEdges) {
		for (var i = ringEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			var label = de.getLabel();
			var intNodes = PolygonizeGraph.findIntersectionNodes(de, label);
			if (intNodes === null) continue;
			for (var iNode = intNodes.iterator(); iNode.hasNext(); ) {
				var node = iNode.next();
				PolygonizeGraph.computeNextCCWEdges(node, label);
			}
		}
	}
	deleteDangles() {
		var nodesToRemove = this.findNodesOfDegree(1);
		var dangleLines = new HashSet();
		var nodeStack = new Stack();
		for (var i = nodesToRemove.iterator(); i.hasNext(); ) {
			nodeStack.push(i.next());
		}
		while (!nodeStack.isEmpty()) {
			var node = nodeStack.pop();
			PolygonizeGraph.deleteAllEdges(node);
			var nodeOutEdges = node.getOutEdges().getEdges();
			for (var i = nodeOutEdges.iterator(); i.hasNext(); ) {
				var de = i.next();
				de.setMarked(true);
				var sym = de.getSym();
				if (sym !== null) sym.setMarked(true);
				var e = de.getEdge();
				dangleLines.add(e.getLine());
				var toNode = de.getToNode();
				if (PolygonizeGraph.getDegreeNonDeleted(toNode) === 1) nodeStack.push(toNode);
			}
		}
		return dangleLines;
	}
	getClass() {
		return PolygonizeGraph;
	}
}

class Polygonizer {
	constructor(...args) {
		this.lineStringAdder = new LineStringAdder(this);
		this.graph = null;
		this.dangles = new ArrayList();
		this.cutEdges = new ArrayList();
		this.invalidRingLines = new ArrayList();
		this.holeList = null;
		this.shellList = null;
		this.polyList = null;
		this.isCheckingRingsValid = true;
		this.extractOnlyPolygonal = null;
		this.geomFactory = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				overloaded.call(this, false);
			} else if (args.length === 1) {
				let [extractOnlyPolygonal] = args;
				this.extractOnlyPolygonal = extractOnlyPolygonal;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get LineStringAdder() {
		return LineStringAdder;
	}
	static findOuterShells(shellList) {
		for (var i = shellList.iterator(); i.hasNext(); ) {
			var er = i.next();
			var outerHoleER = er.getOuterHole();
			if (outerHoleER !== null && !outerHoleER.isProcessed()) {
				er.setIncluded(true);
				outerHoleER.setProcessed(true);
			}
		}
	}
	static extractPolygons(shellList, includeAll) {
		var polyList = new ArrayList();
		for (var i = shellList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (includeAll || er.isIncluded()) {
				polyList.add(er.getPolygon());
			}
		}
		return polyList;
	}
	static assignHolesToShells(holeList, shellList) {
		for (var i = holeList.iterator(); i.hasNext(); ) {
			var holeER = i.next();
			Polygonizer.assignHoleToShell(holeER, shellList);
		}
	}
	static assignHoleToShell(holeER, shellList) {
		var shell = EdgeRing.findEdgeRingContaining(holeER, shellList);
		if (shell !== null) {
			shell.addHole(holeER);
		}
	}
	static findDisjointShells(shellList) {
		Polygonizer.findOuterShells(shellList);
		var isMoreToScan = null;
		do {
			isMoreToScan = false;
			for (var i = shellList.iterator(); i.hasNext(); ) {
				var er = i.next();
				if (er.isIncludedSet()) continue;
				er.updateIncluded();
				if (!er.isIncludedSet()) {
					isMoreToScan = true;
				}
			}
		} while (isMoreToScan);
	}
	getGeometry() {
		if (this.geomFactory === null) this.geomFactory = new GeometryFactory();
		this.polygonize();
		if (this.extractOnlyPolygonal) {
			return this.geomFactory.buildGeometry(this.polyList);
		}
		return this.geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(this.polyList));
	}
	getInvalidRingLines() {
		this.polygonize();
		return this.invalidRingLines;
	}
	findValidRings(edgeRingList, validEdgeRingList, invalidRingList) {
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			if (er.isValid()) validEdgeRingList.add(er); else invalidRingList.add(er.getLineString());
		}
	}
	polygonize() {
		if (this.polyList !== null) return null;
		this.polyList = new ArrayList();
		if (this.graph === null) return null;
		this.dangles = this.graph.deleteDangles();
		this.cutEdges = this.graph.deleteCutEdges();
		var edgeRingList = this.graph.getEdgeRings();
		var validEdgeRingList = new ArrayList();
		this.invalidRingLines = new ArrayList();
		if (this.isCheckingRingsValid) {
			this.findValidRings(edgeRingList, validEdgeRingList, this.invalidRingLines);
		} else {
			validEdgeRingList = edgeRingList;
		}
		this.findShellsAndHoles(validEdgeRingList);
		Polygonizer.assignHolesToShells(this.holeList, this.shellList);
		Collections.sort(this.shellList, new EdgeRing.EnvelopeComparator());
		var includeAll = true;
		if (this.extractOnlyPolygonal) {
			Polygonizer.findDisjointShells(this.shellList);
			includeAll = false;
		}
		this.polyList = Polygonizer.extractPolygons(this.shellList, includeAll);
	}
	getDangles() {
		this.polygonize();
		return this.dangles;
	}
	getCutEdges() {
		this.polygonize();
		return this.cutEdges;
	}
	getPolygons() {
		this.polygonize();
		return this.polyList;
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geomList] = args;
				for (var i = geomList.iterator(); i.hasNext(); ) {
					var geometry = i.next();
					this.add(geometry);
				}
			} else if (args[0] instanceof LineString) {
				let [line] = args;
				this.geomFactory = line.getFactory();
				if (this.graph === null) this.graph = new PolygonizeGraph(this.geomFactory);
				this.graph.addEdge(line);
			} else if (args[0] instanceof Geometry) {
				let [g] = args;
				g.apply(this.lineStringAdder);
			}
		}
	}
	setCheckRingsValid(isCheckingRingsValid) {
		this.isCheckingRingsValid = isCheckingRingsValid;
	}
	findShellsAndHoles(edgeRingList) {
		this.holeList = new ArrayList();
		this.shellList = new ArrayList();
		for (var i = edgeRingList.iterator(); i.hasNext(); ) {
			var er = i.next();
			er.computeHole();
			if (er.isHole()) this.holeList.add(er); else this.shellList.add(er);
		}
	}
	getClass() {
		return Polygonizer;
	}
}
class LineStringAdder {
	constructor(...args) {
		this.p = null;
		if (args.length === 1) {
			let [p] = args;
			this.p = p;
		}
	}
	get interfaces_() {
		return [GeometryComponentFilter$1];
	}
	filter(g) {
		if (g instanceof LineString) this.p.add(g);
	}
	getClass() {
		return LineStringAdder;
	}
}

class IntersectionMatrix {
	constructor(...args) {
		this.matrix = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.matrix = Array(3).fill().map(() => Array(3));
				this.setAll(Dimension.FALSE);
			} else if (args.length === 1) {
				if (typeof args[0] === "string") {
					let [elements] = args;
					overloaded.call(this);
					this.set(elements);
				} else if (args[0] instanceof IntersectionMatrix) {
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
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [Clonable];
	}
	static matches(...args) {
		if (args.length === 2) {
			if (Number.isInteger(args[0]) && typeof args[1] === "string") {
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
			} else if (typeof args[0] === "string" && typeof args[1] === "string") {
				let [actualDimensionSymbols, requiredDimensionSymbols] = args;
				var m = new IntersectionMatrix(actualDimensionSymbols);
				return m.matches(requiredDimensionSymbols);
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
		if (args.length === 1) {
			let [dimensionSymbols] = args;
			for (var i = 0; i < dimensionSymbols.length; i++) {
				var row = Math.trunc(i / 3);
				var col = i % 3;
				this.matrix[row][col] = Dimension.toDimensionValue(dimensionSymbols.charAt(i));
			}
		} else if (args.length === 3) {
			let [row, column, dimensionValue] = args;
			this.matrix[row][column] = dimensionValue;
		}
	}
	isContains() {
		return IntersectionMatrix.isTrue(this.matrix[Location.INTERIOR][Location.INTERIOR]) && this.matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this.matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE;
	}
	setAtLeast(...args) {
		if (args.length === 1) {
			let [minimumDimensionSymbols] = args;
			for (var i = 0; i < minimumDimensionSymbols.length; i++) {
				var row = Math.trunc(i / 3);
				var col = i % 3;
				this.setAtLeast(row, col, Dimension.toDimensionValue(minimumDimensionSymbols.charAt(i)));
			}
		} else if (args.length === 3) {
			let [row, column, minimumDimensionValue] = args;
			if (this.matrix[row][column] < minimumDimensionValue) {
				this.matrix[row][column] = minimumDimensionValue;
			}
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
			throw new IllegalArgumentException$1("Should be length 9: " + requiredDimensionSymbols);
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

class EdgeEndBuilder {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	createEdgeEndForNext(edge, l, eiCurr, eiNext) {
		var iNext = eiCurr.segmentIndex + 1;
		if (iNext >= edge.getNumPoints() && eiNext === null) return null;
		var pNext = edge.getCoordinate(iNext);
		if (eiNext !== null && eiNext.segmentIndex === eiCurr.segmentIndex) pNext = eiNext.coord;
		var e = new EdgeEnd(edge, eiCurr.coord, pNext, new Label(edge.getLabel()));
		l.add(e);
	}
	createEdgeEndForPrev(edge, l, eiCurr, eiPrev) {
		var iPrev = eiCurr.segmentIndex;
		if (eiCurr.dist === 0.0) {
			if (iPrev === 0) return null;
			iPrev--;
		}
		var pPrev = edge.getCoordinate(iPrev);
		if (eiPrev !== null && eiPrev.segmentIndex >= iPrev) pPrev = eiPrev.coord;
		var label = new Label(edge.getLabel());
		label.flip();
		var e = new EdgeEnd(edge, eiCurr.coord, pPrev, label);
		l.add(e);
	}
	computeEdgeEnds(...args) {
		if (args.length === 1) {
			let [edges] = args;
			var l = new ArrayList();
			for (var i = edges; i.hasNext(); ) {
				var e = i.next();
				this.computeEdgeEnds(e, l);
			}
			return l;
		} else if (args.length === 2) {
			let [edge, l] = args;
			var eiList = edge.getEdgeIntersectionList();
			eiList.addEndpoints();
			var it = eiList.iterator();
			var eiPrev = null;
			var eiCurr = null;
			if (!it.hasNext()) return null;
			var eiNext = it.next();
			do {
				eiPrev = eiCurr;
				eiCurr = eiNext;
				eiNext = null;
				if (it.hasNext()) eiNext = it.next();
				if (eiCurr !== null) {
					this.createEdgeEndForPrev(edge, l, eiCurr, eiPrev);
					this.createEdgeEndForNext(edge, l, eiCurr, eiNext);
				}
			} while (eiCurr !== null);
		}
	}
	getClass() {
		return EdgeEndBuilder;
	}
}

class EdgeEndBundle extends EdgeEnd {
	constructor(...args) {
		super();
		this.edgeEnds = new ArrayList();
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [e] = args;
					overloaded.call(this, null, e);
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [boundaryNodeRule, e] = args;
					super(e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new Label(e.getLabel()));
					this.insert(e);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	insert(e) {
		this.edgeEnds.add(e);
	}
	print(out) {
		out.println("EdgeEndBundle--> Label: " + this.label);
		for (var it = this.iterator(); it.hasNext(); ) {
			var ee = it.next();
			ee.print(out);
			out.println();
		}
	}
	iterator() {
		return this.edgeEnds.iterator();
	}
	getEdgeEnds() {
		return this.edgeEnds;
	}
	computeLabelOn(geomIndex, boundaryNodeRule) {
		var boundaryCount = 0;
		var foundInterior = false;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			var loc = e.getLabel().getLocation(geomIndex);
			if (loc === Location.BOUNDARY) boundaryCount++;
			if (loc === Location.INTERIOR) foundInterior = true;
		}
		var loc = Location.NONE;
		if (foundInterior) loc = Location.INTERIOR;
		if (boundaryCount > 0) {
			loc = GeometryGraph.determineBoundary(boundaryNodeRule, boundaryCount);
		}
		this.label.setLocation(geomIndex, loc);
	}
	computeLabelSide(geomIndex, side) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.getLabel().isArea()) {
				var loc = e.getLabel().getLocation(geomIndex, side);
				if (loc === Location.INTERIOR) {
					this.label.setLocation(geomIndex, side, Location.INTERIOR);
					return null;
				} else if (loc === Location.EXTERIOR) this.label.setLocation(geomIndex, side, Location.EXTERIOR);
			}
		}
	}
	getLabel() {
		return this.label;
	}
	computeLabelSides(geomIndex) {
		this.computeLabelSide(geomIndex, Position.LEFT);
		this.computeLabelSide(geomIndex, Position.RIGHT);
	}
	updateIM(im) {
		Edge.updateIM(this.label, im);
	}
	computeLabel(boundaryNodeRule) {
		var isArea = false;
		for (var it = this.iterator(); it.hasNext(); ) {
			var e = it.next();
			if (e.getLabel().isArea()) isArea = true;
		}
		if (isArea) this.label = new Label(Location.NONE, Location.NONE, Location.NONE); else this.label = new Label(Location.NONE);
		for (var i = 0; i < 2; i++) {
			this.computeLabelOn(i, boundaryNodeRule);
			if (isArea) this.computeLabelSides(i);
		}
	}
	getClass() {
		return EdgeEndBundle;
	}
}

class EdgeEndBundleStar extends EdgeEndStar {
	constructor(...args) {
		super();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	updateIM(im) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var esb = it.next();
			esb.updateIM(im);
		}
	}
	insert(e) {
		var eb = this.edgeMap.get(e);
		if (eb === null) {
			eb = new EdgeEndBundle(e);
			this.insertEdgeEnd(e, eb);
		} else {
			eb.insert(e);
		}
	}
	getClass() {
		return EdgeEndBundleStar;
	}
}

class RelateNode extends Node$1 {
	constructor(...args) {
		super();
		if (args.length === 2) {
			let [coord, edges] = args;
			super(coord, edges);
		}
	}
	get interfaces_() {
		return [];
	}
	updateIMFromEdges(im) {
		this.edges.updateIM(im);
	}
	computeIM(im) {
		im.setAtLeastIfValid(this.label.getLocation(0), this.label.getLocation(1), 0);
	}
	getClass() {
		return RelateNode;
	}
}

class RelateNodeFactory extends NodeFactory {
	get interfaces_() {
		return [];
	}
	createNode(coord) {
		return new RelateNode(coord, new EdgeEndBundleStar());
	}
	getClass() {
		return RelateNodeFactory;
	}
}

class RelateComputer {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.ptLocator = new PointLocator();
		this.arg = null;
		this.nodes = new NodeMap(new RelateNodeFactory());
		this.im = null;
		this.isolatedEdges = new ArrayList();
		this.invalidPoint = null;
		if (args.length === 1) {
			let [arg] = args;
			this.arg = arg;
		}
	}
	get interfaces_() {
		return [];
	}
	insertEdgeEnds(ee) {
		for (var i = ee.iterator(); i.hasNext(); ) {
			var e = i.next();
			this.nodes.add(e);
		}
	}
	computeProperIntersectionIM(intersector, im) {
		var dimA = this.arg[0].getGeometry().getDimension();
		var dimB = this.arg[1].getGeometry().getDimension();
		var hasProper = intersector.hasProperIntersection();
		var hasProperInterior = intersector.hasProperInteriorIntersection();
		if (dimA === 2 && dimB === 2) {
			if (hasProper) im.setAtLeast("212101212");
		} else if (dimA === 2 && dimB === 1) {
			if (hasProper) im.setAtLeast("FFF0FFFF2");
			if (hasProperInterior) im.setAtLeast("1FFFFF1FF");
		} else if (dimA === 1 && dimB === 2) {
			if (hasProper) im.setAtLeast("F0FFFFFF2");
			if (hasProperInterior) im.setAtLeast("1F1FFFFFF");
		} else if (dimA === 1 && dimB === 1) {
			if (hasProperInterior) im.setAtLeast("0FFFFFFFF");
		}
	}
	labelIsolatedEdges(thisIndex, targetIndex) {
		for (var ei = this.arg[thisIndex].getEdgeIterator(); ei.hasNext(); ) {
			var e = ei.next();
			if (e.isIsolated()) {
				this.labelIsolatedEdge(e, targetIndex, this.arg[targetIndex].getGeometry());
				this.isolatedEdges.add(e);
			}
		}
	}
	labelIsolatedEdge(e, targetIndex, target) {
		if (target.getDimension() > 0) {
			var loc = this.ptLocator.locate(e.getCoordinate(), target);
			e.getLabel().setAllLocations(targetIndex, loc);
		} else {
			e.getLabel().setAllLocations(targetIndex, Location.EXTERIOR);
		}
	}
	computeIM() {
		var im = new IntersectionMatrix();
		im.set(Location.EXTERIOR, Location.EXTERIOR, 2);
		if (!this.arg[0].getGeometry().getEnvelopeInternal().intersects(this.arg[1].getGeometry().getEnvelopeInternal())) {
			this.computeDisjointIM(im);
			return im;
		}
		this.arg[0].computeSelfNodes(this.li, false);
		this.arg[1].computeSelfNodes(this.li, false);
		var intersector = this.arg[0].computeEdgeIntersections(this.arg[1], this.li, false);
		this.computeIntersectionNodes(0);
		this.computeIntersectionNodes(1);
		this.copyNodesAndLabels(0);
		this.copyNodesAndLabels(1);
		this.labelIsolatedNodes();
		this.computeProperIntersectionIM(intersector, im);
		var eeBuilder = new EdgeEndBuilder();
		var ee0 = eeBuilder.computeEdgeEnds(this.arg[0].getEdgeIterator());
		this.insertEdgeEnds(ee0);
		var ee1 = eeBuilder.computeEdgeEnds(this.arg[1].getEdgeIterator());
		this.insertEdgeEnds(ee1);
		this.labelNodeEdges();
		this.labelIsolatedEdges(0, 1);
		this.labelIsolatedEdges(1, 0);
		this.updateIM(im);
		return im;
	}
	labelNodeEdges() {
		for (var ni = this.nodes.iterator(); ni.hasNext(); ) {
			var node = ni.next();
			node.getEdges().computeLabelling(this.arg);
		}
	}
	copyNodesAndLabels(argIndex) {
		for (var i = this.arg[argIndex].getNodeIterator(); i.hasNext(); ) {
			var graphNode = i.next();
			var newNode = this.nodes.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	}
	labelIntersectionNodes(argIndex) {
		for (var i = this.arg[argIndex].getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var eLoc = e.getLabel().getLocation(argIndex);
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				var n = this.nodes.find(ei.coord);
				if (n.getLabel().isNull(argIndex)) {
					if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else n.setLabel(argIndex, Location.INTERIOR);
				}
			}
		}
	}
	labelIsolatedNode(n, targetIndex) {
		var loc = this.ptLocator.locate(n.getCoordinate(), this.arg[targetIndex].getGeometry());
		n.getLabel().setAllLocations(targetIndex, loc);
	}
	computeIntersectionNodes(argIndex) {
		for (var i = this.arg[argIndex].getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var eLoc = e.getLabel().getLocation(argIndex);
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				var n = this.nodes.addNode(ei.coord);
				if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else {
					if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR);
				}
			}
		}
	}
	labelIsolatedNodes() {
		for (var ni = this.nodes.iterator(); ni.hasNext(); ) {
			var n = ni.next();
			var label = n.getLabel();
			Assert.isTrue(label.getGeometryCount() > 0, "node with empty label found");
			if (n.isIsolated()) {
				if (label.isNull(0)) this.labelIsolatedNode(n, 0); else this.labelIsolatedNode(n, 1);
			}
		}
	}
	updateIM(im) {
		for (var ei = this.isolatedEdges.iterator(); ei.hasNext(); ) {
			var e = ei.next();
			e.updateIM(im);
		}
		for (var ni = this.nodes.iterator(); ni.hasNext(); ) {
			var node = ni.next();
			node.updateIM(im);
			node.updateIMFromEdges(im);
		}
	}
	computeDisjointIM(im) {
		var ga = this.arg[0].getGeometry();
		if (!ga.isEmpty()) {
			im.set(Location.INTERIOR, Location.EXTERIOR, ga.getDimension());
			im.set(Location.BOUNDARY, Location.EXTERIOR, ga.getBoundaryDimension());
		}
		var gb = this.arg[1].getGeometry();
		if (!gb.isEmpty()) {
			im.set(Location.EXTERIOR, Location.INTERIOR, gb.getDimension());
			im.set(Location.EXTERIOR, Location.BOUNDARY, gb.getBoundaryDimension());
		}
	}
	getClass() {
		return RelateComputer;
	}
}

class RelateOp$1 extends GeometryGraphOperation {
	constructor(...args) {
		super();
		this._relate = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [g0, g1] = args;
					super(g0, g1);
					this._relate = new RelateComputer(this.arg);
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [g0, g1, boundaryNodeRule] = args;
					super(g0, g1, boundaryNodeRule);
					this._relate = new RelateComputer(this.arg);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static relate(...args) {
		if (args.length === 2) {
			let [a, b] = args;
			var relOp = new RelateOp$1(a, b);
			var im = relOp.getIntersectionMatrix();
			return im;
		} else if (args.length === 3) {
			let [a, b, boundaryNodeRule] = args;
			var relOp = new RelateOp$1(a, b, boundaryNodeRule);
			var im = relOp.getIntersectionMatrix();
			return im;
		}
	}
	getIntersectionMatrix() {
		return this._relate.computeIM();
	}
	getClass() {
		return RelateOp$1;
	}
}

class GeometryCombiner {
	constructor(...args) {
		this.geomFactory = null;
		this.skipEmpty = false;
		this.inputGeoms = null;
		if (args.length === 1) {
			let [geoms] = args;
			this.geomFactory = GeometryCombiner.extractFactory(geoms);
			this.inputGeoms = geoms;
		}
	}
	get interfaces_() {
		return [];
	}
	static combine(...args) {
		if (args.length === 1) {
			let [geoms] = args;
			var combiner = new GeometryCombiner(geoms);
			return combiner.combine();
		} else if (args.length === 2) {
			let [g0, g1] = args;
			var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1));
			return combiner.combine();
		} else if (args.length === 3) {
			let [g0, g1, g2] = args;
			var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1, g2));
			return combiner.combine();
		}
	}
	static extractFactory(geoms) {
		if (geoms.isEmpty()) return null;
		return geoms.iterator().next().getFactory();
	}
	static createList(...args) {
		if (args.length === 2) {
			let [obj0, obj1] = args;
			var list = new ArrayList();
			list.add(obj0);
			list.add(obj1);
			return list;
		} else if (args.length === 3) {
			let [obj0, obj1, obj2] = args;
			var list = new ArrayList();
			list.add(obj0);
			list.add(obj1);
			list.add(obj2);
			return list;
		}
	}
	extractElements(geom, elems) {
		if (geom === null) return null;
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var elemGeom = geom.getGeometryN(i);
			if (this.skipEmpty && elemGeom.isEmpty()) continue;
			elems.add(elemGeom);
		}
	}
	combine() {
		var elems = new ArrayList();
		for (var i = this.inputGeoms.iterator(); i.hasNext(); ) {
			var g = i.next();
			this.extractElements(g, elems);
		}
		if (elems.size() === 0) {
			if (this.geomFactory !== null) {
				return this.geomFactory.createGeometryCollection(null);
			}
			return null;
		}
		return this.geomFactory.buildGeometry(elems);
	}
	getClass() {
		return GeometryCombiner;
	}
}

class CascadedPolygonUnion {
	constructor(...args) {
		this.inputPolys = null;
		this.geomFactory = null;
		if (args.length === 1) {
			let [polys] = args;
			this.inputPolys = polys;
			if (this.inputPolys === null) this.inputPolys = new ArrayList();
		}
	}
	get interfaces_() {
		return [];
	}
	static restrictToPolygons(g) {
		if (g.interfaces_ && g.interfaces_.indexOf(Polygonal) > -1) {
			return g;
		}
		var polygons = PolygonExtracter.getPolygons(g);
		if (polygons.size() === 1) return polygons.get(0);
		return g.getFactory().createMultiPolygon(GeometryFactory.toPolygonArray(polygons));
	}
	static getGeometry(list, index) {
		if (index >= list.size()) return null;
		return list.get(index);
	}
	static union(polys) {
		var op = new CascadedPolygonUnion(polys);
		return op.union();
	}
	reduceToGeometries(geomTree) {
		var geoms = new ArrayList();
		for (var i = geomTree.iterator(); i.hasNext(); ) {
			var o = i.next();
			var geom = null;
			if (o.interfaces_ && o.interfaces_.indexOf(List) > -1) {
				geom = this.unionTree(o);
			} else if (o instanceof Geometry) {
				geom = o;
			}
			geoms.add(geom);
		}
		return geoms;
	}
	extractByEnvelope(env, geom, disjointGeoms) {
		var intersectingGeoms = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var elem = geom.getGeometryN(i);
			if (elem.getEnvelopeInternal().intersects(env)) intersectingGeoms.add(elem); else disjointGeoms.add(elem);
		}
		return this.geomFactory.buildGeometry(intersectingGeoms);
	}
	unionOptimized(g0, g1) {
		var g0Env = g0.getEnvelopeInternal();
		var g1Env = g1.getEnvelopeInternal();
		if (!g0Env.intersects(g1Env)) {
			var combo = GeometryCombiner.combine(g0, g1);
			return combo;
		}
		if (g0.getNumGeometries() <= 1 && g1.getNumGeometries() <= 1) return this.unionActual(g0, g1);
		var commonEnv = g0Env.intersection(g1Env);
		return this.unionUsingEnvelopeIntersection(g0, g1, commonEnv);
	}
	union() {
		if (this.inputPolys === null) throw new IllegalStateException("union() method cannot be called twice");
		if (this.inputPolys.isEmpty()) return null;
		this.geomFactory = this.inputPolys.iterator().next().getFactory();
		var index = new STRtree(CascadedPolygonUnion.STRTREE_NODE_CAPACITY);
		for (var i = this.inputPolys.iterator(); i.hasNext(); ) {
			var item = i.next();
			index.insert(item.getEnvelopeInternal(), item);
		}
		this.inputPolys = null;
		var itemTree = index.itemsTree();
		var unionAll = this.unionTree(itemTree);
		return unionAll;
	}
	binaryUnion(...args) {
		if (args.length === 1) {
			let [geoms] = args;
			return this.binaryUnion(geoms, 0, geoms.size());
		} else if (args.length === 3) {
			let [geoms, start, end] = args;
			if (end - start <= 1) {
				var g0 = CascadedPolygonUnion.getGeometry(geoms, start);
				return this.unionSafe(g0, null);
			} else if (end - start === 2) {
				return this.unionSafe(CascadedPolygonUnion.getGeometry(geoms, start), CascadedPolygonUnion.getGeometry(geoms, start + 1));
			} else {
				var mid = Math.trunc((end + start) / 2);
				var g0 = this.binaryUnion(geoms, start, mid);
				var g1 = this.binaryUnion(geoms, mid, end);
				return this.unionSafe(g0, g1);
			}
		}
	}
	repeatedUnion(geoms) {
		var union = null;
		for (var i = geoms.iterator(); i.hasNext(); ) {
			var g = i.next();
			if (union === null) union = g.copy(); else union = union.union(g);
		}
		return union;
	}
	unionSafe(g0, g1) {
		if (g0 === null && g1 === null) return null;
		if (g0 === null) return g1.copy();
		if (g1 === null) return g0.copy();
		return this.unionOptimized(g0, g1);
	}
	unionActual(g0, g1) {
		return CascadedPolygonUnion.restrictToPolygons(g0.union(g1));
	}
	unionTree(geomTree) {
		var geoms = this.reduceToGeometries(geomTree);
		var union = this.binaryUnion(geoms);
		return union;
	}
	unionUsingEnvelopeIntersection(g0, g1, common) {
		var disjointPolys = new ArrayList();
		var g0Int = this.extractByEnvelope(common, g0, disjointPolys);
		var g1Int = this.extractByEnvelope(common, g1, disjointPolys);
		var union = this.unionActual(g0Int, g1Int);
		disjointPolys.add(union);
		var overallUnion = GeometryCombiner.combine(disjointPolys);
		return overallUnion;
	}
	bufferUnion(...args) {
		if (args.length === 1) {
			let [geoms] = args;
			var factory = geoms.get(0).getFactory();
			var gColl = factory.buildGeometry(geoms);
			var unionAll = gColl.buffer(0.0);
			return unionAll;
		} else if (args.length === 2) {
			let [g0, g1] = args;
			var factory = g0.getFactory();
			var gColl = factory.createGeometryCollection([g0, g1]);
			var unionAll = gColl.buffer(0.0);
			return unionAll;
		}
	}
	getClass() {
		return CascadedPolygonUnion;
	}
}
CascadedPolygonUnion.STRTREE_NODE_CAPACITY = 4;

class PointGeometryUnion {
	constructor(...args) {
		this.pointGeom = null;
		this.otherGeom = null;
		this.geomFact = null;
		if (args.length === 2) {
			let [pointGeom, otherGeom] = args;
			this.pointGeom = pointGeom;
			this.otherGeom = otherGeom;
			this.geomFact = otherGeom.getFactory();
		}
	}
	get interfaces_() {
		return [];
	}
	static union(pointGeom, otherGeom) {
		var unioner = new PointGeometryUnion(pointGeom, otherGeom);
		return unioner.union();
	}
	union() {
		var locater = new PointLocator();
		var exteriorCoords = new TreeSet();
		for (var i = 0; i < this.pointGeom.getNumGeometries(); i++) {
			var point = this.pointGeom.getGeometryN(i);
			var coord = point.getCoordinate();
			var loc = locater.locate(coord, this.otherGeom);
			if (loc === Location.EXTERIOR) exteriorCoords.add(coord);
		}
		if (exteriorCoords.size() === 0) return this.otherGeom;
		var ptComp = null;
		var coords = CoordinateArrays.toCoordinateArray(exteriorCoords);
		if (coords.length === 1) {
			ptComp = this.geomFact.createPoint(coords[0]);
		} else {
			ptComp = this.geomFact.createMultiPointFromCoords(coords);
		}
		return GeometryCombiner.combine(ptComp, this.otherGeom);
	}
	getClass() {
		return PointGeometryUnion;
	}
}

class LineStringSnapper {
	constructor(...args) {
		this.snapTolerance = 0.0;
		this.srcPts = null;
		this.seg = new LineSegment();
		this.allowSnappingToSourceVertices = false;
		this._isClosed = false;
		const overloaded = (...args) => {
			if (args.length === 2) {
				if (args[0] instanceof LineString && typeof args[1] === "number") {
					let [srcLine, snapTolerance] = args;
					overloaded.call(this, srcLine.getCoordinates(), snapTolerance);
				} else if (args[0] instanceof Array && typeof args[1] === "number") {
					let [srcPts, snapTolerance] = args;
					this.srcPts = srcPts;
					this._isClosed = LineStringSnapper.isClosed(srcPts);
					this.snapTolerance = snapTolerance;
				}
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static isClosed(pts) {
		if (pts.length <= 1) return false;
		return pts[0].equals2D(pts[pts.length - 1]);
	}
	snapVertices(srcCoords, snapPts) {
		var end = this._isClosed ? srcCoords.size() - 1 : srcCoords.size();
		for (var i = 0; i < end; i++) {
			var srcPt = srcCoords.get(i);
			var snapVert = this.findSnapForVertex(srcPt, snapPts);
			if (snapVert !== null) {
				srcCoords.set(i, new Coordinate(snapVert));
				if (i === 0 && this._isClosed) srcCoords.set(srcCoords.size() - 1, new Coordinate(snapVert));
			}
		}
	}
	findSnapForVertex(pt, snapPts) {
		for (var i = 0; i < snapPts.length; i++) {
			if (pt.equals2D(snapPts[i])) return null;
			if (pt.distance(snapPts[i]) < this.snapTolerance) return snapPts[i];
		}
		return null;
	}
	snapTo(snapPts) {
		var coordList = new CoordinateList(this.srcPts);
		this.snapVertices(coordList, snapPts);
		this.snapSegments(coordList, snapPts);
		var newPts = coordList.toCoordinateArray();
		return newPts;
	}
	snapSegments(srcCoords, snapPts) {
		if (snapPts.length === 0) return null;
		var distinctPtCount = snapPts.length;
		if (snapPts[0].equals2D(snapPts[snapPts.length - 1])) distinctPtCount = snapPts.length - 1;
		for (var i = 0; i < distinctPtCount; i++) {
			var snapPt = snapPts[i];
			var index = this.findSegmentIndexToSnap(snapPt, srcCoords);
			if (index >= 0) {
				srcCoords.add(index + 1, new Coordinate(snapPt), false);
			}
		}
	}
	findSegmentIndexToSnap(snapPt, srcCoords) {
		var minDist = Double.MAX_VALUE;
		var snapIndex = -1;
		for (var i = 0; i < srcCoords.size() - 1; i++) {
			this.seg.p0 = srcCoords.get(i);
			this.seg.p1 = srcCoords.get(i + 1);
			if (this.seg.p0.equals2D(snapPt) || this.seg.p1.equals2D(snapPt)) {
				if (this.allowSnappingToSourceVertices) continue; else return -1;
			}
			var dist = this.seg.distance(snapPt);
			if (dist < this.snapTolerance && dist < minDist) {
				minDist = dist;
				snapIndex = i;
			}
		}
		return snapIndex;
	}
	setAllowSnappingToSourceVertices(allowSnappingToSourceVertices) {
		this.allowSnappingToSourceVertices = allowSnappingToSourceVertices;
	}
	getClass() {
		return LineStringSnapper;
	}
}

class GeometrySnapper {
	constructor(...args) {
		this.srcGeom = null;
		if (args.length === 1) {
			let [srcGeom] = args;
			this.srcGeom = srcGeom;
		}
	}
	get interfaces_() {
		return [];
	}
	static snap(g0, g1, snapTolerance) {
		var snapGeom = new Array(2);
		var snapper0 = new GeometrySnapper(g0);
		snapGeom[0] = snapper0.snapTo(g1, snapTolerance);
		var snapper1 = new GeometrySnapper(g1);
		snapGeom[1] = snapper1.snapTo(snapGeom[0], snapTolerance);
		return snapGeom;
	}
	static computeOverlaySnapTolerance(...args) {
		if (args.length === 1) {
			let [g] = args;
			var snapTolerance = GeometrySnapper.computeSizeBasedSnapTolerance(g);
			var pm = g.getPrecisionModel();
			if (pm.getType() === PrecisionModel.FIXED) {
				var fixedSnapTol = 1 / pm.getScale() * 2 / 1.415;
				if (fixedSnapTol > snapTolerance) snapTolerance = fixedSnapTol;
			}
			return snapTolerance;
		} else if (args.length === 2) {
			let [g0, g1] = args;
			return Math.min(GeometrySnapper.computeOverlaySnapTolerance(g0), GeometrySnapper.computeOverlaySnapTolerance(g1));
		}
	}
	static computeSizeBasedSnapTolerance(g) {
		var env = g.getEnvelopeInternal();
		var minDimension = Math.min(env.getHeight(), env.getWidth());
		var snapTol = minDimension * GeometrySnapper.SNAP_PRECISION_FACTOR;
		return snapTol;
	}
	static snapToSelf(geom, snapTolerance, cleanResult) {
		var snapper0 = new GeometrySnapper(geom);
		return snapper0.snapToSelf(snapTolerance, cleanResult);
	}
	snapTo(snapGeom, snapTolerance) {
		var snapPts = this.extractTargetCoordinates(snapGeom);
		var snapTrans = new SnapTransformer(snapTolerance, snapPts);
		return snapTrans.transform(this.srcGeom);
	}
	snapToSelf(snapTolerance, cleanResult) {
		var snapPts = this.extractTargetCoordinates(this.srcGeom);
		var snapTrans = new SnapTransformer(snapTolerance, snapPts, true);
		var snappedGeom = snapTrans.transform(this.srcGeom);
		var result = snappedGeom;
		if (cleanResult && (result.interfaces_ && result.interfaces_.indexOf(Polygonal) > -1)) {
			result = snappedGeom.buffer(0);
		}
		return result;
	}
	computeSnapTolerance(ringPts) {
		var minSegLen = this.computeMinimumSegmentLength(ringPts);
		var snapTol = minSegLen / 10;
		return snapTol;
	}
	extractTargetCoordinates(g) {
		var ptSet = new TreeSet();
		var pts = g.getCoordinates();
		for (var i = 0; i < pts.length; i++) {
			ptSet.add(pts[i]);
		}
		return ptSet.toArray(new Array(0));
	}
	computeMinimumSegmentLength(pts) {
		var minSegLen = Double.MAX_VALUE;
		for (var i = 0; i < pts.length - 1; i++) {
			var segLen = pts[i].distance(pts[i + 1]);
			if (segLen < minSegLen) minSegLen = segLen;
		}
		return minSegLen;
	}
	getClass() {
		return GeometrySnapper;
	}
}
GeometrySnapper.SNAP_PRECISION_FACTOR = 1e-9;
class SnapTransformer extends GeometryTransformer {
	constructor(...args) {
		super();
		this.snapTolerance = null;
		this.snapPts = null;
		this.isSelfSnap = false;
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [snapTolerance, snapPts] = args;
					this.snapTolerance = snapTolerance;
					this.snapPts = snapPts;
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [snapTolerance, snapPts, isSelfSnap] = args;
					this.snapTolerance = snapTolerance;
					this.snapPts = snapPts;
					this.isSelfSnap = isSelfSnap;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	snapLine(srcPts, snapPts) {
		var snapper = new LineStringSnapper(srcPts, this.snapTolerance);
		snapper.setAllowSnappingToSourceVertices(this.isSelfSnap);
		return snapper.snapTo(snapPts);
	}
	transformCoordinates(coords, parent) {
		var srcPts = coords.toCoordinateArray();
		var newPts = this.snapLine(srcPts, this.snapPts);
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	}
	getClass() {
		return SnapTransformer;
	}
}

class CommonBits {
	constructor(...args) {
		this.isFirst = true;
		this.commonMantissaBitsCount = 53;
		this.commonBits = 0;
		this.commonSignExp = null;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static getBit(bits, i) {
		var mask = 1 << i;
		return (bits & mask) !== 0 ? 1 : 0;
	}
	static signExpBits(num) {
		return num >> 52;
	}
	static zeroLowerBits(bits, nBits) {
		var invMask = (1 << nBits) - 1;
		var mask = ~invMask;
		var zeroed = bits & mask;
		return zeroed;
	}
	static numCommonMostSigMantissaBits(num1, num2) {
		var count = 0;
		for (var i = 52; i >= 0; i--) {
			if (CommonBits.getBit(num1, i) !== CommonBits.getBit(num2, i)) return count;
			count++;
		}
		return 52;
	}
	getCommon() {
		return Double.longBitsToDouble(this.commonBits);
	}
	add(num) {
		var numBits = Double.doubleToLongBits(num);
		if (this.isFirst) {
			this.commonBits = numBits;
			this.commonSignExp = CommonBits.signExpBits(this.commonBits);
			this.isFirst = false;
			return null;
		}
		var numSignExp = CommonBits.signExpBits(numBits);
		if (numSignExp !== this.commonSignExp) {
			this.commonBits = 0;
			return null;
		}
		this.commonMantissaBitsCount = CommonBits.numCommonMostSigMantissaBits(this.commonBits, numBits);
		this.commonBits = CommonBits.zeroLowerBits(this.commonBits, 64 - (12 + this.commonMantissaBitsCount));
	}
	toString(...args) {
		if (args.length === 1) {
			let [bits] = args;
			var x = Double.longBitsToDouble(bits);
			var numStr = Long.toBinaryString(bits);
			var padStr = "0000000000000000000000000000000000000000000000000000000000000000" + numStr;
			var bitStr = padStr.substring(padStr.length - 64);
			var str = bitStr.substring(0, 1) + "  " + bitStr.substring(1, 12) + "(exp) " + bitStr.substring(12) + " [ " + x + " ]";
			return str;
		} else return super.toString(...args);
	}
	getClass() {
		return CommonBits;
	}
}

class CommonBitsRemover {
	constructor(...args) {
		this.commonCoord = null;
		this.ccFilter = new CommonCoordinateFilter();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static get CommonCoordinateFilter() {
		return CommonCoordinateFilter;
	}
	static get Translater() {
		return Translater;
	}
	addCommonBits(geom) {
		var trans = new Translater(this.commonCoord);
		geom.apply(trans);
		geom.geometryChanged();
	}
	removeCommonBits(geom) {
		if (this.commonCoord.x === 0.0 && this.commonCoord.y === 0.0) return geom;
		var invCoord = new Coordinate(this.commonCoord);
		invCoord.x = -invCoord.x;
		invCoord.y = -invCoord.y;
		var trans = new Translater(invCoord);
		geom.apply(trans);
		geom.geometryChanged();
		return geom;
	}
	getCommonCoordinate() {
		return this.commonCoord;
	}
	add(geom) {
		geom.apply(this.ccFilter);
		this.commonCoord = this.ccFilter.getCommonCoordinate();
	}
	getClass() {
		return CommonBitsRemover;
	}
}
class CommonCoordinateFilter {
	constructor(...args) {
		this.commonBitsX = new CommonBits();
		this.commonBitsY = new CommonBits();
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	filter(coord) {
		this.commonBitsX.add(coord.x);
		this.commonBitsY.add(coord.y);
	}
	getCommonCoordinate() {
		return new Coordinate(this.commonBitsX.getCommon(), this.commonBitsY.getCommon());
	}
	getClass() {
		return CommonCoordinateFilter;
	}
}
class Translater {
	constructor(...args) {
		this.trans = null;
		if (args.length === 1) {
			let [trans] = args;
			this.trans = trans;
		}
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
	filter(seq, i) {
		var xp = seq.getOrdinate(i, 0) + this.trans.x;
		var yp = seq.getOrdinate(i, 1) + this.trans.y;
		seq.setOrdinate(i, 0, xp);
		seq.setOrdinate(i, 1, yp);
	}
	isDone() {
		return false;
	}
	isGeometryChanged() {
		return true;
	}
	getClass() {
		return Translater;
	}
}

class SnapOverlayOp {
	constructor(...args) {
		this.geom = new Array(2);
		this.snapTolerance = null;
		this.cbr = null;
		if (args.length === 2) {
			let [g1, g2] = args;
			this.geom[0] = g1;
			this.geom[1] = g2;
			this.computeSnapTolerance();
		}
	}
	get interfaces_() {
		return [];
	}
	static overlayOp(g0, g1, opCode) {
		var op = new SnapOverlayOp(g0, g1);
		return op.getResultGeometry(opCode);
	}
	static union(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp$1.UNION);
	}
	static intersection(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp$1.INTERSECTION);
	}
	static symDifference(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp$1.SYMDIFFERENCE);
	}
	static difference(g0, g1) {
		return SnapOverlayOp.overlayOp(g0, g1, OverlayOp$1.DIFFERENCE);
	}
	selfSnap(geom) {
		var snapper0 = new GeometrySnapper(geom);
		var snapGeom = snapper0.snapTo(geom, this.snapTolerance);
		return snapGeom;
	}
	removeCommonBits(geom) {
		this.cbr = new CommonBitsRemover();
		this.cbr.add(geom[0]);
		this.cbr.add(geom[1]);
		var remGeom = new Array(2);
		remGeom[0] = this.cbr.removeCommonBits(geom[0].copy());
		remGeom[1] = this.cbr.removeCommonBits(geom[1].copy());
		return remGeom;
	}
	prepareResult(geom) {
		this.cbr.addCommonBits(geom);
		return geom;
	}
	getResultGeometry(opCode) {
		var prepGeom = this.snap(this.geom);
		var result = OverlayOp$1.overlayOp(prepGeom[0], prepGeom[1], opCode);
		return this.prepareResult(result);
	}
	checkValid(g) {
		if (!g.isValid()) {
			System.out.println("Snapped geometry is invalid");
		}
	}
	computeSnapTolerance() {
		this.snapTolerance = GeometrySnapper.computeOverlaySnapTolerance(this.geom[0], this.geom[1]);
	}
	snap(geom) {
		var remGeom = this.removeCommonBits(geom);
		var snapGeom = GeometrySnapper.snap(remGeom[0], remGeom[1], this.snapTolerance);
		return snapGeom;
	}
	getClass() {
		return SnapOverlayOp;
	}
}

class SnapIfNeededOverlayOp$1 {
	constructor(...args) {
		this.geom = new Array(2);
		if (args.length === 2) {
			let [g1, g2] = args;
			this.geom[0] = g1;
			this.geom[1] = g2;
		}
	}
	get interfaces_() {
		return [];
	}
	static overlayOp(g0, g1, opCode) {
		var op = new SnapIfNeededOverlayOp$1(g0, g1);
		return op.getResultGeometry(opCode);
	}
	static union(g0, g1) {
		return SnapIfNeededOverlayOp$1.overlayOp(g0, g1, OverlayOp$1.UNION);
	}
	static intersection(g0, g1) {
		return SnapIfNeededOverlayOp$1.overlayOp(g0, g1, OverlayOp$1.INTERSECTION);
	}
	static symDifference(g0, g1) {
		return SnapIfNeededOverlayOp$1.overlayOp(g0, g1, OverlayOp$1.SYMDIFFERENCE);
	}
	static difference(g0, g1) {
		return SnapIfNeededOverlayOp$1.overlayOp(g0, g1, OverlayOp$1.DIFFERENCE);
	}
	getResultGeometry(opCode) {
		var result = null;
		var isSuccess = false;
		var savedException = null;
		try {
			result = OverlayOp$1.overlayOp(this.geom[0], this.geom[1], opCode);
			var isValid = true;
			if (isValid) isSuccess = true;
		} catch (ex) {
			if (ex instanceof RuntimeException) {
				savedException = ex;
			} else throw ex;
		} finally {}
		if (!isSuccess) {
			try {
				result = SnapOverlayOp.overlayOp(this.geom[0], this.geom[1], opCode);
			} catch (ex) {
				if (ex instanceof RuntimeException) {
					throw savedException;
				} else throw ex;
			} finally {}
		}
		return result;
	}
	getClass() {
		return SnapIfNeededOverlayOp$1;
	}
}

class GeometryExtracter {
	constructor(...args) {
		this.clz = null;
		this.comps = null;
		if (args.length === 2) {
			let [clz, comps] = args;
			this.clz = clz;
			this.comps = comps;
		}
	}
	get interfaces_() {
		return [GeometryFilter];
	}
	static isOfClass(o, clz) {
		return clz.isAssignableFrom(o.getClass());
	}
	static extract(...args) {
		if (args.length === 2) {
			let [geom, clz] = args;
			return GeometryExtracter.extract(geom, clz, new ArrayList());
		} else if (args.length === 3) {
			let [geom, clz, list] = args;
			if (GeometryExtracter.isOfClass(geom, clz)) {
				list.add(geom);
			} else if (geom instanceof GeometryCollection) {
				geom.apply(new GeometryExtracter(clz, list));
			}
			return list;
		}
	}
	filter(geom) {
		if (this.clz === null || GeometryExtracter.isOfClass(geom, this.clz)) this.comps.add(geom);
	}
	getClass() {
		return GeometryExtracter;
	}
}

class UnaryUnionOp$1 {
	constructor(...args) {
		this.polygons = new ArrayList();
		this.lines = new ArrayList();
		this.points = new ArrayList();
		this.geomFact = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					let [geoms] = args;
					this.extract(geoms);
				} else if (args[0] instanceof Geometry) {
					let [geom] = args;
					this.extract(geom);
				}
			} else if (args.length === 2) {
				let [geoms, geomFact] = args;
				this.geomFact = geomFact;
				this.extract(geoms);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static union(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geoms] = args;
				var op = new UnaryUnionOp$1(geoms);
				return op.union();
			} else if (args[0] instanceof Geometry) {
				let [geom] = args;
				var op = new UnaryUnionOp$1(geom);
				return op.union();
			}
		} else if (args.length === 2) {
			let [geoms, geomFact] = args;
			var op = new UnaryUnionOp$1(geoms, geomFact);
			return op.union();
		}
	}
	unionNoOpt(g0) {
		var empty = this.geomFact.createPoint();
		return SnapIfNeededOverlayOp$1.overlayOp(g0, empty, OverlayOp$1.UNION);
	}
	unionWithNull(g0, g1) {
		if (g0 === null && g1 === null) return null;
		if (g1 === null) return g0;
		if (g0 === null) return g1;
		return g0.union(g1);
	}
	extract(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geoms] = args;
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var geom = i.next();
					this.extract(geom);
				}
			} else if (args[0] instanceof Geometry) {
				let [geom] = args;
				if (this.geomFact === null) this.geomFact = geom.getFactory();
				GeometryExtracter.extract(geom, Polygon, this.polygons);
				GeometryExtracter.extract(geom, LineString, this.lines);
				GeometryExtracter.extract(geom, Point, this.points);
			}
		}
	}
	union() {
		if (this.geomFact === null) {
			return null;
		}
		var unionPoints = null;
		if (this.points.size() > 0) {
			var ptGeom = this.geomFact.buildGeometry(this.points);
			unionPoints = this.unionNoOpt(ptGeom);
		}
		var unionLines = null;
		if (this.lines.size() > 0) {
			var lineGeom = this.geomFact.buildGeometry(this.lines);
			unionLines = this.unionNoOpt(lineGeom);
		}
		var unionPolygons = null;
		if (this.polygons.size() > 0) {
			unionPolygons = CascadedPolygonUnion.union(this.polygons);
		}
		var unionLA = this.unionWithNull(unionLines, unionPolygons);
		var union = null;
		if (unionPoints === null) union = unionLA; else if (unionLA === null) union = unionPoints; else union = PointGeometryUnion.union(unionPoints, unionLA);
		if (union === null) return this.geomFact.createGeometryCollection(null);
		return union;
	}
	getClass() {
		return UnaryUnionOp$1;
	}
}

class ConnectedInteriorTester {
	constructor(...args) {
		this.geometryFactory = new GeometryFactory();
		this.geomGraph = null;
		this.disconnectedRingcoord = null;
		if (args.length === 1) {
			let [geomGraph] = args;
			this.geomGraph = geomGraph;
		}
	}
	get interfaces_() {
		return [];
	}
	static findDifferentPoint(coord, pt) {
		for (var i = 0; i < coord.length; i++) {
			if (!coord[i].equals(pt)) return coord[i];
		}
		return null;
	}
	visitInteriorRing(ring, graph) {
		var pts = ring.getCoordinates();
		var pt0 = pts[0];
		var pt1 = ConnectedInteriorTester.findDifferentPoint(pts, pt0);
		var e = graph.findEdgeInSameDirection(pt0, pt1);
		var de = graph.findEdgeEnd(e);
		var intDe = null;
		if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
			intDe = de;
		} else if (de.getSym().getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
			intDe = de.getSym();
		}
		Assert.isTrue(intDe !== null, "unable to find dirEdge with Interior on RHS");
		this.visitLinkedDirectedEdges(intDe);
	}
	visitShellInteriors(g, graph) {
		if (g instanceof Polygon) {
			var p = g;
			this.visitInteriorRing(p.getExteriorRing(), graph);
		}
		if (g instanceof MultiPolygon) {
			var mp = g;
			for (var i = 0; i < mp.getNumGeometries(); i++) {
				var p = mp.getGeometryN(i);
				this.visitInteriorRing(p.getExteriorRing(), graph);
			}
		}
	}
	getCoordinate() {
		return this.disconnectedRingcoord;
	}
	setInteriorEdgesInResult(graph) {
		for (var it = graph.getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) {
				de.setInResult(true);
			}
		}
	}
	visitLinkedDirectedEdges(start) {
		var startDe = start;
		var de = start;
		do {
			Assert.isTrue(de !== null, "found null Directed Edge");
			de.setVisited(true);
			de = de.getNext();
		} while (de !== startDe);
	}
	buildEdgeRings(dirEdges) {
		var edgeRings = new ArrayList();
		for (var it = dirEdges.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.isInResult() && de.getEdgeRing() === null) {
				var er = new MaximalEdgeRing(de, this.geometryFactory);
				er.linkDirectedEdgesForMinimalEdgeRings();
				var minEdgeRings = er.buildMinimalRings();
				edgeRings.addAll(minEdgeRings);
			}
		}
		return edgeRings;
	}
	hasUnvisitedShellEdge(edgeRings) {
		for (var i = 0; i < edgeRings.size(); i++) {
			var er = edgeRings.get(i);
			if (er.isHole()) continue;
			var edges = er.getEdges();
			var de = edges.get(0);
			if (de.getLabel().getLocation(0, Position.RIGHT) !== Location.INTERIOR) continue;
			for (var j = 0; j < edges.size(); j++) {
				de = edges.get(j);
				if (!de.isVisited()) {
					this.disconnectedRingcoord = de.getCoordinate();
					return true;
				}
			}
		}
		return false;
	}
	isInteriorsConnected() {
		var splitEdges = new ArrayList();
		this.geomGraph.computeSplitEdges(splitEdges);
		var graph = new PlanarGraph(new OverlayNodeFactory());
		graph.addEdges(splitEdges);
		this.setInteriorEdgesInResult(graph);
		graph.linkResultDirectedEdges();
		var edgeRings = this.buildEdgeRings(graph.getEdgeEnds());
		this.visitShellInteriors(this.geomGraph.getGeometry(), graph);
		return !this.hasUnvisitedShellEdge(edgeRings);
	}
	getClass() {
		return ConnectedInteriorTester;
	}
}

class NodeBase {
	constructor(...args) {
		this.items = new ArrayList();
		this.subnode = [null, null];
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static getSubnodeIndex(interval, centre) {
		var subnodeIndex = -1;
		if (interval.min >= centre) subnodeIndex = 1;
		if (interval.max <= centre) subnodeIndex = 0;
		return subnodeIndex;
	}
	hasChildren() {
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) return true;
		}
		return false;
	}
	isPrunable() {
		return !(this.hasChildren() || this.hasItems());
	}
	addAllItems(items) {
		items.addAll(this.items);
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItems(items);
			}
		}
		return items;
	}
	size() {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + this.items.size();
	}
	addAllItemsFromOverlapping(interval, resultItems) {
		if (interval !== null && !this.isSearchMatch(interval)) return null;
		resultItems.addAll(this.items);
		if (this.subnode[0] !== null) this.subnode[0].addAllItemsFromOverlapping(interval, resultItems);
		if (this.subnode[1] !== null) this.subnode[1].addAllItemsFromOverlapping(interval, resultItems);
	}
	hasItems() {
		return !this.items.isEmpty();
	}
	remove(itemInterval, item) {
		if (!this.isSearchMatch(itemInterval)) return false;
		var found = false;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				found = this.subnode[i].remove(itemInterval, item);
				if (found) {
					if (this.subnode[i].isPrunable()) this.subnode[i] = null;
					break;
				}
			}
		}
		if (found) return found;
		found = this.items.remove(item);
		return found;
	}
	getItems() {
		return this.items;
	}
	depth() {
		var maxSubDepth = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				var sqd = this.subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	}
	nodeSize() {
		var subSize = 0;
		for (var i = 0; i < 2; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].nodeSize();
			}
		}
		return subSize + 1;
	}
	add(item) {
		this.items.add(item);
	}
	getClass() {
		return NodeBase;
	}
}

class Interval {
	constructor(...args) {
		this.min = null;
		this.max = null;
		const overloaded = (...args) => {
			if (args.length === 0) {
				let [] = args;
				this.min = 0.0;
				this.max = 0.0;
			} else if (args.length === 1) {
				let [interval] = args;
				this.init(interval.min, interval.max);
			} else if (args.length === 2) {
				let [min, max] = args;
				this.init(min, max);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	expandToInclude(interval) {
		if (interval.max > this.max) this.max = interval.max;
		if (interval.min < this.min) this.min = interval.min;
	}
	getWidth() {
		return this.max - this.min;
	}
	overlaps(...args) {
		if (args.length === 1) {
			let [interval] = args;
			return this.overlaps(interval.min, interval.max);
		} else if (args.length === 2) {
			let [min, max] = args;
			if (this.min > max || this.max < min) return false;
			return true;
		}
	}
	getMin() {
		return this.min;
	}
	toString() {
		return "[" + this.min + ", " + this.max + "]";
	}
	contains(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Interval) {
				let [interval] = args;
				return this.contains(interval.min, interval.max);
			} else if (typeof args[0] === "number") {
				let [p] = args;
				return p >= this.min && p <= this.max;
			}
		} else if (args.length === 2) {
			let [min, max] = args;
			return min >= this.min && max <= this.max;
		}
	}
	init(min, max) {
		this.min = min;
		this.max = max;
		if (min > max) {
			this.min = max;
			this.max = min;
		}
	}
	getMax() {
		return this.max;
	}
	getClass() {
		return Interval;
	}
}

class DoubleBits {
	constructor(...args) {
		this.x = null;
		this.xBits = null;
		if (args.length === 1) {
			let [x] = args;
			this.x = x;
			this.xBits = Double.doubleToLongBits(x);
		}
	}
	get interfaces_() {
		return [];
	}
	static exponent(d) {
		var db = new DoubleBits(d);
		return db.getExponent();
	}
	static toBinaryString(d) {
		var db = new DoubleBits(d);
		return db.toString();
	}
	static powerOf2(exp) {
		if (exp > 1023 || exp < -1022) throw new IllegalArgumentException$1("Exponent out of bounds");
		var expBias = exp + DoubleBits.EXPONENT_BIAS;
		var bits = expBias << 52;
		return Double.longBitsToDouble(bits);
	}
	static truncateToPowerOfTwo(d) {
		var db = new DoubleBits(d);
		db.zeroLowerBits(52);
		return db.getDouble();
	}
	static maximumCommonMantissa(d1, d2) {
		if (d1 === 0.0 || d2 === 0.0) return 0.0;
		var db1 = new DoubleBits(d1);
		var db2 = new DoubleBits(d2);
		if (db1.getExponent() !== db2.getExponent()) return 0.0;
		var maxCommon = db1.numCommonMantissaBits(db2);
		db1.zeroLowerBits(64 - (12 + maxCommon));
		return db1.getDouble();
	}
	numCommonMantissaBits(db) {
		for (var i = 0; i < 52; i++) {
			var bitIndex = i + 12;
			if (this.getBit(i) !== db.getBit(i)) return i;
		}
		return 52;
	}
	getExponent() {
		return this.biasedExponent() - DoubleBits.EXPONENT_BIAS;
	}
	biasedExponent() {
		var signExp = Math.trunc(this.xBits >> 52);
		var exp = signExp & 0x07ff;
		return exp;
	}
	getDouble() {
		return Double.longBitsToDouble(this.xBits);
	}
	zeroLowerBits(nBits) {
		var invMask = (1 << nBits) - 1;
		var mask = ~invMask;
		this.xBits &= mask;
	}
	toString() {
		var numStr = Long.toBinaryString(this.xBits);
		var zero64 = "0000000000000000000000000000000000000000000000000000000000000000";
		var padStr = zero64 + numStr;
		var bitStr = padStr.substring(padStr.length - 64);
		var str = bitStr.substring(0, 1) + "  " + bitStr.substring(1, 12) + "(" + this.getExponent() + ") " + bitStr.substring(12) + " [ " + this.x + " ]";
		return str;
	}
	getBit(i) {
		var mask = 1 << i;
		return (this.xBits & mask) !== 0 ? 1 : 0;
	}
	getClass() {
		return DoubleBits;
	}
}
DoubleBits.EXPONENT_BIAS = 1023;

class Key {
	constructor(...args) {
		this.pt = 0.0;
		this.level = 0;
		this.interval = null;
		if (args.length === 1) {
			let [interval] = args;
			this.computeKey(interval);
		}
	}
	get interfaces_() {
		return [];
	}
	static computeLevel(interval) {
		var dx = interval.getWidth();
		var level = DoubleBits.exponent(dx) + 1;
		return level;
	}
	getInterval() {
		return this.interval;
	}
	getLevel() {
		return this.level;
	}
	computeKey(itemInterval) {
		this.level = Key.computeLevel(itemInterval);
		this.interval = new Interval();
		this.computeInterval(this.level, itemInterval);
		while (!this.interval.contains(itemInterval)) {
			this.level += 1;
			this.computeInterval(this.level, itemInterval);
		}
	}
	computeInterval(level, itemInterval) {
		var size = DoubleBits.powerOf2(level);
		this.pt = Math.floor(itemInterval.getMin() / size) * size;
		this.interval.init(this.pt, this.pt + size);
	}
	getPoint() {
		return this.pt;
	}
	getClass() {
		return Key;
	}
}

class Node$2 extends NodeBase {
	constructor(...args) {
		super();
		this.interval = null;
		this.centre = null;
		this.level = null;
		if (args.length === 2) {
			let [interval, level] = args;
			this.interval = interval;
			this.level = level;
			this.centre = (interval.getMin() + interval.getMax()) / 2;
		}
	}
	get interfaces_() {
		return [];
	}
	static createNode(itemInterval) {
		var key = new Key(itemInterval);
		var node = new Node$2(key.getInterval(), key.getLevel());
		return node;
	}
	static createExpanded(node, addInterval) {
		var expandInt = new Interval(addInterval);
		if (node !== null) expandInt.expandToInclude(node.interval);
		var largerNode = Node$2.createNode(expandInt);
		if (node !== null) largerNode.insert(node);
		return largerNode;
	}
	getInterval() {
		return this.interval;
	}
	find(searchInterval) {
		var subnodeIndex = Node$2.getSubnodeIndex(searchInterval, this.centre);
		if (subnodeIndex === -1) return this;
		if (this.subnode[subnodeIndex] !== null) {
			var node = this.subnode[subnodeIndex];
			return node.find(searchInterval);
		}
		return this;
	}
	insert(node) {
		Assert.isTrue(this.interval === null || this.interval.contains(node.interval));
		var index = Node$2.getSubnodeIndex(node.interval, this.centre);
		if (node.level === this.level - 1) {
			this.subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insert(node);
			this.subnode[index] = childNode;
		}
	}
	isSearchMatch(itemInterval) {
		return itemInterval.overlaps(this.interval);
	}
	getSubnode(index) {
		if (this.subnode[index] === null) {
			this.subnode[index] = this.createSubnode(index);
		}
		return this.subnode[index];
	}
	getNode(searchInterval) {
		var subnodeIndex = Node$2.getSubnodeIndex(searchInterval, this.centre);
		if (subnodeIndex !== -1) {
			var node = this.getSubnode(subnodeIndex);
			return node.getNode(searchInterval);
		} else {
			return this;
		}
	}
	createSubnode(index) {
		var min = 0.0;
		var max = 0.0;
		switch (index) {
			case 0:
				min = this.interval.getMin();
				max = this.centre;
				break;
			case 1:
				min = this.centre;
				max = this.interval.getMax();
				break;
		}
		var subInt = new Interval(min, max);
		var node = new Node$2(subInt, this.level - 1);
		return node;
	}
	getClass() {
		return Node$2;
	}
}

class IntervalSize {
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

class Root extends NodeBase {
	constructor(...args) {
		super();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	insert(itemInterval, item) {
		var index = Root.getSubnodeIndex(itemInterval, Root.origin);
		if (index === -1) {
			this.add(item);
			return null;
		}
		var node = this.subnode[index];
		if (node === null || !node.getInterval().contains(itemInterval)) {
			var largerNode = Node$2.createExpanded(node, itemInterval);
			this.subnode[index] = largerNode;
		}
		this.insertContained(this.subnode[index], itemInterval, item);
	}
	isSearchMatch(interval) {
		return true;
	}
	insertContained(tree, itemInterval, item) {
		Assert.isTrue(tree.getInterval().contains(itemInterval));
		var isZeroArea = IntervalSize.isZeroWidth(itemInterval.getMin(), itemInterval.getMax());
		var node = null;
		if (isZeroArea) node = tree.find(itemInterval); else node = tree.getNode(itemInterval);
		node.add(item);
	}
	getClass() {
		return Root;
	}
}
Root.origin = 0.0;

class Bintree {
	constructor(...args) {
		this.root = null;
		this.minExtent = 1.0;
		if (args.length === 0) {
			let [] = args;
			this.root = new Root();
		}
	}
	get interfaces_() {
		return [];
	}
	static ensureExtent(itemInterval, minExtent) {
		var min = itemInterval.getMin();
		var max = itemInterval.getMax();
		if (min !== max) return itemInterval;
		if (min === max) {
			min = min - minExtent / 2.0;
			max = min + minExtent / 2.0;
		}
		return new Interval(min, max);
	}
	size() {
		if (this.root !== null) return this.root.size();
		return 0;
	}
	insert(itemInterval, item) {
		this.collectStats(itemInterval);
		var insertInterval = Bintree.ensureExtent(itemInterval, this.minExtent);
		this.root.insert(insertInterval, item);
	}
	query(...args) {
		if (args.length === 1) {
			if (typeof args[0] === "number") {
				let [x] = args;
				return this.query(new Interval(x, x));
			} else if (args[0] instanceof Interval) {
				let [interval] = args;
				var foundItems = new ArrayList();
				this.query(interval, foundItems);
				return foundItems;
			}
		} else if (args.length === 2) {
			let [interval, foundItems] = args;
			this.root.addAllItemsFromOverlapping(interval, foundItems);
		}
	}
	iterator() {
		var foundItems = new ArrayList();
		this.root.addAllItems(foundItems);
		return foundItems.iterator();
	}
	remove(itemInterval, item) {
		var insertInterval = Bintree.ensureExtent(itemInterval, this.minExtent);
		return this.root.remove(insertInterval, item);
	}
	collectStats(interval) {
		var del = interval.getWidth();
		if (del < this.minExtent && del > 0.0) this.minExtent = del;
	}
	depth() {
		if (this.root !== null) return this.root.depth();
		return 0;
	}
	nodeSize() {
		if (this.root !== null) return this.root.nodeSize();
		return 0;
	}
	getClass() {
		return Bintree;
	}
}

class PointInRing {
	get interfaces_() {
		return [];
	}
	isInside(pt) {}
	getClass() {
		return PointInRing;
	}
}

class MCPointInRing {
	constructor(...args) {
		this.ring = null;
		this.tree = null;
		this.crossings = 0;
		this.interval = new Interval();
		if (args.length === 1) {
			let [ring] = args;
			this.ring = ring;
			this.buildIndex();
		}
	}
	get interfaces_() {
		return [PointInRing];
	}
	static get MCSelecter() {
		return MCSelecter;
	}
	testLineSegment(p, seg) {
		var xInt = null;
		var x1 = null;
		var y1 = null;
		var x2 = null;
		var y2 = null;
		var p1 = seg.p0;
		var p2 = seg.p1;
		x1 = p1.x - p.x;
		y1 = p1.y - p.y;
		x2 = p2.x - p.x;
		y2 = p2.y - p.y;
		if (y1 > 0 && y2 <= 0 || y2 > 0 && y1 <= 0) {
			xInt = RobustDeterminant.signOfDet2x2(x1, y1, x2, y2) / (y2 - y1);
			if (0.0 < xInt) {
				this.crossings++;
			}
		}
	}
	buildIndex() {
		this.tree = new Bintree();
		var pts = CoordinateArrays.removeRepeatedPoints(this.ring.getCoordinates());
		var mcList = MonotoneChainBuilder.getChains(pts);
		for (var i = 0; i < mcList.size(); i++) {
			var mc = mcList.get(i);
			var mcEnv = mc.getEnvelope();
			this.interval.min = mcEnv.getMinY();
			this.interval.max = mcEnv.getMaxY();
			this.tree.insert(this.interval, mc);
		}
	}
	testMonotoneChain(rayEnv, mcSelecter, mc) {
		mc.select(rayEnv, mcSelecter);
	}
	isInside(pt) {
		this.crossings = 0;
		var rayEnv = new Envelope(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY, pt.y, pt.y);
		this.interval.min = pt.y;
		this.interval.max = pt.y;
		var segs = this.tree.query(this.interval);
		var mcSelecter = new MCSelecter(this, pt);
		for (var i = segs.iterator(); i.hasNext(); ) {
			var mc = i.next();
			this.testMonotoneChain(rayEnv, mcSelecter, mc);
		}
		if (this.crossings % 2 === 1) {
			return true;
		}
		return false;
	}
	getClass() {
		return MCPointInRing;
	}
}
class MCSelecter extends MonotoneChainSelectAction {
	constructor(...args) {
		super();
		this.mcp = null;
		this.p = null;
		if (args.length === 2) {
			let [mcp, p] = args;
			this.mcp = mcp;
			this.p = p;
		}
	}
	get interfaces_() {
		return [];
	}
	select(...args) {
		if (args.length === 1) {
			let [ls] = args;
			this.mcp.testLineSegment(this.p, ls);
		} else return super.select(...args);
	}
	getClass() {
		return MCSelecter;
	}
}

class RelateNodeGraph {
	constructor(...args) {
		this.nodes = new NodeMap(new RelateNodeFactory());
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	insertEdgeEnds(ee) {
		for (var i = ee.iterator(); i.hasNext(); ) {
			var e = i.next();
			this.nodes.add(e);
		}
	}
	getNodeIterator() {
		return this.nodes.iterator();
	}
	copyNodesAndLabels(geomGraph, argIndex) {
		for (var nodeIt = geomGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var graphNode = nodeIt.next();
			var newNode = this.nodes.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	}
	build(geomGraph) {
		this.computeIntersectionNodes(geomGraph, 0);
		this.copyNodesAndLabels(geomGraph, 0);
		var eeBuilder = new EdgeEndBuilder();
		var eeList = eeBuilder.computeEdgeEnds(geomGraph.getEdgeIterator());
		this.insertEdgeEnds(eeList);
	}
	computeIntersectionNodes(geomGraph, argIndex) {
		for (var edgeIt = geomGraph.getEdgeIterator(); edgeIt.hasNext(); ) {
			var e = edgeIt.next();
			var eLoc = e.getLabel().getLocation(argIndex);
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				var n = this.nodes.addNode(ei.coord);
				if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else {
					if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR);
				}
			}
		}
	}
	getClass() {
		return RelateNodeGraph;
	}
}

class ConsistentAreaTester {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.geomGraph = null;
		this.nodeGraph = new RelateNodeGraph();
		this.invalidPoint = null;
		if (args.length === 1) {
			let [geomGraph] = args;
			this.geomGraph = geomGraph;
		}
	}
	get interfaces_() {
		return [];
	}
	isNodeEdgeAreaLabelsConsistent() {
		for (var nodeIt = this.nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			if (!node.getEdges().isAreaLabelsConsistent(this.geomGraph)) {
				this.invalidPoint = node.getCoordinate().copy();
				return false;
			}
		}
		return true;
	}
	getInvalidPoint() {
		return this.invalidPoint;
	}
	hasDuplicateRings() {
		for (var nodeIt = this.nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			for (var i = node.getEdges().iterator(); i.hasNext(); ) {
				var eeb = i.next();
				if (eeb.getEdgeEnds().size() > 1) {
					this.invalidPoint = eeb.getEdge().getCoordinate(0);
					return true;
				}
			}
		}
		return false;
	}
	isNodeConsistentArea() {
		var intersector = this.geomGraph.computeSelfNodes(this.li, true, true);
		if (intersector.hasProperIntersection()) {
			this.invalidPoint = intersector.getProperIntersectionPoint();
			return false;
		}
		this.nodeGraph.build(this.geomGraph);
		return this.isNodeEdgeAreaLabelsConsistent();
	}
	getClass() {
		return ConsistentAreaTester;
	}
}

class IndexedNestedRingTester {
	constructor(...args) {
		this.graph = null;
		this.rings = new ArrayList();
		this.totalEnv = new Envelope();
		this.index = null;
		this.nestedPt = null;
		if (args.length === 1) {
			let [graph] = args;
			this.graph = graph;
		}
	}
	get interfaces_() {
		return [];
	}
	buildIndex() {
		this.index = new STRtree();
		for (var i = 0; i < this.rings.size(); i++) {
			var ring = this.rings.get(i);
			var env = ring.getEnvelopeInternal();
			this.index.insert(env, ring);
		}
	}
	getNestedPoint() {
		return this.nestedPt;
	}
	isNonNested() {
		this.buildIndex();
		for (var i = 0; i < this.rings.size(); i++) {
			var innerRing = this.rings.get(i);
			var innerRingPts = innerRing.getCoordinates();
			var results = this.index.query(innerRing.getEnvelopeInternal());
			for (var j = 0; j < results.size(); j++) {
				var searchRing = results.get(j);
				var searchRingPts = searchRing.getCoordinates();
				if (innerRing === searchRing) continue;
				if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue;
				var innerRingPt = IsValidOp$1.findPtNotNode(innerRingPts, searchRing, this.graph);
				if (innerRingPt === null) continue;
				var isInside = CGAlgorithms.isPointInRing(innerRingPt, searchRingPts);
				if (isInside) {
					this.nestedPt = innerRingPt;
					return false;
				}
			}
		}
		return true;
	}
	add(ring) {
		this.rings.add(ring);
		this.totalEnv.expandToInclude(ring.getEnvelopeInternal());
	}
	getClass() {
		return IndexedNestedRingTester;
	}
}

class TopologyValidationError {
	constructor(...args) {
		this.errorType = null;
		this.pt = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [errorType] = args;
				overloaded.call(this, errorType, null);
			} else if (args.length === 2) {
				let [errorType, pt] = args;
				this.errorType = errorType;
				if (pt !== null) this.pt = pt.copy();
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getErrorType() {
		return this.errorType;
	}
	getMessage() {
		return TopologyValidationError.errMsg[this.errorType];
	}
	getCoordinate() {
		return this.pt;
	}
	toString() {
		var locStr = "";
		if (this.pt !== null) locStr = " at or near point " + this.pt;
		return this.getMessage() + locStr;
	}
	getClass() {
		return TopologyValidationError;
	}
}
TopologyValidationError.ERROR = 0;
TopologyValidationError.REPEATED_POINT = 1;
TopologyValidationError.HOLE_OUTSIDE_SHELL = 2;
TopologyValidationError.NESTED_HOLES = 3;
TopologyValidationError.DISCONNECTED_INTERIOR = 4;
TopologyValidationError.SELF_INTERSECTION = 5;
TopologyValidationError.RING_SELF_INTERSECTION = 6;
TopologyValidationError.NESTED_SHELLS = 7;
TopologyValidationError.DUPLICATE_RINGS = 8;
TopologyValidationError.TOO_FEW_POINTS = 9;
TopologyValidationError.INVALID_COORDINATE = 10;
TopologyValidationError.RING_NOT_CLOSED = 11;
TopologyValidationError.errMsg = ["Topology Validation Error", "Repeated Point", "Hole lies outside shell", "Holes are nested", "Interior is disconnected", "Self-intersection", "Ring Self-intersection", "Nested shells", "Duplicate Rings", "Too few distinct points in geometry component", "Invalid Coordinate", "Ring is not closed"];

class IsValidOp$1 {
	constructor(...args) {
		this.parentGeometry = null;
		this.isSelfTouchingRingFormingHoleValid = false;
		this.validErr = null;
		if (args.length === 1) {
			let [parentGeometry] = args;
			this.parentGeometry = parentGeometry;
		}
	}
	get interfaces_() {
		return [];
	}
	static findPtNotNode(testCoords, searchRing, graph) {
		var searchEdge = graph.findEdge(searchRing);
		var eiList = searchEdge.getEdgeIntersectionList();
		for (var i = 0; i < testCoords.length; i++) {
			var pt = testCoords[i];
			if (!eiList.isIntersection(pt)) return pt;
		}
		return null;
	}
	static isValid(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geom] = args;
				var isValidOp = new IsValidOp$1(geom);
				return isValidOp.isValid();
			} else if (args[0] instanceof Coordinate) {
				let [coord] = args;
				if (Double.isNaN(coord.x)) return false;
				if (Double.isInfinite(coord.x)) return false;
				if (Double.isNaN(coord.y)) return false;
				if (Double.isInfinite(coord.y)) return false;
				return true;
			}
		}
	}
	checkInvalidCoordinates(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Array) {
				let [coords] = args;
				for (var i = 0; i < coords.length; i++) {
					if (!IsValidOp$1.isValid(coords[i])) {
						this.validErr = new TopologyValidationError(TopologyValidationError.INVALID_COORDINATE, coords[i]);
						return null;
					}
				}
			} else if (args[0] instanceof Polygon) {
				let [poly] = args;
				this.checkInvalidCoordinates(poly.getExteriorRing().getCoordinates());
				if (this.validErr !== null) return null;
				for (var i = 0; i < poly.getNumInteriorRing(); i++) {
					this.checkInvalidCoordinates(poly.getInteriorRingN(i).getCoordinates());
					if (this.validErr !== null) return null;
				}
			}
		}
	}
	checkHolesNotNested(p, graph) {
		var nestedTester = new IndexedNestedRingTester(graph);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var innerHole = p.getInteriorRingN(i);
			nestedTester.add(innerHole);
		}
		var isNonNested = nestedTester.isNonNested();
		if (!isNonNested) {
			this.validErr = new TopologyValidationError(TopologyValidationError.NESTED_HOLES, nestedTester.getNestedPoint());
		}
	}
	checkConsistentArea(graph) {
		var cat = new ConsistentAreaTester(graph);
		var isValidArea = cat.isNodeConsistentArea();
		if (!isValidArea) {
			this.validErr = new TopologyValidationError(TopologyValidationError.SELF_INTERSECTION, cat.getInvalidPoint());
			return null;
		}
		if (cat.hasDuplicateRings()) {
			this.validErr = new TopologyValidationError(TopologyValidationError.DUPLICATE_RINGS, cat.getInvalidPoint());
		}
	}
	isValid() {
		this.checkValid(this.parentGeometry);
		return this.validErr === null;
	}
	checkShellInsideHole(shell, hole, graph) {
		var shellPts = shell.getCoordinates();
		var holePts = hole.getCoordinates();
		var shellPt = IsValidOp$1.findPtNotNode(shellPts, hole, graph);
		if (shellPt !== null) {
			var insideHole = CGAlgorithms.isPointInRing(shellPt, holePts);
			if (!insideHole) {
				return shellPt;
			}
		}
		var holePt = IsValidOp$1.findPtNotNode(holePts, shell, graph);
		if (holePt !== null) {
			var insideShell = CGAlgorithms.isPointInRing(holePt, shellPts);
			if (insideShell) {
				return holePt;
			}
			return null;
		}
		Assert.shouldNeverReachHere("points in shell and hole appear to be equal");
		return null;
	}
	checkNoSelfIntersectingRings(graph) {
		for (var i = graph.getEdgeIterator(); i.hasNext(); ) {
			var e = i.next();
			this.checkNoSelfIntersectingRing(e.getEdgeIntersectionList());
			if (this.validErr !== null) return null;
		}
	}
	checkConnectedInteriors(graph) {
		var cit = new ConnectedInteriorTester(graph);
		if (!cit.isInteriorsConnected()) this.validErr = new TopologyValidationError(TopologyValidationError.DISCONNECTED_INTERIOR, cit.getCoordinate());
	}
	checkNoSelfIntersectingRing(eiList) {
		var nodeSet = new TreeSet();
		var isFirst = true;
		for (var i = eiList.iterator(); i.hasNext(); ) {
			var ei = i.next();
			if (isFirst) {
				isFirst = false;
				continue;
			}
			if (nodeSet.contains(ei.coord)) {
				this.validErr = new TopologyValidationError(TopologyValidationError.RING_SELF_INTERSECTION, ei.coord);
				return null;
			} else {
				nodeSet.add(ei.coord);
			}
		}
	}
	checkHolesInShell(p, graph) {
		var shell = p.getExteriorRing();
		var pir = new MCPointInRing(shell);
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			var holePt = IsValidOp$1.findPtNotNode(hole.getCoordinates(), shell, graph);
			if (holePt === null) return null;
			var outside = !pir.isInside(holePt);
			if (outside) {
				this.validErr = new TopologyValidationError(TopologyValidationError.HOLE_OUTSIDE_SHELL, holePt);
				return null;
			}
		}
	}
	checkTooFewPoints(graph) {
		if (graph.hasTooFewPoints()) {
			this.validErr = new TopologyValidationError(TopologyValidationError.TOO_FEW_POINTS, graph.getInvalidPoint());
			return null;
		}
	}
	getValidationError() {
		this.checkValid(this.parentGeometry);
		return this.validErr;
	}
	checkValid(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Point) {
				let [g] = args;
				this.checkInvalidCoordinates(g.getCoordinates());
			} else if (args[0] instanceof MultiPoint) {
				let [g] = args;
				this.checkInvalidCoordinates(g.getCoordinates());
			} else if (args[0] instanceof LinearRing) {
				let [g] = args;
				this.checkInvalidCoordinates(g.getCoordinates());
				if (this.validErr !== null) return null;
				this.checkClosedRing(g);
				if (this.validErr !== null) return null;
				var graph = new GeometryGraph(0, g);
				this.checkTooFewPoints(graph);
				if (this.validErr !== null) return null;
				var li = new RobustLineIntersector();
				graph.computeSelfNodes(li, true, true);
				this.checkNoSelfIntersectingRings(graph);
			} else if (args[0] instanceof LineString) {
				let [g] = args;
				this.checkInvalidCoordinates(g.getCoordinates());
				if (this.validErr !== null) return null;
				var graph = new GeometryGraph(0, g);
				this.checkTooFewPoints(graph);
			} else if (args[0] instanceof Polygon) {
				let [g] = args;
				this.checkInvalidCoordinates(g);
				if (this.validErr !== null) return null;
				this.checkClosedRings(g);
				if (this.validErr !== null) return null;
				var graph = new GeometryGraph(0, g);
				this.checkTooFewPoints(graph);
				if (this.validErr !== null) return null;
				this.checkConsistentArea(graph);
				if (this.validErr !== null) return null;
				if (!this.isSelfTouchingRingFormingHoleValid) {
					this.checkNoSelfIntersectingRings(graph);
					if (this.validErr !== null) return null;
				}
				this.checkHolesInShell(g, graph);
				if (this.validErr !== null) return null;
				this.checkHolesNotNested(g, graph);
				if (this.validErr !== null) return null;
				this.checkConnectedInteriors(graph);
			} else if (args[0] instanceof MultiPolygon) {
				let [g] = args;
				for (var i = 0; i < g.getNumGeometries(); i++) {
					var p = g.getGeometryN(i);
					this.checkInvalidCoordinates(p);
					if (this.validErr !== null) return null;
					this.checkClosedRings(p);
					if (this.validErr !== null) return null;
				}
				var graph = new GeometryGraph(0, g);
				this.checkTooFewPoints(graph);
				if (this.validErr !== null) return null;
				this.checkConsistentArea(graph);
				if (this.validErr !== null) return null;
				if (!this.isSelfTouchingRingFormingHoleValid) {
					this.checkNoSelfIntersectingRings(graph);
					if (this.validErr !== null) return null;
				}
				for (var i = 0; i < g.getNumGeometries(); i++) {
					var p = g.getGeometryN(i);
					this.checkHolesInShell(p, graph);
					if (this.validErr !== null) return null;
				}
				for (var i = 0; i < g.getNumGeometries(); i++) {
					var p = g.getGeometryN(i);
					this.checkHolesNotNested(p, graph);
					if (this.validErr !== null) return null;
				}
				this.checkShellsNotNested(g, graph);
				if (this.validErr !== null) return null;
				this.checkConnectedInteriors(graph);
			} else if (args[0] instanceof GeometryCollection) {
				let [gc] = args;
				for (var i = 0; i < gc.getNumGeometries(); i++) {
					var g = gc.getGeometryN(i);
					this.checkValid(g);
					if (this.validErr !== null) return null;
				}
			} else if (args[0] instanceof Geometry) {
				let [g] = args;
				this.validErr = null;
				if (g.isEmpty()) return null;
				if (g instanceof Point) this.checkValid(g); else if (g instanceof MultiPoint) this.checkValid(g); else if (g instanceof LinearRing) this.checkValid(g); else if (g instanceof LineString) this.checkValid(g); else if (g instanceof Polygon) this.checkValid(g); else if (g instanceof MultiPolygon) this.checkValid(g); else if (g instanceof GeometryCollection) this.checkValid(g); else throw new UnsupportedOperationException(g.getClass().getName());
			}
		}
	}
	setSelfTouchingRingFormingHoleValid(isValid) {
		this.isSelfTouchingRingFormingHoleValid = isValid;
	}
	checkShellNotNested(shell, p, graph) {
		var shellPts = shell.getCoordinates();
		var polyShell = p.getExteriorRing();
		var polyPts = polyShell.getCoordinates();
		var shellPt = IsValidOp$1.findPtNotNode(shellPts, polyShell, graph);
		if (shellPt === null) return null;
		var insidePolyShell = CGAlgorithms.isPointInRing(shellPt, polyPts);
		if (!insidePolyShell) return null;
		if (p.getNumInteriorRing() <= 0) {
			this.validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, shellPt);
			return null;
		}
		var badNestedPt = null;
		for (var i = 0; i < p.getNumInteriorRing(); i++) {
			var hole = p.getInteriorRingN(i);
			badNestedPt = this.checkShellInsideHole(shell, hole, graph);
			if (badNestedPt === null) return null;
		}
		this.validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, badNestedPt);
	}
	checkClosedRings(poly) {
		this.checkClosedRing(poly.getExteriorRing());
		if (this.validErr !== null) return null;
		for (var i = 0; i < poly.getNumInteriorRing(); i++) {
			this.checkClosedRing(poly.getInteriorRingN(i));
			if (this.validErr !== null) return null;
		}
	}
	checkClosedRing(ring) {
		if (!ring.isClosed()) {
			var pt = null;
			if (ring.getNumPoints() >= 1) pt = ring.getCoordinateN(0);
			this.validErr = new TopologyValidationError(TopologyValidationError.RING_NOT_CLOSED, pt);
		}
	}
	checkShellsNotNested(mp, graph) {
		for (var i = 0; i < mp.getNumGeometries(); i++) {
			var p = mp.getGeometryN(i);
			var shell = p.getExteriorRing();
			for (var j = 0; j < mp.getNumGeometries(); j++) {
				if (i === j) continue;
				var p2 = mp.getGeometryN(j);
				this.checkShellNotNested(shell, p2, graph);
				if (this.validErr !== null) return null;
			}
		}
	}
	getClass() {
		return IsValidOp$1;
	}
}

class PrecisionReducerCoordinateOperation extends GeometryEditor.CoordinateOperation {
	constructor(...args) {
		super();
		this.targetPM = null;
		this.removeCollapsed = true;
		if (args.length === 2) {
			let [targetPM, removeCollapsed] = args;
			this.targetPM = targetPM;
			this.removeCollapsed = removeCollapsed;
		}
	}
	get interfaces_() {
		return [];
	}
	editCoordinates(coordinates, geom) {
		if (coordinates.length === 0) return null;
		var reducedCoords = new Array(coordinates.length);
		for (var i = 0; i < coordinates.length; i++) {
			var coord = new Coordinate(coordinates[i]);
			this.targetPM.makePrecise(coord);
			reducedCoords[i] = coord;
		}
		var noRepeatedCoordList = new CoordinateList(reducedCoords, false);
		var noRepeatedCoords = noRepeatedCoordList.toCoordinateArray();
		var minLength = 0;
		if (geom instanceof LineString) minLength = 2;
		if (geom instanceof LinearRing) minLength = 4;
		var collapsedCoords = reducedCoords;
		if (this.removeCollapsed) collapsedCoords = null;
		if (noRepeatedCoords.length < minLength) {
			return collapsedCoords;
		}
		return noRepeatedCoords;
	}
	getClass() {
		return PrecisionReducerCoordinateOperation;
	}
}

class GeometryPrecisionReducer {
	constructor(...args) {
		this.targetPM = null;
		this.removeCollapsed = true;
		this.changePrecisionModel = false;
		this.isPointwise = false;
		if (args.length === 1) {
			let [pm] = args;
			this.targetPM = pm;
		}
	}
	get interfaces_() {
		return [];
	}
	static reduce(g, precModel) {
		var reducer = new GeometryPrecisionReducer(precModel);
		return reducer.reduce(g);
	}
	static reducePointwise(g, precModel) {
		var reducer = new GeometryPrecisionReducer(precModel);
		reducer.setPointwise(true);
		return reducer.reduce(g);
	}
	fixPolygonalTopology(geom) {
		var geomToBuffer = geom;
		if (!this.changePrecisionModel) {
			geomToBuffer = this.changePM(geom, this.targetPM);
		}
		var bufGeom = geomToBuffer.buffer(0);
		var finalGeom = bufGeom;
		if (!this.changePrecisionModel) {
			finalGeom = geom.getFactory().createGeometry(bufGeom);
		}
		return finalGeom;
	}
	reducePointwise(geom) {
		var geomEdit = null;
		if (this.changePrecisionModel) {
			var newFactory = this.createFactory(geom.getFactory(), this.targetPM);
			geomEdit = new GeometryEditor(newFactory);
		} else geomEdit = new GeometryEditor();
		var finalRemoveCollapsed = this.removeCollapsed;
		if (geom.getDimension() >= 2) finalRemoveCollapsed = true;
		var reduceGeom = geomEdit.edit(geom, new PrecisionReducerCoordinateOperation(this.targetPM, finalRemoveCollapsed));
		return reduceGeom;
	}
	changePM(geom, newPM) {
		var geomEditor = this.createEditor(geom.getFactory(), newPM);
		return geomEditor.edit(geom, new GeometryEditor.NoOpGeometryOperation());
	}
	setRemoveCollapsedComponents(removeCollapsed) {
		this.removeCollapsed = removeCollapsed;
	}
	createFactory(inputFactory, pm) {
		var newFactory = new GeometryFactory(pm, inputFactory.getSRID(), inputFactory.getCoordinateSequenceFactory());
		return newFactory;
	}
	setChangePrecisionModel(changePrecisionModel) {
		this.changePrecisionModel = changePrecisionModel;
	}
	reduce(geom) {
		var reducePW = this.reducePointwise(geom);
		if (this.isPointwise) return reducePW;
		if (!(reducePW.interfaces_ && reducePW.interfaces_.indexOf(Polygonal) > -1)) return reducePW;
		if (reducePW.isValid()) return reducePW;
		return this.fixPolygonalTopology(reducePW);
	}
	setPointwise(isPointwise) {
		this.isPointwise = isPointwise;
	}
	createEditor(geomFactory, newPM) {
		if (geomFactory.getPrecisionModel() === newPM) return new GeometryEditor();
		var newFactory = this.createFactory(geomFactory, newPM);
		var geomEdit = new GeometryEditor(newFactory);
		return geomEdit;
	}
	getClass() {
		return GeometryPrecisionReducer;
	}
}

class DouglasPeuckerLineSimplifier {
	constructor(...args) {
		this.pts = null;
		this.usePt = null;
		this.distanceTolerance = null;
		this.seg = new LineSegment();
		if (args.length === 1) {
			let [pts] = args;
			this.pts = pts;
		}
	}
	get interfaces_() {
		return [];
	}
	static simplify(pts, distanceTolerance) {
		var simp = new DouglasPeuckerLineSimplifier(pts);
		simp.setDistanceTolerance(distanceTolerance);
		return simp.simplify();
	}
	simplifySection(i, j) {
		if (i + 1 === j) {
			return null;
		}
		this.seg.p0 = this.pts[i];
		this.seg.p1 = this.pts[j];
		var maxDistance = -1.0;
		var maxIndex = i;
		for (var k = i + 1; k < j; k++) {
			var distance = this.seg.distance(this.pts[k]);
			if (distance > maxDistance) {
				maxDistance = distance;
				maxIndex = k;
			}
		}
		if (maxDistance <= this.distanceTolerance) {
			for (var k = i + 1; k < j; k++) {
				this.usePt[k] = false;
			}
		} else {
			this.simplifySection(i, maxIndex);
			this.simplifySection(maxIndex, j);
		}
	}
	setDistanceTolerance(distanceTolerance) {
		this.distanceTolerance = distanceTolerance;
	}
	simplify() {
		this.usePt = new Array(this.pts.length);
		for (var i = 0; i < this.pts.length; i++) {
			this.usePt[i] = true;
		}
		this.simplifySection(0, this.pts.length - 1);
		var coordList = new CoordinateList();
		for (var i = 0; i < this.pts.length; i++) {
			if (this.usePt[i]) coordList.add(new Coordinate(this.pts[i]));
		}
		return coordList.toCoordinateArray();
	}
	getClass() {
		return DouglasPeuckerLineSimplifier;
	}
}

class DouglasPeuckerSimplifier {
	constructor(...args) {
		this.inputGeom = null;
		this.distanceTolerance = null;
		this.isEnsureValidTopology = true;
		if (args.length === 1) {
			let [inputGeom] = args;
			this.inputGeom = inputGeom;
		}
	}
	get interfaces_() {
		return [];
	}
	static get DPTransformer() {
		return DPTransformer;
	}
	static simplify(geom, distanceTolerance) {
		var tss = new DouglasPeuckerSimplifier(geom);
		tss.setDistanceTolerance(distanceTolerance);
		return tss.getResultGeometry();
	}
	setEnsureValid(isEnsureValidTopology) {
		this.isEnsureValidTopology = isEnsureValidTopology;
	}
	getResultGeometry() {
		if (this.inputGeom.isEmpty()) return this.inputGeom.copy();
		return new DPTransformer(this.isEnsureValidTopology, this.distanceTolerance).transform(this.inputGeom);
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException$1("Tolerance must be non-negative");
		this.distanceTolerance = distanceTolerance;
	}
	getClass() {
		return DouglasPeuckerSimplifier;
	}
}
class DPTransformer extends GeometryTransformer {
	constructor(...args) {
		super();
		this.isEnsureValidTopology = true;
		this.distanceTolerance = null;
		if (args.length === 2) {
			let [isEnsureValidTopology, distanceTolerance] = args;
			this.isEnsureValidTopology = isEnsureValidTopology;
			this.distanceTolerance = distanceTolerance;
		}
	}
	get interfaces_() {
		return [];
	}
	transformPolygon(geom, parent) {
		if (geom.isEmpty()) return null;
		var rawGeom = super.transformPolygon(geom, parent);
		if (parent instanceof MultiPolygon) {
			return rawGeom;
		}
		return this.createValidArea(rawGeom);
	}
	createValidArea(rawAreaGeom) {
		if (this.isEnsureValidTopology) return rawAreaGeom.buffer(0.0);
		return rawAreaGeom;
	}
	transformCoordinates(coords, parent) {
		var inputPts = coords.toCoordinateArray();
		var newPts = null;
		if (inputPts.length === 0) {
			newPts = new Array(0);
		} else {
			newPts = DouglasPeuckerLineSimplifier.simplify(inputPts, this.distanceTolerance);
		}
		return this.factory.getCoordinateSequenceFactory().create(newPts);
	}
	transformMultiPolygon(geom, parent) {
		var rawGeom = super.transformMultiPolygon(geom, parent);
		return this.createValidArea(rawGeom);
	}
	transformLinearRing(geom, parent) {
		var removeDegenerateRings = parent instanceof Polygon;
		var simpResult = super.transformLinearRing(geom, parent);
		if (removeDegenerateRings && !(simpResult instanceof LinearRing)) return null;
		;
		return simpResult;
	}
	getClass() {
		return DPTransformer;
	}
}

class NodeBase$1 {
	constructor(...args) {
		this.items = new ArrayList();
		this.subnode = new Array(4);
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [Serializable];
	}
	static getSubnodeIndex(env, centrex, centrey) {
		var subnodeIndex = -1;
		if (env.getMinX() >= centrex) {
			if (env.getMinY() >= centrey) subnodeIndex = 3;
			if (env.getMaxY() <= centrey) subnodeIndex = 1;
		}
		if (env.getMaxX() <= centrex) {
			if (env.getMinY() >= centrey) subnodeIndex = 2;
			if (env.getMaxY() <= centrey) subnodeIndex = 0;
		}
		return subnodeIndex;
	}
	hasChildren() {
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) return true;
		}
		return false;
	}
	isPrunable() {
		return !(this.hasChildren() || this.hasItems());
	}
	addAllItems(resultItems) {
		resultItems.addAll(this.items);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItems(resultItems);
			}
		}
		return resultItems;
	}
	getNodeCount() {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + 1;
	}
	size() {
		var subSize = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				subSize += this.subnode[i].size();
			}
		}
		return subSize + this.items.size();
	}
	addAllItemsFromOverlapping(searchEnv, resultItems) {
		if (!this.isSearchMatch(searchEnv)) return null;
		resultItems.addAll(this.items);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].addAllItemsFromOverlapping(searchEnv, resultItems);
			}
		}
	}
	visitItems(searchEnv, visitor) {
		for (var i = this.items.iterator(); i.hasNext(); ) {
			visitor.visitItem(i.next());
		}
	}
	hasItems() {
		return !this.items.isEmpty();
	}
	remove(itemEnv, item) {
		if (!this.isSearchMatch(itemEnv)) return false;
		var found = false;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				found = this.subnode[i].remove(itemEnv, item);
				if (found) {
					if (this.subnode[i].isPrunable()) this.subnode[i] = null;
					break;
				}
			}
		}
		if (found) return found;
		found = this.items.remove(item);
		return found;
	}
	visit(searchEnv, visitor) {
		if (!this.isSearchMatch(searchEnv)) return null;
		this.visitItems(searchEnv, visitor);
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				this.subnode[i].visit(searchEnv, visitor);
			}
		}
	}
	getItems() {
		return this.items;
	}
	depth() {
		var maxSubDepth = 0;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				var sqd = this.subnode[i].depth();
				if (sqd > maxSubDepth) maxSubDepth = sqd;
			}
		}
		return maxSubDepth + 1;
	}
	isEmpty() {
		var isEmpty = true;
		if (!this.items.isEmpty()) isEmpty = false;
		for (var i = 0; i < 4; i++) {
			if (this.subnode[i] !== null) {
				if (!this.subnode[i].isEmpty()) isEmpty = false;
			}
		}
		return isEmpty;
	}
	add(item) {
		this.items.add(item);
	}
	getClass() {
		return NodeBase$1;
	}
}

class Key$1 {
	constructor(...args) {
		this.pt = new Coordinate();
		this.level = 0;
		this.env = null;
		if (args.length === 1) {
			let [itemEnv] = args;
			this.computeKey(itemEnv);
		}
	}
	get interfaces_() {
		return [];
	}
	static computeQuadLevel(env) {
		var dx = env.getWidth();
		var dy = env.getHeight();
		var dMax = dx > dy ? dx : dy;
		var level = DoubleBits.exponent(dMax) + 1;
		return level;
	}
	getLevel() {
		return this.level;
	}
	computeKey(...args) {
		if (args.length === 1) {
			let [itemEnv] = args;
			this.level = Key$1.computeQuadLevel(itemEnv);
			this.env = new Envelope();
			this.computeKey(this.level, itemEnv);
			while (!this.env.contains(itemEnv)) {
				this.level += 1;
				this.computeKey(this.level, itemEnv);
			}
		} else if (args.length === 2) {
			let [level, itemEnv] = args;
			var quadSize = DoubleBits.powerOf2(level);
			this.pt.x = Math.floor(itemEnv.getMinX() / quadSize) * quadSize;
			this.pt.y = Math.floor(itemEnv.getMinY() / quadSize) * quadSize;
			this.env.init(this.pt.x, this.pt.x + quadSize, this.pt.y, this.pt.y + quadSize);
		}
	}
	getEnvelope() {
		return this.env;
	}
	getCentre() {
		return new Coordinate((this.env.getMinX() + this.env.getMaxX()) / 2, (this.env.getMinY() + this.env.getMaxY()) / 2);
	}
	getPoint() {
		return this.pt;
	}
	getClass() {
		return Key$1;
	}
}

class Node$3 extends NodeBase$1 {
	constructor(...args) {
		super();
		this.env = null;
		this.centrex = null;
		this.centrey = null;
		this.level = null;
		if (args.length === 2) {
			let [env, level] = args;
			this.env = env;
			this.level = level;
			this.centrex = (env.getMinX() + env.getMaxX()) / 2;
			this.centrey = (env.getMinY() + env.getMaxY()) / 2;
		}
	}
	get interfaces_() {
		return [];
	}
	static createNode(env) {
		var key = new Key$1(env);
		var node = new Node$3(key.getEnvelope(), key.getLevel());
		return node;
	}
	static createExpanded(node, addEnv) {
		var expandEnv = new Envelope(addEnv);
		if (node !== null) expandEnv.expandToInclude(node.env);
		var largerNode = Node$3.createNode(expandEnv);
		if (node !== null) largerNode.insertNode(node);
		return largerNode;
	}
	find(searchEnv) {
		var subnodeIndex = Node$3.getSubnodeIndex(searchEnv, this.centrex, this.centrey);
		if (subnodeIndex === -1) return this;
		if (this.subnode[subnodeIndex] !== null) {
			var node = this.subnode[subnodeIndex];
			return node.find(searchEnv);
		}
		return this;
	}
	isSearchMatch(searchEnv) {
		return this.env.intersects(searchEnv);
	}
	getSubnode(index) {
		if (this.subnode[index] === null) {
			this.subnode[index] = this.createSubnode(index);
		}
		return this.subnode[index];
	}
	getEnvelope() {
		return this.env;
	}
	getNode(searchEnv) {
		var subnodeIndex = Node$3.getSubnodeIndex(searchEnv, this.centrex, this.centrey);
		if (subnodeIndex !== -1) {
			var node = this.getSubnode(subnodeIndex);
			return node.getNode(searchEnv);
		} else {
			return this;
		}
	}
	createSubnode(index) {
		var minx = 0.0;
		var maxx = 0.0;
		var miny = 0.0;
		var maxy = 0.0;
		switch (index) {
			case 0:
				minx = this.env.getMinX();
				maxx = this.centrex;
				miny = this.env.getMinY();
				maxy = this.centrey;
				break;
			case 1:
				minx = this.centrex;
				maxx = this.env.getMaxX();
				miny = this.env.getMinY();
				maxy = this.centrey;
				break;
			case 2:
				minx = this.env.getMinX();
				maxx = this.centrex;
				miny = this.centrey;
				maxy = this.env.getMaxY();
				break;
			case 3:
				minx = this.centrex;
				maxx = this.env.getMaxX();
				miny = this.centrey;
				maxy = this.env.getMaxY();
				break;
		}
		var sqEnv = new Envelope(minx, maxx, miny, maxy);
		var node = new Node$3(sqEnv, this.level - 1);
		return node;
	}
	insertNode(node) {
		Assert.isTrue(this.env === null || this.env.contains(node.env));
		var index = Node$3.getSubnodeIndex(node.env, this.centrex, this.centrey);
		if (node.level === this.level - 1) {
			this.subnode[index] = node;
		} else {
			var childNode = this.createSubnode(index);
			childNode.insertNode(node);
			this.subnode[index] = childNode;
		}
	}
	getClass() {
		return Node$3;
	}
}

class Root$1 extends NodeBase$1 {
	constructor(...args) {
		super();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	insert(itemEnv, item) {
		var index = Root$1.getSubnodeIndex(itemEnv, Root$1.origin.x, Root$1.origin.y);
		if (index === -1) {
			this.add(item);
			return null;
		}
		var node = this.subnode[index];
		if (node === null || !node.getEnvelope().contains(itemEnv)) {
			var largerNode = Node$3.createExpanded(node, itemEnv);
			this.subnode[index] = largerNode;
		}
		this.insertContained(this.subnode[index], itemEnv, item);
	}
	isSearchMatch(searchEnv) {
		return true;
	}
	insertContained(tree, itemEnv, item) {
		Assert.isTrue(tree.getEnvelope().contains(itemEnv));
		var isZeroX = IntervalSize.isZeroWidth(itemEnv.getMinX(), itemEnv.getMaxX());
		var isZeroY = IntervalSize.isZeroWidth(itemEnv.getMinY(), itemEnv.getMaxY());
		var node = null;
		if (isZeroX || isZeroY) node = tree.find(itemEnv); else node = tree.getNode(itemEnv);
		node.add(item);
	}
	getClass() {
		return Root$1;
	}
}
Root$1.origin = new Coordinate(0.0, 0.0);

class Quadtree {
	constructor(...args) {
		this.root = null;
		this.minExtent = 1.0;
		if (args.length === 0) {
			let [] = args;
			this.root = new Root$1();
		}
	}
	get interfaces_() {
		return [SpatialIndex, Serializable];
	}
	static ensureExtent(itemEnv, minExtent) {
		var minx = itemEnv.getMinX();
		var maxx = itemEnv.getMaxX();
		var miny = itemEnv.getMinY();
		var maxy = itemEnv.getMaxY();
		if (minx !== maxx && miny !== maxy) return itemEnv;
		if (minx === maxx) {
			minx = minx - minExtent / 2.0;
			maxx = minx + minExtent / 2.0;
		}
		if (miny === maxy) {
			miny = miny - minExtent / 2.0;
			maxy = miny + minExtent / 2.0;
		}
		return new Envelope(minx, maxx, miny, maxy);
	}
	size() {
		if (this.root !== null) return this.root.size();
		return 0;
	}
	insert(itemEnv, item) {
		this.collectStats(itemEnv);
		var insertEnv = Quadtree.ensureExtent(itemEnv, this.minExtent);
		this.root.insert(insertEnv, item);
	}
	query(...args) {
		if (args.length === 1) {
			let [searchEnv] = args;
			var visitor = new ArrayListVisitor();
			this.query(searchEnv, visitor);
			return visitor.getItems();
		} else if (args.length === 2) {
			let [searchEnv, visitor] = args;
			this.root.visit(searchEnv, visitor);
		}
	}
	queryAll() {
		var foundItems = new ArrayList();
		this.root.addAllItems(foundItems);
		return foundItems;
	}
	remove(itemEnv, item) {
		var posEnv = Quadtree.ensureExtent(itemEnv, this.minExtent);
		return this.root.remove(posEnv, item);
	}
	collectStats(itemEnv) {
		var delX = itemEnv.getWidth();
		if (delX < this.minExtent && delX > 0.0) this.minExtent = delX;
		var delY = itemEnv.getHeight();
		if (delY < this.minExtent && delY > 0.0) this.minExtent = delY;
	}
	depth() {
		if (this.root !== null) return this.root.depth();
		return 0;
	}
	isEmpty() {
		if (this.root === null) return true;
		return false;
	}
	getClass() {
		return Quadtree;
	}
}
Quadtree.serialVersionUID = -7461163625812743604;

class TaggedLineSegment extends LineSegment {
	constructor(...args) {
		super();
		this.parent = null;
		this.index = null;
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [p0, p1] = args;
					overloaded.call(this, p0, p1, null, -1);
				})(...args);
			} else if (args.length === 4) {
				return ((...args) => {
					let [p0, p1, parent, index] = args;
					super(p0, p1);
					this.parent = parent;
					this.index = index;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getIndex() {
		return this.index;
	}
	getParent() {
		return this.parent;
	}
	getClass() {
		return TaggedLineSegment;
	}
}

class TaggedLineString {
	constructor(...args) {
		this.parentLine = null;
		this.segs = null;
		this.resultSegs = new ArrayList();
		this.minimumSize = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [parentLine] = args;
				overloaded.call(this, parentLine, 2);
			} else if (args.length === 2) {
				let [parentLine, minimumSize] = args;
				this.parentLine = parentLine;
				this.minimumSize = minimumSize;
				this.init();
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static extractCoordinates(segs) {
		var pts = new Array(segs.size() + 1);
		var seg = null;
		for (var i = 0; i < segs.size(); i++) {
			seg = segs.get(i);
			pts[i] = seg.p0;
		}
		pts[pts.length - 1] = seg.p1;
		return pts;
	}
	addToResult(seg) {
		this.resultSegs.add(seg);
	}
	asLineString() {
		return this.parentLine.getFactory().createLineString(TaggedLineString.extractCoordinates(this.resultSegs));
	}
	getResultSize() {
		var resultSegsSize = this.resultSegs.size();
		return resultSegsSize === 0 ? 0 : resultSegsSize + 1;
	}
	getParent() {
		return this.parentLine;
	}
	getSegment(i) {
		return this.segs[i];
	}
	getParentCoordinates() {
		return this.parentLine.getCoordinates();
	}
	getMinimumSize() {
		return this.minimumSize;
	}
	asLinearRing() {
		return this.parentLine.getFactory().createLinearRing(TaggedLineString.extractCoordinates(this.resultSegs));
	}
	getSegments() {
		return this.segs;
	}
	init() {
		var pts = this.parentLine.getCoordinates();
		this.segs = new Array(pts.length - 1);
		for (var i = 0; i < pts.length - 1; i++) {
			var seg = new TaggedLineSegment(pts[i], pts[i + 1], this.parentLine, i);
			this.segs[i] = seg;
		}
	}
	getResultCoordinates() {
		return TaggedLineString.extractCoordinates(this.resultSegs);
	}
	getClass() {
		return TaggedLineString;
	}
}

class LineSegmentIndex {
	constructor(...args) {
		this.index = new Quadtree();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	remove(seg) {
		this.index.remove(new Envelope(seg.p0, seg.p1), seg);
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof TaggedLineString) {
				let [line] = args;
				var segs = line.getSegments();
				for (var i = 0; i < segs.length; i++) {
					var seg = segs[i];
					this.add(seg);
				}
			} else if (args[0] instanceof LineSegment) {
				let [seg] = args;
				this.index.insert(new Envelope(seg.p0, seg.p1), seg);
			}
		}
	}
	query(querySeg) {
		var env = new Envelope(querySeg.p0, querySeg.p1);
		var visitor = new LineSegmentVisitor(querySeg);
		this.index.query(env, visitor);
		var itemsFound = visitor.getItems();
		return itemsFound;
	}
	getClass() {
		return LineSegmentIndex;
	}
}
class LineSegmentVisitor {
	constructor(...args) {
		this.querySeg = null;
		this.items = new ArrayList();
		if (args.length === 1) {
			let [querySeg] = args;
			this.querySeg = querySeg;
		}
	}
	get interfaces_() {
		return [ItemVisitor];
	}
	visitItem(item) {
		var seg = item;
		if (Envelope.intersects(seg.p0, seg.p1, this.querySeg.p0, this.querySeg.p1)) this.items.add(item);
	}
	getItems() {
		return this.items;
	}
	getClass() {
		return LineSegmentVisitor;
	}
}

class TaggedLineStringSimplifier {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.inputIndex = new LineSegmentIndex();
		this.outputIndex = new LineSegmentIndex();
		this.line = null;
		this.linePts = null;
		this.distanceTolerance = 0.0;
		if (args.length === 2) {
			let [inputIndex, outputIndex] = args;
			this.inputIndex = inputIndex;
			this.outputIndex = outputIndex;
		}
	}
	get interfaces_() {
		return [];
	}
	static isInLineSection(line, sectionIndex, seg) {
		if (seg.getParent() !== line.getParent()) return false;
		var segIndex = seg.getIndex();
		if (segIndex >= sectionIndex[0] && segIndex < sectionIndex[1]) return true;
		return false;
	}
	flatten(start, end) {
		var p0 = this.linePts[start];
		var p1 = this.linePts[end];
		var newSeg = new LineSegment(p0, p1);
		this.remove(this.line, start, end);
		this.outputIndex.add(newSeg);
		return newSeg;
	}
	hasBadIntersection(parentLine, sectionIndex, candidateSeg) {
		if (this.hasBadOutputIntersection(candidateSeg)) return true;
		if (this.hasBadInputIntersection(parentLine, sectionIndex, candidateSeg)) return true;
		return false;
	}
	setDistanceTolerance(distanceTolerance) {
		this.distanceTolerance = distanceTolerance;
	}
	simplifySection(i, j, depth) {
		depth += 1;
		var sectionIndex = new Array(2);
		if (i + 1 === j) {
			var newSeg = this.line.getSegment(i);
			this.line.addToResult(newSeg);
			return null;
		}
		var isValidToSimplify = true;
		if (this.line.getResultSize() < this.line.getMinimumSize()) {
			var worstCaseSize = depth + 1;
			if (worstCaseSize < this.line.getMinimumSize()) isValidToSimplify = false;
		}
		var distance = new Array(1);
		var furthestPtIndex = this.findFurthestPoint(this.linePts, i, j, distance);
		if (distance[0] > this.distanceTolerance) isValidToSimplify = false;
		var candidateSeg = new LineSegment();
		candidateSeg.p0 = this.linePts[i];
		candidateSeg.p1 = this.linePts[j];
		sectionIndex[0] = i;
		sectionIndex[1] = j;
		if (this.hasBadIntersection(this.line, sectionIndex, candidateSeg)) isValidToSimplify = false;
		if (isValidToSimplify) {
			var newSeg = this.flatten(i, j);
			this.line.addToResult(newSeg);
			return null;
		}
		this.simplifySection(i, furthestPtIndex, depth);
		this.simplifySection(furthestPtIndex, j, depth);
	}
	hasBadOutputIntersection(candidateSeg) {
		var querySegs = this.outputIndex.query(candidateSeg);
		for (var i = querySegs.iterator(); i.hasNext(); ) {
			var querySeg = i.next();
			if (this.hasInteriorIntersection(querySeg, candidateSeg)) {
				return true;
			}
		}
		return false;
	}
	findFurthestPoint(pts, i, j, maxDistance) {
		var seg = new LineSegment();
		seg.p0 = pts[i];
		seg.p1 = pts[j];
		var maxDist = -1.0;
		var maxIndex = i;
		for (var k = i + 1; k < j; k++) {
			var midPt = pts[k];
			var distance = seg.distance(midPt);
			if (distance > maxDist) {
				maxDist = distance;
				maxIndex = k;
			}
		}
		maxDistance[0] = maxDist;
		return maxIndex;
	}
	simplify(line) {
		this.line = line;
		this.linePts = line.getParentCoordinates();
		this.simplifySection(0, this.linePts.length - 1, 0);
	}
	remove(line, start, end) {
		for (var i = start; i < end; i++) {
			var seg = line.getSegment(i);
			this.inputIndex.remove(seg);
		}
	}
	hasInteriorIntersection(seg0, seg1) {
		this.li.computeIntersection(seg0.p0, seg0.p1, seg1.p0, seg1.p1);
		return this.li.isInteriorIntersection();
	}
	hasBadInputIntersection(parentLine, sectionIndex, candidateSeg) {
		var querySegs = this.inputIndex.query(candidateSeg);
		for (var i = querySegs.iterator(); i.hasNext(); ) {
			var querySeg = i.next();
			if (this.hasInteriorIntersection(querySeg, candidateSeg)) {
				if (TaggedLineStringSimplifier.isInLineSection(parentLine, sectionIndex, querySeg)) continue;
				return true;
			}
		}
		return false;
	}
	getClass() {
		return TaggedLineStringSimplifier;
	}
}

class TaggedLinesSimplifier {
	constructor(...args) {
		this.inputIndex = new LineSegmentIndex();
		this.outputIndex = new LineSegmentIndex();
		this.distanceTolerance = 0.0;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	setDistanceTolerance(distanceTolerance) {
		this.distanceTolerance = distanceTolerance;
	}
	simplify(taggedLines) {
		for (var i = taggedLines.iterator(); i.hasNext(); ) {
			this.inputIndex.add(i.next());
		}
		for (var i = taggedLines.iterator(); i.hasNext(); ) {
			var tlss = new TaggedLineStringSimplifier(this.inputIndex, this.outputIndex);
			tlss.setDistanceTolerance(this.distanceTolerance);
			tlss.simplify(i.next());
		}
	}
	getClass() {
		return TaggedLinesSimplifier;
	}
}

class TopologyPreservingSimplifier {
	constructor(...args) {
		this.inputGeom = null;
		this.lineSimplifier = new TaggedLinesSimplifier();
		this.linestringMap = null;
		if (args.length === 1) {
			let [inputGeom] = args;
			this.inputGeom = inputGeom;
		}
	}
	get interfaces_() {
		return [];
	}
	static get LineStringTransformer() {
		return LineStringTransformer;
	}
	static get LineStringMapBuilderFilter() {
		return LineStringMapBuilderFilter;
	}
	static simplify(geom, distanceTolerance) {
		var tss = new TopologyPreservingSimplifier(geom);
		tss.setDistanceTolerance(distanceTolerance);
		return tss.getResultGeometry();
	}
	getResultGeometry() {
		if (this.inputGeom.isEmpty()) return this.inputGeom.copy();
		this.linestringMap = new HashMap();
		this.inputGeom.apply(new LineStringMapBuilderFilter(this));
		this.lineSimplifier.simplify(this.linestringMap.values());
		var result = new LineStringTransformer(this.linestringMap).transform(this.inputGeom);
		return result;
	}
	setDistanceTolerance(distanceTolerance) {
		if (distanceTolerance < 0.0) throw new IllegalArgumentException$1("Tolerance must be non-negative");
		this.lineSimplifier.setDistanceTolerance(distanceTolerance);
	}
	getClass() {
		return TopologyPreservingSimplifier;
	}
}
class LineStringTransformer extends GeometryTransformer {
	constructor(...args) {
		super();
		this.linestringMap = null;
		if (args.length === 1) {
			let [linestringMap] = args;
			this.linestringMap = linestringMap;
		}
	}
	get interfaces_() {
		return [];
	}
	transformCoordinates(coords, parent) {
		if (coords.size() === 0) return null;
		if (parent instanceof LineString) {
			var taggedLine = this.linestringMap.get(parent);
			return this.createCoordinateSequence(taggedLine.getResultCoordinates());
		}
		return super.transformCoordinates(coords, parent);
	}
	getClass() {
		return LineStringTransformer;
	}
}
class LineStringMapBuilderFilter {
	constructor(...args) {
		this.tps = null;
		if (args.length === 1) {
			let [tps] = args;
			this.tps = tps;
		}
	}
	get interfaces_() {
		return [GeometryComponentFilter$1];
	}
	filter(geom) {
		if (geom instanceof LineString) {
			var line = geom;
			if (line.isEmpty()) return null;
			var minSize = line.isClosed() ? 4 : 2;
			var taggedLine = new TaggedLineString(line, minSize);
			this.tps.linestringMap.put(line, taggedLine);
		}
	}
	getClass() {
		return LineStringMapBuilderFilter;
	}
}

class GeometryCollectionMapper$1 {
	constructor(...args) {
		this.mapOp = null;
		if (args.length === 1) {
			let [mapOp] = args;
			this.mapOp = mapOp;
		}
	}
	get interfaces_() {
		return [];
	}
	static map(gc, op) {
		var mapper = new GeometryCollectionMapper$1(op);
		return mapper.map(gc);
	}
	map(gc) {
		var mapped = new ArrayList();
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = this.mapOp.map(gc.getGeometryN(i));
			if (!g.isEmpty()) mapped.add(g);
		}
		return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped));
	}
	getClass() {
		return GeometryCollectionMapper$1;
	}
}

class InteriorPointArea$1 {
	constructor(...args) {
		this.factory = null;
		this.interiorPoint = null;
		this.maxWidth = 0.0;
		if (args.length === 1) {
			let [g] = args;
			this.factory = g.getFactory();
			this.add(g);
		}
	}
	get interfaces_() {
		return [];
	}
	static get SafeBisectorFinder() {
		return SafeBisectorFinder;
	}
	static centre(envelope) {
		return new Coordinate(InteriorPointArea$1.avg(envelope.getMinX(), envelope.getMaxX()), InteriorPointArea$1.avg(envelope.getMinY(), envelope.getMaxY()));
	}
	static avg(a, b) {
		return (a + b) / 2.0;
	}
	addPolygon(geometry) {
		if (geometry.isEmpty()) return null;
		var intPt = null;
		var width = 0;
		var bisector = this.horizontalBisector(geometry);
		if (bisector.getLength() === 0.0) {
			width = 0;
			intPt = bisector.getCoordinate();
		} else {
			var intersections = bisector.intersection(geometry);
			var widestIntersection = this.widestGeometry(intersections);
			width = widestIntersection.getEnvelopeInternal().getWidth();
			intPt = InteriorPointArea$1.centre(widestIntersection.getEnvelopeInternal());
		}
		if (this.interiorPoint === null || width > this.maxWidth) {
			this.interiorPoint = intPt;
			this.maxWidth = width;
		}
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	widestGeometry(...args) {
		if (args.length === 1) {
			if (args[0] instanceof GeometryCollection) {
				let [gc] = args;
				if (gc.isEmpty()) {
					return gc;
				}
				var widestGeometry = gc.getGeometryN(0);
				for (var i = 1; i < gc.getNumGeometries(); i++) {
					if (gc.getGeometryN(i).getEnvelopeInternal().getWidth() > widestGeometry.getEnvelopeInternal().getWidth()) {
						widestGeometry = gc.getGeometryN(i);
					}
				}
				return widestGeometry;
			} else if (args[0] instanceof Geometry) {
				let [geometry] = args;
				if (!(geometry instanceof GeometryCollection)) {
					return geometry;
				}
				return this.widestGeometry(geometry);
			}
		}
	}
	horizontalBisector(geometry) {
		var envelope = geometry.getEnvelopeInternal();
		var bisectY = SafeBisectorFinder.getBisectorY(geometry);
		return this.factory.createLineString([new Coordinate(envelope.getMinX(), bisectY), new Coordinate(envelope.getMaxX(), bisectY)]);
	}
	add(geom) {
		if (geom instanceof Polygon) {
			this.addPolygon(geom);
		} else if (geom instanceof GeometryCollection) {
			var gc = geom;
			for (var i = 0; i < gc.getNumGeometries(); i++) {
				this.add(gc.getGeometryN(i));
			}
		}
	}
	getClass() {
		return InteriorPointArea$1;
	}
}
class SafeBisectorFinder {
	constructor(...args) {
		this.poly = null;
		this.centreY = null;
		this.hiY = Double.MAX_VALUE;
		this.loY = -Double.MAX_VALUE;
		if (args.length === 1) {
			let [poly] = args;
			this.poly = poly;
			this.hiY = poly.getEnvelopeInternal().getMaxY();
			this.loY = poly.getEnvelopeInternal().getMinY();
			this.centreY = SafeBisectorFinder.avg(this.loY, this.hiY);
		}
	}
	get interfaces_() {
		return [];
	}
	static getBisectorY(poly) {
		var finder = new SafeBisectorFinder(poly);
		return finder.getBisectorY();
	}
	updateInterval(y) {
		if (y <= this.centreY) {
			if (y > this.loY) this.loY = y;
		} else if (y > this.centreY) {
			if (y < this.hiY) {
				this.hiY = y;
			}
		}
	}
	getBisectorY() {
		this.process(this.poly.getExteriorRing());
		for (var i = 0; i < this.poly.getNumInteriorRing(); i++) {
			this.process(this.poly.getInteriorRingN(i));
		}
		var bisectY = SafeBisectorFinder.avg(this.hiY, this.loY);
		return bisectY;
	}
	process(line) {
		var seq = line.getCoordinateSequence();
		for (var i = 0; i < seq.size(); i++) {
			var y = seq.getY(i);
			this.updateInterval(y);
		}
	}
	getClass() {
		return SafeBisectorFinder;
	}
}

class InteriorPointLine$1 {
	constructor(...args) {
		this.centroid = null;
		this.minDistance = Double.MAX_VALUE;
		this.interiorPoint = null;
		if (args.length === 1) {
			let [g] = args;
			this.centroid = g.getCentroid().getCoordinate();
			this.addInterior(g);
			if (this.interiorPoint === null) this.addEndpoints(g);
		}
	}
	get interfaces_() {
		return [];
	}
	addEndpoints(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geom] = args;
				if (geom instanceof LineString) {
					this.addEndpoints(geom.getCoordinates());
				} else if (geom instanceof GeometryCollection) {
					var gc = geom;
					for (var i = 0; i < gc.getNumGeometries(); i++) {
						this.addEndpoints(gc.getGeometryN(i));
					}
				}
			} else if (args[0] instanceof Array) {
				let [pts] = args;
				this.add(pts[0]);
				this.add(pts[pts.length - 1]);
			}
		}
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	addInterior(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geom] = args;
				if (geom instanceof LineString) {
					this.addInterior(geom.getCoordinates());
				} else if (geom instanceof GeometryCollection) {
					var gc = geom;
					for (var i = 0; i < gc.getNumGeometries(); i++) {
						this.addInterior(gc.getGeometryN(i));
					}
				}
			} else if (args[0] instanceof Array) {
				let [pts] = args;
				for (var i = 1; i < pts.length - 1; i++) {
					this.add(pts[i]);
				}
			}
		}
	}
	add(point) {
		var dist = point.distance(this.centroid);
		if (dist < this.minDistance) {
			this.interiorPoint = new Coordinate(point);
			this.minDistance = dist;
		}
	}
	getClass() {
		return InteriorPointLine$1;
	}
}

class UniqueCoordinateArrayFilter {
	constructor(...args) {
		this.treeSet = new TreeSet();
		this.list = new ArrayList();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	static filterCoordinates(coords) {
		var filter = new UniqueCoordinateArrayFilter();
		for (var i = 0; i < coords.length; i++) {
			filter.filter(coords[i]);
		}
		return filter.getCoordinates();
	}
	filter(coord) {
		if (!this.treeSet.contains(coord)) {
			this.list.add(coord);
			this.treeSet.add(coord);
		}
	}
	getCoordinates() {
		var coordinates = new Array(this.list.size());
		return this.list.toArray(coordinates);
	}
	getClass() {
		return UniqueCoordinateArrayFilter;
	}
}

class ConvexHull$1 {
	constructor(...args) {
		this.geomFactory = null;
		this.inputPts = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				let [geometry] = args;
				overloaded.call(this, ConvexHull$1.extractCoordinates(geometry), geometry.getFactory());
			} else if (args.length === 2) {
				let [pts, geomFactory] = args;
				this.inputPts = UniqueCoordinateArrayFilter.filterCoordinates(pts);
				this.geomFactory = geomFactory;
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get RadialComparator() {
		return RadialComparator;
	}
	static extractCoordinates(geom) {
		var filter = new UniqueCoordinateArrayFilter();
		geom.apply(filter);
		return filter.getCoordinates();
	}
	preSort(pts) {
		var t = null;
		for (var i = 1; i < pts.length; i++) {
			if (pts[i].y < pts[0].y || pts[i].y === pts[0].y && pts[i].x < pts[0].x) {
				t = pts[0];
				pts[0] = pts[i];
				pts[i] = t;
			}
		}
		Arrays.sort(pts, 1, pts.length, new RadialComparator(pts[0]));
		return pts;
	}
	computeOctRing(inputPts) {
		var octPts = this.computeOctPts(inputPts);
		var coordList = new CoordinateList();
		coordList.add(octPts, false);
		if (coordList.size() < 3) {
			return null;
		}
		coordList.closeRing();
		return coordList.toCoordinateArray();
	}
	lineOrPolygon(coordinates) {
		coordinates = this.cleanRing(coordinates);
		if (coordinates.length === 3) {
			return this.geomFactory.createLineString([coordinates[0], coordinates[1]]);
		}
		var linearRing = this.geomFactory.createLinearRing(coordinates);
		return this.geomFactory.createPolygon(linearRing, null);
	}
	cleanRing(original) {
		Assert.equals(original[0], original[original.length - 1]);
		var cleanedRing = new ArrayList();
		var previousDistinctCoordinate = null;
		for (var i = 0; i <= original.length - 2; i++) {
			var currentCoordinate = original[i];
			var nextCoordinate = original[i + 1];
			if (currentCoordinate.equals(nextCoordinate)) {
				continue;
			}
			if (previousDistinctCoordinate !== null && this.isBetween(previousDistinctCoordinate, currentCoordinate, nextCoordinate)) {
				continue;
			}
			cleanedRing.add(currentCoordinate);
			previousDistinctCoordinate = currentCoordinate;
		}
		cleanedRing.add(original[original.length - 1]);
		var cleanedRingCoordinates = new Array(cleanedRing.size());
		return cleanedRing.toArray(cleanedRingCoordinates);
	}
	isBetween(c1, c2, c3) {
		if (CGAlgorithms.computeOrientation(c1, c2, c3) !== 0) {
			return false;
		}
		if (c1.x !== c3.x) {
			if (c1.x <= c2.x && c2.x <= c3.x) {
				return true;
			}
			if (c3.x <= c2.x && c2.x <= c1.x) {
				return true;
			}
		}
		if (c1.y !== c3.y) {
			if (c1.y <= c2.y && c2.y <= c3.y) {
				return true;
			}
			if (c3.y <= c2.y && c2.y <= c1.y) {
				return true;
			}
		}
		return false;
	}
	reduce(inputPts) {
		var polyPts = this.computeOctRing(inputPts);
		if (polyPts === null) return inputPts;
		var reducedSet = new TreeSet();
		for (var i = 0; i < polyPts.length; i++) {
			reducedSet.add(polyPts[i]);
		}
		for (var i = 0; i < inputPts.length; i++) {
			if (!CGAlgorithms.isPointInRing(inputPts[i], polyPts)) {
				reducedSet.add(inputPts[i]);
			}
		}
		var reducedPts = CoordinateArrays.toCoordinateArray(reducedSet);
		if (reducedPts.length < 3) return this.padArray3(reducedPts);
		return reducedPts;
	}
	getConvexHull() {
		if (this.inputPts.length === 0) {
			return this.geomFactory.createGeometryCollection(null);
		}
		if (this.inputPts.length === 1) {
			return this.geomFactory.createPoint(this.inputPts[0]);
		}
		if (this.inputPts.length === 2) {
			return this.geomFactory.createLineString(this.inputPts);
		}
		var reducedPts = this.inputPts;
		if (this.inputPts.length > 50) {
			reducedPts = this.reduce(this.inputPts);
		}
		var sortedPts = this.preSort(reducedPts);
		var cHS = this.grahamScan(sortedPts);
		var cH = this.toCoordinateArray(cHS);
		return this.lineOrPolygon(cH);
	}
	padArray3(pts) {
		var pad = new Array(3);
		for (var i = 0; i < pad.length; i++) {
			if (i < pts.length) {
				pad[i] = pts[i];
			} else pad[i] = pts[0];
		}
		return pad;
	}
	computeOctPts(inputPts) {
		var pts = new Array(8);
		for (var j = 0; j < pts.length; j++) {
			pts[j] = inputPts[0];
		}
		for (var i = 1; i < inputPts.length; i++) {
			if (inputPts[i].x < pts[0].x) {
				pts[0] = inputPts[i];
			}
			if (inputPts[i].x - inputPts[i].y < pts[1].x - pts[1].y) {
				pts[1] = inputPts[i];
			}
			if (inputPts[i].y > pts[2].y) {
				pts[2] = inputPts[i];
			}
			if (inputPts[i].x + inputPts[i].y > pts[3].x + pts[3].y) {
				pts[3] = inputPts[i];
			}
			if (inputPts[i].x > pts[4].x) {
				pts[4] = inputPts[i];
			}
			if (inputPts[i].x - inputPts[i].y > pts[5].x - pts[5].y) {
				pts[5] = inputPts[i];
			}
			if (inputPts[i].y < pts[6].y) {
				pts[6] = inputPts[i];
			}
			if (inputPts[i].x + inputPts[i].y < pts[7].x + pts[7].y) {
				pts[7] = inputPts[i];
			}
		}
		return pts;
	}
	toCoordinateArray(stack) {
		var coordinates = new Array(stack.size());
		for (var i = 0; i < stack.size(); i++) {
			var coordinate = stack.get(i);
			coordinates[i] = coordinate;
		}
		return coordinates;
	}
	grahamScan(c) {
		var p = null;
		var ps = new Stack();
		p = ps.push(c[0]);
		p = ps.push(c[1]);
		p = ps.push(c[2]);
		for (var i = 3; i < c.length; i++) {
			p = ps.pop();
			while (!ps.empty() && CGAlgorithms.computeOrientation(ps.peek(), p, c[i]) > 0) {
				p = ps.pop();
			}
			p = ps.push(p);
			p = ps.push(c[i]);
		}
		p = ps.push(c[0]);
		return ps;
	}
	getClass() {
		return ConvexHull$1;
	}
}
class RadialComparator {
	constructor(...args) {
		this.origin = null;
		if (args.length === 1) {
			let [origin] = args;
			this.origin = origin;
		}
	}
	get interfaces_() {
		return [Comparator];
	}
	static polarCompare(o, p, q) {
		var dxp = p.x - o.x;
		var dyp = p.y - o.y;
		var dxq = q.x - o.x;
		var dyq = q.y - o.y;
		var orient = CGAlgorithms.computeOrientation(o, p, q);
		if (orient === CGAlgorithms.COUNTERCLOCKWISE) return 1;
		if (orient === CGAlgorithms.CLOCKWISE) return -1;
		var op = dxp * dxp + dyp * dyp;
		var oq = dxq * dxq + dyq * dyq;
		if (op < oq) {
			return -1;
		}
		if (op > oq) {
			return 1;
		}
		return 0;
	}
	compare(o1, o2) {
		var p1 = o1;
		var p2 = o2;
		return RadialComparator.polarCompare(this.origin, p1, p2);
	}
	getClass() {
		return RadialComparator;
	}
}

class Centroid$1 {
	constructor(...args) {
		this.areaBasePt = null;
		this.triangleCent3 = new Coordinate();
		this.areasum2 = 0;
		this.cg3 = new Coordinate();
		this.lineCentSum = new Coordinate();
		this.totalLength = 0.0;
		this.ptCount = 0;
		this.ptCentSum = new Coordinate();
		if (args.length === 1) {
			let [geom] = args;
			this.areaBasePt = null;
			this.add(geom);
		}
	}
	get interfaces_() {
		return [];
	}
	static area2(p1, p2, p3) {
		return (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y);
	}
	static centroid3(p1, p2, p3, c) {
		c.x = p1.x + p2.x + p3.x;
		c.y = p1.y + p2.y + p3.y;
		return null;
	}
	static getCentroid(geom) {
		var cent = new Centroid$1(geom);
		return cent.getCentroid();
	}
	addPoint(pt) {
		this.ptCount += 1;
		this.ptCentSum.x += pt.x;
		this.ptCentSum.y += pt.y;
	}
	setBasePoint(basePt) {
		if (this.areaBasePt === null) this.areaBasePt = basePt;
	}
	addLineSegments(pts) {
		var lineLen = 0.0;
		for (var i = 0; i < pts.length - 1; i++) {
			var segmentLen = pts[i].distance(pts[i + 1]);
			if (segmentLen === 0.0) continue;
			lineLen += segmentLen;
			var midx = (pts[i].x + pts[i + 1].x) / 2;
			this.lineCentSum.x += segmentLen * midx;
			var midy = (pts[i].y + pts[i + 1].y) / 2;
			this.lineCentSum.y += segmentLen * midy;
		}
		this.totalLength += lineLen;
		if (lineLen === 0.0 && pts.length > 0) this.addPoint(pts[0]);
	}
	addHole(pts) {
		var isPositiveArea = CGAlgorithms.isCCW(pts);
		for (var i = 0; i < pts.length - 1; i++) {
			this.addTriangle(this.areaBasePt, pts[i], pts[i + 1], isPositiveArea);
		}
		this.addLineSegments(pts);
	}
	getCentroid() {
		var cent = new Coordinate();
		if (Math.abs(this.areasum2) > 0.0) {
			cent.x = this.cg3.x / 3 / this.areasum2;
			cent.y = this.cg3.y / 3 / this.areasum2;
		} else if (this.totalLength > 0.0) {
			cent.x = this.lineCentSum.x / this.totalLength;
			cent.y = this.lineCentSum.y / this.totalLength;
		} else if (this.ptCount > 0) {
			cent.x = this.ptCentSum.x / this.ptCount;
			cent.y = this.ptCentSum.y / this.ptCount;
		} else {
			return null;
		}
		return cent;
	}
	addShell(pts) {
		if (pts.length > 0) this.setBasePoint(pts[0]);
		var isPositiveArea = !CGAlgorithms.isCCW(pts);
		for (var i = 0; i < pts.length - 1; i++) {
			this.addTriangle(this.areaBasePt, pts[i], pts[i + 1], isPositiveArea);
		}
		this.addLineSegments(pts);
	}
	addTriangle(p0, p1, p2, isPositiveArea) {
		var sign = isPositiveArea ? 1.0 : -1.0;
		Centroid$1.centroid3(p0, p1, p2, this.triangleCent3);
		var area2 = Centroid$1.area2(p0, p1, p2);
		this.cg3.x += sign * area2 * this.triangleCent3.x;
		this.cg3.y += sign * area2 * this.triangleCent3.y;
		this.areasum2 += sign * area2;
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Polygon) {
				let [poly] = args;
				this.addShell(poly.getExteriorRing().getCoordinates());
				for (var i = 0; i < poly.getNumInteriorRing(); i++) {
					this.addHole(poly.getInteriorRingN(i).getCoordinates());
				}
			} else if (args[0] instanceof Geometry) {
				let [geom] = args;
				if (geom.isEmpty()) return null;
				if (geom instanceof Point) {
					this.addPoint(geom.getCoordinate());
				} else if (geom instanceof LineString) {
					this.addLineSegments(geom.getCoordinates());
				} else if (geom instanceof Polygon) {
					var poly = geom;
					this.add(poly);
				} else if (geom instanceof GeometryCollection) {
					var gc = geom;
					for (var i = 0; i < gc.getNumGeometries(); i++) {
						this.add(gc.getGeometryN(i));
					}
				}
			}
		}
	}
	getClass() {
		return Centroid$1;
	}
}

class InteriorPointPoint$1 {
	constructor(...args) {
		this.centroid = null;
		this.minDistance = Double.MAX_VALUE;
		this.interiorPoint = null;
		if (args.length === 1) {
			let [g] = args;
			this.centroid = g.getCentroid().getCoordinate();
			this.add(g);
		}
	}
	get interfaces_() {
		return [];
	}
	getInteriorPoint() {
		return this.interiorPoint;
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Geometry) {
				let [geom] = args;
				if (geom instanceof Point) {
					this.add(geom.getCoordinate());
				} else if (geom instanceof GeometryCollection) {
					var gc = geom;
					for (var i = 0; i < gc.getNumGeometries(); i++) {
						this.add(gc.getGeometryN(i));
					}
				}
			} else if (args[0] instanceof Coordinate) {
				let [point] = args;
				var dist = point.distance(this.centroid);
				if (dist < this.minDistance) {
					this.interiorPoint = new Coordinate(point);
					this.minDistance = dist;
				}
			}
		}
	}
	getClass() {
		return InteriorPointPoint$1;
	}
}

class RectangleContains$1 {
	constructor(...args) {
		this.rectEnv = null;
		if (args.length === 1) {
			let [rectangle] = args;
			this.rectEnv = rectangle.getEnvelopeInternal();
		}
	}
	get interfaces_() {
		return [];
	}
	static contains(rectangle, b) {
		var rc = new RectangleContains$1(rectangle);
		return rc.contains(b);
	}
	isContainedInBoundary(geom) {
		if (geom instanceof Polygon) return false;
		if (geom instanceof Point) return this.isPointContainedInBoundary(geom);
		if (geom instanceof LineString) return this.isLineStringContainedInBoundary(geom);
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var comp = geom.getGeometryN(i);
			if (!this.isContainedInBoundary(comp)) return false;
		}
		return true;
	}
	isLineSegmentContainedInBoundary(p0, p1) {
		if (p0.equals(p1)) return this.isPointContainedInBoundary(p0);
		if (p0.x === p1.x) {
			if (p0.x === this.rectEnv.getMinX() || p0.x === this.rectEnv.getMaxX()) return true;
		} else if (p0.y === p1.y) {
			if (p0.y === this.rectEnv.getMinY() || p0.y === this.rectEnv.getMaxY()) return true;
		}
		return false;
	}
	isLineStringContainedInBoundary(line) {
		var seq = line.getCoordinateSequence();
		var p0 = new Coordinate();
		var p1 = new Coordinate();
		for (var i = 0; i < seq.size() - 1; i++) {
			seq.getCoordinate(i, p0);
			seq.getCoordinate(i + 1, p1);
			if (!this.isLineSegmentContainedInBoundary(p0, p1)) return false;
		}
		return true;
	}
	isPointContainedInBoundary(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Point) {
				let [point] = args;
				return this.isPointContainedInBoundary(point.getCoordinate());
			} else if (args[0] instanceof Coordinate) {
				let [pt] = args;
				return pt.x === this.rectEnv.getMinX() || pt.x === this.rectEnv.getMaxX() || pt.y === this.rectEnv.getMinY() || pt.y === this.rectEnv.getMaxY();
			}
		}
	}
	contains(geom) {
		if (!this.rectEnv.contains(geom.getEnvelopeInternal())) return false;
		if (this.isContainedInBoundary(geom)) return false;
		return true;
	}
	getClass() {
		return RectangleContains$1;
	}
}

class RectangleLineIntersector {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.rectEnv = null;
		this.diagUp0 = null;
		this.diagUp1 = null;
		this.diagDown0 = null;
		this.diagDown1 = null;
		if (args.length === 1) {
			let [rectEnv] = args;
			this.rectEnv = rectEnv;
			this.diagUp0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMinY());
			this.diagUp1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMaxY());
			this.diagDown0 = new Coordinate(rectEnv.getMinX(), rectEnv.getMaxY());
			this.diagDown1 = new Coordinate(rectEnv.getMaxX(), rectEnv.getMinY());
		}
	}
	get interfaces_() {
		return [];
	}
	intersects(p0, p1) {
		var segEnv = new Envelope(p0, p1);
		if (!this.rectEnv.intersects(segEnv)) return false;
		if (this.rectEnv.intersects(p0)) return true;
		if (this.rectEnv.intersects(p1)) return true;
		if (p0.compareTo(p1) > 0) {
			var tmp = p0;
			p0 = p1;
			p1 = tmp;
		}
		var isSegUpwards = false;
		if (p1.y > p0.y) isSegUpwards = true;
		if (isSegUpwards) {
			this.li.computeIntersection(p0, p1, this.diagDown0, this.diagDown1);
		} else {
			this.li.computeIntersection(p0, p1, this.diagUp0, this.diagUp1);
		}
		if (this.li.hasIntersection()) return true;
		return false;
	}
	getClass() {
		return RectangleLineIntersector;
	}
}

class ShortCircuitedGeometryVisitor {
	constructor(...args) {
		this._isDone = false;
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	applyTo(geom) {
		for (var i = 0; i < geom.getNumGeometries() && !this._isDone; i++) {
			var element = geom.getGeometryN(i);
			if (!(element instanceof GeometryCollection)) {
				this.visit(element);
				if (this.isDone()) {
					this._isDone = true;
					return null;
				}
			} else this.applyTo(element);
		}
	}
	getClass() {
		return ShortCircuitedGeometryVisitor;
	}
}

class RectangleIntersects$1 {
	constructor(...args) {
		this.rectangle = null;
		this.rectEnv = null;
		if (args.length === 1) {
			let [rectangle] = args;
			this.rectangle = rectangle;
			this.rectEnv = rectangle.getEnvelopeInternal();
		}
	}
	get interfaces_() {
		return [];
	}
	static intersects(rectangle, b) {
		var rp = new RectangleIntersects$1(rectangle);
		return rp.intersects(b);
	}
	intersects(geom) {
		if (!this.rectEnv.intersects(geom.getEnvelopeInternal())) return false;
		var visitor = new EnvelopeIntersectsVisitor(this.rectEnv);
		visitor.applyTo(geom);
		if (visitor.intersects()) return true;
		var ecpVisitor = new GeometryContainsPointVisitor(this.rectangle);
		ecpVisitor.applyTo(geom);
		if (ecpVisitor.containsPoint()) return true;
		var riVisitor = new RectangleIntersectsSegmentVisitor(this.rectangle);
		riVisitor.applyTo(geom);
		if (riVisitor.intersects()) return true;
		return false;
	}
	getClass() {
		return RectangleIntersects$1;
	}
}
class EnvelopeIntersectsVisitor extends ShortCircuitedGeometryVisitor {
	constructor(...args) {
		super();
		this.rectEnv = null;
		this._intersects = false;
		if (args.length === 1) {
			let [rectEnv] = args;
			this.rectEnv = rectEnv;
		}
	}
	get interfaces_() {
		return [];
	}
	isDone() {
		return this._intersects === true;
	}
	visit(element) {
		var elementEnv = element.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) {
			return null;
		}
		if (this.rectEnv.contains(elementEnv)) {
			this._intersects = true;
			return null;
		}
		if (elementEnv.getMinX() >= this.rectEnv.getMinX() && elementEnv.getMaxX() <= this.rectEnv.getMaxX()) {
			this._intersects = true;
			return null;
		}
		if (elementEnv.getMinY() >= this.rectEnv.getMinY() && elementEnv.getMaxY() <= this.rectEnv.getMaxY()) {
			this._intersects = true;
			return null;
		}
	}
	intersects() {
		return this._intersects;
	}
	getClass() {
		return EnvelopeIntersectsVisitor;
	}
}
class GeometryContainsPointVisitor extends ShortCircuitedGeometryVisitor {
	constructor(...args) {
		super();
		this.rectSeq = null;
		this.rectEnv = null;
		this._containsPoint = false;
		if (args.length === 1) {
			let [rectangle] = args;
			this.rectSeq = rectangle.getExteriorRing().getCoordinateSequence();
			this.rectEnv = rectangle.getEnvelopeInternal();
		}
	}
	get interfaces_() {
		return [];
	}
	isDone() {
		return this._containsPoint === true;
	}
	visit(geom) {
		if (!(geom instanceof Polygon)) return null;
		var elementEnv = geom.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) return null;
		var rectPt = new Coordinate();
		for (var i = 0; i < 4; i++) {
			this.rectSeq.getCoordinate(i, rectPt);
			if (!elementEnv.contains(rectPt)) continue;
			if (SimplePointInAreaLocator.containsPointInPolygon(rectPt, geom)) {
				this._containsPoint = true;
				return null;
			}
		}
	}
	containsPoint() {
		return this._containsPoint;
	}
	getClass() {
		return GeometryContainsPointVisitor;
	}
}
class RectangleIntersectsSegmentVisitor extends ShortCircuitedGeometryVisitor {
	constructor(...args) {
		super();
		this.rectEnv = null;
		this.rectIntersector = null;
		this.hasIntersection = false;
		this.p0 = new Coordinate();
		this.p1 = new Coordinate();
		if (args.length === 1) {
			let [rectangle] = args;
			this.rectEnv = rectangle.getEnvelopeInternal();
			this.rectIntersector = new RectangleLineIntersector(this.rectEnv);
		}
	}
	get interfaces_() {
		return [];
	}
	intersects() {
		return this.hasIntersection;
	}
	isDone() {
		return this.hasIntersection === true;
	}
	visit(geom) {
		var elementEnv = geom.getEnvelopeInternal();
		if (!this.rectEnv.intersects(elementEnv)) return null;
		var lines = LinearComponentExtracter.getLines(geom);
		this.checkIntersectionWithLineStrings(lines);
	}
	checkIntersectionWithLineStrings(lines) {
		for (var i = lines.iterator(); i.hasNext(); ) {
			var testLine = i.next();
			this.checkIntersectionWithSegments(testLine);
			if (this.hasIntersection) return null;
		}
	}
	checkIntersectionWithSegments(testLine) {
		var seq1 = testLine.getCoordinateSequence();
		for (var j = 1; j < seq1.size(); j++) {
			seq1.getCoordinate(j - 1, this.p0);
			seq1.getCoordinate(j, this.p1);
			if (this.rectIntersector.intersects(this.p0, this.p1)) {
				this.hasIntersection = true;
				return null;
			}
		}
	}
	getClass() {
		return RectangleIntersectsSegmentVisitor;
	}
}

function patch () {
	Geometry.hasNonEmptyElements = function(geometries) {
		for (var i = 0; i < geometries.length; i++) {
			if (!geometries[i].isEmpty()) {
				return true;
			}
		}
		return false;
	}
	Geometry.hasNullElements = function(array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === null) {
				return true;
			}
		}
		return false;
	}

	const mixin = {
		getFactory() {
			return this.factory;
		},
		getGeometryN(n) {
			return this;
		},
		getArea() {
			return 0.0;
		},
		union(...args) {
			if (args.length === 0) {
				let [] = args;
				return UnaryUnionOp$1.union(this);
			} else if (args.length === 1) {
				let [other] = args;
				if (this.isEmpty() || other.isEmpty()) {
					if (this.isEmpty() && other.isEmpty()) return OverlayOp$1.createEmptyResult(OverlayOp$1.UNION, this, other, this.factory);
					if (this.isEmpty()) return other.copy();
					if (other.isEmpty()) return this.copy();
				}
				this.checkNotGeometryCollection(this);
				this.checkNotGeometryCollection(other);
				return SnapIfNeededOverlayOp$1.overlayOp(this, other, OverlayOp$1.UNION);
			}
		},
		isValid() {
			return IsValidOp$1.isValid(this);
		},
		intersection(other) {
			if (this.isEmpty() || other.isEmpty()) return OverlayOp$1.createEmptyResult(OverlayOp$1.INTERSECTION, this, other, this.factory);
			if (this.isGeometryCollection()) {
				var g2 = other;
				return GeometryCollectionMapper$1.map(this, new (class {
					map(g) {
						return g.intersection(g2);
					}
				})());
			}
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(other);
			return SnapIfNeededOverlayOp$1.overlayOp(this, other, OverlayOp$1.INTERSECTION);
		},
		intersects(g) {
			if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal())) return false;
			if (this.isRectangle()) {
				return RectangleIntersects$1.intersects(this, g);
			}
			if (g.isRectangle()) {
				return RectangleIntersects$1.intersects(g, this);
			}
			return this.relate(g).isIntersects();
		},
		buffer(...args) {
			if (args.length === 1) {
				let [distance] = args;
				return BufferOp$1.bufferOp(this, distance);
			} else if (args.length === 2) {
				let [distance, quadrantSegments] = args;
				return BufferOp$1.bufferOp(this, distance, quadrantSegments);
			} else if (args.length === 3) {
				let [distance, quadrantSegments, endCapStyle] = args;
				return BufferOp$1.bufferOp(this, distance, quadrantSegments, endCapStyle);
			}
		},
		convexHull() {
			return new ConvexHull$1(this).getConvexHull();
		},
		relate(...args) {
			if (args.length === 1) {
				let [g] = args;
				this.checkNotGeometryCollection(this);
				this.checkNotGeometryCollection(g);
				return RelateOp$1.relate(this, g);
			} else if (args.length === 2) {
				let [g, intersectionPattern] = args;
				return this.relate(g).matches(intersectionPattern);
			}
		},
		getCentroid() {
			if (this.isEmpty()) return this.factory.createPoint();
			var centPt = Centroid$1.getCentroid(this);
			return this.createPointFromInternalCoord(centPt, this);
		},
		isEquivalentClass(other) {
			return this.getClass() === other.getClass();
		},
		getInteriorPoint() {
			if (this.isEmpty()) return this.factory.createPoint();
			var interiorPt = null;
			var dim = this.getDimension();
			if (dim === 0) {
				var intPt = new InteriorPointPoint$1(this);
				interiorPt = intPt.getInteriorPoint();
			} else if (dim === 1) {
				var intPt = new InteriorPointLine$1(this);
				interiorPt = intPt.getInteriorPoint();
			} else {
				var intPt = new InteriorPointArea$1(this);
				interiorPt = intPt.getInteriorPoint();
			}
			return this.createPointFromInternalCoord(interiorPt, this);
		},
		symDifference(other) {
			if (this.isEmpty() || other.isEmpty()) {
				if (this.isEmpty() && other.isEmpty()) return OverlayOp$1.createEmptyResult(OverlayOp$1.SYMDIFFERENCE, this, other, this.factory);
				if (this.isEmpty()) return other.copy();
				if (other.isEmpty()) return this.copy();
			}
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(other);
			return SnapIfNeededOverlayOp$1.overlayOp(this, other, OverlayOp$1.SYMDIFFERENCE);
		},
		createPointFromInternalCoord(coord, exemplar) {
			exemplar.getPrecisionModel().makePrecise(coord);
			return exemplar.getFactory().createPoint(coord);
		},
		disjoint(g) {
			return !this.intersects(g);
		},
		toText() {
			var writer = new WKTWriter();
			return writer.write(this);
		},
		contains(g) {
			if (!this.getEnvelopeInternal().contains(g.getEnvelopeInternal())) return false;
			if (this.isRectangle()) {
				return RectangleContains$1.contains(this, g);
			}
			return this.relate(g).isContains();
		},
		difference(other) {
			if (this.isEmpty()) return OverlayOp$1.createEmptyResult(OverlayOp$1.DIFFERENCE, this, other, this.factory);
			if (other.isEmpty()) return this.copy();
			this.checkNotGeometryCollection(this);
			this.checkNotGeometryCollection(other);
			return SnapIfNeededOverlayOp$1.overlayOp(this, other, OverlayOp$1.DIFFERENCE);
		},
		isSimple() {
			var op = new IsSimpleOp$1(this);
			return op.isSimple();
		},
		isWithinDistance(geom, distance) {
			var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
			if (envDist > distance) return false;
			return DistanceOp$1.isWithinDistance(this, geom, distance);
		},
		distance(g) {
			return DistanceOp$1.distance(this, g);
		}
	}

	for (const key in mixin) {
		Geometry.prototype[key] = mixin[key];
	};

}

(function () {
  patch()
})()

/**
 * @module
 */
var jsts = {
  version: `${process.env.npm_package_version} (${process.env.GITHASH})`,
  densify: {
    Densifier
  },
  dissolve: {
    LineDissolver
  },
  geom: {
    Coordinate,
    GeometryFactory,
    Geometry,
    Point,
    LineString,
    Polygon: MultiPolygon,
    GeometryCollection,
    MultiPoint,
    MultiLineString,
    MultiPolygon
  },
  /** @memberof module:jsts */
  io: {
    /**
     * @type {GeoJSONReader}
     * @memberof module:jsts.io
     */
    GeoJSONReader,
    /**
     * @type {GeoJSONWriter}
     * @memberof jsts.io
     */
    GeoJSONWriter,
    /**
     * @type {WKTReader}
     * @memberof jsts.io
     */
    WKTReader,
    /**
     * @type {WKTWriter}
     * @memberof jsts.io
     */
    WKTWriter,
    /**
     * @type {OL3Parser}
     * @memberof jsts.io
     */
    OL3Parser
  },
  operation: {
    BoundaryOp,
    IsSimpleOp: IsSimpleOp$1,
    buffer: {
      BufferOp: BufferOp$1
    },
    distance: {
      DistanceOp: DistanceOp$1
    },
    linemerge: {
      LineMerger
    },
    overlay: {
      OverlayOp: OverlayOp$1
    },
    polygonize: {
      Polygonizer
    },
    relate: {
      RelateOp: RelateOp$1
    },
    union: {
      CascadedPolygonUnion,
      UnaryUnionOp: UnaryUnionOp$1
    },
    valid: {
      IsValidOp: IsValidOp$1
    }
  },
  precision: {
    GeometryPrecisionReducer
  },
  simplify: {
    DouglasPeuckerSimplifier,
    TopologyPreservingSimplifier
  }
}

module.exports = jsts;