import LineString from '../geom/LineString'
import CoordinateList from '../geom/CoordinateList'
import Geometry from '../geom/Geometry'
import hasInterface from '../../../../hasInterface'
import Collection from '../../../../java/util/Collection'
import Stack from '../../../../java/util/Stack'
import MarkHalfEdge from '../edgegraph/MarkHalfEdge'
import DissolveEdgeGraph from './DissolveEdgeGraph'
import GeometryComponentFilter from '../geom/GeometryComponentFilter'
import ArrayList from '../../../../java/util/ArrayList'
export default class LineDissolver {
  constructor() {
    LineDissolver.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._result = null
    this._factory = null
    this._graph = null
    this._lines = new ArrayList()
    this._nodeEdgeStack = new Stack()
    this._ringStartEdge = null
    this._graph = new DissolveEdgeGraph()
  }
  static dissolve(g) {
    const d = new LineDissolver()
    d.add(g)
    return d.getResult()
  }
  addLine(line) {
    this._lines.add(this._factory.createLineString(line.toCoordinateArray()))
  }
  updateRingStartEdge(e) {
    if (!e.isStart()) {
      e = e.sym()
      if (!e.isStart()) return null
    }
    if (this._ringStartEdge === null) {
      this._ringStartEdge = e
      return null
    }
    if (e.orig().compareTo(this._ringStartEdge.orig()) < 0) 
      this._ringStartEdge = e
    
  }
  getResult() {
    if (this._result === null) this.computeResult()
    return this._result
  }
  process(e) {
    let eNode = e.prevNode()
    if (eNode === null) eNode = e
    this.stackEdges(eNode)
    this.buildLines()
  }
  buildRing(eStartRing) {
    const line = new CoordinateList()
    let e = eStartRing
    line.add(e.orig().copy(), false)
    while (e.sym().degree() === 2) {
      const eNext = e.next()
      if (eNext === eStartRing) break
      line.add(eNext.orig().copy(), false)
      e = eNext
    }
    line.add(e.dest().copy(), false)
    this.addLine(line)
  }
  buildLine(eStart) {
    const line = new CoordinateList()
    let e = eStart
    this._ringStartEdge = null
    MarkHalfEdge.markBoth(e)
    line.add(e.orig().copy(), false)
    while (e.sym().degree() === 2) {
      this.updateRingStartEdge(e)
      const eNext = e.next()
      if (eNext === eStart) {
        this.buildRing(this._ringStartEdge)
        return null
      }
      line.add(eNext.orig().copy(), false)
      e = eNext
      MarkHalfEdge.markBoth(e)
    }
    line.add(e.dest().clone(), false)
    this.stackEdges(e.sym())
    this.addLine(line)
  }
  stackEdges(node) {
    let e = node
    do {
      if (!MarkHalfEdge.isMarked(e)) this._nodeEdgeStack.add(e)
      e = e.oNext()
    } while (e !== node)
  }
  computeResult() {
    const edges = this._graph.getVertexEdges()
    for (let i = edges.iterator(); i.hasNext(); ) {
      const e = i.next()
      if (MarkHalfEdge.isMarked(e)) continue
      this.process(e)
    }
    this._result = this._factory.buildGeometry(this._lines)
  }
  buildLines() {
    while (!this._nodeEdgeStack.empty()) {
      const e = this._nodeEdgeStack.pop()
      if (MarkHalfEdge.isMarked(e)) continue
      this.buildLine(e)
    }
  }
  add() {
    if (arguments[0] instanceof Geometry) {
      const geometry = arguments[0]
      geometry.apply(new (class {
        get interfaces_() {
          return [GeometryComponentFilter]
        }
        filter(component) {
          if (component instanceof LineString) 
            this.add(component)
          
        }
      })())
    } else if (hasInterface(arguments[0], Collection)) {
      const geometries = arguments[0]
      for (let i = geometries.iterator(); i.hasNext(); ) {
        const geometry = i.next()
        this.add(geometry)
      }
    } else if (arguments[0] instanceof LineString) {
      const lineString = arguments[0]
      if (this._factory === null) 
        this._factory = lineString.getFactory()
      
      const seq = lineString.getCoordinateSequence()
      let doneStart = false
      for (let i = 1; i < seq.size(); i++) {
        const e = this._graph.addEdge(seq.getCoordinate(i - 1), seq.getCoordinate(i))
        if (e === null) continue
        if (!doneStart) {
          e.setStart()
          doneStart = true
        }
      }
    }
  }
}
