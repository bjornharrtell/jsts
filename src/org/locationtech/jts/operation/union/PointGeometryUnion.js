import PointLocator from '../../algorithm/PointLocator'
import Location from '../../geom/Location'
import TreeSet from '../../../../../java/util/TreeSet'
import GeometryCombiner from '../../geom/util/GeometryCombiner'
import CoordinateArrays from '../../geom/CoordinateArrays'
export default class PointGeometryUnion {
  constructor() {
    PointGeometryUnion.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pointGeom = null
    this._otherGeom = null
    this._geomFact = null
    const pointGeom = arguments[0], otherGeom = arguments[1]
    this._pointGeom = pointGeom
    this._otherGeom = otherGeom
    this._geomFact = otherGeom.getFactory()
  }
  static union(pointGeom, otherGeom) {
    const unioner = new PointGeometryUnion(pointGeom, otherGeom)
    return unioner.union()
  }
  union() {
    const locater = new PointLocator()
    const exteriorCoords = new TreeSet()
    for (let i = 0; i < this._pointGeom.getNumGeometries(); i++) {
      const point = this._pointGeom.getGeometryN(i)
      const coord = point.getCoordinate()
      const loc = locater.locate(coord, this._otherGeom)
      if (loc === Location.EXTERIOR) exteriorCoords.add(coord)
    }
    if (exteriorCoords.size() === 0) return this._otherGeom
    let ptComp = null
    const coords = CoordinateArrays.toCoordinateArray(exteriorCoords)
    if (coords.length === 1) 
      ptComp = this._geomFact.createPoint(coords[0])
    else 
      ptComp = this._geomFact.createMultiPointFromCoords(coords)
    
    return GeometryCombiner.combine(ptComp, this._otherGeom)
  }
}
