import CommonBitsRemover from './CommonBitsRemover';
export default class CommonBitsOp {
	constructor(...args) {
		this.returnToOriginalPrecision = true;
		this.cbr = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, true);
					})(...args);
				case 1:
					return ((...args) => {
						let [returnToOriginalPrecision] = args;
						this.returnToOriginalPrecision = returnToOriginalPrecision;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	computeResultPrecision(result) {
		if (this.returnToOriginalPrecision) this.cbr.addCommonBits(result);
		return result;
	}
	union(geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].union(geom[1]));
	}
	intersection(geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].intersection(geom[1]));
	}
	removeCommonBits(...args) {
		switch (args.length) {
			case 1:
				{
					let [geom0] = args;
					this.cbr = new CommonBitsRemover();
					this.cbr.add(geom0);
					var geom = this.cbr.removeCommonBits(geom0.copy());
					return geom;
					break;
				}
			case 2:
				{
					let [geom0, geom1] = args;
					this.cbr = new CommonBitsRemover();
					this.cbr.add(geom0);
					this.cbr.add(geom1);
					var geom = new Array(2);
					geom[0] = this.cbr.removeCommonBits(geom0.copy());
					geom[1] = this.cbr.removeCommonBits(geom1.copy());
					return geom;
					break;
				}
		}
	}
	buffer(geom0, distance) {
		var geom = this.removeCommonBits(geom0);
		return this.computeResultPrecision(geom.buffer(distance));
	}
	symDifference(geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].symDifference(geom[1]));
	}
	difference(geom0, geom1) {
		var geom = this.removeCommonBits(geom0, geom1);
		return this.computeResultPrecision(geom[0].difference(geom[1]));
	}
	getClass() {
		return CommonBitsOp;
	}
}

