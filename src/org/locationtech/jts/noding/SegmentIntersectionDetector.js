import extend from '../../../../extend';
import SegmentIntersector from './SegmentIntersector';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
export default function SegmentIntersectionDetector() {
	this.li = null;
	this.findProper = false;
	this.findAllTypes = false;
	this._hasIntersection = false;
	this._hasProperIntersection = false;
	this._hasNonProperIntersection = false;
	this.intPt = null;
	this.intSegments = null;
	if (arguments.length === 0) {
		SegmentIntersectionDetector.call(this, new RobustLineIntersector());
	} else if (arguments.length === 1) {
		let li = arguments[0];
		this.li = li;
	}
}
extend(SegmentIntersectionDetector.prototype, {
	getIntersectionSegments: function () {
		return this.intSegments;
	},
	setFindAllIntersectionTypes: function (findAllTypes) {
		this.findAllTypes = findAllTypes;
	},
	hasProperIntersection: function () {
		return this._hasProperIntersection;
	},
	getIntersection: function () {
		return this.intPt;
	},
	processIntersections: function (e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			this._hasIntersection = true;
			var isProper = this.li.isProper();
			if (isProper) this._hasProperIntersection = true;
			if (!isProper) this._hasNonProperIntersection = true;
			var saveLocation = true;
			if (this.findProper && !isProper) saveLocation = false;
			if (this.intPt === null || saveLocation) {
				this.intPt = this.li.getIntersection(0);
				this.intSegments = new Array(4).fill(null);
				this.intSegments[0] = p00;
				this.intSegments[1] = p01;
				this.intSegments[2] = p10;
				this.intSegments[3] = p11;
			}
		}
	},
	hasIntersection: function () {
		return this._hasIntersection;
	},
	isDone: function () {
		if (this.findAllTypes) {
			return this._hasProperIntersection && this._hasNonProperIntersection;
		}
		if (this.findProper) {
			return this._hasProperIntersection;
		}
		return this._hasIntersection;
	},
	hasNonProperIntersection: function () {
		return this._hasNonProperIntersection;
	},
	setFindProper: function (findProper) {
		this.findProper = findProper;
	},
	interfaces_: function () {
		return [SegmentIntersector];
	},
	getClass: function () {
		return SegmentIntersectionDetector;
	}
});

