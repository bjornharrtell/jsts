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
		if (args.length === 0) {
			let [] = args;
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
		if (args.length === 1) {
			if (args[0] instanceof Edge) {
				let [edge] = args;
				this.remove(edge.getDirEdge(0));
				this.remove(edge.getDirEdge(1));
				this.edges.remove(edge);
				edge.remove();
			} else if (args[0] instanceof DirectedEdge) {
				let [de] = args;
				var sym = de.getSym();
				if (sym !== null) sym.setSym(null);
				de.getFromNode().remove(de);
				de.remove();
				this.dirEdges.remove(de);
			} else if (args[0] instanceof Node) {
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
		if (args.length === 1) {
			if (args[0] instanceof Edge) {
				let [e] = args;
				return this.edges.contains(e);
			} else if (args[0] instanceof DirectedEdge) {
				let [de] = args;
				return this.dirEdges.contains(de);
			}
		}
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof Node) {
				let [node] = args;
				this.nodeMap.add(node);
			} else if (args[0] instanceof Edge) {
				let [edge] = args;
				this.edges.add(edge);
				this.add(edge.getDirEdge(0));
				this.add(edge.getDirEdge(1));
			} else if (args[0] instanceof DirectedEdge) {
				let [dirEdge] = args;
				this.dirEdges.add(dirEdge);
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

