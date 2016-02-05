import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../java/util/ArrayList';
export default class InteriorIntersectionFinderAdder {
	constructor(...args) {
		(() => {
			this.li = null;
			this.interiorIntersections = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [li] = args;
						this.li = li;
						this.interiorIntersections = new ArrayList();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [SegmentIntersector];
	}
	processIntersections(e0, segIndex0, e1, segIndex1) {
		if (e0 === e1 && segIndex0 === segIndex1) return null;
		var p00 = e0.getCoordinates()[segIndex0];
		var p01 = e0.getCoordinates()[segIndex0 + 1];
		var p10 = e1.getCoordinates()[segIndex1];
		var p11 = e1.getCoordinates()[segIndex1 + 1];
		this.li.computeIntersection(p00, p01, p10, p11);
		if (this.li.hasIntersection()) {
			if (this.li.isInteriorIntersection()) {
				for (var intIndex = 0; intIndex < this.li.getIntersectionNum(); intIndex++) {
					this.interiorIntersections.add(this.li.getIntersection(intIndex));
				}
				e0.addIntersections(this.li, segIndex0, 0);
				e1.addIntersections(this.li, segIndex1, 1);
			}
		}
	}
	isDone() {
		return false;
	}
	getInteriorIntersections() {
		return this.interiorIntersections;
	}
	getClass() {
		return InteriorIntersectionFinderAdder;
	}
}

