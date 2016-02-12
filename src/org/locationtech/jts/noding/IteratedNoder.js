import Noder from './Noder';
import MCIndexNoder from './MCIndexNoder';
import TopologyException from '../geom/TopologyException';
import RobustLineIntersector from '../algorithm/RobustLineIntersector';
import IntersectionAdder from './IntersectionAdder';
export default class IteratedNoder {
	constructor(...args) {
		this.pm = null;
		this.li = null;
		this.nodedSegStrings = null;
		this.maxIter = IteratedNoder.MAX_ITER;
		switch (args.length) {
			case 1:
				{
					let [pm] = args;
					this.li = new RobustLineIntersector();
					this.pm = pm;
					this.li.setPrecisionModel(pm);
					break;
				}
		}
	}
	get interfaces_() {
		return [Noder];
	}
	setMaximumIterations(maxIter) {
		this.maxIter = maxIter;
	}
	node(segStrings, numInteriorIntersections) {
		var si = new IntersectionAdder(this.li);
		var noder = new MCIndexNoder();
		noder.setSegmentIntersector(si);
		noder.computeNodes(segStrings);
		this.nodedSegStrings = noder.getNodedSubstrings();
		numInteriorIntersections[0] = si.numInteriorIntersections;
	}
	computeNodes(segStrings) {
		var numInteriorIntersections = new Array(1);
		this.nodedSegStrings = segStrings;
		var nodingIterationCount = 0;
		var lastNodesCreated = -1;
		do {
			this.node(this.nodedSegStrings, numInteriorIntersections);
			nodingIterationCount++;
			var nodesCreated = numInteriorIntersections[0];
			if (lastNodesCreated > 0 && nodesCreated >= lastNodesCreated && nodingIterationCount > this.maxIter) {
				throw new TopologyException("Iterated noding failed to converge after " + nodingIterationCount + " iterations");
			}
			lastNodesCreated = nodesCreated;
		} while (lastNodesCreated > 0);
	}
	getNodedSubstrings() {
		return this.nodedSegStrings;
	}
	getClass() {
		return IteratedNoder;
	}
}
IteratedNoder.MAX_ITER = 5;

