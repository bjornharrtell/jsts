import MarkHalfEdge from '../edgegraph/MarkHalfEdge';
export default class DissolveHalfEdge extends MarkHalfEdge {
	constructor() {
		super();
		DissolveHalfEdge.constructor_.apply(this, arguments);
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
	get interfaces_() {
		return [];
	}
}
DissolveHalfEdge.constructor_ = function () {
	this._isStart = false;
	let orig = arguments[0];
	MarkHalfEdge.constructor_.call(this, orig);
};
