import Location from '../../geom/Location'
import BufferSubgraph from './BufferSubgraph'
import PolygonBuilder from '../overlay/PolygonBuilder'
import GeometryFactory from '../../geom/GeometryFactory'
import Position from '../../geomgraph/Position'
import MCIndexNoder from '../../noding/MCIndexNoder'
import OffsetCurveBuilder from './OffsetCurveBuilder'
import Collections from '../../../../../java/util/Collections'
import SubgraphDepthLocater from './SubgraphDepthLocater'
import OffsetCurveSetBuilder from './OffsetCurveSetBuilder'
import Label from '../../geomgraph/Label'
import OverlayNodeFactory from '../overlay/OverlayNodeFactory'
import EdgeList from '../../geomgraph/EdgeList'
import ArrayList from '../../../../../java/util/ArrayList'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector'
import IntersectionAdder from '../../noding/IntersectionAdder'
import Edge from '../../geomgraph/Edge'
import PlanarGraph from '../../geomgraph/PlanarGraph'
export default class BufferBuilder {
  constructor() {
    BufferBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._bufParams = null
    this._workingPrecisionModel = null
    this._workingNoder = null
    this._geomFact = null
    this._graph = null
    this._edgeList = new EdgeList()
    const bufParams = arguments[0]
    this._bufParams = bufParams
  }
  static depthDelta(label) {
    const lLoc = label.getLocation(0, Position.LEFT)
    const rLoc = label.getLocation(0, Position.RIGHT)
    if (lLoc === Location.INTERIOR && rLoc === Location.EXTERIOR) return 1; else if (lLoc === Location.EXTERIOR && rLoc === Location.INTERIOR) return -1
    return 0
  }
  static convertSegStrings(it) {
    const fact = new GeometryFactory()
    const lines = new ArrayList()
    while (it.hasNext()) {
      const ss = it.next()
      const line = fact.createLineString(ss.getCoordinates())
      lines.add(line)
    }
    return fact.buildGeometry(lines)
  }
  setWorkingPrecisionModel(pm) {
    this._workingPrecisionModel = pm
  }
  insertUniqueEdge(e) {
    const existingEdge = this._edgeList.findEqualEdge(e)
    if (existingEdge !== null) {
      const existingLabel = existingEdge.getLabel()
      let labelToMerge = e.getLabel()
      if (!existingEdge.isPointwiseEqual(e)) {
        labelToMerge = new Label(e.getLabel())
        labelToMerge.flip()
      }
      existingLabel.merge(labelToMerge)
      const mergeDelta = BufferBuilder.depthDelta(labelToMerge)
      const existingDelta = existingEdge.getDepthDelta()
      const newDelta = existingDelta + mergeDelta
      existingEdge.setDepthDelta(newDelta)
    } else {
      this._edgeList.add(e)
      e.setDepthDelta(BufferBuilder.depthDelta(e.getLabel()))
    }
  }
  buildSubgraphs(subgraphList, polyBuilder) {
    const processedGraphs = new ArrayList()
    for (let i = subgraphList.iterator(); i.hasNext(); ) {
      const subgraph = i.next()
      const p = subgraph.getRightmostCoordinate()
      const locater = new SubgraphDepthLocater(processedGraphs)
      const outsideDepth = locater.getDepth(p)
      subgraph.computeDepth(outsideDepth)
      subgraph.findResultEdges()
      processedGraphs.add(subgraph)
      polyBuilder.add(subgraph.getDirectedEdges(), subgraph.getNodes())
    }
  }
  createSubgraphs(graph) {
    const subgraphList = new ArrayList()
    for (let i = graph.getNodes().iterator(); i.hasNext(); ) {
      const node = i.next()
      if (!node.isVisited()) {
        const subgraph = new BufferSubgraph()
        subgraph.create(node)
        subgraphList.add(subgraph)
      }
    }
    Collections.sort(subgraphList, Collections.reverseOrder())
    return subgraphList
  }
  createEmptyResultGeometry() {
    const emptyGeom = this._geomFact.createPolygon()
    return emptyGeom
  }
  getNoder(precisionModel) {
    if (this._workingNoder !== null) return this._workingNoder
    const noder = new MCIndexNoder()
    const li = new RobustLineIntersector()
    li.setPrecisionModel(precisionModel)
    noder.setSegmentIntersector(new IntersectionAdder(li))
    return noder
  }
  buffer(g, distance) {
    let precisionModel = this._workingPrecisionModel
    if (precisionModel === null) precisionModel = g.getPrecisionModel()
    this._geomFact = g.getFactory()
    const curveBuilder = new OffsetCurveBuilder(precisionModel, this._bufParams)
    const curveSetBuilder = new OffsetCurveSetBuilder(g, distance, curveBuilder)
    const bufferSegStrList = curveSetBuilder.getCurves()
    if (bufferSegStrList.size() <= 0) 
      return this.createEmptyResultGeometry()
    
    this.computeNodedEdges(bufferSegStrList, precisionModel)
    this._graph = new PlanarGraph(new OverlayNodeFactory())
    this._graph.addEdges(this._edgeList.getEdges())
    const subgraphList = this.createSubgraphs(this._graph)
    const polyBuilder = new PolygonBuilder(this._geomFact)
    this.buildSubgraphs(subgraphList, polyBuilder)
    const resultPolyList = polyBuilder.getPolygons()
    if (resultPolyList.size() <= 0) 
      return this.createEmptyResultGeometry()
    
    const resultGeom = this._geomFact.buildGeometry(resultPolyList)
    return resultGeom
  }
  computeNodedEdges(bufferSegStrList, precisionModel) {
    const noder = this.getNoder(precisionModel)
    noder.computeNodes(bufferSegStrList)
    const nodedSegStrings = noder.getNodedSubstrings()
    for (let i = nodedSegStrings.iterator(); i.hasNext(); ) {
      const segStr = i.next()
      const pts = segStr.getCoordinates()
      if (pts.length === 2 && pts[0].equals2D(pts[1])) continue
      const oldLabel = segStr.getData()
      const edge = new Edge(segStr.getCoordinates(), new Label(oldLabel))
      this.insertUniqueEdge(edge)
    }
  }
  setNoder(noder) {
    this._workingNoder = noder
  }
}
