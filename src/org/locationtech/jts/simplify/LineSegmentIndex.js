import Quadtree from '../index/quadtree/Quadtree';
import ItemVisitor from '../index/ItemVisitor';
import LineSegment from '../geom/LineSegment';
import ArrayList from '../../../../java/util/ArrayList';
import Envelope from '../geom/Envelope';
import TaggedLineString from './TaggedLineString';
export default class LineSegmentIndex {
	constructor(...args) {
		this.index = new Quadtree();
		if (args.length === 0) {
			let [] = args;
		}
	}
	get interfaces_() {
		return [];
	}
	remove(seg) {
		this.index.remove(new Envelope(seg.p0, seg.p1), seg);
	}
	add(...args) {
		if (args.length === 1) {
			if (args[0] instanceof TaggedLineString) {
				let [line] = args;
				var segs = line.getSegments();
				for (var i = 0; i < segs.length; i++) {
					var seg = segs[i];
					this.add(seg);
				}
			} else if (args[0] instanceof LineSegment) {
				let [seg] = args;
				this.index.insert(new Envelope(seg.p0, seg.p1), seg);
			}
		}
	}
	query(querySeg) {
		var env = new Envelope(querySeg.p0, querySeg.p1);
		var visitor = new LineSegmentVisitor(querySeg);
		this.index.query(env, visitor);
		var itemsFound = visitor.getItems();
		return itemsFound;
	}
	getClass() {
		return LineSegmentIndex;
	}
}
class LineSegmentVisitor {
	constructor(...args) {
		this.querySeg = null;
		this.items = new ArrayList();
		if (args.length === 1) {
			let [querySeg] = args;
			this.querySeg = querySeg;
		}
	}
	get interfaces_() {
		return [ItemVisitor];
	}
	visitItem(item) {
		var seg = item;
		if (Envelope.intersects(seg.p0, seg.p1, this.querySeg.p0, this.querySeg.p1)) this.items.add(item);
	}
	getItems() {
		return this.items;
	}
	getClass() {
		return LineSegmentVisitor;
	}
}

