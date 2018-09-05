import Boundable from './Boundable';
import Serializable from '../../../../../java/io/Serializable';
export default class ItemBoundable {
	constructor() {
		ItemBoundable.constructor_.apply(this, arguments);
	}
	getItem() {
		return this._item;
	}
	getBounds() {
		return this._bounds;
	}
	getClass() {
		return ItemBoundable;
	}
	get interfaces_() {
		return [Boundable, Serializable];
	}
}
ItemBoundable.constructor_ = function () {
	this._bounds = null;
	this._item = null;
	let bounds = arguments[0], item = arguments[1];
	this._bounds = bounds;
	this._item = item;
};
