import Coordinate from '../../geom/Coordinate'
export default class KdNode {
  constructor() {
    KdNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._p = null
    this._data = null
    this._left = null
    this._right = null
    this._count = null
    if (arguments.length === 2) {
      const p = arguments[0], data = arguments[1]
      this._p = new Coordinate(p)
      this._left = null
      this._right = null
      this._count = 1
      this._data = data
    } else if (arguments.length === 3) {
      const _x = arguments[0], _y = arguments[1], data = arguments[2]
      this._p = new Coordinate(_x, _y)
      this._left = null
      this._right = null
      this._count = 1
      this._data = data
    }
  }
  isRepeated() {
    return this._count > 1
  }
  getRight() {
    return this._right
  }
  getCoordinate() {
    return this._p
  }
  setLeft(_left) {
    this._left = _left
  }
  getX() {
    return this._p.x
  }
  getData() {
    return this._data
  }
  getCount() {
    return this._count
  }
  getLeft() {
    return this._left
  }
  getY() {
    return this._p.y
  }
  increment() {
    this._count = this._count + 1
  }
  setRight(_right) {
    this._right = _right
  }
}
