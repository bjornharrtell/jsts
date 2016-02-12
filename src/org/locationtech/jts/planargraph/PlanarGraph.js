import HashSet from '../../../../java/util/HashSet';
import Node from './Node';
import NodeMap from './NodeMap';
import DirectedEdge from './DirectedEdge';
import ArrayList from '../../../../java/util/ArrayList';
import Edge from './Edge';
export default class PlanarGraph {
	constructor(...args) {
		this.edges = new HashSet();
		this.dirEdges = new HashSet();
		this.nodeMap = new NodeMap();
		switch (args.length) {
			case 0:
				return ((...args) => {
					let [] = args;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	findNodesOfDegree(degree) {
		var nodesFound = new ArrayList();
		for (var i = this.nodeIterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() === degree) nodesFound.add(node);
		}
		return nodesFound;
	}
	dirEdgeIterator() {
		return this.dirEdges.iterator();
	}
	edgeIterator() {
		return this.edges.iterator();
	}
	remove(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Edge) {
					return ((...args) => {
						let [edge] = args;
						this.remove(edge.getDirEdge(0));
						this.remove(edge.getDirEdge(1));
						this.edges.remove(edge);
						edge.remove();
					})(...args);
				} else if (args[0] instanceof DirectedEdge) {
					return ((...args) => {
						let [de] = args;
						var sym = de.getSym();
						if (sym !== null) sym.setSym(null);
						de.getFromNode().remove(de);
						de.remove();
						this.dirEdges.remove(de);
					})(...args);
				} else if (args[0] instanceof Node) {
					return ((...args) => {
						let [node] = args;
						var outEdges = node.getOutEdges().getEdges();
						for (var i = outEdges.iterator(); i.hasNext(); ) {
							var de = i.next();
							var sym = de.getSym();
							if (sym !== null) this.remove(sym);
							this.dirEdges.remove(de);
							var edge = de.getEdge();
							if (edge !== null) {
								this.edges.remove(edge);
							}
						}
						this.nodeMap.remove(node.getCoordinate());
						node.remove();
					})(...args);
				}
		}
	}
	findNode(pt) {
		return this.nodeMap.find(pt);
	}
	getEdges() {
		return this.edges;
	}
	nodeIterator() {
		return this.nodeMap.iterator();
	}
	contains(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Edge) {
					return ((...args) => {
						let [e] = args;
						return this.edges.contains(e);
					})(...args);
				} else if (args[0] instanceof DirectedEdge) {
					return ((...args) => {
						let [de] = args;
						return this.dirEdges.contains(de);
					})(...args);
				}
		}
	}
	add(...args) {
		switch (args.length) {
			case 1:
				if (args[0] instanceof Node) {
					return ((...args) => {
						let [node] = args;
						this.nodeMap.add(node);
					})(...args);
				} else if (args[0] instanceof Edge) {
					return ((...args) => {
						let [edge] = args;
						this.edges.add(edge);
						this.add(edge.getDirEdge(0));
						this.add(edge.getDirEdge(1));
					})(...args);
				} else if (args[0] instanceof DirectedEdge) {
					return ((...args) => {
						let [dirEdge] = args;
						this.dirEdges.add(dirEdge);
					})(...args);
				}
		}
	}
	getNodes() {
		return this.nodeMap.values();
	}
	getClass() {
		return PlanarGraph;
	}
}

