import CoordinateFilter from '../geom/CoordinateFilter';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import LineSegment from '../geom/LineSegment';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
import Distance from '../algorithm/Distance';
export default class SimpleMinimumClearance {
	constructor() {
		SimpleMinimumClearance.constructor_.apply(this, arguments);
	}
	static getLine(g) {
		var rp = new SimpleMinimumClearance(g);
		return rp.getLine();
	}
	static getDistance(g) {
		var rp = new SimpleMinimumClearance(g);
		return rp.getDistance();
	}
	getLine() {
		this.compute();
		return this._inputGeom.getFactory().createLineString(this._minClearancePts);
	}
	updateClearance() {
		if (arguments.length === 3) {
			let candidateValue = arguments[0], p0 = arguments[1], p1 = arguments[2];
			if (candidateValue < this._minClearance) {
				this._minClearance = candidateValue;
				this._minClearancePts[0] = new Coordinate(p0);
				this._minClearancePts[1] = new Coordinate(p1);
			}
		} else if (arguments.length === 4) {
			let candidateValue = arguments[0], p = arguments[1], seg0 = arguments[2], seg1 = arguments[3];
			if (candidateValue < this._minClearance) {
				this._minClearance = candidateValue;
				this._minClearancePts[0] = new Coordinate(p);
				var seg = new LineSegment(seg0, seg1);
				this._minClearancePts[1] = new Coordinate(seg.closestPoint(p));
			}
		}
	}
	compute() {
		if (this._minClearancePts !== null) return null;
		this._minClearancePts = new Array(2).fill(null);
		this._minClearance = Double.MAX_VALUE;
		this._inputGeom.apply(new VertexCoordinateFilter(this));
	}
	getDistance() {
		this.compute();
		return this._minClearance;
	}
	getClass() {
		return SimpleMinimumClearance;
	}
	get interfaces_() {
		return [];
	}
}
class VertexCoordinateFilter {
	constructor() {
		VertexCoordinateFilter.constructor_.apply(this, arguments);
	}
	filter(coord) {
		this.smc._inputGeom.apply(new ComputeMCCoordinateSequenceFilter(this.smc, coord));
	}
	getClass() {
		return VertexCoordinateFilter;
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
}
VertexCoordinateFilter.constructor_ = function () {
	this.smc = null;
	let smc = arguments[0];
	this.smc = smc;
};
class ComputeMCCoordinateSequenceFilter {
	constructor() {
		ComputeMCCoordinateSequenceFilter.constructor_.apply(this, arguments);
	}
	isGeometryChanged() {
		return false;
	}
	checkVertexDistance(vertex) {
		var vertexDist = vertex.distance(this._queryPt);
		if (vertexDist > 0) {
			this.smc.updateClearance(vertexDist, this._queryPt, vertex);
		}
	}
	filter(seq, i) {
		this.checkVertexDistance(seq.getCoordinate(i));
		if (i > 0) {
			this.checkSegmentDistance(seq.getCoordinate(i - 1), seq.getCoordinate(i));
		}
	}
	checkSegmentDistance(seg0, seg1) {
		if (this._queryPt.equals2D(seg0) || this._queryPt.equals2D(seg1)) return null;
		var segDist = Distance.pointToSegment(this._queryPt, seg1, seg0);
		if (segDist > 0) this.smc.updateClearance(segDist, this._queryPt, seg1, seg0);
	}
	isDone() {
		return false;
	}
	getClass() {
		return ComputeMCCoordinateSequenceFilter;
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
}
ComputeMCCoordinateSequenceFilter.constructor_ = function () {
	this.smc = null;
	this._queryPt = null;
	let smc = arguments[0], queryPt = arguments[1];
	this.smc = smc;
	this._queryPt = queryPt;
};
SimpleMinimumClearance.VertexCoordinateFilter = VertexCoordinateFilter;
SimpleMinimumClearance.ComputeMCCoordinateSequenceFilter = ComputeMCCoordinateSequenceFilter;
SimpleMinimumClearance.constructor_ = function () {
	this._inputGeom = null;
	this._minClearance = null;
	this._minClearancePts = null;
	let geom = arguments[0];
	this._inputGeom = geom;
};
