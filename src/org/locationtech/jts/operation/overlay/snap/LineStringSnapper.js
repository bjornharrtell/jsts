import LineString from '../../../geom/LineString'
import CoordinateList from '../../../geom/CoordinateList'
import Coordinate from '../../../geom/Coordinate'
import Double from '../../../../../../java/lang/Double'
import LineSegment from '../../../geom/LineSegment'
export default class LineStringSnapper {
  constructor() {
    LineStringSnapper.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._snapTolerance = 0.0
    this._srcPts = null
    this._seg = new LineSegment()
    this._allowSnappingToSourceVertices = false
    this._isClosed = false
    if (arguments[0] instanceof LineString && typeof arguments[1] === 'number') {
      const srcLine = arguments[0], snapTolerance = arguments[1]
      LineStringSnapper.constructor_.call(this, srcLine.getCoordinates(), snapTolerance)
    } else if (arguments[0] instanceof Array && typeof arguments[1] === 'number') {
      const srcPts = arguments[0], snapTolerance = arguments[1]
      this._srcPts = srcPts
      this._isClosed = LineStringSnapper.isClosed(srcPts)
      this._snapTolerance = snapTolerance
    }
  }
  static isClosed(pts) {
    if (pts.length <= 1) return false
    return pts[0].equals2D(pts[pts.length - 1])
  }
  snapVertices(srcCoords, snapPts) {
    const end = this._isClosed ? srcCoords.size() - 1 : srcCoords.size()
    for (let i = 0; i < end; i++) {
      const srcPt = srcCoords.get(i)
      const snapVert = this.findSnapForVertex(srcPt, snapPts)
      if (snapVert !== null) {
        srcCoords.set(i, new Coordinate(snapVert))
        if (i === 0 && this._isClosed) srcCoords.set(srcCoords.size() - 1, new Coordinate(snapVert))
      }
    }
  }
  findSnapForVertex(pt, snapPts) {
    for (let i = 0; i < snapPts.length; i++) {
      if (pt.equals2D(snapPts[i])) return null
      if (pt.distance(snapPts[i]) < this._snapTolerance) return snapPts[i]
    }
    return null
  }
  snapTo(snapPts) {
    const coordList = new CoordinateList(this._srcPts)
    this.snapVertices(coordList, snapPts)
    this.snapSegments(coordList, snapPts)
    const newPts = coordList.toCoordinateArray()
    return newPts
  }
  snapSegments(srcCoords, snapPts) {
    if (snapPts.length === 0) return null
    let distinctPtCount = snapPts.length
    if (snapPts[0].equals2D(snapPts[snapPts.length - 1])) distinctPtCount = snapPts.length - 1
    for (let i = 0; i < distinctPtCount; i++) {
      const snapPt = snapPts[i]
      const index = this.findSegmentIndexToSnap(snapPt, srcCoords)
      if (index >= 0) 
        srcCoords.add(index + 1, new Coordinate(snapPt), false)
      
    }
  }
  findSegmentIndexToSnap(snapPt, srcCoords) {
    let minDist = Double.MAX_VALUE
    let snapIndex = -1
    for (let i = 0; i < srcCoords.size() - 1; i++) {
      this._seg.p0 = srcCoords.get(i)
      this._seg.p1 = srcCoords.get(i + 1)
      if (this._seg.p0.equals2D(snapPt) || this._seg.p1.equals2D(snapPt)) 
        if (this._allowSnappingToSourceVertices) continue; else return -1
      
      const dist = this._seg.distance(snapPt)
      if (dist < this._snapTolerance && dist < minDist) {
        minDist = dist
        snapIndex = i
      }
    }
    return snapIndex
  }
  setAllowSnappingToSourceVertices(allowSnappingToSourceVertices) {
    this._allowSnappingToSourceVertices = allowSnappingToSourceVertices
  }
}
