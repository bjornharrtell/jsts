import Geometry from '../../geom/Geometry'
import PointGeometryUnion from './PointGeometryUnion'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import SnapIfNeededOverlayOp from '../overlay/snap/SnapIfNeededOverlayOp'
import InputExtracter from './InputExtracter'
import OverlayOp from '../overlay/OverlayOp'
import CascadedPolygonUnion from './CascadedPolygonUnion'
export default class UnaryUnionOp {
  constructor() {
    UnaryUnionOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFact = null
    this._extracter = null
    if (arguments.length === 1) {
      if (hasInterface(arguments[0], Collection)) {
        const geoms = arguments[0]
        this.extract(geoms)
      } else if (arguments[0] instanceof Geometry) {
        const geom = arguments[0]
        this.extract(geom)
      }
    } else if (arguments.length === 2) {
      const geoms = arguments[0], geomFact = arguments[1]
      this._geomFact = geomFact
      this.extract(geoms)
    }
  }
  static union() {
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
      const geoms = arguments[0], geomFact = arguments[1]
      const op = new UnaryUnionOp(geoms, geomFact)
      return op.union()
    }
  }
  unionNoOpt(g0) {
    const empty = this._geomFact.createPoint()
    return SnapIfNeededOverlayOp.overlayOp(g0, empty, OverlayOp.UNION)
  }
  unionWithNull(g0, g1) {
    if (g0 === null && g1 === null) return null
    if (g1 === null) return g0
    if (g0 === null) return g1
    return g0.union(g1)
  }
  extract() {
    if (hasInterface(arguments[0], Collection)) {
      const geoms = arguments[0]
      this._extracter = InputExtracter.extract(geoms)
    } else if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      this._extracter = InputExtracter.extract(geom)
    }
  }
  union() {
    if (this._geomFact === null) this._geomFact = this._extracter.getFactory()
    if (this._geomFact === null) 
      return null
    
    if (this._extracter.isEmpty()) 
      return this._geomFact.createEmpty(this._extracter.getDimension())
    
    const points = this._extracter.getExtract(0)
    const lines = this._extracter.getExtract(1)
    const polygons = this._extracter.getExtract(2)
    let unionPoints = null
    if (points.size() > 0) {
      const ptGeom = this._geomFact.buildGeometry(points)
      unionPoints = this.unionNoOpt(ptGeom)
    }
    let unionLines = null
    if (lines.size() > 0) {
      const lineGeom = this._geomFact.buildGeometry(lines)
      unionLines = this.unionNoOpt(lineGeom)
    }
    let unionPolygons = null
    if (polygons.size() > 0) 
      unionPolygons = CascadedPolygonUnion.union(polygons)
    
    const unionLA = this.unionWithNull(unionLines, unionPolygons)
    let union = null
    if (unionPoints === null) union = unionLA; else if (unionLA === null) union = unionPoints; else union = PointGeometryUnion.union(unionPoints, unionLA)
    if (union === null) return this._geomFact.createGeometryCollection()
    return union
  }
}
