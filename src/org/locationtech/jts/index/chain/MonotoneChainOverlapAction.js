import LineSegment from '../../geom/LineSegment';
import Envelope from '../../geom/Envelope';
export default class MonotoneChainOverlapAction {
	constructor(...args) {
		(() => {
			this.tempEnv1 = new Envelope();
			this.tempEnv2 = new Envelope();
			this.overlapSeg1 = new LineSegment();
			this.overlapSeg2 = new LineSegment();
		})();
	}
	get interfaces_() {
		return [];
	}
	overlap(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [seg1, seg2] = args;
					})(...args);
				case 4:
					return ((...args) => {
						let [mc1, start1, mc2, start2] = args;
						mc1.getLineSegment(start1, this.overlapSeg1);
						mc2.getLineSegment(start2, this.overlapSeg2);
						this.overlap(this.overlapSeg1, this.overlapSeg2);
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return MonotoneChainOverlapAction;
	}
}

