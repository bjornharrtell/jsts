import extend from '../../../../../extend';
import MonotoneChainIndexer from './MonotoneChainIndexer';
import Envelope from '../../geom/Envelope';
export default function MonotoneChainEdge() {
	this.e = null;
	this.pts = null;
	this.startIndex = null;
	this.env1 = new Envelope();
	this.env2 = new Envelope();
	let e = arguments[0];
	this.e = e;
	this.pts = e.getCoordinates();
	var mcb = new MonotoneChainIndexer();
	this.startIndex = mcb.getChainStartIndices(this.pts);
}
extend(MonotoneChainEdge.prototype, {
	getCoordinates: function () {
		return this.pts;
	},
	getMaxX: function (chainIndex) {
		var x1 = this.pts[this.startIndex[chainIndex]].x;
		var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
		return x1 > x2 ? x1 : x2;
	},
	getMinX: function (chainIndex) {
		var x1 = this.pts[this.startIndex[chainIndex]].x;
		var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
		return x1 < x2 ? x1 : x2;
	},
	computeIntersectsForChain: function () {
		if (arguments.length === 4) {
			let chainIndex0 = arguments[0], mce = arguments[1], chainIndex1 = arguments[2], si = arguments[3];
			this.computeIntersectsForChain(this.startIndex[chainIndex0], this.startIndex[chainIndex0 + 1], mce, mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1], si);
		} else if (arguments.length === 6) {
			let start0 = arguments[0], end0 = arguments[1], mce = arguments[2], start1 = arguments[3], end1 = arguments[4], ei = arguments[5];
			var p00 = this.pts[start0];
			var p01 = this.pts[end0];
			var p10 = mce.pts[start1];
			var p11 = mce.pts[end1];
			if (end0 - start0 === 1 && end1 - start1 === 1) {
				ei.addIntersections(this.e, start0, mce.e, start1);
				return null;
			}
			this.env1.init(p00, p01);
			this.env2.init(p10, p11);
			if (!this.env1.intersects(this.env2)) return null;
			var mid0 = Math.trunc((start0 + end0) / 2);
			var mid1 = Math.trunc((start1 + end1) / 2);
			if (start0 < mid0) {
				if (start1 < mid1) this.computeIntersectsForChain(start0, mid0, mce, start1, mid1, ei);
				if (mid1 < end1) this.computeIntersectsForChain(start0, mid0, mce, mid1, end1, ei);
			}
			if (mid0 < end0) {
				if (start1 < mid1) this.computeIntersectsForChain(mid0, end0, mce, start1, mid1, ei);
				if (mid1 < end1) this.computeIntersectsForChain(mid0, end0, mce, mid1, end1, ei);
			}
		}
	},
	getStartIndexes: function () {
		return this.startIndex;
	},
	computeIntersects: function (mce, si) {
		for (var i = 0; i < this.startIndex.length - 1; i++) {
			for (var j = 0; j < mce.startIndex.length - 1; j++) {
				this.computeIntersectsForChain(i, mce, j, si);
			}
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MonotoneChainEdge;
	}
});
