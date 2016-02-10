import WKTWriter from '../../io/WKTWriter';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
import Comparator from '../../../../../java/util/Comparator';
export default class IntervalRTreeNode {
	constructor(...args) {
		this.min = Double.POSITIVE_INFINITY;
		this.max = Double.NEGATIVE_INFINITY;
	}
	get interfaces_() {
		return [];
	}
	static get NodeComparator() {
		return NodeComparator;
	}
	getMin() {
		return this.min;
	}
	intersects(queryMin, queryMax) {
		if (this.min > queryMax || this.max < queryMin) return false;
		return true;
	}
	getMax() {
		return this.max;
	}
	toString() {
		return WKTWriter.toLineString(new Coordinate(this.min, 0), new Coordinate(this.max, 0));
	}
	getClass() {
		return IntervalRTreeNode;
	}
}
class NodeComparator {
	get interfaces_() {
		return [Comparator];
	}
	compare(o1, o2) {
		var n1 = o1;
		var n2 = o2;
		var mid1 = (n1.min + n1.max) / 2;
		var mid2 = (n2.min + n2.max) / 2;
		if (mid1 < mid2) return -1;
		if (mid1 > mid2) return 1;
		return 0;
	}
	getClass() {
		return NodeComparator;
	}
}

