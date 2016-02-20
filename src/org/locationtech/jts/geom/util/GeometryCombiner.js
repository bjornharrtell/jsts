import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
export default function GeometryCombiner() {
	this.geomFactory = null;
	this.skipEmpty = false;
	this.inputGeoms = null;
	let geoms = arguments[0];
	this.geomFactory = GeometryCombiner.extractFactory(geoms);
	this.inputGeoms = geoms;
}
extend(GeometryCombiner.prototype, {
	extractElements: function (geom, elems) {
		if (geom === null) return null;
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var elemGeom = geom.getGeometryN(i);
			if (this.skipEmpty && elemGeom.isEmpty()) continue;
			elems.add(elemGeom);
		}
	},
	combine: function () {
		var elems = new ArrayList();
		for (var i = this.inputGeoms.iterator(); i.hasNext(); ) {
			var g = i.next();
			this.extractElements(g, elems);
		}
		if (elems.size() === 0) {
			if (this.geomFactory !== null) {
				return this.geomFactory.createGeometryCollection(null);
			}
			return null;
		}
		return this.geomFactory.buildGeometry(elems);
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return GeometryCombiner;
	}
});
GeometryCombiner.combine = function () {
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
};
GeometryCombiner.extractFactory = function (geoms) {
	if (geoms.isEmpty()) return null;
	return geoms.iterator().next().getFactory();
};
GeometryCombiner.createList = function () {
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
};

