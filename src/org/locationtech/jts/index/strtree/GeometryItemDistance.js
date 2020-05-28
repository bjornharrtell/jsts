import Double from '../../../../../java/lang/Double'
import ItemDistance from './ItemDistance'
export default class GeometryItemDistance {
  distance(item1, item2) {
    if (item1 === item2) return Double.MAX_VALUE
    const g1 = item1.getItem()
    const g2 = item2.getItem()
    return g1.distance(g2)
  }
  get interfaces_() {
    return [ItemDistance]
  }
}
