import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction';
import ItemVisitor from '../../index/ItemVisitor';
export default class MCIndexPointSnapper {
	constructor(...args) {
		this.index = null;
		switch (args.length) {
			case 1:
				{
					let [index] = args;
					this.index = index;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	static get HotPixelSnapAction() {
		return HotPixelSnapAction;
	}
	snap(...args) {
		switch (args.length) {
			case 1:
				{
					let [hotPixel] = args;
					return this.snap(hotPixel, null, -1);
					break;
				}
			case 3:
				{
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
					break;
				}
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
		switch (args.length) {
			case 3:
				{
					let [hotPixel, parentEdge, hotPixelVertexIndex] = args;
					this.hotPixel = hotPixel;
					this.parentEdge = parentEdge;
					this.hotPixelVertexIndex = hotPixelVertexIndex;
					break;
				}
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

