import LineString from '../../geom/LineString.js'
import ValidatingNoder from '../../noding/ValidatingNoder.js'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException.js'
import MCIndexNoder from '../../noding/MCIndexNoder.js'
import NodedSegmentString from '../../noding/NodedSegmentString.js'
import Polygon from '../../geom/Polygon.js'
import RingClipper from './RingClipper.js'
import SnapRoundingNoder from '../../noding/snapround/SnapRoundingNoder.js'
import EdgeMerger from './EdgeMerger.js'
import Orientation from '../../algorithm/Orientation.js'
import MultiPolygon from '../../geom/MultiPolygon.js'
import OverlayUtil from './OverlayUtil.js'
import GeometryCollection from '../../geom/GeometryCollection.js'
import LineLimiter from './LineLimiter.js'
import CoordinateArrays from '../../geom/CoordinateArrays.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector.js'
import IntersectionAdder from '../../noding/IntersectionAdder.js'
import Edge from './Edge.js'
import MultiLineString from '../../geom/MultiLineString.js'
import EdgeSourceInfo from './EdgeSourceInfo.js'
export default class EdgeNodingBuilder {
  constructor() {
    EdgeNodingBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pm = null
    this.inputEdges = new ArrayList()
    this._customNoder = null
    this._clipEnv = null
    this._clipper = null
    this._limiter = null
    this._hasEdges = new Array(2).fill(null)
    const pm = arguments[0], noder = arguments[1]
    this._pm = pm
    this._customNoder = noder
  }
  static createFixedPrecisionNoder(pm) {
    const noder = new SnapRoundingNoder(pm)
    return noder
  }
  static createFloatingPrecisionNoder(doValidation) {
    const mcNoder = new MCIndexNoder()
    const li = new RobustLineIntersector()
    mcNoder.setSegmentIntersector(new IntersectionAdder(li))
    let noder = mcNoder
    if (doValidation) 
      noder = new ValidatingNoder(mcNoder)
    
    return noder
  }
  static removeRepeatedPoints(line) {
    const pts = line.getCoordinates()
    return CoordinateArrays.removeRepeatedPoints(pts)
  }
  static computeDepthDelta(ring, isHole) {
    const isCCW = Orientation.isCCW(ring.getCoordinateSequence())
    let isOriented = true
    if (!isHole) isOriented = !isCCW; else 
      isOriented = isCCW
    
    const depthDelta = isOriented ? 1 : -1
    return depthDelta
  }
  addLine() {
    if (arguments[0] instanceof LineString && Number.isInteger(arguments[1])) {
      const line = arguments[0], geomIndex = arguments[1]
      if (line.isEmpty()) return null
      if (this.isClippedCompletely(line.getEnvelopeInternal())) return null
      if (this.isToBeLimited(line)) {
        const sections = this.limit(line)
        for (const pts of sections) 
          this.addLine(pts, geomIndex)
        
      } else {
        const ptsNoRepeat = EdgeNodingBuilder.removeRepeatedPoints(line)
        this.addLine(ptsNoRepeat, geomIndex)
      }
    } else if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
      const pts = arguments[0], geomIndex = arguments[1]
      if (pts.length < 2) 
        return null
      
      const info = new EdgeSourceInfo(geomIndex)
      this.addEdge(pts, info)
    }
  }
  getNoder() {
    if (this._customNoder !== null) return this._customNoder
    if (OverlayUtil.isFloating(this._pm)) return EdgeNodingBuilder.createFloatingPrecisionNoder(EdgeNodingBuilder.IS_NODING_VALIDATED)
    return EdgeNodingBuilder.createFixedPrecisionNoder(this._pm)
  }
  hasEdgesFor(geomIndex) {
    return this._hasEdges[geomIndex]
  }
  addPolygon(poly, geomIndex) {
    const shell = poly.getExteriorRing()
    this.addPolygonRing(shell, false, geomIndex)
    for (let i = 0; i < poly.getNumInteriorRing(); i++) {
      const hole = poly.getInteriorRingN(i)
      this.addPolygonRing(hole, true, geomIndex)
    }
  }
  build(geom0, geom1) {
    this.add(geom0, 0)
    this.add(geom1, 1)
    const nodedEdges = this.node(this.inputEdges)
    const mergedEdges = EdgeMerger.merge(nodedEdges)
    return mergedEdges
  }
  isToBeLimited(line) {
    const pts = line.getCoordinates()
    if (this._limiter === null || pts.length <= EdgeNodingBuilder.MIN_LIMIT_PTS) 
      return false
    
    const env = line.getEnvelopeInternal()
    if (this._clipEnv.covers(env)) 
      return false
    
    return true
  }
  addEdge(pts, info) {
    const ss = new NodedSegmentString(pts, info)
    this.inputEdges.add(ss)
  }
  createEdges(segStrings) {
    const edges = new ArrayList()
    for (const ss of segStrings) {
      const pts = ss.getCoordinates()
      if (Edge.isCollapsed(pts)) continue
      const info = ss.getData()
      this._hasEdges[info.getIndex()] = true
      edges.add(new Edge(ss.getCoordinates(), info))
    }
    return edges
  }
  setClipEnvelope(clipEnv) {
    this._clipEnv = clipEnv
    this._clipper = new RingClipper(clipEnv)
    this._limiter = new LineLimiter(clipEnv)
  }
  node(segStrings) {
    const noder = this.getNoder()
    noder.computeNodes(segStrings)
    const nodedSS = noder.getNodedSubstrings()
    const edges = this.createEdges(nodedSS)
    return edges
  }
  addPolygonRing(ring, isHole, index) {
    if (ring.isEmpty()) return null
    if (this.isClippedCompletely(ring.getEnvelopeInternal())) return null
    const pts = this.clip(ring)
    if (pts.length < 2) 
      return null
    
    const depthDelta = EdgeNodingBuilder.computeDepthDelta(ring, isHole)
    const info = new EdgeSourceInfo(index, depthDelta, isHole)
    this.addEdge(pts, info)
  }
  clip(ring) {
    const pts = ring.getCoordinates()
    const env = ring.getEnvelopeInternal()
    if (this._clipper === null || this._clipEnv.covers(env)) 
      return EdgeNodingBuilder.removeRepeatedPoints(ring)
    
    return this._clipper.clip(pts)
  }
  limit(line) {
    const pts = line.getCoordinates()
    return this._limiter.limit(pts)
  }
  add(g, geomIndex) {
    if (g === null || g.isEmpty()) return null
    if (this.isClippedCompletely(g.getEnvelopeInternal())) return null
    if (g instanceof Polygon) this.addPolygon(g, geomIndex); else if (g instanceof LineString) this.addLine(g, geomIndex); else if (g instanceof MultiLineString) this.addCollection(g, geomIndex); else if (g instanceof MultiPolygon) this.addCollection(g, geomIndex); else if (g instanceof GeometryCollection) this.addGeometryCollection(g, geomIndex, g.getDimension())
  }
  addCollection(gc, geomIndex) {
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i)
      this.add(g, geomIndex)
    }
  }
  isClippedCompletely(env) {
    if (this._clipEnv === null) return false
    return this._clipEnv.disjoint(env)
  }
  addGeometryCollection(gc, geomIndex, expectedDim) {
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i)
      if (g.getDimension() !== expectedDim) 
        throw new IllegalArgumentException('Overlay input is mixed-dimension')
      
      this.add(g, geomIndex)
    }
  }
}
EdgeNodingBuilder.MIN_LIMIT_PTS = 20
EdgeNodingBuilder.IS_NODING_VALIDATED = true
