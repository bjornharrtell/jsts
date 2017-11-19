import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
export default function CommonBits() {
	this._isFirst = true;
	this._commonMantissaBitsCount = 53;
	this._commonBits = 0;
	this._commonSignExp = null;
}
extend(CommonBits.prototype, {
	getCommon: function () {
		return Double.longBitsToDouble(this._commonBits);
	},
	add: function (num) {
		var numBits = Double.doubleToLongBits(num);
		if (this._isFirst) {
			this._commonBits = numBits;
			this._commonSignExp = CommonBits.signExpBits(this._commonBits);
			this._isFirst = false;
			return null;
		}
		var numSignExp = CommonBits.signExpBits(numBits);
		if (numSignExp !== this._commonSignExp) {
			this._commonBits = 0;
			return null;
		}
		this._commonMantissaBitsCount = CommonBits.numCommonMostSigMantissaBits(this._commonBits, numBits);
		this._commonBits = CommonBits.zeroLowerBits(this._commonBits, 64 - (12 + this._commonMantissaBitsCount));
	},
	toString: function () {
		if (arguments.length === 1 && arguments[0] instanceof long) {
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
