export default class SpatialIndex {
  constructor () {
    SpatialIndex.constructor_.apply(this, arguments)
  }

  insert (itemEnv, item) {}

  remove (itemEnv, item) {}

  query () {
    if (arguments.length === 1) {
      const searchEnv = arguments[0]
    } else if (arguments.length === 2) {
      const searchEnv = arguments[0]; const visitor = arguments[1]
    }
  }

  getClass () {
    return SpatialIndex
  }

  get interfaces_ () {
    return []
  }
}
SpatialIndex.constructor_ = function () {}
