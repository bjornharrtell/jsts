import extend from '../../../../extend';
import SegmentIntersectionDetector from './SegmentIntersectionDetector';
import MCIndexSegmentSetMutualIntersector from './MCIndexSegmentSetMutualIntersector';
export default function FastSegmentSetIntersectionFinder() {
	this.segSetMutInt = null;
	let baseSegStrings = arguments[0];
	this.segSetMutInt = new MCIndexSegmentSetMutualIntersector(baseSegStrings);
}
extend(FastSegmentSetIntersectionFinder.prototype, {
	getSegmentSetIntersector: function () {
		return this.segSetMutInt;
	},
	intersects: function () {
		if (arguments.length === 1) {
			let segStrings = arguments[0];
			var intFinder = new SegmentIntersectionDetector();
			return this.intersects(segStrings, intFinder);
		} else if (arguments.length === 2) {
			let segStrings = arguments[0], intDetector = arguments[1];
			this.segSetMutInt.process(segStrings, intDetector);
			return intDetector.hasIntersection();
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return FastSegmentSetIntersectionFinder;
	}
});
