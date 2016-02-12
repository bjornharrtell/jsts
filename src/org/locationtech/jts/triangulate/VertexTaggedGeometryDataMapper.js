import Geometry from '../geom/Geometry';
import Collection from '../../../../java/util/Collection';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default class VertexTaggedGeometryDataMapper {
	constructor(...args) {
		this.coordDataMap = new TreeMap();
		switch (args.length) {
			case 0:
				{
					let [] = args;
					break;
				}
		}
	}
	get interfaces_() {
		return [];
	}
	loadSourceGeometries(...args) {
		switch (args.length) {
			case 1:
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					let [geoms] = args;
					for (var i = geoms.iterator(); i.hasNext(); ) {
						var geom = i.next();
						this.loadVertices(geom.getCoordinates(), geom.getUserData());
					}
				} else if (args[0] instanceof Geometry) {
					let [geomColl] = args;
					for (var i = 0; i < geomColl.getNumGeometries(); i++) {
						var geom = geomColl.getGeometryN(i);
						this.loadVertices(geom.getCoordinates(), geom.getUserData());
					}
				}
				break;
		}
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

