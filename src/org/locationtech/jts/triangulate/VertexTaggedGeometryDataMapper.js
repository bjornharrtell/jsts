import Geometry from '../geom/Geometry';
import Collection from '../../../../java/util/Collection';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default class VertexTaggedGeometryDataMapper {
	constructor(...args) {
		(() => {
			this.coordDataMap = new TreeMap();
		})();
		const overloads = (...args) => {
			switch (args.length) {
				case 0:
					return ((...args) => {
						let [] = args;
					})(...args);
			}
		};
		return overloads.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	loadSourceGeometries(...args) {
		const overloads = (...args) => {
			switch (args.length) {
				case 1:
					if (args[0] instanceof Geometry) {
						return ((...args) => {
							let [geomColl] = args;
							for (var i = 0; i < geomColl.getNumGeometries(); i++) {
								var geom = geomColl.getGeometryN(i);
								this.loadVertices(geom.getCoordinates(), geom.getUserData());
							}
						})(...args);
					} else if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
						return ((...args) => {
							let [geoms] = args;
							for (var i = geoms.iterator(); i.hasNext(); ) {
								var geom = i.next();
								this.loadVertices(geom.getCoordinates(), geom.getUserData());
							}
						})(...args);
					}
			}
		};
		return overloads.apply(this, args);
	}
	getCoordinates() {
		return new ArrayList(this.coordDataMap.keySet());
	}
	transferData(targetGeom) {
		for (var i = 0; i < targetGeom.getNumGeometries(); i++) {
			var geom = targetGeom.getGeometryN(i);
			var vertexKey = geom.getUserData();
			if (vertexKey === null) continue;
			geom.setUserData(this.coordDataMap.get(vertexKey));
		}
	}
	loadVertices(pts, data) {
		for (var i = 0; i < pts.length; i++) {
			this.coordDataMap.put(pts[i], data);
		}
	}
	getClass() {
		return VertexTaggedGeometryDataMapper;
	}
}

