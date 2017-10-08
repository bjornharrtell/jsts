import extend from '../../../../extend';
import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../java/util/ArrayList';
export default function InteriorIntersectionFinder() {
	this._findAllIntersections = false;
	this._isCheckEndSegmentsOnly = false;
	this._li = null;
	this._interiorIntersection = null;
	this._intSegments = null;
	this._intersections = new ArrayList();
	this._intersectionCount = 0;
	this._keepIntersections = true;
	let li = arguments[0];
	this._li = li;
	this._interiorIntersection = null;
}
extend(InteriorIntersectionFinder.prototype, {
	getInteriorIntersection: function () {
		return this._interiorIntersection;
	},
	setCheckEndSegmentsOnly: function (isCheckEndSegmentsOnly) {
		this._isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
	},
	getIntersectionSegments: function () {
		return this._intSegments;
	},
	count: function () {
		return this._intersectionCount;
	},
	getIntersections: function () {
		return this._intersections;
	},
	setFindAllIntersections: function (findAllIntersections) {
		this._findAllIntersections = findAllIntersections;
	},
	setKeepIntersections: function (keepIntersections) {
		this._keepIntersections = keepIntersections;
	},
	processIntersections: function (e0, segIndex0, e1, segIndex1) {
		if (!this._findAllIntersections && this.hasIntersection()) return null;
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		if (this._isCheckEndSegmentsOnly) {
			var isEndSegPresent = this.isEndSegment(e0, segIndex0) || this.isEndSegment(e1, segIndex1);
			if (!isEndSegPresent) return null;
		}
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this._li.computeIntersection(p00, p01, p10, p11);
		if (this._li.hasIntersection()) {
			if (this._li.isInteriorIntersection()) {
				this._intSegments = new Array(4).fill(null);
				this._intSegments[0] = p00;
				this._intSegments[1] = p01;
				this._intSegments[2] = p10;
				this._intSegments[3] = p11;
				this._interiorIntersection = this._li.getIntersection(0);
				if (this._keepIntersections) this._intersections.add(this._interiorIntersection);
				this._intersectionCount++;
			}
		}
	},
	isEndSegment: function (segStr, index) {
		if (index === 0) return true;
		if (index >= segStr.size() - 2) return true;
		return false;
	},
	hasIntersection: function () {
		return this._interiorIntersection !== null;
	},
	isDone: function () {
		if (this._findAllIntersections) return false;
		return this._interiorIntersection !== null;
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
