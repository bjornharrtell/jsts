export default class SpatialIndex {
  query() {
    if (arguments.length === 1) {
      const searchEnv = arguments[0]
    } else if (arguments.length === 2) {
      const searchEnv = arguments[0], visitor = arguments[1]
    }
  }
  insert(itemEnv, item) {}
  remove(itemEnv, item) {}
}
