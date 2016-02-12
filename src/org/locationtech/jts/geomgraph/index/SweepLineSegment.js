export default class SweepLineSegment {
	constructor(...args) {
		this.edge = null;
		this.pts = null;
		this.ptIndex = null;
		if (args.length === 2) {
			let [edge, ptIndex] = args;
			this.edge = edge;
			this.ptIndex = ptIndex;
			this.pts = edge.getCoordinates();
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

