import StringBuffer from '../../../../java/lang/StringBuffer';
import WKTWriter from '../io/WKTWriter';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import Assert from '../util/Assert';
export default function LineIntersector() {
	this._result = null;
	this._inputLines = Array(2).fill().map(() => Array(2));
	this._intPt = new Array(2).fill(null);
	this._intLineIndex = null;
	this._isProper = null;
	this._pa = null;
	this._pb = null;
	this._precisionModel = null;
	this._intPt[0] = new Coordinate();
	this._intPt[1] = new Coordinate();
	this._pa = this._intPt[0];
	this._pb = this._intPt[1];
	this._result = 0;
}
extend(LineIntersector.prototype, {
	getIndexAlongSegment: function (segmentIndex, intIndex) {
		this.computeIntLineIndex();
		return this._intLineIndex[segmentIndex][intIndex];
	},
	getTopologySummary: function () {
		var catBuf = new StringBuffer();
		if (this.isEndPoint()) catBuf.append(" endpoint");
		if (this._isProper) catBuf.append(" proper");
		if (this.isCollinear()) catBuf.append(" collinear");
		return catBuf.toString();
	},
	computeIntersection: function (p1, p2, p3, p4) {
		this._inputLines[0][0] = p1;
		this._inputLines[0][1] = p2;
		this._inputLines[1][0] = p3;
		this._inputLines[1][1] = p4;
		this._result = this.computeIntersect(p1, p2, p3, p4);
	},
	getIntersectionNum: function () {
		return this._result;
	},
	computeIntLineIndex: function () {
		if (arguments.length === 0) {
			if (this._intLineIndex === null) {
				this._intLineIndex = Array(2).fill().map(() => Array(2));
				this.computeIntLineIndex(0);
				this.computeIntLineIndex(1);
			}
		} else if (arguments.length === 1) {
			let segmentIndex = arguments[0];
			var dist0 = this.getEdgeDistance(segmentIndex, 0);
			var dist1 = this.getEdgeDistance(segmentIndex, 1);
			if (dist0 > dist1) {
				this._intLineIndex[segmentIndex][0] = 0;
				this._intLineIndex[segmentIndex][1] = 1;
			} else {
				this._intLineIndex[segmentIndex][0] = 1;
				this._intLineIndex[segmentIndex][1] = 0;
			}
		}
	},
	isProper: function () {
		return this.hasIntersection() && this._isProper;
	},
	setPrecisionModel: function (precisionModel) {
		this._precisionModel = precisionModel;
	},
	isInteriorIntersection: function () {
		if (arguments.length === 0) {
			if (this.isInteriorIntersection(0)) return true;
			if (this.isInteriorIntersection(1)) return true;
			return false;
		} else if (arguments.length === 1) {
			let inputLineIndex = arguments[0];
			for (var i = 0; i < this._result; i++) {
				if (!(this._intPt[i].equals2D(this._inputLines[inputLineIndex][0]) || this._intPt[i].equals2D(this._inputLines[inputLineIndex][1]))) {
					return true;
				}
			}
			return false;
		}
	},
	getIntersection: function (intIndex) {
		return this._intPt[intIndex];
	},
	isEndPoint: function () {
		return this.hasIntersection() && !this._isProper;
	},
	hasIntersection: function () {
		return this._result !== LineIntersector.NO_INTERSECTION;
	},
	getEdgeDistance: function (segmentIndex, intIndex) {
		var dist = LineIntersector.computeEdgeDistance(this._intPt[intIndex], this._inputLines[segmentIndex][0], this._inputLines[segmentIndex][1]);
		return dist;
	},
	isCollinear: function () {
		return this._result === LineIntersector.COLLINEAR_INTERSECTION;
	},
	toString: function () {
		return WKTWriter.toLineString(this._inputLines[0][0], this._inputLines[0][1]) + " - " + WKTWriter.toLineString(this._inputLines[1][0], this._inputLines[1][1]) + this.getTopologySummary();
	},
	getEndpoint: function (segmentIndex, ptIndex) {
		return this._inputLines[segmentIndex][ptIndex];
	},
	isIntersection: function (pt) {
		for (var i = 0; i < this._result; i++) {
			if (this._intPt[i].equals2D(pt)) {
				return true;
			}
		}
		return false;
	},
	getIntersectionAlongSegment: function (segmentIndex, intIndex) {
		this.computeIntLineIndex();
		return this._intPt[this._intLineIndex[segmentIndex][intIndex]];
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineIntersector;
	}
});
LineIntersector.computeEdgeDistance = function (p, p0, p1) {
	var dx = Math.abs(p1.x - p0.x);
	var dy = Math.abs(p1.y - p0.y);
	var dist = -1.0;
	if (p.equals(p0)) {
		dist = 0.0;
	} else if (p.equals(p1)) {
		if (dx > dy) dist = dx; else dist = dy;
	} else {
		var pdx = Math.abs(p.x - p0.x);
		var pdy = Math.abs(p.y - p0.y);
		if (dx > dy) dist = pdx; else dist = pdy;
		if (dist === 0.0 && !p.equals(p0)) {
			dist = Math.max(pdx, pdy);
		}
	}
	Assert.isTrue(!(dist === 0.0 && !p.equals(p0)), "Bad distance calculation");
	return dist;
};
LineIntersector.nonRobustComputeEdgeDistance = function (p, p1, p2) {
	var dx = p.x - p1.x;
	var dy = p.y - p1.y;
	var dist = Math.sqrt(dx * dx + dy * dy);
	Assert.isTrue(!(dist === 0.0 && !p.equals(p1)), "Invalid distance calculation");
	return dist;
};
LineIntersector.DONT_INTERSECT = 0;
LineIntersector.DO_INTERSECT = 1;
LineIntersector.COLLINEAR = 2;
LineIntersector.NO_INTERSECTION = 0;
LineIntersector.POINT_INTERSECTION = 1;
LineIntersector.COLLINEAR_INTERSECTION = 2;
