import Position from '../../geomgraph/Position';
import TopologyException from '../../geom/TopologyException';
import ArrayList from '../../../../../java/util/ArrayList';
import OverlayOp from './OverlayOp';
export default class ConsistentPolygonRingChecker {
	constructor(...args) {
		this.graph = null;
		this.SCANNING_FOR_INCOMING = 1;
		this.LINKING_TO_OUTGOING = 2;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [graph] = args;
					this.graph = graph;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	testLinkResultDirectedEdges(deStar, opCode) {
		var ringEdges = this.getPotentialResultAreaEdges(deStar, opCode);
		var firstOut = null;
		var incoming = null;
		var state = this.SCANNING_FOR_INCOMING;
		for (var i = 0; i < ringEdges.size(); i++) {
			var nextOut = ringEdges.get(i);
			var nextIn = nextOut.getSym();
			if (!nextOut.getLabel().isArea()) continue;
			if (firstOut === null && this.isPotentialResultAreaEdge(nextOut, opCode)) firstOut = nextOut;
			switch (state) {
				case this.SCANNING_FOR_INCOMING:
					if (!this.isPotentialResultAreaEdge(nextIn, opCode)) continue;
					incoming = nextIn;
					state = this.LINKING_TO_OUTGOING;
					break;
				case this.LINKING_TO_OUTGOING:
					if (!this.isPotentialResultAreaEdge(nextOut, opCode)) continue;
					state = this.SCANNING_FOR_INCOMING;
					break;
			}
		}
		if (state === this.LINKING_TO_OUTGOING) {
			if (firstOut === null) throw new TopologyException("no outgoing dirEdge found", deStar.getCoordinate());
		}
	}
	getPotentialResultAreaEdges(deStar, opCode) {
		var resultAreaEdgeList = new ArrayList();
		for (var it = deStar.iterator(); it.hasNext(); ) {
			var de = it.next();
			if (this.isPotentialResultAreaEdge(de, opCode) || this.isPotentialResultAreaEdge(de.getSym(), opCode)) resultAreaEdgeList.add(de);
		}
		return resultAreaEdgeList;
	}
	checkAll() {
		this.check(OverlayOp.INTERSECTION);
		this.check(OverlayOp.DIFFERENCE);
		this.check(OverlayOp.UNION);
		this.check(OverlayOp.SYMDIFFERENCE);
	}
	check(opCode) {
		for (var nodeit = this.graph.getNodeIterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			this.testLinkResultDirectedEdges(node.getEdges(), opCode);
		}
	}
	isPotentialResultAreaEdge(de, opCode) {
		var label = de.getLabel();
		if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) {
			return true;
		}
		return false;
	}
	getClass() {
		return ConsistentPolygonRingChecker;
	}
}

