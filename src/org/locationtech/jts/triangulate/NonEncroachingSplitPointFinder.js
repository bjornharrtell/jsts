import SplitSegment from './SplitSegment'
import ConstraintSplitPointFinder from './ConstraintSplitPointFinder'
export default class NonEncroachingSplitPointFinder {
  static projectedSplitPoint(seg, encroachPt) {
    const lineSeg = seg.getLineSegment()
    const projPt = lineSeg.project(encroachPt)
    return projPt
  }
  findSplitPoint(seg, encroachPt) {
    const lineSeg = seg.getLineSegment()
    const segLen = lineSeg.getLength()
    const midPtLen = segLen / 2
    const splitSeg = new SplitSegment(lineSeg)
    const projPt = NonEncroachingSplitPointFinder.projectedSplitPoint(seg, encroachPt)
    const nonEncroachDiam = projPt.distance(encroachPt) * 2 * 0.8
    let maxSplitLen = nonEncroachDiam
    if (maxSplitLen > midPtLen) 
      maxSplitLen = midPtLen
    
    splitSeg.setMinimumLength(maxSplitLen)
    splitSeg.splitAt(projPt)
    return splitSeg.getSplitPoint()
  }
  get interfaces_() {
    return [ConstraintSplitPointFinder]
  }
}
