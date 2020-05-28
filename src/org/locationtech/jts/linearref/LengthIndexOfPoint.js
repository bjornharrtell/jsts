import LinearIterator from './LinearIterator'
import Double from '../../../../java/lang/Double'
import LineSegment from '../geom/LineSegment'
import Assert from '../util/Assert'
export default class LengthIndexOfPoint {
  constructor() {
    LengthIndexOfPoint.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._linearGeom = null
    const linearGeom = arguments[0]
    this._linearGeom = linearGeom
  }
  static indexOf(linearGeom, inputPt) {
    const locater = new LengthIndexOfPoint(linearGeom)
    return locater.indexOf(inputPt)
  }
  static indexOfAfter(linearGeom, inputPt, minIndex) {
    const locater = new LengthIndexOfPoint(linearGeom)
    return locater.indexOfAfter(inputPt, minIndex)
  }
  indexOf(inputPt) {
    return this.indexOfFromStart(inputPt, -1.0)
  }
  indexOfFromStart(inputPt, minIndex) {
    let minDistance = Double.MAX_VALUE
    let ptMeasure = minIndex
    let segmentStartMeasure = 0.0
    const seg = new LineSegment()
    const it = new LinearIterator(this._linearGeom)
    while (it.hasNext()) {
      if (!it.isEndOfLine()) {
        seg.p0 = it.getSegmentStart()
        seg.p1 = it.getSegmentEnd()
        const segDistance = seg.distance(inputPt)
        const segMeasureToPt = this.segmentNearestMeasure(seg, inputPt, segmentStartMeasure)
        if (segDistance < minDistance && segMeasureToPt > minIndex) {
          ptMeasure = segMeasureToPt
          minDistance = segDistance
        }
        segmentStartMeasure += seg.getLength()
      }
      it.next()
    }
    return ptMeasure
  }
  indexOfAfter(inputPt, minIndex) {
    if (minIndex < 0.0) return this.indexOf(inputPt)
    const endIndex = this._linearGeom.getLength()
    if (endIndex < minIndex) return endIndex
    const closestAfter = this.indexOfFromStart(inputPt, minIndex)
    Assert.isTrue(closestAfter >= minIndex, 'computed index is before specified minimum index')
    return closestAfter
  }
  segmentNearestMeasure(seg, inputPt, segmentStartMeasure) {
    const projFactor = seg.projectionFactor(inputPt)
    if (projFactor <= 0.0) return segmentStartMeasure
    if (projFactor <= 1.0) return segmentStartMeasure + projFactor * seg.getLength()
    return segmentStartMeasure + seg.getLength()
  }
}
