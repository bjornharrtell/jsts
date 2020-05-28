import Geometry from './Geometry'
import Lineal from './Lineal'
import GeometryCollection from './GeometryCollection'
import UnsupportedOperationException from '../../../../java/lang/UnsupportedOperationException'
import Dimension from './Dimension'
export default class MultiLineString extends GeometryCollection {
  constructor() {
    super()
    MultiLineString.constructor_.apply(this, arguments)
  }
  static constructor_() {
    const lineStrings = arguments[0], factory = arguments[1]
    GeometryCollection.constructor_.call(this, lineStrings, factory)
  }
  copyInternal() {
    const lineStrings = new Array(this._geometries.length).fill(null)
    for (let i = 0; i < lineStrings.length; i++) 
      lineStrings[i] = this._geometries[i].copy()
    
    return new MultiLineString(lineStrings, this._factory)
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
  getBoundaryDimension() {
    if (this.isClosed()) 
      return Dimension.FALSE
    
    return 0
  }
  isClosed() {
    if (this.isEmpty()) 
      return false
    
    for (let i = 0; i < this._geometries.length; i++) 
      if (!this._geometries[i].isClosed()) 
        return false
      
    
    return true
  }
  getTypeCode() {
    return Geometry.TYPECODE_MULTILINESTRING
  }
  getDimension() {
    return 1
  }
  getBoundary() {
    throw new UnsupportedOperationException()
  }
  getGeometryType() {
    return Geometry.TYPENAME_MULTILINESTRING
  }
  get interfaces_() {
    return [Lineal]
  }
}
