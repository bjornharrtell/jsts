import CoordinateList from '../../geom/CoordinateList.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
export default class LineLimiter {
  constructor() {
    LineLimiter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._limitEnv = null
    this._ptList = null
    this._lastOutside = null
    this._sections = null
    const env = arguments[0]
    this._limitEnv = env
  }
  isSectionOpen() {
    return this._ptList !== null
  }
  addPoint(p) {
    if (p === null) return null
    this.startSection()
    this._ptList.add(p, false)
  }
  addOutside(p) {
    const segIntersects = this.isLastSegmentIntersecting(p)
    if (!segIntersects) {
      this.finishSection()
    } else {
      this.addPoint(this._lastOutside)
      this.addPoint(p)
    }
    this._lastOutside = p
  }
  finishSection() {
    if (this._ptList === null) return null
    if (this._lastOutside !== null) {
      this._ptList.add(this._lastOutside, false)
      this._lastOutside = null
    }
    const section = this._ptList.toCoordinateArray()
    this._sections.add(section)
    this._ptList = null
  }
  startSection() {
    if (this._ptList === null) 
      this._ptList = new CoordinateList()
    
    if (this._lastOutside !== null) 
      this._ptList.add(this._lastOutside, false)
    
    this._lastOutside = null
  }
  limit(pts) {
    this._lastOutside = null
    this._ptList = null
    this._sections = new ArrayList()
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      if (this._limitEnv.intersects(p)) this.addPoint(p); else 
        this.addOutside(p)
      
    }
    this.finishSection()
    return this._sections
  }
  isLastSegmentIntersecting(p) {
    if (this._lastOutside === null) {
      if (this.isSectionOpen()) return true
      return false
    }
    return this._limitEnv.intersects(this._lastOutside, p)
  }
}
