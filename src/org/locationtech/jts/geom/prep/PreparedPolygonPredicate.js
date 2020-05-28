import Location from '../Location'
import ComponentCoordinateExtracter from '../util/ComponentCoordinateExtracter'
import SimplePointInAreaLocator from '../../algorithm/locate/SimplePointInAreaLocator'
export default class PreparedPolygonPredicate {
  constructor() {
    PreparedPolygonPredicate.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._prepPoly = null
    this._targetPointLocator = null
    const prepPoly = arguments[0]
    this._prepPoly = prepPoly
    this._targetPointLocator = prepPoly.getPointLocator()
  }
  isAnyTargetComponentInAreaTest(testGeom, targetRepPts) {
    const piaLoc = new SimplePointInAreaLocator(testGeom)
    for (let i = targetRepPts.iterator(); i.hasNext(); ) {
      const p = i.next()
      const loc = piaLoc.locate(p)
      if (loc !== Location.EXTERIOR) return true
    }
    return false
  }
  isAllTestComponentsInTarget(testGeom) {
    const coords = ComponentCoordinateExtracter.getCoordinates(testGeom)
    for (let i = coords.iterator(); i.hasNext(); ) {
      const p = i.next()
      const loc = this._targetPointLocator.locate(p)
      if (loc === Location.EXTERIOR) return false
    }
    return true
  }
  isAnyTestComponentInTargetInterior(testGeom) {
    const coords = ComponentCoordinateExtracter.getCoordinates(testGeom)
    for (let i = coords.iterator(); i.hasNext(); ) {
      const p = i.next()
      const loc = this._targetPointLocator.locate(p)
      if (loc === Location.INTERIOR) return true
    }
    return false
  }
  isAllTestComponentsInTargetInterior(testGeom) {
    const coords = ComponentCoordinateExtracter.getCoordinates(testGeom)
    for (let i = coords.iterator(); i.hasNext(); ) {
      const p = i.next()
      const loc = this._targetPointLocator.locate(p)
      if (loc !== Location.INTERIOR) return false
    }
    return true
  }
  isAnyTestComponentInTarget(testGeom) {
    const coords = ComponentCoordinateExtracter.getCoordinates(testGeom)
    for (let i = coords.iterator(); i.hasNext(); ) {
      const p = i.next()
      const loc = this._targetPointLocator.locate(p)
      if (loc !== Location.EXTERIOR) return true
    }
    return false
  }
}
