import Location from '../../geom/Location'
import EdgeEndBuilder from './EdgeEndBuilder'
import NodeMap from '../../geomgraph/NodeMap'
import RelateNodeFactory from './RelateNodeFactory'
export default class RelateNodeGraph {
  constructor() {
    RelateNodeGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nodes = new NodeMap(new RelateNodeFactory())
  }
  insertEdgeEnds(ee) {
    for (let i = ee.iterator(); i.hasNext(); ) {
      const e = i.next()
      this._nodes.add(e)
    }
  }
  getNodeIterator() {
    return this._nodes.iterator()
  }
  copyNodesAndLabels(geomGraph, argIndex) {
    for (let nodeIt = geomGraph.getNodeIterator(); nodeIt.hasNext(); ) {
      const graphNode = nodeIt.next()
      const newNode = this._nodes.addNode(graphNode.getCoordinate())
      newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex))
    }
  }
  build(geomGraph) {
    this.computeIntersectionNodes(geomGraph, 0)
    this.copyNodesAndLabels(geomGraph, 0)
    const eeBuilder = new EdgeEndBuilder()
    const eeList = eeBuilder.computeEdgeEnds(geomGraph.getEdgeIterator())
    this.insertEdgeEnds(eeList)
  }
  computeIntersectionNodes(geomGraph, argIndex) {
    for (let edgeIt = geomGraph.getEdgeIterator(); edgeIt.hasNext(); ) {
      const e = edgeIt.next()
      const eLoc = e.getLabel().getLocation(argIndex)
      for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
        const ei = eiIt.next()
        const n = this._nodes.addNode(ei.coord)
        if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else 
        if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR)
        
      }
    }
  }
}
