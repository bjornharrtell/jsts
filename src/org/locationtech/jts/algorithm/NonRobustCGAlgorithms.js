import CGAlgorithms from './CGAlgorithms';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import extend from '../../../../extend';
import inherits from '../../../../inherits';
export default function NonRobustCGAlgorithms() {
	CGAlgorithms.apply(this);
}
inherits(NonRobustCGAlgorithms, CGAlgorithms);
extend(NonRobustCGAlgorithms.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return NonRobustCGAlgorithms;
	}
});
NonRobustCGAlgorithms.orientationIndex = function () {
	if (arguments.length === 3) {
		let p1 = arguments[0], p2 = arguments[1], q = arguments[2];
		var dx1 = p2.x - p1.x;
		var dy1 = p2.y - p1.y;
		var dx2 = q.x - p2.x;
		var dy2 = q.y - p2.y;
		var det = dx1 * dy2 - dx2 * dy1;
		if (det > 0.0) return 1;
		if (det < 0.0) return -1;
		return 0;
	} else return CGAlgorithms.prototype.orientationIndex.apply(this, arguments);
};
NonRobustCGAlgorithms.distanceLineLine = function () {
	if (arguments.length === 4) {
		let A = arguments[0], B = arguments[1], C = arguments[2], D = arguments[3];
		if (A.equals(B)) return CGAlgorithms.distancePointLine(A, C, D);
		if (C.equals(D)) return CGAlgorithms.distancePointLine(D, A, B);
		var r_top = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
		var r_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		var s_top = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
		var s_bot = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
		if (r_bot === 0 || s_bot === 0) {
			return Math.min(CGAlgorithms.distancePointLine(A, C, D), Math.min(CGAlgorithms.distancePointLine(B, C, D), Math.min(CGAlgorithms.distancePointLine(C, A, B), CGAlgorithms.distancePointLine(D, A, B))));
		}
		var s = s_top / s_bot;
		var r = r_top / r_bot;
		if (r < 0 || r > 1 || s < 0 || s > 1) {
			return Math.min(CGAlgorithms.distancePointLine(A, C, D), Math.min(CGAlgorithms.distancePointLine(B, C, D), Math.min(CGAlgorithms.distancePointLine(C, A, B), CGAlgorithms.distancePointLine(D, A, B))));
		}
		return 0.0;
	} else return CGAlgorithms.prototype.distanceLineLine.apply(this, arguments);
};
NonRobustCGAlgorithms.isPointInRing = function () {
	if (arguments.length === 2) {
		let p = arguments[0], ring = arguments[1];
		var i = null, i1 = null;
		var xInt = null;
		var crossings = 0;
		var x1 = null, y1 = null, x2 = null, y2 = null;
		var nPts = ring.length;
		for ((i = 1); i < nPts; i++) {
			i1 = i - 1;
			var p1 = ring[i];
			var p2 = ring[i1];
			x1 = p1.x - p.x;
			y1 = p1.y - p.y;
			x2 = p2.x - p.x;
			y2 = p2.y - p.y;
			if (y1 > 0 && y2 <= 0 || y2 > 0 && y1 <= 0) {
				xInt = (x1 * y2 - x2 * y1) / (y2 - y1);
				if (0.0 < xInt) crossings++;
			}
		}
		if (crossings % 2 === 1) return true; else return false;
	} else return CGAlgorithms.prototype.isPointInRing.apply(this, arguments);
};
NonRobustCGAlgorithms.isCCW = function () {
	if (arguments.length === 1) {
		let ring = arguments[0];
		var nPts = ring.length - 1;
		if (nPts < 4) return false;
		var hip = ring[0];
		var hii = 0;
		for (var i = 1; i <= nPts; i++) {
			var p = ring[i];
			if (p.y > hip.y) {
				hip = p;
				hii = i;
			}
		}
		var iPrev = hii;
		do {
			iPrev = (iPrev - 1) % nPts;
		} while (ring[iPrev].equals(hip) && iPrev !== hii);
		var iNext = hii;
		do {
			iNext = (iNext + 1) % nPts;
		} while (ring[iNext].equals(hip) && iNext !== hii);
		var prev = ring[iPrev];
		var next = ring[iNext];
		if (prev.equals(hip) || next.equals(hip) || prev.equals(next)) throw new IllegalArgumentException("degenerate ring (does not contain 3 different points)");
		var prev2x = prev.x - hip.x;
		var prev2y = prev.y - hip.y;
		var next2x = next.x - hip.x;
		var next2y = next.y - hip.y;
		var disc = next2x * prev2y - next2y * prev2x;
		if (disc === 0.0) {
			return prev.x > next.x;
		} else {
			return disc > 0.0;
		}
	} else return CGAlgorithms.prototype.isCCW.apply(this, arguments);
};
NonRobustCGAlgorithms.computeOrientation = function () {
	if (arguments.length === 3) {
		let p1 = arguments[0], p2 = arguments[1], q = arguments[2];
		return NonRobustCGAlgorithms.orientationIndex(p1, p2, q);
	} else return CGAlgorithms.prototype.computeOrientation.apply(this, arguments);
};
