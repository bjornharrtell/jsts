import AbstractPreparedPolygonContains from './AbstractPreparedPolygonContains'
export default class PreparedPolygonCovers extends AbstractPreparedPolygonContains {
  constructor() {
    super()
    PreparedPolygonCovers.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const prepPoly = arguments[0]
    AbstractPreparedPolygonContains.constructor_.call(this, prepPoly)
    this._requireSomePointInInterior = false
  }
  static covers(prep, geom) {
    const polyInt = new PreparedPolygonCovers(prep)
    return polyInt.covers(geom)
  }
  fullTopologicalPredicate(geom) {
    const result = this._prepPoly.getGeometry().covers(geom)
    return result
  }
  covers(geom) {
    return this.eval(geom)
  }
}
