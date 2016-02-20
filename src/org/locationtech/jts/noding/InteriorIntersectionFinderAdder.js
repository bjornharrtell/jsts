import extend from '../../../../extend';
import SegmentIntersector from './SegmentIntersector';
import ArrayList from '../../../../java/util/ArrayList';
export default function InteriorIntersectionFinderAdder() {
	this.li = null;
	this.interiorIntersections = null;
	let li = arguments[0];
	this.li = li;
	this.interiorIntersections = new ArrayList();
}
extend(InteriorIntersectionFinderAdder.prototype, {
	processIntersections: function (e0, segIndex0, e1, segIndex1) {
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
	},
	isDone: function () {
		return false;
	},
	getInteriorIntersections: function () {
		return this.interiorIntersections;
	},
	interfaces_: function () {
		return [SegmentIntersector];
	},
	getClass: function () {
		return InteriorIntersectionFinderAdder;
	}
});

