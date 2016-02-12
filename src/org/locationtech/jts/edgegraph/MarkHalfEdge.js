import HalfEdge from './HalfEdge';
export default class MarkHalfEdge extends HalfEdge {
	constructor(...args) {
		super();
		this._isMarked = false;
		switch (args.length) {
			case 1:
				{
					let [orig] = args;
					super(orig);
					break;
				}
		}
	}
	get interfaces_() {
		return [];
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
}

