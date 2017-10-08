import RelateNodeGraph from '../relate/RelateNodeGraph';
import extend from '../../../../../extend';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
export default function ConsistentAreaTester() {
	this._li = new RobustLineIntersector();
	this._geomGraph = null;
	this._nodeGraph = new RelateNodeGraph();
	this._invalidPoint = null;
	let geomGraph = arguments[0];
	this._geomGraph = geomGraph;
}
extend(ConsistentAreaTester.prototype, {
	isNodeEdgeAreaLabelsConsistent: function () {
		for (var nodeIt = this._nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			if (!node.getEdges().isAreaLabelsConsistent(this._geomGraph)) {
				this._invalidPoint = node.getCoordinate().copy();
				return false;
			}
		}
		return true;
	},
	getInvalidPoint: function () {
		return this._invalidPoint;
	},
	hasDuplicateRings: function () {
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
	},
	isNodeConsistentArea: function () {
		var intersector = this._geomGraph.computeSelfNodes(this._li, true, true);
		if (intersector.hasProperIntersection()) {
			this._invalidPoint = intersector.getProperIntersectionPoint();
			return false;
		}
		this._nodeGraph.build(this._geomGraph);
		return this.isNodeEdgeAreaLabelsConsistent();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConsistentAreaTester;
	}
});
