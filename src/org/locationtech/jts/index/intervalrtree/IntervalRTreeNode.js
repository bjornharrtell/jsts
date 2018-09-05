import WKTWriter from '../../io/WKTWriter';
import Coordinate from '../../geom/Coordinate';
import Double from '../../../../../java/lang/Double';
import Comparator from '../../../../../java/util/Comparator';
export default class IntervalRTreeNode {
	constructor() {
		IntervalRTreeNode.constructor_.apply(this, arguments);
	}
	getMin() {
		return this._min;
	}
	intersects(queryMin, queryMax) {
		if (this._min > queryMax || this._max < queryMin) return false;
		return true;
	}
	getMax() {
		return this._max;
	}
	toString() {
		return WKTWriter.toLineString(new Coordinate(this._min, 0), new Coordinate(this._max, 0));
	}
	getClass() {
		return IntervalRTreeNode;
	}
	get interfaces_() {
		return [];
	}
}
class NodeComparator {
	constructor() {
		NodeComparator.constructor_.apply(this, arguments);
	}
	compare(o1, o2) {
		var n1 = o1;
		var n2 = o2;
		var mid1 = (n1._min + n1._max) / 2;
		var mid2 = (n2._min + n2._max) / 2;
		if (mid1 < mid2) return -1;
		if (mid1 > mid2) return 1;
		return 0;
	}
	getClass() {
		return NodeComparator;
	}
	get interfaces_() {
		return [Comparator];
	}
}
NodeComparator.constructor_ = function () {};
IntervalRTreeNode.NodeComparator = NodeComparator;
IntervalRTreeNode.constructor_ = function () {
	this._min = Double.POSITIVE_INFINITY;
	this._max = Double.NEGATIVE_INFINITY;
};
