import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function OffsetSegmentString() {
	this._ptList = null;
	this._precisionModel = null;
	this._minimimVertexDistance = 0.0;
	this._ptList = new ArrayList();
}
extend(OffsetSegmentString.prototype, {
	getCoordinates: function () {
		var coord = this._ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);
		return coord;
	},
	setPrecisionModel: function (precisionModel) {
		this._precisionModel = precisionModel;
	},
	addPt: function (pt) {
		var bufPt = new Coordinate(pt);
		this._precisionModel.makePrecise(bufPt);
		if (this.isRedundant(bufPt)) return null;
		this._ptList.add(bufPt);
	},
	reverse: function () {},
	addPts: function (pt, isForward) {
		if (isForward) {
			for (var i = 0; i < pt.length; i++) {
				this.addPt(pt[i]);
			}
		} else {
			for (var i = pt.length - 1; i >= 0; i--) {
				this.addPt(pt[i]);
			}
		}
	},
	isRedundant: function (pt) {
		if (this._ptList.size() < 1) return false;
		var lastPt = this._ptList.get(this._ptList.size() - 1);
		var ptDist = pt.distance(lastPt);
		if (ptDist < this._minimimVertexDistance) return true;
		return false;
	},
	toString: function () {
		var fact = new GeometryFactory();
		var line = fact.createLineString(this.getCoordinates());
		return line.toString();
	},
	closeRing: function () {
		if (this._ptList.size() < 1) return null;
		var startPt = new Coordinate(this._ptList.get(0));
		var lastPt = this._ptList.get(this._ptList.size() - 1);
		var last2Pt = null;
		if (this._ptList.size() >= 2) last2Pt = this._ptList.get(this._ptList.size() - 2);
		if (startPt.equals(lastPt)) return null;
		this._ptList.add(startPt);
	},
	setMinimumVertexDistance: function (minimimVertexDistance) {
		this._minimimVertexDistance = minimimVertexDistance;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OffsetSegmentString;
	}
});
OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0).fill(null);
