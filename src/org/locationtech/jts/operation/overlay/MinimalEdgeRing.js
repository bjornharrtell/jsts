import EdgeRing from '../../geomgraph/EdgeRing.js'
export default class MinimalEdgeRing extends EdgeRing {
  constructor() {
    super()
    MinimalEdgeRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const start = arguments[0], geometryFactory = arguments[1]
    EdgeRing.constructor_.call(this, start, geometryFactory)
  }
  getNext(de) {
    return de.getNextMin()
  }
  setEdgeRing(de, er) {
    de.setMinEdgeRing(er)
  }
}
