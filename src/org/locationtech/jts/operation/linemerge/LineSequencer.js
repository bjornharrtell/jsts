import TreeSet from '../../../../../java/util/TreeSet'
import LineString from '../../geom/LineString'
import Geometry from '../../geom/Geometry'
import hasInterface from '../../../../../hasInterface'
import GeometryFactory from '../../geom/GeometryFactory'
import Collection from '../../../../../java/util/Collection'
import Coordinate from '../../geom/Coordinate'
import Integer from '../../../../../java/lang/Integer'
import LineMergeGraph from './LineMergeGraph'
import LinkedList from '../../../../../java/util/LinkedList'
import GeometryComponentFilter from '../../geom/GeometryComponentFilter'
import ArrayList from '../../../../../java/util/ArrayList'
import ConnectedSubgraphFinder from '../../planargraph/algorithm/ConnectedSubgraphFinder'
import Assert from '../../util/Assert'
import MultiLineString from '../../geom/MultiLineString'
import GraphComponent from '../../planargraph/GraphComponent'
export default class LineSequencer {
  constructor() {
    LineSequencer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._graph = new LineMergeGraph()
    this._factory = new GeometryFactory()
    this._lineCount = 0
    this._isRun = false
    this._sequencedGeometry = null
    this._isSequenceable = false
  }
  static findUnvisitedBestOrientedDE(node) {
    let wellOrientedDE = null
    let unvisitedDE = null
    for (let i = node.getOutEdges().iterator(); i.hasNext(); ) {
      const de = i.next()
      if (!de.getEdge().isVisited()) {
        unvisitedDE = de
        if (de.getEdgeDirection()) wellOrientedDE = de
      }
    }
    if (wellOrientedDE !== null) return wellOrientedDE
    return unvisitedDE
  }
  static findLowestDegreeNode(graph) {
    let minDegree = Integer.MAX_VALUE
    let minDegreeNode = null
    for (let i = graph.nodeIterator(); i.hasNext(); ) {
      const node = i.next()
      if (minDegreeNode === null || node.getDegree() < minDegree) {
        minDegree = node.getDegree()
        minDegreeNode = node
      }
    }
    return minDegreeNode
  }
  static isSequenced(geom) {
    if (!(geom instanceof MultiLineString)) 
      return true
    
    const mls = geom
    const prevSubgraphNodes = new TreeSet()
    let lastNode = null
    const currNodes = new ArrayList()
    for (let i = 0; i < mls.getNumGeometries(); i++) {
      const line = mls.getGeometryN(i)
      const startNode = line.getCoordinateN(0)
      const endNode = line.getCoordinateN(line.getNumPoints() - 1)
      if (prevSubgraphNodes.contains(startNode)) return false
      if (prevSubgraphNodes.contains(endNode)) return false
      if (lastNode !== null) 
        if (!startNode.equals(lastNode)) {
          prevSubgraphNodes.addAll(currNodes)
          currNodes.clear()
        }
      
      currNodes.add(startNode)
      currNodes.add(endNode)
      lastNode = endNode
    }
    return true
  }
  static reverse(line) {
    const pts = line.getCoordinates()
    const revPts = new Array(pts.length).fill(null)
    const len = pts.length
    for (let i = 0; i < len; i++) 
      revPts[len - 1 - i] = new Coordinate(pts[i])
    
    return line.getFactory().createLineString(revPts)
  }
  static sequence(geom) {
    const sequencer = new LineSequencer()
    sequencer.add(geom)
    return sequencer.getSequencedLineStrings()
  }
  addLine(lineString) {
    if (this._factory === null) 
      this._factory = lineString.getFactory()
    
    this._graph.addEdge(lineString)
    this._lineCount++
  }
  hasSequence(graph) {
    let oddDegreeCount = 0
    for (let i = graph.nodeIterator(); i.hasNext(); ) {
      const node = i.next()
      if (node.getDegree() % 2 === 1) oddDegreeCount++
    }
    return oddDegreeCount <= 2
  }
  computeSequence() {
    if (this._isRun) 
      return null
    
    this._isRun = true
    const sequences = this.findSequences()
    if (sequences === null) return null
    this._sequencedGeometry = this.buildSequencedGeometry(sequences)
    this._isSequenceable = true
    const finalLineCount = this._sequencedGeometry.getNumGeometries()
    Assert.isTrue(this._lineCount === finalLineCount, 'Lines were missing from result')
    Assert.isTrue(this._sequencedGeometry instanceof LineString || this._sequencedGeometry instanceof MultiLineString, 'Result is not lineal')
  }
  findSequences() {
    const sequences = new ArrayList()
    const csFinder = new ConnectedSubgraphFinder(this._graph)
    const subgraphs = csFinder.getConnectedSubgraphs()
    for (let i = subgraphs.iterator(); i.hasNext(); ) {
      const subgraph = i.next()
      if (this.hasSequence(subgraph)) {
        const seq = this.findSequence(subgraph)
        sequences.add(seq)
      } else {
        return null
      }
    }
    return sequences
  }
  addReverseSubpath(de, lit, expectedClosed) {
    const endNode = de.getToNode()
    let fromNode = null
    while (true) {
      lit.add(de.getSym())
      de.getEdge().setVisited(true)
      fromNode = de.getFromNode()
      const unvisitedOutDE = LineSequencer.findUnvisitedBestOrientedDE(fromNode)
      if (unvisitedOutDE === null) break
      de = unvisitedOutDE.getSym()
    }
    if (expectedClosed) 
      Assert.isTrue(fromNode === endNode, 'path not contiguous')
    
  }
  findSequence(graph) {
    GraphComponent.setVisited(graph.edgeIterator(), false)
    const startNode = LineSequencer.findLowestDegreeNode(graph)
    const startDE = startNode.getOutEdges().iterator().next()
    const startDESym = startDE.getSym()
    const seq = new LinkedList()
    const lit = seq.listIterator()
    this.addReverseSubpath(startDESym, lit, false)
    while (lit.hasPrevious()) {
      const prev = lit.previous()
      const unvisitedOutDE = LineSequencer.findUnvisitedBestOrientedDE(prev.getFromNode())
      if (unvisitedOutDE !== null) this.addReverseSubpath(unvisitedOutDE.getSym(), lit, true)
    }
    const orientedSeq = this.orient(seq)
    return orientedSeq
  }
  reverse(seq) {
    const newSeq = new LinkedList()
    for (let i = seq.iterator(); i.hasNext(); ) {
      const de = i.next()
      newSeq.addFirst(de.getSym())
    }
    return newSeq
  }
  orient(seq) {
    const startEdge = seq.get(0)
    const endEdge = seq.get(seq.size() - 1)
    const startNode = startEdge.getFromNode()
    const endNode = endEdge.getToNode()
    let flipSeq = false
    const hasDegree1Node = startNode.getDegree() === 1 || endNode.getDegree() === 1
    if (hasDegree1Node) {
      let hasObviousStartNode = false
      if (endEdge.getToNode().getDegree() === 1 && endEdge.getEdgeDirection() === false) {
        hasObviousStartNode = true
        flipSeq = true
      }
      if (startEdge.getFromNode().getDegree() === 1 && startEdge.getEdgeDirection() === true) {
        hasObviousStartNode = true
        flipSeq = false
      }
      if (!hasObviousStartNode) 
        if (startEdge.getFromNode().getDegree() === 1) flipSeq = true
      
    }
    if (flipSeq) return this.reverse(seq)
    return seq
  }
  buildSequencedGeometry(sequences) {
    const lines = new ArrayList()
    for (let i1 = sequences.iterator(); i1.hasNext(); ) {
      const seq = i1.next()
      for (let i2 = seq.iterator(); i2.hasNext(); ) {
        const de = i2.next()
        const e = de.getEdge()
        const line = e.getLine()
        let lineToAdd = line
        if (!de.getEdgeDirection() && !line.isClosed()) lineToAdd = LineSequencer.reverse(line)
        lines.add(lineToAdd)
      }
    }
    if (lines.size() === 0) return this._factory.createMultiLineString(new Array(0).fill(null))
    return this._factory.buildGeometry(lines)
  }
  getSequencedLineStrings() {
    this.computeSequence()
    return this._sequencedGeometry
  }
  isSequenceable() {
    this.computeSequence()
    return this._isSequenceable
  }
  add() {
    if (hasInterface(arguments[0], Collection)) {
      const geometries = arguments[0]
      for (let i = geometries.iterator(); i.hasNext(); ) {
        const geometry = i.next()
        this.add(geometry)
      }
    } else if (arguments[0] instanceof Geometry) {
      const geometry = arguments[0]
      geometry.apply(new (class {
        get interfaces_() {
          return [GeometryComponentFilter]
        }
        filter(component) {
          if (component instanceof LineString) 
            this.addLine(component)
          
        }
      })())
    }
  }
}
