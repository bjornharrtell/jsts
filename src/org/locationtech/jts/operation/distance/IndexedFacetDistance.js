import FacetSequenceTreeBuilder from './FacetSequenceTreeBuilder'
import ItemDistance from '../../index/strtree/ItemDistance'
export default class IndexedFacetDistance {
  constructor () {
    IndexedFacetDistance.constructor_.apply(this, arguments)
  }

  static distance (g1, g2) {
    const dist = new IndexedFacetDistance(g1)
    return dist.getDistance(g2)
  }

  static facetDistance (obj) {
    const o1 = obj[0]
    const o2 = obj[1]
    return o1.distance(o2)
  }

  getDistance (g) {
    const tree2 = FacetSequenceTreeBuilder.build(g)
    const obj = this._cachedTree.nearestNeighbour(tree2, new FacetSequenceDistance())
    return IndexedFacetDistance.facetDistance(obj)
  }

  getClass () {
    return IndexedFacetDistance
  }

  get interfaces_ () {
    return []
  }
}
class FacetSequenceDistance {
  constructor () {
    FacetSequenceDistance.constructor_.apply(this, arguments)
  }

  distance (item1, item2) {
    const fs1 = item1.getItem()
    const fs2 = item2.getItem()
    return fs1.distance(fs2)
  }

  getClass () {
    return FacetSequenceDistance
  }

  get interfaces_ () {
    return [ItemDistance]
  }
}
FacetSequenceDistance.constructor_ = function () {}
IndexedFacetDistance.FacetSequenceDistance = FacetSequenceDistance
IndexedFacetDistance.constructor_ = function () {
  this._cachedTree = null
  const g1 = arguments[0]
  this._cachedTree = FacetSequenceTreeBuilder.build(g1)
}
