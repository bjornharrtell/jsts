import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction';
import MonotoneChain from '../../index/chain/MonotoneChain';
import ItemVisitor from '../../index/ItemVisitor';
export default class MCIndexPointSnapper {
	constructor() {
		MCIndexPointSnapper.constructor_.apply(this, arguments);
	}
	snap() {
		if (arguments.length === 1) {
			let hotPixel = arguments[0];
			return this.snap(hotPixel, null, -1);
		} else if (arguments.length === 3) {
			let hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2];
			var pixelEnv = hotPixel.getSafeEnvelope();
			var hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex);
			this._index.query(pixelEnv, new (class {
				get interfaces_() {
					return [ItemVisitor];
				}
				visitItem(item) {
					var testChain = item;
					testChain.select(pixelEnv, hotPixelSnapAction);
				}
			})());
			return hotPixelSnapAction.isNodeAdded();
		}
	}
	getClass() {
		return MCIndexPointSnapper;
	}
	get interfaces_() {
		return [];
	}
}
class HotPixelSnapAction extends MonotoneChainSelectAction {
	constructor() {
		super();
		HotPixelSnapAction.constructor_.apply(this, arguments);
	}
	isNodeAdded() {
		return this._isNodeAdded;
	}
	select() {
		if (arguments.length === 2 && (Number.isInteger(arguments[1]) && arguments[0] instanceof MonotoneChain)) {
			let mc = arguments[0], startIndex = arguments[1];
			var ss = mc.getContext();
			if (this._parentEdge !== null) {
				if (ss === this._parentEdge && startIndex === this._hotPixelVertexIndex) return null;
			}
			this._isNodeAdded = this._hotPixel.addSnappedNode(ss, startIndex);
		} else return super.select.apply(this, arguments);
	}
	getClass() {
		return HotPixelSnapAction;
	}
	get interfaces_() {
		return [];
	}
}
HotPixelSnapAction.constructor_ = function () {
	this._hotPixel = null;
	this._parentEdge = null;
	this._hotPixelVertexIndex = null;
	this._isNodeAdded = false;
	let hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2];
	this._hotPixel = hotPixel;
	this._parentEdge = parentEdge;
	this._hotPixelVertexIndex = hotPixelVertexIndex;
};
MCIndexPointSnapper.HotPixelSnapAction = HotPixelSnapAction;
MCIndexPointSnapper.constructor_ = function () {
	this._index = null;
	let index = arguments[0];
	this._index = index;
};
