import NodeBase from './NodeBase'
import Node from './Node'
import IntervalSize from '../quadtree/IntervalSize'
import Assert from '../../util/Assert'
export default class Root extends NodeBase {
  constructor() {
    super()
  }
  insert(itemInterval, item) {
    const index = NodeBase.getSubnodeIndex(itemInterval, Root.origin)
    if (index === -1) {
      this.add(item)
      return null
    }
    const node = this._subnode[index]
    if (node === null || !node.getInterval().contains(itemInterval)) {
      const largerNode = Node.createExpanded(node, itemInterval)
      this._subnode[index] = largerNode
    }
    this.insertContained(this._subnode[index], itemInterval, item)
  }
  isSearchMatch(interval) {
    return true
  }
  insertContained(tree, itemInterval, item) {
    Assert.isTrue(tree.getInterval().contains(itemInterval))
    const isZeroArea = IntervalSize.isZeroWidth(itemInterval.getMin(), itemInterval.getMax())
    let node = null
    if (isZeroArea) node = tree.find(itemInterval); else node = tree.getNode(itemInterval)
    node.add(item)
  }
}
Root.origin = 0.0
