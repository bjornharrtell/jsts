import DirectedEdgeStar from '../../geomgraph/DirectedEdgeStar'
import Node from '../../geomgraph/Node'
import NodeFactory from '../../geomgraph/NodeFactory'
export default class OverlayNodeFactory extends NodeFactory {
  constructor() {
    super()
  }
  createNode(coord) {
    return new Node(coord, new DirectedEdgeStar())
  }
}
