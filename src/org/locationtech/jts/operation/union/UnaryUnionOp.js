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
	this._polygons = new ArrayList();
	this._lines = new ArrayList();
	this._points = new ArrayList();
	this._geomFact = null;
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
		this._geomFact = geomFact;
		this.extract(geoms);
	}
}
extend(UnaryUnionOp.prototype, {
	unionNoOpt: function (g0) {
		var empty = this._geomFact.createPoint();
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
			if (this._geomFact === null) this._geomFact = geom.getFactory();
			GeometryExtracter.extract(geom, Geometry.TYPENAME_POLYGON, this._polygons);
			GeometryExtracter.extract(geom, Geometry.TYPENAME_LINESTRING, this._lines);
			GeometryExtracter.extract(geom, Geometry.TYPENAME_POINT, this._points);
		}
	},
	union: function () {
		if (this._geomFact === null) {
			return null;
		}
		var unionPoints = null;
		if (this._points.size() > 0) {
			var ptGeom = this._geomFact.buildGeometry(this._points);
			unionPoints = this.unionNoOpt(ptGeom);
		}
		var unionLines = null;
		if (this._lines.size() > 0) {
			var lineGeom = this._geomFact.buildGeometry(this._lines);
			unionLines = this.unionNoOpt(lineGeom);
		}
		var unionPolygons = null;
		if (this._polygons.size() > 0) {
			unionPolygons = CascadedPolygonUnion.union(this._polygons);
		}
		var unionLA = this.unionWithNull(unionLines, unionPolygons);
		var union = null;
		if (unionPoints === null) union = unionLA; else if (unionLA === null) union = unionPoints; else union = PointGeometryUnion.union(unionPoints, unionLA);
		if (union === null) return this._geomFact.createGeometryCollection();
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
