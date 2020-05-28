import HashMap from '../../../../java/util/HashMap'
import HalfEdge from './HalfEdge'
export default class EdgeGraph {
  constructor() {
    EdgeGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._vertexMap = new HashMap()
  }
  static isValidEdge(orig, dest) {
    const cmp = dest.compareTo(orig)
    return cmp !== 0
  }
  insert(orig, dest, eAdj) {
    const e = this.create(orig, dest)
    if (eAdj !== null) 
      eAdj.insert(e)
    else 
      this._vertexMap.put(orig, e)
    
    const eAdjDest = this._vertexMap.get(dest)
    if (eAdjDest !== null) 
      eAdjDest.insert(e.sym())
    else 
      this._vertexMap.put(dest, e.sym())
    
    return e
  }
  create(p0, p1) {
    const e0 = this.createEdge(p0)
    const e1 = this.createEdge(p1)
    e0.link(e1)
    return e0
  }
  createEdge(orig) {
    return new HalfEdge(orig)
  }
  addEdge(orig, dest) {
    if (!EdgeGraph.isValidEdge(orig, dest)) return null
    const eAdj = this._vertexMap.get(orig)
    let eSame = null
    if (eAdj !== null) 
      eSame = eAdj.find(dest)
    
    if (eSame !== null) 
      return eSame
    
    const e = this.insert(orig, dest, eAdj)
    return e
  }
  getVertexEdges() {
    return this._vertexMap.values()
  }
  findEdge(orig, dest) {
    const e = this._vertexMap.get(orig)
    if (e === null) return null
    return e.find(dest)
  }
}
