import Geometry from '../../geom/Geometry.js'
import hasInterface from '../../../../../hasInterface.js'
import UnionStrategy from '../union/UnionStrategy.js'
import Collection from '../../../../../java/util/Collection.js'
import OverlayNG from './OverlayNG.js'
import UnaryUnionOp from '../union/UnaryUnionOp.js'
import TopologyException from '../../geom/TopologyException.js'
import SnappingNoder from '../../noding/snap/SnappingNoder.js'
import PrecisionUtil from './PrecisionUtil.js'
import PrecisionModel from '../../geom/PrecisionModel.js'
import RuntimeException from '../../../../../java/lang/RuntimeException.js'
export default class OverlayNGRobust {
  static union() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Geometry) {
        const geom = arguments[0]
        const op = new UnaryUnionOp(geom)
        op.setUnionFunction(OverlayNGRobust.OVERLAY_UNION)
        return op.union()
      } else if (hasInterface(arguments[0], Collection)) {
        const geoms = arguments[0]
        const op = new UnaryUnionOp(geoms)
        op.setUnionFunction(OverlayNGRobust.OVERLAY_UNION)
        return op.union()
      }
    } else if (arguments.length === 2) {
      const geoms = arguments[0], geomFact = arguments[1]
      const op = new UnaryUnionOp(geoms, geomFact)
      op.setUnionFunction(OverlayNGRobust.OVERLAY_UNION)
      return op.union()
    }
  }
  static overlay(geom0, geom1, opCode) {
    let result = null
    let exOriginal = null
    try {
      result = OverlayNG.overlay(geom0, geom1, opCode)
      return result
    } catch (ex) {
      if (ex instanceof RuntimeException) 
        exOriginal = ex
      else throw ex
    } finally {}
    result = OverlayNGRobust.overlaySnapTries(geom0, geom1, opCode)
    if (result !== null) return result
    result = OverlayNGRobust.overlaySR(geom0, geom1, opCode)
    if (result !== null) return result
    throw exOriginal
  }
  static overlaySnapTol(geom0, geom1, opCode, snapTol) {
    const snapNoder = new SnappingNoder(snapTol)
    return OverlayNG.overlay(geom0, geom1, opCode, snapNoder)
  }
  static overlaySnapTries(geom0, geom1, opCode) {
    let result = null
    let snapTol = OverlayNGRobust.snapTolerance(geom0, geom1)
    for (let i = 0; i < OverlayNGRobust.NUM_SNAP_TRIES; i++) {
      result = OverlayNGRobust.overlaySnapping(geom0, geom1, opCode, snapTol)
      if (result !== null) return result
      result = OverlayNGRobust.overlaySnapBoth(geom0, geom1, opCode, snapTol)
      if (result !== null) return result
      snapTol = snapTol * 10
    }
    return null
  }
  static overlaySR(geom0, geom1, opCode) {
    let result = null
    try {
      const scaleSafe = PrecisionUtil.safeScale(geom0, geom1)
      const pmSafe = new PrecisionModel(scaleSafe)
      result = OverlayNG.overlay(geom0, geom1, opCode, pmSafe)
      return result
    } catch (ex) {
      if (ex instanceof TopologyException) {} else {
        throw ex
      }
    } finally {}
    return null
  }
  static snapSelf(geom, snapTol) {
    const ov = new OverlayNG(geom, null)
    const snapNoder = new SnappingNoder(snapTol)
    ov.setNoder(snapNoder)
    ov.setStrictMode(true)
    return ov.getResult()
  }
  static overlaySnapBoth(geom0, geom1, opCode, snapTol) {
    try {
      const snap0 = OverlayNGRobust.snapSelf(geom0, snapTol)
      const snap1 = OverlayNGRobust.snapSelf(geom1, snapTol)
      return OverlayNGRobust.overlaySnapTol(snap0, snap1, opCode, snapTol)
    } catch (ex) {
      if (ex instanceof TopologyException) {} else {
        throw ex
      }
    } finally {}
    return null
  }
  static overlaySnapping(geom0, geom1, opCode, snapTol) {
    try {
      return OverlayNGRobust.overlaySnapTol(geom0, geom1, opCode, snapTol)
    } catch (ex) {
      if (ex instanceof TopologyException) {} else {
        throw ex
      }
    } finally {}
    return null
  }
  static ordinateMagnitude(geom) {
    if (geom === null || geom.isEmpty()) return 0
    const env = geom.getEnvelopeInternal()
    const magMax = Math.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()))
    const magMin = Math.max(Math.abs(env.getMinX()), Math.abs(env.getMinY()))
    return Math.max(magMax, magMin)
  }
  static snapTolerance() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      const magnitude = OverlayNGRobust.ordinateMagnitude(geom)
      return magnitude / OverlayNGRobust.SNAP_TOL_FACTOR
    } else if (arguments.length === 2) {
      const geom0 = arguments[0], geom1 = arguments[1]
      const tol0 = OverlayNGRobust.snapTolerance(geom0)
      const tol1 = OverlayNGRobust.snapTolerance(geom1)
      const snapTol = Math.max(tol0, tol1)
      return snapTol
    }
  }
}
OverlayNGRobust.OVERLAY_UNION = new (class {
  get interfaces_() {
    return [UnionStrategy]
  }
  union(g0, g1) {
    return OverlayNGRobust.overlay(g0, g1, OverlayNG.UNION)
  }
  isFloatingPrecision() {
    return true
  }
})()
OverlayNGRobust.NUM_SNAP_TRIES = 5
OverlayNGRobust.SNAP_TOL_FACTOR = 1e12
