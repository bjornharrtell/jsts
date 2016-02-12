import Coordinate from '../geom/Coordinate';
export default class SplitSegment {
	constructor(...args) {
		this.seg = null;
		this.segLen = null;
		this.splitPt = null;
		this.minimumLen = 0.0;
		if (args.length === 1) {
			let [seg] = args;
			this.seg = seg;
			this.segLen = seg.getLength();
		}
	}
	get interfaces_() {
		return [];
	}
	static pointAlongReverse(seg, segmentLengthFraction) {
		var coord = new Coordinate();
		coord.x = seg.p1.x - segmentLengthFraction * (seg.p1.x - seg.p0.x);
		coord.y = seg.p1.y - segmentLengthFraction * (seg.p1.y - seg.p0.y);
		return coord;
	}
	splitAt(...args) {
		if (args.length === 1) {
			let [pt] = args;
			var minFrac = this.minimumLen / this.segLen;
			if (pt.distance(this.seg.p0) < this.minimumLen) {
				this.splitPt = this.seg.pointAlong(minFrac);
				return null;
			}
			if (pt.distance(this.seg.p1) < this.minimumLen) {
				this.splitPt = SplitSegment.pointAlongReverse(this.seg, minFrac);
				return null;
			}
			this.splitPt = pt;
		} else if (args.length === 2) {
			let [length, endPt] = args;
			var actualLen = this.getConstrainedLength(length);
			var frac = actualLen / this.segLen;
			if (endPt.equals2D(this.seg.p0)) this.splitPt = this.seg.pointAlong(frac); else this.splitPt = SplitSegment.pointAlongReverse(this.seg, frac);
		}
	}
	setMinimumLength(minLen) {
		this.minimumLen = minLen;
	}
	getConstrainedLength(len) {
		if (len < this.minimumLen) return this.minimumLen;
		return len;
	}
	getSplitPoint() {
		return this.splitPt;
	}
	getClass() {
		return SplitSegment;
	}
}

