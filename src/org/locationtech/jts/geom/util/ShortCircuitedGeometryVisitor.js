import GeometryCollection from '../GeometryCollection'
export default class ShortCircuitedGeometryVisitor {
  constructor() {
    ShortCircuitedGeometryVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isDone = false
  }
  applyTo(geom) {
    for (let i = 0; i < geom.getNumGeometries() && !this._isDone; i++) {
      const element = geom.getGeometryN(i)
      if (!(element instanceof GeometryCollection)) {
        this.visit(element)
        if (this.isDone()) {
          this._isDone = true
          return null
        }
      } else {
        this.applyTo(element)
      }
    }
  }
}
