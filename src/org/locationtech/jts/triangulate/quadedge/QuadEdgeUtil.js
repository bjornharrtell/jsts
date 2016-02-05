import ArrayList from '../../../../../java/util/ArrayList';
export default class QuadEdgeUtil {
	get interfaces_() {
		return [];
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
}

