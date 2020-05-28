import LengthIndexOfPoint from './LengthIndexOfPoint'
import LocationIndexOfLine from './LocationIndexOfLine'
import LengthLocationMap from './LengthLocationMap'
import ExtractLineByLocation from './ExtractLineByLocation'
export default class LengthIndexedLine {
  constructor() {
    LengthIndexedLine.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linearGeom = null
    const linearGeom = arguments[0]
    this._linearGeom = linearGeom
  }
  clampIndex(index) {
    const posIndex = this.positiveIndex(index)
    const startIndex = this.getStartIndex()
    if (posIndex < startIndex) return startIndex
    const endIndex = this.getEndIndex()
    if (posIndex > endIndex) return endIndex
    return posIndex
  }
  locationOf() {
    if (arguments.length === 1) {
      const index = arguments[0]
      return LengthLocationMap.getLocation(this._linearGeom, index)
    } else if (arguments.length === 2) {
      const index = arguments[0], resolveLower = arguments[1]
      return LengthLocationMap.getLocation(this._linearGeom, index, resolveLower)
    }
  }
  project(pt) {
    return LengthIndexOfPoint.indexOf(this._linearGeom, pt)
  }
  positiveIndex(index) {
    if (index >= 0.0) return index
    return this._linearGeom.getLength() + index
  }
  extractPoint() {
    if (arguments.length === 1) {
      const index = arguments[0]
      const loc = LengthLocationMap.getLocation(this._linearGeom, index)
      return loc.getCoordinate(this._linearGeom)
    } else if (arguments.length === 2) {
      const index = arguments[0], offsetDistance = arguments[1]
      const loc = LengthLocationMap.getLocation(this._linearGeom, index)
      const locLow = loc.toLowest(this._linearGeom)
      return locLow.getSegment(this._linearGeom).pointAlongOffset(locLow.getSegmentFraction(), offsetDistance)
    }
  }
  isValidIndex(index) {
    return index >= this.getStartIndex() && index <= this.getEndIndex()
  }
  getEndIndex() {
    return this._linearGeom.getLength()
  }
  getStartIndex() {
    return 0.0
  }
  indexOfAfter(pt, minIndex) {
    return LengthIndexOfPoint.indexOfAfter(this._linearGeom, pt, minIndex)
  }
  extractLine(startIndex, endIndex) {
    const startIndex2 = this.clampIndex(startIndex)
    const endIndex2 = this.clampIndex(endIndex)
    const resolveStartLower = startIndex2 === endIndex2
    const startLoc = this.locationOf(startIndex2, resolveStartLower)
    const endLoc = this.locationOf(endIndex2)
    return ExtractLineByLocation.extract(this._linearGeom, startLoc, endLoc)
  }
  indexOf(pt) {
    return LengthIndexOfPoint.indexOf(this._linearGeom, pt)
  }
  indicesOf(subLine) {
    const locIndex = LocationIndexOfLine.indicesOf(this._linearGeom, subLine)
    const index = [LengthLocationMap.getLength(this._linearGeom, locIndex[0]), LengthLocationMap.getLength(this._linearGeom, locIndex[1])]
    return index
  }
}
