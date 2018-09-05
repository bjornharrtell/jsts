import ArrayList from '../../../../../java/util/ArrayList';
import OverlayOp from './OverlayOp';
export default class PointBuilder {
	constructor() {
		PointBuilder.constructor_.apply(this, arguments);
	}
	filterCoveredNodeToPoint(n) {
		var coord = n.getCoordinate();
		if (!this._op.isCoveredByLA(coord)) {
			var pt = this._geometryFactory.createPoint(coord);
			this._resultPointList.add(pt);
		}
	}
	extractNonCoveredResultNodes(opCode) {
		for (var nodeit = this._op.getGraph().getNodes().iterator(); nodeit.hasNext(); ) {
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
		return this._resultPointList;
	}
	getClass() {
		return PointBuilder;
	}
	get interfaces_() {
		return [];
	}
}
PointBuilder.constructor_ = function () {
	this._op = null;
	this._geometryFactory = null;
	this._resultPointList = new ArrayList();
	let op = arguments[0], geometryFactory = arguments[1], ptLocator = arguments[2];
	this._op = op;
	this._geometryFactory = geometryFactory;
};
