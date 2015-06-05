/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

 
/**
 * Determines the maximum number of common most-significant
 * bits in the mantissa of one or numbers.
 * Can be used to compute the double-precision number which
 * is represented by the common bits.
 * If there are no common bits, the number computed is 0.0.
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.precision.CommonBits = function() {

    /**
     * @type {boolean}
     * @private
     */
    this.isFirst = true;

    /**
     * @type {number}
     * @private
     */
    this.commonMantissaBitsCount = 53;

    /**
     * @type {number}
     * @private
     */
    this.commonBits = 0;

    /**
     * @type {number}
     * @private
     */
    this.commonSignExp;
};

/**
 * Computes the bit pattern for the sign and exponent of a
 * double-precision number.
 *
 * @param {number} num
 * @return {number} the bit pattern for the sign and exponent
 */
jsts.precision.CommonBits.signExpBits = function(num) {
    return num >> 52;
};

/**
 * This computes the number of common most-significant bits in the mantissas
 * of two double-precision numbers.
 * It does not count the hidden bit, which is always 1.
 * It does not determine whether the numbers have the same exponent - if they do
 * not, the value computed by this function is meaningless.
 *
 * @param {number} num1 the first number
 * @param {number} num2 the second number
 * @return {number} the number of common most-significant mantissa bits
 */
jsts.precision.CommonBits.numCommonMostSigMantissaBits = function(num1, num2) {
    var count = 0;
    for (var i = 52; i >= 0; i--) {
        if (jsts.precision.CommonBits.getBit(num1, i) != jsts.precision.CommonBits.getBit(num2, i)) {
            return count;
        }
        count++;
    }
    return 52;
};

/**
 * Zeroes the lower n bits of a bitstring.
 *
 * @param {number} bits the bitstring to alter
 * @param {number} nBits
 * @return {number} the zeroed bitstring
 */
jsts.precision.CommonBits.zeroLowerBits = function(bits, nBits) {
    var invMask = (1 << nBits) - 1;
    var mask = ~ invMask;
    var zeroed = bits & mask;
    return zeroed;
};

/**
 * Extracts the i'th bit of a bitstring.
 *
 * @param {number} bits the bitstring to extract from
 * @param {number} i the bit to extract
 * @return {number} the value of the extracted bit
 */
jsts.precision.CommonBits.getBit = function(bits, i) {
    var mask = (1 << i);
    return (bits & mask) !== 0 ? 1 : 0;
};

/**
 * @param {number} num
 */
jsts.precision.CommonBits.prototype.add = function(num) {
    if (this.isFirst) {
        this.commonBits = num;
        this.commonSignExp = jsts.precision.CommonBits.signExpBits(this.commonBits);
        this.isFirst = false;
        return;
    }

    var numSignExp = jsts.precision.CommonBits.signExpBits(num);
    if (numSignExp !== this.commonSignExp) {
        this.commonBits = 0;
        return;
    }

    this.commonMantissaBitsCount = jsts.precision.CommonBits.numCommonMostSigMantissaBits(this.commonBits, num);
    this.commonBits = jsts.precision.CommonBits.zeroLowerBits(this.commonBits, 64 - (12 + this.commonMantissaBitsCount));
};

/**
 * @return {number}
 */
jsts.precision.CommonBits.prototype.getCommon = function() {
    return this.commonBits;
};

/**
 * A representation of the Double bits formatted for easy readability
 * @param {number} bits
 * @return {string}
 */
jsts.precision.CommonBits.prototype.toString = function(bits) {
    var x = bits;
    var numStr = (bits >>> 0).toString(2);
    var padStr = "0000000000000000000000000000000000000000000000000000000000000000" + numStr;
    var bitStr = padStr.substring(padStr.length - 64);
    var str = bitStr.substring(0, 1) + "  "
        + bitStr.substring(1, 12) + "(exp) "
        + bitStr.substring(12)
        + " [ " + x + " ]";
    return str;
};
