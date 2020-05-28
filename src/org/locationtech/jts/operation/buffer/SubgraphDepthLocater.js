import hasInterface from '../../../../../hasInterface'
import Position from '../../geomgraph/Position'
import Coordinate from '../../geom/Coordinate'
import Orientation from '../../algorithm/Orientation'
import Collections from '../../../../../java/util/Collections'
import DirectedEdge from '../../geomgraph/DirectedEdge'
import LineSegment from '../../geom/LineSegment'
import Comparable from '../../../../../java/lang/Comparable'
import ArrayList from '../../../../../java/util/ArrayList'
import List from '../../../../../java/util/List'
export default class SubgraphDepthLocater {
  constructor() {
    SubgraphDepthLocater.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._subgraphs = null
    this._seg = new LineSegment()
    const subgraphs = arguments[0]
    this._subgraphs = subgraphs
  }
  findStabbedSegments() {
    if (arguments.length === 1) {
      const stabbingRayLeftPt = arguments[0]
      const stabbedSegments = new ArrayList()
      for (let i = this._subgraphs.iterator(); i.hasNext(); ) {
        const bsg = i.next()
        const env = bsg.getEnvelope()
        if (stabbingRayLeftPt.y < env.getMinY() || stabbingRayLeftPt.y > env.getMaxY()) continue
        this.findStabbedSegments(stabbingRayLeftPt, bsg.getDirectedEdges(), stabbedSegments)
      }
      return stabbedSegments
    } else if (arguments.length === 3) {
      if (hasInterface(arguments[2], List) && (arguments[0] instanceof Coordinate && arguments[1] instanceof DirectedEdge)) {
        const stabbingRayLeftPt = arguments[0], dirEdge = arguments[1], stabbedSegments = arguments[2]
        const pts = dirEdge.getEdge().getCoordinates()
        for (let i = 0; i < pts.length - 1; i++) {
          this._seg.p0 = pts[i]
          this._seg.p1 = pts[i + 1]
          if (this._seg.p0.y > this._seg.p1.y) this._seg.reverse()
          const maxx = Math.max(this._seg.p0.x, this._seg.p1.x)
          if (maxx < stabbingRayLeftPt.x) continue
          if (this._seg.isHorizontal()) continue
          if (stabbingRayLeftPt.y < this._seg.p0.y || stabbingRayLeftPt.y > this._seg.p1.y) continue
          if (Orientation.index(this._seg.p0, this._seg.p1, stabbingRayLeftPt) === Orientation.RIGHT) continue
          let depth = dirEdge.getDepth(Position.LEFT)
          if (!this._seg.p0.equals(pts[i])) depth = dirEdge.getDepth(Position.RIGHT)
          const ds = new DepthSegment(this._seg, depth)
          stabbedSegments.add(ds)
        }
      } else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Coordinate && hasInterface(arguments[1], List))) {
        const stabbingRayLeftPt = arguments[0], dirEdges = arguments[1], stabbedSegments = arguments[2]
        for (let i = dirEdges.iterator(); i.hasNext(); ) {
          const de = i.next()
          if (!de.isForward()) continue
          this.findStabbedSegments(stabbingRayLeftPt, de, stabbedSegments)
        }
      }
    }
  }
  getDepth(p) {
    const stabbedSegments = this.findStabbedSegments(p)
    if (stabbedSegments.size() === 0) return 0
    const ds = Collections.min(stabbedSegments)
    return ds._leftDepth
  }
}
class DepthSegment {
  constructor() {
    DepthSegment.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._upwardSeg = null
    this._leftDepth = null
    const seg = arguments[0], depth = arguments[1]
    this._upwardSeg = new LineSegment(seg)
    this._leftDepth = depth
  }
  compareTo(obj) {
    const other = obj
    if (this._upwardSeg.minX() >= other._upwardSeg.maxX()) return 1
    if (this._upwardSeg.maxX() <= other._upwardSeg.minX()) return -1
    let orientIndex = this._upwardSeg.orientationIndex(other._upwardSeg)
    if (orientIndex !== 0) return orientIndex
    orientIndex = -1 * other._upwardSeg.orientationIndex(this._upwardSeg)
    if (orientIndex !== 0) return orientIndex
    return this._upwardSeg.compareTo(other._upwardSeg)
  }
  compareX(seg0, seg1) {
    const compare0 = seg0.p0.compareTo(seg1.p0)
    if (compare0 !== 0) return compare0
    return seg0.p1.compareTo(seg1.p1)
  }
  toString() {
    return this._upwardSeg.toString()
  }
  get interfaces_() {
    return [Comparable]
  }
}
SubgraphDepthLocater.DepthSegment = DepthSegment
