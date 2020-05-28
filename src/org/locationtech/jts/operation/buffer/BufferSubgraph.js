import HashSet from '../../../../../java/util/HashSet'
import Position from '../../geomgraph/Position'
import Stack from '../../../../../java/util/Stack'
import RightmostEdgeFinder from './RightmostEdgeFinder'
import TopologyException from '../../geom/TopologyException'
import LinkedList from '../../../../../java/util/LinkedList'
import Comparable from '../../../../../java/lang/Comparable'
import ArrayList from '../../../../../java/util/ArrayList'
import Envelope from '../../geom/Envelope'
export default class BufferSubgraph {
  constructor() {
    BufferSubgraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._finder = null
    this._dirEdgeList = new ArrayList()
    this._nodes = new ArrayList()
    this._rightMostCoord = null
    this._env = null
    this._finder = new RightmostEdgeFinder()
  }
  clearVisitedEdges() {
    for (let it = this._dirEdgeList.iterator(); it.hasNext(); ) {
      const de = it.next()
      de.setVisited(false)
    }
  }
  getRightmostCoordinate() {
    return this._rightMostCoord
  }
  computeNodeDepth(n) {
    let startEdge = null
    for (let i = n.getEdges().iterator(); i.hasNext(); ) {
      const de = i.next()
      if (de.isVisited() || de.getSym().isVisited()) {
        startEdge = de
        break
      }
    }
    if (startEdge === null) throw new TopologyException('unable to find edge to compute depths at ' + n.getCoordinate())
    n.getEdges().computeDepths(startEdge)
    for (let i = n.getEdges().iterator(); i.hasNext(); ) {
      const de = i.next()
      de.setVisited(true)
      this.copySymDepths(de)
    }
  }
  computeDepth(outsideDepth) {
    this.clearVisitedEdges()
    const de = this._finder.getEdge()
    const n = de.getNode()
    const label = de.getLabel()
    de.setEdgeDepths(Position.RIGHT, outsideDepth)
    this.copySymDepths(de)
    this.computeDepths(de)
  }
  create(node) {
    this.addReachable(node)
    this._finder.findEdge(this._dirEdgeList)
    this._rightMostCoord = this._finder.getCoordinate()
  }
  findResultEdges() {
    for (let it = this._dirEdgeList.iterator(); it.hasNext(); ) {
      const de = it.next()
      if (de.getDepth(Position.RIGHT) >= 1 && de.getDepth(Position.LEFT) <= 0 && !de.isInteriorAreaEdge()) 
        de.setInResult(true)
      
    }
  }
  computeDepths(startEdge) {
    const nodesVisited = new HashSet()
    const nodeQueue = new LinkedList()
    const startNode = startEdge.getNode()
    nodeQueue.addLast(startNode)
    nodesVisited.add(startNode)
    startEdge.setVisited(true)
    while (!nodeQueue.isEmpty()) {
      const n = nodeQueue.removeFirst()
      nodesVisited.add(n)
      this.computeNodeDepth(n)
      for (let i = n.getEdges().iterator(); i.hasNext(); ) {
        const de = i.next()
        const sym = de.getSym()
        if (sym.isVisited()) continue
        const adjNode = sym.getNode()
        if (!nodesVisited.contains(adjNode)) {
          nodeQueue.addLast(adjNode)
          nodesVisited.add(adjNode)
        }
      }
    }
  }
  compareTo(o) {
    const graph = o
    if (this._rightMostCoord.x < graph._rightMostCoord.x) 
      return -1
    
    if (this._rightMostCoord.x > graph._rightMostCoord.x) 
      return 1
    
    return 0
  }
  getEnvelope() {
    if (this._env === null) {
      const edgeEnv = new Envelope()
      for (let it = this._dirEdgeList.iterator(); it.hasNext(); ) {
        const dirEdge = it.next()
        const pts = dirEdge.getEdge().getCoordinates()
        for (let i = 0; i < pts.length - 1; i++) 
          edgeEnv.expandToInclude(pts[i])
        
      }
      this._env = edgeEnv
    }
    return this._env
  }
  addReachable(startNode) {
    const nodeStack = new Stack()
    nodeStack.add(startNode)
    while (!nodeStack.empty()) {
      const node = nodeStack.pop()
      this.add(node, nodeStack)
    }
  }
  copySymDepths(de) {
    const sym = de.getSym()
    sym.setDepth(Position.LEFT, de.getDepth(Position.RIGHT))
    sym.setDepth(Position.RIGHT, de.getDepth(Position.LEFT))
  }
  add(node, nodeStack) {
    node.setVisited(true)
    this._nodes.add(node)
    for (let i = node.getEdges().iterator(); i.hasNext(); ) {
      const de = i.next()
      this._dirEdgeList.add(de)
      const sym = de.getSym()
      const symNode = sym.getNode()
      if (!symNode.isVisited()) nodeStack.push(symNode)
    }
  }
  getNodes() {
    return this._nodes
  }
  getDirectedEdges() {
    return this._dirEdgeList
  }
  get interfaces_() {
    return [Comparable]
  }
}
