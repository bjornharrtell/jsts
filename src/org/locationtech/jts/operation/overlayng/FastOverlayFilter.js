import OverlayNG from './OverlayNG.js'
import OverlayUtil from './OverlayUtil.js'
export default class FastOverlayFilter {
  constructor() {
    FastOverlayFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._targetGeom = null
    this._isTargetRectangle = null
    const geom = arguments[0]
    this._targetGeom = geom
    this._isTargetRectangle = this._targetGeom.isRectangle()
  }
  createEmpty(geom) {
    return OverlayUtil.createEmptyResult(geom.getDimension(), geom.getFactory())
  }
  isEnvelopeCovers(a, b) {
    return a.getEnvelopeInternal().covers(b.getEnvelopeInternal())
  }
  intersection(geom) {
    const resultForRect = this.intersectionRectangle(geom)
    if (resultForRect !== null) return resultForRect
    if (!this.isEnvelopeIntersects(this._targetGeom, geom)) 
      return this.createEmpty(geom)
    
    return null
  }
  overlay(geom, overlayOpCode) {
    if (overlayOpCode !== OverlayNG.INTERSECTION) return null
    return this.intersection(geom)
  }
  isEnvelopeIntersects(a, b) {
    return a.getEnvelopeInternal().intersects(b.getEnvelopeInternal())
  }
  intersectionRectangle(geom) {
    if (!this._isTargetRectangle) return null
    if (this.isEnvelopeCovers(this._targetGeom, geom)) 
      return geom.copy()
    
    if (!this.isEnvelopeIntersects(this._targetGeom, geom)) 
      return this.createEmpty(geom)
    
    return null
  }
}
