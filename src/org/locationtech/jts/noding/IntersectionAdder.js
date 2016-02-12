import SegmentIntersector from './SegmentIntersector';
export default class IntersectionAdder {
	constructor(...args) {
		this._hasIntersection = false;
		this.hasProper = false;
		this.hasProperInterior = false;
		this.hasInterior = false;
		this.properIntersectionPoint = null;
		this.li = null;
		this.isSelfIntersection = null;
		this.numIntersections = 0;
		this.numInteriorIntersections = 0;
		this.numProperIntersections = 0;
		this.numTests = 0;
		if (args.length === 1) {
			let [li] = args;
			this.li = li;
		}
	}
	get interfaces_() {
		return [SegmentIntersector];
	}
	static isAdjacentSegments(i1, i2) {
		return Math.abs(i1 - i2) === 1;
	}
	isTrivialIntersection(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1) {
			if (this.li.getIntersectionNum() === 1) {
				if (IntersectionAdder.isAdjacentSegments(segIndex0, segIndex1)) return true;
				if (e0.isClosed()) {
					var maxSegIndex = e0.size() - 1;
					if (segIndex0 === 0 && segIndex1 === maxSegIndex || segIndex1 === 0 && segIndex0 === maxSegIndex) {
						return true;
					}
				}
			}
		}
		return false;
	}
	getProperIntersectionPoint() {
		return this.properIntersectionPoint;
	}
	hasProperInteriorIntersection() {
		return this.hasProperInterior;
	}
	getLineIntersector() {
		return this.li;
	}
	hasProperIntersection() {
		return this.hasProper;
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		this.numTests++;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			this.numIntersections++;
			if (this.li.isInteriorIntersection()) {
				this.numInteriorIntersections++;
				this.hasInterior = true;
			}
			if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
				this._hasIntersection = true;
				e0.addIntersections(this.li, segIndex0, 0);
				e1.addIntersections(this.li, segIndex1, 1);
				if (this.li.isProper()) {
					this.numProperIntersections++;
					this.hasProper = true;
					this.hasProperInterior = true;
				}
			}
		}
	}
	hasIntersection() {
		return this._hasIntersection;
	}
	isDone() {
		return false;
	}
	hasInteriorIntersection() {
		return this.hasInterior;
	}
	getClass() {
		return IntersectionAdder;
	}
}

