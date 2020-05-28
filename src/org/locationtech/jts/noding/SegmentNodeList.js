import CoordinateList from '../geom/CoordinateList'
import SegmentNode from './SegmentNode'
import Iterator from '../../../../java/util/Iterator'
import Coordinate from '../geom/Coordinate'
import NodedSegmentString from './NodedSegmentString'
import Integer from '../../../../java/lang/Integer'
import UnsupportedOperationException from '../../../../java/lang/UnsupportedOperationException'
import ArrayList from '../../../../java/util/ArrayList'
import RuntimeException from '../../../../java/lang/RuntimeException'
import Assert from '../util/Assert'
import TreeMap from '../../../../java/util/TreeMap'
export default class SegmentNodeList {
  constructor() {
    SegmentNodeList.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodeMap = new TreeMap()
    this._edge = null
    const edge = arguments[0]
    this._edge = edge
  }
  getSplitCoordinates() {
    const coordList = new CoordinateList()
    this.addEndpoints()
    const it = this.iterator()
    let eiPrev = it.next()
    while (it.hasNext()) {
      const ei = it.next()
      this.addEdgeCoordinates(eiPrev, ei, coordList)
      eiPrev = ei
    }
    return coordList.toCoordinateArray()
  }
  addCollapsedNodes() {
    const collapsedVertexIndexes = new ArrayList()
    this.findCollapsesFromInsertedNodes(collapsedVertexIndexes)
    this.findCollapsesFromExistingVertices(collapsedVertexIndexes)
    for (let it = collapsedVertexIndexes.iterator(); it.hasNext(); ) {
      const vertexIndex = it.next().intValue()
      this.add(this._edge.getCoordinate(vertexIndex), vertexIndex)
    }
  }
  createSplitEdgePts(ei0, ei1) {
    let npts = ei1.segmentIndex - ei0.segmentIndex + 2
    if (npts === 2) return [new Coordinate(ei0.coord), new Coordinate(ei1.coord)]
    const lastSegStartPt = this._edge.getCoordinate(ei1.segmentIndex)
    const useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt)
    if (!useIntPt1) 
      npts--
    
    const pts = new Array(npts).fill(null)
    let ipt = 0
    pts[ipt++] = new Coordinate(ei0.coord)
    for (let i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) 
      pts[ipt++] = this._edge.getCoordinate(i)
    
    if (useIntPt1) pts[ipt] = new Coordinate(ei1.coord)
    return pts
  }
  print(out) {
    out.println('Intersections:')
    for (let it = this.iterator(); it.hasNext(); ) {
      const ei = it.next()
      ei.print(out)
    }
  }
  findCollapsesFromExistingVertices(collapsedVertexIndexes) {
    for (let i = 0; i < this._edge.size() - 2; i++) {
      const p0 = this._edge.getCoordinate(i)
      const p1 = this._edge.getCoordinate(i + 1)
      const p2 = this._edge.getCoordinate(i + 2)
      if (p0.equals2D(p2)) 
        collapsedVertexIndexes.add(Integer.valueOf(i + 1))
      
    }
  }
  addEdgeCoordinates(ei0, ei1, coordList) {
    const pts = this.createSplitEdgePts(ei0, ei1)
    coordList.add(pts, false)
  }
  iterator() {
    return this._nodeMap.values().iterator()
  }
  addSplitEdges(edgeList) {
    this.addEndpoints()
    this.addCollapsedNodes()
    const it = this.iterator()
    let eiPrev = it.next()
    while (it.hasNext()) {
      const ei = it.next()
      const newEdge = this.createSplitEdge(eiPrev, ei)
      edgeList.add(newEdge)
      eiPrev = ei
    }
  }
  findCollapseIndex(ei0, ei1, collapsedVertexIndex) {
    if (!ei0.coord.equals2D(ei1.coord)) return false
    let numVerticesBetween = ei1.segmentIndex - ei0.segmentIndex
    if (!ei1.isInterior()) 
      numVerticesBetween--
    
    if (numVerticesBetween === 1) {
      collapsedVertexIndex[0] = ei0.segmentIndex + 1
      return true
    }
    return false
  }
  findCollapsesFromInsertedNodes(collapsedVertexIndexes) {
    const collapsedVertexIndex = new Array(1).fill(null)
    const it = this.iterator()
    let eiPrev = it.next()
    while (it.hasNext()) {
      const ei = it.next()
      const isCollapsed = this.findCollapseIndex(eiPrev, ei, collapsedVertexIndex)
      if (isCollapsed) collapsedVertexIndexes.add(Integer.valueOf(collapsedVertexIndex[0]))
      eiPrev = ei
    }
  }
  getEdge() {
    return this._edge
  }
  addEndpoints() {
    const maxSegIndex = this._edge.size() - 1
    this.add(this._edge.getCoordinate(0), 0)
    this.add(this._edge.getCoordinate(maxSegIndex), maxSegIndex)
  }
  createSplitEdge(ei0, ei1) {
    const pts = this.createSplitEdgePts(ei0, ei1)
    return new NodedSegmentString(pts, this._edge.getData())
  }
  add(intPt, segmentIndex) {
    const eiNew = new SegmentNode(this._edge, intPt, segmentIndex, this._edge.getSegmentOctant(segmentIndex))
    const ei = this._nodeMap.get(eiNew)
    if (ei !== null) {
      Assert.isTrue(ei.coord.equals2D(intPt), 'Found equal nodes with different coordinates')
      return ei
    }
    this._nodeMap.put(eiNew, eiNew)
    return eiNew
  }
  checkSplitEdgesCorrectness(splitEdges) {
    const edgePts = this._edge.getCoordinates()
    const split0 = splitEdges.get(0)
    const pt0 = split0.getCoordinate(0)
    if (!pt0.equals2D(edgePts[0])) throw new RuntimeException('bad split edge start point at ' + pt0)
    const splitn = splitEdges.get(splitEdges.size() - 1)
    const splitnPts = splitn.getCoordinates()
    const ptn = splitnPts[splitnPts.length - 1]
    if (!ptn.equals2D(edgePts[edgePts.length - 1])) throw new RuntimeException('bad split edge end point at ' + ptn)
  }
}
class NodeVertexIterator {
  constructor() {
    NodeVertexIterator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodeList = null
    this._edge = null
    this._nodeIt = null
    this._currNode = null
    this._nextNode = null
    this._currSegIndex = 0
    const nodeList = arguments[0]
    this._nodeList = nodeList
    this._edge = nodeList.getEdge()
    this._nodeIt = nodeList.iterator()
    this.readNextNode()
  }
  next() {
    if (this._currNode === null) {
      this._currNode = this._nextNode
      this._currSegIndex = this._currNode.segmentIndex
      this.readNextNode()
      return this._currNode
    }
    if (this._nextNode === null) return null
    if (this._nextNode.segmentIndex === this._currNode.segmentIndex) {
      this._currNode = this._nextNode
      this._currSegIndex = this._currNode.segmentIndex
      this.readNextNode()
      return this._currNode
    }
    if (this._nextNode.segmentIndex > this._currNode.segmentIndex) {}
    return null
  }
  remove() {
    throw new UnsupportedOperationException(this.getClass().getName())
  }
  hasNext() {
    if (this._nextNode === null) return false
    return true
  }
  readNextNode() {
    if (this._nodeIt.hasNext()) this._nextNode = this._nodeIt.next(); else this._nextNode = null
  }
  get interfaces_() {
    return [Iterator]
  }
}
