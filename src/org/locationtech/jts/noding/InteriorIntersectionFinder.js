import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../java/util/ArrayList';
export default class InteriorIntersectionFinder {
	constructor() {
		InteriorIntersectionFinder.constructor_.apply(this, arguments);
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
		return this._interiorIntersection;
	}
	setCheckEndSegmentsOnly(isCheckEndSegmentsOnly) {
		this._isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
	}
	getIntersectionSegments() {
		return this._intSegments;
	}
	count() {
		return this._intersectionCount;
	}
	getIntersections() {
		return this._intersections;
	}
	setFindAllIntersections(findAllIntersections) {
		this._findAllIntersections = findAllIntersections;
	}
	setKeepIntersections(keepIntersections) {
		this._keepIntersections = keepIntersections;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
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
	}
	isEndSegment(segStr, index) {
		if (index === 0) return true;
		if (index >= segStr.size() - 2) return true;
		return false;
	}
	hasIntersection() {
		return this._interiorIntersection !== null;
	}
	isDone() {
		if (this._findAllIntersections) return false;
		return this._interiorIntersection !== null;
	}
	getClass() {
		return InteriorIntersectionFinder;
	}
	get interfaces_() {
		return [SegmentIntersector];
	}
}
InteriorIntersectionFinder.constructor_ = function () {
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
};
