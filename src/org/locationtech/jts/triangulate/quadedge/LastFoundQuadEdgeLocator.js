import QuadEdgeLocator from './QuadEdgeLocator';
export default class LastFoundQuadEdgeLocator {
	constructor(...args) {
		this.subdiv = null;
		this.lastEdge = null;
		if (args.length === 1) {
			let [subdiv] = args;
			this.subdiv = subdiv;
			this.init();
		}
	}
	get interfaces_() {
		return [QuadEdgeLocator];
	}
	init() {
		this.lastEdge = this.findEdge();
	}
	locate(v) {
		if (!this.lastEdge.isLive()) {
			this.init();
		}
		var e = this.subdiv.locateFromEdge(v, this.lastEdge);
		this.lastEdge = e;
		return e;
	}
	findEdge() {
		var edges = this.subdiv.getEdges();
		return edges.iterator().next();
	}
	getClass() {
		return LastFoundQuadEdgeLocator;
	}
}

