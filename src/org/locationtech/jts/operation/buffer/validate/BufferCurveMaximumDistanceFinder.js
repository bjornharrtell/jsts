import DistanceToPointFinder from './DistanceToPointFinder';
import CoordinateFilter from '../../../geom/CoordinateFilter';
import Coordinate from '../../../geom/Coordinate';
import extend from '../../../../../../extend';
import PointPairDistance from './PointPairDistance';
import CoordinateSequenceFilter from '../../../geom/CoordinateSequenceFilter';
export default function BufferCurveMaximumDistanceFinder() {
	this._inputGeom = null;
	this._maxPtDist = new PointPairDistance();
	let inputGeom = arguments[0];
	this._inputGeom = inputGeom;
}
extend(BufferCurveMaximumDistanceFinder.prototype, {
	computeMaxMidpointDistance: function (curve) {
		var distFilter = new MaxMidpointDistanceFilter(this._inputGeom);
		curve.apply(distFilter);
		this._maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	},
	computeMaxVertexDistance: function (curve) {
		var distFilter = new MaxPointDistanceFilter(this._inputGeom);
		curve.apply(distFilter);
		this._maxPtDist.setMaximum(distFilter.getMaxPointDistance());
	},
	findDistance: function (bufferCurve) {
		this.computeMaxVertexDistance(bufferCurve);
		this.computeMaxMidpointDistance(bufferCurve);
		return this._maxPtDist.getDistance();
	},
	getDistancePoints: function () {
		return this._maxPtDist;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return BufferCurveMaximumDistanceFinder;
	}
});
function MaxPointDistanceFilter() {
	this._maxPtDist = new PointPairDistance();
	this._minPtDist = new PointPairDistance();
	this._geom = null;
	let geom = arguments[0];
	this._geom = geom;
}
extend(MaxPointDistanceFilter.prototype, {
	filter: function (pt) {
		this._minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this._geom, pt, this._minPtDist);
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
function MaxMidpointDistanceFilter() {
	this._maxPtDist = new PointPairDistance();
	this._minPtDist = new PointPairDistance();
	this._geom = null;
	let geom = arguments[0];
	this._geom = geom;
}
extend(MaxMidpointDistanceFilter.prototype, {
	filter: function (seq, index) {
		if (index === 0) return null;
		var p0 = seq.getCoordinate(index - 1);
		var p1 = seq.getCoordinate(index);
		var midPt = new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
		this._minPtDist.initialize();
		DistanceToPointFinder.computeDistance(this._geom, midPt, this._minPtDist);
		this._maxPtDist.setMaximum(this._minPtDist);
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
		return MaxMidpointDistanceFilter;
	}
});
BufferCurveMaximumDistanceFinder.MaxPointDistanceFilter = MaxPointDistanceFilter;
BufferCurveMaximumDistanceFinder.MaxMidpointDistanceFilter = MaxMidpointDistanceFilter;
