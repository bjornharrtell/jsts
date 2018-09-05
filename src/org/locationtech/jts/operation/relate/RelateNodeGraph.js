import Location from '../../geom/Location';
import EdgeEndBuilder from './EdgeEndBuilder';
import NodeMap from '../../geomgraph/NodeMap';
import RelateNodeFactory from './RelateNodeFactory';
export default class RelateNodeGraph {
	constructor() {
		RelateNodeGraph.constructor_.apply(this, arguments);
	}
	insertEdgeEnds(ee) {
		for (var i = ee.iterator(); i.hasNext(); ) {
			var e = i.next();
			this._nodes.add(e);
		}
	}
	getNodeIterator() {
		return this._nodes.iterator();
	}
	copyNodesAndLabels(geomGraph, argIndex) {
		for (var nodeIt = geomGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var graphNode = nodeIt.next();
			var newNode = this._nodes.addNode(graphNode.getCoordinate());
			newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
		}
	}
	build(geomGraph) {
		this.computeIntersectionNodes(geomGraph, 0);
		this.copyNodesAndLabels(geomGraph, 0);
		var eeBuilder = new EdgeEndBuilder();
		var eeList = eeBuilder.computeEdgeEnds(geomGraph.getEdgeIterator());
		this.insertEdgeEnds(eeList);
	}
	computeIntersectionNodes(geomGraph, argIndex) {
		for (var edgeIt = geomGraph.getEdgeIterator(); edgeIt.hasNext(); ) {
			var e = edgeIt.next();
			var eLoc = e.getLabel().getLocation(argIndex);
			for (var eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
				var ei = eiIt.next();
				var n = this._nodes.addNode(ei.coord);
				if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else {
					if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR);
				}
			}
		}
	}
	getClass() {
		return RelateNodeGraph;
	}
	get interfaces_() {
		return [];
	}
}
RelateNodeGraph.constructor_ = function () {
	this._nodes = new NodeMap(new RelateNodeFactory());
};
