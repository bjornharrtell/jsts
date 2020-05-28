import LineString from '../../geom/LineString'
import Geometry from '../../geom/Geometry'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import EdgeString from './EdgeString'
import LineMergeGraph from './LineMergeGraph'
import ArrayList from '../../../../../java/util/ArrayList'
import Assert from '../../util/Assert'
import GraphComponent from '../../planargraph/GraphComponent'
export default class LineMerger {
  constructor() {
    LineMerger.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._graph = new LineMergeGraph()
    this._mergedLineStrings = null
    this._factory = null
    this._edgeStrings = null
  }
  buildEdgeStringsForUnprocessedNodes() {
    for (let i = this._graph.getNodes().iterator(); i.hasNext(); ) {
      const node = i.next()
      if (!node.isMarked()) {
        Assert.isTrue(node.getDegree() === 2)
        this.buildEdgeStringsStartingAt(node)
        node.setMarked(true)
      }
    }
  }
  buildEdgeStringsForNonDegree2Nodes() {
    for (let i = this._graph.getNodes().iterator(); i.hasNext(); ) {
      const node = i.next()
      if (node.getDegree() !== 2) {
        this.buildEdgeStringsStartingAt(node)
        node.setMarked(true)
      }
    }
  }
  buildEdgeStringsForObviousStartNodes() {
    this.buildEdgeStringsForNonDegree2Nodes()
  }
  getMergedLineStrings() {
    this.merge()
    return this._mergedLineStrings
  }
  buildEdgeStringsStartingAt(node) {
    for (let i = node.getOutEdges().iterator(); i.hasNext(); ) {
      const directedEdge = i.next()
      if (directedEdge.getEdge().isMarked()) 
        continue
      
      this._edgeStrings.add(this.buildEdgeStringStartingWith(directedEdge))
    }
  }
  merge() {
    if (this._mergedLineStrings !== null) 
      return null
    
    GraphComponent.setMarked(this._graph.nodeIterator(), false)
    GraphComponent.setMarked(this._graph.edgeIterator(), false)
    this._edgeStrings = new ArrayList()
    this.buildEdgeStringsForObviousStartNodes()
    this.buildEdgeStringsForIsolatedLoops()
    this._mergedLineStrings = new ArrayList()
    for (let i = this._edgeStrings.iterator(); i.hasNext(); ) {
      const edgeString = i.next()
      this._mergedLineStrings.add(edgeString.toLineString())
    }
  }
  addLineString(lineString) {
    if (this._factory === null) 
      this._factory = lineString.getFactory()
    
    this._graph.addEdge(lineString)
  }
  buildEdgeStringStartingWith(start) {
    const edgeString = new EdgeString(this._factory)
    let current = start
    do {
      edgeString.add(current)
      current.getEdge().setMarked(true)
      current = current.getNext()
    } while (current !== null && current !== start)
    return edgeString
  }
  add() {
    if (arguments[0] instanceof Geometry) {
      const geometry = arguments[0]
      for (let i = 0; i < geometry.getNumGeometries(); i++) {
        const component = geometry.getGeometryN(i)
        if (component instanceof LineString) 
          this.addLineString(component)
        
      }
      
    } else if (hasInterface(arguments[0], Collection)) {
      const geometries = arguments[0]
      this._mergedLineStrings = null
      for (let i = geometries.iterator(); i.hasNext(); ) {
        const geometry = i.next()
        this.add(geometry)
      }
    }
  }
  buildEdgeStringsForIsolatedLoops() {
    this.buildEdgeStringsForUnprocessedNodes()
  }
}
