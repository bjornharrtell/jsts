import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryCombiner {
	constructor(...args) {
		this.geomFactory = null;
		this.skipEmpty = false;
		this.inputGeoms = null;
		if (args.length === 1) {
			let [geoms] = args;
			this.geomFactory = GeometryCombiner.extractFactory(geoms);
			this.inputGeoms = geoms;
		}
	}
	get interfaces_() {
		return [];
	}
	static combine(...args) {
		if (args.length === 1) {
			let [geoms] = args;
			var combiner = new GeometryCombiner(geoms);
			return combiner.combine();
		} else if (args.length === 2) {
			let [g0, g1] = args;
			var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1));
			return combiner.combine();
		} else if (args.length === 3) {
			let [g0, g1, g2] = args;
			var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1, g2));
			return combiner.combine();
		}
	}
	static extractFactory(geoms) {
		if (geoms.isEmpty()) return null;
		return geoms.iterator().next().getFactory();
	}
	static createList(...args) {
		if (args.length === 2) {
			let [obj0, obj1] = args;
			var list = new ArrayList();
			list.add(obj0);
			list.add(obj1);
			return list;
		} else if (args.length === 3) {
			let [obj0, obj1, obj2] = args;
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
			if (this.skipEmpty && elemGeom.isEmpty()) continue;
			elems.add(elemGeom);
		}
	}
	combine() {
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
	}
	getClass() {
		return GeometryCombiner;
	}
}

