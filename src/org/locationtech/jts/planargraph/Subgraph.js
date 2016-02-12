import HashSet from '../../../../java/util/HashSet';
import NodeMap from './NodeMap';
import ArrayList from '../../../../java/util/ArrayList';
export default class Subgraph {
	constructor(...args) {
		this.parentGraph = null;
		this.edges = new HashSet();
		this.dirEdges = new ArrayList();
		this.nodeMap = new NodeMap();
		switch (args.length) {
			case 1:
				{
					let [parentGraph] = args;
					this.parentGraph = parentGraph;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	dirEdgeIterator() {
		return this.dirEdges.iterator();
	}
	edgeIterator() {
		return this.edges.iterator();
	}
	getParent() {
		return this.parentGraph;
	}
	nodeIterator() {
		return this.nodeMap.iterator();
	}
	contains(e) {
		return this.edges.contains(e);
	}
	add(e) {
		if (this.edges.contains(e)) return null;
		this.edges.add(e);
		this.dirEdges.add(e.getDirEdge(0));
		this.dirEdges.add(e.getDirEdge(1));
		this.nodeMap.add(e.getDirEdge(0).getFromNode());
		this.nodeMap.add(e.getDirEdge(1).getFromNode());
	}
	getClass() {
		return Subgraph;
	}
}

