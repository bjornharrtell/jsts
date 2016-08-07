import WKTWriter from '../io/WKTWriter';
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence';
import Octant from './Octant';
import extend from '../../../../extend';
import SegmentString from './SegmentString';
export default function BasicSegmentString() {
	this.pts = null;
	this.data = null;
	let pts = arguments[0], data = arguments[1];
	this.pts = pts;
	this.data = data;
}
extend(BasicSegmentString.prototype, {
	getCoordinates: function () {
		return this.pts;
	},
	size: function () {
		return this.pts.length;
	},
	getCoordinate: function (i) {
		return this.pts[i];
	},
	isClosed: function () {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	},
	getSegmentOctant: function (index) {
		if (index === this.pts.length - 1) return -1;
		return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1));
	},
	setData: function (data) {
		this.data = data;
	},
	getData: function () {
		return this.data;
	},
	toString: function () {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.pts));
	},
	interfaces_: function () {
		return [SegmentString];
	},
	getClass: function () {
		return BasicSegmentString;
	}
});
