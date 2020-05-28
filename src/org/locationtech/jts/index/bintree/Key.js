import Interval from './Interval'
import DoubleBits from '../quadtree/DoubleBits'
export default class Key {
  constructor() {
    Key.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pt = 0.0
    this._level = 0
    this._interval = null
    const interval = arguments[0]
    this.computeKey(interval)
  }
  static computeLevel(interval) {
    const dx = interval.getWidth()
    const level = DoubleBits.exponent(dx) + 1
    return level
  }
  getInterval() {
    return this._interval
  }
  getLevel() {
    return this._level
  }
  computeKey(itemInterval) {
    this._level = Key.computeLevel(itemInterval)
    this._interval = new Interval()
    this.computeInterval(this._level, itemInterval)
    while (!this._interval.contains(itemInterval)) {
      this._level += 1
      this.computeInterval(this._level, itemInterval)
    }
  }
  computeInterval(level, itemInterval) {
    const size = DoubleBits.powerOf2(level)
    this._pt = Math.floor(itemInterval.getMin() / size) * size
    this._interval.init(this._pt, this._pt + size)
  }
  getPoint() {
    return this._pt
  }
}
