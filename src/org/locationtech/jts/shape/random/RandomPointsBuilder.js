import Location from '../../geom/Location'
import Geometry from '../../geom/Geometry'
import hasInterface from '../../../../../hasInterface'
import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Polygonal from '../../geom/Polygonal'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator'
import GeometricShapeBuilder from '../GeometricShapeBuilder'
export default class RandomPointsBuilder extends GeometricShapeBuilder {
  constructor() {
    super()
    RandomPointsBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._maskPoly = null
    this._extentLocator = null
    if (arguments.length === 0) {
      GeometricShapeBuilder.constructor_.call(this, new GeometryFactory())
    } else if (arguments.length === 1) {
      const geomFact = arguments[0]
      GeometricShapeBuilder.constructor_.call(this, geomFact)
    }
  }
  getGeometry() {
    const pts = new Array(this._numPts).fill(null)
    let i = 0
    while (i < this._numPts) {
      const p = this.createRandomCoord(this.getExtent())
      if (this._extentLocator !== null && !this.isInExtent(p)) continue
      pts[i++] = p
    }
    return this._geomFactory.createMultiPointFromCoords(pts)
  }
  createRandomCoord(env) {
    const x = env.getMinX() + env.getWidth() * Math.random()
    const y = env.getMinY() + env.getHeight() * Math.random()
    return this.createCoord(x, y)
  }
  isInExtent(p) {
    if (this._extentLocator !== null) return this._extentLocator.locate(p) !== Location.EXTERIOR
    return this.getExtent().contains(p)
  }
  setExtent() {
    if (arguments.length === 1 && arguments[0] instanceof Geometry) {
      const mask = arguments[0]
      if (!hasInterface(mask, Polygonal)) throw new IllegalArgumentException('Only polygonal extents are supported')
      this._maskPoly = mask
      this.setExtent(mask.getEnvelopeInternal())
      this._extentLocator = new IndexedPointInAreaLocator(mask)
    } else {
      return super.setExtent.apply(this, arguments)
    }
  }
  createCoord(x, y) {
    const pt = new Coordinate(x, y)
    this._geomFactory.getPrecisionModel().makePrecise(pt)
    return pt
  }
}
