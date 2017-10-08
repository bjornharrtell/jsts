import Root from './Root';
import SpatialIndex from '../SpatialIndex';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import ArrayListVisitor from '../ArrayListVisitor';
import Serializable from '../../../../../java/io/Serializable';
import Envelope from '../../geom/Envelope';
export default function Quadtree() {
	this._root = null;
	this._minExtent = 1.0;
	this._root = new Root();
}
extend(Quadtree.prototype, {
	size: function () {
		if (this._root !== null) return this._root.size();
		return 0;
	},
	insert: function (itemEnv, item) {
		this.collectStats(itemEnv);
		var insertEnv = Quadtree.ensureExtent(itemEnv, this._minExtent);
		this._root.insert(insertEnv, item);
	},
	query: function () {
		if (arguments.length === 1) {
			let searchEnv = arguments[0];
			var visitor = new ArrayListVisitor();
			this.query(searchEnv, visitor);
			return visitor.getItems();
		} else if (arguments.length === 2) {
			let searchEnv = arguments[0], visitor = arguments[1];
			this._root.visit(searchEnv, visitor);
		}
	},
	queryAll: function () {
		var foundItems = new ArrayList();
		this._root.addAllItems(foundItems);
		return foundItems;
	},
	remove: function (itemEnv, item) {
		var posEnv = Quadtree.ensureExtent(itemEnv, this._minExtent);
		return this._root.remove(posEnv, item);
	},
	collectStats: function (itemEnv) {
		var delX = itemEnv.getWidth();
		if (delX < this._minExtent && delX > 0.0) this._minExtent = delX;
		var delY = itemEnv.getHeight();
		if (delY < this._minExtent && delY > 0.0) this._minExtent = delY;
	},
	depth: function () {
		if (this._root !== null) return this._root.depth();
		return 0;
	},
	isEmpty: function () {
		if (this._root === null) return true;
		return false;
	},
	interfaces_: function () {
		return [SpatialIndex, Serializable];
	},
	getClass: function () {
		return Quadtree;
	}
});
Quadtree.ensureExtent = function (itemEnv, minExtent) {
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
};
Quadtree.serialVersionUID = -7461163625812743604;
