import Stack from '../../../../../java/util/Stack.js'
import Subgraph from '../Subgraph.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import GraphComponent from '../GraphComponent.js'
export default class ConnectedSubgraphFinder {
  constructor() {
    ConnectedSubgraphFinder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._graph = null
    const graph = arguments[0]
    this._graph = graph
  }
  findSubgraph(node) {
    const subgraph = new Subgraph(this._graph)
    this.addReachable(node, subgraph)
    return subgraph
  }
  addEdges(node, nodeStack, subgraph) {
    node.setVisited(true)
    for (let i = node.getOutEdges().iterator(); i.hasNext(); ) {
      const de = i.next()
      subgraph.add(de.getEdge())
      const toNode = de.getToNode()
      if (!toNode.isVisited()) nodeStack.push(toNode)
    }
  }
  addReachable(startNode, subgraph) {
    const nodeStack = new Stack()
    nodeStack.add(startNode)
    while (!nodeStack.empty()) {
      const node = nodeStack.pop()
      this.addEdges(node, nodeStack, subgraph)
    }
  }
  getConnectedSubgraphs() {
    const subgraphs = new ArrayList()
    GraphComponent.setVisited(this._graph.nodeIterator(), false)
    for (let i = this._graph.edgeIterator(); i.hasNext(); ) {
      const e = i.next()
      const node = e.getDirEdge(0).getFromNode()
      if (!node.isVisited()) 
        subgraphs.add(this.findSubgraph(node))
      
    }
    return subgraphs
  }
}
