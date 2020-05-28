import SimilarityMeasure from './SimilarityMeasure'
import Envelope from '../../geom/Envelope'
import DiscreteHausdorffDistance from '../distance/DiscreteHausdorffDistance'
export default class HausdorffSimilarityMeasure {
  static diagonalSize(env) {
    if (env.isNull()) return 0.0
    const width = env.getWidth()
    const hgt = env.getHeight()
    return Math.sqrt(width * width + hgt * hgt)
  }
  measure(g1, g2) {
    const distance = DiscreteHausdorffDistance.distance(g1, g2, HausdorffSimilarityMeasure.DENSIFY_FRACTION)
    const env = new Envelope(g1.getEnvelopeInternal())
    env.expandToInclude(g2.getEnvelopeInternal())
    const envSize = HausdorffSimilarityMeasure.diagonalSize(env)
    const measure = 1 - distance / envSize
    return measure
  }
  get interfaces_() {
    return [SimilarityMeasure]
  }
}
HausdorffSimilarityMeasure.DENSIFY_FRACTION = 0.25
