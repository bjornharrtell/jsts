import extend from '../../../../../extend';
export default function SweepLineSegment() {
	this.edge = null;
	this.pts = null;
	this.ptIndex = null;
	let edge = arguments[0], ptIndex = arguments[1];
	this.edge = edge;
	this.ptIndex = ptIndex;
	this.pts = edge.getCoordinates();
}
extend(SweepLineSegment.prototype, {
	getMaxX: function () {
		var x1 = this.pts[this.ptIndex].x;
		var x2 = this.pts[this.ptIndex + 1].x;
		return x1 > x2 ? x1 : x2;
	},
	getMinX: function () {
		var x1 = this.pts[this.ptIndex].x;
		var x2 = this.pts[this.ptIndex + 1].x;
		return x1 < x2 ? x1 : x2;
	},
	computeIntersections: function (ss, si) {
		si.addIntersections(this.edge, this.ptIndex, ss.edge, ss.ptIndex);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SweepLineSegment;
	}
});
