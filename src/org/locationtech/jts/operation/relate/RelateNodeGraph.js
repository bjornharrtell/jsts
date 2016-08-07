import Location from '../../geom/Location';
import EdgeEndBuilder from './EdgeEndBuilder';
import extend from '../../../../../extend';
import NodeMap from '../../geomgraph/NodeMap';
import RelateNodeFactory from './RelateNodeFactory';
export default function RelateNodeGraph() {
	this.nodes = new NodeMap(new RelateNodeFactory());
}
extend(RelateNodeGraph.prototype, {
	insertEdgeEnds: function (ee) {
		for (var i = ee.iterator(); i.hasNext(); ) {
			var e = i.next();
			this.nodes.add(e);
		}
	},
	getNodeIterator: function () {
		return this.nodes.iterator();
	},
	copyNodesAndLabels: function (geomGraph, argIndex) {
		for (var nodeIt = geomGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var graphNode = nodeIt.next();
			var newNode = this.nodes.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	},
	build: function (geomGraph) {
		this.computeIntersectionNodes(geomGraph, 0);
		this.copyNodesAndLabels(geomGraph, 0);
		var eeBuilder = new EdgeEndBuilder();
		var eeList = eeBuilder.computeEdgeEnds(geomGraph.getEdgeIterator());
		this.insertEdgeEnds(eeList);
	},
	computeIntersectionNodes: function (geomGraph, argIndex) {
		for (var edgeIt = geomGraph.getEdgeIterator(); edgeIt.hasNext(); ) {
			var e = edgeIt.next();
			var eLoc = e.getLabel().getLocation(argIndex);
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				var n = this.nodes.addNode(ei.coord);
				if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else {
					if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR);
				}
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return RelateNodeGraph;
	}
});
