import PointLocator from '../algorithm/PointLocator'
import Location from '../geom/Location'
import LineString from '../geom/LineString'
import HashMap from '../../../../java/util/HashMap'
import Geometry from '../geom/Geometry'
import hasInterface from '../../../../hasInterface'
import Position from './Position'
import Coordinate from '../geom/Coordinate'
import Point from '../geom/Point'
import Polygon from '../geom/Polygon'
import MultiPoint from '../geom/MultiPoint'
import SimpleMCSweepLineIntersector from './index/SimpleMCSweepLineIntersector'
import LinearRing from '../geom/LinearRing'
import BoundaryNodeRule from '../algorithm/BoundaryNodeRule'
import Orientation from '../algorithm/Orientation'
import SegmentIntersector from './index/SegmentIntersector'
import MultiPolygon from '../geom/MultiPolygon'
import Label from './Label'
import GeometryCollection from '../geom/GeometryCollection'
import UnsupportedOperationException from '../../../../java/lang/UnsupportedOperationException'
import CoordinateArrays from '../geom/CoordinateArrays'
import Polygonal from '../geom/Polygonal'
import IndexedPointInAreaLocator from '../algorithm/locate/IndexedPointInAreaLocator'
import Assert from '../util/Assert'
import Edge from './Edge'
import MultiLineString from '../geom/MultiLineString'
import PlanarGraph from './PlanarGraph'
export default class GeometryGraph extends PlanarGraph {
  constructor() {
    super()
    GeometryGraph.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._parentGeom = null
    this._lineEdgeMap = new HashMap()
    this._boundaryNodeRule = null
    this._useBoundaryDeterminationRule = true
    this._argIndex = null
    this._boundaryNodes = null
    this._hasTooFewPoints = false
    this._invalidPoint = null
    this._areaPtLocator = null
    this._ptLocator = new PointLocator()
    if (arguments.length === 2) {
      const argIndex = arguments[0], parentGeom = arguments[1]
      GeometryGraph.constructor_.call(this, argIndex, parentGeom, BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE)
    } else if (arguments.length === 3) {
      const argIndex = arguments[0], parentGeom = arguments[1], boundaryNodeRule = arguments[2]
      this._argIndex = argIndex
      this._parentGeom = parentGeom
      this._boundaryNodeRule = boundaryNodeRule
      if (parentGeom !== null) 
        this.add(parentGeom)
      
    }
  }
  static determineBoundary(boundaryNodeRule, boundaryCount) {
    return boundaryNodeRule.isInBoundary(boundaryCount) ? Location.BOUNDARY : Location.INTERIOR
  }
  insertBoundaryPoint(argIndex, coord) {
    const n = this._nodes.addNode(coord)
    const lbl = n.getLabel()
    let boundaryCount = 1
    let loc = Location.NONE
    loc = lbl.getLocation(argIndex, Position.ON)
    if (loc === Location.BOUNDARY) boundaryCount++
    const newLoc = GeometryGraph.determineBoundary(this._boundaryNodeRule, boundaryCount)
    lbl.setLocation(argIndex, newLoc)
  }
  computeSelfNodes() {
    if (arguments.length === 2) {
      const li = arguments[0], computeRingSelfNodes = arguments[1]
      return this.computeSelfNodes(li, computeRingSelfNodes, false)
    } else if (arguments.length === 3) {
      const li = arguments[0], computeRingSelfNodes = arguments[1], isDoneIfProperInt = arguments[2]
      const si = new SegmentIntersector(li, true, false)
      si.setIsDoneIfProperInt(isDoneIfProperInt)
      const esi = this.createEdgeSetIntersector()
      const isRings = this._parentGeom instanceof LinearRing || this._parentGeom instanceof Polygon || this._parentGeom instanceof MultiPolygon
      const computeAllSegments = computeRingSelfNodes || !isRings
      esi.computeIntersections(this._edges, si, computeAllSegments)
      this.addSelfIntersectionNodes(this._argIndex)
      return si
    }
  }
  computeSplitEdges(edgelist) {
    for (let i = this._edges.iterator(); i.hasNext(); ) {
      const e = i.next()
      e.eiList.addSplitEdges(edgelist)
    }
  }
  computeEdgeIntersections(g, li, includeProper) {
    const si = new SegmentIntersector(li, includeProper, true)
    si.setBoundaryNodes(this.getBoundaryNodes(), g.getBoundaryNodes())
    const esi = this.createEdgeSetIntersector()
    esi.computeIntersections(this._edges, g._edges, si)
    return si
  }
  getGeometry() {
    return this._parentGeom
  }
  getBoundaryNodeRule() {
    return this._boundaryNodeRule
  }
  hasTooFewPoints() {
    return this._hasTooFewPoints
  }
  addPoint() {
    if (arguments[0] instanceof Point) {
      const p = arguments[0]
      const coord = p.getCoordinate()
      this.insertPoint(this._argIndex, coord, Location.INTERIOR)
    } else if (arguments[0] instanceof Coordinate) {
      const pt = arguments[0]
      this.insertPoint(this._argIndex, pt, Location.INTERIOR)
    }
  }
  addPolygon(p) {
    this.addPolygonRing(p.getExteriorRing(), Location.EXTERIOR, Location.INTERIOR)
    for (let i = 0; i < p.getNumInteriorRing(); i++) {
      const hole = p.getInteriorRingN(i)
      this.addPolygonRing(hole, Location.INTERIOR, Location.EXTERIOR)
    }
  }
  addEdge(e) {
    this.insertEdge(e)
    const coord = e.getCoordinates()
    this.insertPoint(this._argIndex, coord[0], Location.BOUNDARY)
    this.insertPoint(this._argIndex, coord[coord.length - 1], Location.BOUNDARY)
  }
  addLineString(line) {
    const coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates())
    if (coord.length < 2) {
      this._hasTooFewPoints = true
      this._invalidPoint = coord[0]
      return null
    }
    const e = new Edge(coord, new Label(this._argIndex, Location.INTERIOR))
    this._lineEdgeMap.put(line, e)
    this.insertEdge(e)
    Assert.isTrue(coord.length >= 2, 'found LineString with single point')
    this.insertBoundaryPoint(this._argIndex, coord[0])
    this.insertBoundaryPoint(this._argIndex, coord[coord.length - 1])
  }
  getInvalidPoint() {
    return this._invalidPoint
  }
  getBoundaryPoints() {
    const coll = this.getBoundaryNodes()
    const pts = new Array(coll.size()).fill(null)
    let i = 0
    for (let it = coll.iterator(); it.hasNext(); ) {
      const node = it.next()
      pts[i++] = node.getCoordinate().copy()
    }
    return pts
  }
  getBoundaryNodes() {
    if (this._boundaryNodes === null) this._boundaryNodes = this._nodes.getBoundaryNodes(this._argIndex)
    return this._boundaryNodes
  }
  addSelfIntersectionNode(argIndex, coord, loc) {
    if (this.isBoundaryNode(argIndex, coord)) return null
    if (loc === Location.BOUNDARY && this._useBoundaryDeterminationRule) this.insertBoundaryPoint(argIndex, coord); else this.insertPoint(argIndex, coord, loc)
  }
  addPolygonRing(lr, cwLeft, cwRight) {
    if (lr.isEmpty()) return null
    const coord = CoordinateArrays.removeRepeatedPoints(lr.getCoordinates())
    if (coord.length < 4) {
      this._hasTooFewPoints = true
      this._invalidPoint = coord[0]
      return null
    }
    let left = cwLeft
    let right = cwRight
    if (Orientation.isCCW(coord)) {
      left = cwRight
      right = cwLeft
    }
    const e = new Edge(coord, new Label(this._argIndex, Location.BOUNDARY, left, right))
    this._lineEdgeMap.put(lr, e)
    this.insertEdge(e)
    this.insertPoint(this._argIndex, coord[0], Location.BOUNDARY)
  }
  insertPoint(argIndex, coord, onLocation) {
    const n = this._nodes.addNode(coord)
    const lbl = n.getLabel()
    if (lbl === null) 
      n._label = new Label(argIndex, onLocation)
    else lbl.setLocation(argIndex, onLocation)
  }
  createEdgeSetIntersector() {
    return new SimpleMCSweepLineIntersector()
  }
  addSelfIntersectionNodes(argIndex) {
    for (let i = this._edges.iterator(); i.hasNext(); ) {
      const e = i.next()
      const eLoc = e.getLabel().getLocation(argIndex)
      for (let eiIt = e.eiList.iterator(); eiIt.hasNext(); ) {
        const ei = eiIt.next()
        this.addSelfIntersectionNode(argIndex, ei.coord, eLoc)
      }
    }
  }
  add() {
    if (arguments.length === 1 && arguments[0] instanceof Geometry) {
      const g = arguments[0]
      if (g.isEmpty()) return null
      if (g instanceof MultiPolygon) this._useBoundaryDeterminationRule = false
      if (g instanceof Polygon) this.addPolygon(g); else if (g instanceof LineString) this.addLineString(g); else if (g instanceof Point) this.addPoint(g); else if (g instanceof MultiPoint) this.addCollection(g); else if (g instanceof MultiLineString) this.addCollection(g); else if (g instanceof MultiPolygon) this.addCollection(g); else if (g instanceof GeometryCollection) this.addCollection(g); else throw new UnsupportedOperationException(g.getGeometryType())
    } else {
      return super.add.apply(this, arguments)
    }
  }
  addCollection(gc) {
    for (let i = 0; i < gc.getNumGeometries(); i++) {
      const g = gc.getGeometryN(i)
      this.add(g)
    }
  }
  locate(pt) {
    if (hasInterface(this._parentGeom, Polygonal) && this._parentGeom.getNumGeometries() > 50) {
      if (this._areaPtLocator === null) 
        this._areaPtLocator = new IndexedPointInAreaLocator(this._parentGeom)
      
      return this._areaPtLocator.locate(pt)
    }
    return this._ptLocator.locate(pt, this._parentGeom)
  }
  findEdge() {
    if (arguments.length === 1 && arguments[0] instanceof LineString) {
      const line = arguments[0]
      return this._lineEdgeMap.get(line)
    } else {
      return super.findEdge.apply(this, arguments)
    }
  }
}
