import MonotoneChainSelectAction from '../index/chain/MonotoneChainSelectAction';
import Bintree from '../index/bintree/Bintree';
import Interval from '../index/bintree/Interval';
import Double from '../../../../java/lang/Double';
import extend from '../../../../extend';
import MonotoneChainBuilder from '../index/chain/MonotoneChainBuilder';
import CoordinateArrays from '../geom/CoordinateArrays';
import RobustDeterminant from './RobustDeterminant';
import Envelope from '../geom/Envelope';
import inherits from '../../../../inherits';
import PointInRing from './PointInRing';
export default function MCPointInRing() {
	this._ring = null;
	this._tree = null;
	this._crossings = 0;
	this._interval = new Interval();
	let ring = arguments[0];
	this._ring = ring;
	this.buildIndex();
}
extend(MCPointInRing.prototype, {
	testLineSegment: function (p, seg) {
		var xInt = null;
		var x1 = null;
		var y1 = null;
		var x2 = null;
		var y2 = null;
		var p1 = seg.p0;
		var p2 = seg.p1;
		x1 = p1.x - p.x;
		y1 = p1.y - p.y;
		x2 = p2.x - p.x;
		y2 = p2.y - p.y;
		if (y1 > 0 && y2 <= 0 || y2 > 0 && y1 <= 0) {
			xInt = RobustDeterminant.signOfDet2x2(x1, y1, x2, y2) / (y2 - y1);
			if (0.0 < xInt) {
				this._crossings++;
			}
		}
	},
	buildIndex: function () {
		this._tree = new Bintree();
		var pts = CoordinateArrays.removeRepeatedPoints(this._ring.getCoordinates());
		var mcList = MonotoneChainBuilder.getChains(pts);
		for (var i = 0; i < mcList.size(); i++) {
			var mc = mcList.get(i);
			var mcEnv = mc.getEnvelope();
			this._interval.min = mcEnv.getMinY();
			this._interval.max = mcEnv.getMaxY();
			this._tree.insert(this._interval, mc);
		}
	},
	testMonotoneChain: function (rayEnv, mcSelecter, mc) {
		mc.select(rayEnv, mcSelecter);
	},
	isInside: function (pt) {
		this._crossings = 0;
		var rayEnv = new Envelope(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY, pt.y, pt.y);
		this._interval.min = pt.y;
		this._interval.max = pt.y;
		var segs = this._tree.query(this._interval);
		var mcSelecter = new MCSelecter(this, pt);
		for (var i = segs.iterator(); i.hasNext(); ) {
			var mc = i.next();
			this.testMonotoneChain(rayEnv, mcSelecter, mc);
		}
		if (this._crossings % 2 === 1) {
			return true;
		}
		return false;
	},
	interfaces_: function () {
		return [PointInRing];
	},
	getClass: function () {
		return MCPointInRing;
	}
});
function MCSelecter() {
	MonotoneChainSelectAction.apply(this);
	this.mcp = null;
	this.p = null;
	let mcp = arguments[0], p = arguments[1];
	this.mcp = mcp;
	this.p = p;
}
inherits(MCSelecter, MonotoneChainSelectAction);
extend(MCSelecter.prototype, {
	select: function () {
		if (arguments.length === 1) {
			let ls = arguments[0];
			this.mcp.testLineSegment(this.p, ls);
		} else return MonotoneChainSelectAction.prototype.select.apply(this, arguments);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MCSelecter;
	}
});
MCPointInRing.MCSelecter = MCSelecter;
