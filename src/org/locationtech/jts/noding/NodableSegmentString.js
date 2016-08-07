import extend from '../../../../extend';
import SegmentString from './SegmentString';
export default function NodableSegmentString() {}
extend(NodableSegmentString.prototype, {
	addIntersection: function (intPt, segmentIndex) {},
	interfaces_: function () {
		return [SegmentString];
	},
	getClass: function () {
		return NodableSegmentString;
	}
});
