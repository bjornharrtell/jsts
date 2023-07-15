import Geometry from '../../geom/Geometry.js'
import hasInterface from '../../../../../hasInterface.js'
import UnionStrategy from '../union/UnionStrategy.js'
import Collection from '../../../../../java/util/Collection.js'
import OverlayNG from './OverlayNG.js'
import UnaryUnionOp from '../union/UnaryUnionOp.js'
import OverlayUtil from './OverlayUtil.js'
import PrecisionModel from '../../geom/PrecisionModel.js'
import UNION from './OverlayNG/UNION.js'
export default class UnaryUnionNG {
  static union() {
    if (arguments.length === 2) {
      if (arguments[0] instanceof Geometry && arguments[1] instanceof PrecisionModel) {
        const geom = arguments[0], pm = arguments[1]
        const op = new UnaryUnionOp(geom)
        op.setUnionFunction(UnaryUnionNG.createUnionStrategy(pm))
        return op.union()
      } else if (hasInterface(arguments[0], Collection) && arguments[1] instanceof PrecisionModel) {
        const geoms = arguments[0], pm = arguments[1]
        const op = new UnaryUnionOp(geoms)
        op.setUnionFunction(UnaryUnionNG.createUnionStrategy(pm))
        return op.union()
      }
    } else if (arguments.length === 3) {
      const geoms = arguments[0], geomFact = arguments[1], pm = arguments[2]
      const op = new UnaryUnionOp(geoms, geomFact)
      op.setUnionFunction(UnaryUnionNG.createUnionStrategy(pm))
      return op.union()
    }
  }
  static createUnionStrategy(pm) {
    const unionSRFun = new (class {
      get interfaces_() {
        return [UnionStrategy]
      }
      union(g0, g1) {
        return OverlayNG.overlay(g0, g1, OverlayNG.UNION, pm)
      }
      isFloatingPrecision() {
        return OverlayUtil.isFloating(pm)
      }
    })()
    return unionSRFun
  }
}
