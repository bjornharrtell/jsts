import hasInterface from '../../../../hasInterface'
import Collection from '../../../../java/util/Collection'
import Coordinate from './Coordinate'
import ArrayList from '../../../../java/util/ArrayList'
export default class CoordinateList extends ArrayList {
  constructor() {
    super()
    CoordinateList.constructor_.apply(this, arguments)
  }
  static constructor_() {
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const coord = arguments[0]
      this.ensureCapacity(coord.length)
      this.add(coord, true)
    } else if (arguments.length === 2) {
      const coord = arguments[0], allowRepeated = arguments[1]
      this.ensureCapacity(coord.length)
      this.add(coord, allowRepeated)
    }
  }
  getCoordinate(i) {
    return this.get(i)
  }
  addAll() {
    if (arguments.length === 2 && (typeof arguments[1] === 'boolean' && hasInterface(arguments[0], Collection))) {
      const coll = arguments[0], allowRepeated = arguments[1]
      let isChanged = false
      for (let i = coll.iterator(); i.hasNext(); ) {
        this.add(i.next(), allowRepeated)
        isChanged = true
      }
      return isChanged
    } else {
      return super.addAll.apply(this, arguments)
    }
  }
  clone() {
    const clone = super.clone.call(this)
    for (let i = 0; i < this.size(); i++) 
      clone.add(i, this.get(i).clone())
    
    return clone
  }
  toCoordinateArray() {
    if (arguments.length === 0) {
      return this.toArray(CoordinateList.coordArrayType)
    } else if (arguments.length === 1) {
      const isForward = arguments[0]
      if (isForward) 
        return this.toArray(CoordinateList.coordArrayType)
      
      const size = this.size()
      const pts = new Array(size).fill(null)
      for (let i = 0; i < size; i++) 
        pts[i] = this.get(size - i - 1)
      
      return pts
    }
  }
  add() {
    if (arguments.length === 1) {
      const coord = arguments[0]
      return super.add.call(this, coord)
    } else if (arguments.length === 2) {
      if (arguments[0] instanceof Array && typeof arguments[1] === 'boolean') {
        const coord = arguments[0], allowRepeated = arguments[1]
        this.add(coord, allowRepeated, true)
        return true
      } else if (arguments[0] instanceof Coordinate && typeof arguments[1] === 'boolean') {
        const coord = arguments[0], allowRepeated = arguments[1]
        if (!allowRepeated) 
          if (this.size() >= 1) {
            const last = this.get(this.size() - 1)
            if (last.equals2D(coord)) return null
          }
        
        super.add.call(this, coord)
      } else if (arguments[0] instanceof Object && typeof arguments[1] === 'boolean') {
        const obj = arguments[0], allowRepeated = arguments[1]
        this.add(obj, allowRepeated)
        return true
      }
    } else if (arguments.length === 3) {
      if (typeof arguments[2] === 'boolean' && (arguments[0] instanceof Array && typeof arguments[1] === 'boolean')) {
        const coord = arguments[0], allowRepeated = arguments[1], direction = arguments[2]
        if (direction) 
          for (let i = 0; i < coord.length; i++) 
            this.add(coord[i], allowRepeated)
          
        else 
          for (let i = coord.length - 1; i >= 0; i--) 
            this.add(coord[i], allowRepeated)
          
        
        return true
      } else if (typeof arguments[2] === 'boolean' && (Number.isInteger(arguments[0]) && arguments[1] instanceof Coordinate)) {
        const i = arguments[0], coord = arguments[1], allowRepeated = arguments[2]
        if (!allowRepeated) {
          const size = this.size()
          if (size > 0) {
            if (i > 0) {
              const prev = this.get(i - 1)
              if (prev.equals2D(coord)) return null
            }
            if (i < size) {
              const next = this.get(i)
              if (next.equals2D(coord)) return null
            }
          }
        }
        super.add.call(this, i, coord)
      }
    } else if (arguments.length === 4) {
      const coord = arguments[0], allowRepeated = arguments[1], start = arguments[2], end = arguments[3]
      let inc = 1
      if (start > end) inc = -1
      for (let i = start; i !== end; i += inc) 
        this.add(coord[i], allowRepeated)
      
      return true
    }
  }
  closeRing() {
    if (this.size() > 0) {
      const duplicate = this.get(0).copy()
      this.add(duplicate, false)
    }
  }
}
CoordinateList.coordArrayType = new Array(0).fill(null)
