import HashSet from '../../../../java/util/HashSet'
import Node from './Node'
import NodeMap from './NodeMap'
import DirectedEdge from './DirectedEdge'
import ArrayList from '../../../../java/util/ArrayList'
import Edge from './Edge'
export default class PlanarGraph {
  constructor() {
    PlanarGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edges = new HashSet()
    this._dirEdges = new HashSet()
    this._nodeMap = new NodeMap()
  }
  findNodesOfDegree(degree) {
    const nodesFound = new ArrayList()
    for (let i = this.nodeIterator(); i.hasNext(); ) {
      const node = i.next()
      if (node.getDegree() === degree) nodesFound.add(node)
    }
    return nodesFound
  }
  dirEdgeIterator() {
    return this._dirEdges.iterator()
  }
  edgeIterator() {
    return this._edges.iterator()
  }
  remove() {
    if (arguments[0] instanceof Edge) {
      const edge = arguments[0]
      this.remove(edge.getDirEdge(0))
      this.remove(edge.getDirEdge(1))
      this._edges.remove(edge)
      edge.remove()
    } else if (arguments[0] instanceof DirectedEdge) {
      const de = arguments[0]
      const sym = de.getSym()
      if (sym !== null) sym.setSym(null)
      de.getFromNode().remove(de)
      de.remove()
      this._dirEdges.remove(de)
    } else if (arguments[0] instanceof Node) {
      const node = arguments[0]
      const outEdges = node.getOutEdges().getEdges()
      for (let i = outEdges.iterator(); i.hasNext(); ) {
        const de = i.next()
        const sym = de.getSym()
        if (sym !== null) this.remove(sym)
        this._dirEdges.remove(de)
        const edge = de.getEdge()
        if (edge !== null) 
          this._edges.remove(edge)
        
      }
      this._nodeMap.remove(node.getCoordinate())
      node.remove()
    }
  }
  findNode(pt) {
    return this._nodeMap.find(pt)
  }
  getEdges() {
    return this._edges
  }
  nodeIterator() {
    return this._nodeMap.iterator()
  }
  contains() {
    if (arguments[0] instanceof Edge) {
      const e = arguments[0]
      return this._edges.contains(e)
    } else if (arguments[0] instanceof DirectedEdge) {
      const de = arguments[0]
      return this._dirEdges.contains(de)
    }
  }
  add() {
    if (arguments[0] instanceof Node) {
      const node = arguments[0]
      this._nodeMap.add(node)
    } else if (arguments[0] instanceof Edge) {
      const edge = arguments[0]
      this._edges.add(edge)
      this.add(edge.getDirEdge(0))
      this.add(edge.getDirEdge(1))
    } else if (arguments[0] instanceof DirectedEdge) {
      const dirEdge = arguments[0]
      this._dirEdges.add(dirEdge)
    }
  }
  getNodes() {
    return this._nodeMap.values()
  }
}
