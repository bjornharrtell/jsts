import Iterator from '../../../../java/util/Iterator'
import NoSuchElementException from '../../../../java/util/NoSuchElementException'
import GeometryCollection from './GeometryCollection'
import UnsupportedOperationException from '../../../../java/lang/UnsupportedOperationException'
export default class GeometryCollectionIterator {
  constructor() {
    GeometryCollectionIterator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._parent = null
    this._atStart = null
    this._max = null
    this._index = null
    this._subcollectionIterator = null
    const parent = arguments[0]
    this._parent = parent
    this._atStart = true
    this._index = 0
    this._max = parent.getNumGeometries()
  }
  static isAtomic(geom) {
    return !(geom instanceof GeometryCollection)
  }
  next() {
    if (this._atStart) {
      this._atStart = false
      if (GeometryCollectionIterator.isAtomic(this._parent)) this._index++
      return this._parent
    }
    if (this._subcollectionIterator !== null) 
      if (this._subcollectionIterator.hasNext()) 
        return this._subcollectionIterator.next()
      else 
        this._subcollectionIterator = null
      
    
    if (this._index >= this._max) 
      throw new NoSuchElementException()
    
    const obj = this._parent.getGeometryN(this._index++)
    if (obj instanceof GeometryCollection) {
      this._subcollectionIterator = new GeometryCollectionIterator(obj)
      return this._subcollectionIterator.next()
    }
    return obj
  }
  remove() {
    throw new UnsupportedOperationException(this.getClass().getName())
  }
  hasNext() {
    if (this._atStart) 
      return true
    
    if (this._subcollectionIterator !== null) {
      if (this._subcollectionIterator.hasNext()) 
        return true
      
      this._subcollectionIterator = null
    }
    if (this._index >= this._max) 
      return false
    
    return true
  }
  get interfaces_() {
    return [Iterator]
  }
}
