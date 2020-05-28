import Coordinate from '../../geom/Coordinate'
import DoubleBits from './DoubleBits'
import Envelope from '../../geom/Envelope'
export default class Key {
  constructor() {
    Key.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pt = new Coordinate()
    this._level = 0
    this._env = null
    const itemEnv = arguments[0]
    this.computeKey(itemEnv)
  }
  static computeQuadLevel(env) {
    const dx = env.getWidth()
    const dy = env.getHeight()
    const dMax = dx > dy ? dx : dy
    const level = DoubleBits.exponent(dMax) + 1
    return level
  }
  getLevel() {
    return this._level
  }
  computeKey() {
    if (arguments.length === 1) {
      const itemEnv = arguments[0]
      this._level = Key.computeQuadLevel(itemEnv)
      this._env = new Envelope()
      this.computeKey(this._level, itemEnv)
      while (!this._env.contains(itemEnv)) {
        this._level += 1
        this.computeKey(this._level, itemEnv)
      }
    } else if (arguments.length === 2) {
      const level = arguments[0], itemEnv = arguments[1]
      const quadSize = DoubleBits.powerOf2(level)
      this._pt.x = Math.floor(itemEnv.getMinX() / quadSize) * quadSize
      this._pt.y = Math.floor(itemEnv.getMinY() / quadSize) * quadSize
      this._env.init(this._pt.x, this._pt.x + quadSize, this._pt.y, this._pt.y + quadSize)
    }
  }
  getEnvelope() {
    return this._env
  }
  getCentre() {
    return new Coordinate((this._env.getMinX() + this._env.getMaxX()) / 2, (this._env.getMinY() + this._env.getMaxY()) / 2)
  }
  getPoint() {
    return this._pt
  }
}
