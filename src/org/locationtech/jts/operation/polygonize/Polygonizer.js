import LineString from '../../geom/LineString'
import Geometry from '../../geom/Geometry'
import PolygonizeGraph from './PolygonizeGraph'
import hasInterface from '../../../../../hasInterface'
import GeometryFactory from '../../geom/GeometryFactory'
import Collection from '../../../../../java/util/Collection'
import Collections from '../../../../../java/util/Collections'
import EdgeRing from './EdgeRing'
import GeometryComponentFilter from '../../geom/GeometryComponentFilter'
import ArrayList from '../../../../../java/util/ArrayList'
import HoleAssigner from './HoleAssigner'
export default class Polygonizer {
  constructor() {
    Polygonizer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._lineStringAdder = new LineStringAdder(this)
    this._graph = null
    this._dangles = new ArrayList()
    this._cutEdges = new ArrayList()
    this._invalidRingLines = new ArrayList()
    this._holeList = null
    this._shellList = null
    this._polyList = null
    this._isCheckingRingsValid = true
    this._extractOnlyPolygonal = null
    this._geomFactory = null
    if (arguments.length === 0) {
      Polygonizer.constructor_.call(this, false)
    } else if (arguments.length === 1) {
      const extractOnlyPolygonal = arguments[0]
      this._extractOnlyPolygonal = extractOnlyPolygonal
    }
  }
  static extractPolygons(shellList, includeAll) {
    const polyList = new ArrayList()
    for (let i = shellList.iterator(); i.hasNext(); ) {
      const er = i.next()
      if (includeAll || er.isIncluded()) 
        polyList.add(er.getPolygon())
      
    }
    return polyList
  }
  static findOuterShells(shellList) {
    for (let i = shellList.iterator(); i.hasNext(); ) {
      const er = i.next()
      const outerHoleER = er.getOuterHole()
      if (outerHoleER !== null && !outerHoleER.isProcessed()) {
        er.setIncluded(true)
        outerHoleER.setProcessed(true)
      }
    }
  }
  static findDisjointShells(shellList) {
    Polygonizer.findOuterShells(shellList)
    let isMoreToScan = null
    do {
      isMoreToScan = false
      for (let i = shellList.iterator(); i.hasNext(); ) {
        const er = i.next()
        if (er.isIncludedSet()) continue
        er.updateIncluded()
        if (!er.isIncludedSet()) 
          isMoreToScan = true
        
      }
    } while (isMoreToScan)
  }
  getGeometry() {
    if (this._geomFactory === null) this._geomFactory = new GeometryFactory()
    this.polygonize()
    if (this._extractOnlyPolygonal) 
      return this._geomFactory.buildGeometry(this._polyList)
    
    return this._geomFactory.createGeometryCollection(GeometryFactory.toGeometryArray(this._polyList))
  }
  getInvalidRingLines() {
    this.polygonize()
    return this._invalidRingLines
  }
  findValidRings(edgeRingList, validEdgeRingList, invalidRingList) {
    for (let i = edgeRingList.iterator(); i.hasNext(); ) {
      const er = i.next()
      if (er.isValid()) validEdgeRingList.add(er); else invalidRingList.add(er.getLineString())
    }
  }
  polygonize() {
    if (this._polyList !== null) return null
    this._polyList = new ArrayList()
    if (this._graph === null) return null
    this._dangles = this._graph.deleteDangles()
    this._cutEdges = this._graph.deleteCutEdges()
    const edgeRingList = this._graph.getEdgeRings()
    let validEdgeRingList = new ArrayList()
    this._invalidRingLines = new ArrayList()
    if (this._isCheckingRingsValid) 
      this.findValidRings(edgeRingList, validEdgeRingList, this._invalidRingLines)
    else 
      validEdgeRingList = edgeRingList
    
    this.findShellsAndHoles(validEdgeRingList)
    HoleAssigner.assignHolesToShells(this._holeList, this._shellList)
    Collections.sort(this._shellList, new EdgeRing.EnvelopeComparator())
    let includeAll = true
    if (this._extractOnlyPolygonal) {
      Polygonizer.findDisjointShells(this._shellList)
      includeAll = false
    }
    this._polyList = Polygonizer.extractPolygons(this._shellList, includeAll)
  }
  getDangles() {
    this.polygonize()
    return this._dangles
  }
  getCutEdges() {
    this.polygonize()
    return this._cutEdges
  }
  getPolygons() {
    this.polygonize()
    return this._polyList
  }
  add() {
    if (hasInterface(arguments[0], Collection)) {
      const geomList = arguments[0]
      for (let i = geomList.iterator(); i.hasNext(); ) {
        const geometry = i.next()
        this.add(geometry)
      }
    } else if (arguments[0] instanceof LineString) {
      const line = arguments[0]
      this._geomFactory = line.getFactory()
      if (this._graph === null) this._graph = new PolygonizeGraph(this._geomFactory)
      this._graph.addEdge(line)
    } else if (arguments[0] instanceof Geometry) {
      const g = arguments[0]
      g.apply(this._lineStringAdder)
    }
  }
  setCheckRingsValid(isCheckingRingsValid) {
    this._isCheckingRingsValid = isCheckingRingsValid
  }
  findShellsAndHoles(edgeRingList) {
    this._holeList = new ArrayList()
    this._shellList = new ArrayList()
    for (let i = edgeRingList.iterator(); i.hasNext(); ) {
      const er = i.next()
      er.computeHole()
      if (er.isHole()) this._holeList.add(er); else this._shellList.add(er)
    }
  }
}
class LineStringAdder {
  constructor() {
    LineStringAdder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.p = null
    const p = arguments[0]
    this.p = p
  }
  filter(g) {
    if (g instanceof LineString) this.p.add(g)
  }
  get interfaces_() {
    return [GeometryComponentFilter]
  }
}
Polygonizer.LineStringAdder = LineStringAdder
