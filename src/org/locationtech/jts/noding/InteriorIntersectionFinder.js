import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../java/util/ArrayList';
export default class InteriorIntersectionFinder {
	constructor(...args) {
		(() => {
			this.findAllIntersections = false;
			this.isCheckEndSegmentsOnly = false;
			this.li = null;
			this.interiorIntersection = null;
			this.intSegments = null;
			this.intersections = new ArrayList();
			this.intersectionCount = 0;
			this.keepIntersections = true;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [li] = args;
						this.li = li;
						this.interiorIntersection = null;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [SegmentIntersector];
	}
	static createAllIntersectionsFinder(li) {
		var finder = new InteriorIntersectionFinder(li);
		finder.setFindAllIntersections(true);
		return finder;
	}
	static createAnyIntersectionFinder(li) {
		return new InteriorIntersectionFinder(li);
	}
	static createIntersectionCounter(li) {
		var finder = new InteriorIntersectionFinder(li);
		finder.setFindAllIntersections(true);
		finder.setKeepIntersections(false);
		return finder;
	}
	getInteriorIntersection() {
		return this.interiorIntersection;
	}
	setCheckEndSegmentsOnly(isCheckEndSegmentsOnly) {
		this.isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
	}
	getIntersectionSegments() {
		return this.intSegments;
	}
	count() {
		return this.intersectionCount;
	}
	getIntersections() {
		return this.intersections;
	}
	setFindAllIntersections(findAllIntersections) {
		this.findAllIntersections = findAllIntersections;
	}
	setKeepIntersections(keepIntersections) {
		this.keepIntersections = keepIntersections;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (!this.findAllIntersections && this.hasIntersection()) return null;
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		if (this.isCheckEndSegmentsOnly) {
			var isEndSegPresent = this.isEndSegment(e0, segIndex0) || this.isEndSegment(e1, segIndex1);
			if (!isEndSegPresent) return null;
		}
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			if (this.li.isInteriorIntersection()) {
				this.intSegments = new Array(4);
				this.intSegments[0] = p00;
				this.intSegments[1] = p01;
				this.intSegments[2] = p10;
				this.intSegments[3] = p11;
				this.interiorIntersection = this.li.getIntersection(0);
				if (this.keepIntersections) this.intersections.add(this.interiorIntersection);
				this.intersectionCount++;
			}
		}
	}
	isEndSegment(segStr, index) {
		if (index === 0) return true;
		if (index >= segStr.size() - 2) return true;
		return false;
	}
	hasIntersection() {
		return this.interiorIntersection !== null;
	}
	isDone() {
		if (this.findAllIntersections) return false;
		return this.interiorIntersection !== null;
	}
	getClass() {
		return InteriorIntersectionFinder;
	}
}

