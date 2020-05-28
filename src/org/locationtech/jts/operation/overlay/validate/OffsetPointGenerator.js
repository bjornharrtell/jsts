import Coordinate from '../../../geom/Coordinate'
import ArrayList from '../../../../../../java/util/ArrayList'
import LinearComponentExtracter from '../../../geom/util/LinearComponentExtracter'
export default class OffsetPointGenerator {
  constructor() {
    OffsetPointGenerator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._g = null
    this._doLeft = true
    this._doRight = true
    const g = arguments[0]
    this._g = g
  }
  extractPoints(line, offsetDistance, offsetPts) {
    const pts = line.getCoordinates()
    for (let i = 0; i < pts.length - 1; i++) 
      this.computeOffsetPoints(pts[i], pts[i + 1], offsetDistance, offsetPts)
    
  }
  setSidesToGenerate(doLeft, doRight) {
    this._doLeft = doLeft
    this._doRight = doRight
  }
  getPoints(offsetDistance) {
    const offsetPts = new ArrayList()
    const lines = LinearComponentExtracter.getLines(this._g)
    for (let i = lines.iterator(); i.hasNext(); ) {
      const line = i.next()
      this.extractPoints(line, offsetDistance, offsetPts)
    }
    return offsetPts
  }
  computeOffsetPoints(p0, p1, offsetDistance, offsetPts) {
    const dx = p1.x - p0.x
    const dy = p1.y - p0.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const ux = offsetDistance * dx / len
    const uy = offsetDistance * dy / len
    const midX = (p1.x + p0.x) / 2
    const midY = (p1.y + p0.y) / 2
    if (this._doLeft) {
      const offsetLeft = new Coordinate(midX - uy, midY + ux)
      offsetPts.add(offsetLeft)
    }
    if (this._doRight) {
      const offsetRight = new Coordinate(midX + uy, midY - ux)
      offsetPts.add(offsetRight)
    }
  }
}
