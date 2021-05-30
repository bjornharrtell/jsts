import Long from './Long'

export default function Double() { }

Double.NaN = NaN
Double.isNaN = n => Number.isNaN(n)
Double.isInfinite = n => !Number.isFinite(n)
Double.MAX_VALUE = Number.MAX_VALUE
Double.POSITIVE_INFINITY = Number.POSITIVE_INFINITY
Double.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY

if (typeof Float64Array === 'function' &&
  typeof Int32Array === 'function')
// Simple and fast conversion between double and long bits
// using TypedArrays and ArrayViewBuffers.

  (function() {
    const EXP_BIT_MASK = 0x7ff00000
    const SIGNIF_BIT_MASK = 0xFFFFF
    const f64buf = new Float64Array(1)
    const i32buf = new Int32Array(f64buf.buffer)
    Double.doubleToLongBits = function(value) {
      f64buf[0] = value
      let low = i32buf[0] | 0
      let high = i32buf[1] | 0
      // Check for NaN based on values of bit fields, maximum
      // exponent and nonzero significand.
      if (((high & EXP_BIT_MASK) === EXP_BIT_MASK) &&
        ((high & SIGNIF_BIT_MASK) !== 0) &&
        (low !== 0)) {
        low = 0 | 0
        high = 0x7ff80000 | 0
      }
      return new Long(high, low)
    }
    Double.longBitsToDouble = function(bits) {
      i32buf[0] = bits.low
      i32buf[1] = bits.high
      return f64buf[0]
    }
  })()
