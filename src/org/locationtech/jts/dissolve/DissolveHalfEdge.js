import MarkHalfEdge from '../edgegraph/MarkHalfEdge'
export default class DissolveHalfEdge extends MarkHalfEdge {
  constructor() {
    super()
    DissolveHalfEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isStart = false
    const orig = arguments[0]
    MarkHalfEdge.constructor_.call(this, orig)
  }
  setStart() {
    this._isStart = true
  }
  isStart() {
    return this._isStart
  }
}
