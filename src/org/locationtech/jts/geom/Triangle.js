import Coordinate from './Coordinate';
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException';
import Angle from '../algorithm/Angle';
import HCoordinate from '../algorithm/HCoordinate';
export default class Triangle {
	constructor() {
		Triangle.constructor_.apply(this, arguments);
	}
	static area(a, b, c) {
		return Math.abs(((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2);
	}
	static signedArea(a, b, c) {
		return ((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2;
	}
	static det(m00, m01, m10, m11) {
		return m00 * m11 - m01 * m10;
	}
	static interpolateZ(p, v0, v1, v2) {
		var x0 = v0.x;
		var y0 = v0.y;
		var a = v1.x - x0;
		var b = v2.x - x0;
		var c = v1.y - y0;
		var d = v2.y - y0;
		var det = a * d - b * c;
		var dx = p.x - x0;
		var dy = p.y - y0;
		var t = (d * dx - b * dy) / det;
		var u = (-c * dx + a * dy) / det;
		var z = v0.z + t * (v1.z - v0.z) + u * (v2.z - v0.z);
		return z;
	}
	static longestSideLength(a, b, c) {
		var lenAB = a.distance(b);
		var lenBC = b.distance(c);
		var lenCA = c.distance(a);
		var maxLen = lenAB;
		if (lenBC > maxLen) maxLen = lenBC;
		if (lenCA > maxLen) maxLen = lenCA;
		return maxLen;
	}
	static isAcute(a, b, c) {
		if (!Angle.isAcute(a, b, c)) return false;
		if (!Angle.isAcute(b, c, a)) return false;
		if (!Angle.isAcute(c, a, b)) return false;
		return true;
	}
	static circumcentre(a, b, c) {
		var cx = c.x;
		var cy = c.y;
		var ax = a.x - cx;
		var ay = a.y - cy;
		var bx = b.x - cx;
		var by = b.y - cy;
		var denom = 2 * Triangle.det(ax, ay, bx, by);
		var numx = Triangle.det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
		var numy = Triangle.det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
		var ccx = cx - numx / denom;
		var ccy = cy + numy / denom;
		return new Coordinate(ccx, ccy);
	}
	static perpendicularBisector(a, b) {
		var dx = b.x - a.x;
		var dy = b.y - a.y;
		var l1 = new HCoordinate(a.x + dx / 2.0, a.y + dy / 2.0, 1.0);
		var l2 = new HCoordinate(a.x - dy + dx / 2.0, a.y + dx + dy / 2.0, 1.0);
		return new HCoordinate(l1, l2);
	}
	static angleBisector(a, b, c) {
		var len0 = b.distance(a);
		var len2 = b.distance(c);
		var frac = len0 / (len0 + len2);
		var dx = c.x - a.x;
		var dy = c.y - a.y;
		var splitPt = new Coordinate(a.x + frac * dx, a.y + frac * dy);
		return splitPt;
	}
	static area3D(a, b, c) {
		var ux = b.x - a.x;
		var uy = b.y - a.y;
		var uz = b.z - a.z;
		var vx = c.x - a.x;
		var vy = c.y - a.y;
		var vz = c.z - a.z;
		var crossx = uy * vz - uz * vy;
		var crossy = uz * vx - ux * vz;
		var crossz = ux * vy - uy * vx;
		var absSq = crossx * crossx + crossy * crossy + crossz * crossz;
		var area3D = Math.sqrt(absSq) / 2;
		return area3D;
	}
	static centroid(a, b, c) {
		var x = (a.x + b.x + c.x) / 3;
		var y = (a.y + b.y + c.y) / 3;
		return new Coordinate(x, y);
	}
	static inCentre(a, b, c) {
		var len0 = b.distance(c);
		var len1 = a.distance(c);
		var len2 = a.distance(b);
		var circum = len0 + len1 + len2;
		var inCentreX = (len0 * a.x + len1 * b.x + len2 * c.x) / circum;
		var inCentreY = (len0 * a.y + len1 * b.y + len2 * c.y) / circum;
		return new Coordinate(inCentreX, inCentreY);
	}
	area() {
		return Triangle.area(this.p0, this.p1, this.p2);
	}
	signedArea() {
		return Triangle.signedArea(this.p0, this.p1, this.p2);
	}
	interpolateZ(p) {
		if (p === null) throw new IllegalArgumentException("Supplied point is null.");
		return Triangle.interpolateZ(p, this.p0, this.p1, this.p2);
	}
	longestSideLength() {
		return Triangle.longestSideLength(this.p0, this.p1, this.p2);
	}
	isAcute() {
		return Triangle.isAcute(this.p0, this.p1, this.p2);
	}
	circumcentre() {
		return Triangle.circumcentre(this.p0, this.p1, this.p2);
	}
	area3D() {
		return Triangle.area3D(this.p0, this.p1, this.p2);
	}
	centroid() {
		return Triangle.centroid(this.p0, this.p1, this.p2);
	}
	inCentre() {
		return Triangle.inCentre(this.p0, this.p1, this.p2);
	}
	getClass() {
		return Triangle;
	}
	get interfaces_() {
		return [];
	}
}
Triangle.constructor_ = function () {
	this.p0 = null;
	this.p1 = null;
	this.p2 = null;
	let p0 = arguments[0], p1 = arguments[1], p2 = arguments[2];
	this.p0 = p0;
	this.p1 = p1;
	this.p2 = p2;
};