else
// More complex and slower fallback implementation using
// math and the divide-by-two and multiply-by-two algorithms.

  (function() {
    const BIAS = 1023
    const log2 = Math.log2
    const floor = Math.floor
    const pow = Math.pow
    const MAX_REL_BITS_INTEGER = (function() {
      for (let i = 53; i > 0; i--) {
        const bits = pow(2, i) - 1
        if (floor(log2(bits)) + 1 === i) return bits
      }
      return 0
    })()
    Double.doubleToLongBits = function(value) {
      let x, y, f, bits, skip
      let sign, exp, high, low

      // Get the sign bit and absolute value.
      if (value < 0 || 1 / value === Number.NEGATIVE_INFINITY) {
        sign = (1 << 31)
        value = (-value)
      } else {
        sign = 0
      }

      // Handle some special values.
      if (value === 0) {
        // Handle zeros (+/-0).
        low = 0 | 0
        high = sign // exponent: 00..00, significand: 00..00
        return new Long(high, low)
      }

      if (value === Infinity) {
        // Handle infinity (only positive values for value possible).
        low = 0 | 0
        high = sign | 0x7ff00000 // exponent: 11..11, significand: 00..00
        return new Long(high, low)
      }

      if (value !== value) { // eslint-disable-line
        // Handle NaNs (boiled down to only one distinct NaN).
        low = 0 | 0
        high = 0x7ff80000 // exponent: 11..11, significand: 10..00
        return new Long(high, low)
      }

      // Preinitialize variables, that are not neccessarily set by
      // the algorithm.
      bits = 0
      low = 0 | 0

      // Get the (always positive) integer part of value.
      x = floor(value)

      // Process the integer part if it's greater than 1. Zero requires
      // no bits at all, 1 represents the implicit (hidden) leading bit,
      // which must not be written as well.
      if (x > 1)
      // If we can reliably determine the number of bits required for
      // the integer part,

        if (x <= MAX_REL_BITS_INTEGER) {
          // get the number of bits required to represent it minus 1
          bits = floor(log2(x)) /* + 1 - 1 */
          // and simply copy/shift the integer bits into low and high.
          // That's much faster than the divide-by-two algorithm (saves
          // up to ~60%).
          // We always need to mask out the most significant bit, which
          // is the implicit (aka hidden) bit.
          if (bits <= 20) {
            // The simple case in which the integer fits into the
            // lower 20 bits of the high word is worth to be handled
            // separately (saves ~25%).
            low = 0 | 0
            high = (x << (20 - bits)) & 0xfffff
          } else {
            // Here, the integer part is split into low and high.
            // Since its value may require more than 32 bits, we
            // cannot use bitwise operators (which implicitly cast
            // to Int32), but use arithmetic operators % and / to
            // get low and high parts. The uppper 20 bits go to high,
            // the remaining bits (in f) to low.
            f = bits - 20
            // Like (1 << f) but safe with even more than 32 bits.
            y = pow(2, f)
            low = (x % y) << (32 - f)
            high = (x / y) & 0xfffff
          }
        } else {
          // For greater values, we must use the much slower divide-by-two
          // algorithm. Bits are generated from right to left, that is from
          // least to most significant bit. For each bit, we left-shift both
          // low and high by one and carry bit #0 from high to #31 in low.
          // The next bit is then copied into bit #19 in high, the leftmost
          // bit of the double's significand.

          // Preserve x for later user, so work with f.
          f = x
          low = 0 | 0
          for (;;) {
            y = f / 2
            f = floor(y)
            if (f === 0)
            // We just found the most signigicant (1-)bit, which
            // is the implicit bit and so, not stored in the double
            // value. So, it's time to leave the loop.
              break

            // Count this bit, shift low and carry bit #0 from high.
            bits++
            low >>>= 1
            low |= (high & 0x1) << 31
            // Shift high.
            high >>>= 1
            if (y !== f)
            // Copy the new bit into bit #19 in high (only required if 1).
              high |= 0x80000
          }
        }

      // Bias the exponent.
      exp = bits + BIAS

      // If the integer part is zero, we've not yet seen the implicit
      // leading bit. Variable skip is later used while processing the
      // fractional part (if any).
      skip = (x === 0)

      // Get fraction only into x.
      x = value - x

      // If some significand bits are still left to be filled and
      // the fractional part is not zero, convert the fraction using
      // the multiply-by-2 algorithm.
      if (bits < 52 && x !== 0) {
        // Initialize 'buffer' f, into which newly created bits get
        // shifted from right to left.
        f = 0

        for (;;) {
          y = x * 2
          if (y >= 1) {
            // This is a new 1-bit. Add and count this bit, if not
            // prohibited by skip.
            x = y - 1
            if (!skip) {
              f <<= 1
              f |= 1
              bits++
            } else {
              // Otherwise, decrement the exponent and unset
              // skip, so that all following bits get written.
              exp--
              skip = false
            }
          } else {
            // This is a new 0-bit. Add and count this bit, if not
            // prohibited by skip.
            x = y
            if (!skip) {
              f <<= 1
              bits++
            } else if (--exp === 0) {
              // Otherwise we've just decremented the exponent. If the
              // biased exponent is zero now (-1023), we process a
              // subnormal number, which has no impled leading 1-bit.
              // So, count this 0-bit and unset skip to write out
              // all the following bits.
              bits++
              skip = false
            }
          }
          if (bits === 20) {
            // When 20 bits have been created in total, we're done with
            // the high word. Copy the bits from 'buffer' f into high
            // and reset 'buffer' f. Following bits will end up in the
            // low word.
            high |= f
            f = 0
          } else if (bits === 52) {
            // When 52 bits have been created in total, we're done with
            // low word as well. Copy the bits from 'buffer' f into low
            // and exit the loop.
            low |= f
            break
          }
          if (y === 1) {
            // When y is exactly 1, there is no remainder and the process
            // is complete (the number is finite). Copy the bits from
            // 'buffer' f into either low or high and exit the loop.
            if (bits < 20)
              high |= (f << (20 - bits))
            else if (bits < 52) low |= (f << (52 - bits))

            break
          }
        }
      }

      // Copy/shift the exponent and sign bits into the high word.
      high |= (exp << 20)
      high |= sign

      return new Long(high, low)
    }
    Double.longBitsToDouble = function(bits) {
      let i
      let x, exp, fract
      const high = bits.high
      const low = bits.low

      // Extract the sign.
      const sign = (high & (1 << 31)) ? -1 : 1

      // Extract the unbiased exponent.
      exp = ((high & 0x7ff00000) >> 20) - BIAS

      // Calculate the fraction from left to right. Start
      // off with the 20 lower bits from the high word.
      fract = 0
      x = (1 << 19)
      for (i = 1; i <= 20; i++) {
        if (high & x) fract += pow(2, -i)

        x >>>= 1
      }
      // Continue with all 32 bits from the low word.
      x = (1 << 31)
      for (i = 21; i <= 52; i++) {
        if (low & x) fract += pow(2, -i)

        x >>>= 1
      }

      // Handle special values.
      // Check for zero and subnormal values.
      if (exp === -BIAS) {
        if (fract === 0)
        // +/-1.0 * 0.0 => +/-0.0
          return sign * 0

        exp = -1022
      } else if (exp === BIAS + 1) { // Check for +/-Infinity or NaN.
        if (fract === 0)
        // +/-1.0 / 0.0 => +/-Infinity
          return sign / 0

        return NaN
      } else { // Nothing special? Seems to be a normal number.
        // Add the implicit leading bit (1*2^0).
        fract += 1
      }

      return sign * fract * pow(2, exp)
    }
  })()
