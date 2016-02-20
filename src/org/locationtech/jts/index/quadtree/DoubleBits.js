import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
export default function DoubleBits() {
	this.x = null;
	this.xBits = null;
	let x = arguments[0];
	this.x = x;
	this.xBits = Double.doubleToLongBits(x);
}
extend(DoubleBits.prototype, {
	numCommonMantissaBits: function (db) {
		for (var i = 0; i < 52; i++) {
			var bitIndex = i + 12;
			if (this.getBit(i) !== db.getBit(i)) return i;
		}
		return 52;
	},
	getExponent: function () {
		return this.biasedExponent() - DoubleBits.EXPONENT_BIAS;
	},
	biasedExponent: function () {
		var signExp = Math.trunc(this.xBits >> 52);
		var exp = signExp & 0x07ff;
		return exp;
	},
	getDouble: function () {
		return Double.longBitsToDouble(this.xBits);
	},
	zeroLowerBits: function (nBits) {
		var invMask = (1 << nBits) - 1;
		var mask = ~invMask;
		this.xBits &= mask;
	},
	toString: function () {
		var numStr = Long.toBinaryString(this.xBits);
		var zero64 = "0000000000000000000000000000000000000000000000000000000000000000";
		var padStr = zero64 + numStr;
		var bitStr = padStr.substring(padStr.length - 64);
		var str = bitStr.substring(0, 1) + "  " + bitStr.substring(1, 12) + "(" + this.getExponent() + ") " + bitStr.substring(12) + " [ " + this.x + " ]";
		return str;
	},
	getBit: function (i) {
		var mask = 1 << i;
		return (this.xBits & mask) !== 0 ? 1 : 0;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DoubleBits;
	}
});
DoubleBits.exponent = function (d) {
	var db = new DoubleBits(d);
	return db.getExponent();
};
DoubleBits.toBinaryString = function (d) {
	var db = new DoubleBits(d);
	return db.toString();
};
DoubleBits.powerOf2 = function (exp) {
	if (exp > 1023 || exp < -1022) throw new IllegalArgumentException("Exponent out of bounds");
	var expBias = exp + DoubleBits.EXPONENT_BIAS;
	var bits = expBias << 52;
	return Double.longBitsToDouble(bits);
};
DoubleBits.truncateToPowerOfTwo = function (d) {
	var db = new DoubleBits(d);
	db.zeroLowerBits(52);
	return db.getDouble();
};
DoubleBits.maximumCommonMantissa = function (d1, d2) {
	if (d1 === 0.0 || d2 === 0.0) return 0.0;
	var db1 = new DoubleBits(d1);
	var db2 = new DoubleBits(d2);
	if (db1.getExponent() !== db2.getExponent()) return 0.0;
	var maxCommon = db1.numCommonMantissaBits(db2);
	db1.zeroLowerBits(64 - (12 + maxCommon));
	return db1.getDouble();
};
DoubleBits.EXPONENT_BIAS = 1023;

