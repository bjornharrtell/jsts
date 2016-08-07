import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import SegmentPointComparator from './SegmentPointComparator';
import Comparable from '../../../../java/lang/Comparable';
export default function SegmentNode() {
	this.segString = null;
	this.coord = null;
	this.segmentIndex = null;
	this.segmentOctant = null;
	this._isInterior = null;
	let segString = arguments[0], coord = arguments[1], segmentIndex = arguments[2], segmentOctant = arguments[3];
	this.segString = segString;
	this.coord = new Coordinate(coord);
	this.segmentIndex = segmentIndex;
	this.segmentOctant = segmentOctant;
	this._isInterior = !coord.equals2D(segString.getCoordinate(segmentIndex));
}
extend(SegmentNode.prototype, {
	getCoordinate: function () {
		return this.coord;
	},
	print: function (out) {
		out.print(this.coord);
		out.print(" seg # = " + this.segmentIndex);
	},
	compareTo: function (obj) {
		var other = obj;
		if (this.segmentIndex < other.segmentIndex) return -1;
		if (this.segmentIndex > other.segmentIndex) return 1;
		if (this.coord.equals2D(other.coord)) return 0;
		return SegmentPointComparator.compare(this.segmentOctant, this.coord, other.coord);
	},
	isEndPoint: function (maxSegmentIndex) {
		if (this.segmentIndex === 0 && !this._isInterior) return true;
		if (this.segmentIndex === maxSegmentIndex) return true;
		return false;
	},
	isInterior: function () {
		return this._isInterior;
	},
	interfaces_: function () {
		return [Comparable];
	},
	getClass: function () {
		return SegmentNode;
	}
});
