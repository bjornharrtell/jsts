import Edge from '../../planargraph/Edge';
export default class PolygonizeEdge extends Edge {
	constructor() {
		super();
		PolygonizeEdge.constructor_.apply(this, arguments);
	}
	getLine() {
		return this._line;
	}
	getClass() {
		return PolygonizeEdge;
	}
	get interfaces_() {
		return [];
	}
}
PolygonizeEdge.constructor_ = function () {
	this._line = null;
	let line = arguments[0];
	this._line = line;
};
