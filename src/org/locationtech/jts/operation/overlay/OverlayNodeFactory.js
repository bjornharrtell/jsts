import DirectedEdgeStar from '../../geomgraph/DirectedEdgeStar.js'
import Node from '../../geomgraph/Node.js'
import NodeFactory from '../../geomgraph/NodeFactory.js'
export default class OverlayNodeFactory extends NodeFactory {
  constructor() {
    super()
  }
  createNode(coord) {
    return new Node(coord, new DirectedEdgeStar())
  }
}
