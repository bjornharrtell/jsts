import LineMergeDirectedEdge from './LineMergeDirectedEdge';
import Node from '../../planargraph/Node';
import extend from '../../../../../extend';
import CoordinateArrays from '../../geom/CoordinateArrays';
import LineMergeEdge from './LineMergeEdge';
import inherits from '../../../../../inherits';
import PlanarGraph from '../../planargraph/PlanarGraph';
export default function LineMergeGraph() {
	PlanarGraph.apply(this);
}
inherits(LineMergeGraph, PlanarGraph);
extend(LineMergeGraph.prototype, {
	addEdge: function (lineString) {
		if (lineString.isEmpty()) {
			return null;
		}
		var coordinates = CoordinateArrays.removeRepeatedPoints(lineString.getCoordinates());
		if (coordinates.length <= 1) return null;
		var startCoordinate = coordinates[0];
		var endCoordinate = coordinates[coordinates.length - 1];
		var startNode = this.getNode(startCoordinate);
		var endNode = this.getNode(endCoordinate);
		var directedEdge0 = new LineMergeDirectedEdge(startNode, endNode, coordinates[1], true);
		var directedEdge1 = new LineMergeDirectedEdge(endNode, startNode, coordinates[coordinates.length - 2], false);
		var edge = new LineMergeEdge(lineString);
		edge.setDirectedEdges(directedEdge0, directedEdge1);
		this.add(edge);
	},
	getNode: function (coordinate) {
		var node = this.findNode(coordinate);
		if (node === null) {
			node = new Node(coordinate);
			this.add(node);
		}
		return node;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineMergeGraph;
	}
});
