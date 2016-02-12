import MonotoneChain from './MonotoneChain';
import Integer from '../../../../../java/lang/Integer';
import ArrayList from '../../../../../java/util/ArrayList';
import Quadrant from '../../geomgraph/Quadrant';
export default class MonotoneChainBuilder {
	constructor(...args) {
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	static getChainStartIndices(pts) {
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
	}
	static findChainEnd(pts, start) {
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
	}
	static getChains(...args) {
		if (args.length === 1) {
			let [pts] = args;
			return MonotoneChainBuilder.getChains(pts, null);
		} else if (args.length === 2) {
			let [pts, context] = args;
			var mcList = new ArrayList();
			var startIndex = MonotoneChainBuilder.getChainStartIndices(pts);
			for (var i = 0; i < startIndex.length - 1; i++) {
				var mc = new MonotoneChain(pts, startIndex[i], startIndex[i + 1], context);
				mcList.add(mc);
			}
			return mcList;
		}
	}
	static toIntArray(list) {
		var array = new Array(list.size());
		for (var i = 0; i < array.length; i++) {
			array[i] = list.get(i).intValue();
		}
		return array;
	}
	getClass() {
		return MonotoneChainBuilder;
	}
}

