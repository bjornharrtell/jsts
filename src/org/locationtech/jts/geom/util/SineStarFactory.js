import Coordinate from '../Coordinate'
import GeometricShapeFactory from '../../util/GeometricShapeFactory'
export default class SineStarFactory extends GeometricShapeFactory {
  constructor() {
    super()
    SineStarFactory.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._numArms = 8
    this._armLengthRatio = 0.5
    if (arguments.length === 0) {
      GeometricShapeFactory.constructor_.call(this)
    } else if (arguments.length === 1) {
      const geomFact = arguments[0]
      GeometricShapeFactory.constructor_.call(this, geomFact)
    }
  }
  static create(origin, size, nPts, nArms, armLengthRatio) {
    const gsf = new SineStarFactory()
    gsf.setCentre(origin)
    gsf.setSize(size)
    gsf.setNumPoints(nPts)
    gsf.setArmLengthRatio(armLengthRatio)
    gsf.setNumArms(nArms)
    const poly = gsf.createSineStar()
    return poly
  }
  setNumArms(numArms) {
    this._numArms = numArms
  }
  setArmLengthRatio(armLengthRatio) {
    this._armLengthRatio = armLengthRatio
  }
  createSineStar() {
    const env = this._dim.getEnvelope()
    const radius = env.getWidth() / 2.0
    let armRatio = this._armLengthRatio
    if (armRatio < 0.0) armRatio = 0.0
    if (armRatio > 1.0) armRatio = 1.0
    const armMaxLen = armRatio * radius
    const insideRadius = (1 - armRatio) * radius
    const centreX = env.getMinX() + radius
    const centreY = env.getMinY() + radius
    const pts = new Array(this._nPts + 1).fill(null)
    let iPt = 0
    for (let i = 0; i < this._nPts; i++) {
      const ptArcFrac = i / this._nPts * this._numArms
      const armAngFrac = ptArcFrac - Math.floor(ptArcFrac)
      const armAng = 2 * Math.PI * armAngFrac
      const armLenFrac = (Math.cos(armAng) + 1.0) / 2.0
      const curveRadius = insideRadius + armMaxLen * armLenFrac
      const ang = i * (2 * Math.PI / this._nPts)
      const x = curveRadius * Math.cos(ang) + centreX
      const y = curveRadius * Math.sin(ang) + centreY
      pts[iPt++] = this.coord(x, y)
    }
    pts[iPt] = new Coordinate(pts[0])
    const ring = this._geomFact.createLinearRing(pts)
    const poly = this._geomFact.createPolygon(ring)
    return poly
  }
}
