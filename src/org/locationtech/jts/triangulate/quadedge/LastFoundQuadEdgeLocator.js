import QuadEdgeLocator from './QuadEdgeLocator';
export default class LastFoundQuadEdgeLocator {
	constructor(...args) {
		(() => {
			this.subdiv = null;
			this.lastEdge = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [subdiv] = args;
						this.subdiv = subdiv;
						this.init();
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

