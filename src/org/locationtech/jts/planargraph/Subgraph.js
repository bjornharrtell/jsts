import HashSet from '../../../../java/util/HashSet';
import extend from '../../../../extend';
import NodeMap from './NodeMap';
import ArrayList from '../../../../java/util/ArrayList';
export default function Subgraph() {
	this.parentGraph = null;
	this.edges = new HashSet();
	this.dirEdges = new ArrayList();
	this.nodeMap = new NodeMap();
	let parentGraph = arguments[0];
	this.parentGraph = parentGraph;
}
extend(Subgraph.prototype, {
	dirEdgeIterator: function () {
		return this.dirEdges.iterator();
	},
	edgeIterator: function () {
		return this.edges.iterator();
	},
	getParent: function () {
		return this.parentGraph;
	},
	nodeIterator: function () {
		return this.nodeMap.iterator();
	},
	contains: function (e) {
		return this.edges.contains(e);
	},
	add: function (e) {
		if (this.edges.contains(e)) return null;
		this.edges.add(e);
		this.dirEdges.add(e.getDirEdge(0));
		this.dirEdges.add(e.getDirEdge(1));
		this.nodeMap.add(e.getDirEdge(0).getFromNode());
		this.nodeMap.add(e.getDirEdge(1).getFromNode());
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Subgraph;
	}
});
