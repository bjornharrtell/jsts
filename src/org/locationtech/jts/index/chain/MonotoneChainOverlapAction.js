import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
export default function MonotoneChainOverlapAction() {
	this._overlapSeg1 = new LineSegment();
	this._overlapSeg2 = new LineSegment();
}
extend(MonotoneChainOverlapAction.prototype, {
	overlap: function () {
		if (arguments.length === 2) {
			let seg1 = arguments[0], seg2 = arguments[1];
		} else if (arguments.length === 4) {
			let mc1 = arguments[0], start1 = arguments[1], mc2 = arguments[2], start2 = arguments[3];
			mc1.getLineSegment(start1, this._overlapSeg1);
			mc2.getLineSegment(start2, this._overlapSeg2);
			this.overlap(this._overlapSeg1, this._overlapSeg2);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MonotoneChainOverlapAction;
	}
});
