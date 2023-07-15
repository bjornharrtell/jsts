import TopologyException from '../../geom/TopologyException.js'
import MaximalEdgeRing from './MaximalEdgeRing.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
import Assert from '../../util/Assert.js'
export default class PolygonBuilder {
  constructor() {
    PolygonBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometryFactory = null
    this._shellList = new ArrayList()
    this._freeHoleList = new ArrayList()
    this._isEnforcePolygonal = true
    if (arguments.length === 2) {
      const resultAreaEdges = arguments[0], geomFact = arguments[1]
      PolygonBuilder.constructor_.call(this, resultAreaEdges, geomFact, true)
    } else if (arguments.length === 3) {
      const resultAreaEdges = arguments[0], geomFact = arguments[1], isEnforcePolygonal = arguments[2]
      this._geometryFactory = geomFact
      this._isEnforcePolygonal = isEnforcePolygonal
      this.buildRings(resultAreaEdges)
    }
  }
  static buildMaximalRings(edges) {
    const edgeRings = new ArrayList()
    for (const e of edges) 
      if (e.isInResultArea() && e.getLabel().isBoundaryEither()) 
        if (e.getEdgeRingMax() === null) {
          const er = new MaximalEdgeRing(e)
          edgeRings.add(er)
        }
      
    
    return edgeRings
  }
  static assignHoles(shell, edgeRings) {
    for (const er of edgeRings) 
      if (er.isHole()) 
        er.setShell(shell)
      
    
  }
  buildRings(resultAreaEdges) {
    this.linkResultAreaEdgesMax(resultAreaEdges)
    const maxRings = PolygonBuilder.buildMaximalRings(resultAreaEdges)
    this.buildMinimalRings(maxRings)
    this.placeFreeHoles(this._shellList, this._freeHoleList)
  }
  assignShellsAndHoles(minRings) {
    const shell = this.findSingleShell(minRings)
    if (shell !== null) {
      PolygonBuilder.assignHoles(shell, minRings)
      this._shellList.add(shell)
    } else {
      this._freeHoleList.addAll(minRings)
    }
  }
  buildMinimalRings(maxRings) {
    for (const erMax of maxRings) {
      const minRings = erMax.buildMinimalRings(this._geometryFactory)
      this.assignShellsAndHoles(minRings)
    }
  }
  computePolygons(shellList) {
    const resultPolyList = new ArrayList()
    for (const er of shellList) {
      const poly = er.toPolygon(this._geometryFactory)
      resultPolyList.add(poly)
    }
    return resultPolyList
  }
  findSingleShell(edgeRings) {
    let shellCount = 0
    let shell = null
    for (const er of edgeRings) 
      if (!er.isHole()) {
        shell = er
        shellCount++
      }
    
    Assert.isTrue(shellCount <= 1, 'found two shells in EdgeRing list')
    return shell
  }
  placeFreeHoles(shellList, freeHoleList) {
    for (const hole of freeHoleList) 
      if (hole.getShell() === null) {
        const shell = hole.findEdgeRingContaining(shellList)
        if (this._isEnforcePolygonal && shell === null) 
          throw new TopologyException('unable to assign free hole to a shell', hole.getCoordinate())
        
        hole.setShell(shell)
      }
    
  }
  getShellRings() {
    return this._shellList
  }
  getPolygons() {
    return this.computePolygons(this._shellList)
  }
  linkResultAreaEdgesMax(resultEdges) {
    for (const edge of resultEdges) 
      MaximalEdgeRing.linkResultAreaMaxRingAtNode(edge)
    
  }
}
