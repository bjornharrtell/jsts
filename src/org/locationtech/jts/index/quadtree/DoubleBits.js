export default function DoubleBits() { }
DoubleBits.exponent = function(d) {
  return CVTFWD(64, d) - 1023
}
DoubleBits.powerOf2 = function(exp) {
  return Math.pow(2, exp)
}

/**
 * Calculates the exponent of the bit-pattern for a number. Uses code from:
 * http://www.merlyn.demon.co.uk/js-exact.htm
 *
 * @param {Number}
 *          NumW 32 or 64 to denote the number of bits.
 * @param {Number}
 *          Qty the number to calculate the bit pattern for.
 * @return {Number} The integer value of the exponent.
 * @private
 */
function CVTFWD(NumW, Qty) {
  let Sign
  let Expo
  let Mant
  let Bin
  const Inf = {
    32: {
      d: 0x7F,
      c: 0x80,
      b: 0,
      a: 0
    },
    64: {
      d: 0x7FF0,
      c: 0,
      b: 0,
      a: 0
    }
  }
  const ExW = {
    32: 8,
    64: 11
  }[NumW]

  if (!Bin) {
    Sign = Qty < 0 || 1 / Qty < 0 // OK for +-0
    if (!isFinite(Qty)) {
      Bin = Inf[NumW]
      if (Sign) Bin.d += 1 << (NumW / 4 - 1)

      Expo = Math.pow(2, ExW) - 1
      Mant = 0
    }
  }

  if (!Bin) {
    Expo = {
      32: 127,
      64: 1023
    }[NumW]
    Mant = Math.abs(Qty)
    while (Mant >= 2) {
      Expo++
      Mant /= 2
    }
    while (Mant < 1 && Expo > 0) {
      Expo--
      Mant *= 2
    }
    if (Expo <= 0) Mant /= 2

    if (NumW === 32 && Expo > 254) {
      Bin = {
        d: Sign ? 0xFF : 0x7F,
        c: 0x80,
        b: 0,
        a: 0
      }
      Expo = Math.pow(2, ExW) - 1
      Mant = 0
    }
  }

  return Expo
}
