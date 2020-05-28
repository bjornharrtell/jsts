import HashSet from '../../../../java/util/HashSet'
import NodeMap from './NodeMap'
import ArrayList from '../../../../java/util/ArrayList'
export default class Subgraph {
  constructor() {
    Subgraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._parentGraph = null
    this._edges = new HashSet()
    this._dirEdges = new ArrayList()
    this._nodeMap = new NodeMap()
    const parentGraph = arguments[0]
    this._parentGraph = parentGraph
  }
  dirEdgeIterator() {
    return this._dirEdges.iterator()
  }
  edgeIterator() {
    return this._edges.iterator()
  }
  getParent() {
    return this._parentGraph
  }
  nodeIterator() {
    return this._nodeMap.iterator()
  }
  contains(e) {
    return this._edges.contains(e)
  }
  add(e) {
    if (this._edges.contains(e)) return null
    this._edges.add(e)
    this._dirEdges.add(e.getDirEdge(0))
    this._dirEdges.add(e.getDirEdge(1))
    this._nodeMap.add(e.getDirEdge(0).getFromNode())
    this._nodeMap.add(e.getDirEdge(1).getFromNode())
  }
}
