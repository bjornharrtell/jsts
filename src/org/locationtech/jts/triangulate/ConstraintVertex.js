import Vertex from './quadedge/Vertex'
export default class ConstraintVertex extends Vertex {
  constructor() {
    super()
    ConstraintVertex.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._isOnConstraint = null
    this._constraint = null
    const p = arguments[0]
    Vertex.constructor_.call(this, p)
  }
  getConstraint() {
    return this._constraint
  }
  setOnConstraint(isOnConstraint) {
    this._isOnConstraint = isOnConstraint
  }
  merge(other) {
    if (other._isOnConstraint) {
      this._isOnConstraint = true
      this._constraint = other._constraint
    }
  }
  isOnConstraint() {
    return this._isOnConstraint
  }
  setConstraint(constraint) {
    this._isOnConstraint = true
    this._constraint = constraint
  }
}
