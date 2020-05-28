import QuadEdge from './QuadEdge'
import Arrays from '../../../../../java/util/Arrays'
import GeometryFactory from '../../geom/GeometryFactory'
import Coordinate from '../../geom/Coordinate'
import PointLocation from '../../algorithm/PointLocation'
import Vertex from './Vertex'
import ArrayList from '../../../../../java/util/ArrayList'
import TriangleVisitor from './TriangleVisitor'
export default class QuadEdgeTriangle {
  constructor() {
    QuadEdgeTriangle.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edge = null
    this._data = null
    const edge = arguments[0]
    this._edge = Arrays.copyOf(edge, edge.length)
    for (let i = 0; i < 3; i++) 
      edge[i].setData(this)
    
  }
  static toPolygon() {
    if (arguments[0] instanceof Array) {
      const v = arguments[0]
      const ringPts = [v[0].getCoordinate(), v[1].getCoordinate(), v[2].getCoordinate(), v[0].getCoordinate()]
      const fact = new GeometryFactory()
      const ring = fact.createLinearRing(ringPts)
      const tri = fact.createPolygon(ring)
      return tri
    } else if (arguments[0] instanceof Array) {
      const e = arguments[0]
      const ringPts = [e[0].orig().getCoordinate(), e[1].orig().getCoordinate(), e[2].orig().getCoordinate(), e[0].orig().getCoordinate()]
      const fact = new GeometryFactory()
      const ring = fact.createLinearRing(ringPts)
      const tri = fact.createPolygon(ring)
      return tri
    }
  }
  static nextIndex(index) {
    return index = (index + 1) % 3
  }
  static contains() {
    if (arguments[0] instanceof Array && arguments[1] instanceof Coordinate) {
      const tri = arguments[0], pt = arguments[1]
      const ring = [tri[0].getCoordinate(), tri[1].getCoordinate(), tri[2].getCoordinate(), tri[0].getCoordinate()]
      return PointLocation.isInRing(pt, ring)
    } else if (arguments[0] instanceof Array && arguments[1] instanceof Coordinate) {
      const tri = arguments[0], pt = arguments[1]
      const ring = [tri[0].orig().getCoordinate(), tri[1].orig().getCoordinate(), tri[2].orig().getCoordinate(), tri[0].orig().getCoordinate()]
      return PointLocation.isInRing(pt, ring)
    }
  }
  static createOn(subdiv) {
    const visitor = new QuadEdgeTriangleBuilderVisitor()
    subdiv.visitTriangles(visitor, false)
    return visitor.getTriangles()
  }
  getCoordinates() {
    const pts = new Array(4).fill(null)
    for (let i = 0; i < 3; i++) 
      pts[i] = this._edge[i].orig().getCoordinate()
    
    pts[3] = new Coordinate(pts[0])
    return pts
  }
  getVertex(i) {
    return this._edge[i].orig()
  }
  isBorder() {
    if (arguments.length === 0) {
      for (let i = 0; i < 3; i++) 
        if (this.getAdjacentTriangleAcrossEdge(i) === null) return true
      
      return false
    } else if (arguments.length === 1) {
      const i = arguments[0]
      return this.getAdjacentTriangleAcrossEdge(i) === null
    }
  }
  getEdgeIndex() {
    if (arguments[0] instanceof QuadEdge) {
      const e = arguments[0]
      for (let i = 0; i < 3; i++) 
        if (this._edge[i] === e) return i
      
      return -1
    } else if (arguments[0] instanceof Vertex) {
      const v = arguments[0]
      for (let i = 0; i < 3; i++) 
        if (this._edge[i].orig() === v) return i
      
      return -1
    }
  }
  getGeometry(fact) {
    const ring = fact.createLinearRing(this.getCoordinates())
    const tri = fact.createPolygon(ring)
    return tri
  }
  getCoordinate(i) {
    return this._edge[i].orig().getCoordinate()
  }
  getTrianglesAdjacentToVertex(vertexIndex) {
    const adjTris = new ArrayList()
    const start = this.getEdge(vertexIndex)
    let qe = start
    do {
      const adjTri = qe.getData()
      if (adjTri !== null) 
        adjTris.add(adjTri)
      
      qe = qe.oNext()
    } while (qe !== start)
    return adjTris
  }
  getNeighbours() {
    const neigh = new Array(3).fill(null)
    for (let i = 0; i < 3; i++) 
      neigh[i] = this.getEdge(i).sym().getData()
    
    return neigh
  }
  getAdjacentTriangleAcrossEdge(edgeIndex) {
    return this.getEdge(edgeIndex).sym().getData()
  }
  setData(data) {
    this._data = data
  }
  getData() {
    return this._data
  }
  getAdjacentTriangleEdgeIndex(i) {
    return this.getAdjacentTriangleAcrossEdge(i).getEdgeIndex(this.getEdge(i).sym())
  }
  getVertices() {
    const vert = new Array(3).fill(null)
    for (let i = 0; i < 3; i++) 
      vert[i] = this.getVertex(i)
    
    return vert
  }
  getEdges() {
    return this._edge
  }
  getEdge(i) {
    return this._edge[i]
  }
  toString() {
    return this.getGeometry(new GeometryFactory()).toString()
  }
  isLive() {
    return this._edge !== null
  }
  kill() {
    this._edge = null
  }
  contains(pt) {
    const ring = this.getCoordinates()
    return PointLocation.isInRing(pt, ring)
  }
  getEdgeSegment(i, seg) {
    seg.p0 = this._edge[i].orig().getCoordinate()
    const nexti = (i + 1) % 3
    seg.p1 = this._edge[nexti].orig().getCoordinate()
  }
}
class QuadEdgeTriangleBuilderVisitor {
  constructor() {
    QuadEdgeTriangleBuilderVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._triangles = new ArrayList()
  }
  visit(edges) {
    this._triangles.add(new QuadEdgeTriangle(edges))
  }
  getTriangles() {
    return this._triangles
  }
  get interfaces_() {
    return [TriangleVisitor]
  }
}
QuadEdgeTriangle.QuadEdgeTriangleBuilderVisitor = QuadEdgeTriangleBuilderVisitor
