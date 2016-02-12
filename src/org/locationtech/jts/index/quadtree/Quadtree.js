import Root from './Root';
import SpatialIndex from '../SpatialIndex';
import ArrayList from '../../../../../java/util/ArrayList';
import ArrayListVisitor from '../ArrayListVisitor';
import Serializable from '../../../../../java/io/Serializable';
import Envelope from '../../geom/Envelope';
export default class Quadtree {
	constructor(...args) {
		this.root = null;
		this.minExtent = 1.0;
		if (args.length === 0) {
			let [] = args;
			this.root = new Root();
		}
	}
	get interfaces_() {
		return [SpatialIndex, Serializable];
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
		if (this.root !== null) return this.root.size();
		return 0;
	}
	insert(itemEnv, item) {
		this.collectStats(itemEnv);
		var insertEnv = Quadtree.ensureExtent(itemEnv, this.minExtent);
		this.root.insert(insertEnv, item);
	}
	query(...args) {
		if (args.length === 1) {
			let [searchEnv] = args;
			var visitor = new ArrayListVisitor();
			this.query(searchEnv, visitor);
			return visitor.getItems();
		} else if (args.length === 2) {
			let [searchEnv, visitor] = args;
			this.root.visit(searchEnv, visitor);
		}
	}
	queryAll() {
		var foundItems = new ArrayList();
		this.root.addAllItems(foundItems);
		return foundItems;
	}
	remove(itemEnv, item) {
		var posEnv = Quadtree.ensureExtent(itemEnv, this.minExtent);
		return this.root.remove(posEnv, item);
	}
	collectStats(itemEnv) {
		var delX = itemEnv.getWidth();
		if (delX < this.minExtent && delX > 0.0) this.minExtent = delX;
		var delY = itemEnv.getHeight();
		if (delY < this.minExtent && delY > 0.0) this.minExtent = delY;
	}
	depth() {
		if (this.root !== null) return this.root.depth();
		return 0;
	}
	isEmpty() {
		if (this.root === null) return true;
		return false;
	}
	getClass() {
		return Quadtree;
	}
}
Quadtree.serialVersionUID = -7461163625812743604;

