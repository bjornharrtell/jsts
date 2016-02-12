import MarkHalfEdge from '../edgegraph/MarkHalfEdge';
export default class DissolveHalfEdge extends MarkHalfEdge {
	constructor(...args) {
		super();
		this._isStart = false;
		if (args.length === 1) {
			let [orig] = args;
			super(orig);
		}
	}
	get interfaces_() {
		return [];
	}
	setStart() {
		this._isStart = true;
	}
	isStart() {
		return this._isStart;
	}
	getClass() {
		return DissolveHalfEdge;
	}
}

