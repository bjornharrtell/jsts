import CGAlgorithms from '../algorithm/CGAlgorithms';
import CoordinateFilter from '../geom/CoordinateFilter';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default function SimpleMinimumClearance() {
	this._inputGeom = null;
	this._minClearance = null;
	this._minClearancePts = null;
	let geom = arguments[0];
	this._inputGeom = geom;
}
extend(SimpleMinimumClearance.prototype, {
	getLine: function () {
		this.compute();
		return this._inputGeom.getFactory().createLineString(this._minClearancePts);
	},
	updateClearance: function () {
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
	},
	compute: function () {
		if (this._minClearancePts !== null) return null;
		this._minClearancePts = new Array(2).fill(null);
		this._minClearance = Double.MAX_VALUE;
		this._inputGeom.apply(new VertexCoordinateFilter(this));
	},
	getDistance: function () {
		this.compute();
		return this._minClearance;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SimpleMinimumClearance;
	}
});
SimpleMinimumClearance.getLine = function (g) {
	var rp = new SimpleMinimumClearance(g);
	return rp.getLine();
};
SimpleMinimumClearance.getDistance = function (g) {
	var rp = new SimpleMinimumClearance(g);
	return rp.getDistance();
};
function VertexCoordinateFilter() {
	this.smc = null;
	let smc = arguments[0];
	this.smc = smc;
}
extend(VertexCoordinateFilter.prototype, {
	filter: function (coord) {
		this.smc._inputGeom.apply(new ComputeMCCoordinateSequenceFilter(this.smc, coord));
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return VertexCoordinateFilter;
	}
});
function ComputeMCCoordinateSequenceFilter() {
	this.smc = null;
	this._queryPt = null;
	let smc = arguments[0], queryPt = arguments[1];
	this.smc = smc;
	this._queryPt = queryPt;
}
extend(ComputeMCCoordinateSequenceFilter.prototype, {
	isGeometryChanged: function () {
		return false;
	},
	checkVertexDistance: function (vertex) {
		var vertexDist = vertex.distance(this._queryPt);
		if (vertexDist > 0) {
			this.smc.updateClearance(vertexDist, this._queryPt, vertex);
		}
	},
	filter: function (seq, i) {
		this.checkVertexDistance(seq.getCoordinate(i));
		if (i > 0) {
			this.checkSegmentDistance(seq.getCoordinate(i - 1), seq.getCoordinate(i));
		}
	},
	checkSegmentDistance: function (seg0, seg1) {
		if (this._queryPt.equals2D(seg0) || this._queryPt.equals2D(seg1)) return null;
		var segDist = CGAlgorithms.distancePointLine(this._queryPt, seg1, seg0);
		if (segDist > 0) this.smc.updateClearance(segDist, this._queryPt, seg1, seg0);
	},
	isDone: function () {
		return false;
	},
	interfaces_: function () {
		return [CoordinateSequenceFilter];
	},
	getClass: function () {
		return ComputeMCCoordinateSequenceFilter;
	}
});
SimpleMinimumClearance.VertexCoordinateFilter = VertexCoordinateFilter;
SimpleMinimumClearance.ComputeMCCoordinateSequenceFilter = ComputeMCCoordinateSequenceFilter;
