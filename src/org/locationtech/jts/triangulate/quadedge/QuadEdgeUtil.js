import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function QuadEdgeUtil() {}
extend(QuadEdgeUtil.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return QuadEdgeUtil;
	}
});
QuadEdgeUtil.findEdgesIncidentOnOrigin = function (start) {
	var incEdge = new ArrayList();
	var qe = start;
	do {
		incEdge.add(qe);
		qe = qe.oNext();
	} while (qe !== start);
	return incEdge;
};
