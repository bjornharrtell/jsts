import Coordinate from '../geom/Coordinate'
import Polygon from '../geom/Polygon'
import Double from '../../../../java/lang/Double'
import LineSegment from '../geom/LineSegment'
import ConvexHull from './ConvexHull'
export default class MinimumDiameter {
  constructor() {
    MinimumDiameter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._isConvex = null
    this._convexHullPts = null
    this._minBaseSeg = new LineSegment()
    this._minWidthPt = null
    this._minPtIndex = null
    this._minWidth = 0.0
    if (arguments.length === 1) {
      const inputGeom = arguments[0]
      MinimumDiameter.constructor_.call(this, inputGeom, false)
    } else if (arguments.length === 2) {
      const inputGeom = arguments[0], isConvex = arguments[1]
      this._inputGeom = inputGeom
      this._isConvex = isConvex
    }
  }
  static nextIndex(pts, index) {
    index++
    if (index >= pts.length) index = 0
    return index
  }
  static computeC(a, b, p) {
    return a * p.y - b * p.x
  }
  static getMinimumDiameter(geom) {
    return new MinimumDiameter(geom).getDiameter()
  }
  static getMinimumRectangle(geom) {
    return new MinimumDiameter(geom).getMinimumRectangle()
  }
  static computeSegmentForLine(a, b, c) {
    let p0 = null
    let p1 = null
    if (Math.abs(b) > Math.abs(a)) {
      p0 = new Coordinate(0.0, c / b)
      p1 = new Coordinate(1.0, c / b - a / b)
    } else {
      p0 = new Coordinate(c / a, 0.0)
      p1 = new Coordinate(c / a - b / a, 1.0)
    }
    return new LineSegment(p0, p1)
  }
  getWidthCoordinate() {
    this.computeMinimumDiameter()
    return this._minWidthPt
  }
  getSupportingSegment() {
    this.computeMinimumDiameter()
    return this._inputGeom.getFactory().createLineString([this._minBaseSeg.p0, this._minBaseSeg.p1])
  }
  getDiameter() {
    this.computeMinimumDiameter()
    if (this._minWidthPt === null) return this._inputGeom.getFactory().createLineString()
    const basePt = this._minBaseSeg.project(this._minWidthPt)
    return this._inputGeom.getFactory().createLineString([basePt, this._minWidthPt])
  }
  computeWidthConvex(convexGeom) {
    if (convexGeom instanceof Polygon) this._convexHullPts = convexGeom.getExteriorRing().getCoordinates(); else this._convexHullPts = convexGeom.getCoordinates()
    if (this._convexHullPts.length === 0) {
      this._minWidth = 0.0
      this._minWidthPt = null
      this._minBaseSeg = null
    } else if (this._convexHullPts.length === 1) {
      this._minWidth = 0.0
      this._minWidthPt = this._convexHullPts[0]
      this._minBaseSeg.p0 = this._convexHullPts[0]
      this._minBaseSeg.p1 = this._convexHullPts[0]
    } else if (this._convexHullPts.length === 2 || this._convexHullPts.length === 3) {
      this._minWidth = 0.0
      this._minWidthPt = this._convexHullPts[0]
      this._minBaseSeg.p0 = this._convexHullPts[0]
      this._minBaseSeg.p1 = this._convexHullPts[1]
    } else {
      this.computeConvexRingMinDiameter(this._convexHullPts)
    }
  }
  computeConvexRingMinDiameter(pts) {
    this._minWidth = Double.MAX_VALUE
    let currMaxIndex = 1
    const seg = new LineSegment()
    for (let i = 0; i < pts.length - 1; i++) {
      seg.p0 = pts[i]
      seg.p1 = pts[i + 1]
      currMaxIndex = this.findMaxPerpDistance(pts, seg, currMaxIndex)
    }
  }
  computeMinimumDiameter() {
    if (this._minWidthPt !== null) return null
    if (this._isConvex) {
      this.computeWidthConvex(this._inputGeom)
    } else {
      const convexGeom = new ConvexHull(this._inputGeom).getConvexHull()
      this.computeWidthConvex(convexGeom)
    }
  }
  getLength() {
    this.computeMinimumDiameter()
    return this._minWidth
  }
  findMaxPerpDistance(pts, seg, startIndex) {
    let maxPerpDistance = seg.distancePerpendicular(pts[startIndex])
    let nextPerpDistance = maxPerpDistance
    let maxIndex = startIndex
    let nextIndex = maxIndex
    while (nextPerpDistance >= maxPerpDistance) {
      maxPerpDistance = nextPerpDistance
      maxIndex = nextIndex
      nextIndex = MinimumDiameter.nextIndex(pts, maxIndex)
      nextPerpDistance = seg.distancePerpendicular(pts[nextIndex])
    }
    if (maxPerpDistance < this._minWidth) {
      this._minPtIndex = maxIndex
      this._minWidth = maxPerpDistance
      this._minWidthPt = pts[this._minPtIndex]
      this._minBaseSeg = new LineSegment(seg)
    }
    return maxIndex
  }
  getMinimumRectangle() {
    this.computeMinimumDiameter()
    if (this._minWidth === 0.0) {
      if (this._minBaseSeg.p0.equals2D(this._minBaseSeg.p1)) 
        return this._inputGeom.getFactory().createPoint(this._minBaseSeg.p0)
      
      return this._minBaseSeg.toGeometry(this._inputGeom.getFactory())
    }
    const dx = this._minBaseSeg.p1.x - this._minBaseSeg.p0.x
    const dy = this._minBaseSeg.p1.y - this._minBaseSeg.p0.y
    let minPara = Double.MAX_VALUE
    let maxPara = -Double.MAX_VALUE
    let minPerp = Double.MAX_VALUE
    let maxPerp = -Double.MAX_VALUE
    for (let i = 0; i < this._convexHullPts.length; i++) {
      const paraC = MinimumDiameter.computeC(dx, dy, this._convexHullPts[i])
      if (paraC > maxPara) maxPara = paraC
      if (paraC < minPara) minPara = paraC
      const perpC = MinimumDiameter.computeC(-dy, dx, this._convexHullPts[i])
      if (perpC > maxPerp) maxPerp = perpC
      if (perpC < minPerp) minPerp = perpC
    }
    const maxPerpLine = MinimumDiameter.computeSegmentForLine(-dx, -dy, maxPerp)
    const minPerpLine = MinimumDiameter.computeSegmentForLine(-dx, -dy, minPerp)
    const maxParaLine = MinimumDiameter.computeSegmentForLine(-dy, dx, maxPara)
    const minParaLine = MinimumDiameter.computeSegmentForLine(-dy, dx, minPara)
    const p0 = maxParaLine.lineIntersection(maxPerpLine)
    const p1 = minParaLine.lineIntersection(maxPerpLine)
    const p2 = minParaLine.lineIntersection(minPerpLine)
    const p3 = maxParaLine.lineIntersection(minPerpLine)
    const shell = this._inputGeom.getFactory().createLinearRing([p0, p1, p2, p3, p0])
    return this._inputGeom.getFactory().createPolygon(shell)
  }
}
