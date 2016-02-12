import StringBuffer from '../../../../java/lang/StringBuffer';
import WKTWriter from '../io/WKTWriter';
import Coordinate from '../geom/Coordinate';
import Assert from '../util/Assert';
export default class LineIntersector {
	constructor(...args) {
		this.result = null;
		this.inputLines = Array(2).fill().map(() => Array(2));
		this.intPt = new Array(2);
		this.intLineIndex = null;
		this._isProper = null;
		this.pa = null;
		this.pb = null;
		this.precisionModel = null;
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					this.intPt[0] = new Coordinate();
					this.intPt[1] = new Coordinate();
					this.pa = this.intPt[0];
					this.pb = this.intPt[1];
					this.result = 0;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static computeEdgeDistance(p, p0, p1) {
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
	}
	static nonRobustComputeEdgeDistance(p, p1, p2) {
		var dx = p.x - p1.x;
		var dy = p.y - p1.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		Assert.isTrue(!(dist === 0.0 && !p.equals(p1)), "Invalid distance calculation");
		return dist;
	}
	getIndexAlongSegment(segmentIndex, intIndex) {
		this.computeIntLineIndex();
		return this.intLineIndex[segmentIndex][intIndex];
	}
	getTopologySummary() {
		var catBuf = new StringBuffer();
		if (this.isEndPoint()) catBuf.append(" endpoint");
		if (this._isProper) catBuf.append(" proper");
		if (this.isCollinear()) catBuf.append(" collinear");
		return catBuf.toString();
	}
	computeIntersection(p1, p2, p3, p4) {
		this.inputLines[0][0] = p1;
		this.inputLines[0][1] = p2;
		this.inputLines[1][0] = p3;
		this.inputLines[1][1] = p4;
		this.result = this.computeIntersect(p1, p2, p3, p4);
	}
	getIntersectionNum() {
		return this.result;
	}
	computeIntLineIndex(...args) {
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					if (this.intLineIndex === null) {
						this.intLineIndex = Array(2).fill().map(() => Array(2));
						this.computeIntLineIndex(0);
						this.computeIntLineIndex(1);
					}
				})(...args);
			case 1:
				return ((...args) => {
					let [segmentIndex] = args;
					var dist0 = this.getEdgeDistance(segmentIndex, 0);
					var dist1 = this.getEdgeDistance(segmentIndex, 1);
					if (dist0 > dist1) {
						this.intLineIndex[segmentIndex][0] = 0;
						this.intLineIndex[segmentIndex][1] = 1;
					} else {
						this.intLineIndex[segmentIndex][0] = 1;
						this.intLineIndex[segmentIndex][1] = 0;
					}
				})(...args);
		}
	}
	isProper() {
		return this.hasIntersection() && this._isProper;
	}
	setPrecisionModel(precisionModel) {
		this.precisionModel = precisionModel;
	}
	isInteriorIntersection(...args) {
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
					if (this.isInteriorIntersection(0)) return true;
					if (this.isInteriorIntersection(1)) return true;
					return false;
				})(...args);
			case 1:
				return ((...args) => {
					let [inputLineIndex] = args;
					for (var i = 0; i < this.result; i++) {
						if (!(this.intPt[i].equals2D(this.inputLines[inputLineIndex][0]) || this.intPt[i].equals2D(this.inputLines[inputLineIndex][1]))) {
							return true;
						}
					}
					return false;
				})(...args);
		}
	}
	getIntersection(intIndex) {
		return this.intPt[intIndex];
	}
	isEndPoint() {
		return this.hasIntersection() && !this._isProper;
	}
	hasIntersection() {
		return this.result !== LineIntersector.NO_INTERSECTION;
	}
	getEdgeDistance(segmentIndex, intIndex) {
		var dist = LineIntersector.computeEdgeDistance(this.intPt[intIndex], this.inputLines[segmentIndex][0], this.inputLines[segmentIndex][1]);
		return dist;
	}
	isCollinear() {
		return this.result === LineIntersector.COLLINEAR_INTERSECTION;
	}
	toString() {
		return WKTWriter.toLineString(this.inputLines[0][0], this.inputLines[0][1]) + " - " + WKTWriter.toLineString(this.inputLines[1][0], this.inputLines[1][1]) + this.getTopologySummary();
	}
	getEndpoint(segmentIndex, ptIndex) {
		return this.inputLines[segmentIndex][ptIndex];
	}
	isIntersection(pt) {
		for (var i = 0; i < this.result; i++) {
			if (this.intPt[i].equals2D(pt)) {
				return true;
			}
		}
		return false;
	}
	getIntersectionAlongSegment(segmentIndex, intIndex) {
		this.computeIntLineIndex();
		return this.intPt[this.intLineIndex[segmentIndex][intIndex]];
	}
	getClass() {
		return LineIntersector;
	}
}
LineIntersector.DONT_INTERSECT = 0;
LineIntersector.DO_INTERSECT = 1;
LineIntersector.COLLINEAR = 2;
LineIntersector.NO_INTERSECTION = 0;
LineIntersector.POINT_INTERSECTION = 1;
LineIntersector.COLLINEAR_INTERSECTION = 2;

