import LineMergeDirectedEdge from './LineMergeDirectedEdge';
import Node from '../../planargraph/Node';
import CoordinateArrays from '../../geom/CoordinateArrays';
import LineMergeEdge from './LineMergeEdge';
import PlanarGraph from '../../planargraph/PlanarGraph';
export default class LineMergeGraph extends PlanarGraph {
	constructor() {
		super();
		LineMergeGraph.constructor_.apply(this, arguments);
	}
	addEdge(lineString) {
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
	}
	getNode(coordinate) {
		var node = this.findNode(coordinate);
		if (node === null) {
			node = new Node(coordinate);
			this.add(node);
		}
		return node;
	}
	getClass() {
		return LineMergeGraph;
	}
	get interfaces_() {
		return [];
	}
}
LineMergeGraph.constructor_ = function () {};
