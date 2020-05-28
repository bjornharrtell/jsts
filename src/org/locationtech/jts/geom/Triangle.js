import Coordinate from './Coordinate'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import DD from '../math/DD'
import Angle from '../algorithm/Angle'
import HCoordinate from '../algorithm/HCoordinate'
export default class Triangle {
  constructor() {
    Triangle.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.p0 = null
    this.p1 = null
    this.p2 = null
    const p0 = arguments[0], p1 = arguments[1], p2 = arguments[2]
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
  }
  static area(a, b, c) {
    return Math.abs(((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2)
  }
  static signedArea(a, b, c) {
    return ((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2
  }
  static det(m00, m01, m10, m11) {
    return m00 * m11 - m01 * m10
  }
  static interpolateZ(p, v0, v1, v2) {
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
  static longestSideLength(a, b, c) {
    const lenAB = a.distance(b)
    const lenBC = b.distance(c)
    const lenCA = c.distance(a)
    let maxLen = lenAB
    if (lenBC > maxLen) maxLen = lenBC
    if (lenCA > maxLen) maxLen = lenCA
    return maxLen
  }
  static circumcentreDD(a, b, c) {
    const ax = DD.valueOf(a.x).subtract(c.x)
    const ay = DD.valueOf(a.y).subtract(c.y)
    const bx = DD.valueOf(b.x).subtract(c.x)
    const by = DD.valueOf(b.y).subtract(c.y)
    const denom = DD.determinant(ax, ay, bx, by).multiply(2)
    const asqr = ax.sqr().add(ay.sqr())
    const bsqr = bx.sqr().add(by.sqr())
    const numx = DD.determinant(ay, asqr, by, bsqr)
    const numy = DD.determinant(ax, asqr, bx, bsqr)
    const ccx = DD.valueOf(c.x).subtract(numx.divide(denom)).doubleValue()
    const ccy = DD.valueOf(c.y).add(numy.divide(denom)).doubleValue()
    return new Coordinate(ccx, ccy)
  }
  static isAcute(a, b, c) {
    if (!Angle.isAcute(a, b, c)) return false
    if (!Angle.isAcute(b, c, a)) return false
    if (!Angle.isAcute(c, a, b)) return false
    return true
  }
  static circumcentre(a, b, c) {
    const cx = c.x
    const cy = c.y
    const ax = a.x - cx
    const ay = a.y - cy
    const bx = b.x - cx
    const by = b.y - cy
    const denom = 2 * Triangle.det(ax, ay, bx, by)
    const numx = Triangle.det(ay, ax * ax + ay * ay, by, bx * bx + by * by)
    const numy = Triangle.det(ax, ax * ax + ay * ay, bx, bx * bx + by * by)
    const ccx = cx - numx / denom
    const ccy = cy + numy / denom
    return new Coordinate(ccx, ccy)
  }
  static perpendicularBisector(a, b) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const l1 = new HCoordinate(a.x + dx / 2.0, a.y + dy / 2.0, 1.0)
    const l2 = new HCoordinate(a.x - dy + dx / 2.0, a.y + dx + dy / 2.0, 1.0)
    return new HCoordinate(l1, l2)
  }
  static angleBisector(a, b, c) {
    const len0 = b.distance(a)
    const len2 = b.distance(c)
    const frac = len0 / (len0 + len2)
    const dx = c.x - a.x
    const dy = c.y - a.y
    const splitPt = new Coordinate(a.x + frac * dx, a.y + frac * dy)
    return splitPt
  }
  static area3D(a, b, c) {
    const ux = b.x - a.x
    const uy = b.y - a.y
    const uz = b.getZ() - a.getZ()
    const vx = c.x - a.x
    const vy = c.y - a.y
    const vz = c.getZ() - a.getZ()
    const crossx = uy * vz - uz * vy
    const crossy = uz * vx - ux * vz
    const crossz = ux * vy - uy * vx
    const absSq = crossx * crossx + crossy * crossy + crossz * crossz
    const area3D = Math.sqrt(absSq) / 2
    return area3D
  }
  static centroid(a, b, c) {
    const x = (a.x + b.x + c.x) / 3
    const y = (a.y + b.y + c.y) / 3
    return new Coordinate(x, y)
  }
  static inCentre(a, b, c) {
    const len0 = b.distance(c)
    const len1 = a.distance(c)
    const len2 = a.distance(b)
    const circum = len0 + len1 + len2
    const inCentreX = (len0 * a.x + len1 * b.x + len2 * c.x) / circum
    const inCentreY = (len0 * a.y + len1 * b.y + len2 * c.y) / circum
    return new Coordinate(inCentreX, inCentreY)
  }
  area() {
    return Triangle.area(this.p0, this.p1, this.p2)
  }
  signedArea() {
    return Triangle.signedArea(this.p0, this.p1, this.p2)
  }
  interpolateZ(p) {
    if (p === null) throw new IllegalArgumentException('Supplied point is null.')
    return Triangle.interpolateZ(p, this.p0, this.p1, this.p2)
  }
  longestSideLength() {
    return Triangle.longestSideLength(this.p0, this.p1, this.p2)
  }
  isAcute() {
    return Triangle.isAcute(this.p0, this.p1, this.p2)
  }
  circumcentre() {
    return Triangle.circumcentre(this.p0, this.p1, this.p2)
  }
  area3D() {
    return Triangle.area3D(this.p0, this.p1, this.p2)
  }
  centroid() {
    return Triangle.centroid(this.p0, this.p1, this.p2)
  }
  inCentre() {
    return Triangle.inCentre(this.p0, this.p1, this.p2)
  }
}
