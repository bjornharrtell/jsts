export default class MonotoneChain {
	constructor(...args) {
		(() => {
			this.mce = null;
			this.chainIndex = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [mce, chainIndex] = args;
						this.mce = mce;
						this.chainIndex = chainIndex;
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

