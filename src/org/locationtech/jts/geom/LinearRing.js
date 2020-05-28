import LineString from './LineString'
import Geometry from './Geometry'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import CoordinateSequences from './CoordinateSequences'
import Dimension from './Dimension'
export default class LinearRing extends LineString {
  constructor() {
    super()
    LinearRing.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const points = arguments[0], factory = arguments[1]
    LineString.constructor_.call(this, points, factory)
    this.validateConstruction()
  }
  copyInternal() {
    return new LinearRing(this._points.copy(), this._factory)
  }
  getBoundaryDimension() {
    return Dimension.FALSE
  }
  isClosed() {
    if (this.isEmpty()) 
      return true
    
    return super.isClosed.call(this)
  }
  reverseInternal() {
    const seq = this._points.copy()
    CoordinateSequences.reverse(seq)
    return this.getFactory().createLinearRing(seq)
  }
  getTypeCode() {
    return Geometry.TYPECODE_LINEARRING
  }
  validateConstruction() {
    if (!this.isEmpty() && !super.isClosed.call(this)) 
      throw new IllegalArgumentException('Points of LinearRing do not form a closed linestring')
    
    if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) 
      throw new IllegalArgumentException('Invalid number of points in LinearRing (found ' + this.getCoordinateSequence().size() + ' - must be 0 or >= 4)')
    
  }
  getGeometryType() {
    return Geometry.TYPENAME_LINEARRING
  }
}
LinearRing.MINIMUM_VALID_SIZE = 4
