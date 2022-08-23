import Geometry from '../../geom/Geometry.js'
import SnapIfNeededOverlayOp from '../overlay/snap/SnapIfNeededOverlayOp.js'
import OverlayOp from '../overlay/OverlayOp.js'
export default class UnionOp {
  static union(g, other) {
    if (g.isEmpty() || other.isEmpty()) {
      if (g.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, g, other, g.getFactory())
      if (g.isEmpty()) return other.copy()
      if (other.isEmpty()) return g.copy()
    }
    Geometry.checkNotGeometryCollection(g)
    Geometry.checkNotGeometryCollection(other)
    return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.UNION)
  }
}
