import LocationIndexOfPoint from './LocationIndexOfPoint'
export default class LocationIndexOfLine {
  constructor() {
    LocationIndexOfLine.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linearGeom = null
    const linearGeom = arguments[0]
    this._linearGeom = linearGeom
  }
  static indicesOf(linearGeom, subLine) {
    const locater = new LocationIndexOfLine(linearGeom)
    return locater.indicesOf(subLine)
  }
  indicesOf(subLine) {
    const startPt = subLine.getGeometryN(0).getCoordinateN(0)
    const lastLine = subLine.getGeometryN(subLine.getNumGeometries() - 1)
    const endPt = lastLine.getCoordinateN(lastLine.getNumPoints() - 1)
    const locPt = new LocationIndexOfPoint(this._linearGeom)
    const subLineLoc = new Array(2).fill(null)
    subLineLoc[0] = locPt.indexOf(startPt)
    if (subLine.getLength() === 0.0) 
      subLineLoc[1] = subLineLoc[0].copy()
    else 
      subLineLoc[1] = locPt.indexOfAfter(endPt, subLineLoc[0])
    
    return subLineLoc
  }
}
