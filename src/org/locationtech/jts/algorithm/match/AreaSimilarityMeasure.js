import SimilarityMeasure from './SimilarityMeasure.js'
import UnionOp from '../../operation/union/UnionOp.js'
import OverlayOp from '../../operation/overlay/OverlayOp.js'
export default class AreaSimilarityMeasure {
  measure(g1, g2) {
    const areaInt = OverlayOp.intersection(g1, g2).getArea()
    const areaUnion = UnionOp.union(g1, g2).getArea()
    return areaInt / areaUnion
  }
  get interfaces_() {
    return [SimilarityMeasure]
  }
}
