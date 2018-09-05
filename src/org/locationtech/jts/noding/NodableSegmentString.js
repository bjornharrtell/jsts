import SegmentString from './SegmentString';
export default class NodableSegmentString {
	constructor() {
		NodableSegmentString.constructor_.apply(this, arguments);
	}
	addIntersection(intPt, segmentIndex) {}
	getClass() {
		return NodableSegmentString;
	}
	get interfaces_() {
		return [SegmentString];
	}
}
NodableSegmentString.constructor_ = function () {};
