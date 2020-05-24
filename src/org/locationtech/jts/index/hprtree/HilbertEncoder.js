import HilbertCode from '../../shape/fractal/HilbertCode'
export default class HilbertEncoder {
  constructor () {
    HilbertEncoder.constructor_.apply(this, arguments)
  }

  encode (env) {
    const midx = env.getWidth() / 2 + env.getMinX()
    const x = Math.trunc((midx - this._minx) / this._strideX)
    const midy = env.getHeight() / 2 + env.getMinY()
    const y = Math.trunc((midy - this._miny) / this._strideY)
    return HilbertCode.encode(this._level, x, y)
  }

  getClass () {
    return HilbertEncoder
  }

  get interfaces_ () {
    return []
  }
}
HilbertEncoder.constructor_ = function () {
  this._level = null
  this._minx = null
  this._miny = null
  this._strideX = null
  this._strideY = null
  const level = arguments[0]; const extent = arguments[1]
  this._level = level
  const hside = Math.trunc(Math.pow(2, level)) - 1
  this._minx = extent.getMinX()
  const extentX = extent.getWidth()
  this._strideX = extentX / hside
  this._miny = extent.getMinX()
  const extentY = extent.getHeight()
  this._strideY = extentY / hside
}
