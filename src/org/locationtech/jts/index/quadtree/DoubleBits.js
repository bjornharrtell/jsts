import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
export default class DoubleBits {
	constructor(...args) {
		this.x = null;
		this.xBits = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [x] = args;
					this.x = x;
					this.xBits = Double.doubleToLongBits(x);
				})(...args);
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
		if (exp > 1023 || exp < -1022) throw new IllegalArgumentException("Exponent out of bounds");
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

