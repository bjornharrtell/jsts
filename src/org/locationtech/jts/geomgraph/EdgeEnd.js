import Orientation from '../algorithm/Orientation'
import Comparable from '../../../../java/lang/Comparable'
import Quadrant from './Quadrant'
import Assert from '../util/Assert'
export default class EdgeEnd {
  constructor() {
    EdgeEnd.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edge = null
    this._label = null
    this._node = null
    this._p0 = null
    this._p1 = null
    this._dx = null
    this._dy = null
    this._quadrant = null
    if (arguments.length === 1) {
      const edge = arguments[0]
      this._edge = edge
    } else if (arguments.length === 3) {
      const edge = arguments[0], p0 = arguments[1], p1 = arguments[2]
      EdgeEnd.constructor_.call(this, edge, p0, p1, null)
    } else if (arguments.length === 4) {
      const edge = arguments[0], p0 = arguments[1], p1 = arguments[2], label = arguments[3]
      EdgeEnd.constructor_.call(this, edge)
      this.init(p0, p1)
      this._label = label
    }
  }
  compareDirection(e) {
    if (this._dx === e._dx && this._dy === e._dy) return 0
    if (this._quadrant > e._quadrant) return 1
    if (this._quadrant < e._quadrant) return -1
    return Orientation.index(e._p0, e._p1, this._p1)
  }
  getDy() {
    return this._dy
  }
  getCoordinate() {
    return this._p0
  }
  setNode(node) {
    this._node = node
  }
  print(out) {
    const angle = Math.atan2(this._dy, this._dx)
    const className = this.getClass().getName()
    const lastDotPos = className.lastIndexOf('.')
    const name = className.substring(lastDotPos + 1)
    out.print('  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + angle + '   ' + this._label)
  }
  compareTo(obj) {
    const e = obj
    return this.compareDirection(e)
  }
  getDirectedCoordinate() {
    return this._p1
  }
  getDx() {
    return this._dx
  }
  getLabel() {
    return this._label
  }
  getEdge() {
    return this._edge
  }
  getQuadrant() {
    return this._quadrant
  }
  getNode() {
    return this._node
  }
  toString() {
    const angle = Math.atan2(this._dy, this._dx)
    const className = this.getClass().getName()
    const lastDotPos = className.lastIndexOf('.')
    const name = className.substring(lastDotPos + 1)
    return '  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + angle + '   ' + this._label
  }
  computeLabel(boundaryNodeRule) {}
  init(p0, p1) {
    this._p0 = p0
    this._p1 = p1
    this._dx = p1.x - p0.x
    this._dy = p1.y - p0.y
    this._quadrant = Quadrant.quadrant(this._dx, this._dy)
    Assert.isTrue(!(this._dx === 0 && this._dy === 0), 'EdgeEnd with identical endpoints found')
  }
  get interfaces_() {
    return [Comparable]
  }
}
