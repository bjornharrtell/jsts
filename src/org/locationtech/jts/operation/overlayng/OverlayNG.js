import IntersectionPointBuilder from './IntersectionPointBuilder.js'
import OverlayMixedPoints from './OverlayMixedPoints.js'
import Location from '../../geom/Location.js'
import OverlayPoints from './OverlayPoints.js'
import Geometry from '../../geom/Geometry.js'
import PolygonBuilder from './PolygonBuilder.js'
import hasInterface from '../../../../../hasInterface.js'
import Noder from '../../noding/Noder.js'
import OverlayLabeller from './OverlayLabeller.js'
import LineBuilder from './LineBuilder.js'
import TopologyException from '../../geom/TopologyException.js'
import ElevationModel from './ElevationModel.js'
import EdgeNodingBuilder from './EdgeNodingBuilder.js'
import OverlayUtil from './OverlayUtil.js'
import PrecisionModel from '../../geom/PrecisionModel.js'
import OverlayGraph from './OverlayGraph.js'
import OverlayOp from '../overlay/OverlayOp.js'
import InputGeometry from './InputGeometry.js'
export default class OverlayNG {
  constructor() {
    OverlayNG.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._opCode = null
    this._inputGeom = null
    this._geomFact = null
    this._pm = null
    this._noder = null
    this._isStrictMode = OverlayNG.STRICT_MODE_DEFAULT
    this._isOptimized = true
    this._isAreaResultOnly = false
    this._isOutputEdges = false
    this._isOutputResultEdges = false
    this._isOutputNodedEdges = false
    if (arguments.length === 2) {
      const geom = arguments[0], pm = arguments[1]
      OverlayNG.constructor_.call(this, geom, null, pm, OverlayNG.UNION)
    } else if (arguments.length === 3) {
      const geom0 = arguments[0], geom1 = arguments[1], opCode = arguments[2]
      OverlayNG.constructor_.call(this, geom0, geom1, geom0.getFactory().getPrecisionModel(), opCode)
    } else if (arguments.length === 4) {
      const geom0 = arguments[0], geom1 = arguments[1], pm = arguments[2], opCode = arguments[3]
      this._pm = pm
      this._opCode = opCode
      this._geomFact = geom0.getFactory()
      this._inputGeom = new InputGeometry(geom0, geom1)
    }
  }
  static union() {
    if (arguments.length === 2) {
      const geom = arguments[0], pm = arguments[1]
      const ov = new OverlayNG(geom, pm)
      const geomOv = ov.getResult()
      return geomOv
    } else if (arguments.length === 3) {
      const geom = arguments[0], pm = arguments[1], noder = arguments[2]
      const ov = new OverlayNG(geom, pm)
      ov.setNoder(noder)
      ov.setStrictMode(true)
      const geomOv = ov.getResult()
      return geomOv
    }
  }
  static overlay() {
    if (arguments.length === 3) {
      const geom0 = arguments[0], geom1 = arguments[1], opCode = arguments[2]
      const ov = new OverlayNG(geom0, geom1, opCode)
      return ov.getResult()
    } else if (arguments.length === 4) {
      if (hasInterface(arguments[3], Noder) && (Number.isInteger(arguments[2]) && (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry))) {
        const geom0 = arguments[0], geom1 = arguments[1], opCode = arguments[2], noder = arguments[3]
        const ov = new OverlayNG(geom0, geom1, null, opCode)
        ov.setNoder(noder)
        const geomOv = ov.getResult()
        return geomOv
      } else if (arguments[3] instanceof PrecisionModel && (Number.isInteger(arguments[2]) && (arguments[0] instanceof Geometry && arguments[1] instanceof Geometry))) {
        const geom0 = arguments[0], geom1 = arguments[1], opCode = arguments[2], pm = arguments[3]
        const ov = new OverlayNG(geom0, geom1, pm, opCode)
        const geomOv = ov.getResult()
        return geomOv
      }
    } else if (arguments.length === 5) {
      const geom0 = arguments[0], geom1 = arguments[1], opCode = arguments[2], pm = arguments[3], noder = arguments[4]
      const ov = new OverlayNG(geom0, geom1, pm, opCode)
      ov.setNoder(noder)
      const geomOv = ov.getResult()
      return geomOv
    }
  }
  static isResultOfOpPoint(label, opCode) {
    const loc0 = label.getLocation(0)
    const loc1 = label.getLocation(1)
    return OverlayNG.isResultOfOp(opCode, loc0, loc1)
  }
  static isEmpty(list) {
    return list === null || list.size() === 0
  }
  static isResultOfOp(overlayOpCode, loc0, loc1) {
    if (loc0 === Location.BOUNDARY) loc0 = Location.INTERIOR
    if (loc1 === Location.BOUNDARY) loc1 = Location.INTERIOR
    switch (overlayOpCode) {
    case OverlayNG.INTERSECTION:
      return loc0 === Location.INTERIOR && loc1 === Location.INTERIOR
    case OverlayNG.UNION:
      return loc0 === Location.INTERIOR || loc1 === Location.INTERIOR
    case OverlayNG.DIFFERENCE:
      return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR
    case OverlayNG.SYMDIFFERENCE:
      return loc0 === Location.INTERIOR && loc1 !== Location.INTERIOR || loc0 !== Location.INTERIOR && loc1 === Location.INTERIOR
    }
    return false
  }
  setOutputResultEdges(isOutputResultEdges) {
    this._isOutputResultEdges = isOutputResultEdges
  }
  getResult() {
    if (OverlayUtil.isEmptyResult(this._opCode, this._inputGeom.getGeometry(0), this._inputGeom.getGeometry(1), this._pm)) 
      return this.createEmptyResult()
    
    const elevModel = ElevationModel.create(this._inputGeom.getGeometry(0), this._inputGeom.getGeometry(1))
    let result = null
    if (this._inputGeom.isAllPoints()) 
      result = OverlayPoints.overlay(this._opCode, this._inputGeom.getGeometry(0), this._inputGeom.getGeometry(1), this._pm)
    else if (!this._inputGeom.isSingle() && this._inputGeom.hasPoints()) 
      result = OverlayMixedPoints.overlay(this._opCode, this._inputGeom.getGeometry(0), this._inputGeom.getGeometry(1), this._pm)
    else 
      result = this.computeEdgeOverlay()
    
    elevModel.populateZ(result)
    return result
  }
  nodeEdges() {
    const nodingBuilder = new EdgeNodingBuilder(this._pm, this._noder)
    if (this._isOptimized) {
      const clipEnv = OverlayUtil.clippingEnvelope(this._opCode, this._inputGeom, this._pm)
      if (clipEnv !== null) nodingBuilder.setClipEnvelope(clipEnv)
    }
    const mergedEdges = nodingBuilder.build(this._inputGeom.getGeometry(0), this._inputGeom.getGeometry(1))
    this._inputGeom.setCollapsed(0, !nodingBuilder.hasEdgesFor(0))
    this._inputGeom.setCollapsed(1, !nodingBuilder.hasEdgesFor(1))
    return mergedEdges
  }
  setOutputNodedEdges(isOutputNodedEdges) {
    this._isOutputEdges = true
    this._isOutputNodedEdges = isOutputNodedEdges
  }
  buildGraph(edges) {
    const graph = new OverlayGraph()
    for (const e of edges) 
      graph.addEdge(e.getCoordinates(), e.createLabel())
    
    return graph
  }
  setAreaResultOnly(isAreaResultOnly) {
    this._isAreaResultOnly = isAreaResultOnly
  }
  setOptimized(isOptimized) {
    this._isOptimized = isOptimized
  }
  extractResult(opCode, graph) {
    const isAllowMixedIntResult = !this._isStrictMode
    const resultAreaEdges = graph.getResultAreaEdges()
    const polyBuilder = new PolygonBuilder(resultAreaEdges, this._geomFact)
    const resultPolyList = polyBuilder.getPolygons()
    const hasResultAreaComponents = resultPolyList.size() > 0
    let resultLineList = null
    let resultPointList = null
    if (!this._isAreaResultOnly) {
      const allowResultLines = !hasResultAreaComponents || isAllowMixedIntResult || opCode === OverlayNG.SYMDIFFERENCE || opCode === OverlayNG.UNION
      if (allowResultLines) {
        const lineBuilder = new LineBuilder(this._inputGeom, graph, hasResultAreaComponents, opCode, this._geomFact)
        lineBuilder.setStrictMode(this._isStrictMode)
        resultLineList = lineBuilder.getLines()
      }
      const hasResultComponents = hasResultAreaComponents || resultLineList.size() > 0
      const allowResultPoints = !hasResultComponents || isAllowMixedIntResult
      if (opCode === OverlayNG.INTERSECTION && allowResultPoints) {
        const pointBuilder = new IntersectionPointBuilder(graph, this._geomFact)
        pointBuilder.setStrictMode(this._isStrictMode)
        resultPointList = pointBuilder.getPoints()
      }
    }
    if (OverlayNG.isEmpty(resultPolyList) && OverlayNG.isEmpty(resultLineList) && OverlayNG.isEmpty(resultPointList)) return this.createEmptyResult()
    const resultGeom = OverlayUtil.createResultGeometry(resultPolyList, resultLineList, resultPointList, this._geomFact)
    return resultGeom
  }
  computeEdgeOverlay() {
    const edges = this.nodeEdges()
    const graph = this.buildGraph(edges)
    if (this._isOutputNodedEdges) 
      return OverlayUtil.toLines(graph, this._isOutputEdges, this._geomFact)
    
    this.labelGraph(graph)
    if (this._isOutputEdges || this._isOutputResultEdges) 
      return OverlayUtil.toLines(graph, this._isOutputEdges, this._geomFact)
    
    const result = this.extractResult(this._opCode, graph)
    if (OverlayUtil.isFloating(this._pm)) {
      const isAreaConsistent = OverlayUtil.isResultAreaConsistent(this._inputGeom.getGeometry(0), this._inputGeom.getGeometry(1), this._opCode, result)
      if (!isAreaConsistent) throw new TopologyException('Result area inconsistent with overlay operation')
    }
    return result
  }
  setOutputEdges(isOutputEdges) {
    this._isOutputEdges = isOutputEdges
  }
  createEmptyResult() {
    return OverlayUtil.createEmptyResult(OverlayUtil.resultDimension(this._opCode, this._inputGeom.getDimension(0), this._inputGeom.getDimension(1)), this._geomFact)
  }
  setNoder(noder) {
    this._noder = noder
  }
  setStrictMode(isStrictMode) {
    this._isStrictMode = isStrictMode
  }
  labelGraph(graph) {
    const labeller = new OverlayLabeller(graph, this._inputGeom)
    labeller.computeLabelling()
    labeller.markResultAreaEdges(this._opCode)
    labeller.unmarkDuplicateEdgesFromResultArea()
  }
}
OverlayNG.INTERSECTION = OverlayOp.INTERSECTION
OverlayNG.UNION = OverlayOp.UNION
OverlayNG.DIFFERENCE = OverlayOp.DIFFERENCE
OverlayNG.SYMDIFFERENCE = OverlayOp.SYMDIFFERENCE
OverlayNG.STRICT_MODE_DEFAULT = false
