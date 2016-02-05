import DirectedEdgeStar from './DirectedEdgeStar';
import HashSet from '../../../../java/util/HashSet';
import DirectedEdge from './DirectedEdge';
import GraphComponent from './GraphComponent';
export default class Node extends GraphComponent {
	constructor(...args) {
		super();
		(() => {
			this.pt = null;
			this.deStar = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [pt] = args;
						overloads.call(this, pt, new DirectedEdgeStar());
					})(...args);
				case 2:
					return ((...args) => {
						let [pt, deStar] = args;
						this.pt = pt;
						this.deStar = deStar;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static getEdgesBetween(node0, node1) {
		var edges0 = DirectedEdge.toEdges(node0.getOutEdges().getEdges());
		var commonEdges = new HashSet(edges0);
		var edges1 = DirectedEdge.toEdges(node1.getOutEdges().getEdges());
		commonEdges.retainAll(edges1);
		return commonEdges;
	}
	isRemoved() {
		return this.pt === null;
	}
	addOutEdge(de) {
		this.deStar.add(de);
	}
	getCoordinate() {
		return this.pt;
	}
	getOutEdges() {
		return this.deStar;
	}
	remove(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
						this.pt = null;
					})(...args);
				case 1:
					return ((...args) => {
						let [de] = args;
						this.deStar.remove(de);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getIndex(edge) {
		return this.deStar.getIndex(edge);
	}
	getDegree() {
		return this.deStar.getDegree();
	}
	getClass() {
		return Node;
	}
}

