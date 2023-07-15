import Location from '../../geom/Location.js'
import CoordinateList from '../../geom/CoordinateList.js'
import OverlayNG from './OverlayNG.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class LineBuilder {
  constructor() {
    LineBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometryFactory = null
    this._graph = null
    this._opCode = null
    this._inputAreaIndex = null
    this._hasResultArea = null
    this._isAllowMixedResult = !OverlayNG.STRICT_MODE_DEFAULT
    this._isAllowCollapseLines = !OverlayNG.STRICT_MODE_DEFAULT
    this._lines = new ArrayList()
    const inputGeom = arguments[0], graph = arguments[1], hasResultArea = arguments[2], opCode = arguments[3], geomFact = arguments[4]
    this._graph = graph
    this._opCode = opCode
    this._geometryFactory = geomFact
    this._hasResultArea = hasResultArea
    this._inputAreaIndex = inputGeom.getAreaIndex()
  }
  static effectiveLocation(lbl, geomIndex) {
    if (lbl.isCollapse(geomIndex)) return Location.INTERIOR
    if (lbl.isLine(geomIndex)) return Location.INTERIOR
    return lbl.getLineLocation(geomIndex)
  }
  static nextLineEdgeUnvisited(node) {
    let e = node
    do {
      e = e.oNextOE()
      if (e.isVisited()) continue
      if (e.isInResultLine()) 
        return e
      
    } while (e !== node)
    return null
  }
  static degreeOfLines(node) {
    let degree = 0
    let e = node
    do {
      if (e.isInResultLine()) 
        degree++
      
      e = e.oNextOE()
    } while (e !== node)
    return degree
  }
  isResultLine(lbl) {
    if (lbl.isBoundarySingleton()) return false
    if (!this._isAllowCollapseLines && lbl.isBoundaryCollapse()) return false
    if (lbl.isInteriorCollapse()) return false
    if (this._opCode !== OverlayNG.INTERSECTION) {
      if (lbl.isCollapseAndNotPartInterior()) return false
      if (this._hasResultArea && lbl.isLineInArea(this._inputAreaIndex)) return false
    }
    if (this._isAllowMixedResult && this._opCode === OverlayNG.INTERSECTION && lbl.isBoundaryTouch()) 
      return true
    
    const aLoc = LineBuilder.effectiveLocation(lbl, 0)
    const bLoc = LineBuilder.effectiveLocation(lbl, 1)
    const isInResult = OverlayNG.isResultOfOp(this._opCode, aLoc, bLoc)
    return isInResult
  }
  getLines() {
    this.markResultLines()
    this.addResultLines()
    return this._lines
  }
  buildLine(node) {
    const pts = new CoordinateList()
    pts.add(node.orig(), false)
    const isForward = node.isForward()
    let e = node
    do {
      e.markVisitedBoth()
      e.addCoordinates(pts)
      if (LineBuilder.degreeOfLines(e.symOE()) !== 2) 
        break
      
      e = LineBuilder.nextLineEdgeUnvisited(e.symOE())
    } while (e !== null)
    const ptsOut = pts.toCoordinateArray(isForward)
    const line = this._geometryFactory.createLineString(ptsOut)
    return line
  }
  addResultLinesRings() {
    const edges = this._graph.getEdges()
    for (const edge of edges) {
      if (!edge.isInResultLine()) continue
      if (edge.isVisited()) continue
      this._lines.add(this.buildLine(edge))
    }
  }
  addResultLinesForNodes() {
    const edges = this._graph.getEdges()
    for (const edge of edges) {
      if (!edge.isInResultLine()) continue
      if (edge.isVisited()) continue
      if (LineBuilder.degreeOfLines(edge) !== 2) 
        this._lines.add(this.buildLine(edge))
      
    }
  }
  markResultLines() {
    const edges = this._graph.getEdges()
    for (const edge of edges) {
      if (edge.isInResultEither()) continue
      if (this.isResultLine(edge.getLabel())) 
        edge.markInResultLine()
      
    }
  }
  addResultLines() {
    const edges = this._graph.getEdges()
    for (const edge of edges) {
      if (!edge.isInResultLine()) continue
      if (edge.isVisited()) continue
      this._lines.add(this.toLine(edge))
      edge.markVisitedBoth()
    }
  }
  setStrictMode(isStrictResultMode) {
    this._isAllowCollapseLines = !isStrictResultMode
    this._isAllowMixedResult = !isStrictResultMode
  }
  addResultLinesMerged() {
    this.addResultLinesForNodes()
    this.addResultLinesRings()
  }
  toLine(edge) {
    const isForward = edge.isForward()
    const pts = new CoordinateList()
    pts.add(edge.orig(), false)
    edge.addCoordinates(pts)
    const ptsOut = pts.toCoordinateArray(isForward)
    const line = this._geometryFactory.createLineString(ptsOut)
    return line
  }
}
