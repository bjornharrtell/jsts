import LineString from '../../geom/LineString';
import Geometry from '../../geom/Geometry';
import PointGeometryUnion from './PointGeometryUnion';
import Collection from '../../../../../java/util/Collection';
import Point from '../../geom/Point';
import Polygon from '../../geom/Polygon';
import SnapIfNeededOverlayOp from '../overlay/snap/SnapIfNeededOverlayOp';
import ArrayList from '../../../../../java/util/ArrayList';
import GeometryExtracter from '../../geom/util/GeometryExtracter';
import OverlayOp from '../overlay/OverlayOp';
import CascadedPolygonUnion from './CascadedPolygonUnion';
export default class UnaryUnionOp {
	constructor(...args) {
		this.polygons = new ArrayList();
		this.lines = new ArrayList();
		this.points = new ArrayList();
		this.geomFact = null;
		const overloaded = (...args) => {
			if (args.length === 1) {
				if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
					let [geoms] = args;
					this.extract(geoms);
				} else if (args[0] instanceof Geometry) {
					let [geom] = args;
					this.extract(geom);
				}
			} else if (args.length === 2) {
				let [geoms, geomFact] = args;
				this.geomFact = geomFact;
				this.extract(geoms);
			}
		};
		return overloaded.apply(this, args);
	}
	get interfaces_() {
		return [];
	}
	static union(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geoms] = args;
				var op = new UnaryUnionOp(geoms);
				return op.union();
			} else if (args[0] instanceof Geometry) {
				let [geom] = args;
				var op = new UnaryUnionOp(geom);
				return op.union();
			}
		} else if (args.length === 2) {
			let [geoms, geomFact] = args;
			var op = new UnaryUnionOp(geoms, geomFact);
			return op.union();
		}
	}
	unionNoOpt(g0) {
		var empty = this.geomFact.createPoint();
		return SnapIfNeededOverlayOp.overlayOp(g0, empty, OverlayOp.UNION);
	}
	unionWithNull(g0, g1) {
		if (g0 === null && g1 === null) return null;
		if (g1 === null) return g0;
		if (g0 === null) return g1;
		return g0.union(g1);
	}
	extract(...args) {
		if (args.length === 1) {
			if (args[0].interfaces_ && args[0].interfaces_.indexOf(Collection) > -1) {
				let [geoms] = args;
				for (var i = geoms.iterator(); i.hasNext(); ) {
					var geom = i.next();
					this.extract(geom);
				}
			} else if (args[0] instanceof Geometry) {
				let [geom] = args;
				if (this.geomFact === null) this.geomFact = geom.getFactory();
				GeometryExtracter.extract(geom, Polygon, this.polygons);
				GeometryExtracter.extract(geom, LineString, this.lines);
				GeometryExtracter.extract(geom, Point, this.points);
			}
		}
	}
	union() {
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
		if (union === null) return this.geomFact.createGeometryCollection(null);
		return union;
	}
	getClass() {
		return UnaryUnionOp;
	}
}

