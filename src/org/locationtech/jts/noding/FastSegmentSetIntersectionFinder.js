import SegmentIntersectionDetector from './SegmentIntersectionDetector';
import MCIndexSegmentSetMutualIntersector from './MCIndexSegmentSetMutualIntersector';
export default class FastSegmentSetIntersectionFinder {
	constructor(...args) {
		this.segSetMutInt = null;
		switch (args.length) {
			case 1:
				{
					let [baseSegStrings] = args;
					this.segSetMutInt = new MCIndexSegmentSetMutualIntersector(baseSegStrings);
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	getSegmentSetIntersector() {
		return this.segSetMutInt;
	}
	intersects(...args) {
		switch (args.length) {
			case 1:
				{
					let [segStrings] = args;
					var intFinder = new SegmentIntersectionDetector();
					return this.intersects(segStrings, intFinder);
					break;
				}
			case 2:
				{
					let [segStrings, intDetector] = args;
					this.segSetMutInt.process(segStrings, intDetector);
					return intDetector.hasIntersection();
					break;
				}
		}
	}
	getClass() {
		return FastSegmentSetIntersectionFinder;
	}
}

