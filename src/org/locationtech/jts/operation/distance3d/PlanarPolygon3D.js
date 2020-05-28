import Location from '../../geom/Location'
import hasInterface from '../../../../../hasInterface'
import Coordinate from '../../geom/Coordinate'
import AxisPlaneCoordinateSequence from './AxisPlaneCoordinateSequence'
import Vector3D from '../../math/Vector3D'
import CoordinateSequence from '../../geom/CoordinateSequence'
import Plane3D from '../../math/Plane3D'
import RayCrossingCounter from '../../algorithm/RayCrossingCounter'
export default class PlanarPolygon3D {
  constructor() {
    PlanarPolygon3D.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._plane = null
    this._poly = null
    this._facingPlane = -1
    const poly = arguments[0]
    this._poly = poly
    this._plane = this.findBestFitPlane(poly)
    this._facingPlane = this._plane.closestAxisPlane()
  }
  static project() {
    if (hasInterface(arguments[0], CoordinateSequence) && Number.isInteger(arguments[1])) {
      const seq = arguments[0], facingPlane = arguments[1]
      switch (facingPlane) {
      case Plane3D.XY_PLANE:
        return AxisPlaneCoordinateSequence.projectToXY(seq)
      case Plane3D.XZ_PLANE:
        return AxisPlaneCoordinateSequence.projectToXZ(seq)
      default:
        return AxisPlaneCoordinateSequence.projectToYZ(seq)
      }
    } else if (arguments[0] instanceof Coordinate && Number.isInteger(arguments[1])) {
      const p = arguments[0], facingPlane = arguments[1]
      switch (facingPlane) {
      case Plane3D.XY_PLANE:
        return new Coordinate(p.x, p.y)
      case Plane3D.XZ_PLANE:
        return new Coordinate(p.x, p.getZ())
      default:
        return new Coordinate(p.y, p.getZ())
      }
    }
  }
  intersects() {
    if (arguments.length === 1) {
      const intPt = arguments[0]
      if (Location.EXTERIOR === this.locate(intPt, this._poly.getExteriorRing())) return false
      for (let i = 0; i < this._poly.getNumInteriorRing(); i++) 
        if (Location.INTERIOR === this.locate(intPt, this._poly.getInteriorRingN(i))) return false
      
      return true
    } else if (arguments.length === 2) {
      const pt = arguments[0], ring = arguments[1]
      const seq = ring.getCoordinateSequence()
      const seqProj = PlanarPolygon3D.project(seq, this._facingPlane)
      const ptProj = PlanarPolygon3D.project(pt, this._facingPlane)
      return Location.EXTERIOR !== RayCrossingCounter.locatePointInRing(ptProj, seqProj)
    }
  }
  averagePoint(seq) {
    const a = new Coordinate(0, 0, 0)
    const n = seq.size()
    for (let i = 0; i < n; i++) {
      a.x += seq.getOrdinate(i, CoordinateSequence.X)
      a.y += seq.getOrdinate(i, CoordinateSequence.Y)
      a.setZ(a.getZ() + seq.getOrdinate(i, CoordinateSequence.Z))
    }
    a.x /= n
    a.y /= n
    a.setZ(a.getZ() / n)
    return a
  }
  getPolygon() {
    return this._poly
  }
  getPlane() {
    return this._plane
  }
  findBestFitPlane(poly) {
    const seq = poly.getExteriorRing().getCoordinateSequence()
    const basePt = this.averagePoint(seq)
    const normal = this.averageNormal(seq)
    return new Plane3D(normal, basePt)
  }
  averageNormal(seq) {
    const n = seq.size()
    const sum = new Coordinate(0, 0, 0)
    const p1 = new Coordinate(0, 0, 0)
    const p2 = new Coordinate(0, 0, 0)
    for (let i = 0; i < n - 1; i++) {
      seq.getCoordinate(i, p1)
      seq.getCoordinate(i + 1, p2)
      sum.x += (p1.y - p2.y) * (p1.getZ() + p2.getZ())
      sum.y += (p1.getZ() - p2.getZ()) * (p1.x + p2.x)
      sum.setZ(sum.getZ() + (p1.x - p2.x) * (p1.y + p2.y))
    }
    sum.x /= n
    sum.y /= n
    sum.setZ(sum.getZ() / n)
    const norm = Vector3D.create(sum).normalize()
    return norm
  }
  locate(pt, ring) {
    const seq = ring.getCoordinateSequence()
    const seqProj = PlanarPolygon3D.project(seq, this._facingPlane)
    const ptProj = PlanarPolygon3D.project(pt, this._facingPlane)
    return RayCrossingCounter.locatePointInRing(ptProj, seqProj)
  }
}
