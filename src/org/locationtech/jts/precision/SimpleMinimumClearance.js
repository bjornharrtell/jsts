import CGAlgorithms from '../algorithm/CGAlgorithms';
import CoordinateFilter from '../geom/CoordinateFilter';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter';
export default function SimpleMinimumClearance() {
	this.inputGeom = null;
	this.minClearance = null;
	this.minClearancePts = null;
	let geom = arguments[0];
	this.inputGeom = geom;
}
extend(SimpleMinimumClearance.prototype, {
	getLine: function () {
		this.compute();
		return this.inputGeom.getFactory().createLineString(this.minClearancePts);
	},
	updateClearance: function () {
		if (arguments.length === 3) {
			let candidateValue = arguments[0], p0 = arguments[1], p1 = arguments[2];
			if (candidateValue < this.minClearance) {
				this.minClearance = candidateValue;
				this.minClearancePts[0] = new Coordinate(p0);
				this.minClearancePts[1] = new Coordinate(p1);
			}
		} else if (arguments.length === 4) {
			let candidateValue = arguments[0], p = arguments[1], seg0 = arguments[2], seg1 = arguments[3];
			if (candidateValue < this.minClearance) {
				this.minClearance = candidateValue;
				this.minClearancePts[0] = new Coordinate(p);
				var seg = new LineSegment(seg0, seg1);
				this.minClearancePts[1] = new Coordinate(seg.closestPoint(p));
			}
		}
	},
	compute: function () {
		if (this.minClearancePts !== null) return null;
		this.minClearancePts = new Array(2).fill(null);
		this.minClearance = Double.MAX_VALUE;
		this.inputGeom.apply(new VertexCoordinateFilter(this));
	},
	getDistance: function () {
		this.compute();
		return this.minClearance;
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
		this.smc.inputGeom.apply(new ComputeMCCoordinateSequenceFilter(this.smc, coord));
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
	this.queryPt = null;
	let smc = arguments[0], queryPt = arguments[1];
	this.smc = smc;
	this.queryPt = queryPt;
}
extend(ComputeMCCoordinateSequenceFilter.prototype, {
	isGeometryChanged: function () {
		return false;
	},
	checkVertexDistance: function (vertex) {
		var vertexDist = vertex.distance(this.queryPt);
		if (vertexDist > 0) {
			this.smc.updateClearance(vertexDist, this.queryPt, vertex);
		}
	},
	filter: function (seq, i) {
		this.checkVertexDistance(seq.getCoordinate(i));
		if (i > 0) {
			this.checkSegmentDistance(seq.getCoordinate(i - 1), seq.getCoordinate(i));
		}
	},
	checkSegmentDistance: function (seg0, seg1) {
		if (this.queryPt.equals2D(seg0) || this.queryPt.equals2D(seg1)) return null;
		var segDist = CGAlgorithms.distancePointLine(this.queryPt, seg1, seg0);
		if (segDist > 0) this.smc.updateClearance(segDist, this.queryPt, seg1, seg0);
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
