import ArrayList from './ArrayList.js'
export default class PriorityQueue {
  constructor() {
    PriorityQueue.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._size = null
    this._items = null
    this._size = 0
    this._items = new ArrayList()
    this._items.add(null)
  }
  remove_(i) {
    if (this.isEmpty()) return null
    const minItem = this._items.get(i)
    this._items.set(1, this._items.get(this._size))
    this._size -= 1
    this.reorder(i)
    return minItem
  }
  poll() {
    return this.remove_(1)
  }
  size() {
    return this._size
  }
  reorder(hole) {
    let child = null
    const tmp = this._items.get(hole)
    for (; hole * 2 <= this._size; hole = child) {
      child = hole * 2
      if (child !== this._size && this._items.get(child + 1).compareTo(this._items.get(child)) < 0) child++
      if (this._items.get(child).compareTo(tmp) < 0) this._items.set(hole, this._items.get(child)); else break
    }
    this._items.set(hole, tmp)
  }
  clear() {
    this._size = 0
    this._items.clear()
  }
  peek() {
    if (this.isEmpty()) return null
    const minItem = this._items.get(1)
    return minItem
  }
  remove(o) {
    if (o === undefined) {
      o = this._items.get(1)
      this.remove_(1)
      return o
    } else {
      const i = this._items.array.indexOf(o)
      if (i === -1)
        return false
      this.remove_(i)
      return true
    }
  }
  isEmpty() {
    return this._size === 0
  }
  add(x) {
    this._items.add(null)
    this._size += 1
    let hole = this._size
    this._items.set(0, x)
    for (; x.compareTo(this._items.get(Math.trunc(hole / 2))) < 0; hole /= 2) 
      this._items.set(hole, this._items.get(Math.trunc(hole / 2)))
    
    this._items.set(hole, x)
  }
}
