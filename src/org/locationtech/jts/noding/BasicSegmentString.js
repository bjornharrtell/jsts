import WKTWriter from '../io/WKTWriter';
import CoordinateArraySequence from '../geom/impl/CoordinateArraySequence';
import Octant from './Octant';
import SegmentString from './SegmentString';
export default class BasicSegmentString {
	constructor(...args) {
		this.pts = null;
		this.data = null;
		if (args.length === 2) {
			let [pts, data] = args;
			this.pts = pts;
			this.data = data;
		}
	}
	get interfaces_() {
		return [SegmentString];
	}
	getCoordinates() {
		return this.pts;
	}
	size() {
		return this.pts.length;
	}
	getCoordinate(i) {
		return this.pts[i];
	}
	isClosed() {
		return this.pts[0].equals(this.pts[this.pts.length - 1]);
	}
	getSegmentOctant(index) {
		if (index === this.pts.length - 1) return -1;
		return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1));
	}
	setData(data) {
		this.data = data;
	}
	getData() {
		return this.data;
	}
	toString() {
		return WKTWriter.toLineString(new CoordinateArraySequence(this.pts));
	}
	getClass() {
		return BasicSegmentString;
	}
}

