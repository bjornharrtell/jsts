import SnapOverlayOp from './SnapOverlayOp'
import RuntimeException from '../../../../../../java/lang/RuntimeException'
import OverlayOp from '../OverlayOp'
export default class SnapIfNeededOverlayOp {
  constructor() {
    SnapIfNeededOverlayOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = new Array(2).fill(null)
    const g1 = arguments[0], g2 = arguments[1]
    this._geom[0] = g1
    this._geom[1] = g2
  }
  static overlayOp(g0, g1, opCode) {
    const op = new SnapIfNeededOverlayOp(g0, g1)
    return op.getResultGeometry(opCode)
  }
  static union(g0, g1) {
    return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.UNION)
  }
  static intersection(g0, g1) {
    return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION)
  }
  static symDifference(g0, g1) {
    return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE)
  }
  static difference(g0, g1) {
    return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE)
  }
  getResultGeometry(opCode) {
    let result = null
    let isSuccess = false
    let savedException = null
    try {
      result = OverlayOp.overlayOp(this._geom[0], this._geom[1], opCode)
      const isValid = true
      if (isValid) isSuccess = true
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        savedException = ex
      else throw ex
    } finally {}
    if (!isSuccess) 
      try {
        result = SnapOverlayOp.overlayOp(this._geom[0], this._geom[1], opCode)
      } catch (ex) {
        if (ex instanceof RuntimeException) 
          throw savedException
        else throw ex
      } finally {}
    
    return result
  }
}
