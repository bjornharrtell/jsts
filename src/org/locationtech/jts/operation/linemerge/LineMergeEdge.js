import Edge from '../../planargraph/Edge';
export default class LineMergeEdge extends Edge {
	constructor() {
		super();
		LineMergeEdge.constructor_.apply(this, arguments);
	}
	getLine() {
		return this._line;
	}
	getClass() {
		return LineMergeEdge;
	}
	get interfaces_() {
		return [];
	}
}
LineMergeEdge.constructor_ = function () {
	this._line = null;
	let line = arguments[0];
	this._line = line;
};
