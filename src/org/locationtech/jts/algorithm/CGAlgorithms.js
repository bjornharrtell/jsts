import Location from '../geom/Location';
import hasInterface from '../../../../hasInterface';
import Coordinate from '../geom/Coordinate';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import MathUtil from '../math/MathUtil';
import CGAlgorithmsDD from './CGAlgorithmsDD';
import CoordinateSequence from '../geom/CoordinateSequence';
import RobustLineIntersector from './RobustLineIntersector';
import Envelope from '../geom/Envelope';
import RayCrossingCounter from './RayCrossingCounter';
export default function CGAlgorithms() {}
extend(CGAlgorithms.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CGAlgorithms;
	}
});
CGAlgorithms.orientationIndex = function (p1, p2, q) {
	return CGAlgorithmsDD.orientationIndex(p1, p2, q);
};
CGAlgorithms.signedArea = function () {
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
CGAlgorithms.distanceLineLine = function (A, B, C, D) {
	if (A.equals(B)) return CGAlgorithms.distancePointLine(A, C, D);
	if (C.equals(D)) return CGAlgorithms.distancePointLine(D, A, B);
	var noIntersection = false;
	if (!Envelope.intersects(A, B, C, D)) {
		noIntersection = true;
	} else {
		var denom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		if (denom === 0) {
			noIntersection = true;
		} else {
			var r_num = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
			var s_num = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
			var s = s_num / denom;
			var r = r_num / denom;
			if (r < 0 || r > 1 || s < 0 || s > 1) {
				noIntersection = true;
			}
		}
	}
	if (noIntersection) {
		return MathUtil.min(CGAlgorithms.distancePointLine(A, C, D), CGAlgorithms.distancePointLine(B, C, D), CGAlgorithms.distancePointLine(C, A, B), CGAlgorithms.distancePointLine(D, A, B));
	}
	return 0.0;
};
CGAlgorithms.isPointInRing = function (p, ring) {
	return CGAlgorithms.locatePointInRing(p, ring) !== Location.EXTERIOR;
};
CGAlgorithms.computeLength = function (pts) {
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
};
CGAlgorithms.isCCW = function (ring) {
	var nPts = ring.length - 1;
	if (nPts < 3) throw new IllegalArgumentException("Ring has fewer than 4 points, so orientation cannot be determined");
	var hiPt = ring[0];
	var hiIndex = 0;
	for (var i = 1; i <= nPts; i++) {
		var p = ring[i];
		if (p.y > hiPt.y) {
			hiPt = p;
			hiIndex = i;
		}
	}
	var iPrev = hiIndex;
	do {
		iPrev = iPrev - 1;
		if (iPrev < 0) iPrev = nPts;
	} while (ring[iPrev].equals2D(hiPt) && iPrev !== hiIndex);
	var iNext = hiIndex;
	do {
		iNext = (iNext + 1) % nPts;
	} while (ring[iNext].equals2D(hiPt) && iNext !== hiIndex);
	var prev = ring[iPrev];
	var next = ring[iNext];
	if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) return false;
	var disc = CGAlgorithms.computeOrientation(prev, hiPt, next);
	var isCCW = false;
	if (disc === 0) {
		isCCW = prev.x > next.x;
	} else {
		isCCW = disc > 0;
	}
	return isCCW;
};
CGAlgorithms.locatePointInRing = function (p, ring) {
	return RayCrossingCounter.locatePointInRing(p, ring);
};
CGAlgorithms.distancePointLinePerpendicular = function (p, A, B) {
	var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
	var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
	return Math.abs(s) * Math.sqrt(len2);
};
CGAlgorithms.computeOrientation = function (p1, p2, q) {
	return CGAlgorithms.orientationIndex(p1, p2, q);
};
CGAlgorithms.distancePointLine = function () {
	if (arguments.length === 2) {
		let p = arguments[0], line = arguments[1];
		if (line.length === 0) throw new IllegalArgumentException("Line array must contain at least one vertex");
		var minDistance = p.distance(line[0]);
		for (var i = 0; i < line.length - 1; i++) {
			var dist = CGAlgorithms.distancePointLine(p, line[i], line[i + 1]);
			if (dist < minDistance) {
				minDistance = dist;
			}
		}
		return minDistance;
	} else if (arguments.length === 3) {
		let p = arguments[0], A = arguments[1], B = arguments[2];
		if (A.x === B.x && A.y === B.y) return p.distance(A);
		var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
		var r = ((p.x - A.x) * (B.x - A.x) + (p.y - A.y) * (B.y - A.y)) / len2;
		if (r <= 0.0) return p.distance(A);
		if (r >= 1.0) return p.distance(B);
		var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
		return Math.abs(s) * Math.sqrt(len2);
	}
};
CGAlgorithms.isOnLine = function (p, pt) {
	var lineIntersector = new RobustLineIntersector();
	for (var i = 1; i < pt.length; i++) {
		var p0 = pt[i - 1];
		var p1 = pt[i];
		lineIntersector.computeIntersection(p, p0, p1);
		if (lineIntersector.hasIntersection()) {
			return true;
		}
	}
	return false;
};
CGAlgorithms.CLOCKWISE = -1;
CGAlgorithms.RIGHT = CGAlgorithms.CLOCKWISE;
CGAlgorithms.COUNTERCLOCKWISE = 1;
CGAlgorithms.LEFT = CGAlgorithms.COUNTERCLOCKWISE;
CGAlgorithms.COLLINEAR = 0;
CGAlgorithms.STRAIGHT = CGAlgorithms.COLLINEAR;
