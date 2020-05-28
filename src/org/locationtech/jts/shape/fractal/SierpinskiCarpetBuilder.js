import CoordinateList from '../../geom/CoordinateList'
import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import ArrayList from '../../../../../java/util/ArrayList'
import GeometricShapeBuilder from '../GeometricShapeBuilder'
export default class SierpinskiCarpetBuilder extends GeometricShapeBuilder {
  constructor() {
    super()
    SierpinskiCarpetBuilder.constructor_.apply(this, arguments)
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
  addHoles(n, originX, originY, width, holeList) {
    if (n < 0) return null
    const n2 = n - 1
    const widthThird = width / 3.0
    this.addHoles(n2, originX, originY, widthThird, holeList)
    this.addHoles(n2, originX + widthThird, originY, widthThird, holeList)
    this.addHoles(n2, originX + 2 * widthThird, originY, widthThird, holeList)
    this.addHoles(n2, originX, originY + widthThird, widthThird, holeList)
    this.addHoles(n2, originX + 2 * widthThird, originY + widthThird, widthThird, holeList)
    this.addHoles(n2, originX, originY + 2 * widthThird, widthThird, holeList)
    this.addHoles(n2, originX + widthThird, originY + 2 * widthThird, widthThird, holeList)
    this.addHoles(n2, originX + 2 * widthThird, originY + 2 * widthThird, widthThird, holeList)
    holeList.add(this.createSquareHole(originX + widthThird, originY + widthThird, widthThird))
  }
  getHoles(n, originX, originY, width) {
    const holeList = new ArrayList()
    this.addHoles(n, originX, originY, width, holeList)
    return GeometryFactory.toLinearRingArray(holeList)
  }
  createSquareHole(x, y, width) {
    const pts = [new Coordinate(x, y), new Coordinate(x + width, y), new Coordinate(x + width, y + width), new Coordinate(x, y + width), new Coordinate(x, y)]
    return this._geomFactory.createLinearRing(pts)
  }
  getGeometry() {
    const level = SierpinskiCarpetBuilder.recursionLevelForSize(this._numPts)
    const baseLine = this.getSquareBaseLine()
    const origin = baseLine.getCoordinate(0)
    const holes = this.getHoles(level, origin.x, origin.y, this.getDiameter())
    const shell = this._geomFactory.toGeometry(this.getSquareExtent()).getExteriorRing()
    return this._geomFactory.createPolygon(shell, holes)
  }
}
