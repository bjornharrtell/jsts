import SegmentIntersectionDetector from './SegmentIntersectionDetector';
import MCIndexSegmentSetMutualIntersector from './MCIndexSegmentSetMutualIntersector';
export default class FastSegmentSetIntersectionFinder {
	constructor(...args) {
		(() => {
			this.segSetMutInt = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [baseSegStrings] = args;
						this.segSetMutInt = new MCIndexSegmentSetMutualIntersector(baseSegStrings);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	getSegmentSetIntersector() {
		return this.segSetMutInt;
	}
	intersects(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [segStrings] = args;
						var intFinder = new SegmentIntersectionDetector();
						return this.intersects(segStrings, intFinder);
					})(...args);
				case 2:
					return ((...args) => {
						let [segStrings, intDetector] = args;
						this.segSetMutInt.process(segStrings, intDetector);
						return intDetector.hasIntersection();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return FastSegmentSetIntersectionFinder;
	}
}

