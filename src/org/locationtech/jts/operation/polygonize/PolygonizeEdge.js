import Edge from '../../planargraph/Edge'
export default class PolygonizeEdge extends Edge {
  constructor() {
    super()
    PolygonizeEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._line = null
    const line = arguments[0]
    this._line = line
  }
  getLine() {
    return this._line
  }
}
