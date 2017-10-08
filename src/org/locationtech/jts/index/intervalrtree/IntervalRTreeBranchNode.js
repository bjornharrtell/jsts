import IntervalRTreeNode from './IntervalRTreeNode';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function IntervalRTreeBranchNode() {
	IntervalRTreeNode.apply(this);
	this._node1 = null;
	this._node2 = null;
	let n1 = arguments[0], n2 = arguments[1];
	this._node1 = n1;
	this._node2 = n2;
	this.buildExtent(this._node1, this._node2);
}
inherits(IntervalRTreeBranchNode, IntervalRTreeNode);
extend(IntervalRTreeBranchNode.prototype, {
	buildExtent: function (n1, n2) {
		this._min = Math.min(n1._min, n2._min);
		this._max = Math.max(n1._max, n2._max);
	},
	query: function (queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) {
			return null;
		}
		if (this._node1 !== null) this._node1.query(queryMin, queryMax, visitor);
		if (this._node2 !== null) this._node2.query(queryMin, queryMax, visitor);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IntervalRTreeBranchNode;
	}
});
