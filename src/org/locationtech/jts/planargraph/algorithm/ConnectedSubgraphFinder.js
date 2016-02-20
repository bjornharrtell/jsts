import Stack from '../../../../../java/util/Stack';
import Subgraph from '../Subgraph';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import GraphComponent from '../GraphComponent';
export default function ConnectedSubgraphFinder() {
	this.graph = null;
	let graph = arguments[0];
	this.graph = graph;
}
extend(ConnectedSubgraphFinder.prototype, {
	addReachable: function (startNode, subgraph) {
		var nodeStack = new Stack();
		nodeStack.add(startNode);
		while (!nodeStack.empty()) {
			var node = nodeStack.pop();
			this.addEdges(node, nodeStack, subgraph);
		}
	},
	findSubgraph: function (node) {
		var subgraph = new Subgraph(this.graph);
		this.addReachable(node, subgraph);
		return subgraph;
	},
	getConnectedSubgraphs: function () {
		var subgraphs = new ArrayList();
		GraphComponent.setVisited(this.graph.nodeIterator(), false);
		for (var i = this.graph.edgeIterator(); i.hasNext(); ) {
			var e = i.next();
			var node = e.getDirEdge(0).getFromNode();
			if (!node.isVisited()) {
				subgraphs.add(this.findSubgraph(node));
			}
		}
		return subgraphs;
	},
	addEdges: function (node, nodeStack, subgraph) {
		node.setVisited(true);
		for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			subgraph.add(de.getEdge());
			var toNode = de.getToNode();
			if (!toNode.isVisited()) nodeStack.push(toNode);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConnectedSubgraphFinder;
	}
});

