import LinearIterator from './LinearIterator'
import LinearLocation from './LinearLocation'
import Double from '../../../../java/lang/Double'
import LineSegment from '../geom/LineSegment'
import Assert from '../util/Assert'
export default class LocationIndexOfPoint {
  constructor() {
    LocationIndexOfPoint.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linearGeom = null
    const linearGeom = arguments[0]
    this._linearGeom = linearGeom
  }
  static indexOf(linearGeom, inputPt) {
    const locater = new LocationIndexOfPoint(linearGeom)
    return locater.indexOf(inputPt)
  }
  static indexOfAfter(linearGeom, inputPt, minIndex) {
    const locater = new LocationIndexOfPoint(linearGeom)
    return locater.indexOfAfter(inputPt, minIndex)
  }
  indexOf(inputPt) {
    return this.indexOfFromStart(inputPt, null)
  }
  indexOfFromStart(inputPt, minIndex) {
    let minDistance = Double.MAX_VALUE
    let minComponentIndex = 0
    let minSegmentIndex = 0
    let minFrac = -1.0
    const seg = new LineSegment()
    for (let it = new LinearIterator(this._linearGeom); it.hasNext(); it.next()) 
      if (!it.isEndOfLine()) {
        seg.p0 = it.getSegmentStart()
        seg.p1 = it.getSegmentEnd()
        const segDistance = seg.distance(inputPt)
        const segFrac = seg.segmentFraction(inputPt)
        const candidateComponentIndex = it.getComponentIndex()
        const candidateSegmentIndex = it.getVertexIndex()
        if (segDistance < minDistance) 
          if (minIndex === null || minIndex.compareLocationValues(candidateComponentIndex, candidateSegmentIndex, segFrac) < 0) {
            minComponentIndex = candidateComponentIndex
            minSegmentIndex = candidateSegmentIndex
            minFrac = segFrac
            minDistance = segDistance
          }
        
      }
    
    if (minDistance === Double.MAX_VALUE) 
      return new LinearLocation(minIndex)
    
    const loc = new LinearLocation(minComponentIndex, minSegmentIndex, minFrac)
    return loc
  }
  indexOfAfter(inputPt, minIndex) {
    if (minIndex === null) return this.indexOf(inputPt)
    const endLoc = LinearLocation.getEndLocation(this._linearGeom)
    if (endLoc.compareTo(minIndex) <= 0) return endLoc
    const closestAfter = this.indexOfFromStart(inputPt, minIndex)
    Assert.isTrue(closestAfter.compareTo(minIndex) >= 0, 'computed location is before specified minimum location')
    return closestAfter
  }
}
