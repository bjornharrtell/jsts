import IntervalRTreeNode from './IntervalRTreeNode';
export default class IntervalRTreeLeafNode extends IntervalRTreeNode {
	constructor(...args) {
		super();
		this.item = null;
		if (args.length === 3) {
			let [min, max, item] = args;
			this.min = min;
			this.max = max;
			this.item = item;
		}
	}
	get interfaces_() {
		return [];
	}
	query(queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) return null;
		visitor.visitItem(this.item);
	}
	getClass() {
		return IntervalRTreeLeafNode;
	}
}

