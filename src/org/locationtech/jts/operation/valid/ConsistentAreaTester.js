import RelateNodeGraph from '../relate/RelateNodeGraph';
import RobustLineIntersector from '../../algorithm/RobustLineIntersector';
export default class ConsistentAreaTester {
	constructor(...args) {
		this.li = new RobustLineIntersector();
		this.geomGraph = null;
		this.nodeGraph = new RelateNodeGraph();
		this.invalidPoint = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geomGraph] = args;
						this.geomGraph = geomGraph;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	isNodeEdgeAreaLabelsConsistent() {
		for (var nodeIt = this.nodeGraph.getNodeIterator(); nodeIt.hasNext(); ) {
			var node = nodeIt.next();
			if (!node.getEdges().isAreaLabelsConsistent(this.geomGraph)) {
				this.invalidPoint = node.getCoordinate().copy();
				return false;
			}
		}
		return true;
	}
	getInvalidPoint() {
		return this.invalidPoint;
	}
	hasDuplicateRings() {
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
	}
	isNodeConsistentArea() {
		var intersector = this.geomGraph.computeSelfNodes(this.li, true, true);
		if (intersector.hasProperIntersection()) {
			this.invalidPoint = intersector.getProperIntersectionPoint();
			return false;
		}
		this.nodeGraph.build(this.geomGraph);
		return this.isNodeEdgeAreaLabelsConsistent();
	}
	getClass() {
		return ConsistentAreaTester;
	}
}

