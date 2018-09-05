import Geometry from '../geom/Geometry';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default class VertexTaggedGeometryDataMapper {
	constructor() {
		VertexTaggedGeometryDataMapper.constructor_.apply(this, arguments);
	}
	loadSourceGeometries() {
		if (hasInterface(arguments[0], Collection)) {
			let geoms = arguments[0];
			for (var i = geoms.iterator(); i.hasNext(); ) {
				var geom = i.next();
				this.loadVertices(geom.getCoordinates(), geom.getUserData());
			}
		} else if (arguments[0] instanceof Geometry) {
			let geomColl = arguments[0];
			for (var i = 0; i < geomColl.getNumGeometries(); i++) {
				var geom = geomColl.getGeometryN(i);
				this.loadVertices(geom.getCoordinates(), geom.getUserData());
			}
		}
	}
	getCoordinates() {
		return new ArrayList(this._coordDataMap.keySet());
	}
	transferData(targetGeom) {
		for (var i = 0; i < targetGeom.getNumGeometries(); i++) {
			var geom = targetGeom.getGeometryN(i);
			var vertexKey = geom.getUserData();
			if (vertexKey === null) continue;
			geom.setUserData(this._coordDataMap.get(vertexKey));
		}
	}
	loadVertices(pts, data) {
		for (var i = 0; i < pts.length; i++) {
			this._coordDataMap.put(pts[i], data);
		}
	}
	getClass() {
		return VertexTaggedGeometryDataMapper;
	}
	get interfaces_() {
		return [];
	}
}
VertexTaggedGeometryDataMapper.constructor_ = function () {
	this._coordDataMap = new TreeMap();
};
