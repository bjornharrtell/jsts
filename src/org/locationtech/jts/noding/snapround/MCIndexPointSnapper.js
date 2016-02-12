import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction';
import ItemVisitor from '../../index/ItemVisitor';
export default class MCIndexPointSnapper {
	constructor(...args) {
		this.index = null;
		if (args.length === 1) {
			let [index] = args;
			this.index = index;
		}
	}
	get interfaces_() {
		return [];
	}
	static get HotPixelSnapAction() {
		return HotPixelSnapAction;
	}
	snap(...args) {
		if (args.length === 1) {
			let [hotPixel] = args;
			return this.snap(hotPixel, null, -1);
		} else if (args.length === 3) {
			let [hotPixel, parentEdge, hotPixelVertexIndex] = args;
			var pixelEnv = hotPixel.getSafeEnvelope();
			var hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex);
			this.index.query(pixelEnv, new (class {
				visitItem(item) {
					var testChain = item;
					testChain.select(pixelEnv, hotPixelSnapAction);
				}
				get interfaces_() {
					return [ItemVisitor];
				}
			})());
			return hotPixelSnapAction.isNodeAdded();
		}
	}
	getClass() {
		return MCIndexPointSnapper;
	}
}
class HotPixelSnapAction extends MonotoneChainSelectAction {
	constructor(...args) {
		super();
		this.hotPixel = null;
		this.parentEdge = null;
		this.hotPixelVertexIndex = null;
		this._isNodeAdded = false;
		if (args.length === 3) {
			let [hotPixel, parentEdge, hotPixelVertexIndex] = args;
			this.hotPixel = hotPixel;
			this.parentEdge = parentEdge;
			this.hotPixelVertexIndex = hotPixelVertexIndex;
		}
	}
	get interfaces_() {
		return [];
	}
	isNodeAdded() {
		return this._isNodeAdded;
	}
	select(...args) {
		if (args.length === 2) {
			let [mc, startIndex] = args;
			var ss = mc.getContext();
			if (this.parentEdge !== null) {
				if (ss === this.parentEdge && startIndex === this.hotPixelVertexIndex) return null;
			}
			this._isNodeAdded = this.hotPixel.addSnappedNode(ss, startIndex);
		} else return super.select(...args);
	}
	getClass() {
		return HotPixelSnapAction;
	}
}

