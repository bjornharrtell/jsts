import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
export default function SplitSegment() {
	this.seg = null;
	this.segLen = null;
	this.splitPt = null;
	this.minimumLen = 0.0;
	let seg = arguments[0];
	this.seg = seg;
	this.segLen = seg.getLength();
}
extend(SplitSegment.prototype, {
	splitAt: function () {
		if (arguments.length === 1) {
			let pt = arguments[0];
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
		} else if (arguments.length === 2) {
			let length = arguments[0], endPt = arguments[1];
			var actualLen = this.getConstrainedLength(length);
			var frac = actualLen / this.segLen;
			if (endPt.equals2D(this.seg.p0)) this.splitPt = this.seg.pointAlong(frac); else this.splitPt = SplitSegment.pointAlongReverse(this.seg, frac);
		}
	},
	setMinimumLength: function (minLen) {
		this.minimumLen = minLen;
	},
	getConstrainedLength: function (len) {
		if (len < this.minimumLen) return this.minimumLen;
		return len;
	},
	getSplitPoint: function () {
		return this.splitPt;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SplitSegment;
	}
});
SplitSegment.pointAlongReverse = function (seg, segmentLengthFraction) {
	var coord = new Coordinate();
	coord.x = seg.p1.x - segmentLengthFraction * (seg.p1.x - seg.p0.x);
	coord.y = seg.p1.y - segmentLengthFraction * (seg.p1.y - seg.p0.y);
	return coord;
};

