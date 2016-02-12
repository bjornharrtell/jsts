export default class SweepLineSegment {
	constructor(...args) {
		this.edge = null;
		this.pts = null;
		this.ptIndex = null;
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [edge, ptIndex] = args;
					this.edge = edge;
					this.ptIndex = ptIndex;
					this.pts = edge.getCoordinates();
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	getMaxX() {
		var x1 = this.pts[this.ptIndex].x;
		var x2 = this.pts[this.ptIndex + 1].x;
		return x1 > x2 ? x1 : x2;
	}
	getMinX() {
		var x1 = this.pts[this.ptIndex].x;
		var x2 = this.pts[this.ptIndex + 1].x;
		return x1 < x2 ? x1 : x2;
	}
	computeIntersections(ss, si) {
		si.addIntersections(this.edge, this.ptIndex, ss.edge, ss.ptIndex);
	}
	getClass() {
		return SweepLineSegment;
	}
}

