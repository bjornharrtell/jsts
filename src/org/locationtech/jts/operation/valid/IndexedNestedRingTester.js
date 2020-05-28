import STRtree from '../../index/strtree/STRtree'
import IsValidOp from './IsValidOp'
import PointLocation from '../../algorithm/PointLocation'
import ArrayList from '../../../../../java/util/ArrayList'
import Envelope from '../../geom/Envelope'
export default class IndexedNestedRingTester {
  constructor() {
    IndexedNestedRingTester.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._graph = null
    this._rings = new ArrayList()
    this._totalEnv = new Envelope()
    this._index = null
    this._nestedPt = null
    const graph = arguments[0]
    this._graph = graph
  }
  buildIndex() {
    this._index = new STRtree()
    for (let i = 0; i < this._rings.size(); i++) {
      const ring = this._rings.get(i)
      const env = ring.getEnvelopeInternal()
      this._index.insert(env, ring)
    }
  }
  getNestedPoint() {
    return this._nestedPt
  }
  isNonNested() {
    this.buildIndex()
    for (let i = 0; i < this._rings.size(); i++) {
      const innerRing = this._rings.get(i)
      const innerRingPts = innerRing.getCoordinates()
      const results = this._index.query(innerRing.getEnvelopeInternal())
      for (let j = 0; j < results.size(); j++) {
        const searchRing = results.get(j)
        const searchRingPts = searchRing.getCoordinates()
        if (innerRing === searchRing) continue
        if (!innerRing.getEnvelopeInternal().intersects(searchRing.getEnvelopeInternal())) continue
        const innerRingPt = IsValidOp.findPtNotNode(innerRingPts, searchRing, this._graph)
        if (innerRingPt === null) continue
        const isInside = PointLocation.isInRing(innerRingPt, searchRingPts)
        if (isInside) {
          this._nestedPt = innerRingPt
          return false
        }
      }
    }
    return true
  }
  add(ring) {
    this._rings.add(ring)
    this._totalEnv.expandToInclude(ring.getEnvelopeInternal())
  }
}
