import Coordinate from '../geom/Coordinate';
import LineSegment from '../geom/LineSegment';
export default class Segment {
	constructor() {
		Segment.constructor_.apply(this, arguments);
	}
	getLineSegment() {
		return this._ls;
	}
	getEndZ() {
		var p = this._ls.getCoordinate(1);
		return p.z;
	}
	getStartZ() {
		var p = this._ls.getCoordinate(0);
		return p.z;
	}
	intersection(s) {
		return this._ls.intersection(s.getLineSegment());
	}
	getStart() {
		return this._ls.getCoordinate(0);
	}
	getEnd() {
		return this._ls.getCoordinate(1);
	}
	getEndY() {
		var p = this._ls.getCoordinate(1);
		return p.y;
	}
	getStartX() {
		var p = this._ls.getCoordinate(0);
		return p.x;
	}
	equalsTopo(s) {
		return this._ls.equalsTopo(s.getLineSegment());
	}
	getStartY() {
		var p = this._ls.getCoordinate(0);
		return p.y;
	}
	setData(data) {
		this._data = data;
	}
	getData() {
		return this._data;
	}
	getEndX() {
		var p = this._ls.getCoordinate(1);
		return p.x;
	}
	toString() {
		return this._ls.toString();
	}
	getClass() {
		return Segment;
	}
	get interfaces_() {
		return [];
	}
}
Segment.constructor_ = function () {
	this._ls = null;
	this._data = null;
	if (arguments.length === 2) {
		let p0 = arguments[0], p1 = arguments[1];
		this._ls = new LineSegment(p0, p1);
	} else if (arguments.length === 3) {
		let p0 = arguments[0], p1 = arguments[1], data = arguments[2];
		this._ls = new LineSegment(p0, p1);
		this._data = data;
	} else if (arguments.length === 6) {
		let x1 = arguments[0], y1 = arguments[1], z1 = arguments[2], x2 = arguments[3], y2 = arguments[4], z2 = arguments[5];
		Segment.constructor_.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2));
	} else if (arguments.length === 7) {
		let x1 = arguments[0], y1 = arguments[1], z1 = arguments[2], x2 = arguments[3], y2 = arguments[4], z2 = arguments[5], data = arguments[6];
		Segment.constructor_.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2), data);
	}
};
