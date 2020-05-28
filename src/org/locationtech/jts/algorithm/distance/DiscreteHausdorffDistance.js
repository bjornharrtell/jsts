import DistanceToPoint from './DistanceToPoint'
import CoordinateFilter from '../../geom/CoordinateFilter'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import PointPairDistance from './PointPairDistance'
import CoordinateSequenceFilter from '../../geom/CoordinateSequenceFilter'
export default class DiscreteHausdorffDistance {
  constructor() {
    DiscreteHausdorffDistance.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._g0 = null
    this._g1 = null
    this._ptDist = new PointPairDistance()
    this._densifyFrac = 0.0
    const g0 = arguments[0], g1 = arguments[1]
    this._g0 = g0
    this._g1 = g1
  }
  static distance() {
    if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      const dist = new DiscreteHausdorffDistance(g0, g1)
      return dist.distance()
    } else if (arguments.length === 3) {
      const g0 = arguments[0], g1 = arguments[1], densifyFrac = arguments[2]
      const dist = new DiscreteHausdorffDistance(g0, g1)
      dist.setDensifyFraction(densifyFrac)
      return dist.distance()
    }
  }
  getCoordinates() {
    return this._ptDist.getCoordinates()
  }
  setDensifyFraction(densifyFrac) {
    if (densifyFrac > 1.0 || densifyFrac <= 0.0) throw new IllegalArgumentException('Fraction is not in range (0.0 - 1.0]')
    this._densifyFrac = densifyFrac
  }
  compute(g0, g1) {
    this.computeOrientedDistance(g0, g1, this._ptDist)
    this.computeOrientedDistance(g1, g0, this._ptDist)
  }
  distance() {
    this.compute(this._g0, this._g1)
    return this._ptDist.getDistance()
  }
  computeOrientedDistance(discreteGeom, geom, ptDist) {
    const distFilter = new MaxPointDistanceFilter(geom)
    discreteGeom.apply(distFilter)
    ptDist.setMaximum(distFilter.getMaxPointDistance())
    if (this._densifyFrac > 0) {
      const fracFilter = new MaxDensifiedByFractionDistanceFilter(geom, this._densifyFrac)
      discreteGeom.apply(fracFilter)
      ptDist.setMaximum(fracFilter.getMaxPointDistance())
    }
  }
  orientedDistance() {
    this.computeOrientedDistance(this._g0, this._g1, this._ptDist)
    return this._ptDist.getDistance()
  }
}
class MaxPointDistanceFilter {
  constructor() {
    MaxPointDistanceFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._maxPtDist = new PointPairDistance()
    this._minPtDist = new PointPairDistance()
    this._euclideanDist = new DistanceToPoint()
    this._geom = null
    const geom = arguments[0]
    this._geom = geom
  }
  filter(pt) {
    this._minPtDist.initialize()
    DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist)
    this._maxPtDist.setMaximum(this._minPtDist)
  }
  getMaxPointDistance() {
    return this._maxPtDist
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
class MaxDensifiedByFractionDistanceFilter {
  constructor() {
    MaxDensifiedByFractionDistanceFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._maxPtDist = new PointPairDistance()
    this._minPtDist = new PointPairDistance()
    this._geom = null
    this._numSubSegs = 0
    const geom = arguments[0], fraction = arguments[1]
    this._geom = geom
    this._numSubSegs = Math.trunc(Math.round(1.0 / fraction))
  }
  filter(seq, index) {
    if (index === 0) return null
    const p0 = seq.getCoordinate(index - 1)
    const p1 = seq.getCoordinate(index)
    const delx = (p1.x - p0.x) / this._numSubSegs
    const dely = (p1.y - p0.y) / this._numSubSegs
    for (let i = 0; i < this._numSubSegs; i++) {
      const x = p0.x + i * delx
      const y = p0.y + i * dely
      const pt = new Coordinate(x, y)
      this._minPtDist.initialize()
      DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist)
      this._maxPtDist.setMaximum(this._minPtDist)
    }
  }
  isDone() {
    return false
  }
  isGeometryChanged() {
    return false
  }
  getMaxPointDistance() {
    return this._maxPtDist
  }
  get interfaces_() {
    return [CoordinateSequenceFilter]
  }
}
DiscreteHausdorffDistance.MaxPointDistanceFilter = MaxPointDistanceFilter
DiscreteHausdorffDistance.MaxDensifiedByFractionDistanceFilter = MaxDensifiedByFractionDistanceFilter
