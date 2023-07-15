import HashMap from '../../../../../java/util/HashMap.js'
import OverlayEdge from './OverlayEdge.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class OverlayGraph {
  constructor() {
    OverlayGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edges = new ArrayList()
    this._nodeMap = new HashMap()
  }
  getNodeEdge(nodePt) {
    return this._nodeMap.get(nodePt)
  }
  insert(e) {
    this._edges.add(e)
    const nodeEdge = this._nodeMap.get(e.orig())
    if (nodeEdge !== null) 
      nodeEdge.insert(e)
    else 
      this._nodeMap.put(e.orig(), e)
    
  }
  getResultAreaEdges() {
    const resultEdges = new ArrayList()
    for (const edge of this.getEdges()) 
      if (edge.isInResultArea()) 
        resultEdges.add(edge)
      
    
    return resultEdges
  }
  addEdge(pts, label) {
    const e = OverlayEdge.createEdgePair(pts, label)
    this.insert(e)
    this.insert(e.symOE())
    return e
  }
  getEdges() {
    return this._edges
  }
  getNodeEdges() {
    return this._nodeMap.values()
  }
}
