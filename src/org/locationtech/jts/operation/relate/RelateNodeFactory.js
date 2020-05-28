import EdgeEndBundleStar from './EdgeEndBundleStar'
import RelateNode from './RelateNode'
import NodeFactory from '../../geomgraph/NodeFactory'
export default class RelateNodeFactory extends NodeFactory {
  constructor() {
    super()
  }
  createNode(coord) {
    return new RelateNode(coord, new EdgeEndBundleStar())
  }
}
