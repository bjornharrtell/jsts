import CoordinateList from '../../geom/CoordinateList'
import Coordinate from '../../geom/Coordinate'
import Vector2D from '../../math/Vector2D'
import GeometricShapeBuilder from '../GeometricShapeBuilder'
export default class KochSnowflakeBuilder extends GeometricShapeBuilder {
  constructor() {
    super()
    KochSnowflakeBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._coordList = new CoordinateList()
    const geomFactory = arguments[0]
    GeometricShapeBuilder.constructor_.call(this, geomFactory)
  }
  static recursionLevelForSize(numPts) {
    const pow4 = Math.trunc(numPts / 3)
    const exp = Math.log(pow4) / Math.log(4)
    return Math.trunc(exp)
  }
  getBoundary(level, origin, width) {
    let y = origin.y
    if (level > 0) 
      y += KochSnowflakeBuilder.THIRD_HEIGHT * width
    
    const p0 = new Coordinate(origin.x, y)
    const p1 = new Coordinate(origin.x + width / 2, y + width * KochSnowflakeBuilder.HEIGHT_FACTOR)
    const p2 = new Coordinate(origin.x + width, y)
    this.addSide(level, p0, p1)
    this.addSide(level, p1, p2)
    this.addSide(level, p2, p0)
    this._coordList.closeRing()
    return this._coordList.toCoordinateArray()
  }
  getGeometry() {
    const level = KochSnowflakeBuilder.recursionLevelForSize(this._numPts)
    const baseLine = this.getSquareBaseLine()
    const pts = this.getBoundary(level, baseLine.getCoordinate(0), baseLine.getLength())
    return this._geomFactory.createPolygon(this._geomFactory.createLinearRing(pts), null)
  }
  addSegment(p0, p1) {
    this._coordList.add(p1)
  }
  addSide(level, p0, p1) {
    if (level === 0) {
      this.addSegment(p0, p1)
    } else {
      const base = Vector2D.create(p0, p1)
      const midPt = base.multiply(0.5).translate(p0)
      const heightVec = base.multiply(KochSnowflakeBuilder.THIRD_HEIGHT)
      const offsetVec = heightVec.rotateByQuarterCircle(1)
      const offsetPt = offsetVec.translate(midPt)
      const n2 = level - 1
      const thirdPt = base.multiply(KochSnowflakeBuilder.ONE_THIRD).translate(p0)
      const twoThirdPt = base.multiply(KochSnowflakeBuilder.TWO_THIRDS).translate(p0)
      this.addSide(n2, p0, thirdPt)
      this.addSide(n2, thirdPt, offsetPt)
      this.addSide(n2, offsetPt, twoThirdPt)
      this.addSide(n2, twoThirdPt, p1)
    }
  }
}
KochSnowflakeBuilder.HEIGHT_FACTOR = Math.sin(Math.PI / 3.0)
KochSnowflakeBuilder.ONE_THIRD = 1.0 / 3.0
KochSnowflakeBuilder.THIRD_HEIGHT = KochSnowflakeBuilder.HEIGHT_FACTOR / 3.0
KochSnowflakeBuilder.TWO_THIRDS = 2.0 / 3.0
