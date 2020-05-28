import StringBuffer from '../../../../../java/lang/StringBuffer'
import Coordinate from '../../geom/Coordinate'
import GeometryLocation from './GeometryLocation'
import Double from '../../../../../java/lang/Double'
import LineSegment from '../../geom/LineSegment'
import Envelope from '../../geom/Envelope'
import Distance from '../../algorithm/Distance'
export default class FacetSequence {
  constructor() {
    FacetSequence.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = null
    this._pts = null
    this._start = null
    this._end = null
    if (arguments.length === 2) {
      const pts = arguments[0], start = arguments[1]
      this._pts = pts
      this._start = start
      this._end = start + 1
    } else if (arguments.length === 3) {
      const pts = arguments[0], start = arguments[1], end = arguments[2]
      this._pts = pts
      this._start = start
      this._end = end
    } else if (arguments.length === 4) {
      const geom = arguments[0], pts = arguments[1], start = arguments[2], end = arguments[3]
      this._geom = geom
      this._pts = pts
      this._start = start
      this._end = end
    }
  }
  computeDistanceLineLine(facetSeq, locs) {
    let minDistance = Double.MAX_VALUE
    for (let i = this._start; i < this._end - 1; i++) {
      const p0 = this._pts.getCoordinate(i)
      const p1 = this._pts.getCoordinate(i + 1)
      for (let j = facetSeq._start; j < facetSeq._end - 1; j++) {
        const q0 = facetSeq._pts.getCoordinate(j)
        const q1 = facetSeq._pts.getCoordinate(j + 1)
        const dist = Distance.segmentToSegment(p0, p1, q0, q1)
        if (dist < minDistance) {
          minDistance = dist
          if (locs !== null) this.updateNearestLocationsLineLine(i, p0, p1, facetSeq, j, q0, q1, locs)
          if (minDistance <= 0.0) return minDistance
        }
      }
    }
    return minDistance
  }
  updateNearestLocationsPointLine(pt, facetSeq, i, q0, q1, locs) {
    locs[0] = new GeometryLocation(this._geom, this._start, new Coordinate(pt))
    const seg = new LineSegment(q0, q1)
    const segClosestPoint = seg.closestPoint(pt)
    locs[1] = new GeometryLocation(facetSeq._geom, i, new Coordinate(segClosestPoint))
  }
  size() {
    return this._end - this._start
  }
  getCoordinate(index) {
    return this._pts.getCoordinate(this._start + index)
  }
  nearestLocations(facetSeq) {
    const isPoint = this.isPoint()
    const isPointOther = facetSeq.isPoint()
    const locs = new Array(2).fill(null)
    if (isPoint && isPointOther) {
      const pt = this._pts.getCoordinate(this._start)
      const seqPt = facetSeq._pts.getCoordinate(facetSeq._start)
      locs[0] = new GeometryLocation(this._geom, this._start, new Coordinate(pt))
      locs[1] = new GeometryLocation(facetSeq._geom, facetSeq._start, new Coordinate(seqPt))
    } else if (isPoint) {
      const pt = this._pts.getCoordinate(this._start)
      this.computeDistancePointLine(pt, facetSeq, locs)
    } else if (isPointOther) {
      const seqPt = facetSeq._pts.getCoordinate(facetSeq._start)
      this.computeDistancePointLine(seqPt, this, locs)
      const tmp = locs[0]
      locs[0] = locs[1]
      locs[1] = tmp
    } else {
      this.computeDistanceLineLine(facetSeq, locs)
    }
    return locs
  }
  getEnvelope() {
    const env = new Envelope()
    for (let i = this._start; i < this._end; i++) 
      env.expandToInclude(this._pts.getX(i), this._pts.getY(i))
    
    return env
  }
  updateNearestLocationsLineLine(i, p0, p1, facetSeq, j, q0, q1, locs) {
    const seg0 = new LineSegment(p0, p1)
    const seg1 = new LineSegment(q0, q1)
    const closestPt = seg0.closestPoints(seg1)
    locs[0] = new GeometryLocation(this._geom, i, new Coordinate(closestPt[0]))
    locs[1] = new GeometryLocation(facetSeq._geom, j, new Coordinate(closestPt[1]))
  }
  toString() {
    const buf = new StringBuffer()
    buf.append('LINESTRING ( ')
    const p = new Coordinate()
    for (let i = this._start; i < this._end; i++) {
      if (i > this._start) buf.append(', ')
      this._pts.getCoordinate(i, p)
      buf.append(p.x + ' ' + p.y)
    }
    buf.append(' )')
    return buf.toString()
  }
  computeDistancePointLine(pt, facetSeq, locs) {
    let minDistance = Double.MAX_VALUE
    for (let i = facetSeq._start; i < facetSeq._end - 1; i++) {
      const q0 = facetSeq._pts.getCoordinate(i)
      const q1 = facetSeq._pts.getCoordinate(i + 1)
      const dist = Distance.pointToSegment(pt, q0, q1)
      if (dist < minDistance) {
        minDistance = dist
        if (locs !== null) this.updateNearestLocationsPointLine(pt, facetSeq, i, q0, q1, locs)
        if (minDistance <= 0.0) return minDistance
      }
    }
    return minDistance
  }
  isPoint() {
    return this._end - this._start === 1
  }
  distance(facetSeq) {
    const isPoint = this.isPoint()
    const isPointOther = facetSeq.isPoint()
    let distance = null
    if (isPoint && isPointOther) {
      const pt = this._pts.getCoordinate(this._start)
      const seqPt = facetSeq._pts.getCoordinate(facetSeq._start)
      distance = pt.distance(seqPt)
    } else if (isPoint) {
      const pt = this._pts.getCoordinate(this._start)
      distance = this.computeDistancePointLine(pt, facetSeq, null)
    } else if (isPointOther) {
      const seqPt = facetSeq._pts.getCoordinate(facetSeq._start)
      distance = this.computeDistancePointLine(seqPt, this, null)
    } else {
      distance = this.computeDistanceLineLine(facetSeq, null)
    }
    return distance
  }
}
