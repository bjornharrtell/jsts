import StringBuffer from '../../../../../java/lang/StringBuffer';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import Envelope from '../../geom/Envelope';
export default function FacetSequence() {
	this.pts = null;
	this.start = null;
	this.end = null;
	this.pt = new Coordinate();
	this.seqPt = new Coordinate();
	this.p0 = new Coordinate();
	this.p1 = new Coordinate();
	this.q0 = new Coordinate();
	this.q1 = new Coordinate();
	if (arguments.length === 2) {
		let pts = arguments[0], start = arguments[1];
		this.pts = pts;
		this.start = start;
		this.end = start + 1;
	} else if (arguments.length === 3) {
		let pts = arguments[0], start = arguments[1], end = arguments[2];
		this.pts = pts;
		this.start = start;
		this.end = end;
	}
}
extend(FacetSequence.prototype, {
	size: function () {
		return this.end - this.start;
	},
	computeLineLineDistance: function (facetSeq) {
		var minDistance = Double.MAX_VALUE;
		for (var i = this.start; i < this.end - 1; i++) {
			for (var j = facetSeq.start; j < facetSeq.end - 1; j++) {
				this.pts.getCoordinate(i, this.p0);
				this.pts.getCoordinate(i + 1, this.p1);
				facetSeq.pts.getCoordinate(j, this.q0);
				facetSeq.pts.getCoordinate(j + 1, this.q1);
				var dist = CGAlgorithms.distanceLineLine(this.p0, this.p1, this.q0, this.q1);
				if (dist === 0.0) return 0.0;
				if (dist < minDistance) {
					minDistance = dist;
				}
			}
		}
		return minDistance;
	},
	getCoordinate: function (index) {
		return this.pts.getCoordinate(this.start + index);
	},
	getEnvelope: function () {
		var env = new Envelope();
		for (var i = this.start; i < this.end; i++) {
			env.expandToInclude(this.pts.getX(i), this.pts.getY(i));
		}
		return env;
	},
	computePointLineDistance: function (pt, facetSeq) {
		var minDistance = Double.MAX_VALUE;
		for (var i = facetSeq.start; i < facetSeq.end - 1; i++) {
			facetSeq.pts.getCoordinate(i, this.q0);
			facetSeq.pts.getCoordinate(i + 1, this.q1);
			var dist = CGAlgorithms.distancePointLine(pt, this.q0, this.q1);
			if (dist === 0.0) return 0.0;
			if (dist < minDistance) {
				minDistance = dist;
			}
		}
		return minDistance;
	},
	toString: function () {
		var buf = new StringBuffer();
		buf.append("LINESTRING ( ");
		var p = new Coordinate();
		for (var i = this.start; i < this.end; i++) {
			if (i > this.start) buf.append(", ");
			this.pts.getCoordinate(i, p);
			buf.append(p.x + " " + p.y);
		}
		buf.append(" )");
		return buf.toString();
	},
	isPoint: function () {
		return this.end - this.start === 1;
	},
	distance: function (facetSeq) {
		var isPoint = this.isPoint();
		var isPointOther = facetSeq.isPoint();
		if (isPoint && isPointOther) {
			this.pts.getCoordinate(this.start, this.pt);
			facetSeq.pts.getCoordinate(facetSeq.start, this.seqPt);
			return this.pt.distance(this.seqPt);
		} else if (isPoint) {
			this.pts.getCoordinate(this.start, this.pt);
			return this.computePointLineDistance(this.pt, facetSeq);
		} else if (isPointOther) {
			facetSeq.pts.getCoordinate(facetSeq.start, this.seqPt);
			return this.computePointLineDistance(this.seqPt, this);
		}
		return this.computeLineLineDistance(facetSeq);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return FacetSequence;
	}
});

