import SnapIfNeededOverlayOp from '../overlay/snap/SnapIfNeededOverlayOp'
import OverlayOp from '../overlay/OverlayOp'
export default class UnionOp {
  get interfaces_() {
    return []
  }

  getClass() {
    return UnionOp
  }

  static union(g, other) {
    if (g.isEmpty() || other.isEmpty()) {
      if (g.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, g, other, g.getFactory())
      if (g.isEmpty()) return other.copy()
      if (other.isEmpty()) return g.copy()
    }
    g.checkNotGeometryCollection(g)
    g.checkNotGeometryCollection(other)
    return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.UNION)
  }
}
