import Location from '../../geom/Location.js'
import ArrayDeque from '../../../../../java/util/ArrayDeque.js'
import WKTWriter from '../../io/WKTWriter.js'
import Position from '../../geom/Position.js'
import OverlayNG from './OverlayNG.js'
import TopologyException from '../../geom/TopologyException.js'
import OverlayEdge from './OverlayEdge.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import Assert from '../../util/Assert.js'
import StringBuilder from '../../../../../java/lang/StringBuilder.js'
export default class OverlayLabeller {
  constructor() {
    OverlayLabeller.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._graph = null
    this._inputGeometry = null
    this._edges = null
    const graph = arguments[0], inputGeometry = arguments[1]
    this._graph = graph
    this._inputGeometry = inputGeometry
    this._edges = graph.getEdges()
  }
  static findPropagationStartEdge(nodeEdge, geomIndex) {
    let eStart = nodeEdge
    do {
      const label = eStart.getLabel()
      if (label.isBoundary(geomIndex)) {
        Assert.isTrue(label.hasSides(geomIndex))
        return eStart
      }
      eStart = eStart.oNext()
    } while (eStart !== nodeEdge)
    return null
  }
  static propagateLinearLocationAtNode(eNode, geomIndex, isInputLine, edgeStack) {
    const lineLoc = eNode.getLabel().getLineLocation(geomIndex)
    if (isInputLine && lineLoc !== Location.EXTERIOR) return null
    let e = eNode.oNextOE()
    do {
      const label = e.getLabel()
      if (label.isLineLocationUnknown(geomIndex)) {
        label.setLocationLine(geomIndex, lineLoc)
        edgeStack.addFirst(e.symOE())
      }
      e = e.oNextOE()
    } while (e !== eNode)
  }
  static findLinearEdgesWithLocation(edges, geomIndex) {
    const linearEdges = new ArrayList()
    for (const edge of edges) {
      const lbl = edge.getLabel()
      if (lbl.isLinear(geomIndex) && !lbl.isLineLocationUnknown(geomIndex)) 
        linearEdges.add(edge)
      
    }
    return linearEdges
  }
  static toString() {
    if (arguments.length === 1 && arguments[0] instanceof OverlayEdge) {
      const nodeEdge = arguments[0]
      const orig = nodeEdge.orig()
      const sb = new StringBuilder()
      sb.append('Node( ' + WKTWriter.format(orig) + ' )' + '\n')
      let e = nodeEdge
      do {
        sb.append('  -> ' + e)
        if (e.isResultLinked()) {
          sb.append(' Link: ')
          sb.append(e.nextResult())
        }
        sb.append('\n')
        e = e.oNextOE()
      } while (e !== nodeEdge)
      return sb.toString()
    }
  }
  markInResultArea(e, overlayOpCode) {
    const label = e.getLabel()
    if (label.isBoundaryEither() && OverlayNG.isResultOfOp(overlayOpCode, label.getLocationBoundaryOrLine(0, Position.RIGHT, e.isForward()), label.getLocationBoundaryOrLine(1, Position.RIGHT, e.isForward()))) 
      e.markInResultArea()
    
  }
  locateEdgeBothEnds(geomIndex, edge) {
    const locOrig = this._inputGeometry.locatePointInArea(geomIndex, edge.orig())
    const locDest = this._inputGeometry.locatePointInArea(geomIndex, edge.dest())
    const isInt = locOrig !== Location.EXTERIOR && locDest !== Location.EXTERIOR
    const edgeLoc = isInt ? Location.INTERIOR : Location.EXTERIOR
    return edgeLoc
  }
  labelAreaNodeEdges(nodes) {
    for (const nodeEdge of nodes) {
      this.propagateAreaLocations(nodeEdge, 0)
      if (this._inputGeometry.hasEdges(1)) 
        this.propagateAreaLocations(nodeEdge, 1)
      
    }
  }
  labelCollapsedEdges() {
    for (const edge of this._edges) {
      if (edge.getLabel().isLineLocationUnknown(0)) 
        this.labelCollapsedEdge(edge, 0)
      
      if (edge.getLabel().isLineLocationUnknown(1)) 
        this.labelCollapsedEdge(edge, 1)
      
    }
  }
  labelCollapsedEdge(edge, geomIndex) {
    const label = edge.getLabel()
    if (!label.isCollapse(geomIndex)) return null
    label.setLocationCollapse(geomIndex)
  }
  propagateLinearLocations(geomIndex) {
    const linearEdges = OverlayLabeller.findLinearEdgesWithLocation(this._edges, geomIndex)
    if (linearEdges.size() <= 0) return null
    const edgeStack = new ArrayDeque(linearEdges)
    const isInputLine = this._inputGeometry.isLine(geomIndex)
    while (!edgeStack.isEmpty()) {
      const lineEdge = edgeStack.removeFirst()
      OverlayLabeller.propagateLinearLocationAtNode(lineEdge, geomIndex, isInputLine, edgeStack)
    }
  }
  propagateAreaLocations(nodeEdge, geomIndex) {
    if (!this._inputGeometry.isArea(geomIndex)) return null
    if (nodeEdge.degree() === 1) return null
    const eStart = OverlayLabeller.findPropagationStartEdge(nodeEdge, geomIndex)
    if (eStart === null) return null
    let currLoc = eStart.getLocation(geomIndex, Position.LEFT)
    let e = eStart.oNextOE()
    do {
      const label = e.getLabel()
      if (!label.isBoundary(geomIndex)) {
        label.setLocationLine(geomIndex, currLoc)
      } else {
        Assert.isTrue(label.hasSides(geomIndex))
        const locRight = e.getLocation(geomIndex, Position.RIGHT)
        if (locRight !== currLoc) 
          throw new TopologyException('side location conflict: arg ' + geomIndex, e.getCoordinate())
        
        const locLeft = e.getLocation(geomIndex, Position.LEFT)
        if (locLeft === Location.NONE) 
          Assert.shouldNeverReachHere('found single null side at ' + e)
        
        currLoc = locLeft
      }
      e = e.oNextOE()
    } while (e !== eStart)
  }
  labelDisconnectedEdges() {
    for (const edge of this._edges) {
      if (edge.getLabel().isLineLocationUnknown(0)) 
        this.labelDisconnectedEdge(edge, 0)
      
      if (edge.getLabel().isLineLocationUnknown(1)) 
        this.labelDisconnectedEdge(edge, 1)
      
    }
  }
  unmarkDuplicateEdgesFromResultArea() {
    for (const edge of this._edges) 
      if (edge.isInResultAreaBoth()) 
        edge.unmarkFromResultAreaBoth()
      
    
  }
  locateEdge(geomIndex, edge) {
    const loc = this._inputGeometry.locatePointInArea(geomIndex, edge.orig())
    const edgeLoc = loc !== Location.EXTERIOR ? Location.INTERIOR : Location.EXTERIOR
    return edgeLoc
  }
  labelConnectedLinearEdges() {
    this.propagateLinearLocations(0)
    if (this._inputGeometry.hasEdges(1)) 
      this.propagateLinearLocations(1)
    
  }
  labelDisconnectedEdge(edge, geomIndex) {
    const label = edge.getLabel()
    if (!this._inputGeometry.isArea(geomIndex)) {
      label.setLocationAll(geomIndex, Location.EXTERIOR)
      return null
    }
    
    const edgeLoc = this.locateEdgeBothEnds(geomIndex, edge)
    label.setLocationAll(geomIndex, edgeLoc)
  }
  markResultAreaEdges(overlayOpCode) {
    for (const edge of this._edges) 
      this.markInResultArea(edge, overlayOpCode)
    
  }
  computeLabelling() {
    const nodes = this._graph.getNodeEdges()
    this.labelAreaNodeEdges(nodes)
    this.labelConnectedLinearEdges()
    this.labelCollapsedEdges()
    this.labelConnectedLinearEdges()
    this.labelDisconnectedEdges()
  }
}
