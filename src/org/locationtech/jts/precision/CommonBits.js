import Double from '../../../../java/lang/Double';
export default class CommonBits {
	constructor(...args) {
		(() => {
			this.isFirst = true;
			this.commonMantissaBitsCount = 53;
			this.commonBits = 0;
			this.commonSignExp = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

