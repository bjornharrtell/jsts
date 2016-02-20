import IntervalRTreeNode from './IntervalRTreeNode';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function IntervalRTreeBranchNode() {
	IntervalRTreeNode.apply(this);
	this.node1 = null;
	this.node2 = null;
	let n1 = arguments[0], n2 = arguments[1];
	this.node1 = n1;
	this.node2 = n2;
	this.buildExtent(this.node1, this.node2);
}
inherits(IntervalRTreeBranchNode, IntervalRTreeNode);
extend(IntervalRTreeBranchNode.prototype, {
	buildExtent: function (n1, n2) {
		this.min = Math.min(n1.min, n2.min);
		this.max = Math.max(n1.max, n2.max);
	},
	query: function (queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) {
			return null;
		}
		if (this.node1 !== null) this.node1.query(queryMin, queryMax, visitor);
		if (this.node2 !== null) this.node2.query(queryMin, queryMax, visitor);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IntervalRTreeBranchNode;
	}
});

