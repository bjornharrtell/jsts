import Coordinate from '../geom/Coordinate'
import Double from '../../../../java/lang/Double'
import CoordinateArrays from '../geom/CoordinateArrays'
import Angle from './Angle'
import Assert from '../util/Assert'
import Triangle from '../geom/Triangle'
export default class MinimumBoundingCircle {
  constructor() {
    MinimumBoundingCircle.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._input = null
    this._extremalPts = null
    this._centre = null
    this._radius = 0.0
    const geom = arguments[0]
    this._input = geom
  }
  static farthestPoints(pts) {
    const dist01 = pts[0].distance(pts[1])
    const dist12 = pts[1].distance(pts[2])
    const dist20 = pts[2].distance(pts[0])
    if (dist01 >= dist12 && dist01 >= dist20) 
      return [pts[0], pts[1]]
    
    if (dist12 >= dist01 && dist12 >= dist20) 
      return [pts[1], pts[2]]
    
    return [pts[2], pts[0]]
  }
  static pointWitMinAngleWithX(pts, P) {
    let minSin = Double.MAX_VALUE
    let minAngPt = null
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      if (p === P) continue
      const dx = p.x - P.x
      let dy = p.y - P.y
      if (dy < 0) dy = -dy
      const len = Math.sqrt(dx * dx + dy * dy)
      const sin = dy / len
      if (sin < minSin) {
        minSin = sin
        minAngPt = p
      }
    }
    return minAngPt
  }
  static lowestPoint(pts) {
    let min = pts[0]
    for (let i = 1; i < pts.length; i++) 
      if (pts[i].y < min.y) min = pts[i]
    
    return min
  }
  static pointWithMinAngleWithSegment(pts, P, Q) {
    let minAng = Double.MAX_VALUE
    let minAngPt = null
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      if (p === P) continue
      if (p === Q) continue
      const ang = Angle.angleBetween(P, p, Q)
      if (ang < minAng) {
        minAng = ang
        minAngPt = p
      }
    }
    return minAngPt
  }
  getRadius() {
    this.compute()
    return this._radius
  }
  getDiameter() {
    this.compute()
    switch (this._extremalPts.length) {
    case 0:
      return this._input.getFactory().createLineString()
    case 1:
      return this._input.getFactory().createPoint(this._centre)
    }
    const p0 = this._extremalPts[0]
    const p1 = this._extremalPts[1]
    return this._input.getFactory().createLineString([p0, p1])
  }
  getExtremalPoints() {
    this.compute()
    return this._extremalPts
  }
  computeCirclePoints() {
    if (this._input.isEmpty()) {
      this._extremalPts = new Array(0).fill(null)
      return null
    }
    if (this._input.getNumPoints() === 1) {
      const pts = this._input.getCoordinates()
      this._extremalPts = [new Coordinate(pts[0])]
      return null
    }
    const convexHull = this._input.convexHull()
    const hullPts = convexHull.getCoordinates()
    let pts = hullPts
    if (hullPts[0].equals2D(hullPts[hullPts.length - 1])) {
      pts = new Array(hullPts.length - 1).fill(null)
      CoordinateArrays.copyDeep(hullPts, 0, pts, 0, hullPts.length - 1)
    }
    if (pts.length <= 2) {
      this._extremalPts = CoordinateArrays.copyDeep(pts)
      return null
    }
    let P = MinimumBoundingCircle.lowestPoint(pts)
    let Q = MinimumBoundingCircle.pointWitMinAngleWithX(pts, P)
    for (let i = 0; i < pts.length; i++) {
      const R = MinimumBoundingCircle.pointWithMinAngleWithSegment(pts, P, Q)
      if (Angle.isObtuse(P, R, Q)) {
        this._extremalPts = [new Coordinate(P), new Coordinate(Q)]
        return null
      }
      if (Angle.isObtuse(R, P, Q)) {
        P = R
        continue
      }
      if (Angle.isObtuse(R, Q, P)) {
        Q = R
        continue
      }
      this._extremalPts = [new Coordinate(P), new Coordinate(Q), new Coordinate(R)]
      return null
    }
    Assert.shouldNeverReachHere('Logic failure in Minimum Bounding Circle algorithm!')
  }
  compute() {
    if (this._extremalPts !== null) return null
    this.computeCirclePoints()
    this.computeCentre()
    if (this._centre !== null) this._radius = this._centre.distance(this._extremalPts[0])
  }
  getCircle() {
    this.compute()
    if (this._centre === null) return this._input.getFactory().createPolygon()
    const centrePoint = this._input.getFactory().createPoint(this._centre)
    if (this._radius === 0.0) return centrePoint
    return centrePoint.buffer(this._radius)
  }
  getCentre() {
    this.compute()
    return this._centre
  }
  getMaximumDiameter() {
    this.compute()
    switch (this._extremalPts.length) {
    case 0:
      return this._input.getFactory().createLineString()
    case 1:
      return this._input.getFactory().createPoint(this._centre)
    case 2:
      return this._input.getFactory().createLineString([this._extremalPts[0], this._extremalPts[1]])
    default:
      const maxDiameter = MinimumBoundingCircle.farthestPoints(this._extremalPts)
      return this._input.getFactory().createLineString(maxDiameter)
    }
  }
  computeCentre() {
    switch (this._extremalPts.length) {
    case 0:
      this._centre = null
      break
    case 1:
      this._centre = this._extremalPts[0]
      break
    case 2:
      this._centre = new Coordinate((this._extremalPts[0].x + this._extremalPts[1].x) / 2.0, (this._extremalPts[0].y + this._extremalPts[1].y) / 2.0)
      break
    case 3:
      this._centre = Triangle.circumcentre(this._extremalPts[0], this._extremalPts[1], this._extremalPts[2])
      break
    }
  }
}
