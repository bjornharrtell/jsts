import hasInterface from '../../../../../hasInterface';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import ItemVisitor from '../../index/ItemVisitor';
import PointOnGeometryLocator from './PointOnGeometryLocator';
import LinearRing from '../../geom/LinearRing';
import SortedPackedIntervalRTree from '../../index/intervalrtree/SortedPackedIntervalRTree';
import LineSegment from '../../geom/LineSegment';
import Polygonal from '../../geom/Polygonal';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import ArrayListVisitor from '../../index/ArrayListVisitor';
import RayCrossingCounter from '../RayCrossingCounter';
export default class IndexedPointInAreaLocator {
	constructor() {
		IndexedPointInAreaLocator.constructor_.apply(this, arguments);
	}
	locate(p) {
		var rcc = new RayCrossingCounter(p);
		var visitor = new SegmentVisitor(rcc);
		this._index.query(p.y, p.y, visitor);
		return rcc.getLocation();
	}
	getClass() {
		return IndexedPointInAreaLocator;
	}
	get interfaces_() {
		return [PointOnGeometryLocator];
	}
}
class SegmentVisitor {
	constructor() {
		SegmentVisitor.constructor_.apply(this, arguments);
	}
	visitItem(item) {
		var seg = item;
		this._counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
	}
	getClass() {
		return SegmentVisitor;
	}
	get interfaces_() {
		return [ItemVisitor];
	}
}
SegmentVisitor.constructor_ = function () {
	this._counter = null;
	let counter = arguments[0];
	this._counter = counter;
};
class IntervalIndexedGeometry {
	constructor() {
		IntervalIndexedGeometry.constructor_.apply(this, arguments);
	}
	init(geom) {
		var lines = LinearComponentExtracter.getLines(geom);
		for (var i = lines.iterator(); i.hasNext(); ) {
			var line = i.next();
			var pts = line.getCoordinates();
			this.addLine(pts);
		}
	}
	addLine(pts) {
		for (var i = 1; i < pts.length; i++) {
			var seg = new LineSegment(pts[i - 1], pts[i]);
			var min = Math.min(seg.p0.y, seg.p1.y);
			var max = Math.max(seg.p0.y, seg.p1.y);
			this._index.insert(min, max, seg);
		}
	}
	query() {
		if (arguments.length === 2) {
			let min = arguments[0], max = arguments[1];
			var visitor = new ArrayListVisitor();
			this._index.query(min, max, visitor);
			return visitor.getItems();
		} else if (arguments.length === 3) {
			let min = arguments[0], max = arguments[1], visitor = arguments[2];
			this._index.query(min, max, visitor);
		}
	}
	getClass() {
		return IntervalIndexedGeometry;
	}
	get interfaces_() {
		return [];
	}
}
IntervalIndexedGeometry.constructor_ = function () {
	this._index = new SortedPackedIntervalRTree();
	let geom = arguments[0];
	this.init(geom);
};
IndexedPointInAreaLocator.SegmentVisitor = SegmentVisitor;
IndexedPointInAreaLocator.IntervalIndexedGeometry = IntervalIndexedGeometry;
IndexedPointInAreaLocator.constructor_ = function () {
	this._index = null;
	let g = arguments[0];
	if (!(hasInterface(g, Polygonal) || g instanceof LinearRing)) throw new IllegalArgumentException("Argument must be Polygonal or LinearRing");
	this._index = new IntervalIndexedGeometry(g);
};
