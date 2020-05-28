import HashMap from '../../../../java/util/HashMap'
export default class ObjectCounter {
  constructor() {
    ObjectCounter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._counts = new HashMap()
  }
  count(o) {
    const counter = this._counts.get(o)
    if (counter === null) return 0; else return counter.count()
  }
  add(o) {
    const counter = this._counts.get(o)
    if (counter === null) this._counts.put(o, new Counter(1)); else counter.increment()
  }
}
class Counter {
  constructor() {
    Counter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.count = 0
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const count = arguments[0]
      this.count = count
    }
  }
  count() {
    return this.count
  }
  increment() {
    this.count++
  }
}
ObjectCounter.Counter = Counter
