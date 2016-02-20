import MonotoneChainSelectAction from '../../index/chain/MonotoneChainSelectAction';
import ItemVisitor from '../../index/ItemVisitor';
import extend from '../../../../../extend';
import inherits from '../../../../../inherits';
export default function MCIndexPointSnapper() {
	this.index = null;
	let index = arguments[0];
	this.index = index;
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
			this.index.query(pixelEnv, {
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
	this.hotPixel = null;
	this.parentEdge = null;
	this.hotPixelVertexIndex = null;
	this._isNodeAdded = false;
	let hotPixel = arguments[0], parentEdge = arguments[1], hotPixelVertexIndex = arguments[2];
	this.hotPixel = hotPixel;
	this.parentEdge = parentEdge;
	this.hotPixelVertexIndex = hotPixelVertexIndex;
}
inherits(HotPixelSnapAction, MonotoneChainSelectAction);
extend(HotPixelSnapAction.prototype, {
	isNodeAdded: function () {
		return this._isNodeAdded;
	},
	select: function () {
		if (arguments.length === 2) {
			let mc = arguments[0], startIndex = arguments[1];
			var ss = mc.getContext();
			if (this.parentEdge !== null) {
				if (ss === this.parentEdge && startIndex === this.hotPixelVertexIndex) return null;
			}
			this._isNodeAdded = this.hotPixel.addSnappedNode(ss, startIndex);
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

