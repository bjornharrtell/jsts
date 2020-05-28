import Arrays from '../../../../java/util/Arrays'
import System from '../../../../java/lang/System'
export default class IntArrayList {
  constructor() {
    IntArrayList.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._data = null
    this._size = 0
    if (arguments.length === 0) {
      IntArrayList.constructor_.call(this, 10)
    } else if (arguments.length === 1) {
      const initialCapacity = arguments[0]
      this._data = new Array(initialCapacity).fill(null)
    }
  }
  size() {
    return this._size
  }
  addAll(values) {
    if (values === null) return null
    if (values.length === 0) return null
    this.ensureCapacity(this._size + values.length)
    System.arraycopy(values, 0, this._data, this._size, values.length)
    this._size += values.length
  }
  ensureCapacity(capacity) {
    if (capacity <= this._data.length) return null
    const newLength = Math.max(capacity, this._data.length * 2)
    this._data = Arrays.copyOf(this._data, newLength)
  }
  toArray() {
    const array = new Array(this._size).fill(null)
    System.arraycopy(this._data, 0, array, 0, this._size)
    return array
  }
  add(value) {
    this.ensureCapacity(this._size + 1)
    this._data[this._size] = value
    ++ this._size
  }
}
