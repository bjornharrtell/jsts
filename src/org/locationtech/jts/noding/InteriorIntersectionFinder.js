import extend from '../../../../extend';
import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../java/util/ArrayList';
export default function InteriorIntersectionFinder() {
	this.findAllIntersections = false;
	this.isCheckEndSegmentsOnly = false;
	this.li = null;
	this.interiorIntersection = null;
	this.intSegments = null;
	this.intersections = new ArrayList();
	this.intersectionCount = 0;
	this.keepIntersections = true;
	let li = arguments[0];
	this.li = li;
	this.interiorIntersection = null;
}
extend(InteriorIntersectionFinder.prototype, {
	getInteriorIntersection: function () {
		return this.interiorIntersection;
	},
	setCheckEndSegmentsOnly: function (isCheckEndSegmentsOnly) {
		this.isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
	},
	getIntersectionSegments: function () {
		return this.intSegments;
	},
	count: function () {
		return this.intersectionCount;
	},
	getIntersections: function () {
		return this.intersections;
	},
	setFindAllIntersections: function (findAllIntersections) {
		this.findAllIntersections = findAllIntersections;
	},
	setKeepIntersections: function (keepIntersections) {
		this.keepIntersections = keepIntersections;
	},
	processIntersections: function (e0, segIndex0, e1, segIndex1) {
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
				this.intSegments = new Array(4).fill(null);
				this.intSegments[0] = p00;
				this.intSegments[1] = p01;
				this.intSegments[2] = p10;
				this.intSegments[3] = p11;
				this.interiorIntersection = this.li.getIntersection(0);
				if (this.keepIntersections) this.intersections.add(this.interiorIntersection);
				this.intersectionCount++;
			}
		}
	},
	isEndSegment: function (segStr, index) {
		if (index === 0) return true;
		if (index >= segStr.size() - 2) return true;
		return false;
	},
	hasIntersection: function () {
		return this.interiorIntersection !== null;
	},
	isDone: function () {
		if (this.findAllIntersections) return false;
		return this.interiorIntersection !== null;
	},
	interfaces_: function () {
		return [SegmentIntersector];
	},
	getClass: function () {
		return InteriorIntersectionFinder;
	}
});
InteriorIntersectionFinder.createAllIntersectionsFinder = function (li) {
	var finder = new InteriorIntersectionFinder(li);
	finder.setFindAllIntersections(true);
	return finder;
};
InteriorIntersectionFinder.createAnyIntersectionFinder = function (li) {
	return new InteriorIntersectionFinder(li);
};
InteriorIntersectionFinder.createIntersectionCounter = function (li) {
	var finder = new InteriorIntersectionFinder(li);
	finder.setFindAllIntersections(true);
	finder.setKeepIntersections(false);
	return finder;
};

