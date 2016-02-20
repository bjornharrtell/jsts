import DistanceToPointFinder from './DistanceToPointFinder';
import CoordinateFilter from '../../../geom/CoordinateFilter';
import Coordinate from '../../../geom/Coordinate';
import extend from '../../../../../../extend';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../../geom/CoordinateSequenceFilter';
export default function BufferCurveMaximumDistanceFinder() {
	this.inputGeom = null;
	this.maxPtDist = new PointPairDistance();
	let inputGeom = arguments[0];
	this.inputGeom = inputGeom;
}
extend(BufferCurveMaximumDistanceFinder.prototype, {
	computeMaxMidpointDistance: function (curve) {
		var distFilter = new MaxMidpointDistanceFilter(this.inputGeom);
		curve.apply(distFilter);
		this.maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	},
	computeMaxVertexDistance: function (curve) {
		var distFilter = new MaxPointDistanceFilter(this.inputGeom);
		curve.apply(distFilter);
		this.maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	},
	findDistance: function (bufferCurve) {
		this.computeMaxVertexDistance(bufferCurve);
		this.computeMaxMidpointDistance(bufferCurve);
		return this.maxPtDist.getDistance();
	},
	getDistancePoints: function () {
		return this.maxPtDist;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferCurveMaximumDistanceFinder;
	}
});
function MaxPointDistanceFilter() {
	this.maxPtDist = new PointPairDistance();
	this.minPtDist = new PointPairDistance();
	this.geom = null;
	let geom = arguments[0];
	this.geom = geom;
}
extend(MaxPointDistanceFilter.prototype, {
	filter: function (pt) {
		this.minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this.geom, pt, this.minPtDist);
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
function MaxMidpointDistanceFilter() {
	this.maxPtDist = new PointPairDistance();
	this.minPtDist = new PointPairDistance();
	this.geom = null;
	let geom = arguments[0];
	this.geom = geom;
}
extend(MaxMidpointDistanceFilter.prototype, {
	filter: function (seq, index) {
		if (index === 0) return null;
		var p0 = seq.getCoordinate(index - 1);
		var p1 = seq.getCoordinate(index);
		var midPt = new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
		this.minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this.geom, midPt, this.minPtDist);
		this.maxPtDist.setMaximum(this.minPtDist);
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
		return MaxMidpointDistanceFilter;
	}
});
BufferCurveMaximumDistanceFinder.MaxPointDistanceFilter = MaxPointDistanceFilter;
BufferCurveMaximumDistanceFinder.MaxMidpointDistanceFilter = MaxMidpointDistanceFilter;

