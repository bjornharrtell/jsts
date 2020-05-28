import CommonBits from './CommonBits'
import CoordinateFilter from '../geom/CoordinateFilter'
import Coordinate from '../geom/Coordinate'
import CoordinateSequenceFilter from '../geom/CoordinateSequenceFilter'
export default class CommonBitsRemover {
  constructor() {
    CommonBitsRemover.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._commonCoord = null
    this._ccFilter = new CommonCoordinateFilter()
  }
  addCommonBits(geom) {
    const trans = new Translater(this._commonCoord)
    geom.apply(trans)
    geom.geometryChanged()
  }
  removeCommonBits(geom) {
    if (this._commonCoord.x === 0.0 && this._commonCoord.y === 0.0) return geom
    const invCoord = new Coordinate(this._commonCoord)
    invCoord.x = -invCoord.x
    invCoord.y = -invCoord.y
    const trans = new Translater(invCoord)
    geom.apply(trans)
    geom.geometryChanged()
    return geom
  }
  getCommonCoordinate() {
    return this._commonCoord
  }
  add(geom) {
    geom.apply(this._ccFilter)
    this._commonCoord = this._ccFilter.getCommonCoordinate()
  }
}
class CommonCoordinateFilter {
  constructor() {
    CommonCoordinateFilter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._commonBitsX = new CommonBits()
    this._commonBitsY = new CommonBits()
  }
  filter(coord) {
    this._commonBitsX.add(coord.x)
    this._commonBitsY.add(coord.y)
  }
  getCommonCoordinate() {
    return new Coordinate(this._commonBitsX.getCommon(), this._commonBitsY.getCommon())
  }
  get interfaces_() {
    return [CoordinateFilter]
  }
}
class Translater {
  constructor() {
    Translater.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.trans = null
    const trans = arguments[0]
    this.trans = trans
  }
  filter(seq, i) {
    const xp = seq.getOrdinate(i, 0) + this.trans.x
    const yp = seq.getOrdinate(i, 1) + this.trans.y
    seq.setOrdinate(i, 0, xp)
    seq.setOrdinate(i, 1, yp)
  }
  isDone() {
    return false
  }
  isGeometryChanged() {
    return true
  }
  get interfaces_() {
    return [CoordinateSequenceFilter]
  }
}
CommonBitsRemover.CommonCoordinateFilter = CommonCoordinateFilter
CommonBitsRemover.Translater = Translater
