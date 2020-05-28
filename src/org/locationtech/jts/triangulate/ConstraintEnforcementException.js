import WKTWriter from '../io/WKTWriter'
import Coordinate from '../geom/Coordinate'
import RuntimeException from '../../../../java/lang/RuntimeException'
export default class ConstraintEnforcementException extends RuntimeException {
  constructor() {
    super()
    ConstraintEnforcementException.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._pt = null
    if (arguments.length === 1) {
      const msg = arguments[0]
      RuntimeException.constructor_.call(this, msg)
    } else if (arguments.length === 2) {
      const msg = arguments[0], pt = arguments[1]
      RuntimeException.constructor_.call(this, ConstraintEnforcementException.msgWithCoord(msg, pt))
      this._pt = new Coordinate(pt)
    }
  }
  static msgWithCoord(msg, pt) {
    if (pt !== null) return msg + ' [ ' + WKTWriter.toPoint(pt) + ' ]'
    return msg
  }
  getCoordinate() {
    return this._pt
  }
}
