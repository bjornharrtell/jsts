import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryCombiner {
	constructor() {
		GeometryCombiner.constructor_.apply(this, arguments);
	}
	static combine() {
		if (arguments.length === 1) {
			let geoms = arguments[0];
			var combiner = new GeometryCombiner(geoms);
			return combiner.combine();
		} else if (arguments.length === 2) {
			let g0 = arguments[0], g1 = arguments[1];
			var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1));
			return combiner.combine();
		} else if (arguments.length === 3) {
			let g0 = arguments[0], g1 = arguments[1], g2 = arguments[2];
			var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1, g2));
			return combiner.combine();
		}
	}
	static extractFactory(geoms) {
		if (geoms.isEmpty()) return null;
		return geoms.iterator().next().getFactory();
	}
	static createList() {
		if (arguments.length === 2) {
			let obj0 = arguments[0], obj1 = arguments[1];
			var list = new ArrayList();
			list.add(obj0);
			list.add(obj1);
			return list;
		} else if (arguments.length === 3) {
			let obj0 = arguments[0], obj1 = arguments[1], obj2 = arguments[2];
			var list = new ArrayList();
			list.add(obj0);
			list.add(obj1);
			list.add(obj2);
			return list;
		}
	}
	extractElements(geom, elems) {
		if (geom === null) return null;
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var elemGeom = geom.getGeometryN(i);
			if (this._skipEmpty && elemGeom.isEmpty()) continue;
			elems.add(elemGeom);
		}
	}
	combine() {
		var elems = new ArrayList();
		for (var i = this._inputGeoms.iterator(); i.hasNext(); ) {
			var g = i.next();
			this.extractElements(g, elems);
		}
		if (elems.size() === 0) {
			if (this._geomFactory !== null) {
				return this._geomFactory.createGeometryCollection();
			}
			return null;
		}
		return this._geomFactory.buildGeometry(elems);
	}
	getClass() {
		return GeometryCombiner;
	}
	get interfaces_() {
		return [];
	}
}
GeometryCombiner.constructor_ = function () {
	this._geomFactory = null;
	this._skipEmpty = false;
	this._inputGeoms = null;
	let geoms = arguments[0];
	this._geomFactory = GeometryCombiner.extractFactory(geoms);
	this._inputGeoms = geoms;
};
