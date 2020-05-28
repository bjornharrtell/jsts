import CoordinateList from '../geom/CoordinateList'
import hasInterface from '../../../../hasInterface'
import LinearIterator from './LinearIterator'
import Lineal from '../geom/Lineal'
import Assert from '../util/Assert'
import LinearGeometryBuilder from './LinearGeometryBuilder'
export default class ExtractLineByLocation {
  constructor() {
    ExtractLineByLocation.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._line = null
    const line = arguments[0]
    this._line = line
  }
  static extract(line, start, end) {
    const ls = new ExtractLineByLocation(line)
    return ls.extract(start, end)
  }
  computeLinear(start, end) {
    const builder = new LinearGeometryBuilder(this._line.getFactory())
    builder.setFixInvalidLines(true)
    if (!start.isVertex()) builder.add(start.getCoordinate(this._line))
    for (let it = new LinearIterator(this._line, start); it.hasNext(); it.next()) {
      if (end.compareLocationValues(it.getComponentIndex(), it.getVertexIndex(), 0.0) < 0) break
      const pt = it.getSegmentStart()
      builder.add(pt)
      if (it.isEndOfLine()) builder.endLine()
    }
    if (!end.isVertex()) builder.add(end.getCoordinate(this._line))
    return builder.getGeometry()
  }
  computeLine(start, end) {
    const coordinates = this._line.getCoordinates()
    const newCoordinates = new CoordinateList()
    let startSegmentIndex = start.getSegmentIndex()
    if (start.getSegmentFraction() > 0.0) startSegmentIndex += 1
    let lastSegmentIndex = end.getSegmentIndex()
    if (end.getSegmentFraction() === 1.0) lastSegmentIndex += 1
    if (lastSegmentIndex >= coordinates.length) lastSegmentIndex = coordinates.length - 1
    if (!start.isVertex()) newCoordinates.add(start.getCoordinate(this._line))
    for (let i = startSegmentIndex; i <= lastSegmentIndex; i++) 
      newCoordinates.add(coordinates[i])
    
    if (!end.isVertex()) newCoordinates.add(end.getCoordinate(this._line))
    if (newCoordinates.size() <= 0) newCoordinates.add(start.getCoordinate(this._line))
    let newCoordinateArray = newCoordinates.toCoordinateArray()
    if (newCoordinateArray.length <= 1) 
      newCoordinateArray = [newCoordinateArray[0], newCoordinateArray[0]]
    
    return this._line.getFactory().createLineString(newCoordinateArray)
  }
  extract(start, end) {
    if (end.compareTo(start) < 0) 
      return this.reverse(this.computeLinear(end, start))
    
    return this.computeLinear(start, end)
  }
  reverse(linear) {
    if (hasInterface(linear, Lineal)) return linear.reverse()
    Assert.shouldNeverReachHere('non-linear geometry encountered')
    return null
  }
}
