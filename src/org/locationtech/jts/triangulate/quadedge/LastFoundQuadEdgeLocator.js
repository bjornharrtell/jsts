import QuadEdgeLocator from './QuadEdgeLocator';
export default class LastFoundQuadEdgeLocator {
	constructor() {
		LastFoundQuadEdgeLocator.constructor_.apply(this, arguments);
	}
	init() {
		this._lastEdge = this.findEdge();
	}
	locate(v) {
		if (!this._lastEdge.isLive()) {
			this.init();
		}
		var e = this._subdiv.locateFromEdge(v, this._lastEdge);
		this._lastEdge = e;
		return e;
	}
	findEdge() {
		var edges = this._subdiv.getEdges();
		return edges.iterator().next();
	}
	getClass() {
		return LastFoundQuadEdgeLocator;
	}
	get interfaces_() {
		return [QuadEdgeLocator];
	}
}
LastFoundQuadEdgeLocator.constructor_ = function () {
	this._subdiv = null;
	this._lastEdge = null;
	let subdiv = arguments[0];
	this._subdiv = subdiv;
	this.init();
};
