import WKTWriter from '../io/WKTWriter';
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence';
import Octant from './Octant';
import extend from '../../../../extend';
import SegmentString from './SegmentString';
export default function BasicSegmentString() {
	this._pts = null;
	this._data = null;
	let pts = arguments[0], data = arguments[1];
	this._pts = pts;
	this._data = data;
}
extend(BasicSegmentString.prototype, {
	getCoordinates: function () {
		return this._pts;
	},
	size: function () {
		return this._pts.length;
	},
	getCoordinate: function (i) {
		return this._pts[i];
	},
	isClosed: function () {
		return this._pts[0].equals(this._pts[this._pts.length - 1]);
	},
	getSegmentOctant: function (index) {
		if (index === this._pts.length - 1) return -1;
		return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1));
	},
	setData: function (data) {
		this._data = data;
	},
	getData: function () {
		return this._data;
	},
	toString: function () {
		return WKTWriter.toLineString(new CoordinateArraySequence(this._pts));
	},
	interfaces_: function () {
		return [SegmentString];
	},
	getClass: function () {
		return BasicSegmentString;
	}
});
