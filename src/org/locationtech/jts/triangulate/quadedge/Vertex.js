import NotRepresentableException from '../../algorithm/NotRepresentableException'
import Coordinate from '../../geom/Coordinate'
import TrianglePredicate from './TrianglePredicate'
import System from '../../../../../java/lang/System'
import HCoordinate from '../../algorithm/HCoordinate'
export default class Vertex {
  constructor() {
    Vertex.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._p = null
    if (arguments.length === 1) {
      const _p = arguments[0]
      this._p = new Coordinate(_p)
    } else if (arguments.length === 2) {
      const _x = arguments[0], _y = arguments[1]
      this._p = new Coordinate(_x, _y)
    } else if (arguments.length === 3) {
      const _x = arguments[0], _y = arguments[1], _z = arguments[2]
      this._p = new Coordinate(_x, _y, _z)
    }
  }
  static interpolateZ() {
    if (arguments.length === 3) {
      const p = arguments[0], p0 = arguments[1], p1 = arguments[2]
      const segLen = p0.distance(p1)
      const ptLen = p.distance(p0)
      const dz = p1.getZ() - p0.getZ()
      const pz = p0.getZ() + dz * (ptLen / segLen)
      return pz
    } else if (arguments.length === 4) {
      const p = arguments[0], v0 = arguments[1], v1 = arguments[2], v2 = arguments[3]
      const x0 = v0.x
      const y0 = v0.y
      const a = v1.x - x0
      const b = v2.x - x0
      const c = v1.y - y0
      const d = v2.y - y0
      const det = a * d - b * c
      const dx = p.x - x0
      const dy = p.y - y0
      const t = (d * dx - b * dy) / det
      const u = (-c * dx + a * dy) / det
      const z = v0.getZ() + t * (v1.getZ() - v0.getZ()) + u * (v2.getZ() - v0.getZ())
      return z
    }
  }
  circleCenter(b, c) {
    const a = new Vertex(this.getX(), this.getY())
    const cab = this.bisector(a, b)
    const cbc = this.bisector(b, c)
    const hcc = new HCoordinate(cab, cbc)
    let cc = null
    try {
      cc = new Vertex(hcc.getX(), hcc.getY())
    } catch (nre) {
      if (nre instanceof NotRepresentableException) {
        System.err.println('a: ' + a + '  b: ' + b + '  c: ' + c)
        System.err.println(nre)
      } else {
        throw nre
      }
    } finally {}
    return cc
  }
  dot(v) {
    return this._p.x * v.getX() + this._p.y * v.getY()
  }
  magn() {
    return Math.sqrt(this._p.x * this._p.x + this._p.y * this._p.y)
  }
  getZ() {
    return this._p.getZ()
  }
  bisector(a, b) {
    const dx = b.getX() - a.getX()
    const dy = b.getY() - a.getY()
    const l1 = new HCoordinate(a.getX() + dx / 2.0, a.getY() + dy / 2.0, 1.0)
    const l2 = new HCoordinate(a.getX() - dy + dx / 2.0, a.getY() + dx + dy / 2.0, 1.0)
    return new HCoordinate(l1, l2)
  }
  equals() {
    if (arguments.length === 1) {
      const _x = arguments[0]
      if (this._p.x === _x.getX() && this._p.y === _x.getY()) 
        return true
      else 
        return false
      
    } else if (arguments.length === 2) {
      const _x = arguments[0], tolerance = arguments[1]
      if (this._p.distance(_x.getCoordinate()) < tolerance) 
        return true
      else 
        return false
      
    }
  }
  getCoordinate() {
    return this._p
  }
  isInCircle(a, b, c) {
    return TrianglePredicate.isInCircleRobust(a._p, b._p, c._p, this._p)
  }
  interpolateZValue(v0, v1, v2) {
    const x0 = v0.getX()
    const y0 = v0.getY()
    const a = v1.getX() - x0
    const b = v2.getX() - x0
    const c = v1.getY() - y0
    const d = v2.getY() - y0
    const det = a * d - b * c
    const dx = this.getX() - x0
    const dy = this.getY() - y0
    const t = (d * dx - b * dy) / det
    const u = (-c * dx + a * dy) / det
    const z = v0.getZ() + t * (v1.getZ() - v0.getZ()) + u * (v2.getZ() - v0.getZ())
    return z
  }
  midPoint(a) {
    const xm = (this._p.x + a.getX()) / 2.0
    const ym = (this._p.y + a.getY()) / 2.0
    const zm = (this._p.getZ() + a.getZ()) / 2.0
    return new Vertex(xm, ym, zm)
  }
  rightOf(e) {
    return this.isCCW(e.dest(), e.orig())
  }
  isCCW(b, c) {
    return (b._p.x - this._p.x) * (c._p.y - this._p.y) - (b._p.y - this._p.y) * (c._p.x - this._p.x) > 0
  }
  getX() {
    return this._p.x
  }
  crossProduct(v) {
    return this._p.x * v.getY() - this._p.y * v.getX()
  }
  setZ(_z) {
    this._p.setZ(_z)
  }
  times(c) {
    return new Vertex(c * this._p.x, c * this._p.y)
  }
  cross() {
    return new Vertex(this._p.y, -this._p.x)
  }
  leftOf(e) {
    return this.isCCW(e.orig(), e.dest())
  }
  toString() {
    return 'POINT (' + this._p.x + ' ' + this._p.y + ')'
  }
  sub(v) {
    return new Vertex(this._p.x - v.getX(), this._p.y - v.getY())
  }
  getY() {
    return this._p.y
  }
  classify(p0, p1) {
    const p2 = this
    const a = p1.sub(p0)
    const b = p2.sub(p0)
    const sa = a.crossProduct(b)
    if (sa > 0.0) return Vertex.LEFT
    if (sa < 0.0) return Vertex.RIGHT
    if (a.getX() * b.getX() < 0.0 || a.getY() * b.getY() < 0.0) return Vertex.BEHIND
    if (a.magn() < b.magn()) return Vertex.BEYOND
    if (p0.equals(p2)) return Vertex.ORIGIN
    if (p1.equals(p2)) return Vertex.DESTINATION
    return Vertex.BETWEEN
  }
  sum(v) {
    return new Vertex(this._p.x + v.getX(), this._p.y + v.getY())
  }
  distance(v1, v2) {
    return Math.sqrt(Math.pow(v2.getX() - v1.getX(), 2.0) + Math.pow(v2.getY() - v1.getY(), 2.0))
  }
  circumRadiusRatio(b, c) {
    const x = this.circleCenter(b, c)
    const radius = this.distance(x, b)
    let edgeLength = this.distance(this, b)
    let el = this.distance(b, c)
    if (el < edgeLength) 
      edgeLength = el
    
    el = this.distance(c, this)
    if (el < edgeLength) 
      edgeLength = el
    
    return radius / edgeLength
  }
}
Vertex.LEFT = 0
Vertex.RIGHT = 1
Vertex.BEYOND = 2
Vertex.BEHIND = 3
Vertex.BETWEEN = 4
Vertex.ORIGIN = 5
Vertex.DESTINATION = 6
