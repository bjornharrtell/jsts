import ArrayList from '../../../../../java/util/ArrayList';
export default class QuadEdgeUtil {
	constructor() {
		QuadEdgeUtil.constructor_.apply(this, arguments);
	}
	static findEdgesIncidentOnOrigin(start) {
		var incEdge = new ArrayList();
		var qe = start;
		do {
			incEdge.add(qe);
			qe = qe.oNext();
		} while (qe !== start);
		return incEdge;
	}
	getClass() {
		return QuadEdgeUtil;
	}
	get interfaces_() {
		return [];
	}
}
QuadEdgeUtil.constructor_ = function () {};
