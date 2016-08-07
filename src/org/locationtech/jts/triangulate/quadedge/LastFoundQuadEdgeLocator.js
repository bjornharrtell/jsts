import extend from '../../../../../extend';
import QuadEdgeLocator from './QuadEdgeLocator';
export default function LastFoundQuadEdgeLocator() {
	this.subdiv = null;
	this.lastEdge = null;
	let subdiv = arguments[0];
	this.subdiv = subdiv;
	this.init();
}
extend(LastFoundQuadEdgeLocator.prototype, {
	init: function () {
		this.lastEdge = this.findEdge();
	},
	locate: function (v) {
		if (!this.lastEdge.isLive()) {
			this.init();
		}
		var e = this.subdiv.locateFromEdge(v, this.lastEdge);
		this.lastEdge = e;
		return e;
	},
	findEdge: function () {
		var edges = this.subdiv.getEdges();
		return edges.iterator().next();
	},
	interfaces_: function () {
		return [QuadEdgeLocator];
	},
	getClass: function () {
		return LastFoundQuadEdgeLocator;
	}
});
