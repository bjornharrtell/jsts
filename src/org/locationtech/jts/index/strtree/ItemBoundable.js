import Boundable from './Boundable';
import extend from '../../../../../extend';
import Serializable from '../../../../../java/io/Serializable';
export default function ItemBoundable() {
	this._bounds = null;
	this._item = null;
	let bounds = arguments[0], item = arguments[1];
	this._bounds = bounds;
	this._item = item;
}
extend(ItemBoundable.prototype, {
	getItem: function () {
		return this._item;
	},
	getBounds: function () {
		return this._bounds;
	},
	interfaces_: function () {
		return [Boundable, Serializable];
	},
	getClass: function () {
		return ItemBoundable;
	}
});
