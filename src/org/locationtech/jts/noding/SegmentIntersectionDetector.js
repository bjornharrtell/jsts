import SegmentIntersector from './SegmentIntersector';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
export default class SegmentIntersectionDetector {
	constructor() {
		SegmentIntersectionDetector.constructor_.apply(this, arguments);
	}
	getIntersectionSegments() {
		return this._intSegments;
	}
	setFindAllIntersectionTypes(findAllTypes) {
		this._findAllTypes = findAllTypes;
	}
	hasProperIntersection() {
		return this._hasProperIntersection;
	}
	getIntersection() {
		return this._intPt;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this._li.computeIntersection(p00, p01, p10, p11);
		if (this._li.hasIntersection()) {
			this._hasIntersection = true;
			var isProper = this._li.isProper();
			if (isProper) this._hasProperIntersection = true;
			if (!isProper) this._hasNonProperIntersection = true;
			var saveLocation = true;
			if (this._findProper && !isProper) saveLocation = false;
			if (this._intPt === null || saveLocation) {
				this._intPt = this._li.getIntersection(0);
				this._intSegments = new Array(4).fill(null);
				this._intSegments[0] = p00;
				this._intSegments[1] = p01;
				this._intSegments[2] = p10;
				this._intSegments[3] = p11;
			}
		}
	}
	hasIntersection() {
		return this._hasIntersection;
	}
	isDone() {
		if (this._findAllTypes) {
			return this._hasProperIntersection && this._hasNonProperIntersection;
		}
		if (this._findProper) {
			return this._hasProperIntersection;
		}
		return this._hasIntersection;
	}
	hasNonProperIntersection() {
		return this._hasNonProperIntersection;
	}
	setFindProper(findProper) {
		this._findProper = findProper;
	}
	getClass() {
		return SegmentIntersectionDetector;
	}
	get interfaces_() {
		return [SegmentIntersector];
	}
}
SegmentIntersectionDetector.constructor_ = function () {
	this._li = null;
	this._findProper = false;
	this._findAllTypes = false;
	this._hasIntersection = false;
	this._hasProperIntersection = false;
	this._hasNonProperIntersection = false;
	this._intPt = null;
	this._intSegments = null;
	if (arguments.length === 0) {
		SegmentIntersectionDetector.constructor_.call(this, new RobustLineIntersector());
	} else if (arguments.length === 1) {
		let li = arguments[0];
		this._li = li;
	}
};
