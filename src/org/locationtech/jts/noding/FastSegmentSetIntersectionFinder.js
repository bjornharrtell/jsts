import SegmentIntersectionDetector from './SegmentIntersectionDetector';
import MCIndexSegmentSetMutualIntersector from './MCIndexSegmentSetMutualIntersector';
export default class FastSegmentSetIntersectionFinder {
	constructor(...args) {
		this.segSetMutInt = null;
		if (args.length === 1) {
			let [baseSegStrings] = args;
			this.segSetMutInt = new MCIndexSegmentSetMutualIntersector(baseSegStrings);
		}
	}
	get interfaces_() {
		return [];
	}
	getSegmentSetIntersector() {
		return this.segSetMutInt;
	}
	intersects(...args) {
		if (args.length === 1) {
			let [segStrings] = args;
			var intFinder = new SegmentIntersectionDetector();
			return this.intersects(segStrings, intFinder);
		} else if (args.length === 2) {
			let [segStrings, intDetector] = args;
			this.segSetMutInt.process(segStrings, intDetector);
			return intDetector.hasIntersection();
		}
	}
	getClass() {
		return FastSegmentSetIntersectionFinder;
	}
}

