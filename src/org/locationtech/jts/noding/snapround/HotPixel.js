import Coordinate from '../../geom/Coordinate';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import extend from '../../../../../extend';
import Envelope from '../../geom/Envelope';
import Assert from '../../util/Assert';
export default function HotPixel() {
	this.li = null;
	this.pt = null;
	this.originalPt = null;
	this.ptScaled = null;
	this.p0Scaled = null;
	this.p1Scaled = null;
	this.scaleFactor = null;
	this.minx = null;
	this.maxx = null;
	this.miny = null;
	this.maxy = null;
	this.corner = new Array(4).fill(null);
	this.safeEnv = null;
	let pt = arguments[0], scaleFactor = arguments[1], li = arguments[2];
	this.originalPt = pt;
	this.pt = pt;
	this.scaleFactor = scaleFactor;
	this.li = li;
	if (scaleFactor <= 0) throw new IllegalArgumentException("Scale factor must be non-zero");
	if (scaleFactor !== 1.0) {
		this.pt = new Coordinate(this.scale(pt.x), this.scale(pt.y));
		this.p0Scaled = new Coordinate();
		this.p1Scaled = new Coordinate();
	}
	this.initCorners(this.pt);
}
extend(HotPixel.prototype, {
	intersectsScaled: function (p0, p1) {
		var segMinx = Math.min(p0.x, p1.x);
		var segMaxx = Math.max(p0.x, p1.x);
		var segMiny = Math.min(p0.y, p1.y);
		var segMaxy = Math.max(p0.y, p1.y);
		var isOutsidePixelEnv = this.maxx < segMinx || this.minx > segMaxx || this.maxy < segMiny || this.miny > segMaxy;
		if (isOutsidePixelEnv) return false;
		var intersects = this.intersectsToleranceSquare(p0, p1);
		Assert.isTrue(!(isOutsidePixelEnv && intersects), "Found bad envelope test");
		return intersects;
	},
	initCorners: function (pt) {
		var tolerance = 0.5;
		this.minx = pt.x - tolerance;
		this.maxx = pt.x + tolerance;
		this.miny = pt.y - tolerance;
		this.maxy = pt.y + tolerance;
		this.corner[0] = new Coordinate(this.maxx, this.maxy);
		this.corner[1] = new Coordinate(this.minx, this.maxy);
		this.corner[2] = new Coordinate(this.minx, this.miny);
		this.corner[3] = new Coordinate(this.maxx, this.miny);
	},
	intersects: function (p0, p1) {
		if (this.scaleFactor === 1.0) return this.intersectsScaled(p0, p1);
		this.copyScaled(p0, this.p0Scaled);
		this.copyScaled(p1, this.p1Scaled);
		return this.intersectsScaled(this.p0Scaled, this.p1Scaled);
	},
	scale: function (val) {
		return Math.round(val * this.scaleFactor);
	},
	getCoordinate: function () {
		return this.originalPt;
	},
	copyScaled: function (p, pScaled) {
		pScaled.x = this.scale(p.x);
		pScaled.y = this.scale(p.y);
	},
	getSafeEnvelope: function () {
		if (this.safeEnv === null) {
			var safeTolerance = HotPixel.SAFE_ENV_EXPANSION_FACTOR / this.scaleFactor;
			this.safeEnv = new Envelope(this.originalPt.x - safeTolerance, this.originalPt.x + safeTolerance, this.originalPt.y - safeTolerance, this.originalPt.y + safeTolerance);
		}
		return this.safeEnv;
	},
	intersectsPixelClosure: function (p0, p1) {
		this.li.computeIntersection(p0, p1, this.corner[0], this.corner[1]);
		if (this.li.hasIntersection()) return true;
		this.li.computeIntersection(p0, p1, this.corner[1], this.corner[2]);
		if (this.li.hasIntersection()) return true;
		this.li.computeIntersection(p0, p1, this.corner[2], this.corner[3]);
		if (this.li.hasIntersection()) return true;
		this.li.computeIntersection(p0, p1, this.corner[3], this.corner[0]);
		if (this.li.hasIntersection()) return true;
		return false;
	},
	intersectsToleranceSquare: function (p0, p1) {
		var intersectsLeft = false;
		var intersectsBottom = false;
		this.li.computeIntersection(p0, p1, this.corner[0], this.corner[1]);
		if (this.li.isProper()) return true;
		this.li.computeIntersection(p0, p1, this.corner[1], this.corner[2]);
		if (this.li.isProper()) return true;
		if (this.li.hasIntersection()) intersectsLeft = true;
		this.li.computeIntersection(p0, p1, this.corner[2], this.corner[3]);
		if (this.li.isProper()) return true;
		if (this.li.hasIntersection()) intersectsBottom = true;
		this.li.computeIntersection(p0, p1, this.corner[3], this.corner[0]);
		if (this.li.isProper()) return true;
		if (intersectsLeft && intersectsBottom) return true;
		if (p0.equals(this.pt)) return true;
		if (p1.equals(this.pt)) return true;
		return false;
	},
	addSnappedNode: function (segStr, segIndex) {
		var p0 = segStr.getCoordinate(segIndex);
		var p1 = segStr.getCoordinate(segIndex + 1);
		if (this.intersects(p0, p1)) {
			segStr.addIntersection(this.getCoordinate(), segIndex);
			return true;
		}
		return false;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return HotPixel;
	}
});
HotPixel.SAFE_ENV_EXPANSION_FACTOR = 0.75;

