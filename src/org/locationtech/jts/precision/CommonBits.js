import Double from '../../../../java/lang/Double';
import Long from '../../../../java/lang/Long';
export default class CommonBits {
	constructor() {
		this._isFirst = true;
		this._commonMantissaBitsCount = 53;
		this._commonBits = new Long();
		this._commonSignExp = null;
	}
	getCommon() {
		return Double.longBitsToDouble(this._commonBits);
	}
	add(num) {
		var numBits = Double.doubleToLongBits(num);
		if (this._isFirst) {
			this._commonBits = numBits;
			this._commonSignExp = CommonBits.signExpBits(this._commonBits);
			this._isFirst = false;
			return null;
		}
		var numSignExp = CommonBits.signExpBits(numBits);
		if (numSignExp !== this._commonSignExp) {
			this._commonBits.high = 0 | 0;
			this._commonBits.low = 0 | 0;
			return null;
		}
		this._commonMantissaBitsCount = CommonBits.numCommonMostSigMantissaBits(this._commonBits, numBits);
		this._commonBits = CommonBits.zeroLowerBits(this._commonBits, 64 - (12 + this._commonMantissaBitsCount));
	}
	toString() {
		if (arguments.length === 1) {
			let bits = arguments[0];
			var x = Double.longBitsToDouble(bits);
			var numStr = Long.toBinaryString(bits);
			var padStr = "0000000000000000000000000000000000000000000000000000000000000000" + numStr;
			var bitStr = padStr.substring(padStr.length - 64);
			var str = bitStr.substring(0, 1) + "  " + bitStr.substring(1, 12) + "(exp) " + bitStr.substring(12) + " [ " + x + " ]";
			return str;
		}
	}
	getClass() {
		return CommonBits;
	}
	get interfaces_() {
		return [];
	}
	static getBit(bits, i) {
		var mask = (1 << (i % 32));
		if (i < 32) {
			return (bits.low & mask) != 0 ? 1 : 0;
		}
		return (bits.high & mask) != 0 ? 1 : 0;
	}
	static signExpBits(num) {
		return num.high >>> 20;
	}
	static zeroLowerBits(bits, nBits) {
		var prop = 'low';
		if (nBits > 32) {
			bits.low = 0 | 0;
			nBits %= 32;
			prop = 'high';
		}
		if (nBits > 0) {
			var mask = (nBits < 32) ? (~((1 << nBits) - 1)) : 0;
			bits[prop] &= mask;
		}
		return bits;
	}
	static numCommonMostSigMantissaBits (num1, num2) {
		var count = 0;
		for (var i = 52; i >= 0; i--) {
			if (CommonBits.getBit(num1, i) !== CommonBits.getBit(num2, i)) return count;
			count++;
		}
		return 52;
	}
}

