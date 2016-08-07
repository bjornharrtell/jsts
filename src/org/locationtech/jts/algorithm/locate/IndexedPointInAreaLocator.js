import hasInterface from '../../../../../hasInterface';
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import ItemVisitor from '../../index/ItemVisitor';
import PointOnGeometryLocator from './PointOnGeometryLocator';
import extend from '../../../../../extend';
import SortedPackedIntervalRTree from '../../index/intervalrtree/SortedPackedIntervalRTree';
import LineSegment from '../../geom/LineSegment';
import Polygonal from '../../geom/Polygonal';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import ArrayListVisitor from '../../index/ArrayListVisitor';
import RayCrossingCounter from '../RayCrossingCounter';
export default function IndexedPointInAreaLocator() {
	this.index = null;
	let g = arguments[0];
	if (!hasInterface(g, Polygonal)) throw new IllegalArgumentException("Argument must be Polygonal");
	this.index = new IntervalIndexedGeometry(g);
}
extend(IndexedPointInAreaLocator.prototype, {
	locate: function (p) {
		var rcc = new RayCrossingCounter(p);
		var visitor = new SegmentVisitor(rcc);
		this.index.query(p.y, p.y, visitor);
		return rcc.getLocation();
	},
	interfaces_: function () {
		return [PointOnGeometryLocator];
	},
	getClass: function () {
		return IndexedPointInAreaLocator;
	}
});
function SegmentVisitor() {
	this.counter = null;
	let counter = arguments[0];
	this.counter = counter;
}
extend(SegmentVisitor.prototype, {
	visitItem: function (item) {
		var seg = item;
		this.counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
	},
	interfaces_: function () {
		return [ItemVisitor];
	},
	getClass: function () {
		return SegmentVisitor;
	}
});
function IntervalIndexedGeometry() {
	this.index = new SortedPackedIntervalRTree();
	let geom = arguments[0];
	this.init(geom);
}
extend(IntervalIndexedGeometry.prototype, {
	init: function (geom) {
		var lines = LinearComponentExtracter.getLines(geom);
		for (var i = lines.iterator(); i.hasNext(); ) {
			var line = i.next();
			var pts = line.getCoordinates();
			this.addLine(pts);
		}
	},
	addLine: function (pts) {
		for (var i = 1; i < pts.length; i++) {
			var seg = new LineSegment(pts[i - 1], pts[i]);
			var min = Math.min(seg.p0.y, seg.p1.y);
			var max = Math.max(seg.p0.y, seg.p1.y);
			this.index.insert(min, max, seg);
		}
	},
	query: function () {
		if (arguments.length === 2) {
			let min = arguments[0], max = arguments[1];
			var visitor = new ArrayListVisitor();
			this.index.query(min, max, visitor);
			return visitor.getItems();
		} else if (arguments.length === 3) {
			let min = arguments[0], max = arguments[1], visitor = arguments[2];
			this.index.query(min, max, visitor);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return IntervalIndexedGeometry;
	}
});
IndexedPointInAreaLocator.SegmentVisitor = SegmentVisitor;
IndexedPointInAreaLocator.IntervalIndexedGeometry = IntervalIndexedGeometry;
