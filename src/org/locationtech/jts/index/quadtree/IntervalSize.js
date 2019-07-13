import DoubleBits from './DoubleBits'
export default class IntervalSize {
  constructor () {
    IntervalSize.constructor_.apply(this, arguments)
  }

  static isZeroWidth (min, max) {
    const width = max - min
    if (width === 0.0) return true
    const maxAbs = Math.max(Math.abs(min), Math.abs(max))
    const scaledInterval = width / maxAbs
    const level = DoubleBits.exponent(scaledInterval)
    return level <= IntervalSize.MIN_BINARY_EXPONENT
  }

  getClass () {
    return IntervalSize
  }

  get interfaces_ () {
    return []
  }
}
IntervalSize.constructor_ = function () {}
IntervalSize.MIN_BINARY_EXPONENT = -50
