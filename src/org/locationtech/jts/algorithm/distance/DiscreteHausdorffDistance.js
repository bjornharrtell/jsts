import DistanceToPoint from './DistanceToPoint';
import CoordinateFilter from '../../geom/CoordinateFilter';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import extend from '../../../../../extend';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../geom/CoordinateSequenceFilter';
export default function DiscreteHausdorffDistance() {
	this.g0 = null;
	this.g1 = null;
	this.ptDist = new PointPairDistance();
	this.densifyFrac = 0.0;
	let g0 = arguments[0], g1 = arguments[1];
	this.g0 = g0;
	this.g1 = g1;
}
extend(DiscreteHausdorffDistance.prototype, {
	getCoordinates: function () {
		return this.ptDist.getCoordinates();
	},
	setDensifyFraction: function (densifyFrac) {
		if (densifyFrac > 1.0 || densifyFrac <= 0.0) throw new IllegalArgumentException("Fraction is not in range (0.0 - 1.0]");
		this.densifyFrac = densifyFrac;
	},
	compute: function (g0, g1) {
		this.computeOrientedDistance(g0, g1, this.ptDist);
		this.computeOrientedDistance(g1, g0, this.ptDist);
	},
	distance: function () {
		this.compute(this.g0, this.g1);
		return this.ptDist.getDistance();
	},
	computeOrientedDistance: function (discreteGeom, geom, ptDist) {
		var distFilter = new MaxPointDistanceFilter(geom);
		discreteGeom.apply(distFilter);
		ptDist.setMaximum(distFilter.getMaxPointDistance());
		if (this.densifyFrac > 0) {
			var fracFilter = new MaxDensifiedByFractionDistanceFilter(geom, this.densifyFrac);
			discreteGeom.apply(fracFilter);
			ptDist.setMaximum(fracFilter.getMaxPointDistance());
		}
	},
	orientedDistance: function () {
		this.computeOrientedDistance(this.g0, this.g1, this.ptDist);
		return this.ptDist.getDistance();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return DiscreteHausdorffDistance;
	}
});
DiscreteHausdorffDistance.distance = function () {
	if (arguments.length === 2) {
		let g0 = arguments[0], g1 = arguments[1];
		var dist = new DiscreteHausdorffDistance(g0, g1);
		return dist.distance();
	} else if (arguments.length === 3) {
		let g0 = arguments[0], g1 = arguments[1], densifyFrac = arguments[2];
		var dist = new DiscreteHausdorffDistance(g0, g1);
		dist.setDensifyFraction(densifyFrac);
		return dist.distance();
	}
};
function MaxPointDistanceFilter() {
	this.maxPtDist = new PointPairDistance();
	this.minPtDist = new PointPairDistance();
	this.euclideanDist = new DistanceToPoint();
	this.geom = null;
	let geom = arguments[0];
	this.geom = geom;
}
extend(MaxPointDistanceFilter.prototype, {
	filter: function (pt) {
		this.minPtDist.initialize();
		DistanceToPoint.computeDistance(this.geom, pt, this.minPtDist);
		this.maxPtDist.setMaximum(this.minPtDist);
	},
	getMaxPointDistance: function () {
		return this.maxPtDist;
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return MaxPointDistanceFilter;
	}
});
function MaxDensifiedByFractionDistanceFilter() {
	this.maxPtDist = new PointPairDistance();
	this.minPtDist = new PointPairDistance();
	this.geom = null;
	this.numSubSegs = 0;
	let geom = arguments[0], fraction = arguments[1];
	this.geom = geom;
	this.numSubSegs = Math.trunc(Math.round(1.0 / fraction));
}
extend(MaxDensifiedByFractionDistanceFilter.prototype, {
	filter: function (seq, index) {
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
	},
	isDone: function () {
		return false;
	},
	isGeometryChanged: function () {
		return false;
	},
	getMaxPointDistance: function () {
		return this.maxPtDist;
	},
	interfaces_: function () {
		return [CoordinateSequenceFilter];
	},
	getClass: function () {
		return MaxDensifiedByFractionDistanceFilter;
	}
});
DiscreteHausdorffDistance.MaxPointDistanceFilter = MaxPointDistanceFilter;
DiscreteHausdorffDistance.MaxDensifiedByFractionDistanceFilter = MaxDensifiedByFractionDistanceFilter;

