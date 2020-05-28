import Location from '../../geom/Location'
import Polygon from '../../geom/Polygon'
import PointLocation from '../PointLocation'
import PointOnGeometryLocator from './PointOnGeometryLocator'
import GeometryCollectionIterator from '../../geom/GeometryCollectionIterator'
import GeometryCollection from '../../geom/GeometryCollection'
export default class SimplePointInAreaLocator {
  constructor() {
    SimplePointInAreaLocator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = null
    const geom = arguments[0]
    this._geom = geom
  }
  static locatePointInPolygon(p, poly) {
    if (poly.isEmpty()) return Location.EXTERIOR
    const shell = poly.getExteriorRing()
    const shellLoc = SimplePointInAreaLocator.locatePointInRing(p, shell)
    if (shellLoc !== Location.INTERIOR) return shellLoc
    for (let i = 0; i < poly.getNumInteriorRing(); i++) {
      const hole = poly.getInteriorRingN(i)
      const holeLoc = SimplePointInAreaLocator.locatePointInRing(p, hole)
      if (holeLoc === Location.BOUNDARY) return Location.BOUNDARY
      if (holeLoc === Location.INTERIOR) return Location.EXTERIOR
    }
    return Location.INTERIOR
  }
  static locatePointInRing(p, ring) {
    if (!ring.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR
    return PointLocation.locateInRing(p, ring.getCoordinates())
  }
  static containsPointInPolygon(p, poly) {
    return Location.EXTERIOR !== SimplePointInAreaLocator.locatePointInPolygon(p, poly)
  }
  static locateInGeometry(p, geom) {
    if (geom instanceof Polygon) 
      return SimplePointInAreaLocator.locatePointInPolygon(p, geom)
    
    if (geom instanceof GeometryCollection) {
      const geomi = new GeometryCollectionIterator(geom)
      while (geomi.hasNext()) {
        const g2 = geomi.next()
        if (g2 !== geom) {
          const loc = SimplePointInAreaLocator.locateInGeometry(p, g2)
          if (loc !== Location.EXTERIOR) return loc
        }
      }
    }
    return Location.EXTERIOR
  }
  static isContained(p, geom) {
    return Location.EXTERIOR !== SimplePointInAreaLocator.locate(p, geom)
  }
  static locate(p, geom) {
    if (geom.isEmpty()) return Location.EXTERIOR
    if (!geom.getEnvelopeInternal().intersects(p)) return Location.EXTERIOR
    return SimplePointInAreaLocator.locateInGeometry(p, geom)
  }
  locate(p) {
    return SimplePointInAreaLocator.locate(p, this._geom)
  }
  get interfaces_() {
    return [PointOnGeometryLocator]
  }
}
