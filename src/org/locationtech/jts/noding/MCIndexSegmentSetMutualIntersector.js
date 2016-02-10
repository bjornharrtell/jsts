import SegmentSetMutualIntersector from './SegmentSetMutualIntersector';
import STRtree from '../index/strtree/STRtree';
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import ArrayList from '../../../../java/util/ArrayList';
export default class MCIndexSegmentSetMutualIntersector {
	constructor(...args) {
		this.index = new STRtree();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [baseSegStrings] = args;
						this.initBaseSegments(baseSegStrings);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [SegmentSetMutualIntersector];
	}
	static get SegmentOverlapAction() {
		return SegmentOverlapAction;
	}
	addToIndex(segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			this.index.insert(mc.getEnvelope(), mc);
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
		this.index.build();
	}
	getIndex() {
		return this.index;
	}
	intersectChains(monoChains, segInt) {
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
	}
	getClass() {
		return MCIndexSegmentSetMutualIntersector;
	}
}
class SegmentOverlapAction extends MonotoneChainOverlapAction {
	constructor(...args) {
		super();
		this.si = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [si] = args;
						this.si = si;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	overlap(...args) {
		if (args.length === 4) {
			let [mc1, start1, mc2, start2] = args;
			var ss1 = mc1.getContext();
			var ss2 = mc2.getContext();
			this.si.processIntersections(ss1, start1, ss2, start2);
		} else return super.overlap(...args);
	}
	getClass() {
		return SegmentOverlapAction;
	}
}

