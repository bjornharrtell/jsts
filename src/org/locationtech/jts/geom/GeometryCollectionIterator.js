import Iterator from '../../../../java/util/Iterator';
import NoSuchElementException from '../../../../java/util/NoSuchElementException';
import extend from '../../../../extend';
import GeometryCollection from './GeometryCollection';
export default function GeometryCollectionIterator() {
	this.parent = null;
	this.atStart = null;
	this.max = null;
	this.index = null;
	this.subcollectionIterator = null;
	let parent = arguments[0];
	this.parent = parent;
	this.atStart = true;
	this.index = 0;
	this.max = parent.getNumGeometries();
}
extend(GeometryCollectionIterator.prototype, {
	next: function () {
		if (this.atStart) {
			this.atStart = false;
			if (GeometryCollectionIterator.isAtomic(this.parent)) this.index++;
			return this.parent;
		}
		if (this.subcollectionIterator !== null) {
			if (this.subcollectionIterator.hasNext()) {
				return this.subcollectionIterator.next();
			} else {
				this.subcollectionIterator = null;
			}
		}
		if (this.index >= this.max) {
			throw new NoSuchElementException();
		}
		var obj = this.parent.getGeometryN(this.index++);
		if (obj instanceof GeometryCollection) {
			this.subcollectionIterator = new GeometryCollectionIterator(obj);
			return this.subcollectionIterator.next();
		}
		return obj;
	},
	remove: function () {
		throw new UnsupportedOperationException(this.getClass().getName());
	},
	hasNext: function () {
		if (this.atStart) {
			return true;
		}
		if (this.subcollectionIterator !== null) {
			if (this.subcollectionIterator.hasNext()) {
				return true;
			}
			this.subcollectionIterator = null;
		}
		if (this.index >= this.max) {
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

