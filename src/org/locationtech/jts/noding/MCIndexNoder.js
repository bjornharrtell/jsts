import STRtree from '../index/strtree/STRtree';
import NodedSegmentString from './NodedSegmentString';
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import ArrayList from '../../../../java/util/ArrayList';
import SinglePassNoder from './SinglePassNoder';
export default class MCIndexNoder extends SinglePassNoder {
	constructor(...args) {
		super();
		this.monoChains = new ArrayList();
		this.index = new STRtree();
		this.idCounter = 0;
		this.nodedSegStrings = null;
		this.nOverlaps = 0;
		const overloaded = (...args) => {
			if (args.length === 0) {
				return ((...args) => {
					let [] = args;
				})(...args);
			} else if (args.length === 1) {
				return ((...args) => {
					let [si] = args;
					super(si);
				})(...args);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static get SegmentOverlapAction() {
		return SegmentOverlapAction;
	}
	getMonotoneChains() {
		return this.monoChains;
	}
	getNodedSubstrings() {
		return NodedSegmentString.getNodedSubstrings(this.nodedSegStrings);
	}
	getIndex() {
		return this.index;
	}
	add(segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			mc.setId(this.idCounter++);
			this.index.insert(mc.getEnvelope(), mc);
			this.monoChains.add(mc);
		}
	}
	computeNodes(inputSegStrings) {
		this.nodedSegStrings = inputSegStrings;
		for (var i = inputSegStrings.iterator(); i.hasNext(); ) {
			this.add(i.next());
		}
		this.intersectChains();
	}
	intersectChains() {
		var overlapAction = new SegmentOverlapAction(this.segInt);
		for (var i = this.monoChains.iterator(); i.hasNext(); ) {
			var queryChain = i.next();
			var overlapChains = this.index.query(queryChain.getEnvelope());
			for (var j = overlapChains.iterator(); j.hasNext(); ) {
				var testChain = j.next();
				if (testChain.getId() > queryChain.getId()) {
					queryChain.computeOverlaps(testChain, overlapAction);
					this.nOverlaps++;
				}
				if (this.segInt.isDone()) return null;
			}
		}
	}
	getClass() {
		return MCIndexNoder;
	}
}
class SegmentOverlapAction extends MonotoneChainOverlapAction {
	constructor(...args) {
		super();
		this.si = null;
		if (args.length === 1) {
			let [si] = args;
			this.si = si;
		}
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

