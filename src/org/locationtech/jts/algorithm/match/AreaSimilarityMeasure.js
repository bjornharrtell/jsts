import SimilarityMeasure from './SimilarityMeasure'
export default class AreaSimilarityMeasure {
  measure(g1, g2) {
    const areaInt = g1.intersection(g2).getArea()
    const areaUnion = g1.union(g2).getArea()
    return areaInt / areaUnion
  }
  get interfaces_() {
    return [SimilarityMeasure]
  }
}
