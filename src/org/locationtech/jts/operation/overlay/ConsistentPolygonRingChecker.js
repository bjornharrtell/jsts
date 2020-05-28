import Position from '../../geomgraph/Position'
import TopologyException from '../../geom/TopologyException'
import ArrayList from '../../../../../java/util/ArrayList'
import OverlayOp from './OverlayOp'
export default class ConsistentPolygonRingChecker {
  constructor() {
    ConsistentPolygonRingChecker.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._graph = null
    this._SCANNING_FOR_INCOMING = 1
    this._LINKING_TO_OUTGOING = 2
    const graph = arguments[0]
    this._graph = graph
  }
  testLinkResultDirectedEdges(deStar, opCode) {
    const ringEdges = this.getPotentialResultAreaEdges(deStar, opCode)
    let firstOut = null
    let incoming = null
    let state = this._SCANNING_FOR_INCOMING
    for (let i = 0; i < ringEdges.size(); i++) {
      const nextOut = ringEdges.get(i)
      const nextIn = nextOut.getSym()
      if (!nextOut.getLabel().isArea()) continue
      if (firstOut === null && this.isPotentialResultAreaEdge(nextOut, opCode)) firstOut = nextOut
      switch (state) {
      case this._SCANNING_FOR_INCOMING:
        if (!this.isPotentialResultAreaEdge(nextIn, opCode)) continue
        incoming = nextIn
        state = this._LINKING_TO_OUTGOING
        break
      case this._LINKING_TO_OUTGOING:
        if (!this.isPotentialResultAreaEdge(nextOut, opCode)) continue
        state = this._SCANNING_FOR_INCOMING
        break
      }
    }
    if (state === this._LINKING_TO_OUTGOING) 
      if (firstOut === null) throw new TopologyException('no outgoing dirEdge found', deStar.getCoordinate())
    
  }
  getPotentialResultAreaEdges(deStar, opCode) {
    const resultAreaEdgeList = new ArrayList()
    for (let it = deStar.iterator(); it.hasNext(); ) {
      const de = it.next()
      if (this.isPotentialResultAreaEdge(de, opCode) || this.isPotentialResultAreaEdge(de.getSym(), opCode)) resultAreaEdgeList.add(de)
    }
    return resultAreaEdgeList
  }
  checkAll() {
    this.check(OverlayOp.INTERSECTION)
    this.check(OverlayOp.DIFFERENCE)
    this.check(OverlayOp.UNION)
    this.check(OverlayOp.SYMDIFFERENCE)
  }
  check(opCode) {
    for (let nodeit = this._graph.getNodeIterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      this.testLinkResultDirectedEdges(node.getEdges(), opCode)
    }
  }
  isPotentialResultAreaEdge(de, opCode) {
    const label = de.getLabel()
    if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) 
      return true
    
    return false
  }
}
