import Location from './Location'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import Dimension from './Dimension'
import Cloneable from '../../../../java/lang/Cloneable'
import StringBuilder from '../../../../java/lang/StringBuilder'
export default class IntersectionMatrix {
  constructor() {
    IntersectionMatrix.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._matrix = null
    if (arguments.length === 0) {
      this._matrix = Array(3).fill().map(() => Array(3))
      this.setAll(Dimension.FALSE)
    } else if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        const elements = arguments[0]
        IntersectionMatrix.constructor_.call(this)
        this.set(elements)
      } else if (arguments[0] instanceof IntersectionMatrix) {
        const other = arguments[0]
        IntersectionMatrix.constructor_.call(this)
        this._matrix[Location.INTERIOR][Location.INTERIOR] = other._matrix[Location.INTERIOR][Location.INTERIOR]
        this._matrix[Location.INTERIOR][Location.BOUNDARY] = other._matrix[Location.INTERIOR][Location.BOUNDARY]
        this._matrix[Location.INTERIOR][Location.EXTERIOR] = other._matrix[Location.INTERIOR][Location.EXTERIOR]
        this._matrix[Location.BOUNDARY][Location.INTERIOR] = other._matrix[Location.BOUNDARY][Location.INTERIOR]
        this._matrix[Location.BOUNDARY][Location.BOUNDARY] = other._matrix[Location.BOUNDARY][Location.BOUNDARY]
        this._matrix[Location.BOUNDARY][Location.EXTERIOR] = other._matrix[Location.BOUNDARY][Location.EXTERIOR]
        this._matrix[Location.EXTERIOR][Location.INTERIOR] = other._matrix[Location.EXTERIOR][Location.INTERIOR]
        this._matrix[Location.EXTERIOR][Location.BOUNDARY] = other._matrix[Location.EXTERIOR][Location.BOUNDARY]
        this._matrix[Location.EXTERIOR][Location.EXTERIOR] = other._matrix[Location.EXTERIOR][Location.EXTERIOR]
      }
    }
  }
  static matches() {
    if (Number.isInteger(arguments[0]) && typeof arguments[1] === 'string') {
      const actualDimensionValue = arguments[0], requiredDimensionSymbol = arguments[1]
      if (requiredDimensionSymbol === Dimension.SYM_DONTCARE) 
        return true
      
      if (requiredDimensionSymbol === Dimension.SYM_TRUE && (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE)) 
        return true
      
      if (requiredDimensionSymbol === Dimension.SYM_FALSE && actualDimensionValue === Dimension.FALSE) 
        return true
      
      if (requiredDimensionSymbol === Dimension.SYM_P && actualDimensionValue === Dimension.P) 
        return true
      
      if (requiredDimensionSymbol === Dimension.SYM_L && actualDimensionValue === Dimension.L) 
        return true
      
      if (requiredDimensionSymbol === Dimension.SYM_A && actualDimensionValue === Dimension.A) 
        return true
      
      return false
    } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
      const actualDimensionSymbols = arguments[0], requiredDimensionSymbols = arguments[1]
      const m = new IntersectionMatrix(actualDimensionSymbols)
      return m.matches(requiredDimensionSymbols)
    }
  }
  static isTrue(actualDimensionValue) {
    if (actualDimensionValue >= 0 || actualDimensionValue === Dimension.TRUE) 
      return true
    
    return false
  }
  isIntersects() {
    return !this.isDisjoint()
  }
  isCovers() {
    const hasPointInCommon = IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY])
    return hasPointInCommon && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE
  }
  isCoveredBy() {
    const hasPointInCommon = IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY])
    return hasPointInCommon && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE
  }
  set() {
    if (arguments.length === 1) {
      const dimensionSymbols = arguments[0]
      for (let i = 0; i < dimensionSymbols.length; i++) {
        const row = Math.trunc(i / 3)
        const col = i % 3
        this._matrix[row][col] = Dimension.toDimensionValue(dimensionSymbols.charAt(i))
      }
    } else if (arguments.length === 3) {
      const row = arguments[0], column = arguments[1], dimensionValue = arguments[2]
      this._matrix[row][column] = dimensionValue
    }
  }
  isContains() {
    return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE
  }
  setAtLeast() {
    if (arguments.length === 1) {
      const minimumDimensionSymbols = arguments[0]
      for (let i = 0; i < minimumDimensionSymbols.length; i++) {
        const row = Math.trunc(i / 3)
        const col = i % 3
        this.setAtLeast(row, col, Dimension.toDimensionValue(minimumDimensionSymbols.charAt(i)))
      }
    } else if (arguments.length === 3) {
      const row = arguments[0], column = arguments[1], minimumDimensionValue = arguments[2]
      if (this._matrix[row][column] < minimumDimensionValue) 
        this._matrix[row][column] = minimumDimensionValue
      
    }
  }
  setAtLeastIfValid(row, column, minimumDimensionValue) {
    if (row >= 0 && column >= 0) 
      this.setAtLeast(row, column, minimumDimensionValue)
    
  }
  isWithin() {
    return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE
  }
  isTouches(dimensionOfGeometryA, dimensionOfGeometryB) {
    if (dimensionOfGeometryA > dimensionOfGeometryB) 
      return this.isTouches(dimensionOfGeometryB, dimensionOfGeometryA)
    
    if (dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L) 
      return this._matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && (IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.BOUNDARY]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.INTERIOR]) || IntersectionMatrix.isTrue(this._matrix[Location.BOUNDARY][Location.BOUNDARY]))
    
    return false
  }
  isOverlaps(dimensionOfGeometryA, dimensionOfGeometryB) {
    if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.A) 
      return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR])
    
    if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) 
      return this._matrix[Location.INTERIOR][Location.INTERIOR] === 1 && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR])
    
    return false
  }
  isEquals(dimensionOfGeometryA, dimensionOfGeometryB) {
    if (dimensionOfGeometryA !== dimensionOfGeometryB) 
      return false
    
    return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && this._matrix[Location.INTERIOR][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.EXTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.EXTERIOR][Location.BOUNDARY] === Dimension.FALSE
  }
  toString() {
    const builder = new StringBuilder('123456789')
    for (let ai = 0; ai < 3; ai++) 
      for (let bi = 0; bi < 3; bi++) 
        builder.setCharAt(3 * ai + bi, Dimension.toDimensionSymbol(this._matrix[ai][bi]))
      
    
    return builder.toString()
  }
  setAll(dimensionValue) {
    for (let ai = 0; ai < 3; ai++) 
      for (let bi = 0; bi < 3; bi++) 
        this._matrix[ai][bi] = dimensionValue
      
    
  }
  get(row, column) {
    return this._matrix[row][column]
  }
  transpose() {
    let temp = this._matrix[1][0]
    this._matrix[1][0] = this._matrix[0][1]
    this._matrix[0][1] = temp
    temp = this._matrix[2][0]
    this._matrix[2][0] = this._matrix[0][2]
    this._matrix[0][2] = temp
    temp = this._matrix[2][1]
    this._matrix[2][1] = this._matrix[1][2]
    this._matrix[1][2] = temp
    return this
  }
  matches(requiredDimensionSymbols) {
    if (requiredDimensionSymbols.length !== 9) 
      throw new IllegalArgumentException('Should be length 9: ' + requiredDimensionSymbols)
    
    for (let ai = 0; ai < 3; ai++) 
      for (let bi = 0; bi < 3; bi++) 
        if (!IntersectionMatrix.matches(this._matrix[ai][bi], requiredDimensionSymbols.charAt(3 * ai + bi))) 
          return false
        
      
    
    return true
  }
  add(im) {
    for (let i = 0; i < 3; i++) 
      for (let j = 0; j < 3; j++) 
        this.setAtLeast(i, j, im.get(i, j))
      
    
  }
  isDisjoint() {
    return this._matrix[Location.INTERIOR][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.INTERIOR][Location.BOUNDARY] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.INTERIOR] === Dimension.FALSE && this._matrix[Location.BOUNDARY][Location.BOUNDARY] === Dimension.FALSE
  }
  isCrosses(dimensionOfGeometryA, dimensionOfGeometryB) {
    if (dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.L || dimensionOfGeometryA === Dimension.P && dimensionOfGeometryB === Dimension.A || dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.A) 
      return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.EXTERIOR])
    
    if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.P || dimensionOfGeometryA === Dimension.A && dimensionOfGeometryB === Dimension.L) 
      return IntersectionMatrix.isTrue(this._matrix[Location.INTERIOR][Location.INTERIOR]) && IntersectionMatrix.isTrue(this._matrix[Location.EXTERIOR][Location.INTERIOR])
    
    if (dimensionOfGeometryA === Dimension.L && dimensionOfGeometryB === Dimension.L) 
      return this._matrix[Location.INTERIOR][Location.INTERIOR] === 0
    
    return false
  }
  get interfaces_() {
    return [Cloneable]
  }
}
