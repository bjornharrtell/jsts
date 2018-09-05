import Root from './Root';
import SpatialIndex from '../SpatialIndex';
import ArrayList from '../../../../../java/util/ArrayList';
import ArrayListVisitor from '../ArrayListVisitor';
import Serializable from '../../../../../java/io/Serializable';
import Envelope from '../../geom/Envelope';
export default class Quadtree {
	constructor() {
		Quadtree.constructor_.apply(this, arguments);
	}
	static ensureExtent(itemEnv, minExtent) {
		var minx = itemEnv.getMinX();
		var maxx = itemEnv.getMaxX();
		var miny = itemEnv.getMinY();
		var maxy = itemEnv.getMaxY();
		if (minx !== maxx && miny !== maxy) return itemEnv;
		if (minx === maxx) {
			minx = minx - minExtent / 2.0;
			maxx = minx + minExtent / 2.0;
		}
		if (miny === maxy) {
			miny = miny - minExtent / 2.0;
			maxy = miny + minExtent / 2.0;
		}
		return new Envelope(minx, maxx, miny, maxy);
	}
	size() {
		if (this._root !== null) return this._root.size();
		return 0;
	}
	insert(itemEnv, item) {
		this.collectStats(itemEnv);
		var insertEnv = Quadtree.ensureExtent(itemEnv, this._minExtent);
		this._root.insert(insertEnv, item);
	}
	query() {
		if (arguments.length === 1) {
			let searchEnv = arguments[0];
			var visitor = new ArrayListVisitor();
			this.query(searchEnv, visitor);
			return visitor.getItems();
		} else if (arguments.length === 2) {
			let searchEnv = arguments[0], visitor = arguments[1];
			this._root.visit(searchEnv, visitor);
		}
	}
	queryAll() {
		var foundItems = new ArrayList();
		this._root.addAllItems(foundItems);
		return foundItems;
	}
	remove(itemEnv, item) {
		var posEnv = Quadtree.ensureExtent(itemEnv, this._minExtent);
		return this._root.remove(posEnv, item);
	}
	collectStats(itemEnv) {
		var delX = itemEnv.getWidth();
		if (delX < this._minExtent && delX > 0.0) this._minExtent = delX;
		var delY = itemEnv.getHeight();
		if (delY < this._minExtent && delY > 0.0) this._minExtent = delY;
	}
	depth() {
		if (this._root !== null) return this._root.depth();
		return 0;
	}
	isEmpty() {
		if (this._root === null) return true;
		return this._root.isEmpty();
	}
	getClass() {
		return Quadtree;
	}
	get interfaces_() {
		return [SpatialIndex, Serializable];
	}
}
Quadtree.constructor_ = function () {
	this._root = null;
	this._minExtent = 1.0;
	this._root = new Root();
};
Quadtree.serialVersionUID = -7461163625812743604;
