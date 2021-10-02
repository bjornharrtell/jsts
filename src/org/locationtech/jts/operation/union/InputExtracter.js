import LineString from '../../geom/LineString.js'
import Geometry from '../../geom/Geometry.js'
import hasInterface from '../../../../../hasInterface.js'
import Collection from '../../../../../java/util/Collection.js'
import Point from '../../geom/Point.js'
import Polygon from '../../geom/Polygon.js'
import GeometryCollection from '../../geom/GeometryCollection.js'
import Dimension from '../../geom/Dimension.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import GeometryFilter from '../../geom/GeometryFilter.js'
import Assert from '../../util/Assert.js'
export default class InputExtracter {
  constructor() {
    InputExtracter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geomFactory = null
    this._polygons = new ArrayList()
    this._lines = new ArrayList()
    this._points = new ArrayList()
    this._dimension = Dimension.FALSE
  }
  static extract() {
    if (hasInterface(arguments[0], Collection)) {
      const geoms = arguments[0]
      const extracter = new InputExtracter()
      extracter.add(geoms)
      return extracter
    } else if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      const extracter = new InputExtracter()
      extracter.add(geom)
      return extracter
    }
  }
  getFactory() {
    return this._geomFactory
  }
  recordDimension(dim) {
    if (dim > this._dimension) this._dimension = dim
  }
  getDimension() {
    return this._dimension
  }
  filter(geom) {
    this.recordDimension(geom.getDimension())
    if (geom instanceof GeometryCollection) 
      return null
    
    if (geom.isEmpty()) return null
    if (geom instanceof Polygon) {
      this._polygons.add(geom)
      return null
    } else if (geom instanceof LineString) {
      this._lines.add(geom)
      return null
    } else if (geom instanceof Point) {
      this._points.add(geom)
      return null
    }
    Assert.shouldNeverReachHere('Unhandled geometry type: ' + geom.getGeometryType())
  }
  getExtract(dim) {
    switch (dim) {
    case 0:
      return this._points
    case 1:
      return this._lines
    case 2:
      return this._polygons
    }
    Assert.shouldNeverReachHere('Invalid dimension: ' + dim)
    return null
  }
  isEmpty() {
    return this._polygons.isEmpty() && this._lines.isEmpty() && this._points.isEmpty()
  }
  add() {
    if (hasInterface(arguments[0], Collection)) {
      const geoms = arguments[0]
      for (const geom of geoms) 
        this.add(geom)
      
    } else if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      if (this._geomFactory === null) this._geomFactory = geom.getFactory()
      geom.apply(this)
    }
  }
  get interfaces_() {
    return [GeometryFilter]
  }
}
