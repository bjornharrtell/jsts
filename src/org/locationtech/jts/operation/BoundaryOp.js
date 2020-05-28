import LineString from '../geom/LineString'
import BoundaryNodeRule from '../algorithm/BoundaryNodeRule'
import CoordinateArrays from '../geom/CoordinateArrays'
import ArrayList from '../../../../java/util/ArrayList'
import TreeMap from '../../../../java/util/TreeMap'
import MultiLineString from '../geom/MultiLineString'
export default class BoundaryOp {
  constructor() {
    BoundaryOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geom = null
    this._geomFact = null
    this._bnRule = null
    this._endpointMap = null
    if (arguments.length === 1) {
      const geom = arguments[0]
      BoundaryOp.constructor_.call(this, geom, BoundaryNodeRule.MOD2_BOUNDARY_RULE)
    } else if (arguments.length === 2) {
      const geom = arguments[0], bnRule = arguments[1]
      this._geom = geom
      this._geomFact = geom.getFactory()
      this._bnRule = bnRule
    }
  }
  static getBoundary() {
    if (arguments.length === 1) {
      const g = arguments[0]
      const bop = new BoundaryOp(g)
      return bop.getBoundary()
    } else if (arguments.length === 2) {
      const g = arguments[0], bnRule = arguments[1]
      const bop = new BoundaryOp(g, bnRule)
      return bop.getBoundary()
    }
  }
  boundaryMultiLineString(mLine) {
    if (this._geom.isEmpty()) 
      return this.getEmptyMultiPoint()
    
    const bdyPts = this.computeBoundaryCoordinates(mLine)
    if (bdyPts.length === 1) 
      return this._geomFact.createPoint(bdyPts[0])
    
    return this._geomFact.createMultiPointFromCoords(bdyPts)
  }
  getBoundary() {
    if (this._geom instanceof LineString) return this.boundaryLineString(this._geom)
    if (this._geom instanceof MultiLineString) return this.boundaryMultiLineString(this._geom)
    return this._geom.getBoundary()
  }
  boundaryLineString(line) {
    if (this._geom.isEmpty()) 
      return this.getEmptyMultiPoint()
    
    if (line.isClosed()) {
      const closedEndpointOnBoundary = this._bnRule.isInBoundary(2)
      if (closedEndpointOnBoundary) 
        return line.getStartPoint()
      else 
        return this._geomFact.createMultiPoint()
      
    }
    return this._geomFact.createMultiPoint([line.getStartPoint(), line.getEndPoint()])
  }
  getEmptyMultiPoint() {
    return this._geomFact.createMultiPoint()
  }
  computeBoundaryCoordinates(mLine) {
    const bdyPts = new ArrayList()
    this._endpointMap = new TreeMap()
    for (let i = 0; i < mLine.getNumGeometries(); i++) {
      const line = mLine.getGeometryN(i)
      if (line.getNumPoints() === 0) continue
      this.addEndpoint(line.getCoordinateN(0))
      this.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1))
    }
    for (let it = this._endpointMap.entrySet().iterator(); it.hasNext(); ) {
      const entry = it.next()
      const counter = entry.getValue()
      const valence = counter.count
      if (this._bnRule.isInBoundary(valence)) 
        bdyPts.add(entry.getKey())
      
    }
    return CoordinateArrays.toCoordinateArray(bdyPts)
  }
  addEndpoint(pt) {
    let counter = this._endpointMap.get(pt)
    if (counter === null) {
      counter = new Counter()
      this._endpointMap.put(pt, counter)
    }
    counter.count++
  }
}
class Counter {
  constructor() {
    Counter.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.count = null
  }
}
