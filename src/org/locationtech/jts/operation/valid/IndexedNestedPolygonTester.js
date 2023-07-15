import Location from '../../geom/Location.js'
import STRtree from '../../index/strtree/STRtree.js'
import PolygonTopologyAnalyzer from './PolygonTopologyAnalyzer.js'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator.js'
export default class IndexedNestedPolygonTester {
  constructor() {
    IndexedNestedPolygonTester.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._multiPoly = null
    this._index = null
    this._locators = null
    this._nestedPt = null
    const multiPoly = arguments[0]
    this._multiPoly = multiPoly
    this.loadIndex()
  }
  static findIncidentSegmentNestedPoint(shell, poly) {
    const polyShell = poly.getExteriorRing()
    if (polyShell.isEmpty()) return null
    if (!PolygonTopologyAnalyzer.isRingNested(shell, polyShell)) return null
    for (let i = 0; i < poly.getNumInteriorRing(); i++) {
      const hole = poly.getInteriorRingN(i)
      if (hole.getEnvelopeInternal().covers(shell.getEnvelopeInternal()) && PolygonTopologyAnalyzer.isRingNested(shell, hole)) 
        return null
      
    }
    return shell.getCoordinateN(0)
  }
  getNestedPoint() {
    return this._nestedPt
  }
  loadIndex() {
    this._index = new STRtree()
    for (let i = 0; i < this._multiPoly.getNumGeometries(); i++) {
      const poly = this._multiPoly.getGeometryN(i)
      const env = poly.getEnvelopeInternal()
      this._index.insert(env, i)
    }
  }
  isNested() {
    for (let i = 0; i < this._multiPoly.getNumGeometries(); i++) {
      const poly = this._multiPoly.getGeometryN(i)
      const shell = poly.getExteriorRing()
      const results = this._index.query(poly.getEnvelopeInternal())
      for (const polyIndex of results) {
        const possibleOuterPoly = this._multiPoly.getGeometryN(polyIndex)
        if (poly === possibleOuterPoly) continue
        if (!possibleOuterPoly.getEnvelopeInternal().covers(poly.getEnvelopeInternal())) continue
        this._nestedPt = this.findNestedPoint(shell, possibleOuterPoly, this.getLocator(polyIndex))
        if (this._nestedPt !== null) return true
      }
    }
    return false
  }
  getLocator(polyIndex) {
    if (this._locators === null) 
      this._locators = new Array(this._multiPoly.getNumGeometries()).fill(null)
    
    let locator = this._locators[polyIndex]
    if (locator === null) {
      locator = new IndexedPointInAreaLocator(this._multiPoly.getGeometryN(polyIndex))
      this._locators[polyIndex] = locator
    }
    return locator
  }
  findNestedPoint(shell, possibleOuterPoly, locator) {
    const shellPt0 = shell.getCoordinateN(0)
    const loc0 = locator.locate(shellPt0)
    if (loc0 === Location.EXTERIOR) return null
    if (loc0 === Location.INTERIOR) 
      return shellPt0
    
    const shellPt1 = shell.getCoordinateN(1)
    const loc1 = locator.locate(shellPt1)
    if (loc1 === Location.EXTERIOR) return null
    if (loc1 === Location.INTERIOR) 
      return shellPt1
    
    return IndexedNestedPolygonTester.findIncidentSegmentNestedPoint(shell, possibleOuterPoly)
  }
}
