import IntervalRTreeNode from './IntervalRTreeNode'
export default class IntervalRTreeLeafNode extends IntervalRTreeNode {
  constructor() {
    super()
    IntervalRTreeLeafNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._item = null
    const min = arguments[0], max = arguments[1], item = arguments[2]
    this._min = min
    this._max = max
    this._item = item
  }
  query(queryMin, queryMax, visitor) {
    if (!this.intersects(queryMin, queryMax)) return null
    visitor.visitItem(this._item)
  }
}
