import HashSet from '../../../../../java/util/HashSet';
import Position from '../../geomgraph/Position';
import Stack from '../../../../../java/util/Stack';
import RightmostEdgeFinder from './RightmostEdgeFinder';
import TopologyException from '../../geom/TopologyException';
import LinkedList from '../../../../../java/util/LinkedList';
import Comparable from '../../../../../java/lang/Comparable';
import ArrayList from '../../../../../java/util/ArrayList';
import Envelope from '../../geom/Envelope';
export default class BufferSubgraph {
	constructor(...args) {
		this.finder = null;
		this.dirEdgeList = new ArrayList();
		this.nodes = new ArrayList();
		this.rightMostCoord = null;
		this.env = null;
		switch (args.length) {
			case 0:
				{
					let [] = args;
					this.finder = new RightmostEdgeFinder();
					break;
				}
		}
	}
	get interfaces_() {
		return [Comparable];
	}
	clearVisitedEdges() {
		for (var it = this.dirEdgeList.iterator(); it.hasNext(); ) {
			var de = it.next();
			de.setVisited(false);
		}
	}
	getRightmostCoordinate() {
		return this.rightMostCoord;
	}
	computeNodeDepth(n) {
		var startEdge = null;
		for (var i = n.getEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			if (de.isVisited() || de.getSym().isVisited()) {
				startEdge = de;
				break;
			}
		}
		if (startEdge === null) throw new TopologyException("unable to find edge to compute depths at " + n.getCoordinate());
		n.getEdges().computeDepths(startEdge);
		for (var i = n.getEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			de.setVisited(true);
			this.copySymDepths(de);
		}
	}
	computeDepth(outsideDepth) {
		this.clearVisitedEdges();
		var de = this.finder.getEdge();
		var n = de.getNode();
		var label = de.getLabel();
		de.setEdgeDepths(Position.RIGHT, outsideDepth);
		this.copySymDepths(de);
		this.computeDepths(de);
	}
	create(node) {
		this.addReachable(node);
		this.finder.findEdge(this.dirEdgeList);
		this.rightMostCoord = this.finder.getCoordinate();
	}
	findResultEdges() {
		for (var it = this.dirEdgeList.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (de.getDepth(Position.RIGHT) >= 1 && de.getDepth(Position.LEFT) <= 0 && !de.isInteriorAreaEdge()) {
				de.setInResult(true);
			}
		}
	}
	computeDepths(startEdge) {
		var nodesVisited = new HashSet();
		var nodeQueue = new LinkedList();
		var startNode = startEdge.getNode();
		nodeQueue.addLast(startNode);
		nodesVisited.add(startNode);
		startEdge.setVisited(true);
		while (!nodeQueue.isEmpty()) {
			var n = nodeQueue.removeFirst();
			nodesVisited.add(n);
			this.computeNodeDepth(n);
			for (var i = n.getEdges().iterator(); i.hasNext(); ) {
				var de = i.next();
				var sym = de.getSym();
				if (sym.isVisited()) continue;
				var adjNode = sym.getNode();
				if (!nodesVisited.contains(adjNode)) {
					nodeQueue.addLast(adjNode);
					nodesVisited.add(adjNode);
				}
			}
		}
	}
	compareTo(o) {
		var graph = o;
		if (this.rightMostCoord.x < graph.rightMostCoord.x) {
			return -1;
		}
		if (this.rightMostCoord.x > graph.rightMostCoord.x) {
			return 1;
		}
		return 0;
	}
	getEnvelope() {
		if (this.env === null) {
			var edgeEnv = new Envelope();
			for (var it = this.dirEdgeList.iterator(); it.hasNext(); ) {
				var dirEdge = it.next();
				var pts = dirEdge.getEdge().getCoordinates();
				for (var i = 0; i < pts.length - 1; i++) {
					edgeEnv.expandToInclude(pts[i]);
				}
			}
			this.env = edgeEnv;
		}
		return this.env;
	}
	addReachable(startNode) {
		var nodeStack = new Stack();
		nodeStack.add(startNode);
		while (!nodeStack.empty()) {
			var node = nodeStack.pop();
			this.add(node, nodeStack);
		}
	}
	copySymDepths(de) {
		var sym = de.getSym();
		sym.setDepth(Position.LEFT, de.getDepth(Position.RIGHT));
		sym.setDepth(Position.RIGHT, de.getDepth(Position.LEFT));
	}
	add(node, nodeStack) {
		node.setVisited(true);
		this.nodes.add(node);
		for (var i = node.getEdges().iterator(); i.hasNext(); ) {
			var de = i.next();
			this.dirEdgeList.add(de);
			var sym = de.getSym();
			var symNode = sym.getNode();
			if (!symNode.isVisited()) nodeStack.push(symNode);
		}
	}
	getNodes() {
		return this.nodes;
	}
	getDirectedEdges() {
		return this.dirEdgeList;
	}
	getClass() {
		return BufferSubgraph;
	}
}

