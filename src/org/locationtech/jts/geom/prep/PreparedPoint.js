import BasicPreparedGeometry from './BasicPreparedGeometry'
export default class PreparedPoint extends BasicPreparedGeometry {
  constructor() {
    super()
    PreparedPoint.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const point = arguments[0]
    BasicPreparedGeometry.constructor_.call(this, point)
  }
  intersects(g) {
    if (!this.envelopesIntersect(g)) return false
    return this.isAnyTargetComponentInTest(g)
  }
}
