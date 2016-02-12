import IntervalRTreeNode from './IntervalRTreeNode';
export default class IntervalRTreeLeafNode extends IntervalRTreeNode {
	constructor(...args) {
		super();
		this.item = null;
		switch (args.length) {
			case 3:
				return ((...args) => {
					let [min, max, item] = args;
					this.min = min;
					this.max = max;
					this.item = item;
				})(...args);
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

