import DistanceToPointFinder from './DistanceToPointFinder';
import CoordinateFilter from '../../../geom/CoordinateFilter';
import Coordinate from '../../../geom/Coordinate';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../../geom/CoordinateSequenceFilter';
export default class BufferCurveMaximumDistanceFinder {
	constructor() {
		BufferCurveMaximumDistanceFinder.constructor_.apply(this, arguments);
	}
	computeMaxMidpointDistance(curve) {
		var distFilter = new MaxMidpointDistanceFilter(this._inputGeom);
		curve.apply(distFilter);
		this._maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	}
	computeMaxVertexDistance(curve) {
		var distFilter = new MaxPointDistanceFilter(this._inputGeom);
		curve.apply(distFilter);
		this._maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	}
	findDistance(bufferCurve) {
		this.computeMaxVertexDistance(bufferCurve);
		this.computeMaxMidpointDistance(bufferCurve);
		return this._maxPtDist.getDistance();
	}
	getDistancePoints() {
		return this._maxPtDist;
	}
	getClass() {
		return BufferCurveMaximumDistanceFinder;
	}
	get interfaces_() {
		return [];
	}
}
class MaxPointDistanceFilter {
	constructor() {
		MaxPointDistanceFilter.constructor_.apply(this, arguments);
	}
	filter(pt) {
		this._minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this._geom, pt, this._minPtDist);
		this._maxPtDist.setMaximum(this._minPtDist);
	}
	getMaxPointDistance() {
		return this._maxPtDist;
	}
	getClass() {
		return MaxPointDistanceFilter;
	}
	get interfaces_() {
		return [CoordinateFilter];
	}
}
MaxPointDistanceFilter.constructor_ = function () {
	this._maxPtDist = new PointPairDistance();
	this._minPtDist = new PointPairDistance();
	this._geom = null;
	let geom = arguments[0];
	this._geom = geom;
};
class MaxMidpointDistanceFilter {
	constructor() {
		MaxMidpointDistanceFilter.constructor_.apply(this, arguments);
	}
	filter(seq, index) {
		if (index === 0) return null;
		var p0 = seq.getCoordinate(index - 1);
		var p1 = seq.getCoordinate(index);
		var midPt = new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
		this._minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this._geom, midPt, this._minPtDist);
		this._maxPtDist.setMaximum(this._minPtDist);
	}
	isDone() {
		return false;
	}
	isGeometryChanged() {
		return false;
	}
	getMaxPointDistance() {
		return this._maxPtDist;
	}
	getClass() {
		return MaxMidpointDistanceFilter;
	}
	get interfaces_() {
		return [CoordinateSequenceFilter];
	}
}
MaxMidpointDistanceFilter.constructor_ = function () {
	this._maxPtDist = new PointPairDistance();
	this._minPtDist = new PointPairDistance();
	this._geom = null;
	let geom = arguments[0];
	this._geom = geom;
};
BufferCurveMaximumDistanceFinder.MaxPointDistanceFilter = MaxPointDistanceFilter;
BufferCurveMaximumDistanceFinder.MaxMidpointDistanceFilter = MaxMidpointDistanceFilter;
BufferCurveMaximumDistanceFinder.constructor_ = function () {
	this._inputGeom = null;
	this._maxPtDist = new PointPairDistance();
	let inputGeom = arguments[0];
	this._inputGeom = inputGeom;
};
