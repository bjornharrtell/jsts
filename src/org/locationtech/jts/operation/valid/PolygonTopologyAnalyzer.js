import BasicSegmentString from '../../noding/BasicSegmentString.js'
import Location from '../../geom/Location.js'
import PolygonIntersectionAnalyzer from './PolygonIntersectionAnalyzer.js'
import PolygonNodeTopology from '../../algorithm/PolygonNodeTopology.js'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException.js'
import MCIndexNoder from '../../noding/MCIndexNoder.js'
import PointLocation from '../../algorithm/PointLocation.js'
import LinearRing from '../../geom/LinearRing.js'
import Orientation from '../../algorithm/Orientation.js'
import CoordinateArrays from '../../geom/CoordinateArrays.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import PolygonRing from './PolygonRing.js'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector.js'
export default class PolygonTopologyAnalyzer {
  constructor() {
    PolygonTopologyAnalyzer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isInvertedRingValid = null
    this._intFinder = null
    this._polyRings = null
    this._disconnectionPt = null
    const geom = arguments[0], isInvertedRingValid = arguments[1]
    this._isInvertedRingValid = isInvertedRingValid
    this.analyze(geom)
  }
  static ringIndexPrev(ringPts, index) {
    if (index === 0) return ringPts.length - 2
    return index - 1
  }
  static findNonEqualVertex(ring, p) {
    let i = 1
    let next = ring.getCoordinateN(i)
    while (next.equals2D(p) && i < ring.getNumPoints() - 1) {
      i += 1
      next = ring.getCoordinateN(i)
    }
    return next
  }
  static ringIndexNext(ringPts, index) {
    if (index >= ringPts.length - 2) return 0
    return index + 1
  }
  static createSegmentStrings(geom, isInvertedRingValid) {
    const segStrings = new ArrayList()
    if (geom instanceof LinearRing) {
      const ring = geom
      segStrings.add(PolygonTopologyAnalyzer.createSegString(ring, null))
      return segStrings
    }
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const poly = geom.getGeometryN(i)
      if (poly.isEmpty()) continue
      const hasHoles = poly.getNumInteriorRing() > 0
      let shellRing = null
      if (hasHoles || isInvertedRingValid) 
        shellRing = new PolygonRing(poly.getExteriorRing())
      
      segStrings.add(PolygonTopologyAnalyzer.createSegString(poly.getExteriorRing(), shellRing))
      for (let j = 0; j < poly.getNumInteriorRing(); j++) {
        const hole = poly.getInteriorRingN(j)
        if (hole.isEmpty()) continue
        const holeRing = new PolygonRing(hole, j, shellRing)
        segStrings.add(PolygonTopologyAnalyzer.createSegString(hole, holeRing))
      }
    }
    return segStrings
  }
  static isIncidentSegmentInRing(p0, p1, ringPts) {
    const index = PolygonTopologyAnalyzer.intersectingSegIndex(ringPts, p0)
    if (index < 0) 
      throw new IllegalArgumentException('Segment vertex does not intersect ring')
    
    let rPrev = PolygonTopologyAnalyzer.findRingVertexPrev(ringPts, index, p0)
    let rNext = PolygonTopologyAnalyzer.findRingVertexNext(ringPts, index, p0)
    const isInteriorOnRight = !Orientation.isCCW(ringPts)
    if (!isInteriorOnRight) {
      const temp = rPrev
      rPrev = rNext
      rNext = temp
    }
    return PolygonNodeTopology.isInteriorSegment(p0, rPrev, rNext, p1)
  }
  static intersectingSegIndex(ringPts, pt) {
    const li = new RobustLineIntersector()
    for (let i = 0; i < ringPts.length - 1; i++) {
      li.computeIntersection(pt, ringPts[i], ringPts[i + 1])
      if (li.hasIntersection()) {
        if (pt.equals2D(ringPts[i + 1])) 
          return i + 1
        
        return i
      }
    }
    return -1
  }
  static findRingVertexNext(ringPts, index, node) {
    let iNext = index + 1
    let next = ringPts[iNext]
    while (node.equals2D(next)) {
      iNext = PolygonTopologyAnalyzer.ringIndexNext(ringPts, iNext)
      next = ringPts[iNext]
    }
    return next
  }
  static getPolygonRings(segStrings) {
    let polyRings = null
    for (const ss of segStrings) {
      const polyRing = ss.getData()
      if (polyRing !== null) {
        if (polyRings === null) 
          polyRings = new ArrayList()
        
        polyRings.add(polyRing)
      }
    }
    return polyRings
  }
  static createSegString(ring, polyRing) {
    let pts = ring.getCoordinates()
    if (CoordinateArrays.hasRepeatedPoints(pts)) 
      pts = CoordinateArrays.removeRepeatedPoints(pts)
    
    const ss = new BasicSegmentString(pts, polyRing)
    return ss
  }
  static findSelfIntersection(ring) {
    const ata = new PolygonTopologyAnalyzer(ring, false)
    if (ata.hasInvalidIntersection()) return ata.getInvalidLocation()
    return null
  }
  static isRingNested(test, target) {
    const p0 = test.getCoordinateN(0)
    const targetPts = target.getCoordinates()
    const loc = PointLocation.locateInRing(p0, targetPts)
    if (loc === Location.EXTERIOR) return false
    if (loc === Location.INTERIOR) return true
    const p1 = PolygonTopologyAnalyzer.findNonEqualVertex(test, p0)
    return PolygonTopologyAnalyzer.isIncidentSegmentInRing(p0, p1, targetPts)
  }
  static findRingVertexPrev(ringPts, index, node) {
    let iPrev = index
    let prev = ringPts[iPrev]
    while (node.equals2D(prev)) {
      iPrev = PolygonTopologyAnalyzer.ringIndexPrev(ringPts, iPrev)
      prev = ringPts[iPrev]
    }
    return prev
  }
  analyze(geom) {
    if (geom.isEmpty()) return null
    const segStrings = PolygonTopologyAnalyzer.createSegmentStrings(geom, this._isInvertedRingValid)
    this._polyRings = PolygonTopologyAnalyzer.getPolygonRings(segStrings)
    this._intFinder = this.analyzeIntersections(segStrings)
    if (this._intFinder.hasDoubleTouch()) {
      this._disconnectionPt = this._intFinder.getDoubleTouchLocation()
      return null
    }
  }
  checkInteriorDisconnectedByHoleCycle() {
    if (this._polyRings !== null) 
      this._disconnectionPt = PolygonRing.findHoleCycleLocation(this._polyRings)
    
  }
  getDisconnectionLocation() {
    return this._disconnectionPt
  }
  hasInvalidIntersection() {
    return this._intFinder.isInvalid()
  }
  analyzeIntersections(segStrings) {
    const segInt = new PolygonIntersectionAnalyzer(this._isInvertedRingValid)
    const noder = new MCIndexNoder()
    noder.setSegmentIntersector(segInt)
    noder.computeNodes(segStrings)
    return segInt
  }
  isInteriorDisconnected() {
    if (this._disconnectionPt !== null) 
      return true
    
    if (this._isInvertedRingValid) {
      this.checkInteriorDisconnectedBySelfTouch()
      if (this._disconnectionPt !== null) 
        return true
      
    }
    this.checkInteriorDisconnectedByHoleCycle()
    if (this._disconnectionPt !== null) 
      return true
    
    return false
  }
  checkInteriorDisconnectedBySelfTouch() {
    if (this._polyRings !== null) 
      this._disconnectionPt = PolygonRing.findInteriorSelfNode(this._polyRings)
    
  }
  getInvalidLocation() {
    return this._intFinder.getInvalidLocation()
  }
  getInvalidCode() {
    return this._intFinder.getInvalidCode()
  }
}
