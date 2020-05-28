import CoordinateList from '../geom/CoordinateList'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import ArrayList from '../../../../java/util/ArrayList'
export default class LinearGeometryBuilder {
  constructor() {
    LinearGeometryBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFact = null
    this._lines = new ArrayList()
    this._coordList = null
    this._ignoreInvalidLines = false
    this._fixInvalidLines = false
    this._lastPt = null
    const geomFact = arguments[0]
    this._geomFact = geomFact
  }
  getGeometry() {
    this.endLine()
    return this._geomFact.buildGeometry(this._lines)
  }
  getLastCoordinate() {
    return this._lastPt
  }
  endLine() {
    if (this._coordList === null) 
      return null
    
    if (this._ignoreInvalidLines && this._coordList.size() < 2) {
      this._coordList = null
      return null
    }
    const rawPts = this._coordList.toCoordinateArray()
    let pts = rawPts
    if (this._fixInvalidLines) pts = this.validCoordinateSequence(rawPts)
    this._coordList = null
    let line = null
    try {
      line = this._geomFact.createLineString(pts)
    } catch (ex) {
      if (ex instanceof IllegalArgumentException) {
        if (!this._ignoreInvalidLines) throw ex
      } else {
        throw ex
      }
    } finally {}
    if (line !== null) this._lines.add(line)
  }
  setFixInvalidLines(fixInvalidLines) {
    this._fixInvalidLines = fixInvalidLines
  }
  add() {
    if (arguments.length === 1) {
      const pt = arguments[0]
      this.add(pt, true)
    } else if (arguments.length === 2) {
      const pt = arguments[0], allowRepeatedPoints = arguments[1]
      if (this._coordList === null) this._coordList = new CoordinateList()
      this._coordList.add(pt, allowRepeatedPoints)
      this._lastPt = pt
    }
  }
  setIgnoreInvalidLines(ignoreInvalidLines) {
    this._ignoreInvalidLines = ignoreInvalidLines
  }
  validCoordinateSequence(pts) {
    if (pts.length >= 2) return pts
    const validPts = [pts[0], pts[0]]
    return validPts
  }
}
