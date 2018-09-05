import STRtree from '../index/strtree/STRtree';
import NodedSegmentString from './NodedSegmentString';
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import ArrayList from '../../../../java/util/ArrayList';
import SinglePassNoder from './SinglePassNoder';
export default class MCIndexNoder extends SinglePassNoder {
	constructor() {
		super();
		MCIndexNoder.constructor_.apply(this, arguments);
	}
	getMonotoneChains() {
		return this._monoChains;
	}
	getNodedSubstrings() {
		return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings);
	}
	getIndex() {
		return this._index;
	}
	add(segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			mc.setId(this._idCounter++);
			this._index.insert(mc.getEnvelope(), mc);
			this._monoChains.add(mc);
		}
	}
	computeNodes(inputSegStrings) {
		this._nodedSegStrings = inputSegStrings;
		for (var i = inputSegStrings.iterator(); i.hasNext(); ) {
			this.add(i.next());
		}
		this.intersectChains();
	}
	intersectChains() {
		var overlapAction = new SegmentOverlapAction(this._segInt);
		for (var i = this._monoChains.iterator(); i.hasNext(); ) {
			var queryChain = i.next();
			var overlapChains = this._index.query(queryChain.getEnvelope());
			for (var j = overlapChains.iterator(); j.hasNext(); ) {
				var testChain = j.next();
				if (testChain.getId() > queryChain.getId()) {
					queryChain.computeOverlaps(testChain, overlapAction);
					this._nOverlaps++;
				}
				if (this._segInt.isDone()) return null;
			}
		}
	}
	getClass() {
		return MCIndexNoder;
	}
	get interfaces_() {
		return [];
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
MCIndexNoder.SegmentOverlapAction = SegmentOverlapAction;
MCIndexNoder.constructor_ = function () {
	this._monoChains = new ArrayList();
	this._index = new STRtree();
	this._idCounter = 0;
	this._nodedSegStrings = null;
	this._nOverlaps = 0;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let si = arguments[0];
		SinglePassNoder.constructor_.call(this, si);
	}
};
