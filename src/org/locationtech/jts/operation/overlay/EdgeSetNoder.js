import SimpleMCSweepLineIntersector from '../../geomgraph/index/SimpleMCSweepLineIntersector';
import SegmentIntersector from '../../geomgraph/index/SegmentIntersector';
import ArrayList from '../../../../../java/util/ArrayList';
export default class EdgeSetNoder {
	constructor() {
		EdgeSetNoder.constructor_.apply(this, arguments);
	}
	addEdges(edges) {
		this._inputEdges.addAll(edges);
	}
	getNodedEdges() {
		var esi = new SimpleMCSweepLineIntersector();
		var si = new SegmentIntersector(this._li, true, false);
		esi.computeIntersections(this._inputEdges, si, true);
		var splitEdges = new ArrayList();
		for (var i = this._inputEdges.iterator(); i.hasNext(); ) {
			var e = i.next();
			e.getEdgeIntersectionList().addSplitEdges(splitEdges);
		}
		return splitEdges;
	}
	getClass() {
		return EdgeSetNoder;
	}
	get interfaces_() {
		return [];
	}
}
EdgeSetNoder.constructor_ = function () {
	this._li = null;
	this._inputEdges = new ArrayList();
	let li = arguments[0];
	this._li = li;
};
