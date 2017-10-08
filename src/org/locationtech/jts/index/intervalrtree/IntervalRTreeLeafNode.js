import IntervalRTreeNode from './IntervalRTreeNode';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function IntervalRTreeLeafNode() {
	IntervalRTreeNode.apply(this);
	this._item = null;
	let min = arguments[0], max = arguments[1], item = arguments[2];
	this._min = min;
	this._max = max;
	this._item = item;
}
inherits(IntervalRTreeLeafNode, IntervalRTreeNode);
extend(IntervalRTreeLeafNode.prototype, {
	query: function (queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) return null;
		visitor.visitItem(this._item);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IntervalRTreeLeafNode;
	}
});
