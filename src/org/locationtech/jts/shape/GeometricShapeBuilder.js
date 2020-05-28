import Coordinate from '../geom/Coordinate'
import LineSegment from '../geom/LineSegment'
import Envelope from '../geom/Envelope'
export default class GeometricShapeBuilder {
  constructor() {
    GeometricShapeBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._extent = new Envelope(0, 1, 0, 1)
    this._numPts = 0
    this._geomFactory = null
    const geomFactory = arguments[0]
    this._geomFactory = geomFactory
  }
  setNumPoints(numPts) {
    this._numPts = numPts
  }
  getRadius() {
    return this.getDiameter() / 2
  }
  getDiameter() {
    return Math.min(this._extent.getHeight(), this._extent.getWidth())
  }
  getSquareBaseLine() {
    const radius = this.getRadius()
    const centre = this.getCentre()
    const p0 = new Coordinate(centre.x - radius, centre.y - radius)
    const p1 = new Coordinate(centre.x + radius, centre.y - radius)
    return new LineSegment(p0, p1)
  }
  setExtent(extent) {
    this._extent = extent
  }
  getCentre() {
    return this._extent.centre()
  }
  getExtent() {
    return this._extent
  }
  getSquareExtent() {
    const radius = this.getRadius()
    const centre = this.getCentre()
    return new Envelope(centre.x - radius, centre.x + radius, centre.y - radius, centre.y + radius)
  }
  createCoord(x, y) {
    const pt = new Coordinate(x, y)
    this._geomFactory.getPrecisionModel().makePrecise(pt)
    return pt
  }
}
