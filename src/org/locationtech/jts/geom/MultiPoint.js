import Geometry from './Geometry.js'
import GeometryCollection from './GeometryCollection.js'
import Dimension from './Dimension.js'
import Puntal from './Puntal.js'
export default class MultiPoint extends GeometryCollection {
  constructor() {
    super()
    MultiPoint.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const points = arguments[0], factory = arguments[1]
    GeometryCollection.constructor_.call(this, points, factory)
  }
  equalsExact() {
    if (arguments.length === 2 && (typeof arguments[1] === 'number' && arguments[0] instanceof Geometry)) {
      const other = arguments[0], tolerance = arguments[1]
      if (!this.isEquivalentClass(other)) 
        return false
      
      return super.equalsExact.call(this, other, tolerance)
    } else {
      return super.equalsExact.apply(this, arguments)
    }
  }
  getTypeCode() {
    return Geometry.TYPECODE_MULTIPOINT
  }
  getDimension() {
    return 0
  }
  getBoundary() {
    return this.getFactory().createGeometryCollection()
  }
  getGeometryType() {
    return Geometry.TYPENAME_MULTIPOINT
  }
  copyInternal() {
    const points = new Array(this._geometries.length).fill(null)
    for (let i = 0; i < points.length; i++) 
      points[i] = this._geometries[i].copy()
    
    return new MultiPoint(points, this._factory)
  }
  isValid() {
    return true
  }
  getCoordinate() {
    if (arguments.length === 1 && Number.isInteger(arguments[0])) {
      const n = arguments[0]
      return this._geometries[n].getCoordinate()
    } else {
      return super.getCoordinate.apply(this, arguments)
    }
  }
  getBoundaryDimension() {
    return Dimension.FALSE
  }
  get interfaces_() {
    return [Puntal]
  }
}
