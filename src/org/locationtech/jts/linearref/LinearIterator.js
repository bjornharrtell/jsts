import hasInterface from '../../../../hasInterface'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Lineal from '../geom/Lineal'
export default class LinearIterator {
  constructor() {
    LinearIterator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linearGeom = null
    this._numLines = null
    this._currentLine = null
    this._componentIndex = 0
    this._vertexIndex = 0
    if (arguments.length === 1) {
      const linear = arguments[0]
      LinearIterator.constructor_.call(this, linear, 0, 0)
    } else if (arguments.length === 2) {
      const linear = arguments[0], start = arguments[1]
      LinearIterator.constructor_.call(this, linear, start.getComponentIndex(), LinearIterator.segmentEndVertexIndex(start))
    } else if (arguments.length === 3) {
      const linearGeom = arguments[0], componentIndex = arguments[1], vertexIndex = arguments[2]
      if (!hasInterface(linearGeom, Lineal)) throw new IllegalArgumentException('Lineal geometry is required')
      this._linearGeom = linearGeom
      this._numLines = linearGeom.getNumGeometries()
      this._componentIndex = componentIndex
      this._vertexIndex = vertexIndex
      this.loadCurrentLine()
    }
  }
  static segmentEndVertexIndex(loc) {
    if (loc.getSegmentFraction() > 0.0) return loc.getSegmentIndex() + 1
    return loc.getSegmentIndex()
  }
  getComponentIndex() {
    return this._componentIndex
  }
  getLine() {
    return this._currentLine
  }
  getVertexIndex() {
    return this._vertexIndex
  }
  getSegmentEnd() {
    if (this._vertexIndex < this.getLine().getNumPoints() - 1) return this._currentLine.getCoordinateN(this._vertexIndex + 1)
    return null
  }
  next() {
    if (!this.hasNext()) return null
    this._vertexIndex++
    if (this._vertexIndex >= this._currentLine.getNumPoints()) {
      this._componentIndex++
      this.loadCurrentLine()
      this._vertexIndex = 0
    }
  }
  loadCurrentLine() {
    if (this._componentIndex >= this._numLines) {
      this._currentLine = null
      return null
    }
    this._currentLine = this._linearGeom.getGeometryN(this._componentIndex)
  }
  getSegmentStart() {
    return this._currentLine.getCoordinateN(this._vertexIndex)
  }
  isEndOfLine() {
    if (this._componentIndex >= this._numLines) return false
    if (this._vertexIndex < this._currentLine.getNumPoints() - 1) return false
    return true
  }
  hasNext() {
    if (this._componentIndex >= this._numLines) return false
    if (this._componentIndex === this._numLines - 1 && this._vertexIndex >= this._currentLine.getNumPoints()) return false
    return true
  }
}
