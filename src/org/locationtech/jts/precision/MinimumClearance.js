import ItemBoundable from '../index/strtree/ItemBoundable';
import FacetSequence from '../operation/distance/FacetSequence';
import CGAlgorithms from '../algorithm/CGAlgorithms';
import Coordinate from '../geom/Coordinate';
import Double from '../../../../java/lang/Double';
import LineSegment from '../geom/LineSegment';
import FacetSequenceTreeBuilder from '../operation/distance/FacetSequenceTreeBuilder';
import ItemDistance from '../index/strtree/ItemDistance';
export default class MinimumClearance {
	constructor(...args) {
		(() => {
			this.inputGeom = null;
			this.minClearance = null;
			this.minClearancePts = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						this.inputGeom = geom;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get MinClearanceDistance() {
		return MinClearanceDistance;
	}
	static getLine(g) {
		var rp = new MinimumClearance(g);
		return rp.getLine();
	}
	static getDistance(g) {
		var rp = new MinimumClearance(g);
		return rp.getDistance();
	}
	getLine() {
		this.compute();
		if (this.minClearancePts === null || this.minClearancePts[0] === null) return this.inputGeom.getFactory().createLineString(null);
		return this.inputGeom.getFactory().createLineString(this.minClearancePts);
	}
	compute() {
		if (this.minClearancePts !== null) return null;
		this.minClearancePts = new Array(2);
		this.minClearance = Double.MAX_VALUE;
		if (this.inputGeom.isEmpty()) {
			return null;
		}
		var geomTree = FacetSequenceTreeBuilder.build(this.inputGeom);
		var nearest = geomTree.nearestNeighbour(new MinClearanceDistance());
		var mcd = new MinClearanceDistance();
		this.minClearance = mcd.distance(nearest[0], nearest[1]);
		this.minClearancePts = mcd.getCoordinates();
	}
	getDistance() {
		this.compute();
		return this.minClearance;
	}
	getClass() {
		return MinimumClearance;
	}
}
class MinClearanceDistance {
	constructor(...args) {
		(() => {
			this.minDist = Double.MAX_VALUE;
			this.minPts = new Array(2);
		})();
	}
	get interfaces_() {
		return [ItemDistance];
	}
	vertexDistance(fs1, fs2) {
		for (var i1 = 0; i1 < fs1.size(); i1++) {
			for (var i2 = 0; i2 < fs2.size(); i2++) {
				var p1 = fs1.getCoordinate(i1);
				var p2 = fs2.getCoordinate(i2);
				if (!p1.equals2D(p2)) {
					var d = p1.distance(p2);
					if (d < this.minDist) {
						this.minDist = d;
						this.minPts[0] = p1;
						this.minPts[1] = p2;
						if (d === 0.0) return d;
					}
				}
			}
		}
		return this.minDist;
	}
	getCoordinates() {
		return this.minPts;
	}
	segmentDistance(fs1, fs2) {
		for (var i1 = 0; i1 < fs1.size(); i1++) {
			for (var i2 = 1; i2 < fs2.size(); i2++) {
				var p = fs1.getCoordinate(i1);
				var seg0 = fs2.getCoordinate(i2 - 1);
				var seg1 = fs2.getCoordinate(i2);
				if (!(p.equals2D(seg0) || p.equals2D(seg1))) {
					var d = CGAlgorithms.distancePointLine(p, seg0, seg1);
					if (d < this.minDist) {
						this.minDist = d;
						this.updatePts(p, seg0, seg1);
						if (d === 0.0) return d;
					}
				}
			}
		}
		return this.minDist;
	}
	distance(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					if (args[0] instanceof ItemBoundable && args[1] instanceof ItemBoundable) {
						return ((...args) => {
							let [b1, b2] = args;
							var fs1 = b1.getItem();
							var fs2 = b2.getItem();
							this.minDist = Double.MAX_VALUE;
							return this.distance(fs1, fs2);
						})(...args);
					} else if (args[0] instanceof FacetSequence && args[1] instanceof FacetSequence) {
						return ((...args) => {
							let [fs1, fs2] = args;
							this.vertexDistance(fs1, fs2);
							if (fs1.size() === 1 && fs2.size() === 1) return this.minDist;
							if (this.minDist <= 0.0) return this.minDist;
							this.segmentDistance(fs1, fs2);
							if (this.minDist <= 0.0) return this.minDist;
							this.segmentDistance(fs2, fs1);
							return this.minDist;
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	updatePts(p, seg0, seg1) {
		this.minPts[0] = p;
		var seg = new LineSegment(seg0, seg1);
		this.minPts[1] = new Coordinate(seg.closestPoint(p));
	}
	getClass() {
		return MinClearanceDistance;
	}
}

