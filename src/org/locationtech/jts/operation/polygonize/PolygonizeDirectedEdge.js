import DirectedEdge from '../../planargraph/DirectedEdge';
export default class PolygonizeDirectedEdge extends DirectedEdge {
	constructor() {
		super();
		PolygonizeDirectedEdge.constructor_.apply(this, arguments);
	}
	getNext() {
		return this._next;
	}
	isInRing() {
		return this._edgeRing !== null;
	}
	setRing(edgeRing) {
		this._edgeRing = edgeRing;
	}
	setLabel(label) {
		this._label = label;
	}
	getLabel() {
		return this._label;
	}
	setNext(next) {
		this._next = next;
	}
	getRing() {
		return this._edgeRing;
	}
	getClass() {
		return PolygonizeDirectedEdge;
	}
	get interfaces_() {
		return [];
	}
}
PolygonizeDirectedEdge.constructor_ = function () {
	this._edgeRing = null;
	this._next = null;
	this._label = -1;
	let from = arguments[0], to = arguments[1], directionPt = arguments[2], edgeDirection = arguments[3];
	DirectedEdge.constructor_.call(this, from, to, directionPt, edgeDirection);
};
