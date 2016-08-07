import PolygonExtracter from '../../geom/util/PolygonExtracter';
import STRtree from '../../index/strtree/STRtree';
import Geometry from '../../geom/Geometry';
import hasInterface from '../../../../../hasInterface';
import GeometryFactory from '../../geom/GeometryFactory';
import extend from '../../../../../extend';
import GeometryCombiner from '../../geom/util/GeometryCombiner';
import Polygonal from '../../geom/Polygonal';
import ArrayList from '../../../../../java/util/ArrayList';
import List from '../../../../../java/util/List';
export default function CascadedPolygonUnion() {
	this.inputPolys = null;
	this.geomFactory = null;
	let polys = arguments[0];
	this.inputPolys = polys;
	if (this.inputPolys === null) this.inputPolys = new ArrayList();
}
extend(CascadedPolygonUnion.prototype, {
	reduceToGeometries: function (geomTree) {
		var geoms = new ArrayList();
		for (var i = geomTree.iterator(); i.hasNext(); ) {
			var o = i.next();
			var geom = null;
			if (hasInterface(o, List)) {
				geom = this.unionTree(o);
			} else if (o instanceof Geometry) {
				geom = o;
			}
			geoms.add(geom);
		}
		return geoms;
	},
	extractByEnvelope: function (env, geom, disjointGeoms) {
		var intersectingGeoms = new ArrayList();
		for (var i = 0; i < geom.getNumGeometries(); i++) {
			var elem = geom.getGeometryN(i);
			if (elem.getEnvelopeInternal().intersects(env)) intersectingGeoms.add(elem); else disjointGeoms.add(elem);
		}
		return this.geomFactory.buildGeometry(intersectingGeoms);
	},
	unionOptimized: function (g0, g1) {
		var g0Env = g0.getEnvelopeInternal();
		var g1Env = g1.getEnvelopeInternal();
		if (!g0Env.intersects(g1Env)) {
			var combo = GeometryCombiner.combine(g0, g1);
			return combo;
		}
		if (g0.getNumGeometries() <= 1 && g1.getNumGeometries() <= 1) return this.unionActual(g0, g1);
		var commonEnv = g0Env.intersection(g1Env);
		return this.unionUsingEnvelopeIntersection(g0, g1, commonEnv);
	},
	union: function () {
		if (this.inputPolys === null) throw new IllegalStateException("union() method cannot be called twice");
		if (this.inputPolys.isEmpty()) return null;
		this.geomFactory = this.inputPolys.iterator().next().getFactory();
		var index = new STRtree(CascadedPolygonUnion.STRTREE_NODE_CAPACITY);
		for (var i = this.inputPolys.iterator(); i.hasNext(); ) {
			var item = i.next();
			index.insert(item.getEnvelopeInternal(), item);
		}
		this.inputPolys = null;
		var itemTree = index.itemsTree();
		var unionAll = this.unionTree(itemTree);
		return unionAll;
	},
	binaryUnion: function () {
		if (arguments.length === 1) {
			let geoms = arguments[0];
			return this.binaryUnion(geoms, 0, geoms.size());
		} else if (arguments.length === 3) {
			let geoms = arguments[0], start = arguments[1], end = arguments[2];
			if (end - start <= 1) {
				var g0 = CascadedPolygonUnion.getGeometry(geoms, start);
				return this.unionSafe(g0, null);
			} else if (end - start === 2) {
				return this.unionSafe(CascadedPolygonUnion.getGeometry(geoms, start), CascadedPolygonUnion.getGeometry(geoms, start + 1));
			} else {
				var mid = Math.trunc((end + start) / 2);
				var g0 = this.binaryUnion(geoms, start, mid);
				var g1 = this.binaryUnion(geoms, mid, end);
				return this.unionSafe(g0, g1);
			}
		}
	},
	repeatedUnion: function (geoms) {
		var union = null;
		for (var i = geoms.iterator(); i.hasNext(); ) {
			var g = i.next();
			if (union === null) union = g.copy(); else union = union.union(g);
		}
		return union;
	},
	unionSafe: function (g0, g1) {
		if (g0 === null && g1 === null) return null;
		if (g0 === null) return g1.copy();
		if (g1 === null) return g0.copy();
		return this.unionOptimized(g0, g1);
	},
	unionActual: function (g0, g1) {
		return CascadedPolygonUnion.restrictToPolygons(g0.union(g1));
	},
	unionTree: function (geomTree) {
		var geoms = this.reduceToGeometries(geomTree);
		var union = this.binaryUnion(geoms);
		return union;
	},
	unionUsingEnvelopeIntersection: function (g0, g1, common) {
		var disjointPolys = new ArrayList();
		var g0Int = this.extractByEnvelope(common, g0, disjointPolys);
		var g1Int = this.extractByEnvelope(common, g1, disjointPolys);
		var union = this.unionActual(g0Int, g1Int);
		disjointPolys.add(union);
		var overallUnion = GeometryCombiner.combine(disjointPolys);
		return overallUnion;
	},
	bufferUnion: function () {
		if (arguments.length === 1) {
			let geoms = arguments[0];
			var factory = geoms.get(0).getFactory();
			var gColl = factory.buildGeometry(geoms);
			var unionAll = gColl.buffer(0.0);
			return unionAll;
		} else if (arguments.length === 2) {
			let g0 = arguments[0], g1 = arguments[1];
			var factory = g0.getFactory();
			var gColl = factory.createGeometryCollection([g0, g1]);
			var unionAll = gColl.buffer(0.0);
			return unionAll;
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return CascadedPolygonUnion;
	}
});
CascadedPolygonUnion.restrictToPolygons = function (g) {
	if (hasInterface(g, Polygonal)) {
		return g;
	}
	var polygons = PolygonExtracter.getPolygons(g);
	if (polygons.size() === 1) return polygons.get(0);
	return g.getFactory().createMultiPolygon(GeometryFactory.toPolygonArray(polygons));
};
CascadedPolygonUnion.getGeometry = function (list, index) {
	if (index >= list.size()) return null;
	return list.get(index);
};
CascadedPolygonUnion.union = function (polys) {
	var op = new CascadedPolygonUnion(polys);
	return op.union();
};
CascadedPolygonUnion.STRTREE_NODE_CAPACITY = 4;
