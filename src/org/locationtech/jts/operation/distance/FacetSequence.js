import StringBuffer from '../../../../../java/lang/StringBuffer';
import CGAlgorithms from '../../algorithm/CGAlgorithms';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
import Envelope from '../../geom/Envelope';
export default class FacetSequence {
	constructor(...args) {
		this.pts = null;
		this.start = null;
		this.end = null;
		this.pt = new Coordinate();
		this.seqPt = new Coordinate();
		this.p0 = new Coordinate();
		this.p1 = new Coordinate();
		this.q0 = new Coordinate();
		this.q1 = new Coordinate();
		const overloaded = (...args) => {
			if (args.length === 2) {
				return ((...args) => {
					let [pts, start] = args;
					this.pts = pts;
					this.start = start;
					this.end = start + 1;
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [pts, start, end] = args;
					this.pts = pts;
					this.start = start;
					this.end = end;
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	size() {
		return this.end - this.start;
	}
	computeLineLineDistance(facetSeq) {
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
	}
	getCoordinate(index) {
		return this.pts.getCoordinate(this.start + index);
	}
	getEnvelope() {
		var env = new Envelope();
		for (var i = this.start; i < this.end; i++) {
			env.expandToInclude(this.pts.getX(i), this.pts.getY(i));
		}
		return env;
	}
	computePointLineDistance(pt, facetSeq) {
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
	}
	toString() {
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
	}
	isPoint() {
		return this.end - this.start === 1;
	}
	distance(facetSeq) {
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
	}
	getClass() {
		return FacetSequence;
	}
}

