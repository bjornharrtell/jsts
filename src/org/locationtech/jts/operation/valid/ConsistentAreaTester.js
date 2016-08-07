import RelateNodeGraph from '../relate/RelateNodeGraph';
import extend from '../../../../../extend';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
export default function ConsistentAreaTester() {
	this.li = new RobustLineIntersector();
	this.geomGraph = null;
	this.nodeGraph = new RelateNodeGraph();
	this.invalidPoint = null;
	let geomGraph = arguments[0];
	this.geomGraph = geomGraph;
}
extend(ConsistentAreaTester.prototype, {
	isNodeEdgeAreaLabelsConsistent: function () {
		for (var nodeIt = this.nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			if (!node.getEdges().isAreaLabelsConsistent(this.geomGraph)) {
				this.invalidPoint = node.getCoordinate().copy();
				return false;
			}
		}
		return true;
	},
	getInvalidPoint: function () {
		return this.invalidPoint;
	},
	hasDuplicateRings: function () {
		for (var nodeIt = this.nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			for (var i = node.getEdges().iterator(); i.hasNext(); ) {
				var eeb = i.next();
				if (eeb.getEdgeEnds().size() > 1) {
					this.invalidPoint = eeb.getEdge().getCoordinate(0);
					return true;
				}
			}
		}
		return false;
	},
	isNodeConsistentArea: function () {
		var intersector = this.geomGraph.computeSelfNodes(this.li, true, true);
		if (intersector.hasProperIntersection()) {
			this.invalidPoint = intersector.getProperIntersectionPoint();
			return false;
		}
		this.nodeGraph.build(this.geomGraph);
		return this.isNodeEdgeAreaLabelsConsistent();
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ConsistentAreaTester;
	}
});
