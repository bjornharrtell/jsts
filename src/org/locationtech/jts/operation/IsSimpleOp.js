import TreeSet from '../../../../java/util/TreeSet'
import LineString from '../geom/LineString'
import hasInterface from '../../../../hasInterface'
import MultiPoint from '../geom/MultiPoint'
import GeometryGraph from '../geomgraph/GeometryGraph'
import GeometryCollection from '../geom/GeometryCollection'
import Polygonal from '../geom/Polygonal'
import RobustLineIntersector from '../algorithm/RobustLineIntersector'
import LinearComponentExtracter from '../geom/util/LinearComponentExtracter'
import TreeMap from '../../../../java/util/TreeMap'
import MultiLineString from '../geom/MultiLineString'
export default class IsSimpleOp {
  constructor() {
    IsSimpleOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputGeom = null
    this._isClosedEndpointsInInterior = true
    this._nonSimpleLocation = null
    if (arguments.length === 1) {
      const geom = arguments[0]
      this._inputGeom = geom
    } else if (arguments.length === 2) {
      const geom = arguments[0], boundaryNodeRule = arguments[1]
      this._inputGeom = geom
      this._isClosedEndpointsInInterior = !boundaryNodeRule.isInBoundary(2)
    }
  }
  static isSimple() {
    if (arguments.length === 1) {
      const geom = arguments[0]
      const op = new IsSimpleOp(geom)
      return op.isSimple()
    } else if (arguments.length === 2) {
      const geom = arguments[0], boundaryNodeRule = arguments[1]
      const op = new IsSimpleOp(geom, boundaryNodeRule)
      return op.isSimple()
    }
  }
  isSimpleMultiPoint(mp) {
    if (mp.isEmpty()) return true
    const points = new TreeSet()
    for (let i = 0; i < mp.getNumGeometries(); i++) {
      const pt = mp.getGeometryN(i)
      const p = pt.getCoordinate()
      if (points.contains(p)) {
        this._nonSimpleLocation = p
        return false
      }
      points.add(p)
    }
    return true
  }
  isSimplePolygonal(geom) {
    const rings = LinearComponentExtracter.getLines(geom)
    for (let i = rings.iterator(); i.hasNext(); ) {
      const ring = i.next()
      if (!this.isSimpleLinearGeometry(ring)) return false
    }
    return true
  }
  hasClosedEndpointIntersection(graph) {
    const endPoints = new TreeMap()
    for (let i = graph.getEdgeIterator(); i.hasNext(); ) {
      const e = i.next()
      const isClosed = e.isClosed()
      const p0 = e.getCoordinate(0)
      this.addEndpoint(endPoints, p0, isClosed)
      const p1 = e.getCoordinate(e.getNumPoints() - 1)
      this.addEndpoint(endPoints, p1, isClosed)
    }
    for (let i = endPoints.values().iterator(); i.hasNext(); ) {
      const eiInfo = i.next()
      if (eiInfo.isClosed && eiInfo.degree !== 2) {
        this._nonSimpleLocation = eiInfo.getCoordinate()
        return true
      }
    }
    return false
  }
  getNonSimpleLocation() {
    return this._nonSimpleLocation
  }
  isSimpleLinearGeometry(geom) {
    if (geom.isEmpty()) return true
    const graph = new GeometryGraph(0, geom)
    const li = new RobustLineIntersector()
    const si = graph.computeSelfNodes(li, true)
    if (!si.hasIntersection()) return true
    if (si.hasProperIntersection()) {
      this._nonSimpleLocation = si.getProperIntersectionPoint()
      return false
    }
    if (this.hasNonEndpointIntersection(graph)) return false
    if (this._isClosedEndpointsInInterior) 
      if (this.hasClosedEndpointIntersection(graph)) return false
    
    return true
  }
  hasNonEndpointIntersection(graph) {
    for (let i = graph.getEdgeIterator(); i.hasNext(); ) {
      const e = i.next()
      const maxSegmentIndex = e.getMaximumSegmentIndex()
      for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
        const ei = eiIt.next()
        if (!ei.isEndPoint(maxSegmentIndex)) {
          this._nonSimpleLocation = ei.getCoordinate()
          return true
        }
      }
    }
    return false
  }
  addEndpoint(endPoints, p, isClosed) {
    let eiInfo = endPoints.get(p)
    if (eiInfo === null) {
      eiInfo = new EndpointInfo(p)
      endPoints.put(p, eiInfo)
    }
    eiInfo.addEndpoint(isClosed)
  }
  computeSimple(geom) {
    this._nonSimpleLocation = null
    if (geom.isEmpty()) return true
    if (geom instanceof LineString) return this.isSimpleLinearGeometry(geom)
    if (geom instanceof MultiLineString) return this.isSimpleLinearGeometry(geom)
    if (geom instanceof MultiPoint) return this.isSimpleMultiPoint(geom)
    if (hasInterface(geom, Polygonal)) return this.isSimplePolygonal(geom)
    if (geom instanceof GeometryCollection) return this.isSimpleGeometryCollection(geom)
    return true
  }
  isSimple() {
    this._nonSimpleLocation = null
    return this.computeSimple(this._inputGeom)
  }
  isSimpleGeometryCollection(geom) {
    for (let i = 0; i < geom.getNumGeometries(); i++) {
      const comp = geom.getGeometryN(i)
      if (!this.computeSimple(comp)) return false
    }
    return true
  }
}
class EndpointInfo {
  constructor() {
    EndpointInfo.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.pt = null
    this.isClosed = null
    this.degree = null
    const pt = arguments[0]
    this.pt = pt
    this.isClosed = false
    this.degree = 0
  }
  addEndpoint(isClosed) {
    this.degree++
    this.isClosed |= isClosed
  }
  getCoordinate() {
    return this.pt
  }
}
IsSimpleOp.EndpointInfo = EndpointInfo
