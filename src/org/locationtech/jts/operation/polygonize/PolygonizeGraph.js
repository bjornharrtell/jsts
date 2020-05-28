import PolygonizeDirectedEdge from './PolygonizeDirectedEdge'
import HashSet from '../../../../../java/util/HashSet'
import Stack from '../../../../../java/util/Stack'
import Node from '../../planargraph/Node'
import PolygonizeEdge from './PolygonizeEdge'
import EdgeRing from './EdgeRing'
import CoordinateArrays from '../../geom/CoordinateArrays'
import ArrayList from '../../../../../java/util/ArrayList'
import Assert from '../../util/Assert'
import PlanarGraph from '../../planargraph/PlanarGraph'
export default class PolygonizeGraph extends PlanarGraph {
  constructor() {
    super()
    PolygonizeGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._factory = null
    const factory = arguments[0]
    this._factory = factory
  }
  static findLabeledEdgeRings(dirEdges) {
    const edgeRingStarts = new ArrayList()
    let currLabel = 1
    for (let i = dirEdges.iterator(); i.hasNext(); ) {
      const de = i.next()
      if (de.isMarked()) continue
      if (de.getLabel() >= 0) continue
      edgeRingStarts.add(de)
      const edges = EdgeRing.findDirEdgesInRing(de)
      PolygonizeGraph.label(edges, currLabel)
      currLabel++
    }
    return edgeRingStarts
  }
  static getDegreeNonDeleted(node) {
    const edges = node.getOutEdges().getEdges()
    let degree = 0
    for (let i = edges.iterator(); i.hasNext(); ) {
      const de = i.next()
      if (!de.isMarked()) degree++
    }
    return degree
  }
  static deleteAllEdges(node) {
    const edges = node.getOutEdges().getEdges()
    for (let i = edges.iterator(); i.hasNext(); ) {
      const de = i.next()
      de.setMarked(true)
      const sym = de.getSym()
      if (sym !== null) sym.setMarked(true)
    }
  }
  static label(dirEdges, label) {
    for (let i = dirEdges.iterator(); i.hasNext(); ) {
      const de = i.next()
      de.setLabel(label)
    }
  }
  static computeNextCWEdges(node) {
    const deStar = node.getOutEdges()
    let startDE = null
    let prevDE = null
    for (let i = deStar.getEdges().iterator(); i.hasNext(); ) {
      const outDE = i.next()
      if (outDE.isMarked()) continue
      if (startDE === null) startDE = outDE
      if (prevDE !== null) {
        const sym = prevDE.getSym()
        sym.setNext(outDE)
      }
      prevDE = outDE
    }
    if (prevDE !== null) {
      const sym = prevDE.getSym()
      sym.setNext(startDE)
    }
  }
  static computeNextCCWEdges(node, label) {
    const deStar = node.getOutEdges()
    let firstOutDE = null
    let prevInDE = null
    const edges = deStar.getEdges()
    for (let i = edges.size() - 1; i >= 0; i--) {
      const de = edges.get(i)
      const sym = de.getSym()
      let outDE = null
      if (de.getLabel() === label) outDE = de
      let inDE = null
      if (sym.getLabel() === label) inDE = sym
      if (outDE === null && inDE === null) continue
      if (inDE !== null) 
        prevInDE = inDE
      
      if (outDE !== null) {
        if (prevInDE !== null) {
          prevInDE.setNext(outDE)
          prevInDE = null
        }
        if (firstOutDE === null) firstOutDE = outDE
      }
    }
    if (prevInDE !== null) {
      Assert.isTrue(firstOutDE !== null)
      prevInDE.setNext(firstOutDE)
    }
  }
  static getDegree(node, label) {
    const edges = node.getOutEdges().getEdges()
    let degree = 0
    for (let i = edges.iterator(); i.hasNext(); ) {
      const de = i.next()
      if (de.getLabel() === label) degree++
    }
    return degree
  }
  static findIntersectionNodes(startDE, label) {
    let de = startDE
    let intNodes = null
    do {
      const node = de.getFromNode()
      if (PolygonizeGraph.getDegree(node, label) > 1) {
        if (intNodes === null) intNodes = new ArrayList()
        intNodes.add(node)
      }
      de = de.getNext()
      Assert.isTrue(de !== null, 'found null DE in ring')
      Assert.isTrue(de === startDE || !de.isInRing(), 'found DE already in ring')
    } while (de !== startDE)
    return intNodes
  }
  findEdgeRing(startDE) {
    const er = new EdgeRing(this._factory)
    er.build(startDE)
    return er
  }
  computeDepthParity() {
    if (arguments.length === 0) {
      while (true) {
        const de = null
        if (de === null) return null
        this.computeDepthParity(de)
      }
    } else if (arguments.length === 1) {
      const de = arguments[0]
    }
  }
  computeNextCWEdges() {
    for (let iNode = this.nodeIterator(); iNode.hasNext(); ) {
      const node = iNode.next()
      PolygonizeGraph.computeNextCWEdges(node)
    }
  }
  addEdge(line) {
    if (line.isEmpty()) 
      return null
    
    const linePts = CoordinateArrays.removeRepeatedPoints(line.getCoordinates())
    if (linePts.length < 2) 
      return null
    
    const startPt = linePts[0]
    const endPt = linePts[linePts.length - 1]
    const nStart = this.getNode(startPt)
    const nEnd = this.getNode(endPt)
    const de0 = new PolygonizeDirectedEdge(nStart, nEnd, linePts[1], true)
    const de1 = new PolygonizeDirectedEdge(nEnd, nStart, linePts[linePts.length - 2], false)
    const edge = new PolygonizeEdge(line)
    edge.setDirectedEdges(de0, de1)
    this.add(edge)
  }
  deleteCutEdges() {
    this.computeNextCWEdges()
    PolygonizeGraph.findLabeledEdgeRings(this._dirEdges)
    const cutLines = new ArrayList()
    for (let i = this._dirEdges.iterator(); i.hasNext(); ) {
      const de = i.next()
      if (de.isMarked()) continue
      const sym = de.getSym()
      if (de.getLabel() === sym.getLabel()) {
        de.setMarked(true)
        sym.setMarked(true)
        const e = de.getEdge()
        cutLines.add(e.getLine())
      }
    }
    return cutLines
  }
  getEdgeRings() {
    this.computeNextCWEdges()
    PolygonizeGraph.label(this._dirEdges, -1)
    const maximalRings = PolygonizeGraph.findLabeledEdgeRings(this._dirEdges)
    this.convertMaximalToMinimalEdgeRings(maximalRings)
    const edgeRingList = new ArrayList()
    for (let i = this._dirEdges.iterator(); i.hasNext(); ) {
      const de = i.next()
      if (de.isMarked()) continue
      if (de.isInRing()) continue
      const er = this.findEdgeRing(de)
      edgeRingList.add(er)
    }
    return edgeRingList
  }
  getNode(pt) {
    let node = this.findNode(pt)
    if (node === null) {
      node = new Node(pt)
      this.add(node)
    }
    return node
  }
  convertMaximalToMinimalEdgeRings(ringEdges) {
    for (let i = ringEdges.iterator(); i.hasNext(); ) {
      const de = i.next()
      const label = de.getLabel()
      const intNodes = PolygonizeGraph.findIntersectionNodes(de, label)
      if (intNodes === null) continue
      for (let iNode = intNodes.iterator(); iNode.hasNext(); ) {
        const node = iNode.next()
        PolygonizeGraph.computeNextCCWEdges(node, label)
      }
    }
  }
  deleteDangles() {
    const nodesToRemove = this.findNodesOfDegree(1)
    const dangleLines = new HashSet()
    const nodeStack = new Stack()
    for (let i = nodesToRemove.iterator(); i.hasNext(); ) 
      nodeStack.push(i.next())
    
    while (!nodeStack.isEmpty()) {
      const node = nodeStack.pop()
      PolygonizeGraph.deleteAllEdges(node)
      const nodeOutEdges = node.getOutEdges().getEdges()
      for (let i = nodeOutEdges.iterator(); i.hasNext(); ) {
        const de = i.next()
        de.setMarked(true)
        const sym = de.getSym()
        if (sym !== null) sym.setMarked(true)
        const e = de.getEdge()
        dangleLines.add(e.getLine())
        const toNode = de.getToNode()
        if (PolygonizeGraph.getDegreeNonDeleted(toNode) === 1) nodeStack.push(toNode)
      }
    }
    return dangleLines
  }
}
