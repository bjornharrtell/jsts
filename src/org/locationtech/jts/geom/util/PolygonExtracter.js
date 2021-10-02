import Polygon from '../Polygon.js'
import GeometryCollection from '../GeometryCollection.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import GeometryFilter from '../GeometryFilter.js'
export default class PolygonExtracter {
  constructor() {
    PolygonExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._comps = null
    const comps = arguments[0]
    this._comps = comps
  }
  static getPolygons() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      return PolygonExtracter.getPolygons(geom, new ArrayList())
    } else if (arguments.length === 2) {
      const geom = arguments[0], list = arguments[1]
      if (geom instanceof Polygon) 
        list.add(geom)
      else if (geom instanceof GeometryCollection) 
        geom.apply(new PolygonExtracter(list))
      
      return list
    }
  }
  filter(geom) {
    if (geom instanceof Polygon) this._comps.add(geom)
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
