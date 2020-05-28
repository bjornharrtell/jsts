import LineString from '../geom/LineString'
import HashMap from '../../../../java/util/HashMap'
import GeometryTransformer from '../geom/util/GeometryTransformer'
import TaggedLinesSimplifier from './TaggedLinesSimplifier'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import GeometryComponentFilter from '../geom/GeometryComponentFilter'
import TaggedLineString from './TaggedLineString'
export default class TopologyPreservingSimplifier {
  constructor() {
    TopologyPreservingSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._lineSimplifier = new TaggedLinesSimplifier()
    this._linestringMap = null
    const inputGeom = arguments[0]
    this._inputGeom = inputGeom
  }
  static simplify(geom, distanceTolerance) {
    const tss = new TopologyPreservingSimplifier(geom)
    tss.setDistanceTolerance(distanceTolerance)
    return tss.getResultGeometry()
  }
  getResultGeometry() {
    if (this._inputGeom.isEmpty()) return this._inputGeom.copy()
    this._linestringMap = new HashMap()
    this._inputGeom.apply(new LineStringMapBuilderFilter(this))
    this._lineSimplifier.simplify(this._linestringMap.values())
    const result = new LineStringTransformer(this._linestringMap).transform(this._inputGeom)
    return result
  }
  setDistanceTolerance(distanceTolerance) {
    if (distanceTolerance < 0.0) throw new IllegalArgumentException('Tolerance must be non-negative')
    this._lineSimplifier.setDistanceTolerance(distanceTolerance)
  }
}
class LineStringTransformer extends GeometryTransformer {
  constructor() {
    super()
    LineStringTransformer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linestringMap = null
    const linestringMap = arguments[0]
    this._linestringMap = linestringMap
  }
  transformCoordinates(coords, parent) {
    if (coords.size() === 0) return null
    if (parent instanceof LineString) {
      const taggedLine = this._linestringMap.get(parent)
      return this.createCoordinateSequence(taggedLine.getResultCoordinates())
    }
    return super.transformCoordinates.call(this, coords, parent)
  }
}
class LineStringMapBuilderFilter {
  constructor() {
    LineStringMapBuilderFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.tps = null
    const tps = arguments[0]
    this.tps = tps
  }
  filter(geom) {
    if (geom instanceof LineString) {
      const line = geom
      if (line.isEmpty()) return null
      const minSize = line.isClosed() ? 4 : 2
      const taggedLine = new TaggedLineString(line, minSize)
      this.tps._linestringMap.put(line, taggedLine)
    }
  }
  get interfaces_() {
    return [GeometryComponentFilter]
  }
}
TopologyPreservingSimplifier.LineStringTransformer = LineStringTransformer
TopologyPreservingSimplifier.LineStringMapBuilderFilter = LineStringMapBuilderFilter
