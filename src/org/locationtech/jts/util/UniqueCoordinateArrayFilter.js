import TreeSet from '../../../../java/util/TreeSet'
import CoordinateFilter from '../geom/CoordinateFilter'
import ArrayList from '../../../../java/util/ArrayList'
export default class UniqueCoordinateArrayFilter {
  constructor () {
    UniqueCoordinateArrayFilter.constructor_.apply(this, arguments)
  }

  static filterCoordinates (coords) {
    const filter = new UniqueCoordinateArrayFilter()
    for (let i = 0; i < coords.length; i++) {
      filter.filter(coords[i])
    }
    return filter.getCoordinates()
  }

  filter (coord) {
    if (!this.treeSet.contains(coord)) {
      this.list.add(coord)
      this.treeSet.add(coord)
    }
  }

  getCoordinates () {
    const coordinates = new Array(this.list.size()).fill(null)
    return this.list.toArray(coordinates)
  }

  getClass () {
    return UniqueCoordinateArrayFilter
  }

  get interfaces_ () {
    return [CoordinateFilter]
  }
}
UniqueCoordinateArrayFilter.constructor_ = function () {
  this.treeSet = new TreeSet()
  this.list = new ArrayList()
}
