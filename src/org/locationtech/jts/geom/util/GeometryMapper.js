import Geometry from '../Geometry';
import Collection from '../../../../../java/util/Collection';
import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryMapper {
	get interfaces_() {
		return [];
	}
	static map(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 2:
					if (args[0] instanceof Geometry && (args[1].interfaces_ && args[1].interfaces_.indexOf(MapOp) > -1)) {
						return ((...args) => {
							let [geom, op] = args;
							var mapped = new ArrayList();
							for (var i = 0; i < geom.getNumGeometries(); i++) {
								var g = op.map(geom.getGeometryN(i));
								if (g !== null) mapped.add(g);
							}
							return geom.getFactory().buildGeometry(mapped);
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(MapOp) > -1)) {
						return ((...args) => {
							let [geoms, op] = args;
							var mapped = new ArrayList();
							for (var i = geoms.iterator(); i.hasNext(); ) {
								var g = i.next();
								var gr = op.map(g);
								if (gr !== null) mapped.add(gr);
							}
							return mapped;
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getClass() {
		return GeometryMapper;
	}
}

