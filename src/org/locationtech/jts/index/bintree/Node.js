import NodeBase from './NodeBase'
import Interval from './Interval'
import Assert from '../../util/Assert'
import Key from './Key'
export default class Node extends NodeBase {
  constructor() {
    super()
    Node.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._interval = null
    this._centre = null
    this._level = null
    const interval = arguments[0], level = arguments[1]
    this._interval = interval
    this._level = level
    this._centre = (interval.getMin() + interval.getMax()) / 2
  }
  static createNode(itemInterval) {
    const key = new Key(itemInterval)
    const node = new Node(key.getInterval(), key.getLevel())
    return node
  }
  static createExpanded(node, addInterval) {
    const expandInt = new Interval(addInterval)
    if (node !== null) expandInt.expandToInclude(node._interval)
    const largerNode = Node.createNode(expandInt)
    if (node !== null) largerNode.insert(node)
    return largerNode
  }
  getInterval() {
    return this._interval
  }
  find(searchInterval) {
    const subnodeIndex = NodeBase.getSubnodeIndex(searchInterval, this._centre)
    if (subnodeIndex === -1) return this
    if (this._subnode[subnodeIndex] !== null) {
      const node = this._subnode[subnodeIndex]
      return node.find(searchInterval)
    }
    return this
  }
  insert(node) {
    Assert.isTrue(this._interval === null || this._interval.contains(node._interval))
    const index = NodeBase.getSubnodeIndex(node._interval, this._centre)
    if (node._level === this._level - 1) {
      this._subnode[index] = node
    } else {
      const childNode = this.createSubnode(index)
      childNode.insert(node)
      this._subnode[index] = childNode
    }
  }
  isSearchMatch(itemInterval) {
    return itemInterval.overlaps(this._interval)
  }
  getSubnode(index) {
    if (this._subnode[index] === null) 
      this._subnode[index] = this.createSubnode(index)
    
    return this._subnode[index]
  }
  getNode(searchInterval) {
    const subnodeIndex = NodeBase.getSubnodeIndex(searchInterval, this._centre)
    if (subnodeIndex !== -1) {
      const node = this.getSubnode(subnodeIndex)
      return node.getNode(searchInterval)
    } else {
      return this
    }
  }
  createSubnode(index) {
    let min = 0.0
    let max = 0.0
    switch (index) {
    case 0:
      min = this._interval.getMin()
      max = this._centre
      break
    case 1:
      min = this._centre
      max = this._interval.getMax()
      break
    }
    const subInt = new Interval(min, max)
    const node = new Node(subInt, this._level - 1)
    return node
  }
}
