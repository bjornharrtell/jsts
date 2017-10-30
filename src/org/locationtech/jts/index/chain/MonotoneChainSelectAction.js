import extend from '../../../../../extend';
import LineSegment from '../../geom/LineSegment';
export default function MonotoneChainSelectAction() {
	this.selectedSegment = new LineSegment();
}
extend(MonotoneChainSelectAction.prototype, {
	select: function () {
		if (arguments.length === 1) {
			let seg = arguments[0];
		} else if (arguments.length === 2) {
			let mc = arguments[0], startIndex = arguments[1];
			mc.getLineSegment(startIndex, this.selectedSegment);
			this.select(this.selectedSegment);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MonotoneChainSelectAction;
	}
});
