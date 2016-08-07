import SimpleMCSweepLineIntersector from '../../geomgraph/index/SimpleMCSweepLineIntersector';
import extend from '../../../../../extend';
import SegmentIntersector from '../../geomgraph/index/SegmentIntersector';
import ArrayList from '../../../../../java/util/ArrayList';
export default function EdgeSetNoder() {
	this.li = null;
	this.inputEdges = new ArrayList();
	let li = arguments[0];
	this.li = li;
}
extend(EdgeSetNoder.prototype, {
	addEdges: function (edges) {
		this.inputEdges.addAll(edges);
	},
	getNodedEdges: function () {
		var esi = new SimpleMCSweepLineIntersector();
		var si = new SegmentIntersector(this.li, true, false);
		esi.computeIntersections(this.inputEdges, si, true);
		var splitEdges = new ArrayList();
		for (var i = this.inputEdges.iterator(); i.hasNext(); ) {
			var e = i.next();
			e.getEdgeIntersectionList().addSplitEdges(splitEdges);
		}
		return splitEdges;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return EdgeSetNoder;
	}
});
