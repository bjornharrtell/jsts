import QuadEdgeLocator from './QuadEdgeLocator'
export default class LastFoundQuadEdgeLocator {
  constructor() {
    LastFoundQuadEdgeLocator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._subdiv = null
    this._lastEdge = null
    const subdiv = arguments[0]
    this._subdiv = subdiv
    this.init()
  }
  init() {
    this._lastEdge = this.findEdge()
  }
  locate(v) {
    if (!this._lastEdge.isLive()) 
      this.init()
    
    const e = this._subdiv.locateFromEdge(v, this._lastEdge)
    this._lastEdge = e
    return e
  }
  findEdge() {
    const edges = this._subdiv.getEdges()
    return edges.iterator().next()
  }
  get interfaces_() {
    return [QuadEdgeLocator]
  }
}
