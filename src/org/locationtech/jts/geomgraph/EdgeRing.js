import Location from '../geom/Location'
import Position from './Position'
import PointLocation from '../algorithm/PointLocation'
import TopologyException from '../geom/TopologyException'
import Orientation from '../algorithm/Orientation'
import Label from './Label'
import ArrayList from '../../../../java/util/ArrayList'
import Assert from '../util/Assert'
export default class EdgeRing {
  constructor() {
    EdgeRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._startDe = null
    this._maxNodeDegree = -1
    this._edges = new ArrayList()
    this._pts = new ArrayList()
    this._label = new Label(Location.NONE)
    this._ring = null
    this._isHole = null
    this._shell = null
    this._holes = new ArrayList()
    this._geometryFactory = null
    if (arguments.length === 0) {} else if (arguments.length === 2) {
      const start = arguments[0], geometryFactory = arguments[1]
      this._geometryFactory = geometryFactory
      this.computePoints(start)
      this.computeRing()
    }
  }
  computeRing() {
    if (this._ring !== null) return null
    const coord = new Array(this._pts.size()).fill(null)
    for (let i = 0; i < this._pts.size(); i++) 
      coord[i] = this._pts.get(i)
    
    this._ring = this._geometryFactory.createLinearRing(coord)
    this._isHole = Orientation.isCCW(this._ring.getCoordinates())
  }
  isIsolated() {
    return this._label.getGeometryCount() === 1
  }
  computePoints(start) {
    this._startDe = start
    let de = start
    let isFirstEdge = true
    do {
      if (de === null) throw new TopologyException('Found null DirectedEdge')
      if (de.getEdgeRing() === this) throw new TopologyException('Directed Edge visited twice during ring-building at ' + de.getCoordinate())
      this._edges.add(de)
      const label = de.getLabel()
      Assert.isTrue(label.isArea())
      this.mergeLabel(label)
      this.addPoints(de.getEdge(), de.isForward(), isFirstEdge)
      isFirstEdge = false
      this.setEdgeRing(de, this)
      de = this.getNext(de)
    } while (de !== this._startDe)
  }
  getLinearRing() {
    return this._ring
  }
  getCoordinate(i) {
    return this._pts.get(i)
  }
  computeMaxNodeDegree() {
    this._maxNodeDegree = 0
    let de = this._startDe
    do {
      const node = de.getNode()
      const degree = node.getEdges().getOutgoingDegree(this)
      if (degree > this._maxNodeDegree) this._maxNodeDegree = degree
      de = this.getNext(de)
    } while (de !== this._startDe)
    this._maxNodeDegree *= 2
  }
  addPoints(edge, isForward, isFirstEdge) {
    const edgePts = edge.getCoordinates()
    if (isForward) {
      let startIndex = 1
      if (isFirstEdge) startIndex = 0
      for (let i = startIndex; i < edgePts.length; i++) 
        this._pts.add(edgePts[i])
      
    } else {
      let startIndex = edgePts.length - 2
      if (isFirstEdge) startIndex = edgePts.length - 1
      for (let i = startIndex; i >= 0; i--) 
        this._pts.add(edgePts[i])
      
    }
  }
  isHole() {
    return this._isHole
  }
  setInResult() {
    let de = this._startDe
    do {
      de.getEdge().setInResult(true)
      de = de.getNext()
    } while (de !== this._startDe)
  }
  containsPoint(p) {
    const shell = this.getLinearRing()
    const env = shell.getEnvelopeInternal()
    if (!env.contains(p)) return false
    if (!PointLocation.isInRing(p, shell.getCoordinates())) return false
    for (let i = this._holes.iterator(); i.hasNext(); ) {
      const hole = i.next()
      if (hole.containsPoint(p)) return false
    }
    return true
  }
  addHole(ring) {
    this._holes.add(ring)
  }
  isShell() {
    return this._shell === null
  }
  getLabel() {
    return this._label
  }
  getEdges() {
    return this._edges
  }
  getMaxNodeDegree() {
    if (this._maxNodeDegree < 0) this.computeMaxNodeDegree()
    return this._maxNodeDegree
  }
  getShell() {
    return this._shell
  }
  mergeLabel() {
    if (arguments.length === 1) {
      const deLabel = arguments[0]
      this.mergeLabel(deLabel, 0)
      this.mergeLabel(deLabel, 1)
    } else if (arguments.length === 2) {
      const deLabel = arguments[0], geomIndex = arguments[1]
      const loc = deLabel.getLocation(geomIndex, Position.RIGHT)
      if (loc === Location.NONE) return null
      if (this._label.getLocation(geomIndex) === Location.NONE) {
        this._label.setLocation(geomIndex, loc)
        return null
      }
    }
  }
  setShell(shell) {
    this._shell = shell
    if (shell !== null) shell.addHole(this)
  }
  toPolygon(geometryFactory) {
    const holeLR = new Array(this._holes.size()).fill(null)
    for (let i = 0; i < this._holes.size(); i++) 
      holeLR[i] = this._holes.get(i).getLinearRing()
    
    const poly = geometryFactory.createPolygon(this.getLinearRing(), holeLR)
    return poly
  }
}
