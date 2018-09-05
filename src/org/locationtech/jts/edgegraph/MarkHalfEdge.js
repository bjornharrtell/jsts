import HalfEdge from './HalfEdge';
export default class MarkHalfEdge extends HalfEdge {
	constructor() {
		super();
		MarkHalfEdge.constructor_.apply(this, arguments);
	}
	static setMarkBoth(e, isMarked) {
		e.setMark(isMarked);
		e.sym().setMark(isMarked);
	}
	static isMarked(e) {
		return e.isMarked();
	}
	static setMark(e, isMarked) {
		e.setMark(isMarked);
	}
	static markBoth(e) {
		e.mark();
		e.sym().mark();
	}
	static mark(e) {
		e.mark();
	}
	mark() {
		this._isMarked = true;
	}
	setMark(isMarked) {
		this._isMarked = isMarked;
	}
	isMarked() {
		return this._isMarked;
	}
	getClass() {
		return MarkHalfEdge;
	}
	get interfaces_() {
		return [];
	}
}
MarkHalfEdge.constructor_ = function () {
	this._isMarked = false;
	let orig = arguments[0];
	HalfEdge.constructor_.call(this, orig);
};
