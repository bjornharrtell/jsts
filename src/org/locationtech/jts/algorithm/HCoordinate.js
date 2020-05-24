import NotRepresentableException from './NotRepresentableException'
import Coordinate from '../geom/Coordinate'
import Double from '../../../../java/lang/Double'
export default class HCoordinate {
  constructor () {
    HCoordinate.constructor_.apply(this, arguments)
  }

  getY () {
    const a = this.y / this.w
    if (Double.isNaN(a) || Double.isInfinite(a))
      throw new NotRepresentableException()

    return a
  }

  getX () {
    const a = this.x / this.w
    if (Double.isNaN(a) || Double.isInfinite(a))
      throw new NotRepresentableException()

    return a
  }

  getCoordinate () {
    const p = new Coordinate()
    p.x = this.getX()
    p.y = this.getY()
    return p
  }

  getClass () {
    return HCoordinate
  }

  get interfaces_ () {
    return []
  }
}
HCoordinate.constructor_ = function () {
  this.x = null
  this.y = null
  this.w = null
  if (arguments.length === 0) {
    this.x = 0.0
    this.y = 0.0
    this.w = 1.0
  } else if (arguments.length === 1) {
    const p = arguments[0]
    this.x = p.x
    this.y = p.y
    this.w = 1.0
  } else if (arguments.length === 2) {
    if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
      const _x = arguments[0]; const _y = arguments[1]
      this.x = _x
      this.y = _y
      this.w = 1.0
    } else if (arguments[0] instanceof HCoordinate && arguments[1] instanceof HCoordinate) {
      const p1 = arguments[0]; const p2 = arguments[1]
      this.x = p1.y * p2.w - p2.y * p1.w
      this.y = p2.x * p1.w - p1.x * p2.w
      this.w = p1.x * p2.y - p2.x * p1.y
    } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
      const p1 = arguments[0]; const p2 = arguments[1]
      this.x = p1.y - p2.y
      this.y = p2.x - p1.x
      this.w = p1.x * p2.y - p2.x * p1.y
    }
  } else if (arguments.length === 3) {
    const _x = arguments[0]; const _y = arguments[1]; const _w = arguments[2]
    this.x = _x
    this.y = _y
    this.w = _w
  } else if (arguments.length === 4) {
    const p1 = arguments[0]; const p2 = arguments[1]; const q1 = arguments[2]; const q2 = arguments[3]
    const px = p1.y - p2.y
    const py = p2.x - p1.x
    const pw = p1.x * p2.y - p2.x * p1.y
    const qx = q1.y - q2.y
    const qy = q2.x - q1.x
    const qw = q1.x * q2.y - q2.x * q1.y
    this.x = py * qw - qy * pw
    this.y = qx * pw - px * qw
    this.w = px * qy - qx * py
  }
}
