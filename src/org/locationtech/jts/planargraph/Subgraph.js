import HashSet from '../../../../java/util/HashSet';
import extend from '../../../../extend';
import NodeMap from './NodeMap';
import ArrayList from '../../../../java/util/ArrayList';
export default function Subgraph() {
	this._parentGraph = null;
	this._edges = new HashSet();
	this._dirEdges = new ArrayList();
	this._nodeMap = new NodeMap();
	let parentGraph = arguments[0];
	this._parentGraph = parentGraph;
}
extend(Subgraph.prototype, {
	dirEdgeIterator: function () {
		return this._dirEdges.iterator();
	},
	edgeIterator: function () {
		return this._edges.iterator();
	},
	getParent: function () {
		return this._parentGraph;
	},
	nodeIterator: function () {
		return this._nodeMap.iterator();
	},
	contains: function (e) {
		return this._edges.contains(e);
	},
	add: function (e) {
		if (this._edges.contains(e)) return null;
		this._edges.add(e);
		this._dirEdges.add(e.getDirEdge(0));
		this._dirEdges.add(e.getDirEdge(1));
		this._nodeMap.add(e.getDirEdge(0).getFromNode());
		this._nodeMap.add(e.getDirEdge(1).getFromNode());
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return Subgraph;
	}
});
