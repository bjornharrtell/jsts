import HashSet from '../../../../java/util/HashSet';
import Node from './Node';
import extend from '../../../../extend';
import NodeMap from './NodeMap';
import DirectedEdge from './DirectedEdge';
import ArrayList from '../../../../java/util/ArrayList';
import Edge from './Edge';
export default function PlanarGraph() {
	this.edges = new HashSet();
	this.dirEdges = new HashSet();
	this.nodeMap = new NodeMap();
}
extend(PlanarGraph.prototype, {
	findNodesOfDegree: function (degree) {
		var nodesFound = new ArrayList();
		for (var i = this.nodeIterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() === degree) nodesFound.add(node);
		}
		return nodesFound;
	},
	dirEdgeIterator: function () {
		return this.dirEdges.iterator();
	},
	edgeIterator: function () {
		return this.edges.iterator();
	},
	remove: function () {
		if (arguments[0] instanceof Edge) {
			let edge = arguments[0];
			this.remove(edge.getDirEdge(0));
			this.remove(edge.getDirEdge(1));
			this.edges.remove(edge);
			edge.remove();
		} else if (arguments[0] instanceof DirectedEdge) {
			let de = arguments[0];
			var sym = de.getSym();
			if (sym !== null) sym.setSym(null);
			de.getFromNode().remove(de);
			de.remove();
			this.dirEdges.remove(de);
		} else if (arguments[0] instanceof Node) {
			let node = arguments[0];
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
	},
	findNode: function (pt) {
		return this.nodeMap.find(pt);
	},
	getEdges: function () {
		return this.edges;
	},
	nodeIterator: function () {
		return this.nodeMap.iterator();
	},
	contains: function () {
		if (arguments[0] instanceof Edge) {
			let e = arguments[0];
			return this.edges.contains(e);
		} else if (arguments[0] instanceof DirectedEdge) {
			let de = arguments[0];
			return this.dirEdges.contains(de);
		}
	},
	add: function () {
		if (arguments[0] instanceof Node) {
			let node = arguments[0];
			this.nodeMap.add(node);
		} else if (arguments[0] instanceof Edge) {
			let edge = arguments[0];
			this.edges.add(edge);
			this.add(edge.getDirEdge(0));
			this.add(edge.getDirEdge(1));
		} else if (arguments[0] instanceof DirectedEdge) {
			let dirEdge = arguments[0];
			this.dirEdges.add(dirEdge);
		}
	},
	getNodes: function () {
		return this.nodeMap.values();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return PlanarGraph;
	}
});

