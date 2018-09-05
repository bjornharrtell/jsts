import WKTWriter from '../../io/WKTWriter';
import Coordinate from '../../geom/Coordinate';
import IntervalRTreeLeafNode from './IntervalRTreeLeafNode';
import IntervalRTreeNode from './IntervalRTreeNode';
import Collections from '../../../../../java/util/Collections';
import System from '../../../../../java/lang/System';
import ArrayList from '../../../../../java/util/ArrayList';
import IntervalRTreeBranchNode from './IntervalRTreeBranchNode';
export default class SortedPackedIntervalRTree {
	constructor() {
		SortedPackedIntervalRTree.constructor_.apply(this, arguments);
	}
	buildTree() {
		Collections.sort(this._leaves, new IntervalRTreeNode.NodeComparator());
		var src = this._leaves;
		var temp = null;
		var dest = new ArrayList();
		while (true) {
			this.buildLevel(src, dest);
			if (dest.size() === 1) return dest.get(0);
			temp = src;
			src = dest;
			dest = temp;
		}
	}
	insert(min, max, item) {
		if (this._root !== null) throw new IllegalStateException("Index cannot be added to once it has been queried");
		this._leaves.add(new IntervalRTreeLeafNode(min, max, item));
	}
	query(min, max, visitor) {
		this.init();
		this._root.query(min, max, visitor);
	}
	buildRoot() {
		if (this._root !== null) return null;
		this._root = this.buildTree();
	}
	printNode(node) {
		System.out.println(WKTWriter.toLineString(new Coordinate(node._min, this._level), new Coordinate(node._max, this._level)));
	}
	init() {
		if (this._root !== null) return null;
		this.buildRoot();
	}
	buildLevel(src, dest) {
		this._level++;
		dest.clear();
		for (var i = 0; i < src.size(); i += 2) {
			var n1 = src.get(i);
			var n2 = i + 1 < src.size() ? src.get(i) : null;
			if (n2 === null) {
				dest.add(n1);
			} else {
				var node = new IntervalRTreeBranchNode(src.get(i), src.get(i + 1));
				dest.add(node);
			}
		}
	}
	getClass() {
		return SortedPackedIntervalRTree;
	}
	get interfaces_() {
		return [];
	}
}
SortedPackedIntervalRTree.constructor_ = function () {
	this._leaves = new ArrayList();
	this._root = null;
	this._level = 0;
};
