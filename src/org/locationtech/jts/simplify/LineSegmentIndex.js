import Quadtree from '../index/quadtree/Quadtree';
import ItemVisitor from '../index/ItemVisitor';
import LineSegment from '../geom/LineSegment';
import ArrayList from '../../../../java/util/ArrayList';
import Envelope from '../geom/Envelope';
import TaggedLineString from './TaggedLineString';
export default class LineSegmentIndex {
	constructor() {
		LineSegmentIndex.constructor_.apply(this, arguments);
	}
	remove(seg) {
		this._index.remove(new Envelope(seg.p0, seg.p1), seg);
	}
	add() {
		if (arguments[0] instanceof TaggedLineString) {
			let line = arguments[0];
			var segs = line.getSegments();
			for (var i = 0; i < segs.length; i++) {
				var seg = segs[i];
				this.add(seg);
			}
		} else if (arguments[0] instanceof LineSegment) {
			let seg = arguments[0];
			this._index.insert(new Envelope(seg.p0, seg.p1), seg);
		}
	}
	query(querySeg) {
		var env = new Envelope(querySeg.p0, querySeg.p1);
		var visitor = new LineSegmentVisitor(querySeg);
		this._index.query(env, visitor);
		var itemsFound = visitor.getItems();
		return itemsFound;
	}
	getClass() {
		return LineSegmentIndex;
	}
	get interfaces_() {
		return [];
	}
}
LineSegmentIndex.constructor_ = function () {
	this._index = new Quadtree();
};
class LineSegmentVisitor {
	constructor() {
		LineSegmentVisitor.constructor_.apply(this, arguments);
	}
	visitItem(item) {
		var seg = item;
		if (Envelope.intersects(seg.p0, seg.p1, this._querySeg.p0, this._querySeg.p1)) this._items.add(item);
	}
	getItems() {
		return this._items;
	}
	getClass() {
		return LineSegmentVisitor;
	}
	get interfaces_() {
		return [ItemVisitor];
	}
}
LineSegmentVisitor.constructor_ = function () {
	this._querySeg = null;
	this._items = new ArrayList();
	let querySeg = arguments[0];
	this._querySeg = querySeg;
};
