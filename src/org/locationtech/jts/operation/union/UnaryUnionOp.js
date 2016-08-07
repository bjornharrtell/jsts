import Geometry from '../../geom/Geometry';
import PointGeometryUnion from './PointGeometryUnion';
import hasInterface from '../../../../../hasInterface';
import Collection from '../../../../../java/util/Collection';
import SnapIfNeededOverlayOp from '../overlay/snap/SnapIfNeededOverlayOp';
import extend from '../../../../../extend';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryExtracter from '../../geom/util/GeometryExtracter';
import OverlayOp from '../overlay/OverlayOp';
import CascadedPolygonUnion from './CascadedPolygonUnion';
export default function UnaryUnionOp() {
	this.polygons = new ArrayList();
	this.lines = new ArrayList();
	this.points = new ArrayList();
	this.geomFact = null;
	if (arguments.length === 1) {
		if (hasInterface(arguments[0], Collection)) {
			let geoms = arguments[0];
			this.extract(geoms);
		} else if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			this.extract(geom);
		}
	} else if (arguments.length === 2) {
		let geoms = arguments[0], geomFact = arguments[1];
		this.geomFact = geomFact;
		this.extract(geoms);
	}
}
extend(UnaryUnionOp.prototype, {
	unionNoOpt: function (g0) {
		var empty = this.geomFact.createPoint();
		return SnapIfNeededOverlayOp.overlayOp(g0, empty, OverlayOp.UNION);
	},
	unionWithNull: function (g0, g1) {
		if (g0 === null && g1 === null) return null;
		if (g1 === null) return g0;
		if (g0 === null) return g1;
		return g0.union(g1);
	},
	extract: function () {
		if (hasInterface(arguments[0], Collection)) {
			let geoms = arguments[0];
			for (var i = geoms.iterator(); i.hasNext(); ) {
				var geom = i.next();
				this.extract(geom);
			}
		} else if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			if (this.geomFact === null) this.geomFact = geom.getFactory();
			GeometryExtracter.extract(geom, Geometry.SORTINDEX_POLYGON, this.polygons);
			GeometryExtracter.extract(geom, Geometry.SORTINDEX_LINESTRING, this.lines);
			GeometryExtracter.extract(geom, Geometry.SORTINDEX_POINT, this.points);
		}
	},
	union: function () {
		if (this.geomFact === null) {
			return null;
		}
		var unionPoints = null;
		if (this.points.size() > 0) {
			var ptGeom = this.geomFact.buildGeometry(this.points);
			unionPoints = this.unionNoOpt(ptGeom);
		}
		var unionLines = null;
		if (this.lines.size() > 0) {
			var lineGeom = this.geomFact.buildGeometry(this.lines);
			unionLines = this.unionNoOpt(lineGeom);
		}
		var unionPolygons = null;
		if (this.polygons.size() > 0) {
			unionPolygons = CascadedPolygonUnion.union(this.polygons);
		}
		var unionLA = this.unionWithNull(unionLines, unionPolygons);
		var union = null;
		if (unionPoints === null) union = unionLA; else if (unionLA === null) union = unionPoints; else union = PointGeometryUnion.union(unionPoints, unionLA);
		if (union === null) return this.geomFact.createGeometryCollection();
		return union;
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return UnaryUnionOp;
	}
});
UnaryUnionOp.union = function () {
	if (arguments.length === 1) {
		if (hasInterface(arguments[0], Collection)) {
			let geoms = arguments[0];
			var op = new UnaryUnionOp(geoms);
			return op.union();
		} else if (arguments[0] instanceof Geometry) {
			let geom = arguments[0];
			var op = new UnaryUnionOp(geom);
			return op.union();
		}
	} else if (arguments.length === 2) {
		let geoms = arguments[0], geomFact = arguments[1];
		var op = new UnaryUnionOp(geoms, geomFact);
		return op.union();
	}
};
