import Location from '../../geom/Location'
import GeometryFactory from '../../geom/GeometryFactory'
import Position from '../../geomgraph/Position'
import Polygon from '../../geom/Polygon'
import MultiPolygon from '../../geom/MultiPolygon'
import MaximalEdgeRing from '../overlay/MaximalEdgeRing'
import OverlayNodeFactory from '../overlay/OverlayNodeFactory'
import ArrayList from '../../../../../java/util/ArrayList'
import Assert from '../../util/Assert'
import PlanarGraph from '../../geomgraph/PlanarGraph'
export default class ConnectedInteriorTester {
  constructor() {
    ConnectedInteriorTester.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometryFactory = new GeometryFactory()
    this._geomGraph = null
    this._disconnectedRingcoord = null
    const geomGraph = arguments[0]
    this._geomGraph = geomGraph
  }
  static findDifferentPoint(coord, pt) {
    for (let i = 0; i < coord.length; i++) 
      if (!coord[i].equals(pt)) return coord[i]
    
    return null
  }
  visitInteriorRing(ring, graph) {
    if (ring.isEmpty()) return null
    const pts = ring.getCoordinates()
    const pt0 = pts[0]
    const pt1 = ConnectedInteriorTester.findDifferentPoint(pts, pt0)
    const e = graph.findEdgeInSameDirection(pt0, pt1)
    const de = graph.findEdgeEnd(e)
    let intDe = null
    if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) 
      intDe = de
    else if (de.getSym().getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) 
      intDe = de.getSym()
    
    Assert.isTrue(intDe !== null, 'unable to find dirEdge with Interior on RHS')
    this.visitLinkedDirectedEdges(intDe)
  }
  visitShellInteriors(g, graph) {
    if (g instanceof Polygon) {
      const p = g
      this.visitInteriorRing(p.getExteriorRing(), graph)
    }
    if (g instanceof MultiPolygon) {
      const mp = g
      for (let i = 0; i < mp.getNumGeometries(); i++) {
        const p = mp.getGeometryN(i)
        this.visitInteriorRing(p.getExteriorRing(), graph)
      }
    }
  }
  getCoordinate() {
    return this._disconnectedRingcoord
  }
  setInteriorEdgesInResult(graph) {
    for (let it = graph.getEdgeEnds().iterator(); it.hasNext(); ) {
      const de = it.next()
      if (de.getLabel().getLocation(0, Position.RIGHT) === Location.INTERIOR) 
        de.setInResult(true)
      
    }
  }
  visitLinkedDirectedEdges(start) {
    const startDe = start
    let de = start
    do {
      Assert.isTrue(de !== null, 'found null Directed Edge')
      de.setVisited(true)
      de = de.getNext()
    } while (de !== startDe)
  }
  buildEdgeRings(dirEdges) {
    const edgeRings = new ArrayList()
    for (let it = dirEdges.iterator(); it.hasNext(); ) {
      const de = it.next()
      if (de.isInResult() && de.getEdgeRing() === null) {
        const er = new MaximalEdgeRing(de, this._geometryFactory)
        er.linkDirectedEdgesForMinimalEdgeRings()
        const minEdgeRings = er.buildMinimalRings()
        edgeRings.addAll(minEdgeRings)
      }
    }
    return edgeRings
  }
  hasUnvisitedShellEdge(edgeRings) {
    for (let i = 0; i < edgeRings.size(); i++) {
      const er = edgeRings.get(i)
      if (er.isHole()) continue
      const edges = er.getEdges()
      let de = edges.get(0)
      if (de.getLabel().getLocation(0, Position.RIGHT) !== Location.INTERIOR) continue
      for (let j = 0; j < edges.size(); j++) {
        de = edges.get(j)
        if (!de.isVisited()) {
          this._disconnectedRingcoord = de.getCoordinate()
          return true
        }
      }
    }
    return false
  }
  isInteriorsConnected() {
    const splitEdges = new ArrayList()
    this._geomGraph.computeSplitEdges(splitEdges)
    const graph = new PlanarGraph(new OverlayNodeFactory())
    graph.addEdges(splitEdges)
    this.setInteriorEdgesInResult(graph)
    graph.linkResultDirectedEdges()
    const edgeRings = this.buildEdgeRings(graph.getEdgeEnds())
    this.visitShellInteriors(this._geomGraph.getGeometry(), graph)
    return !this.hasUnvisitedShellEdge(edgeRings)
  }
}
