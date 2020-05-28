import DirectedEdgeStar from './DirectedEdgeStar'
import HashSet from '../../../../java/util/HashSet'
import DirectedEdge from './DirectedEdge'
import GraphComponent from './GraphComponent'
export default class Node extends GraphComponent {
  constructor() {
    super()
    Node.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pt = null
    this._deStar = null
    if (arguments.length === 1) {
      const pt = arguments[0]
      Node.constructor_.call(this, pt, new DirectedEdgeStar())
    } else if (arguments.length === 2) {
      const pt = arguments[0], deStar = arguments[1]
      this._pt = pt
      this._deStar = deStar
    }
  }
  static getEdgesBetween(node0, node1) {
    const edges0 = DirectedEdge.toEdges(node0.getOutEdges().getEdges())
    const commonEdges = new HashSet(edges0)
    const edges1 = DirectedEdge.toEdges(node1.getOutEdges().getEdges())
    commonEdges.retainAll(edges1)
    return commonEdges
  }
  isRemoved() {
    return this._pt === null
  }
  addOutEdge(de) {
    this._deStar.add(de)
  }
  getCoordinate() {
    return this._pt
  }
  getOutEdges() {
    return this._deStar
  }
  remove() {
    if (arguments.length === 0) {
      this._pt = null
    } else if (arguments.length === 1) {
      const de = arguments[0]
      this._deStar.remove(de)
    }
  }
  getIndex(edge) {
    return this._deStar.getIndex(edge)
  }
  getDegree() {
    return this._deStar.getDegree()
  }
}
