import IntervalRTreeNode from './IntervalRTreeNode';
export default class IntervalRTreeBranchNode extends IntervalRTreeNode {
	constructor(...args) {
		super();
		(() => {
			this.node1 = null;
			this.node2 = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [n1, n2] = args;
						this.node1 = n1;
						this.node2 = n2;
						this.buildExtent(this.node1, this.node2);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	buildExtent(n1, n2) {
		this.min = Math.min(n1.min, n2.min);
		this.max = Math.max(n1.max, n2.max);
	}
	query(queryMin, queryMax, visitor) {
		if (!this.intersects(queryMin, queryMax)) {
			return null;
		}
		if (this.node1 !== null) this.node1.query(queryMin, queryMax, visitor);
		if (this.node2 !== null) this.node2.query(queryMin, queryMax, visitor);
	}
	getClass() {
		return IntervalRTreeBranchNode;
	}
}

