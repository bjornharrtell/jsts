import NotRepresentableException from '../../algorithm/NotRepresentableException';
import Coordinate from '../../geom/Coordinate';
import TrianglePredicate from './TrianglePredicate';
import System from '../../../../../java/lang/System';
import HCoordinate from '../../algorithm/HCoordinate';
export default class Vertex {
	constructor(...args) {
		this.p = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				return ((...args) => {
					let [_p] = args;
					this.p = new Coordinate(_p);
				})(...args);
			} else if (args.length === 2) {
				return ((...args) => {
					let [_x, _y] = args;
					this.p = new Coordinate(_x, _y);
				})(...args);
			} else if (args.length === 3) {
				return ((...args) => {
					let [_x, _y, _z] = args;
					this.p = new Coordinate(_x, _y, _z);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static interpolateZ(...args) {
		if (args.length === 3) {
			let [p, p0, p1] = args;
			var segLen = p0.distance(p1);
			var ptLen = p.distance(p0);
			var dz = p1.z - p0.z;
			var pz = p0.z + dz * (ptLen / segLen);
			return pz;
		} else if (args.length === 4) {
			let [p, v0, v1, v2] = args;
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
	}
	circleCenter(b, c) {
		var a = new Vertex(this.getX(), this.getY());
		var cab = this.bisector(a, b);
		var cbc = this.bisector(b, c);
		var hcc = new HCoordinate(cab, cbc);
		var cc = null;
		try {
			cc = new Vertex(hcc.getX(), hcc.getY());
		} catch (nre) {
			if (nre instanceof NotRepresentableException) {
				System.err.println("a: " + a + "  b: " + b + "  c: " + c);
				System.err.println(nre);
			} else throw nre;
		} finally {}
		return cc;
	}
	dot(v) {
		return this.p.x * v.getX() + this.p.y * v.getY();
	}
	magn() {
		return Math.sqrt(this.p.x * this.p.x + this.p.y * this.p.y);
	}
	getZ() {
		return this.p.z;
	}
	bisector(a, b) {
		var dx = b.getX() - a.getX();
		var dy = b.getY() - a.getY();
		var l1 = new HCoordinate(a.getX() + dx / 2.0, a.getY() + dy / 2.0, 1.0);
		var l2 = new HCoordinate(a.getX() - dy + dx / 2.0, a.getY() + dx + dy / 2.0, 1.0);
		return new HCoordinate(l1, l2);
	}
	equals(...args) {
		if (args.length === 1) {
			let [_x] = args;
			if (this.p.x === _x.getX() && this.p.y === _x.getY()) {
				return true;
			} else {
				return false;
			}
		} else if (args.length === 2) {
			let [_x, tolerance] = args;
			if (this.p.distance(_x.getCoordinate()) < tolerance) {
				return true;
			} else {
				return false;
			}
		}
	}
	getCoordinate() {
		return this.p;
	}
	isInCircle(a, b, c) {
		return TrianglePredicate.isInCircleRobust(a.p, b.p, c.p, this.p);
	}
	interpolateZValue(v0, v1, v2) {
		var x0 = v0.getX();
		var y0 = v0.getY();
		var a = v1.getX() - x0;
		var b = v2.getX() - x0;
		var c = v1.getY() - y0;
		var d = v2.getY() - y0;
		var det = a * d - b * c;
		var dx = this.getX() - x0;
		var dy = this.getY() - y0;
		var t = (d * dx - b * dy) / det;
		var u = (-c * dx + a * dy) / det;
		var z = v0.getZ() + t * (v1.getZ() - v0.getZ()) + u * (v2.getZ() - v0.getZ());
		return z;
	}
	midPoint(a) {
		var xm = (this.p.x + a.getX()) / 2.0;
		var ym = (this.p.y + a.getY()) / 2.0;
		var zm = (this.p.z + a.getZ()) / 2.0;
		return new Vertex(xm, ym, zm);
	}
	rightOf(e) {
		return this.isCCW(e.dest(), e.orig());
	}
	isCCW(b, c) {
		return (b.p.x - this.p.x) * (c.p.y - this.p.y) - (b.p.y - this.p.y) * (c.p.x - this.p.x) > 0;
	}
	getX() {
		return this.p.x;
	}
	crossProduct(v) {
		return this.p.x * v.getY() - this.p.y * v.getX();
	}
	setZ(_z) {
		this.p.z = _z;
	}
	times(c) {
		return new Vertex(c * this.p.x, c * this.p.y);
	}
	cross() {
		return new Vertex(this.p.y, -this.p.x);
	}
	leftOf(e) {
		return this.isCCW(e.orig(), e.dest());
	}
	toString() {
		return "POINT (" + this.p.x + " " + this.p.y + ")";
	}
	sub(v) {
		return new Vertex(this.p.x - v.getX(), this.p.y - v.getY());
	}
	getY() {
		return this.p.y;
	}
	classify(p0, p1) {
		var p2 = this;
		var a = p1.sub(p0);
		var b = p2.sub(p0);
		var sa = a.crossProduct(b);
		if (sa > 0.0) return Vertex.LEFT;
		if (sa < 0.0) return Vertex.RIGHT;
		if (a.getX() * b.getX() < 0.0 || a.getY() * b.getY() < 0.0) return Vertex.BEHIND;
		if (a.magn() < b.magn()) return Vertex.BEYOND;
		if (p0.equals(p2)) return Vertex.ORIGIN;
		if (p1.equals(p2)) return Vertex.DESTINATION;
		return Vertex.BETWEEN;
	}
	sum(v) {
		return new Vertex(this.p.x + v.getX(), this.p.y + v.getY());
	}
	distance(v1, v2) {
		return Math.sqrt(Math.pow(v2.getX() - v1.getX(), 2.0) + Math.pow(v2.getY() - v1.getY(), 2.0));
	}
	circumRadiusRatio(b, c) {
		var x = this.circleCenter(b, c);
		var radius = this.distance(x, b);
		var edgeLength = this.distance(this, b);
		var el = this.distance(b, c);
		if (el < edgeLength) {
			edgeLength = el;
		}
		el = this.distance(c, this);
		if (el < edgeLength) {
			edgeLength = el;
		}
		return radius / edgeLength;
	}
	getClass() {
		return Vertex;
	}
}
Vertex.LEFT = 0;
Vertex.RIGHT = 1;
Vertex.BEYOND = 2;
Vertex.BEHIND = 3;
Vertex.BETWEEN = 4;
Vertex.ORIGIN = 5;
Vertex.DESTINATION = 6;

