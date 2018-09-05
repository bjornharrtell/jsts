export default class SweepLineSegment {
	constructor() {
		SweepLineSegment.constructor_.apply(this, arguments);
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
	get interfaces_() {
		return [];
	}
}
SweepLineSegment.constructor_ = function () {
	this.edge = null;
	this.pts = null;
	this.ptIndex = null;
	let edge = arguments[0], ptIndex = arguments[1];
	this.edge = edge;
	this.ptIndex = ptIndex;
	this.pts = edge.getCoordinates();
};
