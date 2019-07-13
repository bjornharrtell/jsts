import Geometry from '../../geom/Geometry'
import PointGeometryUnion from './PointGeometryUnion'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import SnapIfNeededOverlayOp from '../overlay/snap/SnapIfNeededOverlayOp'
import ArrayList from '../../../../../java/util/ArrayList'
import GeometryExtracter from '../../geom/util/GeometryExtracter'
import OverlayOp from '../overlay/OverlayOp'
import CascadedPolygonUnion from './CascadedPolygonUnion'
export default class UnaryUnionOp {
  constructor () {
    UnaryUnionOp.constructor_.apply(this, arguments)
  }

  static union () {
    if (arguments.length === 1) {
      if (hasInterface(arguments[0], Collection)) {
        const geoms = arguments[0]
        const op = new UnaryUnionOp(geoms)
        return op.union()
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0]
        const op = new UnaryUnionOp(geom)
        return op.union()
      }
    } else if (arguments.length === 2) {
      const geoms = arguments[0]; const geomFact = arguments[1]
      const op = new UnaryUnionOp(geoms, geomFact)
      return op.union()
    }
  }

  unionNoOpt (g0) {
    const empty = this._geomFact.createPoint()
    return SnapIfNeededOverlayOp.overlayOp(g0, empty, OverlayOp.UNION)
  }

  unionWithNull (g0, g1) {
    if (g0 === null && g1 === null) return null
    if (g1 === null) return g0
    if (g0 === null) return g1
    return g0.union(g1)
  }

  extract () {
    if (hasInterface(arguments[0], Collection)) {
      const geoms = arguments[0]
      for (let i = geoms.iterator(); i.hasNext();) {
        const geom = i.next()
        this.extract(geom)
      }
    } else if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      if (this._geomFact === null) this._geomFact = geom.getFactory()
      GeometryExtracter.extract(geom, Geometry.TYPENAME_POLYGON, this._polygons)
      GeometryExtracter.extract(geom, Geometry.TYPENAME_LINESTRING, this._lines)
      GeometryExtracter.extract(geom, Geometry.TYPENAME_POINT, this._points)
    }
  }

  union () {
    if (this._geomFact === null) {
      return null
    }
    let unionPoints = null
    if (this._points.size() > 0) {
      const ptGeom = this._geomFact.buildGeometry(this._points)
      unionPoints = this.unionNoOpt(ptGeom)
    }
    let unionLines = null
    if (this._lines.size() > 0) {
      const lineGeom = this._geomFact.buildGeometry(this._lines)
      unionLines = this.unionNoOpt(lineGeom)
    }
    let unionPolygons = null
    if (this._polygons.size() > 0) {
      unionPolygons = CascadedPolygonUnion.union(this._polygons)
    }
    const unionLA = this.unionWithNull(unionLines, unionPolygons)
    let union = null
    if (unionPoints === null) union = unionLA; else if (unionLA === null) union = unionPoints; else union = PointGeometryUnion.union(unionPoints, unionLA)
    if (union === null) return this._geomFact.createGeometryCollection()
    return union
  }

  getClass () {
    return UnaryUnionOp
  }

  get interfaces_ () {
    return []
  }
}
UnaryUnionOp.constructor_ = function () {
  this._polygons = new ArrayList()
  this._lines = new ArrayList()
  this._points = new ArrayList()
  this._geomFact = null
  if (arguments.length === 1) {
    if (hasInterface(arguments[0], Collection)) {
      const geoms = arguments[0]
      this.extract(geoms)
    } else if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      this.extract(geom)
    }
  } else if (arguments.length === 2) {
    const geoms = arguments[0]; const geomFact = arguments[1]
    this._geomFact = geomFact
    this.extract(geoms)
  }
}
