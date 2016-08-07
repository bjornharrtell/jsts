import extend from '../../../../../extend';
export default function MonotoneChain() {
	this.mce = null;
	this.chainIndex = null;
	let mce = arguments[0], chainIndex = arguments[1];
	this.mce = mce;
	this.chainIndex = chainIndex;
}
extend(MonotoneChain.prototype, {
	computeIntersections: function (mc, si) {
		this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MonotoneChain;
	}
});
