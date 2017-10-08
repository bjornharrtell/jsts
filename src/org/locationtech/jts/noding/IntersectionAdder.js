import extend from '../../../../extend';
import SegmentIntersector from './SegmentIntersector';
export default function IntersectionAdder() {
	this._hasIntersection = false;
	this._hasProper = false;
	this._hasProperInterior = false;
	this._hasInterior = false;
	this._properIntersectionPoint = null;
	this._li = null;
	this._isSelfIntersection = null;
	this.numIntersections = 0;
	this.numInteriorIntersections = 0;
	this.numProperIntersections = 0;
	this.numTests = 0;
	let li = arguments[0];
	this._li = li;
}
extend(IntersectionAdder.prototype, {
	isTrivialIntersection: function (e0, segIndex0, e1, segIndex1) {
		if (e0 === e1) {
			if (this._li.getIntersectionNum() === 1) {
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
	},
	getProperIntersectionPoint: function () {
		return this._properIntersectionPoint;
	},
	hasProperInteriorIntersection: function () {
		return this._hasProperInterior;
	},
	getLineIntersector: function () {
		return this._li;
	},
	hasProperIntersection: function () {
		return this._hasProper;
	},
	processIntersections: function (e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		this.numTests++;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this._li.computeIntersection(p00, p01, p10, p11);
		if (this._li.hasIntersection()) {
			this.numIntersections++;
			if (this._li.isInteriorIntersection()) {
				this.numInteriorIntersections++;
				this._hasInterior = true;
			}
			if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
				this._hasIntersection = true;
				e0.addIntersections(this._li, segIndex0, 0);
				e1.addIntersections(this._li, segIndex1, 1);
				if (this._li.isProper()) {
					this.numProperIntersections++;
					this._hasProper = true;
					this._hasProperInterior = true;
				}
			}
		}
	},
	hasIntersection: function () {
		return this._hasIntersection;
	},
	isDone: function () {
		return false;
	},
	hasInteriorIntersection: function () {
		return this._hasInterior;
	},
	interfaces_: function () {
		return [SegmentIntersector];
	},
	getClass: function () {
		return IntersectionAdder;
	}
});
IntersectionAdder.isAdjacentSegments = function (i1, i2) {
	return Math.abs(i1 - i2) === 1;
};
