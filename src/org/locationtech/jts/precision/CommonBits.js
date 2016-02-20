import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
export default function CommonBits() {
	this.isFirst = true;
	this.commonMantissaBitsCount = 53;
	this.commonBits = 0;
	this.commonSignExp = null;
}
extend(CommonBits.prototype, {
	getCommon: function () {
		return Double.longBitsToDouble(this.commonBits);
	},
	add: function (num) {
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
	},
	toString: function () {
		if (arguments.length === 1) {
			let bits = arguments[0];
			var x = Double.longBitsToDouble(bits);
			var numStr = Long.toBinaryString(bits);
			var padStr = "0000000000000000000000000000000000000000000000000000000000000000" + numStr;
			var bitStr = padStr.substring(padStr.length - 64);
			var str = bitStr.substring(0, 1) + "  " + bitStr.substring(1, 12) + "(exp) " + bitStr.substring(12) + " [ " + x + " ]";
			return str;
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CommonBits;
	}
});
CommonBits.getBit = function (bits, i) {
	var mask = 1 << i;
	return (bits & mask) !== 0 ? 1 : 0;
};
CommonBits.signExpBits = function (num) {
	return num >> 52;
};
CommonBits.zeroLowerBits = function (bits, nBits) {
	var invMask = (1 << nBits) - 1;
	var mask = ~invMask;
	var zeroed = bits & mask;
	return zeroed;
};
CommonBits.numCommonMostSigMantissaBits = function (num1, num2) {
	var count = 0;
	for (var i = 52; i >= 0; i--) {
		if (CommonBits.getBit(num1, i) !== CommonBits.getBit(num2, i)) return count;
		count++;
	}
	return 52;
};

