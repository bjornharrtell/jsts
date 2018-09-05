import PolygonizeDirectedEdge from './PolygonizeDirectedEdge';
import HashSet from '../../../../../java/util/HashSet';
import Stack from '../../../../../java/util/Stack';
import Node from '../../planargraph/Node';
import PolygonizeEdge from './PolygonizeEdge';
import EdgeRing from './EdgeRing';
import CoordinateArrays from '../../geom/CoordinateArrays';
import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import PlanarGraph from '../../planargraph/PlanarGraph';
export default class PolygonizeGraph extends PlanarGraph {
	constructor() {
		super();
		PolygonizeGraph.constructor_.apply(this, arguments);
	}
	static findLabeledEdgeRings(dirEdges) {
		var edgeRingStarts = new ArrayList();
		var currLabel = 1;
		for (var i = dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isMarked()) continue;
			if (de.getLabel() >= 0) continue;
			edgeRingStarts.add(de);
			var edges = EdgeRing.findDirEdgesInRing(de);
			PolygonizeGraph.label(edges, currLabel);
			currLabel++;
		}
		return edgeRingStarts;
	}
	static getDegreeNonDeleted(node) {
		var edges = node.getOutEdges().getEdges();
		var degree = 0;
		for (var i = edges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (!de.isMarked()) degree++;
		}
		return degree;
	}
	static deleteAllEdges(node) {
		var edges = node.getOutEdges().getEdges();
		for (var i = edges.iterator(); i.hasNext(); ) {
			var de = i.next();
			de.setMarked(true);
			var sym = de.getSym();
			if (sym !== null) sym.setMarked(true);
		}
	}
	static label(dirEdges, label) {
		for (var i = dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			de.setLabel(label);
		}
	}
	static computeNextCWEdges(node) {
		var deStar = node.getOutEdges();
		var startDE = null;
		var prevDE = null;
		for (var i = deStar.getEdges().iterator(); i.hasNext(); ) {
			var outDE = i.next();
			if (outDE.isMarked()) continue;
			if (startDE === null) startDE = outDE;
			if (prevDE !== null) {
				var sym = prevDE.getSym();
				sym.setNext(outDE);
			}
			prevDE = outDE;
		}
		if (prevDE !== null) {
			var sym = prevDE.getSym();
			sym.setNext(startDE);
		}
	}
	static computeNextCCWEdges(node, label) {
		var deStar = node.getOutEdges();
		var firstOutDE = null;
		var prevInDE = null;
		var edges = deStar.getEdges();
		for (var i = edges.size() - 1; i >= 0; i--) {
			var de = edges.get(i);
			var sym = de.getSym();
			var outDE = null;
			if (de.getLabel() === label) outDE = de;
			var inDE = null;
			if (sym.getLabel() === label) inDE = sym;
			if (outDE === null && inDE === null) continue;
			if (inDE !== null) {
				prevInDE = inDE;
			}
			if (outDE !== null) {
				if (prevInDE !== null) {
					prevInDE.setNext(outDE);
					prevInDE = null;
				}
				if (firstOutDE === null) firstOutDE = outDE;
			}
		}
		if (prevInDE !== null) {
			Assert.isTrue(firstOutDE !== null);
			prevInDE.setNext(firstOutDE);
		}
	}
	static getDegree(node, label) {
		var edges = node.getOutEdges().getEdges();
		var degree = 0;
		for (var i = edges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.getLabel() === label) degree++;
		}
		return degree;
	}
	static findIntersectionNodes(startDE, label) {
		var de = startDE;
		var intNodes = null;
		do {
			var node = de.getFromNode();
			if (PolygonizeGraph.getDegree(node, label) > 1) {
				if (intNodes === null) intNodes = new ArrayList();
				intNodes.add(node);
			}
			de = de.getNext();
			Assert.isTrue(de !== null, "found null DE in ring");
			Assert.isTrue(de === startDE || !de.isInRing(), "found DE already in ring");
		} while (de !== startDE);
		return intNodes;
	}
	findEdgeRing(startDE) {
		var er = new EdgeRing(this._factory);
		er.build(startDE);
		return er;
	}
	computeDepthParity() {
		if (arguments.length === 0) {
			while (true) {
				var de = null;
				if (de === null) return null;
				this.computeDepthParity(de);
			}
		} else if (arguments.length === 1) {
			let de = arguments[0];
		}
	}
	computeNextCWEdges() {
		for (var iNode = this.nodeIterator(); iNode.hasNext(); ) {
			var node = iNode.next();
			PolygonizeGraph.computeNextCWEdges(node);
		}
	}
	addEdge(line) {
		if (line.isEmpty()) {
			return null;
		}
		var linePts = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
		if (linePts.length < 2) {
			return null;
		}
		var startPt = linePts[0];
		var endPt = linePts[linePts.length - 1];
		var nStart = this.getNode(startPt);
		var nEnd = this.getNode(endPt);
		var de0 = new PolygonizeDirectedEdge(nStart, nEnd, linePts[1], true);
		var de1 = new PolygonizeDirectedEdge(nEnd, nStart, linePts[linePts.length - 2], false);
		var edge = new PolygonizeEdge(line);
		edge.setDirectedEdges(de0, de1);
		this.add(edge);
	}
	deleteCutEdges() {
		this.computeNextCWEdges();
		PolygonizeGraph.findLabeledEdgeRings(this._dirEdges);
		var cutLines = new ArrayList();
		for (var i = this._dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isMarked()) continue;
			var sym = de.getSym();
			if (de.getLabel() === sym.getLabel()) {
				de.setMarked(true);
				sym.setMarked(true);
				var e = de.getEdge();
				cutLines.add(e.getLine());
			}
		}
		return cutLines;
	}
	getEdgeRings() {
		this.computeNextCWEdges();
		PolygonizeGraph.label(this._dirEdges, -1);
		var maximalRings = PolygonizeGraph.findLabeledEdgeRings(this._dirEdges);
		this.convertMaximalToMinimalEdgeRings(maximalRings);
		var edgeRingList = new ArrayList();
		for (var i = this._dirEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isMarked()) continue;
			if (de.isInRing()) continue;
			var er = this.findEdgeRing(de);
			edgeRingList.add(er);
		}
		return edgeRingList;
	}
	getNode(pt) {
		var node = this.findNode(pt);
		if (node === null) {
			node = new Node(pt);
			this.add(node);
		}
		return node;
	}
	convertMaximalToMinimalEdgeRings(ringEdges) {
		for (var i = ringEdges.iterator(); i.hasNext(); ) {
			var de = i.next();
			var label = de.getLabel();
			var intNodes = PolygonizeGraph.findIntersectionNodes(de, label);
			if (intNodes === null) continue;
			for (var iNode = intNodes.iterator(); iNode.hasNext(); ) {
				var node = iNode.next();
				PolygonizeGraph.computeNextCCWEdges(node, label);
			}
		}
	}
	deleteDangles() {
		var nodesToRemove = this.findNodesOfDegree(1);
		var dangleLines = new HashSet();
		var nodeStack = new Stack();
		for (var i = nodesToRemove.iterator(); i.hasNext(); ) {
			nodeStack.push(i.next());
		}
		while (!nodeStack.isEmpty()) {
			var node = nodeStack.pop();
			PolygonizeGraph.deleteAllEdges(node);
			var nodeOutEdges = node.getOutEdges().getEdges();
			for (var i = nodeOutEdges.iterator(); i.hasNext(); ) {
				var de = i.next();
				de.setMarked(true);
				var sym = de.getSym();
				if (sym !== null) sym.setMarked(true);
				var e = de.getEdge();
				dangleLines.add(e.getLine());
				var toNode = de.getToNode();
				if (PolygonizeGraph.getDegreeNonDeleted(toNode) === 1) nodeStack.push(toNode);
			}
		}
		return dangleLines;
	}
	getClass() {
		return PolygonizeGraph;
	}
	get interfaces_() {
		return [];
	}
}
PolygonizeGraph.constructor_ = function () {
	this._factory = null;
	let factory = arguments[0];
	this._factory = factory;
};
