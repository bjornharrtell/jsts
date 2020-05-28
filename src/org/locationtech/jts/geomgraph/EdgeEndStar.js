import StringBuffer from '../../../../java/lang/StringBuffer'
import Location from '../geom/Location'
import Position from './Position'
import TopologyException from '../geom/TopologyException'
import System from '../../../../java/lang/System'
import SimplePointInAreaLocator from '../algorithm/locate/SimplePointInAreaLocator'
import ArrayList from '../../../../java/util/ArrayList'
import Assert from '../util/Assert'
import TreeMap from '../../../../java/util/TreeMap'
export default class EdgeEndStar {
  constructor() {
    EdgeEndStar.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edgeMap = new TreeMap()
    this._edgeList = null
    this._ptInAreaLocation = [Location.NONE, Location.NONE]
  }
  getNextCW(ee) {
    this.getEdges()
    const i = this._edgeList.indexOf(ee)
    let iNextCW = i - 1
    if (i === 0) iNextCW = this._edgeList.size() - 1
    return this._edgeList.get(iNextCW)
  }
  propagateSideLabels(geomIndex) {
    let startLoc = Location.NONE
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      const label = e.getLabel()
      if (label.isArea(geomIndex) && label.getLocation(geomIndex, Position.LEFT) !== Location.NONE) startLoc = label.getLocation(geomIndex, Position.LEFT)
    }
    if (startLoc === Location.NONE) return null
    let currLoc = startLoc
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      const label = e.getLabel()
      if (label.getLocation(geomIndex, Position.ON) === Location.NONE) label.setLocation(geomIndex, Position.ON, currLoc)
      if (label.isArea(geomIndex)) {
        const leftLoc = label.getLocation(geomIndex, Position.LEFT)
        const rightLoc = label.getLocation(geomIndex, Position.RIGHT)
        if (rightLoc !== Location.NONE) {
          if (rightLoc !== currLoc) throw new TopologyException('side location conflict', e.getCoordinate())
          if (leftLoc === Location.NONE) 
            Assert.shouldNeverReachHere('found single null side (at ' + e.getCoordinate() + ')')
          
          currLoc = leftLoc
        } else {
          Assert.isTrue(label.getLocation(geomIndex, Position.LEFT) === Location.NONE, 'found single null side')
          label.setLocation(geomIndex, Position.RIGHT, currLoc)
          label.setLocation(geomIndex, Position.LEFT, currLoc)
        }
      }
    }
  }
  getCoordinate() {
    const it = this.iterator()
    if (!it.hasNext()) return null
    const e = it.next()
    return e.getCoordinate()
  }
  print(out) {
    System.out.println('EdgeEndStar:   ' + this.getCoordinate())
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      e.print(out)
    }
  }
  isAreaLabelsConsistent(geomGraph) {
    this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule())
    return this.checkAreaLabelsConsistent(0)
  }
  checkAreaLabelsConsistent(geomIndex) {
    const edges = this.getEdges()
    if (edges.size() <= 0) return true
    const lastEdgeIndex = edges.size() - 1
    const startLabel = edges.get(lastEdgeIndex).getLabel()
    const startLoc = startLabel.getLocation(geomIndex, Position.LEFT)
    Assert.isTrue(startLoc !== Location.NONE, 'Found unlabelled area edge')
    let currLoc = startLoc
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      const label = e.getLabel()
      Assert.isTrue(label.isArea(geomIndex), 'Found non-area edge')
      const leftLoc = label.getLocation(geomIndex, Position.LEFT)
      const rightLoc = label.getLocation(geomIndex, Position.RIGHT)
      if (leftLoc === rightLoc) 
        return false
      
      if (rightLoc !== currLoc) 
        return false
      
      currLoc = leftLoc
    }
    return true
  }
  findIndex(eSearch) {
    this.iterator()
    for (let i = 0; i < this._edgeList.size(); i++) {
      const e = this._edgeList.get(i)
      if (e === eSearch) return i
    }
    return -1
  }
  iterator() {
    return this.getEdges().iterator()
  }
  getEdges() {
    if (this._edgeList === null) 
      this._edgeList = new ArrayList(this._edgeMap.values())
    
    return this._edgeList
  }
  getLocation(geomIndex, p, geom) {
    if (this._ptInAreaLocation[geomIndex] === Location.NONE) 
      this._ptInAreaLocation[geomIndex] = SimplePointInAreaLocator.locate(p, geom[geomIndex].getGeometry())
    
    return this._ptInAreaLocation[geomIndex]
  }
  toString() {
    const buf = new StringBuffer()
    buf.append('EdgeEndStar:   ' + this.getCoordinate())
    buf.append('\n')
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      buf.append(e)
      buf.append('\n')
    }
    return buf.toString()
  }
  computeEdgeEndLabels(boundaryNodeRule) {
    for (let it = this.iterator(); it.hasNext(); ) {
      const ee = it.next()
      ee.computeLabel(boundaryNodeRule)
    }
  }
  computeLabelling(geomGraph) {
    this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule())
    this.propagateSideLabels(0)
    this.propagateSideLabels(1)
    const hasDimensionalCollapseEdge = [false, false]
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      const label = e.getLabel()
      for (let geomi = 0; geomi < 2; geomi++) 
        if (label.isLine(geomi) && label.getLocation(geomi) === Location.BOUNDARY) hasDimensionalCollapseEdge[geomi] = true
      
    }
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      const label = e.getLabel()
      for (let geomi = 0; geomi < 2; geomi++) 
        if (label.isAnyNull(geomi)) {
          let loc = Location.NONE
          if (hasDimensionalCollapseEdge[geomi]) {
            loc = Location.EXTERIOR
          } else {
            const p = e.getCoordinate()
            loc = this.getLocation(geomi, p, geomGraph)
          }
          label.setAllLocationsIfNull(geomi, loc)
        }
      
    }
  }
  getDegree() {
    return this._edgeMap.size()
  }
  insertEdgeEnd(e, obj) {
    this._edgeMap.put(e, obj)
    this._edgeList = null
  }
}
