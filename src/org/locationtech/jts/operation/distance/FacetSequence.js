import StringBuffer from '../../../../../java/lang/StringBuffer';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
import extend from '../../../../../extend';
import Envelope from '../../geom/Envelope';
import Distance from '../../algorithm/Distance';
export default function FacetSequence() {
	this._pts = null;
	this._start = null;
	this._end = null;
	this._pt = new Coordinate();
	this._seqPt = new Coordinate();
	this._p0 = new Coordinate();
	this._p1 = new Coordinate();
	this._q0 = new Coordinate();
	this._q1 = new Coordinate();
	if (arguments.length === 2) {
		let pts = arguments[0], start = arguments[1];
		this._pts = pts;
		this._start = start;
		this._end = start + 1;
	} else if (arguments.length === 3) {
		let pts = arguments[0], start = arguments[1], end = arguments[2];
		this._pts = pts;
		this._start = start;
		this._end = end;
	}
}
extend(FacetSequence.prototype, {
	size: function () {
		return this._end - this._start;
	},
	computeLineLineDistance: function (facetSeq) {
		var minDistance = Double.MAX_VALUE;
		for (var i = this._start; i < this._end - 1; i++) {
			for (var j = facetSeq._start; j < facetSeq._end - 1; j++) {
				this._pts.getCoordinate(i, this._p0);
				this._pts.getCoordinate(i + 1, this._p1);
				facetSeq._pts.getCoordinate(j, this._q0);
				facetSeq._pts.getCoordinate(j + 1, this._q1);
				var dist = Distance.segmentToSegment(this._p0, this._p1, this._q0, this._q1);
				if (dist === 0.0) return 0.0;
				if (dist < minDistance) {
					minDistance = dist;
				}
			}
		}
		return minDistance;
	},
	getCoordinate: function (index) {
		return this._pts.getCoordinate(this._start + index);
	},
	getEnvelope: function () {
		var env = new Envelope();
		for (var i = this._start; i < this._end; i++) {
			env.expandToInclude(this._pts.getX(i), this._pts.getY(i));
		}
		return env;
	},
	computePointLineDistance: function (pt, facetSeq) {
		var minDistance = Double.MAX_VALUE;
		for (var i = facetSeq._start; i < facetSeq._end - 1; i++) {
			facetSeq._pts.getCoordinate(i, this._q0);
			facetSeq._pts.getCoordinate(i + 1, this._q1);
			var dist = Distance.pointToSegment(pt, this._q0, this._q1);
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
		for (var i = this._start; i < this._end; i++) {
			if (i > this._start) buf.append(", ");
			this._pts.getCoordinate(i, p);
			buf.append(p.x + " " + p.y);
		}
		buf.append(" )");
		return buf.toString();
	},
	isPoint: function () {
		return this._end - this._start === 1;
	},
	distance: function (facetSeq) {
		var isPoint = this.isPoint();
		var isPointOther = facetSeq.isPoint();
		if (isPoint && isPointOther) {
			this._pts.getCoordinate(this._start, this._pt);
			facetSeq._pts.getCoordinate(facetSeq._start, this._seqPt);
			return this._pt.distance(this._seqPt);
		} else if (isPoint) {
			this._pts.getCoordinate(this._start, this._pt);
			return this.computePointLineDistance(this._pt, facetSeq);
		} else if (isPointOther) {
			facetSeq._pts.getCoordinate(facetSeq._start, this._seqPt);
			return this.computePointLineDistance(this._seqPt, this);
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
