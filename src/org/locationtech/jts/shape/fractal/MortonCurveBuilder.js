import Coordinate from '../../geom/Coordinate'
import MortonCode from './MortonCode'
import GeometricShapeBuilder from '../GeometricShapeBuilder'
export default class MortonCurveBuilder extends GeometricShapeBuilder {
  constructor() {
    super()
    MortonCurveBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const geomFactory = arguments[0]
    GeometricShapeBuilder.constructor_.call(this, geomFactory)
    this._extent = null
  }
  static transform(val, scale, offset) {
    return val * scale + offset
  }
  getGeometry() {
    const level = MortonCode.level(this._numPts)
    const nPts = MortonCode.size(level)
    let scale = 1
    let baseX = 0
    let baseY = 0
    if (this._extent !== null) {
      const baseLine = this.getSquareBaseLine()
      baseX = baseLine.minX()
      baseY = baseLine.minY()
      const width = baseLine.getLength()
      const maxOrdinate = MortonCode.maxOrdinate(level)
      scale = width / maxOrdinate
    }
    const pts = new Array(nPts).fill(null)
    for (let i = 0; i < nPts; i++) {
      const pt = MortonCode.decode(i)
      const x = MortonCurveBuilder.transform(pt.getX(), scale, baseX)
      const y = MortonCurveBuilder.transform(pt.getY(), scale, baseY)
      pts[i] = new Coordinate(x, y)
    }
    return this._geomFactory.createLineString(pts)
  }
  setLevel(level) {
    this._numPts = MortonCode.size(level)
  }
}
