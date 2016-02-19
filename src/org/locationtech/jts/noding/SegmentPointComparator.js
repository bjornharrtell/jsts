import extend from '../../../../extend';
import Assert from '../util/Assert';
export default function SegmentPointComparator() {}
extend(SegmentPointComparator.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentPointComparator;
	}
});
SegmentPointComparator.relativeSign = function (x0, x1) {
	if (x0 < x1) return -1;
	if (x0 > x1) return 1;
	return 0;
};
SegmentPointComparator.compare = function (octant, p0, p1) {
	if (p0.equals2D(p1)) return 0;
	var xSign = SegmentPointComparator.relativeSign(p0.x, p1.x);
	var ySign = SegmentPointComparator.relativeSign(p0.y, p1.y);
	switch (octant) {
		case 0:
			return SegmentPointComparator.compareValue(xSign, ySign);
		case 1:
			return SegmentPointComparator.compareValue(ySign, xSign);
		case 2:
			return SegmentPointComparator.compareValue(ySign, -xSign);
		case 3:
			return SegmentPointComparator.compareValue(-xSign, ySign);
		case 4:
			return SegmentPointComparator.compareValue(-xSign, -ySign);
		case 5:
			return SegmentPointComparator.compareValue(-ySign, -xSign);
		case 6:
			return SegmentPointComparator.compareValue(-ySign, xSign);
		case 7:
			return SegmentPointComparator.compareValue(xSign, -ySign);
	}
	Assert.shouldNeverReachHere("invalid octant value");
	return 0;
};
SegmentPointComparator.compareValue = function (compareSign0, compareSign1) {
	if (compareSign0 < 0) return -1;
	if (compareSign0 > 0) return 1;
	if (compareSign1 < 0) return -1;
	if (compareSign1 > 0) return 1;
	return 0;
};

