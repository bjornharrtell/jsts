import RelateComputer from './RelateComputer'
import GeometryGraphOperation from '../GeometryGraphOperation'
import RectangleContains from '../predicate/RectangleContains'
import RectangleIntersects from '../predicate/RectangleIntersects'
export default class RelateOp extends GeometryGraphOperation {
  constructor() {
    super()
    RelateOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._relate = null
    if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      GeometryGraphOperation.constructor_.call(this, g0, g1)
      this._relate = new RelateComputer(this._arg)
    } else if (arguments.length === 3) {
      const g0 = arguments[0], g1 = arguments[1], boundaryNodeRule = arguments[2]
      GeometryGraphOperation.constructor_.call(this, g0, g1, boundaryNodeRule)
      this._relate = new RelateComputer(this._arg)
    }
  }
  static covers(g1, g2) {
    if (g2.getDimension() === 2 && g1.getDimension() < 2) 
      return false
    
    if (g2.getDimension() === 1 && g1.getDimension() < 1 && g2.getLength() > 0.0) 
      return false
    
    if (!g1.getEnvelopeInternal().covers(g2.getEnvelopeInternal())) return false
    if (g1.isRectangle()) 
      return true
    
    return new RelateOp(g1, g2).getIntersectionMatrix().isCovers()
  }
  static intersects(g1, g2) {
    if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false
    if (g1.isRectangle()) 
      return RectangleIntersects.intersects(g1, g2)
    
    if (g2.isRectangle()) 
      return RectangleIntersects.intersects(g2, g1)
    
    if (g1.isGeometryCollection() || g2.isGeometryCollection()) {
      const r = false
      for (let i = 0; i < g1.getNumGeometries(); i++) 
        for (let j = 0; j < g2.getNumGeometries(); j++) 
          if (g1.getGeometryN(i).intersects(g2.getGeometryN(j))) 
            return true
          
        
      
      return false
    }
    return new RelateOp(g1, g2).getIntersectionMatrix().isIntersects()
  }
  static touches(g1, g2) {
    if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false
    return new RelateOp(g1, g2).getIntersectionMatrix().isTouches(g1.getDimension(), g2.getDimension())
  }
  static equalsTopo(g1, g2) {
    if (!g1.getEnvelopeInternal().equals(g2.getEnvelopeInternal())) return false
    return RelateOp.relate(g1, g2).isEquals(g1.getDimension(), g2.getDimension())
  }
  static relate() {
    if (arguments.length === 2) {
      const a = arguments[0], b = arguments[1]
      const relOp = new RelateOp(a, b)
      const im = relOp.getIntersectionMatrix()
      return im
    } else if (arguments.length === 3) {
      const a = arguments[0], b = arguments[1], boundaryNodeRule = arguments[2]
      const relOp = new RelateOp(a, b, boundaryNodeRule)
      const im = relOp.getIntersectionMatrix()
      return im
    }
  }
  static overlaps(g1, g2) {
    if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false
    return new RelateOp(g1, g2).getIntersectionMatrix().isOverlaps(g1.getDimension(), g2.getDimension())
  }
  static crosses(g1, g2) {
    if (!g1.getEnvelopeInternal().intersects(g2.getEnvelopeInternal())) return false
    return new RelateOp(g1, g2).getIntersectionMatrix().isCrosses(g1.getDimension(), g2.getDimension())
  }
  static contains(g1, g2) {
    if (g2.getDimension() === 2 && g1.getDimension() < 2) 
      return false
    
    if (g2.getDimension() === 1 && g1.getDimension() < 1 && g2.getLength() > 0.0) 
      return false
    
    if (!g1.getEnvelopeInternal().contains(g2.getEnvelopeInternal())) return false
    if (g1.isRectangle()) 
      return RectangleContains.contains(g1, g2)
    
    return new RelateOp(g1, g2).getIntersectionMatrix().isContains()
  }
  getIntersectionMatrix() {
    return this._relate.computeIM()
  }
}
