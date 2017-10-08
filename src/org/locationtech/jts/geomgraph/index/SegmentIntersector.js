import extend from '../../../../../extend';
export default function SegmentIntersector() {
	this._hasIntersection = false;
	this._hasProper = false;
	this._hasProperInterior = false;
	this._properIntersectionPoint = null;
	this._li = null;
	this._includeProper = null;
	this._recordIsolated = null;
	this._isSelfIntersection = null;
	this._numIntersections = 0;
	this.numTests = 0;
	this._bdyNodes = null;
	this._isDone = false;
	this._isDoneWhenProperInt = false;
	let li = arguments[0], includeProper = arguments[1], recordIsolated = arguments[2];
	this._li = li;
	this._includeProper = includeProper;
	this._recordIsolated = recordIsolated;
}
extend(SegmentIntersector.prototype, {
	isTrivialIntersection: function (e0, segIndex0, e1, segIndex1) {
		if (e0 === e1) {
			if (this._li.getIntersectionNum() === 1) {
				if (SegmentIntersector.isAdjacentSegments(segIndex0, segIndex1)) return true;
				if (e0.isClosed()) {
					var maxSegIndex = e0.getNumPoints() - 1;
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
	setIsDoneIfProperInt: function (isDoneWhenProperInt) {
		this._isDoneWhenProperInt = isDoneWhenProperInt;
	},
	hasProperInteriorIntersection: function () {
		return this._hasProperInterior;
	},
	isBoundaryPointInternal: function (li, bdyNodes) {
		for (var i = bdyNodes.iterator(); i.hasNext(); ) {
			var node = i.next();
			var pt = node.getCoordinate();
			if (li.isIntersection(pt)) return true;
		}
		return false;
	},
	hasProperIntersection: function () {
		return this._hasProper;
	},
	hasIntersection: function () {
		return this._hasIntersection;
	},
	isDone: function () {
		return this._isDone;
	},
	isBoundaryPoint: function (li, bdyNodes) {
		if (bdyNodes === null) return false;
		if (this.isBoundaryPointInternal(li, bdyNodes[0])) return true;
		if (this.isBoundaryPointInternal(li, bdyNodes[1])) return true;
		return false;
	},
	setBoundaryNodes: function (bdyNodes0, bdyNodes1) {
		this._bdyNodes = new Array(2).fill(null);
		this._bdyNodes[0] = bdyNodes0;
		this._bdyNodes[1] = bdyNodes1;
	},
	addIntersections: function (e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		this.numTests++;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this._li.computeIntersection(p00, p01, p10, p11);
		if (this._li.hasIntersection()) {
			if (this._recordIsolated) {
				e0.setIsolated(false);
				e1.setIsolated(false);
			}
			this._numIntersections++;
			if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
				this._hasIntersection = true;
				if (this._includeProper || !this._li.isProper()) {
					e0.addIntersections(this._li, segIndex0, 0);
					e1.addIntersections(this._li, segIndex1, 1);
				}
				if (this._li.isProper()) {
					this._properIntersectionPoint = this._li.getIntersection(0).copy();
					this._hasProper = true;
					if (this._isDoneWhenProperInt) {
						this._isDone = true;
					}
					if (!this.isBoundaryPoint(this._li, this._bdyNodes)) this._hasProperInterior = true;
				}
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentIntersector;
	}
});
SegmentIntersector.isAdjacentSegments = function (i1, i2) {
	return Math.abs(i1 - i2) === 1;
};
