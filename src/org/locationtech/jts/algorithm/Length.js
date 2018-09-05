import Coordinate from '../geom/Coordinate';
export default class Length {
	constructor() {
		Length.constructor_.apply(this, arguments);
	}
	static ofLine(pts) {
		var n = pts.size();
		if (n <= 1) return 0.0;
		var len = 0.0;
		var p = new Coordinate();
		pts.getCoordinate(0, p);
		var x0 = p.x;
		var y0 = p.y;
		for (var i = 1; i < n; i++) {
			pts.getCoordinate(i, p);
			var x1 = p.x;
			var y1 = p.y;
			var dx = x1 - x0;
			var dy = y1 - y0;
			len += Math.sqrt(dx * dx + dy * dy);
			x0 = x1;
			y0 = y1;
		}
		return len;
	}
	getClass() {
		return Length;
	}
	get interfaces_() {
		return [];
	}
}
Length.constructor_ = function () {};
