import SegmentSetMutualIntersector from './SegmentSetMutualIntersector';
import STRtree from '../index/strtree/STRtree';
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import ArrayList from '../../../../java/util/ArrayList';
export default class MCIndexSegmentSetMutualIntersector {
	constructor() {
		MCIndexSegmentSetMutualIntersector.constructor_.apply(this, arguments);
	}
	addToIndex(segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			this._index.insert(mc.getEnvelope(), mc);
		}
	}
	addToMonoChains(segStr, monoChains) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			monoChains.add(mc);
		}
	}
	process(segStrings, segInt) {
		var monoChains = new ArrayList();
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			this.addToMonoChains(i.next(), monoChains);
		}
		this.intersectChains(monoChains, segInt);
	}
	initBaseSegments(segStrings) {
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			this.addToIndex(i.next());
		}
		this._index.build();
	}
	getIndex() {
		return this._index;
	}
	intersectChains(monoChains, segInt) {
		var overlapAction = new SegmentOverlapAction(segInt);
		for (var i = monoChains.iterator(); i.hasNext(); ) {
			var queryChain = i.next();
			var overlapChains = this._index.query(queryChain.getEnvelope());
			for (var j = overlapChains.iterator(); j.hasNext(); ) {
				var testChain = j.next();
				queryChain.computeOverlaps(testChain, overlapAction);
				if (segInt.isDone()) return null;
			}
		}
	}
	getClass() {
		return MCIndexSegmentSetMutualIntersector;
	}
	get interfaces_() {
		return [SegmentSetMutualIntersector];
	}
}
class SegmentOverlapAction extends MonotoneChainOverlapAction {
	constructor() {
		super();
		SegmentOverlapAction.constructor_.apply(this, arguments);
	}
	overlap() {
		if (arguments.length === 4) {
			let mc1 = arguments[0], start1 = arguments[1], mc2 = arguments[2], start2 = arguments[3];
			var ss1 = mc1.getContext();
			var ss2 = mc2.getContext();
			this._si.processIntersections(ss1, start1, ss2, start2);
		} else return super.overlap.apply(this, arguments);
	}
	getClass() {
		return SegmentOverlapAction;
	}
	get interfaces_() {
		return [];
	}
}
SegmentOverlapAction.constructor_ = function () {
	this._si = null;
	let si = arguments[0];
	this._si = si;
};
MCIndexSegmentSetMutualIntersector.SegmentOverlapAction = SegmentOverlapAction;
MCIndexSegmentSetMutualIntersector.constructor_ = function () {
	this._index = new STRtree();
	let baseSegStrings = arguments[0];
	this.initBaseSegments(baseSegStrings);
};
