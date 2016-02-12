export default class MonotoneChain {
	constructor(...args) {
		this.mce = null;
		this.chainIndex = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [mce, chainIndex] = args;
					this.mce = mce;
					this.chainIndex = chainIndex;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	computeIntersections(mc, si) {
		this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
	}
	getClass() {
		return MonotoneChain;
	}
}

