import Location from '../../geom/Location'
import TreeSet from '../../../../../java/util/TreeSet'
import LineString from '../../geom/LineString'
import Geometry from '../../geom/Geometry'
import ConnectedInteriorTester from './ConnectedInteriorTester'
import Coordinate from '../../geom/Coordinate'
import Point from '../../geom/Point'
import Polygon from '../../geom/Polygon'
import MultiPoint from '../../geom/MultiPoint'
import PointLocation from '../../algorithm/PointLocation'
import LinearRing from '../../geom/LinearRing'
import Double from '../../../../../java/lang/Double'
import GeometryGraph from '../../geomgraph/GeometryGraph'
import MultiPolygon from '../../geom/MultiPolygon'
import ConsistentAreaTester from './ConsistentAreaTester'
import GeometryCollection from '../../geom/GeometryCollection'
import UnsupportedOperationException from '../../../../../java/lang/UnsupportedOperationException'
import IndexedNestedRingTester from './IndexedNestedRingTester'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector'
import TopologyValidationError from './TopologyValidationError'
import IndexedPointInAreaLocator from '../../algorithm/locate/IndexedPointInAreaLocator'
import Assert from '../../util/Assert'
export default class IsValidOp {
  constructor() {
    IsValidOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._parentGeometry = null
    this._isSelfTouchingRingFormingHoleValid = false
    this._validErr = null
    const parentGeometry = arguments[0]
    this._parentGeometry = parentGeometry
  }
  static findPtNotNode(testCoords, searchRing, graph) {
    const searchEdge = graph.findEdge(searchRing)
    const eiList = searchEdge.getEdgeIntersectionList()
    for (let i = 0; i < testCoords.length; i++) {
      const pt = testCoords[i]
      if (!eiList.isIntersection(pt)) return pt
    }
    return null
  }
  static isValid() {
    if (arguments[0] instanceof Geometry) {
      const geom = arguments[0]
      const isValidOp = new IsValidOp(geom)
      return isValidOp.isValid()
    } else if (arguments[0] instanceof Coordinate) {
      const coord = arguments[0]
      if (Double.isNaN(coord.x)) return false
      if (Double.isInfinite(coord.x)) return false
      if (Double.isNaN(coord.y)) return false
      if (Double.isInfinite(coord.y)) return false
      return true
    }
  }
  checkInvalidCoordinates() {
    if (arguments[0] instanceof Array) {
      const coords = arguments[0]
      for (let i = 0; i < coords.length; i++) 
        if (!IsValidOp.isValid(coords[i])) {
          this._validErr = new TopologyValidationError(TopologyValidationError.INVALID_COORDINATE, coords[i])
          return null
        }
      
    } else if (arguments[0] instanceof Polygon) {
      const poly = arguments[0]
      this.checkInvalidCoordinates(poly.getExteriorRing().getCoordinates())
      if (this._validErr !== null) return null
      for (let i = 0; i < poly.getNumInteriorRing(); i++) {
        this.checkInvalidCoordinates(poly.getInteriorRingN(i).getCoordinates())
        if (this._validErr !== null) return null
      }
    }
  }
  checkHolesNotNested(p, graph) {
    if (p.getNumInteriorRing() <= 0) return null
    const nestedTester = new IndexedNestedRingTester(graph)
    for (let i = 0; i < p.getNumInteriorRing(); i++) {
      const innerHole = p.getInteriorRingN(i)
      if (innerHole.isEmpty()) continue
      nestedTester.add(innerHole)
    }
    const isNonNested = nestedTester.isNonNested()
    if (!isNonNested) 
      this._validErr = new TopologyValidationError(TopologyValidationError.NESTED_HOLES, nestedTester.getNestedPoint())
    
  }
  checkConsistentArea(graph) {
    const cat = new ConsistentAreaTester(graph)
    const isValidArea = cat.isNodeConsistentArea()
    if (!isValidArea) {
      this._validErr = new TopologyValidationError(TopologyValidationError.SELF_INTERSECTION, cat.getInvalidPoint())
      return null
    }
    if (cat.hasDuplicateRings()) 
      this._validErr = new TopologyValidationError(TopologyValidationError.DUPLICATE_RINGS, cat.getInvalidPoint())
    
  }
  isValid() {
    this.checkValid(this._parentGeometry)
    return this._validErr === null
  }
  checkShellInsideHole(shell, hole, graph) {
    const shellPts = shell.getCoordinates()
    const holePts = hole.getCoordinates()
    const shellPt = IsValidOp.findPtNotNode(shellPts, hole, graph)
    if (shellPt !== null) {
      const insideHole = PointLocation.isInRing(shellPt, holePts)
      if (!insideHole) 
        return shellPt
      
    }
    const holePt = IsValidOp.findPtNotNode(holePts, shell, graph)
    if (holePt !== null) {
      const insideShell = PointLocation.isInRing(holePt, shellPts)
      if (insideShell) 
        return holePt
      
      return null
    }
    Assert.shouldNeverReachHere('points in shell and hole appear to be equal')
    return null
  }
  checkNoSelfIntersectingRings(graph) {
    for (let i = graph.getEdgeIterator(); i.hasNext(); ) {
      const e = i.next()
      this.checkNoSelfIntersectingRing(e.getEdgeIntersectionList())
      if (this._validErr !== null) return null
    }
  }
  checkConnectedInteriors(graph) {
    const cit = new ConnectedInteriorTester(graph)
    if (!cit.isInteriorsConnected()) this._validErr = new TopologyValidationError(TopologyValidationError.DISCONNECTED_INTERIOR, cit.getCoordinate())
  }
  checkNoSelfIntersectingRing(eiList) {
    const nodeSet = new TreeSet()
    let isFirst = true
    for (let i = eiList.iterator(); i.hasNext(); ) {
      const ei = i.next()
      if (isFirst) {
        isFirst = false
        continue
      }
      if (nodeSet.contains(ei.coord)) {
        this._validErr = new TopologyValidationError(TopologyValidationError.RING_SELF_INTERSECTION, ei.coord)
        return null
      } else {
        nodeSet.add(ei.coord)
      }
    }
  }
  checkHolesInShell(p, graph) {
    if (p.getNumInteriorRing() <= 0) return null
    const shell = p.getExteriorRing()
    const isShellEmpty = shell.isEmpty()
    const pir = new IndexedPointInAreaLocator(shell)
    for (let i = 0; i < p.getNumInteriorRing(); i++) {
      const hole = p.getInteriorRingN(i)
      let holePt = null
      if (hole.isEmpty()) continue
      holePt = IsValidOp.findPtNotNode(hole.getCoordinates(), shell, graph)
      if (holePt === null) return null
      const outside = isShellEmpty || Location.EXTERIOR === pir.locate(holePt)
      if (outside) {
        this._validErr = new TopologyValidationError(TopologyValidationError.HOLE_OUTSIDE_SHELL, holePt)
        return null
      }
    }
  }
  checkTooFewPoints(graph) {
    if (graph.hasTooFewPoints()) {
      this._validErr = new TopologyValidationError(TopologyValidationError.TOO_FEW_POINTS, graph.getInvalidPoint())
      return null
    }
  }
  getValidationError() {
    this.checkValid(this._parentGeometry)
    return this._validErr
  }
  checkValid() {
    if (arguments[0] instanceof Point) {
      const g = arguments[0]
      this.checkInvalidCoordinates(g.getCoordinates())
    } else if (arguments[0] instanceof MultiPoint) {
      const g = arguments[0]
      this.checkInvalidCoordinates(g.getCoordinates())
    } else if (arguments[0] instanceof LinearRing) {
      const g = arguments[0]
      this.checkInvalidCoordinates(g.getCoordinates())
      if (this._validErr !== null) return null
      this.checkClosedRing(g)
      if (this._validErr !== null) return null
      const graph = new GeometryGraph(0, g)
      this.checkTooFewPoints(graph)
      if (this._validErr !== null) return null
      const li = new RobustLineIntersector()
      graph.computeSelfNodes(li, true, true)
      this.checkNoSelfIntersectingRings(graph)
    } else if (arguments[0] instanceof LineString) {
      const g = arguments[0]
      this.checkInvalidCoordinates(g.getCoordinates())
      if (this._validErr !== null) return null
      const graph = new GeometryGraph(0, g)
      this.checkTooFewPoints(graph)
    } else if (arguments[0] instanceof Polygon) {
      const g = arguments[0]
      this.checkInvalidCoordinates(g)
      if (this._validErr !== null) return null
      this.checkClosedRings(g)
      if (this._validErr !== null) return null
      const graph = new GeometryGraph(0, g)
      this.checkTooFewPoints(graph)
      if (this._validErr !== null) return null
      this.checkConsistentArea(graph)
      if (this._validErr !== null) return null
      if (!this._isSelfTouchingRingFormingHoleValid) {
        this.checkNoSelfIntersectingRings(graph)
        if (this._validErr !== null) return null
      }
      this.checkHolesInShell(g, graph)
      if (this._validErr !== null) return null
      this.checkHolesNotNested(g, graph)
      if (this._validErr !== null) return null
      this.checkConnectedInteriors(graph)
    } else if (arguments[0] instanceof MultiPolygon) {
      const g = arguments[0]
      for (let i = 0; i < g.getNumGeometries(); i++) {
        const p = g.getGeometryN(i)
        this.checkInvalidCoordinates(p)
        if (this._validErr !== null) return null
        this.checkClosedRings(p)
        if (this._validErr !== null) return null
      }
      const graph = new GeometryGraph(0, g)
      this.checkTooFewPoints(graph)
      if (this._validErr !== null) return null
      this.checkConsistentArea(graph)
      if (this._validErr !== null) return null
      if (!this._isSelfTouchingRingFormingHoleValid) {
        this.checkNoSelfIntersectingRings(graph)
        if (this._validErr !== null) return null
      }
      for (let i = 0; i < g.getNumGeometries(); i++) {
        const p = g.getGeometryN(i)
        this.checkHolesInShell(p, graph)
        if (this._validErr !== null) return null
      }
      for (let i = 0; i < g.getNumGeometries(); i++) {
        const p = g.getGeometryN(i)
        this.checkHolesNotNested(p, graph)
        if (this._validErr !== null) return null
      }
      this.checkShellsNotNested(g, graph)
      if (this._validErr !== null) return null
      this.checkConnectedInteriors(graph)
    } else if (arguments[0] instanceof GeometryCollection) {
      const gc = arguments[0]
      for (let i = 0; i < gc.getNumGeometries(); i++) {
        const g = gc.getGeometryN(i)
        this.checkValid(g)
        if (this._validErr !== null) return null
      }
    } else if (arguments[0] instanceof Geometry) {
      const g = arguments[0]
      this._validErr = null
      if (g.isEmpty()) return null
      if (g instanceof Point) this.checkValid(g); else if (g instanceof MultiPoint) this.checkValid(g); else if (g instanceof LinearRing) this.checkValid(g); else if (g instanceof LineString) this.checkValid(g); else if (g instanceof Polygon) this.checkValid(g); else if (g instanceof MultiPolygon) this.checkValid(g); else if (g instanceof GeometryCollection) this.checkValid(g); else throw new UnsupportedOperationException(g.getGeometryType())
    }
  }
  setSelfTouchingRingFormingHoleValid(isValid) {
    this._isSelfTouchingRingFormingHoleValid = isValid
  }
  checkShellNotNested(shell, p, graph) {
    const shellPts = shell.getCoordinates()
    const polyShell = p.getExteriorRing()
    if (polyShell.isEmpty()) return null
    const polyPts = polyShell.getCoordinates()
    const shellPt = IsValidOp.findPtNotNode(shellPts, polyShell, graph)
    if (shellPt === null) return null
    const insidePolyShell = PointLocation.isInRing(shellPt, polyPts)
    if (!insidePolyShell) return null
    if (p.getNumInteriorRing() <= 0) {
      this._validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, shellPt)
      return null
    }
    let badNestedPt = null
    for (let i = 0; i < p.getNumInteriorRing(); i++) {
      const hole = p.getInteriorRingN(i)
      badNestedPt = this.checkShellInsideHole(shell, hole, graph)
      if (badNestedPt === null) return null
    }
    this._validErr = new TopologyValidationError(TopologyValidationError.NESTED_SHELLS, badNestedPt)
  }
  checkClosedRings(poly) {
    this.checkClosedRing(poly.getExteriorRing())
    if (this._validErr !== null) return null
    for (let i = 0; i < poly.getNumInteriorRing(); i++) {
      this.checkClosedRing(poly.getInteriorRingN(i))
      if (this._validErr !== null) return null
    }
  }
  checkClosedRing(ring) {
    if (ring.isEmpty()) return null
    if (!ring.isClosed()) {
      let pt = null
      if (ring.getNumPoints() >= 1) pt = ring.getCoordinateN(0)
      this._validErr = new TopologyValidationError(TopologyValidationError.RING_NOT_CLOSED, pt)
    }
  }
  checkShellsNotNested(mp, graph) {
    for (let i = 0; i < mp.getNumGeometries(); i++) {
      const p = mp.getGeometryN(i)
      const shell = p.getExteriorRing()
      for (let j = 0; j < mp.getNumGeometries(); j++) {
        if (i === j) continue
        const p2 = mp.getGeometryN(j)
        this.checkShellNotNested(shell, p2, graph)
        if (this._validErr !== null) return null
      }
    }
  }
}
