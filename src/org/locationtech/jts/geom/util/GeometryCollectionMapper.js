import GeometryFactory from '../GeometryFactory';
import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryCollectionMapper {
	constructor(...args) {
		this.mapOp = null;
		switch (args.length) {
			case 1:
				return ((...args) => {
					let [mapOp] = args;
					this.mapOp = mapOp;
				})(...args);
		}
	}
	get interfaces_() {
		return [];
	}
	static map(gc, op) {
		var mapper = new GeometryCollectionMapper(op);
		return mapper.map(gc);
	}
	map(gc) {
		var mapped = new ArrayList();
		for (var i = 0; i < gc.getNumGeometries(); i++) {
			var g = this.mapOp.map(gc.getGeometryN(i));
			if (!g.isEmpty()) mapped.add(g);
		}
		return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped));
	}
	getClass() {
		return GeometryCollectionMapper;
	}
}

