import STRtree from '../../index/strtree/STRtree.js'
import PolygonTopologyAnalyzer from './PolygonTopologyAnalyzer.js'
export default class IndexedNestedHoleTester {
  constructor() {
    IndexedNestedHoleTester.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._polygon = null
    this._index = null
    this._nestedPt = null
    const poly = arguments[0]
    this._polygon = poly
    this.loadIndex()
  }
  loadIndex() {
    this._index = new STRtree()
    for (let i = 0; i < this._polygon.getNumInteriorRing(); i++) {
      const hole = this._polygon.getInteriorRingN(i)
      const env = hole.getEnvelopeInternal()
      this._index.insert(env, hole)
    }
  }
  getNestedPoint() {
    return this._nestedPt
  }
  isNested() {
    for (let i = 0; i < this._polygon.getNumInteriorRing(); i++) {
      const hole = this._polygon.getInteriorRingN(i)
      const results = this._index.query(hole.getEnvelopeInternal())
      for (const testHole of results) {
        if (hole === testHole) continue
        if (!testHole.getEnvelopeInternal().covers(hole.getEnvelopeInternal())) continue
        if (PolygonTopologyAnalyzer.isRingNested(hole, testHole)) {
          this._nestedPt = hole.getCoordinateN(0)
          return true
        }
      }
    }
    return false
  }
}
