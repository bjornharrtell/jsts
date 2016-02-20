import SegmentSetMutualIntersector from './SegmentSetMutualIntersector';
import STRtree from '../index/strtree/STRtree';
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction';
import extend from '../../../../extend';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import ArrayList from '../../../../java/util/ArrayList';
import inherits from '../../../../inherits';
export default function MCIndexSegmentSetMutualIntersector() {
	this.index = new STRtree();
	let baseSegStrings = arguments[0];
	this.initBaseSegments(baseSegStrings);
}
extend(MCIndexSegmentSetMutualIntersector.prototype, {
	addToIndex: function (segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			this.index.insert(mc.getEnvelope(), mc);
		}
	},
	addToMonoChains: function (segStr, monoChains) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			monoChains.add(mc);
		}
	},
	process: function (segStrings, segInt) {
		var monoChains = new ArrayList();
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			this.addToMonoChains(i.next(), monoChains);
		}
		this.intersectChains(monoChains, segInt);
	},
	initBaseSegments: function (segStrings) {
		for (var i = segStrings.iterator(); i.hasNext(); ) {
			this.addToIndex(i.next());
		}
		this.index.build();
	},
	getIndex: function () {
		return this.index;
	},
	intersectChains: function (monoChains, segInt) {
		var overlapAction = new SegmentOverlapAction(segInt);
		for (var i = monoChains.iterator(); i.hasNext(); ) {
			var queryChain = i.next();
			var overlapChains = this.index.query(queryChain.getEnvelope());
			for (var j = overlapChains.iterator(); j.hasNext(); ) {
				var testChain = j.next();
				queryChain.computeOverlaps(testChain, overlapAction);
				if (segInt.isDone()) return null;
			}
		}
	},
	interfaces_: function () {
		return [SegmentSetMutualIntersector];
	},
	getClass: function () {
		return MCIndexSegmentSetMutualIntersector;
	}
});
function SegmentOverlapAction() {
	MonotoneChainOverlapAction.apply(this);
	this.si = null;
	let si = arguments[0];
	this.si = si;
}
inherits(SegmentOverlapAction, MonotoneChainOverlapAction);
extend(SegmentOverlapAction.prototype, {
	overlap: function () {
		if (arguments.length === 4) {
			let mc1 = arguments[0], start1 = arguments[1], mc2 = arguments[2], start2 = arguments[3];
			var ss1 = mc1.getContext();
			var ss2 = mc2.getContext();
			this.si.processIntersections(ss1, start1, ss2, start2);
		} else return MonotoneChainOverlapAction.prototype.overlap.apply(this, arguments);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentOverlapAction;
	}
});
MCIndexSegmentSetMutualIntersector.SegmentOverlapAction = SegmentOverlapAction;

