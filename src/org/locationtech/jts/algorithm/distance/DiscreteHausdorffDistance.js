import DistanceToPoint from './DistanceToPoint';
import CoordinateFilter from '../../geom/CoordinateFilter';
import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import extend from '../../../../../extend';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../geom/CoordinateSequenceFilter';
export default function DiscreteHausdorffDistance() {
	this._g0 = null;
	this._g1 = null;
	this._ptDist = new PointPairDistance();
	this._densifyFrac = 0.0;
	let g0 = arguments[0], g1 = arguments[1];
	this._g0 = g0;
	this._g1 = g1;
}
extend(DiscreteHausdorffDistance.prototype, {
	getCoordinates: function () {
		return this._ptDist.getCoordinates();
	},
	setDensifyFraction: function (densifyFrac) {
		if (densifyFrac > 1.0 || densifyFrac <= 0.0) throw new IllegalArgumentException("Fraction is not in range (0.0 - 1.0]");
		this._densifyFrac = densifyFrac;
	},
	compute: function (g0, g1) {
		this.computeOrientedDistance(g0, g1, this._ptDist);
		this.computeOrientedDistance(g1, g0, this._ptDist);
	},
	distance: function () {
		this.compute(this._g0, this._g1);
		return this._ptDist.getDistance();
	},
	computeOrientedDistance: function (discreteGeom, geom, ptDist) {
		var distFilter = new MaxPointDistanceFilter(geom);
		discreteGeom.apply(distFilter);
		ptDist.setMaximum(distFilter.getMaxPointDistance());
		if (this._densifyFrac > 0) {
			var fracFilter = new MaxDensifiedByFractionDistanceFilter(geom, this._densifyFrac);
			discreteGeom.apply(fracFilter);
			ptDist.setMaximum(fracFilter.getMaxPointDistance());
		}
	},
	orientedDistance: function () {
		this.computeOrientedDistance(this._g0, this._g1, this._ptDist);
		return this._ptDist.getDistance();
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
	this._maxPtDist = new PointPairDistance();
	this._minPtDist = new PointPairDistance();
	this._euclideanDist = new DistanceToPoint();
	this._geom = null;
	let geom = arguments[0];
	this._geom = geom;
}
extend(MaxPointDistanceFilter.prototype, {
	filter: function (pt) {
		this._minPtDist.initialize();
		DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist);
		this._maxPtDist.setMaximum(this._minPtDist);
	},
	getMaxPointDistance: function () {
		return this._maxPtDist;
	},
	interfaces_: function () {
		return [CoordinateFilter];
	},
	getClass: function () {
		return MaxPointDistanceFilter;
	}
});
function MaxDensifiedByFractionDistanceFilter() {
	this._maxPtDist = new PointPairDistance();
	this._minPtDist = new PointPairDistance();
	this._geom = null;
	this._numSubSegs = 0;
	let geom = arguments[0], fraction = arguments[1];
	this._geom = geom;
	this._numSubSegs = Math.trunc(Math.round(1.0 / fraction));
}
extend(MaxDensifiedByFractionDistanceFilter.prototype, {
	filter: function (seq, index) {
		if (index === 0) return null;
		var p0 = seq.getCoordinate(index - 1);
		var p1 = seq.getCoordinate(index);
		var delx = (p1.x - p0.x) / this._numSubSegs;
		var dely = (p1.y - p0.y) / this._numSubSegs;
		for (var i = 0; i < this._numSubSegs; i++) {
			var x = p0.x + i * delx;
			var y = p0.y + i * dely;
			var pt = new Coordinate(x, y);
			this._minPtDist.initialize();
			DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist);
			this._maxPtDist.setMaximum(this._minPtDist);
		}
	},
	isDone: function () {
		return false;
	},
	isGeometryChanged: function () {
		return false;
	},
	getMaxPointDistance: function () {
		return this._maxPtDist;
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
