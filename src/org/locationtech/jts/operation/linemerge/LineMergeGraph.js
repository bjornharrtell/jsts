import LineMergeDirectedEdge from './LineMergeDirectedEdge'
import Node from '../../planargraph/Node'
import CoordinateArrays from '../../geom/CoordinateArrays'
import LineMergeEdge from './LineMergeEdge'
import PlanarGraph from '../../planargraph/PlanarGraph'
export default class LineMergeGraph extends PlanarGraph {
  constructor() {
    super()
  }
  addEdge(lineString) {
    if (lineString.isEmpty()) 
      return null
    
    const coordinates = CoordinateArrays.removeRepeatedPoints(lineString.getCoordinates())
    if (coordinates.length <= 1) return null
    const startCoordinate = coordinates[0]
    const endCoordinate = coordinates[coordinates.length - 1]
    const startNode = this.getNode(startCoordinate)
    const endNode = this.getNode(endCoordinate)
    const directedEdge0 = new LineMergeDirectedEdge(startNode, endNode, coordinates[1], true)
    const directedEdge1 = new LineMergeDirectedEdge(endNode, startNode, coordinates[coordinates.length - 2], false)
    const edge = new LineMergeEdge(lineString)
    edge.setDirectedEdges(directedEdge0, directedEdge1)
    this.add(edge)
  }
  getNode(coordinate) {
    let node = this.findNode(coordinate)
    if (node === null) {
      node = new Node(coordinate)
      this.add(node)
    }
    return node
  }
}
