import HalfEdge from './HalfEdge.js'
export default class MarkHalfEdge extends HalfEdge {
  constructor() {
    super()
    MarkHalfEdge.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isMarked = false
    const orig = arguments[0]
    HalfEdge.constructor_.call(this, orig)
  }
  static setMarkBoth(e, isMarked) {
    e.setMark(isMarked)
    e.sym().setMark(isMarked)
  }
  static isMarked(e) {
    return e.isMarked()
  }
  static setMark(e, isMarked) {
    e.setMark(isMarked)
  }
  static markBoth(e) {
    e.mark()
    e.sym().mark()
  }
  static mark(e) {
    e.mark()
  }
  setMark(isMarked) {
    this._isMarked = isMarked
  }
  mark() {
    this._isMarked = true
  }
  isMarked() {
    return this._isMarked
  }
}
