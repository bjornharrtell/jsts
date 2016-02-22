import TreeSet from '../../../../../java/util/TreeSet';
import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import hasInterface from '../../../../../hasInterface';
import GeometryFactory from '../../geom/GeometryFactory';
import Collection from '../../../../../java/util/Collection';
import Coordinate from '../../geom/Coordinate';
import extend from '../../../../../extend';
import Integer from '../../../../../java/lang/Integer';
import LineMergeGraph from './LineMergeGraph';
import LinkedList from '../../../../../java/util/LinkedList';
import GeometryComponentFilter from '../../geom/GeometryComponentFilter';
import ArrayList from '../../../../../java/util/ArrayList';
import ConnectedSubgraphFinder from '../../planargraph/algorithm/ConnectedSubgraphFinder';
import Assert from '../../util/Assert';
import MultiLineString from '../../geom/MultiLineString';
import GraphComponent from '../../planargraph/GraphComponent';
export default function LineSequencer() {
	this.graph = new LineMergeGraph();
	this.factory = new GeometryFactory();
	this.lineCount = 0;
	this.isRun = false;
	this.sequencedGeometry = null;
	this._isSequenceable = false;
}
extend(LineSequencer.prototype, {
	addLine: function (lineString) {
		if (this.factory === null) {
			this.factory = lineString.getFactory();
		}
		this.graph.addEdge(lineString);
		this.lineCount++;
	},
	hasSequence: function (graph) {
		var oddDegreeCount = 0;
		for (var i = graph.nodeIterator(); i.hasNext(); ) {
			var node = i.next();
			if (node.getDegree() % 2 === 1) oddDegreeCount++;
		}
		return oddDegreeCount <= 2;
	},
	computeSequence: function () {
		if (this.isRun) {
			return null;
		}
		this.isRun = true;
		var sequences = this.findSequences();
		if (sequences === null) return null;
		this.sequencedGeometry = this.buildSequencedGeometry(sequences);
		this._isSequenceable = true;
		var finalLineCount = this.sequencedGeometry.getNumGeometries();
		Assert.isTrue(this.lineCount === finalLineCount, "Lines were missing from result");
		Assert.isTrue(this.sequencedGeometry instanceof LineString || this.sequencedGeometry instanceof MultiLineString, "Result is not lineal");
	},
	findSequences: function () {
		var sequences = new ArrayList();
		var csFinder = new ConnectedSubgraphFinder(this.graph);
		var subgraphs = csFinder.getConnectedSubgraphs();
		for (var i = subgraphs.iterator(); i.hasNext(); ) {
			var subgraph = i.next();
			if (this.hasSequence(subgraph)) {
				var seq = this.findSequence(subgraph);
				sequences.add(seq);
			} else {
				return null;
			}
		}
		return sequences;
	},
	addReverseSubpath: function (de, lit, expectedClosed) {
		var endNode = de.getToNode();
		var fromNode = null;
		while (true) {
			lit.add(de.getSym());
			de.getEdge().setVisited(true);
			fromNode = de.getFromNode();
			var unvisitedOutDE = LineSequencer.findUnvisitedBestOrientedDE(fromNode);
			if (unvisitedOutDE === null) break;
			de = unvisitedOutDE.getSym();
		}
		if (expectedClosed) {
			Assert.isTrue(fromNode === endNode, "path not contiguous");
		}
	},
	findSequence: function (graph) {
		GraphComponent.setVisited(graph.edgeIterator(), false);
		var startNode = LineSequencer.findLowestDegreeNode(graph);
		var startDE = startNode.getOutEdges().iterator().next();
		var startDESym = startDE.getSym();
		var seq = new LinkedList();
		var lit = seq.listIterator();
		this.addReverseSubpath(startDESym, lit, false);
		while (lit.hasPrevious()) {
			var prev = lit.previous();
			var unvisitedOutDE = LineSequencer.findUnvisitedBestOrientedDE(prev.getFromNode());
			if (unvisitedOutDE !== null) this.addReverseSubpath(unvisitedOutDE.getSym(), lit, true);
		}
		var orientedSeq = this.orient(seq);
		return orientedSeq;
	},
	reverse: function (seq) {
		var newSeq = new LinkedList();
		for (var i = seq.iterator(); i.hasNext(); ) {
			var de = i.next();
			newSeq.addFirst(de.getSym());
		}
		return newSeq;
	},
	orient: function (seq) {
		var startEdge = seq.get(0);
		var endEdge = seq.get(seq.size() - 1);
		var startNode = startEdge.getFromNode();
		var endNode = endEdge.getToNode();
		var flipSeq = false;
		var hasDegree1Node = startNode.getDegree() === 1 || endNode.getDegree() === 1;
		if (hasDegree1Node) {
			var hasObviousStartNode = false;
			if (endEdge.getToNode().getDegree() === 1 && endEdge.getEdgeDirection() === false) {
				hasObviousStartNode = true;
				flipSeq = true;
			}
			if (startEdge.getFromNode().getDegree() === 1 && startEdge.getEdgeDirection() === true) {
				hasObviousStartNode = true;
				flipSeq = false;
			}
			if (!hasObviousStartNode) {
				if (startEdge.getFromNode().getDegree() === 1) flipSeq = true;
			}
		}
		if (flipSeq) return this.reverse(seq);
		return seq;
	},
	buildSequencedGeometry: function (sequences) {
		var lines = new ArrayList();
		for (var i1 = sequences.iterator(); i1.hasNext(); ) {
			var seq = i1.next();
			for (var i2 = seq.iterator(); i2.hasNext(); ) {
				var de = i2.next();
				var e = de.getEdge();
				var line = e.getLine();
				var lineToAdd = line;
				if (!de.getEdgeDirection() && !line.isClosed()) lineToAdd = LineSequencer.reverse(line);
				lines.add(lineToAdd);
			}
		}
		if (lines.size() === 0) return this.factory.createMultiLineString(new Array(0).fill(null));
		return this.factory.buildGeometry(lines);
	},
	getSequencedLineStrings: function () {
		this.computeSequence();
		return this.sequencedGeometry;
	},
	isSequenceable: function () {
		this.computeSequence();
		return this._isSequenceable;
	},
	add: function () {
		if (hasInterface(arguments[0], Collection)) {
			let geometries = arguments[0];
			for (var i = geometries.iterator(); i.hasNext(); ) {
				var geometry = i.next();
				this.add(geometry);
			}
		} else if (arguments[0] instanceof Geometry) {
			let geometry = arguments[0];
			geometry.apply({
				interfaces_: function () {
					return [GeometryComponentFilter];
				},
				filter: function (component) {
					if (component instanceof LineString) {
						this.addLine(component);
					}
				}
			});
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return LineSequencer;
	}
});
LineSequencer.findUnvisitedBestOrientedDE = function (node) {
	var wellOrientedDE = null;
	var unvisitedDE = null;
	for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
		var de = i.next();
		if (!de.getEdge().isVisited()) {
			unvisitedDE = de;
			if (de.getEdgeDirection()) wellOrientedDE = de;
		}
	}
	if (wellOrientedDE !== null) return wellOrientedDE;
	return unvisitedDE;
};
LineSequencer.findLowestDegreeNode = function (graph) {
	var minDegree = Integer.MAX_VALUE;
	var minDegreeNode = null;
	for (var i = graph.nodeIterator(); i.hasNext(); ) {
		var node = i.next();
		if (minDegreeNode === null || node.getDegree() < minDegree) {
			minDegree = node.getDegree();
			minDegreeNode = node;
		}
	}
	return minDegreeNode;
};
LineSequencer.isSequenced = function (geom) {
	if (!(geom instanceof MultiLineString)) {
		return true;
	}
	var mls = geom;
	var prevSubgraphNodes = new TreeSet();
	var lastNode = null;
	var currNodes = new ArrayList();
	for (var i = 0; i < mls.getNumGeometries(); i++) {
		var line = mls.getGeometryN(i);
		var startNode = line.getCoordinateN(0);
		var endNode = line.getCoordinateN(line.getNumPoints() - 1);
		if (prevSubgraphNodes.contains(startNode)) return false;
		if (prevSubgraphNodes.contains(endNode)) return false;
		if (lastNode !== null) {
			if (!startNode.equals(lastNode)) {
				prevSubgraphNodes.addAll(currNodes);
				currNodes.clear();
			}
		}
		currNodes.add(startNode);
		currNodes.add(endNode);
		lastNode = endNode;
	}
	return true;
};
LineSequencer.reverse = function (line) {
	var pts = line.getCoordinates();
	var revPts = new Array(pts.length).fill(null);
	var len = pts.length;
	for (var i = 0; i < len; i++) {
		revPts[len - 1 - i] = new Coordinate(pts[i]);
	}
	return line.getFactory().createLineString(revPts);
};
LineSequencer.sequence = function (geom) {
	var sequencer = new LineSequencer();
	sequencer.add(geom);
	return sequencer.getSequencedLineStrings();
};

