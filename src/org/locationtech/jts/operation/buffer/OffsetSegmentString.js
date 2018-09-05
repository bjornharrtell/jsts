import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import ArrayList from '../../../../../java/util/ArrayList';
export default class OffsetSegmentString {
	constructor() {
		OffsetSegmentString.constructor_.apply(this, arguments);
	}
	getCoordinates() {
		var coord = this._ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);
		return coord;
	}
	setPrecisionModel(precisionModel) {
		this._precisionModel = precisionModel;
	}
	addPt(pt) {
		var bufPt = new Coordinate(pt);
		this._precisionModel.makePrecise(bufPt);
		if (this.isRedundant(bufPt)) return null;
		this._ptList.add(bufPt);
	}
	reverse() {}
	addPts(pt, isForward) {
		if (isForward) {
			for (var i = 0; i < pt.length; i++) {
				this.addPt(pt[i]);
			}
		} else {
			for (var i = pt.length - 1; i >= 0; i--) {
				this.addPt(pt[i]);
			}
		}
	}
	isRedundant(pt) {
		if (this._ptList.size() < 1) return false;
		var lastPt = this._ptList.get(this._ptList.size() - 1);
		var ptDist = pt.distance(lastPt);
		if (ptDist < this._minimimVertexDistance) return true;
		return false;
	}
	toString() {
		var fact = new GeometryFactory();
		var line = fact.createLineString(this.getCoordinates());
		return line.toString();
	}
	closeRing() {
		if (this._ptList.size() < 1) return null;
		var startPt = new Coordinate(this._ptList.get(0));
		var lastPt = this._ptList.get(this._ptList.size() - 1);
		var last2Pt = null;
		if (this._ptList.size() >= 2) last2Pt = this._ptList.get(this._ptList.size() - 2);
		if (startPt.equals(lastPt)) return null;
		this._ptList.add(startPt);
	}
	setMinimumVertexDistance(minimimVertexDistance) {
		this._minimimVertexDistance = minimimVertexDistance;
	}
	getClass() {
		return OffsetSegmentString;
	}
	get interfaces_() {
		return [];
	}
}
OffsetSegmentString.constructor_ = function () {
	this._ptList = null;
	this._precisionModel = null;
	this._minimimVertexDistance = 0.0;
	this._ptList = new ArrayList();
};
OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0).fill(null);
