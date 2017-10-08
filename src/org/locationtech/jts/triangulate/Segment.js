import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import LineSegment from '../geom/LineSegment';
export default function Segment() {
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
		Segment.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2));
	} else if (arguments.length === 7) {
		let x1 = arguments[0], y1 = arguments[1], z1 = arguments[2], x2 = arguments[3], y2 = arguments[4], z2 = arguments[5], data = arguments[6];
		Segment.call(this, new Coordinate(x1, y1, z1), new Coordinate(x2, y2, z2), data);
	}
}
extend(Segment.prototype, {
	getLineSegment: function () {
		return this._ls;
	},
	getEndZ: function () {
		var p = this._ls.getCoordinate(1);
		return p.z;
	},
	getStartZ: function () {
		var p = this._ls.getCoordinate(0);
		return p.z;
	},
	intersection: function (s) {
		return this._ls.intersection(s.getLineSegment());
	},
	getStart: function () {
		return this._ls.getCoordinate(0);
	},
	getEnd: function () {
		return this._ls.getCoordinate(1);
	},
	getEndY: function () {
		var p = this._ls.getCoordinate(1);
		return p.y;
	},
	getStartX: function () {
		var p = this._ls.getCoordinate(0);
		return p.x;
	},
	equalsTopo: function (s) {
		return this._ls.equalsTopo(s.getLineSegment());
	},
	getStartY: function () {
		var p = this._ls.getCoordinate(0);
		return p.y;
	},
	setData: function (data) {
		this._data = data;
	},
	getData: function () {
		return this._data;
	},
	getEndX: function () {
		var p = this._ls.getCoordinate(1);
		return p.x;
	},
	toString: function () {
		return this._ls.toString();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Segment;
	}
});
