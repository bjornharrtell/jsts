import Location from '../geom/Location'
import Coordinate from '../geom/Coordinate'
import Node from './Node'
import NodeMap from './NodeMap'
import Orientation from '../algorithm/Orientation'
import DirectedEdge from './DirectedEdge'
import System from '../../../../java/lang/System'
import ArrayList from '../../../../java/util/ArrayList'
import Quadrant from './Quadrant'
import NodeFactory from './NodeFactory'
export default class PlanarGraph {
  constructor() {
    PlanarGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edges = new ArrayList()
    this._nodes = null
    this._edgeEndList = new ArrayList()
    if (arguments.length === 0) {
      this._nodes = new NodeMap(new NodeFactory())
    } else if (arguments.length === 1) {
      const nodeFact = arguments[0]
      this._nodes = new NodeMap(nodeFact)
    }
  }
  static linkResultDirectedEdges(nodes) {
    for (let nodeit = nodes.iterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      node.getEdges().linkResultDirectedEdges()
    }
  }
  printEdges(out) {
    out.println('Edges:')
    for (let i = 0; i < this._edges.size(); i++) {
      out.println('edge ' + i + ':')
      const e = this._edges.get(i)
      e.print(out)
      e.eiList.print(out)
    }
  }
  find(coord) {
    return this._nodes.find(coord)
  }
  addNode() {
    if (arguments[0] instanceof Node) {
      const node = arguments[0]
      return this._nodes.addNode(node)
    } else if (arguments[0] instanceof Coordinate) {
      const coord = arguments[0]
      return this._nodes.addNode(coord)
    }
  }
  getNodeIterator() {
    return this._nodes.iterator()
  }
  linkResultDirectedEdges() {
    for (let nodeit = this._nodes.iterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      node.getEdges().linkResultDirectedEdges()
    }
  }
  debugPrintln(o) {
    System.out.println(o)
  }
  isBoundaryNode(geomIndex, coord) {
    const node = this._nodes.find(coord)
    if (node === null) return false
    const label = node.getLabel()
    if (label !== null && label.getLocation(geomIndex) === Location.BOUNDARY) return true
    return false
  }
  linkAllDirectedEdges() {
    for (let nodeit = this._nodes.iterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      node.getEdges().linkAllDirectedEdges()
    }
  }
  matchInSameDirection(p0, p1, ep0, ep1) {
    if (!p0.equals(ep0)) return false
    if (Orientation.index(p0, p1, ep1) === Orientation.COLLINEAR && Quadrant.quadrant(p0, p1) === Quadrant.quadrant(ep0, ep1)) return true
    return false
  }
  getEdgeEnds() {
    return this._edgeEndList
  }
  debugPrint(o) {
    System.out.print(o)
  }
  getEdgeIterator() {
    return this._edges.iterator()
  }
  findEdgeInSameDirection(p0, p1) {
    for (let i = 0; i < this._edges.size(); i++) {
      const e = this._edges.get(i)
      const eCoord = e.getCoordinates()
      if (this.matchInSameDirection(p0, p1, eCoord[0], eCoord[1])) return e
      if (this.matchInSameDirection(p0, p1, eCoord[eCoord.length - 1], eCoord[eCoord.length - 2])) return e
    }
    return null
  }
  insertEdge(e) {
    this._edges.add(e)
  }
  findEdgeEnd(e) {
    for (let i = this.getEdgeEnds().iterator(); i.hasNext(); ) {
      const ee = i.next()
      if (ee.getEdge() === e) return ee
    }
    return null
  }
  addEdges(edgesToAdd) {
    for (let it = edgesToAdd.iterator(); it.hasNext(); ) {
      const e = it.next()
      this._edges.add(e)
      const de1 = new DirectedEdge(e, true)
      const de2 = new DirectedEdge(e, false)
      de1.setSym(de2)
      de2.setSym(de1)
      this.add(de1)
      this.add(de2)
    }
  }
  add(e) {
    this._nodes.add(e)
    this._edgeEndList.add(e)
  }
  getNodes() {
    return this._nodes.values()
  }
  findEdge(p0, p1) {
    for (let i = 0; i < this._edges.size(); i++) {
      const e = this._edges.get(i)
      const eCoord = e.getCoordinates()
      if (p0.equals(eCoord[0]) && p1.equals(eCoord[1])) return e
    }
    return null
  }
}
