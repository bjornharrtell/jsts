import ItemBoundable from '../index/strtree/ItemBoundable';
import FacetSequence from '../operation/distance/FacetSequence';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
import FacetSequenceTreeBuilder from '../operation/distance/FacetSequenceTreeBuilder';
import Distance from '../algorithm/Distance';
import ItemDistance from '../index/strtree/ItemDistance';
export default function MinimumClearance() {
	this._inputGeom = null;
	this._minClearance = null;
	this._minClearancePts = null;
	let geom = arguments[0];
	this._inputGeom = geom;
}
extend(MinimumClearance.prototype, {
	getLine: function () {
		this.compute();
		if (this._minClearancePts === null || this._minClearancePts[0] === null) return this._inputGeom.getFactory().createLineString();
		return this._inputGeom.getFactory().createLineString(this._minClearancePts);
	},
	compute: function () {
		if (this._minClearancePts !== null) return null;
		this._minClearancePts = new Array(2).fill(null);
		this._minClearance = Double.MAX_VALUE;
		if (this._inputGeom.isEmpty()) {
			return null;
		}
		var geomTree = FacetSequenceTreeBuilder.build(this._inputGeom);
		var nearest = geomTree.nearestNeighbour(new MinClearanceDistance());
		var mcd = new MinClearanceDistance();
		this._minClearance = mcd.distance(nearest[0], nearest[1]);
		this._minClearancePts = mcd.getCoordinates();
	},
	getDistance: function () {
		this.compute();
		return this._minClearance;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MinimumClearance;
	}
});
MinimumClearance.getLine = function (g) {
	var rp = new MinimumClearance(g);
	return rp.getLine();
};
MinimumClearance.getDistance = function (g) {
	var rp = new MinimumClearance(g);
	return rp.getDistance();
};
function MinClearanceDistance() {
	this._minDist = Double.MAX_VALUE;
	this._minPts = new Array(2).fill(null);
}
extend(MinClearanceDistance.prototype, {
	vertexDistance: function (fs1, fs2) {
		for (var i1 = 0; i1 < fs1.size(); i1++) {
			for (var i2 = 0; i2 < fs2.size(); i2++) {
				var p1 = fs1.getCoordinate(i1);
				var p2 = fs2.getCoordinate(i2);
				if (!p1.equals2D(p2)) {
					var d = p1.distance(p2);
					if (d < this._minDist) {
						this._minDist = d;
						this._minPts[0] = p1;
						this._minPts[1] = p2;
						if (d === 0.0) return d;
					}
				}
			}
		}
		return this._minDist;
	},
	getCoordinates: function () {
		return this._minPts;
	},
	segmentDistance: function (fs1, fs2) {
		for (var i1 = 0; i1 < fs1.size(); i1++) {
			for (var i2 = 1; i2 < fs2.size(); i2++) {
				var p = fs1.getCoordinate(i1);
				var seg0 = fs2.getCoordinate(i2 - 1);
				var seg1 = fs2.getCoordinate(i2);
				if (!(p.equals2D(seg0) || p.equals2D(seg1))) {
					var d = Distance.pointToSegment(p, seg0, seg1);
					if (d < this._minDist) {
						this._minDist = d;
						this.updatePts(p, seg0, seg1);
						if (d === 0.0) return d;
					}
				}
			}
		}
		return this._minDist;
	},
	distance: function () {
		if (arguments[0] instanceof ItemBoundable && arguments[1] instanceof ItemBoundable) {
			let b1 = arguments[0], b2 = arguments[1];
			var fs1 = b1.getItem();
			var fs2 = b2.getItem();
			this._minDist = Double.MAX_VALUE;
			return this.distance(fs1, fs2);
		} else if (arguments[0] instanceof FacetSequence && arguments[1] instanceof FacetSequence) {
			let fs1 = arguments[0], fs2 = arguments[1];
			this.vertexDistance(fs1, fs2);
			if (fs1.size() === 1 && fs2.size() === 1) return this._minDist;
			if (this._minDist <= 0.0) return this._minDist;
			this.segmentDistance(fs1, fs2);
			if (this._minDist <= 0.0) return this._minDist;
			this.segmentDistance(fs2, fs1);
			return this._minDist;
		}
	},
	updatePts: function (p, seg0, seg1) {
		this._minPts[0] = p;
		var seg = new LineSegment(seg0, seg1);
		this._minPts[1] = new Coordinate(seg.closestPoint(p));
	},
	interfaces_: function () {
		return [ItemDistance];
	},
	getClass: function () {
		return MinClearanceDistance;
	}
});
MinimumClearance.MinClearanceDistance = MinClearanceDistance;
