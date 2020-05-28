import PreparedPolygonIntersects from './PreparedPolygonIntersects'
import FastSegmentSetIntersectionFinder from '../../noding/FastSegmentSetIntersectionFinder'
import SegmentStringUtil from '../../noding/SegmentStringUtil'
import PreparedPolygonContainsProperly from './PreparedPolygonContainsProperly'
import PreparedPolygonContains from './PreparedPolygonContains'
import PreparedPolygonCovers from './PreparedPolygonCovers'
import BasicPreparedGeometry from './BasicPreparedGeometry'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator'
import RectangleContains from '../../operation/predicate/RectangleContains'
import RectangleIntersects from '../../operation/predicate/RectangleIntersects'
export default class PreparedPolygon extends BasicPreparedGeometry {
  constructor() {
    super()
    PreparedPolygon.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isRectangle = null
    this._segIntFinder = null
    this._pia = null
    const poly = arguments[0]
    BasicPreparedGeometry.constructor_.call(this, poly)
    this._isRectangle = this.getGeometry().isRectangle()
  }
  containsProperly(g) {
    if (!this.envelopeCovers(g)) return false
    return PreparedPolygonContainsProperly.containsProperly(this, g)
  }
  getPointLocator() {
    if (this._pia === null) this._pia = new IndexedPointInAreaLocator(this.getGeometry())
    return this._pia
  }
  covers(g) {
    if (!this.envelopeCovers(g)) return false
    if (this._isRectangle) 
      return true
    
    return PreparedPolygonCovers.covers(this, g)
  }
  intersects(g) {
    if (!this.envelopesIntersect(g)) return false
    if (this._isRectangle) 
      return RectangleIntersects.intersects(this.getGeometry(), g)
    
    return PreparedPolygonIntersects.intersects(this, g)
  }
  contains(g) {
    if (!this.envelopeCovers(g)) return false
    if (this._isRectangle) 
      return RectangleContains.contains(this.getGeometry(), g)
    
    return PreparedPolygonContains.contains(this, g)
  }
  getIntersectionFinder() {
    if (this._segIntFinder === null) this._segIntFinder = new FastSegmentSetIntersectionFinder(SegmentStringUtil.extractSegmentStrings(this.getGeometry()))
    return this._segIntFinder
  }
}
