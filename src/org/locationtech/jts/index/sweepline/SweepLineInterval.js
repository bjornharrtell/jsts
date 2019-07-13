export default class SweepLineInterval {
  constructor () {
    SweepLineInterval.constructor_.apply(this, arguments)
  }

  getMin () {
    return this._min
  }

  getItem () {
    return this._item
  }

  getMax () {
    return this._max
  }

  getClass () {
    return SweepLineInterval
  }

  get interfaces_ () {
    return []
  }
}
SweepLineInterval.constructor_ = function () {
  this._min = null
  this._max = null
  this._item = null
  if (arguments.length === 2) {
    const min = arguments[0]; const max = arguments[1]
    SweepLineInterval.constructor_.call(this, min, max, null)
  } else if (arguments.length === 3) {
    const min = arguments[0]; const max = arguments[1]; const item = arguments[2]
    this._min = min < max ? min : max
    this._max = max > min ? max : min
    this._item = item
  }
}
