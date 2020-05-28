import PointLocation from '../../algorithm/PointLocation'
import TopologyException from '../../geom/TopologyException'
import MaximalEdgeRing from './MaximalEdgeRing'
import CoordinateArrays from '../../geom/CoordinateArrays'
import ArrayList from '../../../../../java/util/ArrayList'
import Assert from '../../util/Assert'
import PlanarGraph from '../../geomgraph/PlanarGraph'
export default class PolygonBuilder {
  constructor() {
    PolygonBuilder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._geometryFactory = null
    this._shellList = new ArrayList()
    const geometryFactory = arguments[0]
    this._geometryFactory = geometryFactory
  }
  static findEdgeRingContaining(testEr, shellList) {
    const testRing = testEr.getLinearRing()
    const testEnv = testRing.getEnvelopeInternal()
    let testPt = testRing.getCoordinateN(0)
    let minShell = null
    let minShellEnv = null
    for (let it = shellList.iterator(); it.hasNext(); ) {
      const tryShell = it.next()
      const tryShellRing = tryShell.getLinearRing()
      const tryShellEnv = tryShellRing.getEnvelopeInternal()
      if (tryShellEnv.equals(testEnv)) continue
      if (!tryShellEnv.contains(testEnv)) continue
      testPt = CoordinateArrays.ptNotInList(testRing.getCoordinates(), tryShellRing.getCoordinates())
      let isContained = false
      if (PointLocation.isInRing(testPt, tryShellRing.getCoordinates())) isContained = true
      if (isContained) 
        if (minShell === null || minShellEnv.contains(tryShellEnv)) {
          minShell = tryShell
          minShellEnv = minShell.getLinearRing().getEnvelopeInternal()
        }
      
    }
    return minShell
  }
  sortShellsAndHoles(edgeRings, shellList, freeHoleList) {
    for (let it = edgeRings.iterator(); it.hasNext(); ) {
      const er = it.next()
      if (er.isHole()) 
        freeHoleList.add(er)
      else 
        shellList.add(er)
      
    }
  }
  computePolygons(shellList) {
    const resultPolyList = new ArrayList()
    for (let it = shellList.iterator(); it.hasNext(); ) {
      const er = it.next()
      const poly = er.toPolygon(this._geometryFactory)
      resultPolyList.add(poly)
    }
    return resultPolyList
  }
  placeFreeHoles(shellList, freeHoleList) {
    for (let it = freeHoleList.iterator(); it.hasNext(); ) {
      const hole = it.next()
      if (hole.getShell() === null) {
        const shell = PolygonBuilder.findEdgeRingContaining(hole, shellList)
        if (shell === null) throw new TopologyException('unable to assign hole to a shell', hole.getCoordinate(0))
        hole.setShell(shell)
      }
    }
  }
  buildMinimalEdgeRings(maxEdgeRings, shellList, freeHoleList) {
    const edgeRings = new ArrayList()
    for (let it = maxEdgeRings.iterator(); it.hasNext(); ) {
      const er = it.next()
      if (er.getMaxNodeDegree() > 2) {
        er.linkDirectedEdgesForMinimalEdgeRings()
        const minEdgeRings = er.buildMinimalRings()
        const shell = this.findShell(minEdgeRings)
        if (shell !== null) {
          this.placePolygonHoles(shell, minEdgeRings)
          shellList.add(shell)
        } else {
          freeHoleList.addAll(minEdgeRings)
        }
      } else {
        edgeRings.add(er)
      }
    }
    return edgeRings
  }
  buildMaximalEdgeRings(dirEdges) {
    const maxEdgeRings = new ArrayList()
    for (let it = dirEdges.iterator(); it.hasNext(); ) {
      const de = it.next()
      if (de.isInResult() && de.getLabel().isArea()) 
        if (de.getEdgeRing() === null) {
          const er = new MaximalEdgeRing(de, this._geometryFactory)
          maxEdgeRings.add(er)
          er.setInResult()
        }
      
    }
    return maxEdgeRings
  }
  placePolygonHoles(shell, minEdgeRings) {
    for (let it = minEdgeRings.iterator(); it.hasNext(); ) {
      const er = it.next()
      if (er.isHole()) 
        er.setShell(shell)
      
    }
  }
  getPolygons() {
    const resultPolyList = this.computePolygons(this._shellList)
    return resultPolyList
  }
  findShell(minEdgeRings) {
    let shellCount = 0
    let shell = null
    for (let it = minEdgeRings.iterator(); it.hasNext(); ) {
      const er = it.next()
      if (!er.isHole()) {
        shell = er
        shellCount++
      }
    }
    Assert.isTrue(shellCount <= 1, 'found two shells in MinimalEdgeRing list')
    return shell
  }
  add() {
    if (arguments.length === 1) {
      const graph = arguments[0]
      this.add(graph.getEdgeEnds(), graph.getNodes())
    } else if (arguments.length === 2) {
      const dirEdges = arguments[0], nodes = arguments[1]
      PlanarGraph.linkResultDirectedEdges(nodes)
      const maxEdgeRings = this.buildMaximalEdgeRings(dirEdges)
      const freeHoleList = new ArrayList()
      const edgeRings = this.buildMinimalEdgeRings(maxEdgeRings, this._shellList, freeHoleList)
      this.sortShellsAndHoles(edgeRings, this._shellList, freeHoleList)
      this.placeFreeHoles(this._shellList, freeHoleList)
    }
  }
}
