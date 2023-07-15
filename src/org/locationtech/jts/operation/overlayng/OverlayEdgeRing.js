import Location from '../../geom/Location.js'
import CoordinateList from '../../geom/CoordinateList.js'
import TopologyException from '../../geom/TopologyException.js'
import Orientation from '../../algorithm/Orientation.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator.js'
export default class OverlayEdgeRing {
  constructor() {
    OverlayEdgeRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._startEdge = null
    this._ring = null
    this._isHole = null
    this._ringPts = null
    this._locator = null
    this._shell = null
    this._holes = new ArrayList()
    const start = arguments[0], geometryFactory = arguments[1]
    this._startEdge = start
    this._ringPts = this.computeRingPts(start)
    this.computeRing(this._ringPts, geometryFactory)
  }
  computeRing(ringPts, geometryFactory) {
    if (this._ring !== null) return null
    this._ring = geometryFactory.createLinearRing(ringPts)
    this._isHole = Orientation.isCCW(this._ring.getCoordinates())
  }
  getCoordinates() {
    return this._ringPts
  }
  isPointInOrOut(ring) {
    for (const pt of ring.getCoordinates()) {
      const loc = this.locate(pt)
      if (loc === Location.INTERIOR) 
        return true
      
      if (loc === Location.EXTERIOR) 
        return false
      
    }
    return false
  }
  getCoordinate() {
    return this._ringPts[0]
  }
  isHole() {
    return this._isHole
  }
  addHole(ring) {
    this._holes.add(ring)
  }
  getEnvelope() {
    return this._ring.getEnvelopeInternal()
  }
  getEdge() {
    return this._startEdge
  }
  computeRingPts(start) {
    let edge = start
    const pts = new CoordinateList()
    do {
      if (edge.getEdgeRing() === this) throw new TopologyException('Edge visited twice during ring-building at ' + edge.getCoordinate(), edge.getCoordinate())
      edge.addCoordinates(pts)
      edge.setEdgeRing(this)
      if (edge.nextResult() === null) throw new TopologyException('Found null edge in ring', edge.dest())
      edge = edge.nextResult()
    } while (edge !== start)
    pts.closeRing()
    return pts.toCoordinateArray()
  }
  hasShell() {
    return this._shell !== null
  }
  findEdgeRingContaining(erList) {
    let minContainingRing = null
    for (const edgeRing of erList) 
      if (edgeRing.contains(this)) 
        if (minContainingRing === null || minContainingRing.getEnvelope().contains(edgeRing.getEnvelope())) 
          minContainingRing = edgeRing
        
      
    
    return minContainingRing
  }
  getLocator() {
    if (this._locator === null) 
      this._locator = new IndexedPointInAreaLocator(this.getRing())
    
    return this._locator
  }
  getShell() {
    if (this.isHole()) return this._shell
    return this
  }
  contains(ring) {
    const env = this.getEnvelope()
    const testEnv = ring.getEnvelope()
    if (!env.containsProperly(testEnv)) return false
    return this.isPointInOrOut(ring)
  }
  getRing() {
    return this._ring
  }
  locate(pt) {
    return this.getLocator().locate(pt)
  }
  setShell(shell) {
    this._shell = shell
    if (shell !== null) shell.addHole(this)
  }
  toPolygon(factory) {
    let holeLR = null
    if (this._holes !== null) {
      holeLR = new Array(this._holes.size()).fill(null)
      for (let i = 0; i < this._holes.size(); i++) 
        holeLR[i] = this._holes.get(i).getRing()
      
    }
    const poly = factory.createPolygon(this._ring, holeLR)
    return poly
  }
}
