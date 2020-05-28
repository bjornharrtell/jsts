import IntervalRTreeNode from './IntervalRTreeNode'
export default class IntervalRTreeBranchNode extends IntervalRTreeNode {
  constructor() {
    super()
    IntervalRTreeBranchNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._node1 = null
    this._node2 = null
    const n1 = arguments[0], n2 = arguments[1]
    this._node1 = n1
    this._node2 = n2
    this.buildExtent(this._node1, this._node2)
  }
  buildExtent(n1, n2) {
    this._min = Math.min(n1._min, n2._min)
    this._max = Math.max(n1._max, n2._max)
  }
  query(queryMin, queryMax, visitor) {
    if (!this.intersects(queryMin, queryMax)) 
      return null
    
    if (this._node1 !== null) this._node1.query(queryMin, queryMax, visitor)
    if (this._node2 !== null) this._node2.query(queryMin, queryMax, visitor)
  }
}
