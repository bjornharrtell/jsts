import CoordinateList from '../../geom/CoordinateList.js'
import WKTWriter from '../../io/WKTWriter.js'
import TopologyException from '../../geom/TopologyException.js'
import OverlayEdgeRing from './OverlayEdgeRing.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import Assert from '../../util/Assert.js'
export default class MaximalEdgeRing {
  constructor() {
    MaximalEdgeRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._startEdge = null
    const e = arguments[0]
    this._startEdge = e
    this.attachEdges(e)
  }
  static isAlreadyLinked(edge, maxRing) {
    const isLinked = edge.getEdgeRingMax() === maxRing && edge.isResultLinked()
    return isLinked
  }
  static linkMaxInEdge(currOut, currMaxRingOut, maxEdgeRing) {
    const currIn = currOut.symOE()
    if (currIn.getEdgeRingMax() !== maxEdgeRing) return currMaxRingOut
    currIn.setNextResult(currMaxRingOut)
    return null
  }
  static linkResultAreaMaxRingAtNode(nodeEdge) {
    Assert.isTrue(nodeEdge.isInResultArea(), 'Attempt to link non-result edge')
    const endOut = nodeEdge.oNextOE()
    let currOut = endOut
    let state = MaximalEdgeRing.STATE_FIND_INCOMING
    let currResultIn = null
    do {
      if (currResultIn !== null && currResultIn.isResultMaxLinked()) return null
      switch (state) {
      case MaximalEdgeRing.STATE_FIND_INCOMING:
        const currIn = currOut.symOE()
        if (!currIn.isInResultArea()) break
        currResultIn = currIn
        state = MaximalEdgeRing.STATE_LINK_OUTGOING
        break
      case MaximalEdgeRing.STATE_LINK_OUTGOING:
        if (!currOut.isInResultArea()) break
        currResultIn.setNextResultMax(currOut)
        state = MaximalEdgeRing.STATE_FIND_INCOMING
        break
      }
      currOut = currOut.oNextOE()
    } while (currOut !== endOut)
    if (state === MaximalEdgeRing.STATE_LINK_OUTGOING) 
      throw new TopologyException('no outgoing edge found', nodeEdge.getCoordinate())
    
  }
  static linkMinRingEdgesAtNode(nodeEdge, maxRing) {
    const endOut = nodeEdge
    let currMaxRingOut = endOut
    let currOut = endOut.oNextOE()
    do {
      if (MaximalEdgeRing.isAlreadyLinked(currOut.symOE(), maxRing)) return null
      if (currMaxRingOut === null) 
        currMaxRingOut = MaximalEdgeRing.selectMaxOutEdge(currOut, maxRing)
      else 
        currMaxRingOut = MaximalEdgeRing.linkMaxInEdge(currOut, currMaxRingOut, maxRing)
      
      currOut = currOut.oNextOE()
    } while (currOut !== endOut)
    if (currMaxRingOut !== null) 
      throw new TopologyException('Unmatched edge found during min-ring linking', nodeEdge.getCoordinate())
    
  }
  static selectMaxOutEdge(currOut, maxEdgeRing) {
    if (currOut.getEdgeRingMax() === maxEdgeRing) return currOut
    return null
  }
  getCoordinates() {
    const coords = new CoordinateList()
    let edge = this._startEdge
    do {
      coords.add(edge.orig())
      if (edge.nextResultMax() === null) 
        break
      
      edge = edge.nextResultMax()
    } while (edge !== this._startEdge)
    coords.add(edge.dest())
    return coords.toCoordinateArray()
  }
  linkMinimalRings() {
    let e = this._startEdge
    do {
      MaximalEdgeRing.linkMinRingEdgesAtNode(e, this)
      e = e.nextResultMax()
    } while (e !== this._startEdge)
  }
  buildMinimalRings(geometryFactory) {
    this.linkMinimalRings()
    const minEdgeRings = new ArrayList()
    let e = this._startEdge
    do {
      if (e.getEdgeRing() === null) {
        const minEr = new OverlayEdgeRing(e, geometryFactory)
        minEdgeRings.add(minEr)
      }
      e = e.nextResultMax()
    } while (e !== this._startEdge)
    return minEdgeRings
  }
  attachEdges(startEdge) {
    let edge = startEdge
    do {
      if (edge === null) throw new TopologyException('Ring edge is null')
      if (edge.getEdgeRingMax() === this) throw new TopologyException('Ring edge visited twice at ' + edge.getCoordinate(), edge.getCoordinate())
      if (edge.nextResultMax() === null) 
        throw new TopologyException('Ring edge missing at', edge.dest())
      
      edge.setEdgeRingMax(this)
      edge = edge.nextResultMax()
    } while (edge !== startEdge)
  }
  toString() {
    const pts = this.getCoordinates()
    return WKTWriter.toLineString(pts)
  }
}
MaximalEdgeRing.STATE_FIND_INCOMING = 1
MaximalEdgeRing.STATE_LINK_OUTGOING = 2
