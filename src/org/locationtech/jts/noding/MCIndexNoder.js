import STRtree from '../index/strtree/STRtree';
import NodedSegmentString from './NodedSegmentString';
import MonotoneChainOverlapAction from '../index/chain/MonotoneChainOverlapAction';
import extend from '../../../../extend';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import ArrayList from '../../../../java/util/ArrayList';
import inherits from '../../../../inherits';
import SinglePassNoder from './SinglePassNoder';
export default function MCIndexNoder() {
	this._monoChains = new ArrayList();
	this._index = new STRtree();
	this._idCounter = 0;
	this._nodedSegStrings = null;
	this._nOverlaps = 0;
	if (arguments.length === 0) {} else if (arguments.length === 1) {
		let si = arguments[0];
		SinglePassNoder.call(this, si);
	}
}
inherits(MCIndexNoder, SinglePassNoder);
extend(MCIndexNoder.prototype, {
	getMonotoneChains: function () {
		return this._monoChains;
	},
	getNodedSubstrings: function () {
		return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings);
	},
	getIndex: function () {
		return this._index;
	},
	add: function (segStr) {
		var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
		for (var i = segChains.iterator(); i.hasNext(); ) {
			var mc = i.next();
			mc.setId(this._idCounter++);
			this._index.insert(mc.getEnvelope(), mc);
			this._monoChains.add(mc);
		}
	},
	computeNodes: function (inputSegStrings) {
		this._nodedSegStrings = inputSegStrings;
		for (var i = inputSegStrings.iterator(); i.hasNext(); ) {
			this.add(i.next());
		}
		this.intersectChains();
	},
	intersectChains: function () {
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
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MCIndexNoder;
	}
});
function SegmentOverlapAction() {
	MonotoneChainOverlapAction.apply(this);
	this._si = null;
	let si = arguments[0];
	this._si = si;
}
inherits(SegmentOverlapAction, MonotoneChainOverlapAction);
extend(SegmentOverlapAction.prototype, {
	overlap: function () {
		if (arguments.length === 4) {
			let mc1 = arguments[0], start1 = arguments[1], mc2 = arguments[2], start2 = arguments[3];
			var ss1 = mc1.getContext();
			var ss2 = mc2.getContext();
			this._si.processIntersections(ss1, start1, ss2, start2);
		} else return MonotoneChainOverlapAction.prototype.overlap.apply(this, arguments);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return SegmentOverlapAction;
	}
});
MCIndexNoder.SegmentOverlapAction = SegmentOverlapAction;
