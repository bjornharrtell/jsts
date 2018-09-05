import SegmentIntersectionDetector from './SegmentIntersectionDetector';
import MCIndexSegmentSetMutualIntersector from './MCIndexSegmentSetMutualIntersector';
export default class FastSegmentSetIntersectionFinder {
	constructor() {
		FastSegmentSetIntersectionFinder.constructor_.apply(this, arguments);
	}
	getSegmentSetIntersector() {
		return this._segSetMutInt;
	}
	intersects() {
		if (arguments.length === 1) {
			let segStrings = arguments[0];
			var intFinder = new SegmentIntersectionDetector();
			return this.intersects(segStrings, intFinder);
		} else if (arguments.length === 2) {
			let segStrings = arguments[0], intDetector = arguments[1];
			this._segSetMutInt.process(segStrings, intDetector);
			return intDetector.hasIntersection();
		}
	}
	getClass() {
		return FastSegmentSetIntersectionFinder;
	}
	get interfaces_() {
		return [];
	}
}
FastSegmentSetIntersectionFinder.constructor_ = function () {
	this._segSetMutInt = null;
	let baseSegStrings = arguments[0];
	this._segSetMutInt = new MCIndexSegmentSetMutualIntersector(baseSegStrings);
};
