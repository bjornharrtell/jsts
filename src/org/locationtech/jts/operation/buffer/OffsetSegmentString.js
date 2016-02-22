import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function OffsetSegmentString() {
	this.ptList = null;
	this.precisionModel = null;
	this.minimimVertexDistance = 0.0;
	this.ptList = new ArrayList();
}
extend(OffsetSegmentString.prototype, {
	getCoordinates: function () {
		var coord = this.ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);
		return coord;
	},
	setPrecisionModel: function (precisionModel) {
		this.precisionModel = precisionModel;
	},
	addPt: function (pt) {
		var bufPt = new Coordinate(pt);
		this.precisionModel.makePrecise(bufPt);
		if (this.isRedundant(bufPt)) return null;
		this.ptList.add(bufPt);
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
		if (this.ptList.size() < 1) return false;
		var lastPt = this.ptList.get(this.ptList.size() - 1);
		var ptDist = pt.distance(lastPt);
		if (ptDist < this.minimimVertexDistance) return true;
		return false;
	},
	toString: function () {
		var fact = new GeometryFactory();
		var line = fact.createLineString(this.getCoordinates());
		return line.toString();
	},
	closeRing: function () {
		if (this.ptList.size() < 1) return null;
		var startPt = new Coordinate(this.ptList.get(0));
		var lastPt = this.ptList.get(this.ptList.size() - 1);
		var last2Pt = null;
		if (this.ptList.size() >= 2) last2Pt = this.ptList.get(this.ptList.size() - 2);
		if (startPt.equals(lastPt)) return null;
		this.ptList.add(startPt);
	},
	setMinimumVertexDistance: function (minimimVertexDistance) {
		this.minimimVertexDistance = minimimVertexDistance;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return OffsetSegmentString;
	}
});
OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0).fill(null);

