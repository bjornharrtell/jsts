import GeometryFactory from '../geom/GeometryFactory'
import NonEncroachingSplitPointFinder from './NonEncroachingSplitPointFinder'
import ConstraintVertex from './ConstraintVertex'
import Coordinate from '../geom/Coordinate'
import IncrementalDelaunayTriangulator from './IncrementalDelaunayTriangulator'
import QuadEdgeSubdivision from './quadedge/QuadEdgeSubdivision'
import Double from '../../../../java/lang/Double'
import LastFoundQuadEdgeLocator from './quadedge/LastFoundQuadEdgeLocator'
import Segment from './Segment'
import ConvexHull from '../algorithm/ConvexHull'
import KdTree from '../index/kdtree/KdTree'
import ArrayList from '../../../../java/util/ArrayList'
import ConstraintEnforcementException from './ConstraintEnforcementException'
import Envelope from '../geom/Envelope'
export default class ConformingDelaunayTriangulator {
  constructor() {
    ConformingDelaunayTriangulator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._initialVertices = null
    this._segVertices = null
    this._segments = new ArrayList()
    this._subdiv = null
    this._incDel = null
    this._convexHull = null
    this._splitFinder = new NonEncroachingSplitPointFinder()
    this._kdt = null
    this._vertexFactory = null
    this._computeAreaEnv = null
    this._splitPt = null
    this._tolerance = null
    const initialVertices = arguments[0], tolerance = arguments[1]
    this._initialVertices = new ArrayList(initialVertices)
    this._tolerance = tolerance
    this._kdt = new KdTree(tolerance)
  }
  static computeVertexEnvelope(vertices) {
    const env = new Envelope()
    for (let i = vertices.iterator(); i.hasNext(); ) {
      const v = i.next()
      env.expandToInclude(v.getCoordinate())
    }
    return env
  }
  getInitialVertices() {
    return this._initialVertices
  }
  getKDT() {
    return this._kdt
  }
  enforceConstraints() {
    this.addConstraintVertices()
    let count = 0
    let splits = 0
    do {
      splits = this.enforceGabriel(this._segments)
      count++
    } while (splits > 0 && count < ConformingDelaunayTriangulator.MAX_SPLIT_ITER)
    if (count === ConformingDelaunayTriangulator.MAX_SPLIT_ITER) 
      throw new ConstraintEnforcementException('Too many splitting iterations while enforcing constraints.  Last split point was at: ', this._splitPt)
    
  }
  insertSites(vertices) {
    for (let i = vertices.iterator(); i.hasNext(); ) {
      const v = i.next()
      this.insertSite(v)
    }
  }
  getVertexFactory() {
    return this._vertexFactory
  }
  getPointArray() {
    const pts = new Array(this._initialVertices.size() + this._segVertices.size()).fill(null)
    let index = 0
    for (let i = this._initialVertices.iterator(); i.hasNext(); ) {
      const v = i.next()
      pts[index++] = v.getCoordinate()
    }
    for (let i2 = this._segVertices.iterator(); i2.hasNext(); ) {
      const v = i2.next()
      pts[index++] = v.getCoordinate()
    }
    return pts
  }
  setConstraints(segments, segVertices) {
    this._segments = segments
    this._segVertices = segVertices
  }
  computeConvexHull() {
    const fact = new GeometryFactory()
    const coords = this.getPointArray()
    const hull = new ConvexHull(coords, fact)
    this._convexHull = hull.getConvexHull()
  }
  addConstraintVertices() {
    this.computeConvexHull()
    this.insertSites(this._segVertices)
  }
  findNonGabrielPoint(seg) {
    const p = seg.getStart()
    const q = seg.getEnd()
    const midPt = new Coordinate((p.x + q.x) / 2.0, (p.y + q.y) / 2.0)
    const segRadius = p.distance(midPt)
    const env = new Envelope(midPt)
    env.expandBy(segRadius)
    const result = this._kdt.query(env)
    let closestNonGabriel = null
    let minDist = Double.MAX_VALUE
    for (let i = result.iterator(); i.hasNext(); ) {
      const nextNode = i.next()
      const testPt = nextNode.getCoordinate()
      if (testPt.equals2D(p) || testPt.equals2D(q)) continue
      const testRadius = midPt.distance(testPt)
      if (testRadius < segRadius) {
        const testDist = testRadius
        if (closestNonGabriel === null || testDist < minDist) {
          closestNonGabriel = testPt
          minDist = testDist
        }
      }
    }
    return closestNonGabriel
  }
  getConstraintSegments() {
    return this._segments
  }
  setSplitPointFinder(splitFinder) {
    this._splitFinder = splitFinder
  }
  getConvexHull() {
    return this._convexHull
  }
  getTolerance() {
    return this._tolerance
  }
  enforceGabriel(segsToInsert) {
    const newSegments = new ArrayList()
    let splits = 0
    const segsToRemove = new ArrayList()
    for (let i = segsToInsert.iterator(); i.hasNext(); ) {
      const seg = i.next()
      const encroachPt = this.findNonGabrielPoint(seg)
      if (encroachPt === null) continue
      this._splitPt = this._splitFinder.findSplitPoint(seg, encroachPt)
      const splitVertex = this.createVertex(this._splitPt, seg)
      const insertedVertex = this.insertSite(splitVertex)
      if (!insertedVertex.getCoordinate().equals2D(this._splitPt)) {}
      const s1 = new Segment(seg.getStartX(), seg.getStartY(), seg.getStartZ(), splitVertex.getX(), splitVertex.getY(), splitVertex.getZ(), seg.getData())
      const s2 = new Segment(splitVertex.getX(), splitVertex.getY(), splitVertex.getZ(), seg.getEndX(), seg.getEndY(), seg.getEndZ(), seg.getData())
      newSegments.add(s1)
      newSegments.add(s2)
      segsToRemove.add(seg)
      splits = splits + 1
    }
    segsToInsert.removeAll(segsToRemove)
    segsToInsert.addAll(newSegments)
    return splits
  }
  createVertex() {
    if (arguments.length === 1) {
      const p = arguments[0]
      let v = null
      if (this._vertexFactory !== null) v = this._vertexFactory.createVertex(p, null); else v = new ConstraintVertex(p)
      return v
    } else if (arguments.length === 2) {
      const p = arguments[0], seg = arguments[1]
      let v = null
      if (this._vertexFactory !== null) v = this._vertexFactory.createVertex(p, seg); else v = new ConstraintVertex(p)
      v.setOnConstraint(true)
      return v
    }
  }
  getSubdivision() {
    return this._subdiv
  }
  computeBoundingBox() {
    const vertexEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this._initialVertices)
    const segEnv = ConformingDelaunayTriangulator.computeVertexEnvelope(this._segVertices)
    const allPointsEnv = new Envelope(vertexEnv)
    allPointsEnv.expandToInclude(segEnv)
    const deltaX = allPointsEnv.getWidth() * 0.2
    const deltaY = allPointsEnv.getHeight() * 0.2
    const delta = Math.max(deltaX, deltaY)
    this._computeAreaEnv = new Envelope(allPointsEnv)
    this._computeAreaEnv.expandBy(delta)
  }
  setVertexFactory(vertexFactory) {
    this._vertexFactory = vertexFactory
  }
  formInitialDelaunay() {
    this.computeBoundingBox()
    this._subdiv = new QuadEdgeSubdivision(this._computeAreaEnv, this._tolerance)
    this._subdiv.setLocator(new LastFoundQuadEdgeLocator(this._subdiv))
    this._incDel = new IncrementalDelaunayTriangulator(this._subdiv)
    this.insertSites(this._initialVertices)
  }
  insertSite() {
    if (arguments[0] instanceof ConstraintVertex) {
      const v = arguments[0]
      const kdnode = this._kdt.insert(v.getCoordinate(), v)
      if (!kdnode.isRepeated()) {
        this._incDel.insertSite(v)
      } else {
        const snappedV = kdnode.getData()
        snappedV.merge(v)
        return snappedV
      }
      return v
    } else if (arguments[0] instanceof Coordinate) {
      const p = arguments[0]
      this.insertSite(this.createVertex(p))
    }
  }
}
ConformingDelaunayTriangulator.MAX_SPLIT_ITER = 99
