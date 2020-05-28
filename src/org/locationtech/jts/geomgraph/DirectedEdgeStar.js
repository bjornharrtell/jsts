import Location from '../geom/Location'
import Position from './Position'
import TopologyException from '../geom/TopologyException'
import EdgeEndStar from './EdgeEndStar'
import System from '../../../../java/lang/System'
import Label from './Label'
import ArrayList from '../../../../java/util/ArrayList'
import Quadrant from './Quadrant'
import Assert from '../util/Assert'
export default class DirectedEdgeStar extends EdgeEndStar {
  constructor() {
    super()
    DirectedEdgeStar.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._resultAreaEdgeList = null
    this._label = null
    this._SCANNING_FOR_INCOMING = 1
    this._LINKING_TO_OUTGOING = 2
  }
  linkResultDirectedEdges() {
    this.getResultAreaEdges()
    let firstOut = null
    let incoming = null
    let state = this._SCANNING_FOR_INCOMING
    for (let i = 0; i < this._resultAreaEdgeList.size(); i++) {
      const nextOut = this._resultAreaEdgeList.get(i)
      const nextIn = nextOut.getSym()
      if (!nextOut.getLabel().isArea()) continue
      if (firstOut === null && nextOut.isInResult()) firstOut = nextOut
      switch (state) {
      case this._SCANNING_FOR_INCOMING:
        if (!nextIn.isInResult()) continue
        incoming = nextIn
        state = this._LINKING_TO_OUTGOING
        break
      case this._LINKING_TO_OUTGOING:
        if (!nextOut.isInResult()) continue
        incoming.setNext(nextOut)
        state = this._SCANNING_FOR_INCOMING
        break
      }
    }
    if (state === this._LINKING_TO_OUTGOING) {
      if (firstOut === null) throw new TopologyException('no outgoing dirEdge found', this.getCoordinate())
      Assert.isTrue(firstOut.isInResult(), 'unable to link last incoming dirEdge')
      incoming.setNext(firstOut)
    }
  }
  insert(ee) {
    const de = ee
    this.insertEdgeEnd(de, de)
  }
  getRightmostEdge() {
    const edges = this.getEdges()
    const size = edges.size()
    if (size < 1) return null
    const de0 = edges.get(0)
    if (size === 1) return de0
    const deLast = edges.get(size - 1)
    const quad0 = de0.getQuadrant()
    const quad1 = deLast.getQuadrant()
    if (Quadrant.isNorthern(quad0) && Quadrant.isNorthern(quad1)) {
      return de0
    } else if (!Quadrant.isNorthern(quad0) && !Quadrant.isNorthern(quad1)) {
      return deLast
    } else {
      const nonHorizontalEdge = null
      if (de0.getDy() !== 0) return de0; else if (deLast.getDy() !== 0) return deLast
    }
    Assert.shouldNeverReachHere('found two horizontal edges incident on node')
    return null
  }
  print(out) {
    System.out.println('DirectedEdgeStar: ' + this.getCoordinate())
    for (let it = this.iterator(); it.hasNext(); ) {
      const de = it.next()
      out.print('out ')
      de.print(out)
      out.println()
      out.print('in ')
      de.getSym().print(out)
      out.println()
    }
  }
  getResultAreaEdges() {
    if (this._resultAreaEdgeList !== null) return this._resultAreaEdgeList
    this._resultAreaEdgeList = new ArrayList()
    for (let it = this.iterator(); it.hasNext(); ) {
      const de = it.next()
      if (de.isInResult() || de.getSym().isInResult()) this._resultAreaEdgeList.add(de)
    }
    return this._resultAreaEdgeList
  }
  updateLabelling(nodeLabel) {
    for (let it = this.iterator(); it.hasNext(); ) {
      const de = it.next()
      const label = de.getLabel()
      label.setAllLocationsIfNull(0, nodeLabel.getLocation(0))
      label.setAllLocationsIfNull(1, nodeLabel.getLocation(1))
    }
  }
  linkAllDirectedEdges() {
    this.getEdges()
    let prevOut = null
    let firstIn = null
    for (let i = this._edgeList.size() - 1; i >= 0; i--) {
      const nextOut = this._edgeList.get(i)
      const nextIn = nextOut.getSym()
      if (firstIn === null) firstIn = nextIn
      if (prevOut !== null) nextIn.setNext(prevOut)
      prevOut = nextOut
    }
    firstIn.setNext(prevOut)
  }
  computeDepths() {
    if (arguments.length === 1) {
      const de = arguments[0]
      const edgeIndex = this.findIndex(de)
      const startDepth = de.getDepth(Position.LEFT)
      const targetLastDepth = de.getDepth(Position.RIGHT)
      const nextDepth = this.computeDepths(edgeIndex + 1, this._edgeList.size(), startDepth)
      const lastDepth = this.computeDepths(0, edgeIndex, nextDepth)
      if (lastDepth !== targetLastDepth) throw new TopologyException('depth mismatch at ' + de.getCoordinate())
    } else if (arguments.length === 3) {
      const startIndex = arguments[0], endIndex = arguments[1], startDepth = arguments[2]
      let currDepth = startDepth
      for (let i = startIndex; i < endIndex; i++) {
        const nextDe = this._edgeList.get(i)
        nextDe.setEdgeDepths(Position.RIGHT, currDepth)
        currDepth = nextDe.getDepth(Position.LEFT)
      }
      return currDepth
    }
  }
  mergeSymLabels() {
    for (let it = this.iterator(); it.hasNext(); ) {
      const de = it.next()
      const label = de.getLabel()
      label.merge(de.getSym().getLabel())
    }
  }
  linkMinimalDirectedEdges(er) {
    let firstOut = null
    let incoming = null
    let state = this._SCANNING_FOR_INCOMING
    for (let i = this._resultAreaEdgeList.size() - 1; i >= 0; i--) {
      const nextOut = this._resultAreaEdgeList.get(i)
      const nextIn = nextOut.getSym()
      if (firstOut === null && nextOut.getEdgeRing() === er) firstOut = nextOut
      switch (state) {
      case this._SCANNING_FOR_INCOMING:
        if (nextIn.getEdgeRing() !== er) continue
        incoming = nextIn
        state = this._LINKING_TO_OUTGOING
        break
      case this._LINKING_TO_OUTGOING:
        if (nextOut.getEdgeRing() !== er) continue
        incoming.setNextMin(nextOut)
        state = this._SCANNING_FOR_INCOMING
        break
      }
    }
    if (state === this._LINKING_TO_OUTGOING) {
      Assert.isTrue(firstOut !== null, 'found null for first outgoing dirEdge')
      Assert.isTrue(firstOut.getEdgeRing() === er, 'unable to link last incoming dirEdge')
      incoming.setNextMin(firstOut)
    }
  }
  getOutgoingDegree() {
    if (arguments.length === 0) {
      let degree = 0
      for (let it = this.iterator(); it.hasNext(); ) {
        const de = it.next()
        if (de.isInResult()) degree++
      }
      return degree
    } else if (arguments.length === 1) {
      const er = arguments[0]
      let degree = 0
      for (let it = this.iterator(); it.hasNext(); ) {
        const de = it.next()
        if (de.getEdgeRing() === er) degree++
      }
      return degree
    }
  }
  getLabel() {
    return this._label
  }
  findCoveredLineEdges() {
    let startLoc = Location.NONE
    for (let it = this.iterator(); it.hasNext(); ) {
      const nextOut = it.next()
      const nextIn = nextOut.getSym()
      if (!nextOut.isLineEdge()) {
        if (nextOut.isInResult()) {
          startLoc = Location.INTERIOR
          break
        }
        if (nextIn.isInResult()) {
          startLoc = Location.EXTERIOR
          break
        }
      }
    }
    if (startLoc === Location.NONE) return null
    let currLoc = startLoc
    for (let it = this.iterator(); it.hasNext(); ) {
      const nextOut = it.next()
      const nextIn = nextOut.getSym()
      if (nextOut.isLineEdge()) {
        nextOut.getEdge().setCovered(currLoc === Location.INTERIOR)
      } else {
        if (nextOut.isInResult()) currLoc = Location.EXTERIOR
        if (nextIn.isInResult()) currLoc = Location.INTERIOR
      }
    }
  }
  computeLabelling(geom) {
    super.computeLabelling.call(this, geom)
    this._label = new Label(Location.NONE)
    for (let it = this.iterator(); it.hasNext(); ) {
      const ee = it.next()
      const e = ee.getEdge()
      const eLabel = e.getLabel()
      for (let i = 0; i < 2; i++) {
        const eLoc = eLabel.getLocation(i)
        if (eLoc === Location.INTERIOR || eLoc === Location.BOUNDARY) this._label.setLocation(i, Location.INTERIOR)
      }
    }
  }
}
