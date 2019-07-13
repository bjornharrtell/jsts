import SimilarityMeasure from './SimilarityMeasure'
export default class AreaSimilarityMeasure {
  constructor () {
    AreaSimilarityMeasure.constructor_.apply(this, arguments)
  }

  measure (g1, g2) {
    const areaInt = g1.intersection(g2).getArea()
    const areaUnion = g1.union(g2).getArea()
    return areaInt / areaUnion
  }

  getClass () {
    return AreaSimilarityMeasure
  }

  get interfaces_ () {
    return [SimilarityMeasure]
  }
}
AreaSimilarityMeasure.constructor_ = function () {}
