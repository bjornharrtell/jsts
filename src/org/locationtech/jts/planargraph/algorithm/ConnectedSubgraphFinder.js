import Stack from '../../../../../java/util/Stack';
import Subgraph from '../Subgraph';
import ArrayList from '../../../../../java/util/ArrayList';
import GraphComponent from '../GraphComponent';
export default class ConnectedSubgraphFinder {
	constructor() {
		ConnectedSubgraphFinder.constructor_.apply(this, arguments);
	}
	addReachable(startNode, subgraph) {
		var nodeStack = new Stack();
		nodeStack.add(startNode);
		while (!nodeStack.empty()) {
			var node = nodeStack.pop();
			this.addEdges(node, nodeStack, subgraph);
		}
	}
	findSubgraph(node) {
		var subgraph = new Subgraph(this._graph);
		this.addReachable(node, subgraph);
		return subgraph;
	}
	getConnectedSubgraphs() {
		var subgraphs = new ArrayList();
		GraphComponent.setVisited(this._graph.nodeIterator(), false);
		for (var i = this._graph.edgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var node = e.getDirEdge(0).getFromNode();
			if (!node.isVisited()) {
				subgraphs.add(this.findSubgraph(node));
			}
		}
		return subgraphs;
	}
	addEdges(node, nodeStack, subgraph) {
		node.setVisited(true);
		for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			subgraph.add(de.getEdge());
			var toNode = de.getToNode();
			if (!toNode.isVisited()) nodeStack.push(toNode);
		}
	}
	getClass() {
		return ConnectedSubgraphFinder;
	}
	get interfaces_() {
		return [];
	}
}
ConnectedSubgraphFinder.constructor_ = function () {
	this._graph = null;
	let graph = arguments[0];
	this._graph = graph;
};
