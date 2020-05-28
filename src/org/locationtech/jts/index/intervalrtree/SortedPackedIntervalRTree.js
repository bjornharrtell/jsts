import WKTWriter from '../../io/WKTWriter'
import Coordinate from '../../geom/Coordinate'
import IntervalRTreeLeafNode from './IntervalRTreeLeafNode'
import IntervalRTreeNode from './IntervalRTreeNode'
import Collections from '../../../../../java/util/Collections'
import System from '../../../../../java/lang/System'
import ArrayList from '../../../../../java/util/ArrayList'
import IntervalRTreeBranchNode from './IntervalRTreeBranchNode'
export default class SortedPackedIntervalRTree {
  constructor() {
    SortedPackedIntervalRTree.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._leaves = new ArrayList()
    this._root = null
    this._level = 0
  }
  buildTree() {
    Collections.sort(this._leaves, new IntervalRTreeNode.NodeComparator())
    let src = this._leaves
    let temp = null
    let dest = new ArrayList()
    while (true) {
      this.buildLevel(src, dest)
      if (dest.size() === 1) return dest.get(0)
      temp = src
      src = dest
      dest = temp
    }
  }
  insert(min, max, item) {
    if (this._root !== null) throw new IllegalStateException('Index cannot be added to once it has been queried')
    this._leaves.add(new IntervalRTreeLeafNode(min, max, item))
  }
  query(min, max, visitor) {
    this.init()
    if (this._root === null) return null
    this._root.query(min, max, visitor)
  }
  buildRoot() {
    if (this._root !== null) return null
    this._root = this.buildTree()
  }
  printNode(node) {
    System.out.println(WKTWriter.toLineString(new Coordinate(node._min, this._level), new Coordinate(node._max, this._level)))
  }
  init() {
    if (this._root !== null) return null
    if (this._leaves.size() === 0) return null
    this.buildRoot()
  }
  buildLevel(src, dest) {
    this._level++
    dest.clear()
    for (let i = 0; i < src.size(); i += 2) {
      const n1 = src.get(i)
      const n2 = i + 1 < src.size() ? src.get(i) : null
      if (n2 === null) {
        dest.add(n1)
      } else {
        const node = new IntervalRTreeBranchNode(src.get(i), src.get(i + 1))
        dest.add(node)
      }
    }
  }
}
