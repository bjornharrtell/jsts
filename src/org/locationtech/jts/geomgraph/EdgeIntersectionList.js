import EdgeIntersection from './EdgeIntersection';
import Coordinate from '../geom/Coordinate';
import Label from './Label';
import Edge from './Edge';
import TreeMap from '../../../../java/util/TreeMap';
export default class EdgeIntersectionList {
	constructor() {
		EdgeIntersectionList.constructor_.apply(this, arguments);
	}
	print(out) {
		out.println("Intersections:");
		for (var it = this.iterator(); it.hasNext(); ) {
			var ei = it.next();
			ei.print(out);
		}
	}
	iterator() {
		return this._nodeMap.values().iterator();
	}
	addSplitEdges(edgeList) {
		this.addEndpoints();
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			var newEdge = this.createSplitEdge(eiPrev, ei);
			edgeList.add(newEdge);
			eiPrev = ei;
		}
	}
	addEndpoints() {
		var maxSegIndex = this.edge.pts.length - 1;
		this.add(this.edge.pts[0], 0, 0.0);
		this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
	}
	createSplitEdge(ei0, ei1) {
		var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
		var lastSegStartPt = this.edge.pts[ei1.segmentIndex];
		var useIntPt1 = ei1.dist > 0.0 || !ei1.coord.equals2D(lastSegStartPt);
		if (!useIntPt1) {
			npts--;
		}
		var pts = new Array(npts).fill(null);
		var ipt = 0;
		pts[ipt++] = new Coordinate(ei0.coord);
		for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
			pts[ipt++] = this.edge.pts[i];
		}
		if (useIntPt1) pts[ipt] = ei1.coord;
		return new Edge(pts, new Label(this.edge._label));
	}
	add(intPt, segmentIndex, dist) {
		var eiNew = new EdgeIntersection(intPt, segmentIndex, dist);
		var ei = this._nodeMap.get(eiNew);
		if (ei !== null) {
			return ei;
		}
		this._nodeMap.put(eiNew, eiNew);
		return eiNew;
	}
	isIntersection(pt) {
		for (var it = this.iterator(); it.hasNext(); ) {
			var ei = it.next();
			if (ei.coord.equals(pt)) return true;
		}
		return false;
	}
	getClass() {
		return EdgeIntersectionList;
	}
	get interfaces_() {
		return [];
	}
}
EdgeIntersectionList.constructor_ = function () {
	this._nodeMap = new TreeMap();
	this.edge = null;
	let edge = arguments[0];
	this.edge = edge;
};
