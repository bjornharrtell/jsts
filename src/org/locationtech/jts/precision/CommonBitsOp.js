import extend from '../../../../extend';
import CommonBitsRemover from './CommonBitsRemover';
export default function CommonBitsOp() {
	this.returnToOriginalPrecision = true;
	this.cbr = null;
	if (arguments.length === 0) {
		CommonBitsOp.call(this, true);
	} else if (arguments.length === 1) {
		let returnToOriginalPrecision = arguments[0];
		this.returnToOriginalPrecision = returnToOriginalPrecision;
	}
}
extend(CommonBitsOp.prototype, {
	computeResultPrecision: function (result) {
		if (this.returnToOriginalPrecision) this.cbr.addCommonBits(result);
		return result;
	},
	union: function (geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].union(geom[1]));
	},
	intersection: function (geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].intersection(geom[1]));
	},
	removeCommonBits: function () {
		if (arguments.length === 1) {
			let geom0 = arguments[0];
			this.cbr = new CommonBitsRemover();
			this.cbr.add(geom0);
			var geom = this.cbr.removeCommonBits(geom0.copy());
			return geom;
		} else if (arguments.length === 2) {
			let geom0 = arguments[0], geom1 = arguments[1];
			this.cbr = new CommonBitsRemover();
			this.cbr.add(geom0);
			this.cbr.add(geom1);
			var geom = new Array(2).fill(null);
			geom[0] = this.cbr.removeCommonBits(geom0.copy());
			geom[1] = this.cbr.removeCommonBits(geom1.copy());
			return geom;
		}
	},
	buffer: function (geom0, distance) {
		var geom = this.removeCommonBits(geom0);
		return this.computeResultPrecision(geom.buffer(distance));
	},
	symDifference: function (geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].symDifference(geom[1]));
	},
	difference: function (geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].difference(geom[1]));
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CommonBitsOp;
	}
});
