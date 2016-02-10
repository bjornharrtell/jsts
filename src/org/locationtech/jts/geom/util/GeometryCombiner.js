import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryCombiner {
	constructor(...args) {
		this.geomFactory = null;
		this.skipEmpty = false;
		this.inputGeoms = null;
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geoms] = args;
						this.geomFactory = GeometryCombiner.extractFactory(geoms);
						this.inputGeoms = geoms;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static combine(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					return ((...args) => {
						let [geoms] = args;
						var combiner = new GeometryCombiner(geoms);
						return combiner.combine();
					})(...args);
				case 2:
					return ((...args) => {
						let [g0, g1] = args;
						var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1));
						return combiner.combine();
					})(...args);
				case 3:
					return ((...args) => {
						let [g0, g1, g2] = args;
						var combiner = new GeometryCombiner(GeometryCombiner.createList(g0, g1, g2));
						return combiner.combine();
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	static extractFactory(geoms) {
		if (geoms.isEmpty()) return null;
		return geoms.iterator().next().getFactory();
	}
	static createList(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					return ((...args) => {
						let [obj0, obj1] = args;
						var list = new ArrayList();
						list.add(obj0);
						list.add(obj1);
						return list;
					})(...args);
				case 3:
					return ((...args) => {
						let [obj0, obj1, obj2] = args;
						var list = new ArrayList();
						list.add(obj0);
						list.add(obj1);
						list.add(obj2);
						return list;
					})(...args);
			}
		};
		return overloads.apply(this, args);
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

