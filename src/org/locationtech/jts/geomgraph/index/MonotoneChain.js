export default class MonotoneChain {
	constructor(...args) {
		this.mce = null;
		this.chainIndex = null;
		if (args.length === 2) {
			let [mce, chainIndex] = args;
			this.mce = mce;
			this.chainIndex = chainIndex;
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

