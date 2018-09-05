import RelateNodeGraph from '../relate/RelateNodeGraph';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
export default class ConsistentAreaTester {
	constructor() {
		ConsistentAreaTester.constructor_.apply(this, arguments);
	}
	isNodeEdgeAreaLabelsConsistent() {
		for (var nodeIt = this._nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			if (!node.getEdges().isAreaLabelsConsistent(this._geomGraph)) {
				this._invalidPoint = node.getCoordinate().copy();
				return false;
			}
		}
		return true;
	}
	getInvalidPoint() {
		return this._invalidPoint;
	}
	hasDuplicateRings() {
		for (var nodeIt = this._nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			for (var i = node.getEdges().iterator(); i.hasNext(); ) {
				var eeb = i.next();
				if (eeb.getEdgeEnds().size() > 1) {
					this._invalidPoint = eeb.getEdge().getCoordinate(0);
					return true;
				}
			}
		}
		return false;
	}
	isNodeConsistentArea() {
		var intersector = this._geomGraph.computeSelfNodes(this._li, true, true);
		if (intersector.hasProperIntersection()) {
			this._invalidPoint = intersector.getProperIntersectionPoint();
			return false;
		}
		this._nodeGraph.build(this._geomGraph);
		return this.isNodeEdgeAreaLabelsConsistent();
	}
	getClass() {
		return ConsistentAreaTester;
	}
	get interfaces_() {
		return [];
	}
}
ConsistentAreaTester.constructor_ = function () {
	this._li = new RobustLineIntersector();
	this._geomGraph = null;
	this._nodeGraph = new RelateNodeGraph();
	this._invalidPoint = null;
	let geomGraph = arguments[0];
	this._geomGraph = geomGraph;
};
