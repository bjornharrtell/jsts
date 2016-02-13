import Geometry from '../Geometry';
import Collection from '../../../../../java/util/Collection';
import ArrayList from '../../../../../java/util/ArrayList';
export default class GeometryMapper {
	get interfaces_() {
		return [];
	}
	static get MapOp() {
		return MapOp;
	}
	static map(...args) {
		if (args.length === 2) {
			if (args[0] instanceof Geometry && (args[1].interfaces_ && args[1].interfaces_.indexOf(MapOp) > -1)) {
				let [geom, op] = args;
				var mapped = new ArrayList();
				for (var i = 0; i < geom.getNumGeometries(); i++) {
					var g = op.map(geom.getGeometryN(i));
					if (g !== null) mapped.add(g);
				}
				return geom.getFactory().buildGeometry(mapped);
			} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1 && (args[1].interfaces_ && args[1].interfaces_.indexOf(MapOp) > -1)) {
				let [geoms, op] = args;
				var mapped = new ArrayList();
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var g = i.next();
					var gr = op.map(g);
					if (gr !== null) mapped.add(gr);
				}
				return mapped;
			}
		}
	}
	getClass() {
		return GeometryMapper;
	}
}
class MapOp {}

