import Geometry from '../Geometry'
import GeometryCollection from '../GeometryCollection'
import ArrayList from '../../../../../java/util/ArrayList'
import GeometryFilter from '../GeometryFilter'
export default class GeometryExtracter {
  constructor() {
    GeometryExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometryType = null
    this._comps = null
    const geometryType = arguments[0], comps = arguments[1]
    this._geometryType = geometryType
    this._comps = comps
  }
  static isOfType(geom, geometryType) {
    if (geom.getGeometryType() === geometryType) return true
    if (geometryType === Geometry.TYPENAME_LINESTRING && geom.getGeometryType() === Geometry.TYPENAME_LINEARRING) return true
    return false
  }
  static extract() {
    if (arguments.length === 2) {
      const geom = arguments[0], geometryType = arguments[1]
      return GeometryExtracter.extract(geom, geometryType, new ArrayList())
    } else if (arguments.length === 3) {
      const geom = arguments[0], geometryType = arguments[1], list = arguments[2]
      if (geom.getGeometryType() === geometryType) 
        list.add(geom)
      else if (geom instanceof GeometryCollection) 
        geom.apply(new GeometryExtracter(geometryType, list))
      
      return list
    }
  }
  filter(geom) {
    if (this._geometryType === null || GeometryExtracter.isOfType(geom, this._geometryType)) this._comps.add(geom)
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
