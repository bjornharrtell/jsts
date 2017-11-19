import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction';
import MonotoneChain from '../../index/chain/MonotoneChain';
import ItemVisitor from '../../index/ItemVisitor';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function MCIndexPointSnapper() {
	this._index = null;
	let index = arguments[0];
	this._index = index;
}
extend(MCIndexPointSnapper.prototype, {
	snap: function () {
		if (arguments.length === 1) {
			let hotPixel = arguments[0];
			return this.snap(hotPixel, null, -1);
		} else if (arguments.length === 3) {
			let hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2];
			var pixelEnv = hotPixel.getSafeEnvelope();
			var hotPixelSnapAction = new HotPixelSnapAction(hotPixel, parentEdge, hotPixelVertexIndex);
			this._index.query(pixelEnv, {
				interfaces_: function () {
					return [ItemVisitor];
				},
				visitItem: function (item) {
					var testChain = item;
					testChain.select(pixelEnv, hotPixelSnapAction);
				}
			});
			return hotPixelSnapAction.isNodeAdded();
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return MCIndexPointSnapper;
	}
});
function HotPixelSnapAction() {
	MonotoneChainSelectAction.apply(this);
	this._hotPixel = null;
	this._parentEdge = null;
	this._hotPixelVertexIndex = null;
	this._isNodeAdded = false;
	let hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2];
	this._hotPixel = hotPixel;
	this._parentEdge = parentEdge;
	this._hotPixelVertexIndex = hotPixelVertexIndex;
}
inherits(HotPixelSnapAction, MonotoneChainSelectAction);
extend(HotPixelSnapAction.prototype, {
	isNodeAdded: function () {
		return this._isNodeAdded;
	},
	select: function () {
		if (arguments.length === 2 && (Number.isInteger(arguments[1]) && arguments[0] instanceof MonotoneChain)) {
			let mc = arguments[0], startIndex = arguments[1];
			var ss = mc.getContext();
			if (this._parentEdge !== null) {
				if (ss === this._parentEdge && startIndex === this._hotPixelVertexIndex) return null;
			}
			this._isNodeAdded = this._hotPixel.addSnappedNode(ss, startIndex);
		} else return MonotoneChainSelectAction.prototype.select.apply(this, arguments);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return HotPixelSnapAction;
	}
});
MCIndexPointSnapper.HotPixelSnapAction = HotPixelSnapAction;
