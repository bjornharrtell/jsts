import FacetSequenceTreeBuilder from './FacetSequenceTreeBuilder'
import ItemDistance from '../../index/strtree/ItemDistance'
export default class IndexedFacetDistance {
  constructor() {
    IndexedFacetDistance.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._cachedTree = null
    this._baseGeometry = null
    const geom = arguments[0]
    this._baseGeometry = geom
    this._cachedTree = FacetSequenceTreeBuilder.build(geom)
  }
  static distance(g1, g2) {
    const dist = new IndexedFacetDistance(g1)
    return dist.distance(g2)
  }
  static isWithinDistance(g1, g2, distance) {
    const dist = new IndexedFacetDistance(g1)
    return dist.isWithinDistance(g2, distance)
  }
  static nearestPoints(g1, g2) {
    const dist = new IndexedFacetDistance(g1)
    return dist.nearestPoints(g2)
  }
  static toPoints(locations) {
    if (locations === null) return null
    const nearestPts = [locations[0].getCoordinate(), locations[1].getCoordinate()]
    return nearestPts
  }
  distance(g) {
    const tree2 = FacetSequenceTreeBuilder.build(g)
    const obj = this._cachedTree.nearestNeighbour(tree2, IndexedFacetDistance.FACET_SEQ_DIST)
    const fs1 = obj[0]
    const fs2 = obj[1]
    return fs1.distance(fs2)
  }
  isWithinDistance(g, maxDistance) {
    const envDist = this._baseGeometry.getEnvelopeInternal().distance(g.getEnvelopeInternal())
    if (envDist > maxDistance) return false
    const tree2 = FacetSequenceTreeBuilder.build(g)
    return this._cachedTree.isWithinDistance(tree2, IndexedFacetDistance.FACET_SEQ_DIST, maxDistance)
  }
  nearestPoints(g) {
    const minDistanceLocation = this.nearestLocations(g)
    const nearestPts = IndexedFacetDistance.toPoints(minDistanceLocation)
    return nearestPts
  }
  nearestLocations(g) {
    const tree2 = FacetSequenceTreeBuilder.build(g)
    const obj = this._cachedTree.nearestNeighbour(tree2, IndexedFacetDistance.FACET_SEQ_DIST)
    const fs1 = obj[0]
    const fs2 = obj[1]
    return fs1.nearestLocations(fs2)
  }
}
class FacetSequenceDistance {
  distance(item1, item2) {
    const fs1 = item1.getItem()
    const fs2 = item2.getItem()
    return fs1.distance(fs2)
  }
  get interfaces_() {
    return [ItemDistance]
  }
}
IndexedFacetDistance.FacetSequenceDistance = FacetSequenceDistance
IndexedFacetDistance.FACET_SEQ_DIST = new FacetSequenceDistance()
