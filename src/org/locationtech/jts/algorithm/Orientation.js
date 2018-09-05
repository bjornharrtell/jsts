import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import CGAlgorithmsDD from './CGAlgorithmsDD';
export default class Orientation {
	constructor() {
		Orientation.constructor_.apply(this, arguments);
	}
	static index(p1, p2, q) {
		return CGAlgorithmsDD.orientationIndex(p1, p2, q);
	}
	static isCCW(ring) {
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
		var disc = Orientation.index(prev, hiPt, next);
		var isCCW = null;
		if (disc === 0) {
			isCCW = prev.x > next.x;
		} else {
			isCCW = disc > 0;
		}
		return isCCW;
	}
	getClass() {
		return Orientation;
	}
	get interfaces_() {
		return [];
	}
}
Orientation.constructor_ = function () {};
Orientation.CLOCKWISE = -1;
Orientation.RIGHT = Orientation.CLOCKWISE;
Orientation.COUNTERCLOCKWISE = 1;
Orientation.LEFT = Orientation.COUNTERCLOCKWISE;
Orientation.COLLINEAR = 0;
Orientation.STRAIGHT = Orientation.COLLINEAR;
