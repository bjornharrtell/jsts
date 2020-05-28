import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import MathUtil from '../../math/MathUtil'
import GeometricShapeBuilder from '../GeometricShapeBuilder'
export default class RandomPointsInGridBuilder extends GeometricShapeBuilder {
  constructor() {
    super()
    RandomPointsInGridBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isConstrainedToCircle = false
    this._gutterFraction = 0
    if (arguments.length === 0) {
      GeometricShapeBuilder.constructor_.call(this, new GeometryFactory())
    } else if (arguments.length === 1) {
      const geomFact = arguments[0]
      GeometricShapeBuilder.constructor_.call(this, geomFact)
    }
  }
  static randomPointInCircle(orgX, orgY, width, height) {
    const centreX = orgX + width / 2
    const centreY = orgY + height / 2
    const rndAng = 2 * Math.PI * Math.random()
    const rndRadius = Math.random()
    const rndRadius2 = Math.sqrt(rndRadius)
    const rndX = width / 2 * rndRadius2 * Math.cos(rndAng)
    const rndY = height / 2 * rndRadius2 * Math.sin(rndAng)
    const x0 = centreX + rndX
    const y0 = centreY + rndY
    return new Coordinate(x0, y0)
  }
  randomPointInCell(orgX, orgY, xLen, yLen) {
    if (this._isConstrainedToCircle) 
      return RandomPointsInGridBuilder.randomPointInCircle(orgX, orgY, xLen, yLen)
    
    return this.randomPointInGridCell(orgX, orgY, xLen, yLen)
  }
  getGeometry() {
    let nCells = Math.trunc(Math.sqrt(this._numPts))
    if (nCells * nCells < this._numPts) nCells += 1
    const gridDX = this.getExtent().getWidth() / nCells
    const gridDY = this.getExtent().getHeight() / nCells
    const gutterFrac = MathUtil.clamp(this._gutterFraction, 0.0, 1.0)
    const gutterOffsetX = gridDX * gutterFrac / 2
    const gutterOffsetY = gridDY * gutterFrac / 2
    const cellFrac = 1.0 - gutterFrac
    const cellDX = cellFrac * gridDX
    const cellDY = cellFrac * gridDY
    const pts = new Array(nCells * nCells).fill(null)
    let index = 0
    for (let i = 0; i < nCells; i++) 
      for (let j = 0; j < nCells; j++) {
        const orgX = this.getExtent().getMinX() + i * gridDX + gutterOffsetX
        const orgY = this.getExtent().getMinY() + j * gridDY + gutterOffsetY
        pts[index++] = this.randomPointInCell(orgX, orgY, cellDX, cellDY)
      }
    
    return this._geomFactory.createMultiPointFromCoords(pts)
  }
  setConstrainedToCircle(isConstrainedToCircle) {
    this._isConstrainedToCircle = isConstrainedToCircle
  }
  setGutterFraction(gutterFraction) {
    this._gutterFraction = gutterFraction
  }
  randomPointInGridCell(orgX, orgY, xLen, yLen) {
    const x = orgX + xLen * Math.random()
    const y = orgY + yLen * Math.random()
    return this.createCoord(x, y)
  }
}
