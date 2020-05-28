export default class TopologyValidationError {
  constructor() {
    TopologyValidationError.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._errorType = null
    this._pt = null
    if (arguments.length === 1) {
      const errorType = arguments[0]
      TopologyValidationError.constructor_.call(this, errorType, null)
    } else if (arguments.length === 2) {
      const errorType = arguments[0], pt = arguments[1]
      this._errorType = errorType
      if (pt !== null) this._pt = pt.copy()
    }
  }
  getErrorType() {
    return this._errorType
  }
  getMessage() {
    return TopologyValidationError.errMsg[this._errorType]
  }
  getCoordinate() {
    return this._pt
  }
  toString() {
    let locStr = ''
    if (this._pt !== null) locStr = ' at or near point ' + this._pt
    return this.getMessage() + locStr
  }
}
TopologyValidationError.ERROR = 0
TopologyValidationError.REPEATED_POINT = 1
TopologyValidationError.HOLE_OUTSIDE_SHELL = 2
TopologyValidationError.NESTED_HOLES = 3
TopologyValidationError.DISCONNECTED_INTERIOR = 4
TopologyValidationError.SELF_INTERSECTION = 5
TopologyValidationError.RING_SELF_INTERSECTION = 6
TopologyValidationError.NESTED_SHELLS = 7
TopologyValidationError.DUPLICATE_RINGS = 8
TopologyValidationError.TOO_FEW_POINTS = 9
TopologyValidationError.INVALID_COORDINATE = 10
TopologyValidationError.RING_NOT_CLOSED = 11
TopologyValidationError.errMsg = ['Topology Validation Error', 'Repeated Point', 'Hole lies outside shell', 'Holes are nested', 'Interior is disconnected', 'Self-intersection', 'Ring Self-intersection', 'Nested shells', 'Duplicate Rings', 'Too few distinct points in geometry component', 'Invalid Coordinate', 'Ring is not closed']
