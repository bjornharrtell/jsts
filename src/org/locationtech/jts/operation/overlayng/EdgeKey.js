import OrdinateFormat from '../../io/OrdinateFormat.js'
import Double from '../../../../../java/lang/Double.js'
import Comparable from '../../../../../java/lang/Comparable.js'
export default class EdgeKey {
  constructor() {
    EdgeKey.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._p0x = null
    this._p0y = null
    this._p1x = null
    this._p1y = null
    const edge = arguments[0]
    this.initPoints(edge)
  }
  static create(edge) {
    return new EdgeKey(edge)
  }
  static hashCode() {
    if (arguments.length === 1 && typeof arguments[0] === 'number') {
      const x = arguments[0]
      const f = Double.doubleToLongBits(x)
      return Math.trunc(f ^ f >>> 32)
    }
  }
  format(x, y) {
    return OrdinateFormat.DEFAULT.format(x) + ' ' + OrdinateFormat.DEFAULT.format(y)
  }
  equals(o) {
    if (!(o instanceof EdgeKey)) 
      return false
    
    const ek = o
    return this._p0x === ek._p0x && this._p0y === ek._p0y && this._p1x === ek._p1x && this._p1y === ek._p1y
  }
  initPoints(edge) {
    const direction = edge.direction()
    if (direction) {
      this.init(edge.getCoordinate(0), edge.getCoordinate(1))
    } else {
      const len = edge.size()
      this.init(edge.getCoordinate(len - 1), edge.getCoordinate(len - 2))
    }
  }
  compareTo(ek) {
    if (this._p0x < ek._p0x) return -1
    if (this._p0x > ek._p0x) return 1
    if (this._p0y < ek._p0y) return -1
    if (this._p0y > ek._p0y) return 1
    if (this._p1x < ek._p1x) return -1
    if (this._p1x > ek._p1x) return 1
    if (this._p1y < ek._p1y) return -1
    if (this._p1y > ek._p1y) return 1
    return 0
  }
  toString() {
    return 'EdgeKey(' + this.format(this._p0x, this._p0y) + ', ' + this.format(this._p1x, this._p1y) + ')'
  }
  init(p0, p1) {
    this._p0x = p0.getX()
    this._p0y = p0.getY()
    this._p1x = p1.getX()
    this._p1y = p1.getY()
  }
  hashCode() {
    let result = 17
    result = 37 * result + EdgeKey.hashCode(this._p0x)
    result = 37 * result + EdgeKey.hashCode(this._p0y)
    result = 37 * result + EdgeKey.hashCode(this._p1x)
    result = 37 * result + EdgeKey.hashCode(this._p1y)
    return result
  }
  get interfaces_() {
    return [Comparable]
  }
}
