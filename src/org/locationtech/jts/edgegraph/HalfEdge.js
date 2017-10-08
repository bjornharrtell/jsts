import CGAlgorithms from '../algorithm/CGAlgorithms';
import extend from '../../../../extend';
import Quadrant from '../geomgraph/Quadrant';
import Assert from '../util/Assert';
export default function HalfEdge() {
	this.__orig = null;
	this.__sym = null;
	this.__next = null;
	let orig = arguments[0];
	this.__orig = orig;
}
extend(HalfEdge.prototype, {
	find: function (dest) {
		var oNext = this;
		do {
			if (oNext === null) return null;
			if (oNext.dest().equals2D(dest)) return oNext;
			oNext = oNext.oNext();
		} while (oNext !== this);
		return null;
	},
	dest: function () {
		return this.__sym.__orig;
	},
	oNext: function () {
		return this.__sym.__next;
	},
	insert: function (e) {
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
	},
	insertAfter: function (e) {
		Assert.equals(this.__orig, e.orig());
		var save = this.oNext();
		this.__sym.setNext(e);
		e.sym().setNext(save);
	},
	degree: function () {
		var degree = 0;
		var e = this;
		do {
			degree++;
			e = e.oNext();
		} while (e !== this);
		return degree;
	},
	equals: function () {
		if (arguments.length === 2) {
			let p0 = arguments[0], p1 = arguments[1];
			return this.__orig.equals2D(p0) && this.__sym.__orig.equals(p1);
		}
	},
	deltaY: function () {
		return this.__sym.__orig.y - this.__orig.y;
	},
	sym: function () {
		return this.__sym;
	},
	prev: function () {
		return this.__sym.next().__sym;
	},
	compareAngularDirection: function (e) {
		var dx = this.deltaX();
		var dy = this.deltaY();
		var dx2 = e.deltaX();
		var dy2 = e.deltaY();
		if (dx === dx2 && dy === dy2) return 0;
		var quadrant = Quadrant.quadrant(dx, dy);
		var quadrant2 = Quadrant.quadrant(dx2, dy2);
		if (quadrant > quadrant2) return 1;
		if (quadrant < quadrant2) return -1;
		return CGAlgorithms.computeOrientation(e.__orig, e.dest(), this.dest());
	},
	prevNode: function () {
		var e = this;
		while (e.degree() === 2) {
			e = e.prev();
			if (e === this) return null;
		}
		return e;
	},
	compareTo: function (obj) {
		var e = obj;
		var comp = this.compareAngularDirection(e);
		return comp;
	},
	next: function () {
		return this.__next;
	},
	setSym: function (e) {
		this.__sym = e;
	},
	orig: function () {
		return this.__orig;
	},
	toString: function () {
		return "HE(" + this.__orig.x + " " + this.__orig.y + ", " + this.__sym.__orig.x + " " + this.__sym.__orig.y + ")";
	},
	setNext: function (e) {
		this.__next = e;
	},
	init: function (e) {
		this.setSym(e);
		e.setSym(this);
		this.setNext(e);
		e.setNext(this);
	},
	deltaX: function () {
		return this.__sym.__orig.x - this.__orig.x;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return HalfEdge;
	}
});
HalfEdge.init = function (e0, e1) {
	if (e0.__sym !== null || e1.__sym !== null || e0.__next !== null || e1.__next !== null) throw new IllegalStateException("Edges are already initialized");
	e0.init(e1);
	return e0;
};
HalfEdge.create = function (p0, p1) {
	var e0 = new HalfEdge(p0);
	var e1 = new HalfEdge(p1);
	e0.init(e1);
	return e0;
};
