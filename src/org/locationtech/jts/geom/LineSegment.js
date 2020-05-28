import Coordinate from './Coordinate'
import Double from '../../../../java/lang/Double'
import Orientation from '../algorithm/Orientation'
import Intersection from '../algorithm/Intersection'
import Comparable from '../../../../java/lang/Comparable'
import RobustLineIntersector from '../algorithm/RobustLineIntersector'
import Serializable from '../../../../java/io/Serializable'
import Distance from '../algorithm/Distance'
export default class LineSegment {
  constructor() {
    LineSegment.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.p0 = null
    this.p1 = null
    if (arguments.length === 0) {
      LineSegment.constructor_.call(this, new Coordinate(), new Coordinate())
    } else if (arguments.length === 1) {
      const ls = arguments[0]
      LineSegment.constructor_.call(this, ls.p0, ls.p1)
    } else if (arguments.length === 2) {
      const p0 = arguments[0], p1 = arguments[1]
      this.p0 = p0
      this.p1 = p1
    } else if (arguments.length === 4) {
      const x0 = arguments[0], y0 = arguments[1], x1 = arguments[2], y1 = arguments[3]
      LineSegment.constructor_.call(this, new Coordinate(x0, y0), new Coordinate(x1, y1))
    }
  }
  static midPoint(p0, p1) {
    return new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
  }
  minX() {
    return Math.min(this.p0.x, this.p1.x)
  }
  orientationIndex() {
    if (arguments[0] instanceof LineSegment) {
      const seg = arguments[0]
      const orient0 = Orientation.index(this.p0, this.p1, seg.p0)
      const orient1 = Orientation.index(this.p0, this.p1, seg.p1)
      if (orient0 >= 0 && orient1 >= 0) return Math.max(orient0, orient1)
      if (orient0 <= 0 && orient1 <= 0) return Math.max(orient0, orient1)
      return 0
    } else if (arguments[0] instanceof Coordinate) {
      const p = arguments[0]
      return Orientation.index(this.p0, this.p1, p)
    }
  }
  toGeometry(geomFactory) {
    return geomFactory.createLineString([this.p0, this.p1])
  }
  isVertical() {
    return this.p0.x === this.p1.x
  }
  equals(o) {
    if (!(o instanceof LineSegment)) 
      return false
    
    const other = o
    return this.p0.equals(other.p0) && this.p1.equals(other.p1)
  }
  intersection(line) {
    const li = new RobustLineIntersector()
    li.computeIntersection(this.p0, this.p1, line.p0, line.p1)
    if (li.hasIntersection()) return li.getIntersection(0)
    return null
  }
  project() {
    if (arguments[0] instanceof Coordinate) {
      const p = arguments[0]
      if (p.equals(this.p0) || p.equals(this.p1)) return new Coordinate(p)
      const r = this.projectionFactor(p)
      const coord = new Coordinate()
      coord.x = this.p0.x + r * (this.p1.x - this.p0.x)
      coord.y = this.p0.y + r * (this.p1.y - this.p0.y)
      return coord
    } else if (arguments[0] instanceof LineSegment) {
      const seg = arguments[0]
      const pf0 = this.projectionFactor(seg.p0)
      const pf1 = this.projectionFactor(seg.p1)
      if (pf0 >= 1.0 && pf1 >= 1.0) return null
      if (pf0 <= 0.0 && pf1 <= 0.0) return null
      let newp0 = this.project(seg.p0)
      if (pf0 < 0.0) newp0 = this.p0
      if (pf0 > 1.0) newp0 = this.p1
      let newp1 = this.project(seg.p1)
      if (pf1 < 0.0) newp1 = this.p0
      if (pf1 > 1.0) newp1 = this.p1
      return new LineSegment(newp0, newp1)
    }
  }
  normalize() {
    if (this.p1.compareTo(this.p0) < 0) this.reverse()
  }
  angle() {
    return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x)
  }
  getCoordinate(i) {
    if (i === 0) return this.p0
    return this.p1
  }
  distancePerpendicular(p) {
    return Distance.pointToLinePerpendicular(p, this.p0, this.p1)
  }
  minY() {
    return Math.min(this.p0.y, this.p1.y)
  }
  midPoint() {
    return LineSegment.midPoint(this.p0, this.p1)
  }
  projectionFactor(p) {
    if (p.equals(this.p0)) return 0.0
    if (p.equals(this.p1)) return 1.0
    const dx = this.p1.x - this.p0.x
    const dy = this.p1.y - this.p0.y
    const len = dx * dx + dy * dy
    if (len <= 0.0) return Double.NaN
    const r = ((p.x - this.p0.x) * dx + (p.y - this.p0.y) * dy) / len
    return r
  }
  closestPoints(line) {
    const intPt = this.intersection(line)
    if (intPt !== null) 
      return [intPt, intPt]
    
    const closestPt = new Array(2).fill(null)
    let minDistance = Double.MAX_VALUE
    let dist = null
    const close00 = this.closestPoint(line.p0)
    minDistance = close00.distance(line.p0)
    closestPt[0] = close00
    closestPt[1] = line.p0
    const close01 = this.closestPoint(line.p1)
    dist = close01.distance(line.p1)
    if (dist < minDistance) {
      minDistance = dist
      closestPt[0] = close01
      closestPt[1] = line.p1
    }
    const close10 = line.closestPoint(this.p0)
    dist = close10.distance(this.p0)
    if (dist < minDistance) {
      minDistance = dist
      closestPt[0] = this.p0
      closestPt[1] = close10
    }
    const close11 = line.closestPoint(this.p1)
    dist = close11.distance(this.p1)
    if (dist < minDistance) {
      minDistance = dist
      closestPt[0] = this.p1
      closestPt[1] = close11
    }
    return closestPt
  }
  closestPoint(p) {
    const factor = this.projectionFactor(p)
    if (factor > 0 && factor < 1) 
      return this.project(p)
    
    const dist0 = this.p0.distance(p)
    const dist1 = this.p1.distance(p)
    if (dist0 < dist1) return this.p0
    return this.p1
  }
  maxX() {
    return Math.max(this.p0.x, this.p1.x)
  }
  getLength() {
    return this.p0.distance(this.p1)
  }
  compareTo(o) {
    const other = o
    const comp0 = this.p0.compareTo(other.p0)
    if (comp0 !== 0) return comp0
    return this.p1.compareTo(other.p1)
  }
  reverse() {
    const temp = this.p0
    this.p0 = this.p1
    this.p1 = temp
  }
  equalsTopo(other) {
    return this.p0.equals(other.p0) && this.p1.equals(other.p1) || this.p0.equals(other.p1) && this.p1.equals(other.p0)
  }
  lineIntersection(line) {
    const intPt = Intersection.intersection(this.p0, this.p1, line.p0, line.p1)
    return intPt
  }
  maxY() {
    return Math.max(this.p0.y, this.p1.y)
  }
  pointAlongOffset(segmentLengthFraction, offsetDistance) {
    const segx = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x)
    const segy = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y)
    const dx = this.p1.x - this.p0.x
    const dy = this.p1.y - this.p0.y
    const len = Math.sqrt(dx * dx + dy * dy)
    let ux = 0.0
    let uy = 0.0
    if (offsetDistance !== 0.0) {
      if (len <= 0.0) throw new IllegalStateException('Cannot compute offset from zero-length line segment')
      ux = offsetDistance * dx / len
      uy = offsetDistance * dy / len
    }
    const offsetx = segx - uy
    const offsety = segy + ux
    const coord = new Coordinate(offsetx, offsety)
    return coord
  }
  setCoordinates() {
    if (arguments.length === 1) {
      const ls = arguments[0]
      this.setCoordinates(ls.p0, ls.p1)
    } else if (arguments.length === 2) {
      const p0 = arguments[0], p1 = arguments[1]
      this.p0.x = p0.x
      this.p0.y = p0.y
      this.p1.x = p1.x
      this.p1.y = p1.y
    }
  }
  segmentFraction(inputPt) {
    let segFrac = this.projectionFactor(inputPt)
    if (segFrac < 0.0) segFrac = 0.0; else if (segFrac > 1.0 || Double.isNaN(segFrac)) segFrac = 1.0
    return segFrac
  }
  toString() {
    return 'LINESTRING( ' + this.p0.x + ' ' + this.p0.y + ', ' + this.p1.x + ' ' + this.p1.y + ')'
  }
  isHorizontal() {
    return this.p0.y === this.p1.y
  }
  reflect(p) {
    const A = this.p1.getY() - this.p0.getY()
    const B = this.p0.getX() - this.p1.getX()
    const C = this.p0.getY() * (this.p1.getX() - this.p0.getX()) - this.p0.getX() * (this.p1.getY() - this.p0.getY())
    const A2plusB2 = A * A + B * B
    const A2subB2 = A * A - B * B
    const x = p.getX()
    const y = p.getY()
    const rx = (-A2subB2 * x - 2 * A * B * y - 2 * A * C) / A2plusB2
    const ry = (A2subB2 * y - 2 * A * B * x - 2 * B * C) / A2plusB2
    return new Coordinate(rx, ry)
  }
  distance() {
    if (arguments[0] instanceof LineSegment) {
      const ls = arguments[0]
      return Distance.segmentToSegment(this.p0, this.p1, ls.p0, ls.p1)
    } else if (arguments[0] instanceof Coordinate) {
      const p = arguments[0]
      return Distance.pointToSegment(p, this.p0, this.p1)
    }
  }
  pointAlong(segmentLengthFraction) {
    const coord = new Coordinate()
    coord.x = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x)
    coord.y = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y)
    return coord
  }
  hashCode() {
    let bits0 = Double.doubleToLongBits(this.p0.x)
    bits0 ^= Double.doubleToLongBits(this.p0.y) * 31
    const hash0 = Math.trunc(bits0) ^ Math.trunc(bits0 >> 32)
    let bits1 = Double.doubleToLongBits(this.p1.x)
    bits1 ^= Double.doubleToLongBits(this.p1.y) * 31
    const hash1 = Math.trunc(bits1) ^ Math.trunc(bits1 >> 32)
    return hash0 ^ hash1
  }
  get interfaces_() {
    return [Comparable, Serializable]
  }
}
