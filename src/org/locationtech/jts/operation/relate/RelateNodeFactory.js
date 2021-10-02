import EdgeEndBundleStar from './EdgeEndBundleStar.js'
import RelateNode from './RelateNode.js'
import NodeFactory from '../../geomgraph/NodeFactory.js'
export default class RelateNodeFactory extends NodeFactory {
  constructor() {
    super()
  }
  createNode(coord) {
    return new RelateNode(coord, new EdgeEndBundleStar())
  }
}
