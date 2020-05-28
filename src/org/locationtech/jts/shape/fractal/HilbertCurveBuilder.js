import Coordinate from '../../geom/Coordinate'
import HilbertCode from './HilbertCode'
import GeometricShapeBuilder from '../GeometricShapeBuilder'
export default class HilbertCurveBuilder extends GeometricShapeBuilder {
  constructor() {
    super()
    HilbertCurveBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._order = -1
    const geomFactory = arguments[0]
    GeometricShapeBuilder.constructor_.call(this, geomFactory)
    this._extent = null
  }
  static transform(val, scale, offset) {
    return val * scale + offset
  }
  getGeometry() {
    const level = HilbertCode.level(this._numPts)
    const nPts = HilbertCode.size(level)
    let scale = 1
    let baseX = 0
    let baseY = 0
    if (this._extent !== null) {
      const baseLine = this.getSquareBaseLine()
      baseX = baseLine.minX()
      baseY = baseLine.minY()
      const width = baseLine.getLength()
      const maxOrdinate = HilbertCode.maxOrdinate(level)
      scale = width / maxOrdinate
    }
    const pts = new Array(nPts).fill(null)
    for (let i = 0; i < nPts; i++) {
      const pt = HilbertCode.decode(level, i)
      const x = HilbertCurveBuilder.transform(pt.getX(), scale, baseX)
      const y = HilbertCurveBuilder.transform(pt.getY(), scale, baseY)
      pts[i] = new Coordinate(x, y)
    }
    return this._geomFactory.createLineString(pts)
  }
  setLevel(level) {
    this._numPts = HilbertCode.size(level)
  }
}
