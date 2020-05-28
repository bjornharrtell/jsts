import CoordinateList from '../geom/CoordinateList'
import Coordinate from '../geom/Coordinate'
import LineSegment from '../geom/LineSegment'
export default class DouglasPeuckerLineSimplifier {
  constructor() {
    DouglasPeuckerLineSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    this._usePt = null
    this._distanceTolerance = null
    this._seg = new LineSegment()
    const pts = arguments[0]
    this._pts = pts
  }
  static simplify(pts, distanceTolerance) {
    const simp = new DouglasPeuckerLineSimplifier(pts)
    simp.setDistanceTolerance(distanceTolerance)
    return simp.simplify()
  }
  simplifySection(i, j) {
    if (i + 1 === j) 
      return null
    
    this._seg.p0 = this._pts[i]
    this._seg.p1 = this._pts[j]
    let maxDistance = -1.0
    let maxIndex = i
    for (let k = i + 1; k < j; k++) {
      const distance = this._seg.distance(this._pts[k])
      if (distance > maxDistance) {
        maxDistance = distance
        maxIndex = k
      }
    }
    if (maxDistance <= this._distanceTolerance) {
      for (let k = i + 1; k < j; k++) 
        this._usePt[k] = false
      
    } else {
      this.simplifySection(i, maxIndex)
      this.simplifySection(maxIndex, j)
    }
  }
  setDistanceTolerance(distanceTolerance) {
    this._distanceTolerance = distanceTolerance
  }
  simplify() {
    this._usePt = new Array(this._pts.length).fill(null)
    for (let i = 0; i < this._pts.length; i++) 
      this._usePt[i] = true
    
    this.simplifySection(0, this._pts.length - 1)
    const coordList = new CoordinateList()
    for (let i = 0; i < this._pts.length; i++) 
      if (this._usePt[i]) coordList.add(new Coordinate(this._pts[i]))
    
    return coordList.toCoordinateArray()
  }
}
