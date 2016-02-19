import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
import Envelope from '../../geom/Envelope';
export default function MonotoneChainOverlapAction() {
	this.tempEnv1 = new Envelope();
	this.tempEnv2 = new Envelope();
	this.overlapSeg1 = new LineSegment();
	this.overlapSeg2 = new LineSegment();
}
extend(MonotoneChainOverlapAction.prototype, {
	overlap: function () {
		if (arguments.length === 2) {
			let seg1 = arguments[0], seg2 = arguments[1];
		} else if (arguments.length === 4) {
			let mc1 = arguments[0], start1 = arguments[1], mc2 = arguments[2], start2 = arguments[3];
			mc1.getLineSegment(start1, this.overlapSeg1);
			mc2.getLineSegment(start2, this.overlapSeg2);
			this.overlap(this.overlapSeg1, this.overlapSeg2);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MonotoneChainOverlapAction;
	}
});

