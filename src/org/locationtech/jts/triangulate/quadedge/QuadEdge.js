import WKTWriter from '../../io/WKTWriter';
import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
export default function QuadEdge() {
	this._rot = null;
	this.vertex = null;
	this.next = null;
	this.data = null;
}
extend(QuadEdge.prototype, {
	equalsNonOriented: function (qe) {
		if (this.equalsOriented(qe)) return true;
		if (this.equalsOriented(qe.sym())) return true;
		return false;
	},
	toLineSegment: function () {
		return new LineSegment(this.vertex.getCoordinate(), this.dest().getCoordinate());
	},
	dest: function () {
		return this.sym().orig();
	},
	oNext: function () {
		return this.next;
	},
	equalsOriented: function (qe) {
		if (this.orig().getCoordinate().equals2D(qe.orig().getCoordinate()) && this.dest().getCoordinate().equals2D(qe.dest().getCoordinate())) return true;
		return false;
	},
	dNext: function () {
		return this.sym().oNext().sym();
	},
	lPrev: function () {
		return this.next.sym();
	},
	rPrev: function () {
		return this.sym().oNext();
	},
	rot: function () {
		return this._rot;
	},
	oPrev: function () {
		return this._rot.next._rot;
	},
	sym: function () {
		return this._rot._rot;
	},
	setOrig: function (o) {
		this.vertex = o;
	},
	lNext: function () {
		return this.invRot().oNext().rot();
	},
	getLength: function () {
		return this.orig().getCoordinate().distance(this.dest().getCoordinate());
	},
	invRot: function () {
		return this._rot.sym();
	},
	setDest: function (d) {
		this.sym().setOrig(d);
	},
	setData: function (data) {
		this.data = data;
	},
	getData: function () {
		return this.data;
	},
	delete: function () {
		this._rot = null;
	},
	orig: function () {
		return this.vertex;
	},
	rNext: function () {
		return this._rot.next.invRot();
	},
	toString: function () {
		var p0 = this.vertex.getCoordinate();
		var p1 = this.dest().getCoordinate();
		return WKTWriter.toLineString(p0, p1);
	},
	isLive: function () {
		return this._rot !== null;
	},
	getPrimary: function () {
		if (this.orig().getCoordinate().compareTo(this.dest().getCoordinate()) <= 0) return this; else return this.sym();
	},
	dPrev: function () {
		return this.invRot().oNext().invRot();
	},
	setNext: function (next) {
		this.next = next;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return QuadEdge;
	}
});
QuadEdge.makeEdge = function (o, d) {
	var q0 = new QuadEdge();
	var q1 = new QuadEdge();
	var q2 = new QuadEdge();
	var q3 = new QuadEdge();
	q0._rot = q1;
	q1._rot = q2;
	q2._rot = q3;
	q3._rot = q0;
	q0.setNext(q0);
	q1.setNext(q3);
	q2.setNext(q2);
	q3.setNext(q1);
	var base = q0;
	base.setOrig(o);
	base.setDest(d);
	return base;
};
QuadEdge.swap = function (e) {
	var a = e.oPrev();
	var b = e.sym().oPrev();
	QuadEdge.splice(e, a);
	QuadEdge.splice(e.sym(), b);
	QuadEdge.splice(e, a.lNext());
	QuadEdge.splice(e.sym(), b.lNext());
	e.setOrig(a.dest());
	e.setDest(b.dest());
};
QuadEdge.splice = function (a, b) {
	var alpha = a.oNext().rot();
	var beta = b.oNext().rot();
	var t1 = b.oNext();
	var t2 = a.oNext();
	var t3 = beta.oNext();
	var t4 = alpha.oNext();
	a.setNext(t1);
	b.setNext(t2);
	alpha.setNext(t3);
	beta.setNext(t4);
};
QuadEdge.connect = function (a, b) {
	var e = QuadEdge.makeEdge(a.dest(), b.orig());
	QuadEdge.splice(e, a.lNext());
	QuadEdge.splice(e.sym(), b);
	return e;
};
