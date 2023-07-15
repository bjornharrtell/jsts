import Dimension from '../../geom/Dimension.js'
import Edge from './Edge.js'
export default class EdgeSourceInfo {
  constructor() {
    EdgeSourceInfo.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._index = null
    this._dim = -999
    this._isHole = false
    this._depthDelta = 0
    if (arguments.length === 1) {
      const index = arguments[0]
      this._index = index
      this._dim = Dimension.L
    } else if (arguments.length === 3) {
      const index = arguments[0], depthDelta = arguments[1], isHole = arguments[2]
      this._index = index
      this._dim = Dimension.A
      this._depthDelta = depthDelta
      this._isHole = isHole
    }
  }
  getDimension() {
    return this._dim
  }
  isHole() {
    return this._isHole
  }
  getDepthDelta() {
    return this._depthDelta
  }
  toString() {
    return Edge.infoString(this._index, this._dim, this._isHole, this._depthDelta)
  }
  getIndex() {
    return this._index
  }
}
