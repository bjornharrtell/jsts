import TreeSet from '../../../../java/util/TreeSet'
import Geometry from './Geometry'
import Arrays from '../../../../java/util/Arrays'
import CoordinateFilter from './CoordinateFilter'
import hasInterface from '../../../../hasInterface'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import GeometryComponentFilter from './GeometryComponentFilter'
import Dimension from './Dimension'
import ArrayList from '../../../../java/util/ArrayList'
import GeometryFilter from './GeometryFilter'
import CoordinateSequenceFilter from './CoordinateSequenceFilter'
import Envelope from './Envelope'
import Assert from '../util/Assert'
export default class GeometryCollection extends Geometry {
  constructor() {
    super()
    GeometryCollection.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometries = null
    if (arguments.length === 0) {} else if (arguments.length === 2) {
      let geometries = arguments[0], factory = arguments[1]
      Geometry.constructor_.call(this, factory)
      if (geometries === null) 
        geometries = []
      
      if (Geometry.hasNullElements(geometries)) 
        throw new IllegalArgumentException('geometries must not contain null elements')
      
      this._geometries = geometries
    }
  }
  computeEnvelopeInternal() {
    const envelope = new Envelope()
    for (let i = 0; i < this._geometries.length; i++) 
      envelope.expandToInclude(this._geometries[i].getEnvelopeInternal())
    
    return envelope
  }
  getGeometryN(n) {
    return this._geometries[n]
  }
  getCoordinates() {
    const coordinates = new Array(this.getNumPoints()).fill(null)
    let k = -1
    for (let i = 0; i < this._geometries.length; i++) {
      const childCoordinates = this._geometries[i].getCoordinates()
      for (let j = 0; j < childCoordinates.length; j++) {
        k++
        coordinates[k] = childCoordinates[j]
      }
    }
    return coordinates
  }
  getArea() {
    let area = 0.0
    for (let i = 0; i < this._geometries.length; i++) 
      area += this._geometries[i].getArea()
    
    return area
  }
  copyInternal() {
    const geometries = new Array(this._geometries.length).fill(null)
    for (let i = 0; i < geometries.length; i++) 
      geometries[i] = this._geometries[i].copy()
    
    return new GeometryCollection(geometries, this._factory)
  }
  equalsExact() {
    if (arguments.length === 2 && (typeof arguments[1] === 'number' && arguments[0] instanceof Geometry)) {
      const other = arguments[0], tolerance = arguments[1]
      if (!this.isEquivalentClass(other)) 
        return false
      
      const otherCollection = other
      if (this._geometries.length !== otherCollection._geometries.length) 
        return false
      
      for (let i = 0; i < this._geometries.length; i++) 
        if (!this._geometries[i].equalsExact(otherCollection._geometries[i], tolerance)) 
          return false
        
      
      return true
    } else {
      return super.equalsExact.apply(this, arguments)
    }
  }
  normalize() {
    for (let i = 0; i < this._geometries.length; i++) 
      this._geometries[i].normalize()
    
    Arrays.sort(this._geometries)
  }
  getCoordinate() {
    if (this.isEmpty()) return null
    return this._geometries[0].getCoordinate()
  }
  getBoundaryDimension() {
    let dimension = Dimension.FALSE
    for (let i = 0; i < this._geometries.length; i++) 
      dimension = Math.max(dimension, this._geometries[i].getBoundaryDimension())
    
    return dimension
  }
  reverseInternal() {
    const numGeometries = this._geometries.length
    const reversed = new ArrayList(numGeometries)
    for (let i = 0; i < numGeometries; i++) 
      reversed.add(this._geometries[i].reverse())
    
    return this.getFactory().buildGeometry(reversed)
  }
  getTypeCode() {
    return Geometry.TYPECODE_GEOMETRYCOLLECTION
  }
  getDimension() {
    let dimension = Dimension.FALSE
    for (let i = 0; i < this._geometries.length; i++) 
      dimension = Math.max(dimension, this._geometries[i].getDimension())
    
    return dimension
  }
  getLength() {
    let sum = 0.0
    for (let i = 0; i < this._geometries.length; i++) 
      sum += this._geometries[i].getLength()
    
    return sum
  }
  getNumPoints() {
    let numPoints = 0
    for (let i = 0; i < this._geometries.length; i++) 
      numPoints += this._geometries[i].getNumPoints()
    
    return numPoints
  }
  getNumGeometries() {
    return this._geometries.length
  }
  compareToSameClass() {
    if (arguments.length === 1) {
      const o = arguments[0]
      const theseElements = new TreeSet(Arrays.asList(this._geometries))
      const otherElements = new TreeSet(Arrays.asList(o._geometries))
      return this.compare(theseElements, otherElements)
    } else if (arguments.length === 2) {
      const o = arguments[0], comp = arguments[1]
      const gc = o
      const n1 = this.getNumGeometries()
      const n2 = gc.getNumGeometries()
      let i = 0
      while (i < n1 && i < n2) {
        const thisGeom = this.getGeometryN(i)
        const otherGeom = gc.getGeometryN(i)
        const holeComp = thisGeom.compareToSameClass(otherGeom, comp)
        if (holeComp !== 0) return holeComp
        i++
      }
      if (i < n1) return 1
      if (i < n2) return -1
      return 0
    }
  }
  apply() {
    if (hasInterface(arguments[0], CoordinateFilter)) {
      const filter = arguments[0]
      for (let i = 0; i < this._geometries.length; i++) 
        this._geometries[i].apply(filter)
      
    } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
      const filter = arguments[0]
      if (this._geometries.length === 0) return null
      for (let i = 0; i < this._geometries.length; i++) {
        this._geometries[i].apply(filter)
        if (filter.isDone()) 
          break
        
      }
      if (filter.isGeometryChanged()) this.geometryChanged()
    } else if (hasInterface(arguments[0], GeometryFilter)) {
      const filter = arguments[0]
      filter.filter(this)
      for (let i = 0; i < this._geometries.length; i++) 
        this._geometries[i].apply(filter)
      
    } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
      const filter = arguments[0]
      filter.filter(this)
      for (let i = 0; i < this._geometries.length; i++) 
        this._geometries[i].apply(filter)
      
    }
  }
  getBoundary() {
    Geometry.checkNotGeometryCollection(this)
    Assert.shouldNeverReachHere()
    return null
  }
  getGeometryType() {
    return Geometry.TYPENAME_GEOMETRYCOLLECTION
  }
  isEmpty() {
    for (let i = 0; i < this._geometries.length; i++) 
      if (!this._geometries[i].isEmpty()) 
        return false
      
    
    return true
  }
}
