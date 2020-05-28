import Coordinate from '../../geom/Coordinate'
import NodeBase from './NodeBase'
import Node from './Node'
import IntervalSize from './IntervalSize'
import Assert from '../../util/Assert'
export default class Root extends NodeBase {
  constructor() {
    super()
  }
  insert(itemEnv, item) {
    const index = NodeBase.getSubnodeIndex(itemEnv, Root.origin.x, Root.origin.y)
    if (index === -1) {
      this.add(item)
      return null
    }
    const node = this._subnode[index]
    if (node === null || !node.getEnvelope().contains(itemEnv)) {
      const largerNode = Node.createExpanded(node, itemEnv)
      this._subnode[index] = largerNode
    }
    this.insertContained(this._subnode[index], itemEnv, item)
  }
  isSearchMatch(searchEnv) {
    return true
  }
  insertContained(tree, itemEnv, item) {
    Assert.isTrue(tree.getEnvelope().contains(itemEnv))
    const isZeroX = IntervalSize.isZeroWidth(itemEnv.getMinX(), itemEnv.getMaxX())
    const isZeroY = IntervalSize.isZeroWidth(itemEnv.getMinY(), itemEnv.getMaxY())
    let node = null
    if (isZeroX || isZeroY) node = tree.find(itemEnv); else node = tree.getNode(itemEnv)
    node.add(item)
  }
}
Root.origin = new Coordinate(0.0, 0.0)
