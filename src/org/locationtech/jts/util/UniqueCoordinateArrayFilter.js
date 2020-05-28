import HashSet from '../../../../java/util/HashSet'
import CoordinateFilter from '../geom/CoordinateFilter'
import ArrayList from '../../../../java/util/ArrayList'
export default class UniqueCoordinateArrayFilter {
  constructor() {
    UniqueCoordinateArrayFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._coordSet = new HashSet()
    this._list = new ArrayList()
  }
  static filterCoordinates(coords) {
    const filter = new UniqueCoordinateArrayFilter()
    for (let i = 0; i < coords.length; i++) 
      filter.filter(coords[i])
    
    return filter.getCoordinates()
  }
  filter(coord) {
    if (this._coordSet.add(coord)) 
      this._list.add(coord)
    
  }
  getCoordinates() {
    const coordinates = new Array(this._list.size()).fill(null)
    return this._list.toArray(coordinates)
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
