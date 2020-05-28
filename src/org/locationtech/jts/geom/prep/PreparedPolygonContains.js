import AbstractPreparedPolygonContains from './AbstractPreparedPolygonContains'
export default class PreparedPolygonContains extends AbstractPreparedPolygonContains {
  constructor() {
    super()
    PreparedPolygonContains.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const prepPoly = arguments[0]
    AbstractPreparedPolygonContains.constructor_.call(this, prepPoly)
  }
  static contains(prep, geom) {
    const polyInt = new PreparedPolygonContains(prep)
    return polyInt.contains(geom)
  }
  fullTopologicalPredicate(geom) {
    const isContained = this._prepPoly.getGeometry().contains(geom)
    return isContained
  }
  contains(geom) {
    return this.eval(geom)
  }
}
