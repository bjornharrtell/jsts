import Location from '../../geom/Location.js'
import Geometry from '../../geom/Geometry.js'
import hasInterface from '../../../../../hasInterface.js'
import GeometryFactory from '../../geom/GeometryFactory.js'
import Coordinate from '../../geom/Coordinate.js'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException.js'
import Polygonal from '../../geom/Polygonal.js'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator.js'
import GeometricShapeBuilder from '../GeometricShapeBuilder.js'
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
