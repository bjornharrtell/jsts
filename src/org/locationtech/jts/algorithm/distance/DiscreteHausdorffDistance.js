import DistanceToPoint from './DistanceToPoint';
import CoordinateFilter from '../../geom/CoordinateFilter';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../geom/CoordinateSequenceFilter';
export default class DiscreteHausdorffDistance {
	constructor(...args) {
		this.g0 = null;
		this.g1 = null;
		this.ptDist = new PointPairDistance();
		this.densifyFrac = 0.0;
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [g0, g1] = args;
						this.g0 = g0;
						this.g1 = g1;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get MaxPointDistanceFilter() {
		return MaxPointDistanceFilter;
	}
	static get MaxDensifiedByFractionDistanceFilter() {
		return MaxDensifiedByFractionDistanceFilter;
	}
	static distance(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [g0, g1] = args;
						var dist = new DiscreteHausdorffDistance(g0, g1);
						return dist.distance();
					})(...args);
				case 3:
					return ((...args) => {
						let [g0, g1, densifyFrac] = args;
						var dist = new DiscreteHausdorffDistance(g0, g1);
						dist.setDensifyFraction(densifyFrac);
						return dist.distance();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getCoordinates() {
		return this.ptDist.getCoordinates();
	}
	setDensifyFraction(densifyFrac) {
		if (densifyFrac > 1.0 || densifyFrac <= 0.0) throw new IllegalArgumentException("Fraction is not in range (0.0 - 1.0]");
		this.densifyFrac = densifyFrac;
	}
	compute(g0, g1) {
		this.computeOrientedDistance(g0, g1, this.ptDist);
		this.computeOrientedDistance(g1, g0, this.ptDist);
	}
	distance() {
		this.compute(this.g0, this.g1);
		return this.ptDist.getDistance();
	}
	computeOrientedDistance(discreteGeom, geom, ptDist) {
		var distFilter = new MaxPointDistanceFilter(geom);
		discreteGeom.apply(distFilter);
		ptDist.setMaximum(distFilter.getMaxPointDistance());
		if (this.densifyFrac > 0) {
			var fracFilter = new MaxDensifiedByFractionDistanceFilter(geom, this.densifyFrac);
			discreteGeom.apply(fracFilter);
			ptDist.setMaximum(fracFilter.getMaxPointDistance());
		}
	}
	orientedDistance() {
		this.computeOrientedDistance(this.g0, this.g1, this.ptDist);
		return this.ptDist.getDistance();
	}
	getClass() {
		return DiscreteHausdorffDistance;
	}
}
class MaxPointDistanceFilter {
	constructor(...args) {
		this.maxPtDist = new PointPairDistance();
		this.minPtDist = new PointPairDistance();
		this.euclideanDist = new DistanceToPoint();
		this.geom = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geom] = args;
						this.geom = geom;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
	filter(pt) {
		this.minPtDist.initialize();
		DistanceToPoint.computeDistance(this.geom, pt, this.minPtDist);
		this.maxPtDist.setMaximum(this.minPtDist);
	}
	getMaxPointDistance() {
		return this.maxPtDist;
	}
	getClass() {
		return MaxPointDistanceFilter;
	}
}
class MaxDensifiedByFractionDistanceFilter {
	constructor(...args) {
		this.maxPtDist = new PointPairDistance();
		this.minPtDist = new PointPairDistance();
		this.geom = null;
		this.numSubSegs = 0;
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [geom, fraction] = args;
						this.geom = geom;
						this.numSubSegs = Math.trunc(Math.round(1.0 / fraction));
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
	filter(seq, index) {
		if (index === 0) return null;
		var p0 = seq.getCoordinate(index - 1);
		var p1 = seq.getCoordinate(index);
		var delx = (p1.x - p0.x) / this.numSubSegs;
		var dely = (p1.y - p0.y) / this.numSubSegs;
		for (var i = 0; i < this.numSubSegs; i++) {
			var x = p0.x + i * delx;
			var y = p0.y + i * dely;
			var pt = new Coordinate(x, y);
			this.minPtDist.initialize();
			DistanceToPoint.computeDistance(this.geom, pt, this.minPtDist);
			this.maxPtDist.setMaximum(this.minPtDist);
		}
	}
	isDone() {
		return false;
	}
	isGeometryChanged() {
		return false;
	}
	getMaxPointDistance() {
		return this.maxPtDist;
	}
	getClass() {
		return MaxDensifiedByFractionDistanceFilter;
	}
}

