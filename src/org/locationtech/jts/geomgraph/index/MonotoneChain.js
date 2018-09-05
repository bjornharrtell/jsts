export default class MonotoneChain {
	constructor() {
		MonotoneChain.constructor_.apply(this, arguments);
	}
	computeIntersections(mc, si) {
		this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
	}
	getClass() {
		return MonotoneChain;
	}
	get interfaces_() {
		return [];
	}
}
MonotoneChain.constructor_ = function () {
	this.mce = null;
	this.chainIndex = null;
	let mce = arguments[0], chainIndex = arguments[1];
	this.mce = mce;
	this.chainIndex = chainIndex;
};
