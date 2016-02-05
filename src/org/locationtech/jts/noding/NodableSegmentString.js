import SegmentString from './SegmentString';
export default class NodableSegmentString {
	get interfaces_() {
		return [SegmentString];
	}
	addIntersection(intPt, segmentIndex) {}
	getClass() {
		return NodableSegmentString;
	}
}

