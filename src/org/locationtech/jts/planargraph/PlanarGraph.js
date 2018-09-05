import HashSet from '../../../../java/util/HashSet';
import Node from './Node';
import NodeMap from './NodeMap';
import DirectedEdge from './DirectedEdge';
import ArrayList from '../../../../java/util/ArrayList';
import Edge from './Edge';
export default class PlanarGraph {
	constructor() {
		PlanarGraph.constructor_.apply(this, arguments);
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
		return this._dirEdges.iterator();
	}
	edgeIterator() {
		return this._edges.iterator();
	}
	remove() {
		if (arguments[0] instanceof Edge) {
			let edge = arguments[0];
			this.remove(edge.getDirEdge(0));
			this.remove(edge.getDirEdge(1));
			this._edges.remove(edge);
			edge.remove();
		} else if (arguments[0] instanceof DirectedEdge) {
			let de = arguments[0];
			var sym = de.getSym();
			if (sym !== null) sym.setSym(null);
			de.getFromNode().remove(de);
			de.remove();
			this._dirEdges.remove(de);
		} else if (arguments[0] instanceof Node) {
			let node = arguments[0];
			var outEdges = node.getOutEdges().getEdges();
			for (var i = outEdges.iterator(); i.hasNext(); ) {
				var de = i.next();
				var sym = de.getSym();
				if (sym !== null) this.remove(sym);
				this._dirEdges.remove(de);
				var edge = de.getEdge();
				if (edge !== null) {
					this._edges.remove(edge);
				}
			}
			this._nodeMap.remove(node.getCoordinate());
			node.remove();
		}
	}
	findNode(pt) {
		return this._nodeMap.find(pt);
	}
	getEdges() {
		return this._edges;
	}
	nodeIterator() {
		return this._nodeMap.iterator();
	}
	contains() {
		if (arguments[0] instanceof Edge) {
			let e = arguments[0];
			return this._edges.contains(e);
		} else if (arguments[0] instanceof DirectedEdge) {
			let de = arguments[0];
			return this._dirEdges.contains(de);
		}
	}
	add() {
		if (arguments[0] instanceof Node) {
			let node = arguments[0];
			this._nodeMap.add(node);
		} else if (arguments[0] instanceof Edge) {
			let edge = arguments[0];
			this._edges.add(edge);
			this.add(edge.getDirEdge(0));
			this.add(edge.getDirEdge(1));
		} else if (arguments[0] instanceof DirectedEdge) {
			let dirEdge = arguments[0];
			this._dirEdges.add(dirEdge);
		}
	}
	getNodes() {
		return this._nodeMap.values();
	}
	getClass() {
		return PlanarGraph;
	}
	get interfaces_() {
		return [];
	}
}
PlanarGraph.constructor_ = function () {
	this._edges = new HashSet();
	this._dirEdges = new HashSet();
	this._nodeMap = new NodeMap();
};
