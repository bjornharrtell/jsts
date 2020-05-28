import GeometryFactory from '../GeometryFactory'
import ArrayList from '../../../../../java/util/ArrayList'
export default class GeometryCollectionMapper {
  constructor() {
    GeometryCollectionMapper.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._mapOp = null
    const mapOp = arguments[0]
    this._mapOp = mapOp
  }
  static map(gc, op) {
    const mapper = new GeometryCollectionMapper(op)
    return mapper.map(gc)
  }
  map(gc) {
    const mapped = new ArrayList()
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = this._mapOp.map(gc.getGeometryN(i))
      if (!g.isEmpty()) mapped.add(g)
    }
    return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped))
  }
}
