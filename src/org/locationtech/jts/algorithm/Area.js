import hasInterface from '../../../../hasInterface';
import Coordinate from '../geom/Coordinate';
import extend from '../../../../extend';
import CoordinateSequence from '../geom/CoordinateSequence';
export default function Area() {}
extend(Area.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Area;
	}
});
Area.ofRing = function () {
	if (arguments[0] instanceof Array) {
		let ring = arguments[0];
		return Math.abs(Area.ofRingSigned(ring));
	} else if (hasInterface(arguments[0], CoordinateSequence)) {
		let ring = arguments[0];
		return Math.abs(Area.ofRingSigned(ring));
	}
};
Area.ofRingSigned = function () {
	if (arguments[0] instanceof Array) {
		let ring = arguments[0];
		if (ring.length < 3) return 0.0;
		var sum = 0.0;
		var x0 = ring[0].x;
		for (var i = 1; i < ring.length - 1; i++) {
			var x = ring[i].x - x0;
			var y1 = ring[i + 1].y;
			var y2 = ring[i - 1].y;
			sum += x * (y2 - y1);
		}
		return sum / 2.0;
	} else if (hasInterface(arguments[0], CoordinateSequence)) {
		let ring = arguments[0];
		var n = ring.size();
		if (n < 3) return 0.0;
		var p0 = new Coordinate();
		var p1 = new Coordinate();
		var p2 = new Coordinate();
		ring.getCoordinate(0, p1);
		ring.getCoordinate(1, p2);
		var x0 = p1.x;
		p2.x -= x0;
		var sum = 0.0;
		for (var i = 1; i < n - 1; i++) {
			p0.y = p1.y;
			p1.x = p2.x;
			p1.y = p2.y;
			ring.getCoordinate(i + 1, p2);
			p2.x -= x0;
			sum += p1.x * (p0.y - p2.y);
		}
		return sum / 2.0;
	}
};
