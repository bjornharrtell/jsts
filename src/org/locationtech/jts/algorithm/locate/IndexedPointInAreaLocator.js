import hasInterface from '../../../../../hasInterface'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import ItemVisitor from '../../index/ItemVisitor'
import PointOnGeometryLocator from './PointOnGeometryLocator'
import LinearRing from '../../geom/LinearRing'
import SortedPackedIntervalRTree from '../../index/intervalrtree/SortedPackedIntervalRTree'
import LineSegment from '../../geom/LineSegment'
import Polygonal from '../../geom/Polygonal'
import ArrayList from '../../../../../java/util/ArrayList'
import LinearComponentExtracter from '../../geom/util/LinearComponentExtracter'
import ArrayListVisitor from '../../index/ArrayListVisitor'
import RayCrossingCounter from '../RayCrossingCounter'
export default class IndexedPointInAreaLocator {
  constructor() {
    IndexedPointInAreaLocator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = null
    this._index = null
    const g = arguments[0]
    if (!(hasInterface(g, Polygonal) || g instanceof LinearRing)) throw new IllegalArgumentException('Argument must be Polygonal or LinearRing')
    this._geom = g
  }
  locate(p) {
    if (this._index === null) {
      this._index = new IntervalIndexedGeometry(this._geom)
      this._geom = null
    }
    const rcc = new RayCrossingCounter(p)
    const visitor = new SegmentVisitor(rcc)
    this._index.query(p.y, p.y, visitor)
    return rcc.getLocation()
  }
  get interfaces_() {
    return [PointOnGeometryLocator]
  }
}
class SegmentVisitor {
  constructor() {
    SegmentVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._counter = null
    const counter = arguments[0]
    this._counter = counter
  }
  visitItem(item) {
    const seg = item
    this._counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1))
  }
  get interfaces_() {
    return [ItemVisitor]
  }
}
class IntervalIndexedGeometry {
  constructor() {
    IntervalIndexedGeometry.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isEmpty = false
    this._index = new SortedPackedIntervalRTree()
    const geom = arguments[0]
    if (geom.isEmpty()) this._isEmpty = true; else this.init(geom)
  }
  init(geom) {
    const lines = LinearComponentExtracter.getLines(geom)
    for (let i = lines.iterator(); i.hasNext(); ) {
      const line = i.next()
      const pts = line.getCoordinates()
      this.addLine(pts)
    }
  }
  addLine(pts) {
    for (let i = 1; i < pts.length; i++) {
      const seg = new LineSegment(pts[i - 1], pts[i])
      const min = Math.min(seg.p0.y, seg.p1.y)
      const max = Math.max(seg.p0.y, seg.p1.y)
      this._index.insert(min, max, seg)
    }
  }
  query() {
    if (arguments.length === 2) {
      const min = arguments[0], max = arguments[1]
      if (this._isEmpty) return new ArrayList()
      const visitor = new ArrayListVisitor()
      this._index.query(min, max, visitor)
      return visitor.getItems()
    } else if (arguments.length === 3) {
      const min = arguments[0], max = arguments[1], visitor = arguments[2]
      if (this._isEmpty) return null
      this._index.query(min, max, visitor)
    }
  }
}
IndexedPointInAreaLocator.SegmentVisitor = SegmentVisitor
IndexedPointInAreaLocator.IntervalIndexedGeometry = IntervalIndexedGeometry
