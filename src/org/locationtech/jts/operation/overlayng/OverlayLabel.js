import Location from '../../geom/Location.js'
import Position from '../../geom/Position.js'
import StringBuilder from '../../../../../java/lang/StringBuilder.js'
export default class OverlayLabel {
  constructor() {
    OverlayLabel.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._aDim = OverlayLabel.DIM_NOT_PART
    this._aIsHole = false
    this._aLocLeft = OverlayLabel.LOC_UNKNOWN
    this._aLocRight = OverlayLabel.LOC_UNKNOWN
    this._aLocLine = OverlayLabel.LOC_UNKNOWN
    this._bDim = OverlayLabel.DIM_NOT_PART
    this._bIsHole = false
    this._bLocLeft = OverlayLabel.LOC_UNKNOWN
    this._bLocRight = OverlayLabel.LOC_UNKNOWN
    this._bLocLine = OverlayLabel.LOC_UNKNOWN
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      if (Number.isInteger(arguments[0])) {
        const index = arguments[0]
        this.initLine(index)
      } else if (arguments[0] instanceof OverlayLabel) {
        const lbl = arguments[0]
        this._aLocLeft = lbl._aLocLeft
        this._aLocRight = lbl._aLocRight
        this._aLocLine = lbl._aLocLine
        this._aDim = lbl._aDim
        this._aIsHole = lbl._aIsHole
        this._bLocLeft = lbl._bLocLeft
        this._bLocRight = lbl._bLocRight
        this._bLocLine = lbl._bLocLine
        this._bDim = lbl._bDim
        this._bIsHole = lbl._bIsHole
      }
    } else if (arguments.length === 4) {
      const index = arguments[0], locLeft = arguments[1], locRight = arguments[2], isHole = arguments[3]
      this.initBoundary(index, locLeft, locRight, isHole)
    }
  }
  static ringRoleSymbol(isHole) {
    return isHole ? 'h' : 's'
  }
  static dimensionSymbol(dim) {
    switch (dim) {
    case OverlayLabel.DIM_LINE:
      return OverlayLabel.SYM_LINE
    case OverlayLabel.DIM_COLLAPSE:
      return OverlayLabel.SYM_COLLAPSE
    case OverlayLabel.DIM_BOUNDARY:
      return OverlayLabel.SYM_BOUNDARY
    }
    return OverlayLabel.SYM_UNKNOWN
  }
  isKnown(index) {
    if (index === 0) 
      return this._aDim !== OverlayLabel.DIM_UNKNOWN
    
    return this._bDim !== OverlayLabel.DIM_UNKNOWN
  }
  isLineInArea(index) {
    if (index === 0) 
      return this._aLocLine === Location.INTERIOR
    
    return this._bLocLine === Location.INTERIOR
  }
  isNotPart(index) {
    if (index === 0) 
      return this._aDim === OverlayLabel.DIM_NOT_PART
    
    return this._bDim === OverlayLabel.DIM_NOT_PART
  }
  isBoundaryEither() {
    return this._aDim === OverlayLabel.DIM_BOUNDARY || this._bDim === OverlayLabel.DIM_BOUNDARY
  }
  initCollapse(index, isHole) {
    if (index === 0) {
      this._aDim = OverlayLabel.DIM_COLLAPSE
      this._aIsHole = isHole
    } else {
      this._bDim = OverlayLabel.DIM_COLLAPSE
      this._bIsHole = isHole
    }
  }
  getLocationBoundaryOrLine(index, position, isForward) {
    if (this.isBoundary(index)) 
      return this.getLocation(index, position, isForward)
    
    return this.getLineLocation(index)
  }
  isBoundary(index) {
    if (index === 0) 
      return this._aDim === OverlayLabel.DIM_BOUNDARY
    
    return this._bDim === OverlayLabel.DIM_BOUNDARY
  }
  isInteriorCollapse() {
    if (this._aDim === OverlayLabel.DIM_COLLAPSE && this._aLocLine === Location.INTERIOR) return true
    if (this._bDim === OverlayLabel.DIM_COLLAPSE && this._bLocLine === Location.INTERIOR) return true
    return false
  }
  isLineLocationUnknown(index) {
    if (index === 0) 
      return this._aLocLine === OverlayLabel.LOC_UNKNOWN
    else 
      return this._bLocLine === OverlayLabel.LOC_UNKNOWN
    
  }
  isLine() {
    if (arguments.length === 0) {
      return this._aDim === OverlayLabel.DIM_LINE || this._bDim === OverlayLabel.DIM_LINE
    } else if (arguments.length === 1) {
      const index = arguments[0]
      if (index === 0) 
        return this._aDim === OverlayLabel.DIM_LINE
      
      return this._bDim === OverlayLabel.DIM_LINE
    }
  }
  isHole(index) {
    if (index === 0) 
      return this._aIsHole
    else 
      return this._bIsHole
    
  }
  hasSides(index) {
    if (index === 0) 
      return this._aLocLeft !== OverlayLabel.LOC_UNKNOWN || this._aLocRight !== OverlayLabel.LOC_UNKNOWN
    
    return this._bLocLeft !== OverlayLabel.LOC_UNKNOWN || this._bLocRight !== OverlayLabel.LOC_UNKNOWN
  }
  isLineInterior(index) {
    if (index === 0) 
      return this._aLocLine === Location.INTERIOR
    
    return this._bLocLine === Location.INTERIOR
  }
  setLocationAll(index, loc) {
    if (index === 0) {
      this._aLocLine = loc
      this._aLocLeft = loc
      this._aLocRight = loc
    } else {
      this._bLocLine = loc
      this._bLocLeft = loc
      this._bLocRight = loc
    }
  }
  isCollapse(index) {
    return this.dimension(index) === OverlayLabel.DIM_COLLAPSE
  }
  setLocationCollapse(index) {
    const loc = this.isHole(index) ? Location.INTERIOR : Location.EXTERIOR
    if (index === 0) 
      this._aLocLine = loc
    else 
      this._bLocLine = loc
    
  }
  setLocationLine(index, loc) {
    if (index === 0) 
      this._aLocLine = loc
    else 
      this._bLocLine = loc
    
  }
  isBoundaryTouch() {
    return this.isBoundaryBoth() && this.getLocation(0, Position.RIGHT, true) !== this.getLocation(1, Position.RIGHT, true)
  }
  isBoundaryBoth() {
    return this._aDim === OverlayLabel.DIM_BOUNDARY && this._bDim === OverlayLabel.DIM_BOUNDARY
  }
  getLocation() {
    if (arguments.length === 1) {
      const index = arguments[0]
      if (index === 0) 
        return this._aLocLine
      
      return this._bLocLine
    } else if (arguments.length === 3) {
      const index = arguments[0], position = arguments[1], isForward = arguments[2]
      if (index === 0) 
        switch (position) {
        case Position.LEFT:
          return isForward ? this._aLocLeft : this._aLocRight
        case Position.RIGHT:
          return isForward ? this._aLocRight : this._aLocLeft
        case Position.ON:
          return this._aLocLine
        }
      
      switch (position) {
      case Position.LEFT:
        return isForward ? this._bLocLeft : this._bLocRight
      case Position.RIGHT:
        return isForward ? this._bLocRight : this._bLocLeft
      case Position.ON:
        return this._bLocLine
      }
      return OverlayLabel.LOC_UNKNOWN
    }
  }
  copy() {
    return new OverlayLabel(this)
  }
  toString() {
    if (arguments.length === 0) {
      return this.toString(true)
    } else if (arguments.length === 1) {
      const isForward = arguments[0]
      const buf = new StringBuilder()
      buf.append('A:')
      buf.append(this.locationString(0, isForward))
      buf.append('/B:')
      buf.append(this.locationString(1, isForward))
      return buf.toString()
    }
  }
  initLine(index) {
    if (index === 0) {
      this._aDim = OverlayLabel.DIM_LINE
      this._aLocLine = OverlayLabel.LOC_UNKNOWN
    } else {
      this._bDim = OverlayLabel.DIM_LINE
      this._bLocLine = OverlayLabel.LOC_UNKNOWN
    }
  }
  getLineLocation(index) {
    if (index === 0) 
      return this._aLocLine
    else 
      return this._bLocLine
    
  }
  isCollapseAndNotPartInterior() {
    if (this._aDim === OverlayLabel.DIM_COLLAPSE && this._bDim === OverlayLabel.DIM_NOT_PART && this._bLocLine === Location.INTERIOR) return true
    if (this._bDim === OverlayLabel.DIM_COLLAPSE && this._aDim === OverlayLabel.DIM_NOT_PART && this._aLocLine === Location.INTERIOR) return true
    return false
  }
  initBoundary(index, locLeft, locRight, isHole) {
    if (index === 0) {
      this._aDim = OverlayLabel.DIM_BOUNDARY
      this._aIsHole = isHole
      this._aLocLeft = locLeft
      this._aLocRight = locRight
      this._aLocLine = Location.INTERIOR
    } else {
      this._bDim = OverlayLabel.DIM_BOUNDARY
      this._bIsHole = isHole
      this._bLocLeft = locLeft
      this._bLocRight = locRight
      this._bLocLine = Location.INTERIOR
    }
  }
  dimension(index) {
    if (index === 0) return this._aDim
    return this._bDim
  }
  isBoundarySingleton() {
    if (this._aDim === OverlayLabel.DIM_BOUNDARY && this._bDim === OverlayLabel.DIM_NOT_PART) return true
    if (this._bDim === OverlayLabel.DIM_BOUNDARY && this._aDim === OverlayLabel.DIM_NOT_PART) return true
    return false
  }
  isBoundaryCollapse() {
    if (this.isLine()) return false
    return !this.isBoundaryBoth()
  }
  isLinear(index) {
    if (index === 0) 
      return this._aDim === OverlayLabel.DIM_LINE || this._aDim === OverlayLabel.DIM_COLLAPSE
    
    return this._bDim === OverlayLabel.DIM_LINE || this._bDim === OverlayLabel.DIM_COLLAPSE
  }
  initNotPart(index) {
    if (index === 0) 
      this._aDim = OverlayLabel.DIM_NOT_PART
    else 
      this._bDim = OverlayLabel.DIM_NOT_PART
    
  }
  locationString(index, isForward) {
    const buf = new StringBuilder()
    if (this.isBoundary(index)) {
      buf.append(Location.toLocationSymbol(this.getLocation(index, Position.LEFT, isForward)))
      buf.append(Location.toLocationSymbol(this.getLocation(index, Position.RIGHT, isForward)))
    } else {
      buf.append(Location.toLocationSymbol(index === 0 ? this._aLocLine : this._bLocLine))
    }
    if (this.isKnown(index)) buf.append(OverlayLabel.dimensionSymbol(index === 0 ? this._aDim : this._bDim))
    if (this.isCollapse(index)) 
      buf.append(OverlayLabel.ringRoleSymbol(index === 0 ? this._aIsHole : this._bIsHole))
    
    return buf.toString()
  }
}
OverlayLabel.SYM_UNKNOWN = '#'
OverlayLabel.SYM_BOUNDARY = 'B'
OverlayLabel.SYM_COLLAPSE = 'C'
OverlayLabel.SYM_LINE = 'L'
OverlayLabel.DIM_UNKNOWN = -1
OverlayLabel.DIM_NOT_PART = OverlayLabel.DIM_UNKNOWN
OverlayLabel.DIM_LINE = 1
OverlayLabel.DIM_BOUNDARY = 2
OverlayLabel.DIM_COLLAPSE = 3
OverlayLabel.LOC_UNKNOWN = Location.NONE
