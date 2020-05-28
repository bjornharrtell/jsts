import DoubleBits from './DoubleBits'
export default class IntervalSize {
  static isZeroWidth(min, max) {
    const width = max - min
    if (width === 0.0) return true
    const maxAbs = Math.max(Math.abs(min), Math.abs(max))
    const scaledInterval = width / maxAbs
    const level = DoubleBits.exponent(scaledInterval)
    return level <= IntervalSize.MIN_BINARY_EXPONENT
  }
}
IntervalSize.MIN_BINARY_EXPONENT = -50
