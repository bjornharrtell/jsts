import Coordinate from '../geom/Coordinate';
import Orientation from '../algorithm/Orientation';
import Quadrant from '../geomgraph/Quadrant';
import Assert from '../util/Assert';
export default class HalfEdge {
	constructor() {
		HalfEdge.constructor_.apply(this, arguments);
	}
	static init(e0, e1) {
		if (e0._sym !== null || e1._sym !== null || e0._next !== null || e1._next !== null) throw new IllegalStateException("Edges are already initialized");
		e0.init(e1);
		return e0;
	}
	static create(p0, p1) {
		var e0 = new HalfEdge(p0);
		var e1 = new HalfEdge(p1);
		e0.init(e1);
		return e0;
	}
	find(dest) {
		var oNext = this;
		do {
			if (oNext === null) return null;
			if (oNext.dest().equals2D(dest)) return oNext;
			oNext = oNext.oNext();
		} while (oNext !== this);
		return null;
	}
	dest() {
		return this._sym._orig;
	}
	oNext() {
		return this._sym._next;
	}
	insert(e) {
		if (this.oNext() === this) {
			this.insertAfter(e);
			return null;
		}
		var ecmp = this.compareTo(e);
		var ePrev = this;
		do {
			var oNext = ePrev.oNext();
			var cmp = oNext.compareTo(e);
			if (cmp !== ecmp || oNext === this) {
				ePrev.insertAfter(e);
				return null;
			}
			ePrev = oNext;
		} while (ePrev !== this);
		Assert.shouldNeverReachHere();
	}
	insertAfter(e) {
		Assert.equals(this._orig, e.orig());
		var save = this.oNext();
		this._sym.setNext(e);
		e.sym().setNext(save);
	}
	degree() {
		var degree = 0;
		var e = this;
		do {
			degree++;
			e = e.oNext();
		} while (e !== this);
		return degree;
	}
	equals() {
		if (arguments.length === 2 && (arguments[1] instanceof Coordinate && arguments[0] instanceof Coordinate)) {
			let p0 = arguments[0], p1 = arguments[1];
			return this._orig.equals2D(p0) && this._sym._orig.equals(p1);
		}
	}
	deltaY() {
		return this._sym._orig.y - this._orig.y;
	}
	sym() {
		return this._sym;
	}
	prev() {
		return this._sym.next()._sym;
	}
	compareAngularDirection(e) {
		var dx = this.deltaX();
		var dy = this.deltaY();
		var dx2 = e.deltaX();
		var dy2 = e.deltaY();
		if (dx === dx2 && dy === dy2) return 0;
		var quadrant = Quadrant.quadrant(dx, dy);
		var quadrant2 = Quadrant.quadrant(dx2, dy2);
		if (quadrant > quadrant2) return 1;
		if (quadrant < quadrant2) return -1;
		return Orientation.index(e._orig, e.dest(), this.dest());
	}
	prevNode() {
		var e = this;
		while (e.degree() === 2) {
			e = e.prev();
			if (e === this) return null;
		}
		return e;
	}
	compareTo(obj) {
		var e = obj;
		var comp = this.compareAngularDirection(e);
		return comp;
	}
	next() {
		return this._next;
	}
	setSym(e) {
		this._sym = e;
	}
	orig() {
		return this._orig;
	}
	toString() {
		return "HE(" + this._orig.x + " " + this._orig.y + ", " + this._sym._orig.x + " " + this._sym._orig.y + ")";
	}
	setNext(e) {
		this._next = e;
	}
	init(e) {
		this.setSym(e);
		e.setSym(this);
		this.setNext(e);
		e.setNext(this);
	}
	deltaX() {
		return this._sym._orig.x - this._orig.x;
	}
	getClass() {
		return HalfEdge;
	}
	get interfaces_() {
		return [];
	}
}
HalfEdge.constructor_ = function () {
	this._orig = null;
	this._sym = null;
	this._next = null;
	let orig = arguments[0];
	this._orig = orig;
};
