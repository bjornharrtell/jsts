import GeometryFactory from '../../geom/GeometryFactory';
import Coordinate from '../../geom/Coordinate';
import ArrayList from '../../../../../java/util/ArrayList';
export default class OffsetSegmentString {
	constructor(...args) {
		this.ptList = null;
		this.precisionModel = null;
		this.minimimVertexDistance = 0.0;
		if (args.length === 0) {
			let [] = args;
			this.ptList = new ArrayList();
		}
	}
	get interfaces_() {
		return [];
	}
	getCoordinates() {
		var coord = this.ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);
		return coord;
	}
	setPrecisionModel(precisionModel) {
		this.precisionModel = precisionModel;
	}
	addPt(pt) {
		var bufPt = new Coordinate(pt);
		this.precisionModel.makePrecise(bufPt);
		if (this.isRedundant(bufPt)) return null;
		this.ptList.add(bufPt);
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
		if (this.ptList.size() < 1) return false;
		var lastPt = this.ptList.get(this.ptList.size() - 1);
		var ptDist = pt.distance(lastPt);
		if (ptDist < this.minimimVertexDistance) return true;
		return false;
	}
	toString() {
		var fact = new GeometryFactory();
		var line = fact.createLineString(this.getCoordinates());
		return line.toString();
	}
	closeRing() {
		if (this.ptList.size() < 1) return null;
		var startPt = new Coordinate(this.ptList.get(0));
		var lastPt = this.ptList.get(this.ptList.size() - 1);
		var last2Pt = null;
		if (this.ptList.size() >= 2) last2Pt = this.ptList.get(this.ptList.size() - 2);
		if (startPt.equals(lastPt)) return null;
		this.ptList.add(startPt);
	}
	setMinimumVertexDistance(minimimVertexDistance) {
		this.minimimVertexDistance = minimimVertexDistance;
	}
	getClass() {
		return OffsetSegmentString;
	}
}
OffsetSegmentString.COORDINATE_ARRAY_TYPE = new Array(0);

