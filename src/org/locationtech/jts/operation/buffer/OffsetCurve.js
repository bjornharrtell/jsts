import BufferParameters from './BufferParameters.js'
import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction.js'
import LineString from '../../geom/LineString.js'
import CoordinateList from '../../geom/CoordinateList.js'
import MonotoneChain from '../../index/chain/MonotoneChain.js'
import Point from '../../geom/Point.js'
import Polygon from '../../geom/Polygon.js'
import GeometryMapper from '../../geom/util/GeometryMapper.js'
import SegmentMCIndex from './SegmentMCIndex.js'
import OffsetCurveBuilder from './OffsetCurveBuilder.js'
import LinearRing from '../../geom/LinearRing.js'
import BufferOp from './BufferOp.js'
import LineSegment from '../../geom/LineSegment.js'
import Envelope from '../../geom/Envelope.js'
import Distance from '../../algorithm/Distance.js'
export default class OffsetCurve {
  constructor() {
    OffsetCurve.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._distance = null
    this._bufferParams = null
    this._matchDistance = null
    this._geomFactory = null
    if (arguments.length === 2) {
      const geom = arguments[0], distance = arguments[1]
      OffsetCurve.constructor_.call(this, geom, distance, null)
    } else if (arguments.length === 3) {
      const geom = arguments[0], distance = arguments[1], bufParams = arguments[2]
      this._inputGeom = geom
      this._distance = distance
      this._matchDistance = Math.abs(distance) / OffsetCurve.NEARNESS_FACTOR
      this._geomFactory = this._inputGeom.getFactory()
      this._bufferParams = new BufferParameters()
      if (bufParams !== null) {
        this._bufferParams.setQuadrantSegments(bufParams.getQuadrantSegments())
        this._bufferParams.setJoinStyle(bufParams.getJoinStyle())
        this._bufferParams.setMitreLimit(bufParams.getMitreLimit())
      }
    }
  }
  static subsegmentMatchFrac(p0, p1, seg0, seg1, matchDistance) {
    if (matchDistance < Distance.pointToSegment(p0, seg0, seg1)) return -1
    if (matchDistance < Distance.pointToSegment(p1, seg0, seg1)) return -1
    const seg = new LineSegment(seg0, seg1)
    return seg.segmentFraction(p0)
  }
  static extractMaxAreaPolygon(geom) {
    if (geom.getNumGeometries() === 1) return geom
    let maxArea = 0
    let maxPoly = null
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const poly = geom.getGeometryN(i)
      const area = poly.getArea()
      if (maxPoly === null || area > maxArea) {
        maxPoly = poly
        maxArea = area
      }
    }
    return maxPoly
  }
  static extractSection(ring, startIndex, isExtracted) {
    if (startIndex < 0) return new Array(0).fill(null)
    const coordList = new CoordinateList()
    let i = startIndex
    do {
      coordList.add(ring[i], false)
      if (!isExtracted[i]) 
        break
      
      i = OffsetCurve.next(i, ring.length - 1)
    } while (i !== startIndex)
    if (isExtracted[i]) 
      coordList.add(ring[i], false)
    
    if (coordList.size() === 1) return new Array(0).fill(null)
    return coordList.toCoordinateArray()
  }
  static next(i, size) {
    i += 1
    return i < size ? i : 0
  }
  static getBufferOriented(geom, distance, bufParams) {
    const buffer = BufferOp.bufferOp(geom, Math.abs(distance), bufParams)
    let bufferPoly = OffsetCurve.extractMaxAreaPolygon(buffer)
    if (distance < 0) 
      bufferPoly = bufferPoly.reverse()
    
    return bufferPoly
  }
  static extractLongestHole(poly) {
    let largestHole = null
    let maxLen = -1
    for (let i = 0; i < poly.getNumInteriorRing(); i++) {
      const hole = poly.getInteriorRingN(i)
      const len = hole.getLength()
      if (len > maxLen) {
        largestHole = hole
        maxLen = len
      }
    }
    return largestHole
  }
  static rawOffset() {
    if (arguments.length === 2) {
      const geom = arguments[0], distance = arguments[1]
      return OffsetCurve.rawOffset(geom, distance, new BufferParameters())
    } else if (arguments.length === 3) {
      const geom = arguments[0], distance = arguments[1], bufParams = arguments[2]
      const ocb = new OffsetCurveBuilder(geom.getFactory().getPrecisionModel(), bufParams)
      const pts = ocb.getOffsetCurve(geom.getCoordinates(), distance)
      return pts
    }
  }
  static getCurve() {
    if (arguments.length === 2) {
      const geom = arguments[0], distance = arguments[1]
      const oc = new OffsetCurve(geom, distance)
      return oc.getCurve()
    } else if (arguments.length === 5) {
      const geom = arguments[0], distance = arguments[1], quadSegs = arguments[2], joinStyle = arguments[3], mitreLimit = arguments[4]
      const bufferParams = new BufferParameters()
      if (quadSegs >= 0) bufferParams.setQuadrantSegments(quadSegs)
      if (joinStyle >= 0) bufferParams.setJoinStyle(joinStyle)
      if (mitreLimit >= 0) bufferParams.setMitreLimit(mitreLimit)
      const oc = new OffsetCurve(geom, distance, bufferParams)
      return oc.getCurve()
    }
  }
  getCurve() {
    return GeometryMapper.flatMap(this._inputGeom, 1, new (class {
      get interfaces_() {
        return [MapOp]
      }
      map(geom) {
        if (geom instanceof Point) return null
        if (geom instanceof Polygon) 
          return this.toLineString(geom.buffer(this._distance).getBoundary())
        
        return this.computeCurve(geom, this._distance)
      }
      toLineString(geom) {
        if (geom instanceof LinearRing) {
          const ring = geom
          return geom.getFactory().createLineString(ring.getCoordinateSequence())
        }
        return geom
      }
    })())
  }
  computeCurve() {
    if (arguments[0] instanceof LineString && typeof arguments[1] === 'number') {
      const lineGeom = arguments[0], distance = arguments[1]
      if (lineGeom.getNumPoints() < 2 || lineGeom.getLength() === 0.0) 
        return this._geomFactory.createLineString()
      
      if (lineGeom.getNumPoints() === 2) 
        return this.offsetSegment(lineGeom.getCoordinates(), distance)
      
      const rawOffset = OffsetCurve.rawOffset(lineGeom, distance, this._bufferParams)
      if (rawOffset.length === 0) 
        return this._geomFactory.createLineString()
      
      const bufferPoly = OffsetCurve.getBufferOriented(lineGeom, distance, this._bufferParams)
      const shell = bufferPoly.getExteriorRing().getCoordinates()
      let offsetCurve = this.computeCurve(shell, rawOffset)
      if (!offsetCurve.isEmpty() || bufferPoly.getNumInteriorRing() === 0) return offsetCurve
      const holePts = OffsetCurve.extractLongestHole(bufferPoly).getCoordinates()
      offsetCurve = this.computeCurve(holePts, rawOffset)
      return offsetCurve
    } else if (arguments[0] instanceof Array && arguments[1] instanceof Array) {
      const bufferPts = arguments[0], rawOffset = arguments[1]
      const isInCurve = new Array(bufferPts.length - 1).fill(null)
      const segIndex = new SegmentMCIndex(bufferPts)
      let curveStart = -1
      for (let i = 0; i < rawOffset.length - 1; i++) {
        const index = this.markMatchingSegments(rawOffset[i], rawOffset[i + 1], segIndex, bufferPts, isInCurve)
        if (curveStart < 0) 
          curveStart = index
        
      }
      const curvePts = OffsetCurve.extractSection(bufferPts, curveStart, isInCurve)
      return this._geomFactory.createLineString(curvePts)
    }
  }
  offsetSegment(pts, distance) {
    const offsetSeg = new LineSegment(pts[0], pts[1]).offset(distance)
    return this._geomFactory.createLineString([offsetSeg.p0, offsetSeg.p1])
  }
  markMatchingSegments(p0, p1, segIndex, bufferPts, isInCurve) {
    const matchEnv = new Envelope(p0, p1)
    matchEnv.expandBy(this._matchDistance)
    const action = new MatchCurveSegmentAction(p0, p1, bufferPts, this._matchDistance, isInCurve)
    segIndex.query(matchEnv, action)
    return action.getMinCurveIndex()
  }
}
class MatchCurveSegmentAction extends MonotoneChainSelectAction {
  constructor() {
    super()
    MatchCurveSegmentAction.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._p0 = null
    this._p1 = null
    this._bufferPts = null
    this._matchDistance = null
    this._isInCurve = null
    this._minFrac = -1
    this._minCurveIndex = -1
    const p0 = arguments[0], p1 = arguments[1], bufferPts = arguments[2], matchDistance = arguments[3], isInCurve = arguments[4]
    this._p0 = p0
    this._p1 = p1
    this._bufferPts = bufferPts
    this._matchDistance = matchDistance
    this._isInCurve = isInCurve
  }
  select() {
    if (arguments.length === 2 && (Number.isInteger(arguments[1]) && arguments[0] instanceof MonotoneChain)) {
      const mc = arguments[0], segIndex = arguments[1]
      const frac = OffsetCurve.subsegmentMatchFrac(this._bufferPts[segIndex], this._bufferPts[segIndex + 1], this._p0, this._p1, this._matchDistance)
      if (frac < 0) return null
      this._isInCurve[segIndex] = true
      if (this._minFrac < 0 || frac < this._minFrac) {
        this._minFrac = frac
        this._minCurveIndex = segIndex
      }
    } else {
      return super.select.apply(this, arguments)
    }
  }
  getMinCurveIndex() {
    return this._minCurveIndex
  }
}
OffsetCurve.MatchCurveSegmentAction = MatchCurveSegmentAction
OffsetCurve.NEARNESS_FACTOR = 10000
