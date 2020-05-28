import QuadEdge from './QuadEdge'
import CoordinateList from '../../geom/CoordinateList'
import HashSet from '../../../../../java/util/HashSet'
import WKTWriter from '../../io/WKTWriter'
import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import Stack from '../../../../../java/util/Stack'
import LastFoundQuadEdgeLocator from './LastFoundQuadEdgeLocator'
import LocateFailureException from './LocateFailureException'
import Vertex from './Vertex'
import System from '../../../../../java/lang/System'
import LineSegment from '../../geom/LineSegment'
import ArrayList from '../../../../../java/util/ArrayList'
import Envelope from '../../geom/Envelope'
import Triangle from '../../geom/Triangle'
import TriangleVisitor from './TriangleVisitor'
export default class QuadEdgeSubdivision {
  constructor() {
    QuadEdgeSubdivision.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._visitedKey = 0
    this._quadEdges = new ArrayList()
    this._startingEdge = null
    this._tolerance = null
    this._edgeCoincidenceTolerance = null
    this._frameVertex = new Array(3).fill(null)
    this._frameEnv = null
    this._locator = null
    this._seg = new LineSegment()
    this._triEdges = new Array(3).fill(null)
    const env = arguments[0], tolerance = arguments[1]
    this._tolerance = tolerance
    this._edgeCoincidenceTolerance = tolerance / QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR
    this.createFrame(env)
    this._startingEdge = this.initSubdiv()
    this._locator = new LastFoundQuadEdgeLocator(this)
  }
  static getTriangleEdges(startQE, triEdge) {
    triEdge[0] = startQE
    triEdge[1] = triEdge[0].lNext()
    triEdge[2] = triEdge[1].lNext()
    if (triEdge[2].lNext() !== triEdge[0]) throw new IllegalArgumentException('Edges do not form a triangle')
  }
  getTriangleVertices(includeFrame) {
    const visitor = new TriangleVertexListVisitor()
    this.visitTriangles(visitor, includeFrame)
    return visitor.getTriangleVertices()
  }
  isFrameVertex(v) {
    if (v.equals(this._frameVertex[0])) return true
    if (v.equals(this._frameVertex[1])) return true
    if (v.equals(this._frameVertex[2])) return true
    return false
  }
  isVertexOfEdge(e, v) {
    if (v.equals(e.orig(), this._tolerance) || v.equals(e.dest(), this._tolerance)) 
      return true
    
    return false
  }
  connect(a, b) {
    const q = QuadEdge.connect(a, b)
    this._quadEdges.add(q)
    return q
  }
  getVoronoiCellPolygon(qe, geomFact) {
    const cellPts = new ArrayList()
    const startQE = qe
    do {
      const cc = qe.rot().orig().getCoordinate()
      cellPts.add(cc)
      qe = qe.oPrev()
    } while (qe !== startQE)
    const coordList = new CoordinateList()
    coordList.addAll(cellPts, false)
    coordList.closeRing()
    if (coordList.size() < 4) {
      System.out.println(coordList)
      coordList.add(coordList.get(coordList.size() - 1), true)
    }
    const pts = coordList.toCoordinateArray()
    const cellPoly = geomFact.createPolygon(geomFact.createLinearRing(pts))
    const v = startQE.orig()
    cellPoly.setUserData(v.getCoordinate())
    return cellPoly
  }
  setLocator(locator) {
    this._locator = locator
  }
  initSubdiv() {
    const ea = this.makeEdge(this._frameVertex[0], this._frameVertex[1])
    const eb = this.makeEdge(this._frameVertex[1], this._frameVertex[2])
    QuadEdge.splice(ea.sym(), eb)
    const ec = this.makeEdge(this._frameVertex[2], this._frameVertex[0])
    QuadEdge.splice(eb.sym(), ec)
    QuadEdge.splice(ec.sym(), ea)
    return ea
  }
  isFrameBorderEdge(e) {
    const leftTri = new Array(3).fill(null)
    QuadEdgeSubdivision.getTriangleEdges(e, leftTri)
    const rightTri = new Array(3).fill(null)
    QuadEdgeSubdivision.getTriangleEdges(e.sym(), rightTri)
    const vLeftTriOther = e.lNext().dest()
    if (this.isFrameVertex(vLeftTriOther)) return true
    const vRightTriOther = e.sym().lNext().dest()
    if (this.isFrameVertex(vRightTriOther)) return true
    return false
  }
  makeEdge(o, d) {
    const q = QuadEdge.makeEdge(o, d)
    this._quadEdges.add(q)
    return q
  }
  visitTriangles(triVisitor, includeFrame) {
    this._visitedKey++
    const edgeStack = new Stack()
    edgeStack.push(this._startingEdge)
    const visitedEdges = new HashSet()
    while (!edgeStack.empty()) {
      const edge = edgeStack.pop()
      if (!visitedEdges.contains(edge)) {
        const triEdges = this.fetchTriangleToVisit(edge, edgeStack, includeFrame, visitedEdges)
        if (triEdges !== null) triVisitor.visit(triEdges)
      }
    }
  }
  isFrameEdge(e) {
    if (this.isFrameVertex(e.orig()) || this.isFrameVertex(e.dest())) return true
    return false
  }
  isOnEdge(e, p) {
    this._seg.setCoordinates(e.orig().getCoordinate(), e.dest().getCoordinate())
    const dist = this._seg.distance(p)
    return dist < this._edgeCoincidenceTolerance
  }
  getEnvelope() {
    return new Envelope(this._frameEnv)
  }
  createFrame(env) {
    const deltaX = env.getWidth()
    const deltaY = env.getHeight()
    let offset = 0.0
    if (deltaX > deltaY) 
      offset = deltaX * 10.0
    else 
      offset = deltaY * 10.0
    
    this._frameVertex[0] = new Vertex((env.getMaxX() + env.getMinX()) / 2.0, env.getMaxY() + offset)
    this._frameVertex[1] = new Vertex(env.getMinX() - offset, env.getMinY() - offset)
    this._frameVertex[2] = new Vertex(env.getMaxX() + offset, env.getMinY() - offset)
    this._frameEnv = new Envelope(this._frameVertex[0].getCoordinate(), this._frameVertex[1].getCoordinate())
    this._frameEnv.expandToInclude(this._frameVertex[2].getCoordinate())
  }
  getTriangleCoordinates(includeFrame) {
    const visitor = new TriangleCoordinatesVisitor()
    this.visitTriangles(visitor, includeFrame)
    return visitor.getTriangles()
  }
  getVertices(includeFrame) {
    const vertices = new HashSet()
    for (let i = this._quadEdges.iterator(); i.hasNext(); ) {
      const qe = i.next()
      const v = qe.orig()
      if (includeFrame || !this.isFrameVertex(v)) vertices.add(v)
      const vd = qe.dest()
      if (includeFrame || !this.isFrameVertex(vd)) vertices.add(vd)
    }
    return vertices
  }
  fetchTriangleToVisit(edge, edgeStack, includeFrame, visitedEdges) {
    let curr = edge
    let edgeCount = 0
    let isFrame = false
    do {
      this._triEdges[edgeCount] = curr
      if (this.isFrameEdge(curr)) isFrame = true
      const sym = curr.sym()
      if (!visitedEdges.contains(sym)) edgeStack.push(sym)
      visitedEdges.add(curr)
      edgeCount++
      curr = curr.lNext()
    } while (curr !== edge)
    if (isFrame && !includeFrame) return null
    return this._triEdges
  }
  getEdges() {
    if (arguments.length === 0) {
      return this._quadEdges
    } else if (arguments.length === 1) {
      const geomFact = arguments[0]
      const quadEdges = this.getPrimaryEdges(false)
      const edges = new Array(quadEdges.size()).fill(null)
      let i = 0
      for (let it = quadEdges.iterator(); it.hasNext(); ) {
        const qe = it.next()
        edges[i++] = geomFact.createLineString([qe.orig().getCoordinate(), qe.dest().getCoordinate()])
      }
      return geomFact.createMultiLineString(edges)
    }
  }
  getVertexUniqueEdges(includeFrame) {
    const edges = new ArrayList()
    const visitedVertices = new HashSet()
    for (let i = this._quadEdges.iterator(); i.hasNext(); ) {
      const qe = i.next()
      const v = qe.orig()
      if (!visitedVertices.contains(v)) {
        visitedVertices.add(v)
        if (includeFrame || !this.isFrameVertex(v)) 
          edges.add(qe)
        
      }
      const qd = qe.sym()
      const vd = qd.orig()
      if (!visitedVertices.contains(vd)) {
        visitedVertices.add(vd)
        if (includeFrame || !this.isFrameVertex(vd)) 
          edges.add(qd)
        
      }
    }
    return edges
  }
  getTriangleEdges(includeFrame) {
    const visitor = new TriangleEdgesListVisitor()
    this.visitTriangles(visitor, includeFrame)
    return visitor.getTriangleEdges()
  }
  getPrimaryEdges(includeFrame) {
    this._visitedKey++
    const edges = new ArrayList()
    const edgeStack = new Stack()
    edgeStack.push(this._startingEdge)
    const visitedEdges = new HashSet()
    while (!edgeStack.empty()) {
      const edge = edgeStack.pop()
      if (!visitedEdges.contains(edge)) {
        const priQE = edge.getPrimary()
        if (includeFrame || !this.isFrameEdge(priQE)) edges.add(priQE)
        edgeStack.push(edge.oNext())
        edgeStack.push(edge.sym().oNext())
        visitedEdges.add(edge)
        visitedEdges.add(edge.sym())
      }
    }
    return edges
  }
  delete(e) {
    QuadEdge.splice(e, e.oPrev())
    QuadEdge.splice(e.sym(), e.sym().oPrev())
    const eSym = e.sym()
    const eRot = e.rot()
    const eRotSym = e.rot().sym()
    this._quadEdges.remove(e)
    this._quadEdges.remove(eSym)
    this._quadEdges.remove(eRot)
    this._quadEdges.remove(eRotSym)
    e.delete()
    eSym.delete()
    eRot.delete()
    eRotSym.delete()
  }
  locateFromEdge(v, startEdge) {
    let iter = 0
    const maxIter = this._quadEdges.size()
    let e = startEdge
    while (true) {
      iter++
      if (iter > maxIter) 
        throw new LocateFailureException(e.toLineSegment())
      
      if (v.equals(e.orig()) || v.equals(e.dest())) 
        break
      else if (v.rightOf(e)) 
        e = e.sym()
      else if (!v.rightOf(e.oNext())) 
        e = e.oNext()
      else if (!v.rightOf(e.dPrev())) 
        e = e.dPrev()
      else 
        break
      
    }
    return e
  }
  getTolerance() {
    return this._tolerance
  }
  getVoronoiCellPolygons(geomFact) {
    this.visitTriangles(new TriangleCircumcentreVisitor(), true)
    const cells = new ArrayList()
    const edges = this.getVertexUniqueEdges(false)
    for (let i = edges.iterator(); i.hasNext(); ) {
      const qe = i.next()
      cells.add(this.getVoronoiCellPolygon(qe, geomFact))
    }
    return cells
  }
  getVoronoiDiagram(geomFact) {
    const vorCells = this.getVoronoiCellPolygons(geomFact)
    return geomFact.createGeometryCollection(GeometryFactory.toGeometryArray(vorCells))
  }
  getTriangles(geomFact) {
    const triPtsList = this.getTriangleCoordinates(false)
    const tris = new Array(triPtsList.size()).fill(null)
    let i = 0
    for (let it = triPtsList.iterator(); it.hasNext(); ) {
      const triPt = it.next()
      tris[i++] = geomFact.createPolygon(geomFact.createLinearRing(triPt))
    }
    return geomFact.createGeometryCollection(tris)
  }
  insertSite(v) {
    let e = this.locate(v)
    if (v.equals(e.orig(), this._tolerance) || v.equals(e.dest(), this._tolerance)) 
      return e
    
    let base = this.makeEdge(e.orig(), v)
    QuadEdge.splice(base, e)
    const startEdge = base
    do {
      base = this.connect(e, base.sym())
      e = base.oPrev()
    } while (e.lNext() !== startEdge)
    return startEdge
  }
  locate() {
    if (arguments.length === 1) {
      if (arguments[0] instanceof Vertex) {
        const v = arguments[0]
        return this._locator.locate(v)
      } else if (arguments[0] instanceof Coordinate) {
        const p = arguments[0]
        return this._locator.locate(new Vertex(p))
      }
    } else if (arguments.length === 2) {
      const p0 = arguments[0], p1 = arguments[1]
      const e = this._locator.locate(new Vertex(p0))
      if (e === null) return null
      let base = e
      if (e.dest().getCoordinate().equals2D(p0)) base = e.sym()
      let locEdge = base
      do {
        if (locEdge.dest().getCoordinate().equals2D(p1)) return locEdge
        locEdge = locEdge.oNext()
      } while (locEdge !== base)
      return null
    }
  }
}
class TriangleCircumcentreVisitor {
  visit(triEdges) {
    const a = triEdges[0].orig().getCoordinate()
    const b = triEdges[1].orig().getCoordinate()
    const c = triEdges[2].orig().getCoordinate()
    const cc = Triangle.circumcentreDD(a, b, c)
    const ccVertex = new Vertex(cc)
    for (let i = 0; i < 3; i++) 
      triEdges[i].rot().setOrig(ccVertex)
    
  }
  get interfaces_() {
    return [TriangleVisitor]
  }
}
class TriangleEdgesListVisitor {
  constructor() {
    TriangleEdgesListVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._triList = new ArrayList()
  }
  getTriangleEdges() {
    return this._triList
  }
  visit(triEdges) {
    this._triList.add(triEdges)
  }
  get interfaces_() {
    return [TriangleVisitor]
  }
}
class TriangleVertexListVisitor {
  constructor() {
    TriangleVertexListVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._triList = new ArrayList()
  }
  visit(triEdges) {
    this._triList.add([triEdges[0].orig(), triEdges[1].orig(), triEdges[2].orig()])
  }
  getTriangleVertices() {
    return this._triList
  }
  get interfaces_() {
    return [TriangleVisitor]
  }
}
class TriangleCoordinatesVisitor {
  constructor() {
    TriangleCoordinatesVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._coordList = new CoordinateList()
    this._triCoords = new ArrayList()
  }
  checkTriangleSize(pts) {
    let loc = ''
    if (pts.length >= 2) loc = WKTWriter.toLineString(pts[0], pts[1]); else 
    if (pts.length >= 1) loc = WKTWriter.toPoint(pts[0])
    
  }
  visit(triEdges) {
    this._coordList.clear()
    for (let i = 0; i < 3; i++) {
      const v = triEdges[i].orig()
      this._coordList.add(v.getCoordinate())
    }
    if (this._coordList.size() > 0) {
      this._coordList.closeRing()
      const pts = this._coordList.toCoordinateArray()
      if (pts.length !== 4) 
        return null
      
      this._triCoords.add(pts)
    }
  }
  getTriangles() {
    return this._triCoords
  }
  get interfaces_() {
    return [TriangleVisitor]
  }
}
QuadEdgeSubdivision.TriangleCircumcentreVisitor = TriangleCircumcentreVisitor
QuadEdgeSubdivision.TriangleEdgesListVisitor = TriangleEdgesListVisitor
QuadEdgeSubdivision.TriangleVertexListVisitor = TriangleVertexListVisitor
QuadEdgeSubdivision.TriangleCoordinatesVisitor = TriangleCoordinatesVisitor
QuadEdgeSubdivision.EDGE_COINCIDENCE_TOL_FACTOR = 1000
