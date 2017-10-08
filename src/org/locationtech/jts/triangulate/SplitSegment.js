import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
export default function SplitSegment() {
	this._seg = null;
	this._segLen = null;
	this._splitPt = null;
	this._minimumLen = 0.0;
	let seg = arguments[0];
	this._seg = seg;
	this._segLen = seg.getLength();
}
extend(SplitSegment.prototype, {
	splitAt: function () {
		if (arguments.length === 1) {
			let pt = arguments[0];
			var minFrac = this._minimumLen / this._segLen;
			if (pt.distance(this._seg.p0) < this._minimumLen) {
				this._splitPt = this._seg.pointAlong(minFrac);
				return null;
			}
			if (pt.distance(this._seg.p1) < this._minimumLen) {
				this._splitPt = SplitSegment.pointAlongReverse(this._seg, minFrac);
				return null;
			}
			this._splitPt = pt;
		} else if (arguments.length === 2) {
			let length = arguments[0], endPt = arguments[1];
			var actualLen = this.getConstrainedLength(length);
			var frac = actualLen / this._segLen;
			if (endPt.equals2D(this._seg.p0)) this._splitPt = this._seg.pointAlong(frac); else this._splitPt = SplitSegment.pointAlongReverse(this._seg, frac);
		}
	},
	setMinimumLength: function (minLen) {
		this._minimumLen = minLen;
	},
	getConstrainedLength: function (len) {
		if (len < this._minimumLen) return this._minimumLen;
		return len;
	},
	getSplitPoint: function () {
		return this._splitPt;
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
