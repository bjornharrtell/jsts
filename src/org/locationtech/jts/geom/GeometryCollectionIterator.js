import Iterator from '../../../../java/util/Iterator';
import NoSuchElementException from '../../../../java/util/NoSuchElementException';
import extend from '../../../../extend';
import GeometryCollection from './GeometryCollection';
export default function GeometryCollectionIterator() {
	this._parent = null;
	this._atStart = null;
	this._max = null;
	this._index = null;
	this._subcollectionIterator = null;
	let parent = arguments[0];
	this._parent = parent;
	this._atStart = true;
	this._index = 0;
	this._max = parent.getNumGeometries();
}
extend(GeometryCollectionIterator.prototype, {
	next: function () {
		if (this._atStart) {
			this._atStart = false;
			if (GeometryCollectionIterator.isAtomic(this._parent)) this._index++;
			return this._parent;
		}
		if (this._subcollectionIterator !== null) {
			if (this._subcollectionIterator.hasNext()) {
				return this._subcollectionIterator.next();
			} else {
				this._subcollectionIterator = null;
			}
		}
		if (this._index >= this._max) {
			throw new NoSuchElementException();
		}
		var obj = this._parent.getGeometryN(this._index++);
		if (obj instanceof GeometryCollection) {
			this._subcollectionIterator = new GeometryCollectionIterator(obj);
			return this._subcollectionIterator.next();
		}
		return obj;
	},
	remove: function () {
		throw new UnsupportedOperationException(this.getClass().getName());
	},
	hasNext: function () {
		if (this._atStart) {
			return true;
		}
		if (this._subcollectionIterator !== null) {
			if (this._subcollectionIterator.hasNext()) {
				return true;
			}
			this._subcollectionIterator = null;
		}
		if (this._index >= this._max) {
			return false;
		}
		return true;
	},
	interfaces_: function () {
		return [Iterator];
	},
	getClass: function () {
		return GeometryCollectionIterator;
	}
});
GeometryCollectionIterator.isAtomic = function (geom) {
	return !(geom instanceof GeometryCollection);
};
