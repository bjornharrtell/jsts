import ArrayList from '../../../../../java/util/ArrayList';
import OverlayOp from './OverlayOp';
export default class PointBuilder {
	constructor(...args) {
		this.op = null;
		this.geometryFactory = null;
		this.resultPointList = new ArrayList();
		switch (args.length) {
			case 3:
				return ((...args) => {
					let [op, geometryFactory, ptLocator] = args;
					this.op = op;
					this.geometryFactory = geometryFactory;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	filterCoveredNodeToPoint(n) {
		var coord = n.getCoordinate();
		if (!this.op.isCoveredByLA(coord)) {
			var pt = this.geometryFactory.createPoint(coord);
			this.resultPointList.add(pt);
		}
	}
	extractNonCoveredResultNodes(opCode) {
		for (var nodeit = this.op.getGraph().getNodes().iterator(); nodeit.hasNext(); ) {
			var n = nodeit.next();
			if (n.isInResult()) continue;
			if (n.isIncidentEdgeInResult()) continue;
			if (n.getEdges().getDegree() === 0 || opCode === OverlayOp.INTERSECTION) {
				var label = n.getLabel();
				if (OverlayOp.isResultOfOp(label, opCode)) {
					this.filterCoveredNodeToPoint(n);
				}
			}
		}
	}
	build(opCode) {
		this.extractNonCoveredResultNodes(opCode);
		return this.resultPointList;
	}
	getClass() {
		return PointBuilder;
	}
}

