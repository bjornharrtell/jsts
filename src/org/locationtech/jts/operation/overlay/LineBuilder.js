import ArrayList from '../../../../../java/util/ArrayList';
import Assert from '../../util/Assert';
import OverlayOp from './OverlayOp';
export default class LineBuilder {
	constructor(...args) {
		this.op = null;
		this.geometryFactory = null;
		this.ptLocator = null;
		this.lineEdgesList = new ArrayList();
		this.resultLineList = new ArrayList();
		if (args.length === 3) {
			let [op, geometryFactory, ptLocator] = args;
			this.op = op;
			this.geometryFactory = geometryFactory;
			this.ptLocator = ptLocator;
		}
	}
	get interfaces_() {
		return [];
	}
	collectLines(opCode) {
		for (var it = this.op.getGraph().getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			this.collectLineEdge(de, opCode, this.lineEdgesList);
			this.collectBoundaryTouchEdge(de, opCode, this.lineEdgesList);
		}
	}
	labelIsolatedLine(e, targetIndex) {
		var loc = this.ptLocator.locate(e.getCoordinate(), this.op.getArgGeometry(targetIndex));
		e.getLabel().setLocation(targetIndex, loc);
	}
	build(opCode) {
		this.findCoveredLineEdges();
		this.collectLines(opCode);
		this.buildLines(opCode);
		return this.resultLineList;
	}
	collectLineEdge(de, opCode, edges) {
		var label = de.getLabel();
		var e = de.getEdge();
		if (de.isLineEdge()) {
			if (!de.isVisited() && OverlayOp.isResultOfOp(label, opCode) && !e.isCovered()) {
				edges.add(e);
				de.setVisitedEdge(true);
			}
		}
	}
	findCoveredLineEdges() {
		for (var nodeit = this.op.getGraph().getNodes().iterator(); nodeit.hasNext(); ) {
			var node = nodeit.next();
			node.getEdges().findCoveredLineEdges();
		}
		for (var it = this.op.getGraph().getEdgeEnds().iterator(); it.hasNext(); ) {
			var de = it.next();
			var e = de.getEdge();
			if (de.isLineEdge() && !e.isCoveredSet()) {
				var isCovered = this.op.isCoveredByA(de.getCoordinate());
				e.setCovered(isCovered);
			}
		}
	}
	labelIsolatedLines(edgesList) {
		for (var it = edgesList.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			if (e.isIsolated()) {
				if (label.isNull(0)) this.labelIsolatedLine(e, 0); else this.labelIsolatedLine(e, 1);
			}
		}
	}
	buildLines(opCode) {
		for (var it = this.lineEdgesList.iterator(); it.hasNext(); ) {
			var e = it.next();
			var label = e.getLabel();
			var line = this.geometryFactory.createLineString(e.getCoordinates());
			this.resultLineList.add(line);
			e.setInResult(true);
		}
	}
	collectBoundaryTouchEdge(de, opCode, edges) {
		var label = de.getLabel();
		if (de.isLineEdge()) return null;
		if (de.isVisited()) return null;
		if (de.isInteriorAreaEdge()) return null;
		if (de.getEdge().isInResult()) return null;
		Assert.isTrue(!(de.isInResult() || de.getSym().isInResult()) || !de.getEdge().isInResult());
		if (OverlayOp.isResultOfOp(label, opCode) && opCode === OverlayOp.INTERSECTION) {
			edges.add(de.getEdge());
			de.setVisitedEdge(true);
		}
	}
	getClass() {
		return LineBuilder;
	}
}

