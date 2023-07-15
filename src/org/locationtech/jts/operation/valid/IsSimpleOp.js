import BasicSegmentString from '../../noding/BasicSegmentString.js'
import LineString from '../../geom/LineString.js'
import HashSet from '../../../../../java/util/HashSet.js'
import hasInterface from '../../../../../hasInterface.js'
import MCIndexNoder from '../../noding/MCIndexNoder.js'
import Point from '../../geom/Point.js'
import MultiPoint from '../../geom/MultiPoint.js'
import BoundaryNodeRule from '../../algorithm/BoundaryNodeRule.js'
import SegmentIntersector from '../../noding/SegmentIntersector.js'
import GeometryCollection from '../../geom/GeometryCollection.js'
import CoordinateArrays from '../../geom/CoordinateArrays.js'
import Polygonal from '../../geom/Polygonal.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector.js'
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter.js'
import MultiLineString from '../../geom/MultiLineString.js'
export default class IsSimpleOp {
  constructor() {
    IsSimpleOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._isClosedEndpointsInInterior = null
    this._isFindAllLocations = null
    this._isSimple = false
    this._nonSimplePts = null
    if (arguments.length === 1) {
      const geom = arguments[0]
      IsSimpleOp.constructor_.call(this, geom, BoundaryNodeRule.MOD2_BOUNDARY_RULE)
    } else if (arguments.length === 2) {
      const geom = arguments[0], boundaryNodeRule = arguments[1]
      this._inputGeom = geom
      this._isClosedEndpointsInInterior = !boundaryNodeRule.isInBoundary(2)
    }
  }
  static isSimple(geom) {
    const op = new IsSimpleOp(geom)
    return op.isSimple()
  }
  static getNonSimpleLocation(geom) {
    const op = new IsSimpleOp(geom)
    return op.getNonSimpleLocation()
  }
  static extractSegmentStrings(geom) {
    const segStrings = new ArrayList()
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const line = geom.getGeometryN(i)
      const trimPts = IsSimpleOp.trimRepeatedPoints(line.getCoordinates())
      if (trimPts !== null) {
        const ss = new BasicSegmentString(trimPts, null)
        segStrings.add(ss)
      }
    }
    return segStrings
  }
  static trimRepeatedPoints(pts) {
    if (pts.length <= 2) return pts
    const len = pts.length
    const hasRepeatedStart = pts[0].equals2D(pts[1])
    const hasRepeatedEnd = pts[len - 1].equals2D(pts[len - 2])
    if (!hasRepeatedStart && !hasRepeatedEnd) return pts
    let startIndex = 0
    const startPt = pts[0]
    while (startIndex < len - 1 && startPt.equals2D(pts[startIndex + 1])) 
      startIndex++
    
    let endIndex = len - 1
    const endPt = pts[endIndex]
    while (endIndex > 0 && endPt.equals2D(pts[endIndex - 1])) 
      endIndex--
    
    if (endIndex - startIndex < 1) 
      return null
    
    const trimPts = CoordinateArrays.extract(pts, startIndex, endIndex)
    return trimPts
  }
  isSimpleMultiPoint(mp) {
    if (mp.isEmpty()) return true
    let isSimple = true
    const points = new HashSet()
    for (let i = 0; i < mp.getNumGeometries(); i++) {
      const pt = mp.getGeometryN(i)
      const p = pt.getCoordinate()
      if (points.contains(p)) {
        this._nonSimplePts.add(p)
        isSimple = false
        if (!this._isFindAllLocations) break
      } else {
        points.add(p)
      }
    }
    return isSimple
  }
  isSimplePolygonal(geom) {
    let isSimple = true
    const rings = LinearComponentExtracter.getLines(geom)
    for (const ring of rings) 
      if (!this.isSimpleLinearGeometry(ring)) {
        isSimple = false
        if (!this._isFindAllLocations) break
      }
    
    return isSimple
  }
  compute() {
    if (this._nonSimplePts !== null) return null
    this._nonSimplePts = new ArrayList()
    this._isSimple = this.computeSimple(this._inputGeom)
  }
  getNonSimpleLocation() {
    this.compute()
    if (this._nonSimplePts.size() === 0) return null
    return this._nonSimplePts.get(0)
  }
  getNonSimpleLocations() {
    this.compute()
    return this._nonSimplePts
  }
  isSimpleLinearGeometry(geom) {
    if (geom.isEmpty()) return true
    const segStrings = IsSimpleOp.extractSegmentStrings(geom)
    const segInt = new NonSimpleIntersectionFinder(this._isClosedEndpointsInInterior, this._isFindAllLocations, this._nonSimplePts)
    const noder = new MCIndexNoder()
    noder.setSegmentIntersector(segInt)
    noder.computeNodes(segStrings)
    if (segInt.hasIntersection()) 
      return false
    
    return true
  }
  setFindAllLocations(isFindAll) {
    this._isFindAllLocations = isFindAll
  }
  computeSimple(geom) {
    if (geom.isEmpty()) return true
    if (geom instanceof Point) return true
    if (geom instanceof LineString) return this.isSimpleLinearGeometry(geom)
    if (geom instanceof MultiLineString) return this.isSimpleLinearGeometry(geom)
    if (geom instanceof MultiPoint) return this.isSimpleMultiPoint(geom)
    if (hasInterface(geom, Polygonal)) return this.isSimplePolygonal(geom)
    if (geom instanceof GeometryCollection) return this.isSimpleGeometryCollection(geom)
    return true
  }
  isSimple() {
    this.compute()
    return this._isSimple
  }
  isSimpleGeometryCollection(geom) {
    let isSimple = true
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const comp = geom.getGeometryN(i)
      if (!this.computeSimple(comp)) {
        isSimple = false
        if (!this._isFindAllLocations) break
      }
    }
    return isSimple
  }
}
class NonSimpleIntersectionFinder {
  constructor() {
    NonSimpleIntersectionFinder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isClosedEndpointsInInterior = null
    this._isFindAll = null
    this.li = new RobustLineIntersector()
    this._intersectionPts = null
    const isClosedEndpointsInInterior = arguments[0], isFindAll = arguments[1], intersectionPts = arguments[2]
    this._isClosedEndpointsInInterior = isClosedEndpointsInInterior
    this._isFindAll = isFindAll
    this._intersectionPts = intersectionPts
  }
  static isIntersectionEndpoint(ss, ssIndex, li, liSegmentIndex) {
    const vertexIndex = NonSimpleIntersectionFinder.intersectionVertexIndex(li, liSegmentIndex)
    if (vertexIndex === 0) 
      return ssIndex === 0
    else 
      return ssIndex + 2 === ss.size()
    
  }
  static intersectionVertexIndex(li, segmentIndex) {
    const intPt = li.getIntersection(0)
    const endPt0 = li.getEndpoint(segmentIndex, 0)
    return intPt.equals2D(endPt0) ? 0 : 1
  }
  hasIntersection() {
    return this._intersectionPts.size() > 0
  }
  processIntersections(ss0, segIndex0, ss1, segIndex1) {
    const isSameSegString = ss0 === ss1
    const isSameSegment = isSameSegString && segIndex0 === segIndex1
    if (isSameSegment) return null
    const hasInt = this.findIntersection(ss0, segIndex0, ss1, segIndex1)
    if (hasInt) 
      this._intersectionPts.add(this.li.getIntersection(0))
    
  }
  findIntersection(ss0, segIndex0, ss1, segIndex1) {
    const p00 = ss0.getCoordinate(segIndex0)
    const p01 = ss0.getCoordinate(segIndex0 + 1)
    const p10 = ss1.getCoordinate(segIndex1)
    const p11 = ss1.getCoordinate(segIndex1 + 1)
    this.li.computeIntersection(p00, p01, p10, p11)
    if (!this.li.hasIntersection()) return false
    const hasInteriorInt = this.li.isInteriorIntersection()
    if (hasInteriorInt) return true
    const hasEqualSegments = this.li.getIntersectionNum() >= 2
    if (hasEqualSegments) return true
    const isSameSegString = ss0 === ss1
    const isAdjacentSegment = isSameSegString && Math.abs(segIndex1 - segIndex0) <= 1
    if (isAdjacentSegment) return false
    const isIntersectionEndpt0 = NonSimpleIntersectionFinder.isIntersectionEndpoint(ss0, segIndex0, this.li, 0)
    const isIntersectionEndpt1 = NonSimpleIntersectionFinder.isIntersectionEndpoint(ss1, segIndex1, this.li, 1)
    const hasInteriorVertexInt = !(isIntersectionEndpt0 && isIntersectionEndpt1)
    if (hasInteriorVertexInt) return true
    if (this._isClosedEndpointsInInterior && !isSameSegString) {
      const hasInteriorEndpointInt = ss0.isClosed() || ss1.isClosed()
      if (hasInteriorEndpointInt) return true
    }
    return false
  }
  isDone() {
    if (this._isFindAll) return false
    return this._intersectionPts.size() > 0
  }
  get interfaces_() {
    return [SegmentIntersector]
  }
}
IsSimpleOp.NonSimpleIntersectionFinder = NonSimpleIntersectionFinder
