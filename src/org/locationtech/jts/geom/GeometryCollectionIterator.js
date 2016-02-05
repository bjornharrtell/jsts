import Iterator from '../../../../java/util/Iterator';
import NoSuchElementException from '../../../../java/util/NoSuchElementException';
import GeometryCollection from './GeometryCollection';
export default class GeometryCollectionIterator {
	constructor(...args) {
		(() => {
			this.parent = null;
			this.atStart = null;
			this.max = null;
			this.index = null;
			this.subcollectionIterator = null;
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [parent] = args;
						this.parent = parent;
						this.atStart = true;
						this.index = 0;
						this.max = parent.getNumGeometries();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [Iterator];
	}
	static isAtomic(geom) {
		return !(geom instanceof GeometryCollection);
	}
	next() {
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
	}
	remove() {
		throw new UnsupportedOperationException(this.getClass().getName());
	}
	hasNext() {
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
	}
	getClass() {
		return GeometryCollectionIterator;
	}
}

