import LineSegment from '../../geom/LineSegment';
export default class MonotoneChainSelectAction {
	constructor() {
		MonotoneChainSelectAction.constructor_.apply(this, arguments);
	}
	select() {
		if (arguments.length === 1) {
			let seg = arguments[0];
		} else if (arguments.length === 2) {
			let mc = arguments[0], startIndex = arguments[1];
			mc.getLineSegment(startIndex, this.selectedSegment);
			this.select(this.selectedSegment);
		}
	}
	getClass() {
		return MonotoneChainSelectAction;
	}
	get interfaces_() {
		return [];
	}
}
MonotoneChainSelectAction.constructor_ = function () {
	this.selectedSegment = new LineSegment();
};
