import OverlayNG from './OverlayNG.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class IntersectionPointBuilder {
  constructor() {
    IntersectionPointBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometryFactory = null
    this._graph = null
    this._points = new ArrayList()
    this._isAllowCollapseLines = !OverlayNG.STRICT_MODE_DEFAULT
    const graph = arguments[0], geomFact = arguments[1]
    this._graph = graph
    this._geometryFactory = geomFact
  }
  getPoints() {
    this.addResultPoints()
    return this._points
  }
  addResultPoints() {
    for (const nodeEdge of this._graph.getNodeEdges()) 
      if (this.isResultPoint(nodeEdge)) {
        const pt = this._geometryFactory.createPoint(nodeEdge.getCoordinate().copy())
        this._points.add(pt)
      }
    
  }
  isEdgeOf(label, i) {
    if (!this._isAllowCollapseLines && label.isBoundaryCollapse()) return false
    return label.isBoundary(i) || label.isLine(i)
  }
  isResultPoint(nodeEdge) {
    let isEdgeOfA = false
    let isEdgeOfB = false
    let edge = nodeEdge
    do {
      if (edge.isInResult()) return false
      const label = edge.getLabel()
      isEdgeOfA |= this.isEdgeOf(label, 0)
      isEdgeOfB |= this.isEdgeOf(label, 1)
      edge = edge.oNext()
    } while (edge !== nodeEdge)
    const isNodeInBoth = isEdgeOfA && isEdgeOfB
    return isNodeInBoth
  }
  setStrictMode(isStrictMode) {
    this._isAllowCollapseLines = !isStrictMode
  }
}
