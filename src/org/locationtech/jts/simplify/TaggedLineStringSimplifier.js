import LineSegment from '../geom/LineSegment'
import LineSegmentIndex from './LineSegmentIndex'
import RobustLineIntersector from '../algorithm/RobustLineIntersector'
export default class TaggedLineStringSimplifier {
  constructor() {
    TaggedLineStringSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = new RobustLineIntersector()
    this._inputIndex = new LineSegmentIndex()
    this._outputIndex = new LineSegmentIndex()
    this._line = null
    this._linePts = null
    this._distanceTolerance = 0.0
    const inputIndex = arguments[0], outputIndex = arguments[1]
    this._inputIndex = inputIndex
    this._outputIndex = outputIndex
  }
  static isInLineSection(line, sectionIndex, seg) {
    if (seg.getParent() !== line.getParent()) return false
    const segIndex = seg.getIndex()
    if (segIndex >= sectionIndex[0] && segIndex < sectionIndex[1]) return true
    return false
  }
  flatten(start, end) {
    const p0 = this._linePts[start]
    const p1 = this._linePts[end]
    const newSeg = new LineSegment(p0, p1)
    this.remove(this._line, start, end)
    this._outputIndex.add(newSeg)
    return newSeg
  }
  hasBadIntersection(parentLine, sectionIndex, candidateSeg) {
    if (this.hasBadOutputIntersection(candidateSeg)) return true
    if (this.hasBadInputIntersection(parentLine, sectionIndex, candidateSeg)) return true
    return false
  }
  setDistanceTolerance(distanceTolerance) {
    this._distanceTolerance = distanceTolerance
  }
  simplifySection(i, j, depth) {
    depth += 1
    const sectionIndex = new Array(2).fill(null)
    if (i + 1 === j) {
      const newSeg = this._line.getSegment(i)
      this._line.addToResult(newSeg)
      return null
    }
    let isValidToSimplify = true
    if (this._line.getResultSize() < this._line.getMinimumSize()) {
      const worstCaseSize = depth + 1
      if (worstCaseSize < this._line.getMinimumSize()) isValidToSimplify = false
    }
    const distance = new Array(1).fill(null)
    const furthestPtIndex = this.findFurthestPoint(this._linePts, i, j, distance)
    if (distance[0] > this._distanceTolerance) isValidToSimplify = false
    const candidateSeg = new LineSegment()
    candidateSeg.p0 = this._linePts[i]
    candidateSeg.p1 = this._linePts[j]
    sectionIndex[0] = i
    sectionIndex[1] = j
    if (this.hasBadIntersection(this._line, sectionIndex, candidateSeg)) isValidToSimplify = false
    if (isValidToSimplify) {
      const newSeg = this.flatten(i, j)
      this._line.addToResult(newSeg)
      return null
    }
    this.simplifySection(i, furthestPtIndex, depth)
    this.simplifySection(furthestPtIndex, j, depth)
  }
  hasBadOutputIntersection(candidateSeg) {
    const querySegs = this._outputIndex.query(candidateSeg)
    for (let i = querySegs.iterator(); i.hasNext(); ) {
      const querySeg = i.next()
      if (this.hasInteriorIntersection(querySeg, candidateSeg)) 
        return true
      
    }
    return false
  }
  findFurthestPoint(pts, i, j, maxDistance) {
    const seg = new LineSegment()
    seg.p0 = pts[i]
    seg.p1 = pts[j]
    let maxDist = -1.0
    let maxIndex = i
    for (let k = i + 1; k < j; k++) {
      const midPt = pts[k]
      const distance = seg.distance(midPt)
      if (distance > maxDist) {
        maxDist = distance
        maxIndex = k
      }
    }
    maxDistance[0] = maxDist
    return maxIndex
  }
  simplify(line) {
    this._line = line
    this._linePts = line.getParentCoordinates()
    this.simplifySection(0, this._linePts.length - 1, 0)
  }
  remove(line, start, end) {
    for (let i = start; i < end; i++) {
      const seg = line.getSegment(i)
      this._inputIndex.remove(seg)
    }
  }
  hasInteriorIntersection(seg0, seg1) {
    this._li.computeIntersection(seg0.p0, seg0.p1, seg1.p0, seg1.p1)
    return this._li.isInteriorIntersection()
  }
  hasBadInputIntersection(parentLine, sectionIndex, candidateSeg) {
    const querySegs = this._inputIndex.query(candidateSeg)
    for (let i = querySegs.iterator(); i.hasNext(); ) {
      const querySeg = i.next()
      if (this.hasInteriorIntersection(querySeg, candidateSeg)) {
        if (TaggedLineStringSimplifier.isInLineSection(parentLine, sectionIndex, querySeg)) continue
        return true
      }
    }
    return false
  }
}
