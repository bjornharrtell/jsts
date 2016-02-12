import LineSegment from '../../geom/LineSegment';
import Envelope from '../../geom/Envelope';
export default class MonotoneChainSelectAction {
	constructor(...args) {
		this.tempEnv1 = new Envelope();
		this.selectedSegment = new LineSegment();
	}
	get interfaces_() {
		return [];
	}
	select(...args) {
		if (args.length === 1) {
			let [seg] = args;
		} else if (args.length === 2) {
			let [mc, startIndex] = args;
			mc.getLineSegment(startIndex, this.selectedSegment);
			this.select(this.selectedSegment);
		}
	}
	getClass() {
		return MonotoneChainSelectAction;
	}
}

