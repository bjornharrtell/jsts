import extend from '../../../../../extend';
import QuadEdgeLocator from './QuadEdgeLocator';
export default function LastFoundQuadEdgeLocator() {
	this._subdiv = null;
	this._lastEdge = null;
	let subdiv = arguments[0];
	this._subdiv = subdiv;
	this.init();
}
extend(LastFoundQuadEdgeLocator.prototype, {
	init: function () {
		this._lastEdge = this.findEdge();
	},
	locate: function (v) {
		if (!this._lastEdge.isLive()) {
			this.init();
		}
		var e = this._subdiv.locateFromEdge(v, this._lastEdge);
		this._lastEdge = e;
		return e;
	},
	findEdge: function () {
		var edges = this._subdiv.getEdges();
		return edges.iterator().next();
	},
	interfaces_: function () {
		return [QuadEdgeLocator];
	},
	getClass: function () {
		return LastFoundQuadEdgeLocator;
	}
});
