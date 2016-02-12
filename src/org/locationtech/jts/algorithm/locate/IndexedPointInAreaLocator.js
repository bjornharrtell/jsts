import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException';
import ItemVisitor from '../../index/ItemVisitor';
import PointOnGeometryLocator from './PointOnGeometryLocator';
import SortedPackedIntervalRTree from '../../index/intervalrtree/SortedPackedIntervalRTree';
import LineSegment from '../../geom/LineSegment';
import Polygonal from '../../geom/Polygonal';
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter';
import ArrayListVisitor from '../../index/ArrayListVisitor';
import RayCrossingCounter from '../RayCrossingCounter';
export default class IndexedPointInAreaLocator {
	constructor(...args) {
		this.index = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [g] = args;
					if (!(g.interfaces_ && g.interfaces_.indexOf(Polygonal) > -1)) throw new IllegalArgumentException("Argument must be Polygonal");
					this.index = new IntervalIndexedGeometry(g);
				})(...args);
		}
	}
	get interfaces_() {
		return [PointOnGeometryLocator];
	}
	static get SegmentVisitor() {
		return SegmentVisitor;
	}
	static get IntervalIndexedGeometry() {
		return IntervalIndexedGeometry;
	}
	locate(p) {
		var rcc = new RayCrossingCounter(p);
		var visitor = new SegmentVisitor(rcc);
		this.index.query(p.y, p.y, visitor);
		return rcc.getLocation();
	}
	getClass() {
		return IndexedPointInAreaLocator;
	}
}
class SegmentVisitor {
	constructor(...args) {
		this.counter = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [counter] = args;
					this.counter = counter;
				})(...args);
		}
	}
	get interfaces_() {
		return [ItemVisitor];
	}
	visitItem(item) {
		var seg = item;
		this.counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
	}
	getClass() {
		return SegmentVisitor;
	}
}
class IntervalIndexedGeometry {
	constructor(...args) {
		this.index = new SortedPackedIntervalRTree();
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [geom] = args;
					this.init(geom);
				})(...args);
		}
	}
	get interfaces_() {
		return [];
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
			this.index.insert(min, max, seg);
		}
	}
	query(...args) {
		switch (args.length) {
			case 2:
				return ((...args) => {
					let [min, max] = args;
					var visitor = new ArrayListVisitor();
					this.index.query(min, max, visitor);
					return visitor.getItems();
				})(...args);
			case 3:
				return ((...args) => {
					let [min, max, visitor] = args;
					this.index.query(min, max, visitor);
				})(...args);
		}
	}
	getClass() {
		return IntervalIndexedGeometry;
	}
}

