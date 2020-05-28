import PointLocator from '../../algorithm/PointLocator'
import Location from '../../geom/Location'
import EdgeNodingValidator from '../../geomgraph/EdgeNodingValidator'
import GeometryCollectionMapper from '../../geom/util/GeometryCollectionMapper'
import PolygonBuilder from './PolygonBuilder'
import Position from '../../geomgraph/Position'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import LineBuilder from './LineBuilder'
import PointBuilder from './PointBuilder'
import SnapIfNeededOverlayOp from './snap/SnapIfNeededOverlayOp'
import Label from '../../geomgraph/Label'
import OverlayNodeFactory from './OverlayNodeFactory'
import GeometryGraphOperation from '../GeometryGraphOperation'
import EdgeList from '../../geomgraph/EdgeList'
import ArrayList from '../../../../../java/util/ArrayList'
import Assert from '../../util/Assert'
import PlanarGraph from '../../geomgraph/PlanarGraph'
export default class OverlayOp extends GeometryGraphOperation {
  constructor() {
    super()
    OverlayOp.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._ptLocator = new PointLocator()
    this._geomFact = null
    this._resultGeom = null
    this._graph = null
    this._edgeList = new EdgeList()
    this._resultPolyList = new ArrayList()
    this._resultLineList = new ArrayList()
    this._resultPointList = new ArrayList()
    const g0 = arguments[0], g1 = arguments[1]
    GeometryGraphOperation.constructor_.call(this, g0, g1)
    this._graph = new PlanarGraph(new OverlayNodeFactory())
    this._geomFact = g0.getFactory()
  }
  static overlayOp(geom0, geom1, opCode) {
    const gov = new OverlayOp(geom0, geom1)
    const geomOv = gov.getResultGeometry(opCode)
    return geomOv
  }
  static union(geom, other) {
    if (geom.isEmpty() || other.isEmpty()) {
      if (geom.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.UNION, geom, other, geom.getFactory())
      if (geom.isEmpty()) return other.copy()
      if (other.isEmpty()) return geom.copy()
    }
    if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException('This method does not support GeometryCollection arguments')
    return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.UNION)
  }
  static intersection(geom, other) {
    if (geom.isEmpty() || other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, geom, other, geom.getFactory())
    if (geom.isGeometryCollection()) {
      const g2 = other
      return GeometryCollectionMapper.map(geom, new (class {
        get interfaces_() {
          return [MapOp]
        }
        map(g) {
          return OverlayOp.intersection(g, g2)
        }
      })())
    }
    return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.INTERSECTION)
  }
  static symDifference(geom, other) {
    if (geom.isEmpty() || other.isEmpty()) {
      if (geom.isEmpty() && other.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, geom, other, geom.getFactory())
      if (geom.isEmpty()) return other.copy()
      if (other.isEmpty()) return geom.copy()
    }
    if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException('This method does not support GeometryCollection arguments')
    return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.SYMDIFFERENCE)
  }
  static resultDimension(opCode, g0, g1) {
    const dim0 = g0.getDimension()
    const dim1 = g1.getDimension()
    let resultDimension = -1
    switch (opCode) {
    case OverlayOp.INTERSECTION:
      resultDimension = Math.min(dim0, dim1)
      break
    case OverlayOp.UNION:
      resultDimension = Math.max(dim0, dim1)
      break
    case OverlayOp.DIFFERENCE:
      resultDimension = dim0
      break
    case OverlayOp.SYMDIFFERENCE:
      resultDimension = Math.max(dim0, dim1)
      break
    }
    return resultDimension
  }
  static createEmptyResult(overlayOpCode, a, b, geomFact) {
    let result = null
    const resultDim = OverlayOp.resultDimension(overlayOpCode, a, b)
    return result = geomFact.createEmpty(resultDim)
  }
  static difference(geom, other) {
    if (geom.isEmpty()) return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, geom, other, geom.getFactory())
    if (other.isEmpty()) return geom.copy()
    if (geom.isGeometryCollection() || other.isGeometryCollection()) throw new IllegalArgumentException('This method does not support GeometryCollection arguments')
    return SnapIfNeededOverlayOp.overlayOp(geom, other, OverlayOp.DIFFERENCE)
  }
  static isResultOfOp() {
    if (arguments.length === 2) {
      const label = arguments[0], opCode = arguments[1]
      const loc0 = label.getLocation(0)
      const loc1 = label.getLocation(1)
      return OverlayOp.isResultOfOp(loc0, loc1, opCode)
    } else if (arguments.length === 3) {
      let loc0 = arguments[0], loc1 = arguments[1], overlayOpCode = arguments[2]
      if (loc0 === Location.BOUNDARY) loc0 = Location.INTERIOR
      if (loc1 === Location.BOUNDARY) loc1 = Location.INTERIOR
      switch (overlayOpCode) {
      case OverlayOp.INTERSECTION:
        return loc0 === Location.INTERIOR && loc1 === Location.INTERIOR
      case OverlayOp.UNION:
        return loc0 === Location.INTERIOR || loc1 === Location.INTERIOR
      case OverlayOp.DIFFERENCE:
        return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR
      case OverlayOp.SYMDIFFERENCE:
        return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR || loc0 !== Location.INTERIOR && loc1 === Location.INTERIOR
      }
      return false
    }
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
      const depth = existingEdge.getDepth()
      if (depth.isNull()) 
        depth.add(existingLabel)
      
      depth.add(labelToMerge)
      existingLabel.merge(labelToMerge)
    } else {
      this._edgeList.add(e)
    }
  }
  getGraph() {
    return this._graph
  }
  cancelDuplicateResultEdges() {
    for (let it = this._graph.getEdgeEnds().iterator(); it.hasNext(); ) {
      const de = it.next()
      const sym = de.getSym()
      if (de.isInResult() && sym.isInResult()) {
        de.setInResult(false)
        sym.setInResult(false)
      }
    }
  }
  isCoveredByLA(coord) {
    if (this.isCovered(coord, this._resultLineList)) return true
    if (this.isCovered(coord, this._resultPolyList)) return true
    return false
  }
  computeGeometry(resultPointList, resultLineList, resultPolyList, opcode) {
    const geomList = new ArrayList()
    geomList.addAll(resultPointList)
    geomList.addAll(resultLineList)
    geomList.addAll(resultPolyList)
    if (geomList.isEmpty()) return OverlayOp.createEmptyResult(opcode, this._arg[0].getGeometry(), this._arg[1].getGeometry(), this._geomFact)
    return this._geomFact.buildGeometry(geomList)
  }
  mergeSymLabels() {
    for (let nodeit = this._graph.getNodes().iterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      node.getEdges().mergeSymLabels()
    }
  }
  isCovered(coord, geomList) {
    for (let it = geomList.iterator(); it.hasNext(); ) {
      const geom = it.next()
      const loc = this._ptLocator.locate(coord, geom)
      if (loc !== Location.EXTERIOR) return true
    }
    return false
  }
  replaceCollapsedEdges() {
    const newEdges = new ArrayList()
    for (let it = this._edgeList.iterator(); it.hasNext(); ) {
      const e = it.next()
      if (e.isCollapsed()) {
        it.remove()
        newEdges.add(e.getCollapsedEdge())
      }
    }
    this._edgeList.addAll(newEdges)
  }
  updateNodeLabelling() {
    for (let nodeit = this._graph.getNodes().iterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      const lbl = node.getEdges().getLabel()
      node.getLabel().merge(lbl)
    }
  }
  getResultGeometry(overlayOpCode) {
    this.computeOverlay(overlayOpCode)
    return this._resultGeom
  }
  insertUniqueEdges(edges) {
    for (let i = edges.iterator(); i.hasNext(); ) {
      const e = i.next()
      this.insertUniqueEdge(e)
    }
  }
  computeOverlay(opCode) {
    this.copyPoints(0)
    this.copyPoints(1)
    this._arg[0].computeSelfNodes(this._li, false)
    this._arg[1].computeSelfNodes(this._li, false)
    this._arg[0].computeEdgeIntersections(this._arg[1], this._li, true)
    const baseSplitEdges = new ArrayList()
    this._arg[0].computeSplitEdges(baseSplitEdges)
    this._arg[1].computeSplitEdges(baseSplitEdges)
    const splitEdges = baseSplitEdges
    this.insertUniqueEdges(baseSplitEdges)
    this.computeLabelsFromDepths()
    this.replaceCollapsedEdges()
    EdgeNodingValidator.checkValid(this._edgeList.getEdges())
    this._graph.addEdges(this._edgeList.getEdges())
    this.computeLabelling()
    this.labelIncompleteNodes()
    this.findResultAreaEdges(opCode)
    this.cancelDuplicateResultEdges()
    const polyBuilder = new PolygonBuilder(this._geomFact)
    polyBuilder.add(this._graph)
    this._resultPolyList = polyBuilder.getPolygons()
    const lineBuilder = new LineBuilder(this, this._geomFact, this._ptLocator)
    this._resultLineList = lineBuilder.build(opCode)
    const pointBuilder = new PointBuilder(this, this._geomFact, this._ptLocator)
    this._resultPointList = pointBuilder.build(opCode)
    this._resultGeom = this.computeGeometry(this._resultPointList, this._resultLineList, this._resultPolyList, opCode)
  }
  labelIncompleteNode(n, targetIndex) {
    const loc = this._ptLocator.locate(n.getCoordinate(), this._arg[targetIndex].getGeometry())
    n.getLabel().setLocation(targetIndex, loc)
  }
  copyPoints(argIndex) {
    for (let i = this._arg[argIndex].getNodeIterator(); i.hasNext(); ) {
      const graphNode = i.next()
      const newNode = this._graph.addNode(graphNode.getCoordinate())
      newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex))
    }
  }
  findResultAreaEdges(opCode) {
    for (let it = this._graph.getEdgeEnds().iterator(); it.hasNext(); ) {
      const de = it.next()
      const label = de.getLabel()
      if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) 
        de.setInResult(true)
      
    }
  }
  computeLabelsFromDepths() {
    for (let it = this._edgeList.iterator(); it.hasNext(); ) {
      const e = it.next()
      const lbl = e.getLabel()
      const depth = e.getDepth()
      if (!depth.isNull()) {
        depth.normalize()
        for (let i = 0; i < 2; i++) 
          if (!lbl.isNull(i) && lbl.isArea() && !depth.isNull(i)) 
            if (depth.getDelta(i) === 0) {
              lbl.toLine(i)
            } else {
              Assert.isTrue(!depth.isNull(i, Position.LEFT), 'depth of LEFT side has not been initialized')
              lbl.setLocation(i, Position.LEFT, depth.getLocation(i, Position.LEFT))
              Assert.isTrue(!depth.isNull(i, Position.RIGHT), 'depth of RIGHT side has not been initialized')
              lbl.setLocation(i, Position.RIGHT, depth.getLocation(i, Position.RIGHT))
            }
          
        
      }
    }
  }
  computeLabelling() {
    for (let nodeit = this._graph.getNodes().iterator(); nodeit.hasNext(); ) {
      const node = nodeit.next()
      node.getEdges().computeLabelling(this._arg)
    }
    this.mergeSymLabels()
    this.updateNodeLabelling()
  }
  labelIncompleteNodes() {
    for (let ni = this._graph.getNodes().iterator(); ni.hasNext(); ) {
      const n = ni.next()
      const label = n.getLabel()
      if (n.isIsolated()) 
        if (label.isNull(0)) this.labelIncompleteNode(n, 0); else this.labelIncompleteNode(n, 1)
      
      n.getEdges().updateLabelling(label)
    }
  }
  isCoveredByA(coord) {
    if (this.isCovered(coord, this._resultPolyList)) return true
    return false
  }
}
OverlayOp.INTERSECTION = 1
OverlayOp.UNION = 2
OverlayOp.DIFFERENCE = 3
OverlayOp.SYMDIFFERENCE = 4
