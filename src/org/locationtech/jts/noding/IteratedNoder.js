import Noder from './Noder';
import MCIndexNoder from './MCIndexNoder';
import TopologyException from '../geom/TopologyException';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import IntersectionAdder from './IntersectionAdder';
export default class IteratedNoder {
	constructor() {
		IteratedNoder.constructor_.apply(this, arguments);
	}
	setMaximumIterations(maxIter) {
		this._maxIter = maxIter;
	}
	node(segStrings, numInteriorIntersections) {
		var si = new IntersectionAdder(this._li);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(si);
		noder.computeNodes(segStrings);
		this._nodedSegStrings = noder.getNodedSubstrings();
		numInteriorIntersections[0] = si.numInteriorIntersections;
	}
	computeNodes(segStrings) {
		var numInteriorIntersections = new Array(1).fill(null);
		this._nodedSegStrings = segStrings;
		var nodingIterationCount = 0;
		var lastNodesCreated = -1;
		do {
			this.node(this._nodedSegStrings, numInteriorIntersections);
			nodingIterationCount++;
			var nodesCreated = numInteriorIntersections[0];
			if (lastNodesCreated > 0 && nodesCreated >= lastNodesCreated && nodingIterationCount > this._maxIter) {
				throw new TopologyException("Iterated noding failed to converge after " + nodingIterationCount + " iterations");
			}
			lastNodesCreated = nodesCreated;
		} while (lastNodesCreated > 0);
	}
	getNodedSubstrings() {
		return this._nodedSegStrings;
	}
	getClass() {
		return IteratedNoder;
	}
	get interfaces_() {
		return [Noder];
	}
}
IteratedNoder.constructor_ = function () {
	this._pm = null;
	this._li = null;
	this._nodedSegStrings = null;
	this._maxIter = IteratedNoder.MAX_ITER;
	let pm = arguments[0];
	this._li = new RobustLineIntersector();
	this._pm = pm;
	this._li.setPrecisionModel(pm);
};
IteratedNoder.MAX_ITER = 5;
