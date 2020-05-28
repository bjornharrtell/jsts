import ArrayList from '../../../../../java/util/ArrayList'
import OverlayOp from './OverlayOp'
export default class PointBuilder {
  constructor() {
    PointBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._op = null
    this._geometryFactory = null
    this._resultPointList = new ArrayList()
    const op = arguments[0], geometryFactory = arguments[1], ptLocator = arguments[2]
    this._op = op
    this._geometryFactory = geometryFactory
  }
  filterCoveredNodeToPoint(n) {
    const coord = n.getCoordinate()
    if (!this._op.isCoveredByLA(coord)) {
      const pt = this._geometryFactory.createPoint(coord)
      this._resultPointList.add(pt)
    }
  }
  extractNonCoveredResultNodes(opCode) {
    for (let nodeit = this._op.getGraph().getNodes().iterator(); nodeit.hasNext(); ) {
      const n = nodeit.next()
      if (n.isInResult()) continue
      if (n.isIncidentEdgeInResult()) continue
      if (n.getEdges().getDegree() === 0 || opCode === OverlayOp.INTERSECTION) {
        const label = n.getLabel()
        if (OverlayOp.isResultOfOp(label, opCode)) 
          this.filterCoveredNodeToPoint(n)
        
      }
    }
  }
  build(opCode) {
    this.extractNonCoveredResultNodes(opCode)
    return this._resultPointList
  }
}
