import UnionOp from '../operation/union/UnionOp.js'
import BufferOp from '../operation/buffer/BufferOp.js'
import CommonBitsOp from './CommonBitsOp.js'
import RuntimeException from '../../../../java/lang/RuntimeException.js'
import OverlayOp from '../operation/overlay/OverlayOp.js'
export default class EnhancedPrecisionOp {
  static union(geom0, geom1) {
    let originalEx = null
    try {
      const result = UnionOp.union(geom0, geom1)
      return result
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        originalEx = ex
      else throw ex
    } finally {}
    try {
      const cbo = new CommonBitsOp(true)
      const resultEP = cbo.union(geom0, geom1)
      if (!resultEP.isValid()) throw originalEx
      return resultEP
    } catch (ex2) {
      if (ex2 instanceof RuntimeException) 
        throw originalEx
      else throw ex2
    } finally {}
  }
  static intersection(geom0, geom1) {
    let originalEx = null
    try {
      const result = OverlayOp.intersection(geom0, geom1)
      return result
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        originalEx = ex
      else throw ex
    } finally {}
    try {
      const cbo = new CommonBitsOp(true)
      const resultEP = cbo.intersection(geom0, geom1)
      if (!resultEP.isValid()) throw originalEx
      return resultEP
    } catch (ex2) {
      if (ex2 instanceof RuntimeException) 
        throw originalEx
      else throw ex2
    } finally {}
  }
  static buffer(geom, distance) {
    let originalEx = null
    try {
      const result = BufferOp.bufferOp(geom, distance)
      return result
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        originalEx = ex
      else throw ex
    } finally {}
    try {
      const cbo = new CommonBitsOp(true)
      const resultEP = cbo.buffer(geom, distance)
      if (!resultEP.isValid()) throw originalEx
      return resultEP
    } catch (ex2) {
      if (ex2 instanceof RuntimeException) 
        throw originalEx
      else throw ex2
    } finally {}
  }
  static symDifference(geom0, geom1) {
    let originalEx = null
    try {
      const result = OverlayOp.symDifference(geom0, geom1)
      return result
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        originalEx = ex
      else throw ex
    } finally {}
    try {
      const cbo = new CommonBitsOp(true)
      const resultEP = cbo.symDifference(geom0, geom1)
      if (!resultEP.isValid()) throw originalEx
      return resultEP
    } catch (ex2) {
      if (ex2 instanceof RuntimeException) 
        throw originalEx
      else throw ex2
    } finally {}
  }
  static difference(geom0, geom1) {
    let originalEx = null
    try {
      const result = OverlayOp.difference(geom0, geom1)
      return result
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        originalEx = ex
      else throw ex
    } finally {}
    try {
      const cbo = new CommonBitsOp(true)
      const resultEP = cbo.difference(geom0, geom1)
      if (!resultEP.isValid()) throw originalEx
      return resultEP
    } catch (ex2) {
      if (ex2 instanceof RuntimeException) 
        throw originalEx
      else throw ex2
    } finally {}
  }
}
