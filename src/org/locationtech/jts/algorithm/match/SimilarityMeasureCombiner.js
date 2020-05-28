export default class SimilarityMeasureCombiner {
  static combine(measure1, measure2) {
    return Math.min(measure1, measure2)
  }
}
