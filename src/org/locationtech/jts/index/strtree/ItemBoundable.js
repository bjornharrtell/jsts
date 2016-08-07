import Boundable from './Boundable';
import extend from '../../../../../extend';
import Serializable from '../../../../../java/io/Serializable';
export default function ItemBoundable() {
	this.bounds = null;
	this.item = null;
	let bounds = arguments[0], item = arguments[1];
	this.bounds = bounds;
	this.item = item;
}
extend(ItemBoundable.prototype, {
	getItem: function () {
		return this.item;
	},
	getBounds: function () {
		return this.bounds;
	},
	interfaces_: function () {
		return [Boundable, Serializable];
	},
	getClass: function () {
		return ItemBoundable;
	}
});
