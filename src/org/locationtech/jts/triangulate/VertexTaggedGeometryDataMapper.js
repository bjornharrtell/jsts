import Geometry from '../geom/Geometry';
import hasInterface from '../../../../hasInterface';
import Collection from '../../../../java/util/Collection';
import extend from '../../../../extend';
import ArrayList from '../../../../java/util/ArrayList';
import TreeMap from '../../../../java/util/TreeMap';
export default function VertexTaggedGeometryDataMapper() {
	this.coordDataMap = new TreeMap();
}
extend(VertexTaggedGeometryDataMapper.prototype, {
	loadSourceGeometries: function () {
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
	},
	getCoordinates: function () {
		return new ArrayList(this.coordDataMap.keySet());
	},
	transferData: function (targetGeom) {
		for (var i = 0; i < targetGeom.getNumGeometries(); i++) {
			var geom = targetGeom.getGeometryN(i);
			var vertexKey = geom.getUserData();
			if (vertexKey === null) continue;
			geom.setUserData(this.coordDataMap.get(vertexKey));
		}
	},
	loadVertices: function (pts, data) {
		for (var i = 0; i < pts.length; i++) {
			this.coordDataMap.put(pts[i], data);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return VertexTaggedGeometryDataMapper;
	}
});
