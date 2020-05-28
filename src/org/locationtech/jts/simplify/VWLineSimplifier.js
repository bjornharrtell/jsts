import CoordinateList from '../geom/CoordinateList'
import Coordinate from '../geom/Coordinate'
import Double from '../../../../java/lang/Double'
import Triangle from '../geom/Triangle'
export default class VWLineSimplifier {
  constructor() {
    VWLineSimplifier.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pts = null
    this._tolerance = null
    const pts = arguments[0], distanceTolerance = arguments[1]
    this._pts = pts
    this._tolerance = distanceTolerance * distanceTolerance
  }
  static simplify(pts, distanceTolerance) {
    const simp = new VWLineSimplifier(pts, distanceTolerance)
    return simp.simplify()
  }
  simplifyVertex(vwLine) {
    let curr = vwLine
    let minArea = curr.getArea()
    let minVertex = null
    while (curr !== null) {
      const area = curr.getArea()
      if (area < minArea) {
        minArea = area
        minVertex = curr
      }
      curr = curr._next
    }
    if (minVertex !== null && minArea < this._tolerance) 
      minVertex.remove()
    
    if (!vwLine.isLive()) return -1
    return minArea
  }
  simplify() {
    const vwLine = VWVertex.buildLine(this._pts)
    let minArea = this._tolerance
    do 
      minArea = this.simplifyVertex(vwLine)
    while (minArea < this._tolerance)
    const simp = vwLine.getCoordinates()
    if (simp.length < 2) 
      return [simp[0], new Coordinate(simp[0])]
    
    return simp
  }
}
class VWVertex {
  constructor() {
    VWVertex.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pt = null
    this._prev = null
    this._next = null
    this._area = VWVertex.MAX_AREA
    this._isLive = true
    const pt = arguments[0]
    this._pt = pt
  }
  static buildLine(pts) {
    let first = null
    let prev = null
    for (let i = 0; i < pts.length; i++) {
      const v = new VWVertex(pts[i])
      if (first === null) first = v
      v.setPrev(prev)
      if (prev !== null) {
        prev.setNext(v)
        prev.updateArea()
      }
      prev = v
    }
    return first
  }
  getCoordinates() {
    const coords = new CoordinateList()
    let curr = this
    do {
      coords.add(curr._pt, false)
      curr = curr._next
    } while (curr !== null)
    return coords.toCoordinateArray()
  }
  getArea() {
    return this._area
  }
  updateArea() {
    if (this._prev === null || this._next === null) {
      this._area = VWVertex.MAX_AREA
      return null
    }
    this._area = Math.abs(Triangle.area(this._prev._pt, this._pt, this._next._pt))
  }
  remove() {
    const tmpPrev = this._prev
    const tmpNext = this._next
    let result = null
    if (this._prev !== null) {
      this._prev.setNext(tmpNext)
      this._prev.updateArea()
      result = this._prev
    }
    if (this._next !== null) {
      this._next.setPrev(tmpPrev)
      this._next.updateArea()
      if (result === null) result = this._next
    }
    this._isLive = false
    return result
  }
  isLive() {
    return this._isLive
  }
  setPrev(prev) {
    this._prev = prev
  }
  setNext(next) {
    this._next = next
  }
}
VWVertex.MAX_AREA = Double.MAX_VALUE
VWLineSimplifier.VWVertex = VWVertex
