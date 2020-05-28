import Geometry from './Geometry'
import CoordinateFilter from './CoordinateFilter'
import hasInterface from '../../../../hasInterface'
import GeometryComponentFilter from './GeometryComponentFilter'
import Dimension from './Dimension'
import GeometryFilter from './GeometryFilter'
import CoordinateSequenceFilter from './CoordinateSequenceFilter'
import Puntal from './Puntal'
import Envelope from './Envelope'
import Assert from '../util/Assert'
export default class Point extends Geometry {
  constructor() {
    super()
    Point.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._coordinates = null
    const coordinates = arguments[0], factory = arguments[1]
    Geometry.constructor_.call(this, factory)
    this.init(coordinates)
  }
  computeEnvelopeInternal() {
    if (this.isEmpty()) 
      return new Envelope()
    
    const env = new Envelope()
    env.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0))
    return env
  }
  getCoordinates() {
    return this.isEmpty() ? [] : [this.getCoordinate()]
  }
  copyInternal() {
    return new Point(this._coordinates.copy(), this._factory)
  }
  equalsExact() {
    if (arguments.length === 2 && (typeof arguments[1] === 'number' && arguments[0] instanceof Geometry)) {
      const other = arguments[0], tolerance = arguments[1]
      if (!this.isEquivalentClass(other)) 
        return false
      
      if (this.isEmpty() && other.isEmpty()) 
        return true
      
      if (this.isEmpty() !== other.isEmpty()) 
        return false
      
      return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance)
    } else {
      return super.equalsExact.apply(this, arguments)
    }
  }
  normalize() {}
  getCoordinate() {
    return this._coordinates.size() !== 0 ? this._coordinates.getCoordinate(0) : null
  }
  getBoundaryDimension() {
    return Dimension.FALSE
  }
  reverseInternal() {
    return this.getFactory().createPoint(this._coordinates.copy())
  }
  getTypeCode() {
    return Geometry.TYPECODE_POINT
  }
  getDimension() {
    return 0
  }
  getNumPoints() {
    return this.isEmpty() ? 0 : 1
  }
  getX() {
    if (this.getCoordinate() === null) 
      throw new IllegalStateException('getX called on empty Point')
    
    return this.getCoordinate().x
  }
  compareToSameClass() {
    if (arguments.length === 1) {
      const other = arguments[0]
      const point = other
      return this.getCoordinate().compareTo(point.getCoordinate())
    } else if (arguments.length === 2) {
      const other = arguments[0], comp = arguments[1]
      const point = other
      return comp.compare(this._coordinates, point._coordinates)
    }
  }
  apply() {
    if (hasInterface(arguments[0], CoordinateFilter)) {
      const filter = arguments[0]
      if (this.isEmpty()) 
        return null
      
      filter.filter(this.getCoordinate())
    } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
      const filter = arguments[0]
      if (this.isEmpty()) return null
      filter.filter(this._coordinates, 0)
      if (filter.isGeometryChanged()) this.geometryChanged()
    } else if (hasInterface(arguments[0], GeometryFilter)) {
      const filter = arguments[0]
      filter.filter(this)
    } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
      const filter = arguments[0]
      filter.filter(this)
    }
  }
  getBoundary() {
    return this.getFactory().createGeometryCollection()
  }
  getGeometryType() {
    return Geometry.TYPENAME_POINT
  }
  getCoordinateSequence() {
    return this._coordinates
  }
  getY() {
    if (this.getCoordinate() === null) 
      throw new IllegalStateException('getY called on empty Point')
    
    return this.getCoordinate().y
  }
  isEmpty() {
    return this._coordinates.size() === 0
  }
  init(coordinates) {
    if (coordinates === null) 
      coordinates = this.getFactory().getCoordinateSequenceFactory().create([])
    
    Assert.isTrue(coordinates.size() <= 1)
    this._coordinates = coordinates
  }
  isSimple() {
    return true
  }
  get interfaces_() {
    return [Puntal]
  }
}
