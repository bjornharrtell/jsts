import SegmentIntersector from './SegmentIntersector';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
export default class SegmentIntersectionDetector {
	constructor(...args) {
		this.li = null;
		this.findProper = false;
		this.findAllTypes = false;
		this._hasIntersection = false;
		this._hasProperIntersection = false;
		this._hasNonProperIntersection = false;
		this.intPt = null;
		this.intSegments = null;
		const overloaded = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						overloaded.call(this, new RobustLineIntersector());
					})(...args);
				case 1:
					return ((...args) => {
						let [li] = args;
						this.li = li;
					})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [SegmentIntersector];
	}
	getIntersectionSegments() {
		return this.intSegments;
	}
	setFindAllIntersectionTypes(findAllTypes) {
		this.findAllTypes = findAllTypes;
	}
	hasProperIntersection() {
		return this._hasProperIntersection;
	}
	getIntersection() {
		return this.intPt;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
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
				this.intSegments = new Array(4);
				this.intSegments[0] = p00;
				this.intSegments[1] = p01;
				this.intSegments[2] = p10;
				this.intSegments[3] = p11;
			}
		}
	}
	hasIntersection() {
		return this._hasIntersection;
	}
	isDone() {
		if (this.findAllTypes) {
			return this._hasProperIntersection && this._hasNonProperIntersection;
		}
		if (this.findProper) {
			return this._hasProperIntersection;
		}
		return this._hasIntersection;
	}
	hasNonProperIntersection() {
		return this._hasNonProperIntersection;
	}
	setFindProper(findProper) {
		this.findProper = findProper;
	}
	getClass() {
		return SegmentIntersectionDetector;
	}
}

