import MonotoneChain from './MonotoneChain';
import extend from '../../../../../extend';
import Integer from '../../../../../java/lang/Integer';
import ArrayList from '../../../../../java/util/ArrayList';
import Quadrant from '../../geomgraph/Quadrant';
export default function MonotoneChainBuilder() {}
extend(MonotoneChainBuilder.prototype, {
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MonotoneChainBuilder;
	}
});
MonotoneChainBuilder.getChainStartIndices = function (pts) {
	var start = 0;
	var startIndexList = new ArrayList();
	startIndexList.add(new Integer(start));
	do {
		var last = MonotoneChainBuilder.findChainEnd(pts, start);
		startIndexList.add(new Integer(last));
		start = last;
	} while (start < pts.length - 1);
	var startIndex = MonotoneChainBuilder.toIntArray(startIndexList);
	return startIndex;
};
MonotoneChainBuilder.findChainEnd = function (pts, start) {
	var safeStart = start;
	while (safeStart < pts.length - 1 && pts[safeStart].equals2D(pts[safeStart + 1])) {
		safeStart++;
	}
	if (safeStart >= pts.length - 1) {
		return pts.length - 1;
	}
	var chainQuad = Quadrant.quadrant(pts[safeStart], pts[safeStart + 1]);
	var last = start + 1;
	while (last < pts.length) {
		if (!pts[last - 1].equals2D(pts[last])) {
			var quad = Quadrant.quadrant(pts[last - 1], pts[last]);
			if (quad !== chainQuad) break;
		}
		last++;
	}
	return last - 1;
};
MonotoneChainBuilder.getChains = function () {
	if (arguments.length === 1) {
		let pts = arguments[0];
		return MonotoneChainBuilder.getChains(pts, null);
	} else if (arguments.length === 2) {
		let pts = arguments[0], context = arguments[1];
		var mcList = new ArrayList();
		var startIndex = MonotoneChainBuilder.getChainStartIndices(pts);
		for (var i = 0; i < startIndex.length - 1; i++) {
			var mc = new MonotoneChain(pts, startIndex[i], startIndex[i + 1], context);
			mcList.add(mc);
		}
		return mcList;
	}
};
MonotoneChainBuilder.toIntArray = function (list) {
	var array = new Array(list.size()).fill(null);
	for (var i = 0; i < array.length; i++) {
		array[i] = list.get(i).intValue();
	}
	return array;
};
