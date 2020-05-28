import BoundaryNodeRule from '../algorithm/BoundaryNodeRule'
import GeometryGraph from '../geomgraph/GeometryGraph'
import RobustLineIntersector from '../algorithm/RobustLineIntersector'
export default class GeometryGraphOperation {
  constructor() {
    GeometryGraphOperation.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = new RobustLineIntersector()
    this._resultPrecisionModel = null
    this._arg = null
    if (arguments.length === 1) {
      const g0 = arguments[0]
      this.setComputationPrecision(g0.getPrecisionModel())
      this._arg = new Array(1).fill(null)
      this._arg[0] = new GeometryGraph(0, g0)
      
    } else if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      GeometryGraphOperation.constructor_.call(this, g0, g1, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE)
    } else if (arguments.length === 3) {
      const g0 = arguments[0], g1 = arguments[1], boundaryNodeRule = arguments[2]
      if (g0.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) this.setComputationPrecision(g0.getPrecisionModel()); else this.setComputationPrecision(g1.getPrecisionModel())
      this._arg = new Array(2).fill(null)
      this._arg[0] = new GeometryGraph(0, g0, boundaryNodeRule)
      this._arg[1] = new GeometryGraph(1, g1, boundaryNodeRule)
    }
  }
  getArgGeometry(i) {
    return this._arg[i].getGeometry()
  }
  setComputationPrecision(pm) {
    this._resultPrecisionModel = pm
    this._li.setPrecisionModel(this._resultPrecisionModel)
  }
}
