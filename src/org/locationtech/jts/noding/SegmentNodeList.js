import CoordinateList from '../geom/CoordinateList';
import SegmentNode from './SegmentNode';
import Iterator from '../../../../java/util/Iterator';
import Coordinate from '../geom/Coordinate';
import NodedSegmentString from './NodedSegmentString';
import extend from '../../../../extend';
import Integer from '../../../../java/lang/Integer';
import ArrayList from '../../../../java/util/ArrayList';
import RuntimeException from '../../../../java/lang/RuntimeException';
import Assert from '../util/Assert';
import TreeMap from '../../../../java/util/TreeMap';
export default function SegmentNodeList() {
	this._nodeMap = new TreeMap();
	this._edge = null;
	let edge = arguments[0];
	this._edge = edge;
}
extend(SegmentNodeList.prototype, {
	getSplitCoordinates: function () {
		var coordList = new CoordinateList();
		this.addEndpoints();
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			this.addEdgeCoordinates(eiPrev, ei, coordList);
			eiPrev = ei;
		}
		return coordList.toCoordinateArray();
	},
	addCollapsedNodes: function () {
		var collapsedVertexIndexes = new ArrayList();
		this.findCollapsesFromInsertedNodes(collapsedVertexIndexes);
		this.findCollapsesFromExistingVertices(collapsedVertexIndexes);
		for (var it = collapsedVertexIndexes.iterator(); it.hasNext(); ) {
			var vertexIndex = it.next().intValue();
			this.add(this._edge.getCoordinate(vertexIndex), vertexIndex);
		}
	},
	print: function (out) {
		out.println("Intersections:");
		for (var it = this.iterator(); it.hasNext(); ) {
			var ei = it.next();
			ei.print(out);
		}
	},
	findCollapsesFromExistingVertices: function (collapsedVertexIndexes) {
		for (var i = 0; i < this._edge.size() - 2; i++) {
			var p0 = this._edge.getCoordinate(i);
			var p1 = this._edge.getCoordinate(i + 1);
			var p2 = this._edge.getCoordinate(i + 2);
			if (p0.equals2D(p2)) {
				collapsedVertexIndexes.add(new Integer(i + 1));
			}
		}
	},
	addEdgeCoordinates: function (ei0, ei1, coordList) {
		var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
		var lastSegStartPt = this._edge.getCoordinate(ei1.segmentIndex);
		var useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
		if (!useIntPt1) {
			npts--;
		}
		var ipt = 0;
		coordList.add(new Coordinate(ei0.coord), false);
		for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
			coordList.add(this._edge.getCoordinate(i));
		}
		if (useIntPt1) {
			coordList.add(new Coordinate(ei1.coord));
		}
	},
	iterator: function () {
		return this._nodeMap.values().iterator();
	},
	addSplitEdges: function (edgeList) {
		this.addEndpoints();
		this.addCollapsedNodes();
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			var newEdge = this.createSplitEdge(eiPrev, ei);
			edgeList.add(newEdge);
			eiPrev = ei;
		}
	},
	findCollapseIndex: function (ei0, ei1, collapsedVertexIndex) {
		if (!ei0.coord.equals2D(ei1.coord)) return false;
		var numVerticesBetween = ei1.segmentIndex - ei0.segmentIndex;
		if (!ei1.isInterior()) {
			numVerticesBetween--;
		}
		if (numVerticesBetween === 1) {
			collapsedVertexIndex[0] = ei0.segmentIndex + 1;
			return true;
		}
		return false;
	},
	findCollapsesFromInsertedNodes: function (collapsedVertexIndexes) {
		var collapsedVertexIndex = new Array(1).fill(null);
		var it = this.iterator();
		var eiPrev = it.next();
		while (it.hasNext()) {
			var ei = it.next();
			var isCollapsed = this.findCollapseIndex(eiPrev, ei, collapsedVertexIndex);
			if (isCollapsed) collapsedVertexIndexes.add(new Integer(collapsedVertexIndex[0]));
			eiPrev = ei;
		}
	},
	getEdge: function () {
		return this._edge;
	},
	addEndpoints: function () {
		var maxSegIndex = this._edge.size() - 1;
		this.add(this._edge.getCoordinate(0), 0);
		this.add(this._edge.getCoordinate(maxSegIndex), maxSegIndex);
	},
	createSplitEdge: function (ei0, ei1) {
		var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
		var lastSegStartPt = this._edge.getCoordinate(ei1.segmentIndex);
		var useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
		if (!useIntPt1) {
			npts--;
		}
		var pts = new Array(npts).fill(null);
		var ipt = 0;
		pts[ipt++] = new Coordinate(ei0.coord);
		for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
			pts[ipt++] = this._edge.getCoordinate(i);
		}
		if (useIntPt1) pts[ipt] = new Coordinate(ei1.coord);
		return new NodedSegmentString(pts, this._edge.getData());
	},
	add: function (intPt, segmentIndex) {
		var eiNew = new SegmentNode(this._edge, intPt, segmentIndex, this._edge.getSegmentOctant(segmentIndex));
		var ei = this._nodeMap.get(eiNew);
		if (ei !== null) {
			Assert.isTrue(ei.coord.equals2D(intPt), "Found equal nodes with different coordinates");
			return ei;
		}
		this._nodeMap.put(eiNew, eiNew);
		return eiNew;
	},
	checkSplitEdgesCorrectness: function (splitEdges) {
		var edgePts = this._edge.getCoordinates();
		var split0 = splitEdges.get(0);
		var pt0 = split0.getCoordinate(0);
		if (!pt0.equals2D(edgePts[0])) throw new RuntimeException("bad split edge start point at " + pt0);
		var splitn = splitEdges.get(splitEdges.size() - 1);
		var splitnPts = splitn.getCoordinates();
		var ptn = splitnPts[splitnPts.length - 1];
		if (!ptn.equals2D(edgePts[edgePts.length - 1])) throw new RuntimeException("bad split edge end point at " + ptn);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentNodeList;
	}
});
function NodeVertexIterator() {
	this._nodeList = null;
	this._edge = null;
	this._nodeIt = null;
	this._currNode = null;
	this._nextNode = null;
	this._currSegIndex = 0;
	let nodeList = arguments[0];
	this._nodeList = nodeList;
	this._edge = nodeList.getEdge();
	this._nodeIt = nodeList.iterator();
	this.readNextNode();
}
extend(NodeVertexIterator.prototype, {
	next: function () {
		if (this._currNode === null) {
			this._currNode = this._nextNode;
			this._currSegIndex = this._currNode.segmentIndex;
			this.readNextNode();
			return this._currNode;
		}
		if (this._nextNode === null) return null;
		if (this._nextNode.segmentIndex === this._currNode.segmentIndex) {
			this._currNode = this._nextNode;
			this._currSegIndex = this._currNode.segmentIndex;
			this.readNextNode();
			return this._currNode;
		}
		if (this._nextNode.segmentIndex > this._currNode.segmentIndex) {}
		return null;
	},
	remove: function () {
		throw new UnsupportedOperationException(this.getClass().getName());
	},
	hasNext: function () {
		if (this._nextNode === null) return false;
		return true;
	},
	readNextNode: function () {
		if (this._nodeIt.hasNext()) this._nextNode = this._nodeIt.next(); else this._nextNode = null;
	},
	interfaces_: function () {
		return [Iterator];
	},
	getClass: function () {
		return NodeVertexIterator;
	}
});
