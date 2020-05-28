import LineString from '../LineString'
import Geometry from '../Geometry'
import Point from '../Point'
import Polygon from '../Polygon'
import LinearRing from '../LinearRing'
import GeometryCollection from '../GeometryCollection'
import ArrayList from '../../../../../java/util/ArrayList'
import Assert from '../../util/Assert'
export default class GeometryEditor {
  constructor() {
    GeometryEditor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._factory = null
    this._isUserDataCopied = false
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const factory = arguments[0]
      this._factory = factory
    }
  }
  setCopyUserData(isUserDataCopied) {
    this._isUserDataCopied = isUserDataCopied
  }
  edit(geometry, operation) {
    if (geometry === null) return null
    const result = this.editInternal(geometry, operation)
    if (this._isUserDataCopied) 
      result.setUserData(geometry.getUserData())
    
    return result
  }
  editInternal(geometry, operation) {
    if (this._factory === null) this._factory = geometry.getFactory()
    if (geometry instanceof GeometryCollection) 
      return this.editGeometryCollection(geometry, operation)
    
    if (geometry instanceof Polygon) 
      return this.editPolygon(geometry, operation)
    
    if (geometry instanceof Point) 
      return operation.edit(geometry, this._factory)
    
    if (geometry instanceof LineString) 
      return operation.edit(geometry, this._factory)
    
    Assert.shouldNeverReachHere('Unsupported Geometry type: ' + geometry.getGeometryType())
    return null
  }
  editGeometryCollection(collection, operation) {
    const collectionForType = operation.edit(collection, this._factory)
    const geometries = new ArrayList()
    for (let i = 0; i < collectionForType.getNumGeometries(); i++) {
      const geometry = this.edit(collectionForType.getGeometryN(i), operation)
      if (geometry === null || geometry.isEmpty()) 
        continue
      
      geometries.add(geometry)
    }
    if (collectionForType.getGeometryType() === Geometry.TYPENAME_MULTIPOINT) 
      return this._factory.createMultiPoint(geometries.toArray([]))
    
    if (collectionForType.getGeometryType() === Geometry.TYPENAME_MULTILINESTRING) 
      return this._factory.createMultiLineString(geometries.toArray([]))
    
    if (collectionForType.getGeometryType() === Geometry.TYPENAME_MULTIPOLYGON) 
      return this._factory.createMultiPolygon(geometries.toArray([]))
    
    return this._factory.createGeometryCollection(geometries.toArray([]))
  }
  editPolygon(polygon, operation) {
    let newPolygon = operation.edit(polygon, this._factory)
    if (newPolygon === null) newPolygon = this._factory.createPolygon()
    if (newPolygon.isEmpty()) 
      return newPolygon
    
    const shell = this.edit(newPolygon.getExteriorRing(), operation)
    if (shell === null || shell.isEmpty()) 
      return this._factory.createPolygon()
    
    const holes = new ArrayList()
    for (let i = 0; i < newPolygon.getNumInteriorRing(); i++) {
      const hole = this.edit(newPolygon.getInteriorRingN(i), operation)
      if (hole === null || hole.isEmpty()) 
        continue
      
      holes.add(hole)
    }
    return this._factory.createPolygon(shell, holes.toArray([]))
  }
}
function GeometryEditorOperation() {}
GeometryEditor.GeometryEditorOperation = GeometryEditorOperation
class NoOpGeometryOperation {
  edit(geometry, factory) {
    return geometry
  }
  get interfaces_() {
    return [GeometryEditorOperation]
  }
}
class CoordinateOperation {
  edit(geometry, factory) {
    const coordinates = this.edit(geometry.getCoordinates(), geometry)
    if (geometry instanceof LinearRing) 
      if (coordinates === null) return factory.createLinearRing(); else return factory.createLinearRing(coordinates)
    
    if (geometry instanceof LineString) 
      if (coordinates === null) return factory.createLineString(); else return factory.createLineString(coordinates)
    
    if (geometry instanceof Point) 
      if (coordinates === null || coordinates.length === 0) return factory.createPoint(); else return factory.createPoint(coordinates[0])
    
    return geometry
  }
  get interfaces_() {
    return [GeometryEditorOperation]
  }
}
class CoordinateSequenceOperation {
  edit(geometry, factory) {
    if (geometry instanceof LinearRing) 
      return factory.createLinearRing(this.edit(geometry.getCoordinateSequence(), geometry))
    
    if (geometry instanceof LineString) 
      return factory.createLineString(this.edit(geometry.getCoordinateSequence(), geometry))
    
    if (geometry instanceof Point) 
      return factory.createPoint(this.edit(geometry.getCoordinateSequence(), geometry))
    
    return geometry
  }
  get interfaces_() {
    return [GeometryEditorOperation]
  }
}
GeometryEditor.NoOpGeometryOperation = NoOpGeometryOperation
GeometryEditor.CoordinateOperation = CoordinateOperation
GeometryEditor.CoordinateSequenceOperation = CoordinateSequenceOperation
