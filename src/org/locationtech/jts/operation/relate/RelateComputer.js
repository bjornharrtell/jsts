import PointLocator from '../../algorithm/PointLocator'
import Location from '../../geom/Location'
import IntersectionMatrix from '../../geom/IntersectionMatrix'
import EdgeEndBuilder from './EdgeEndBuilder'
import NodeMap from '../../geomgraph/NodeMap'
import RelateNodeFactory from './RelateNodeFactory'
import ArrayList from '../../../../../java/util/ArrayList'
import RobustLineIntersector from '../../algorithm/RobustLineIntersector'
import Assert from '../../util/Assert'
export default class RelateComputer {
  constructor() {
    RelateComputer.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._li = new RobustLineIntersector()
    this._ptLocator = new PointLocator()
    this._arg = null
    this._nodes = new NodeMap(new RelateNodeFactory())
    this._im = null
    this._isolatedEdges = new ArrayList()
    this._invalidPoint = null
    const arg = arguments[0]
    this._arg = arg
  }
  insertEdgeEnds(ee) {
    for (let i = ee.iterator(); i.hasNext(); ) {
      const e = i.next()
      this._nodes.add(e)
    }
  }
  computeProperIntersectionIM(intersector, im) {
    const dimA = this._arg[0].getGeometry().getDimension()
    const dimB = this._arg[1].getGeometry().getDimension()
    const hasProper = intersector.hasProperIntersection()
    const hasProperInterior = intersector.hasProperInteriorIntersection()
    if (dimA === 2 && dimB === 2) {
      if (hasProper) im.setAtLeast('212101212')
    } else if (dimA === 2 && dimB === 1) {
      if (hasProper) im.setAtLeast('FFF0FFFF2')
      if (hasProperInterior) im.setAtLeast('1FFFFF1FF')
    } else if (dimA === 1 && dimB === 2) {
      if (hasProper) im.setAtLeast('F0FFFFFF2')
      if (hasProperInterior) im.setAtLeast('1F1FFFFFF')
    } else if (dimA === 1 && dimB === 1) {
      if (hasProperInterior) im.setAtLeast('0FFFFFFFF')
    }
  }
  labelIsolatedEdges(thisIndex, targetIndex) {
    for (let ei = this._arg[thisIndex].getEdgeIterator(); ei.hasNext(); ) {
      const e = ei.next()
      if (e.isIsolated()) {
        this.labelIsolatedEdge(e, targetIndex, this._arg[targetIndex].getGeometry())
        this._isolatedEdges.add(e)
      }
    }
  }
  labelIsolatedEdge(e, targetIndex, target) {
    if (target.getDimension() > 0) {
      const loc = this._ptLocator.locate(e.getCoordinate(), target)
      e.getLabel().setAllLocations(targetIndex, loc)
    } else {
      e.getLabel().setAllLocations(targetIndex, Location.EXTERIOR)
    }
  }
  computeIM() {
    const im = new IntersectionMatrix()
    im.set(Location.EXTERIOR, Location.EXTERIOR, 2)
    if (!this._arg[0].getGeometry().getEnvelopeInternal().intersects(this._arg[1].getGeometry().getEnvelopeInternal())) {
      this.computeDisjointIM(im)
      return im
    }
    this._arg[0].computeSelfNodes(this._li, false)
    this._arg[1].computeSelfNodes(this._li, false)
    const intersector = this._arg[0].computeEdgeIntersections(this._arg[1], this._li, false)
    this.computeIntersectionNodes(0)
    this.computeIntersectionNodes(1)
    this.copyNodesAndLabels(0)
    this.copyNodesAndLabels(1)
    this.labelIsolatedNodes()
    this.computeProperIntersectionIM(intersector, im)
    const eeBuilder = new EdgeEndBuilder()
    const ee0 = eeBuilder.computeEdgeEnds(this._arg[0].getEdgeIterator())
    this.insertEdgeEnds(ee0)
    const ee1 = eeBuilder.computeEdgeEnds(this._arg[1].getEdgeIterator())
    this.insertEdgeEnds(ee1)
    this.labelNodeEdges()
    this.labelIsolatedEdges(0, 1)
    this.labelIsolatedEdges(1, 0)
    this.updateIM(im)
    return im
  }
  labelNodeEdges() {
    for (let ni = this._nodes.iterator(); ni.hasNext(); ) {
      const node = ni.next()
      node.getEdges().computeLabelling(this._arg)
    }
  }
  copyNodesAndLabels(argIndex) {
    for (let i = this._arg[argIndex].getNodeIterator(); i.hasNext(); ) {
      const graphNode = i.next()
      const newNode = this._nodes.addNode(graphNode.getCoordinate())
      newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex))
    }
  }
  labelIntersectionNodes(argIndex) {
    for (let i = this._arg[argIndex].getEdgeIterator(); i.hasNext(); ) {
      const e = i.next()
      const eLoc = e.getLabel().getLocation(argIndex)
      for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
        const ei = eiIt.next()
        const n = this._nodes.find(ei.coord)
        if (n.getLabel().isNull(argIndex)) 
          if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else n.setLabel(argIndex, Location.INTERIOR)
        
      }
    }
  }
  labelIsolatedNode(n, targetIndex) {
    const loc = this._ptLocator.locate(n.getCoordinate(), this._arg[targetIndex].getGeometry())
    n.getLabel().setAllLocations(targetIndex, loc)
  }
  computeIntersectionNodes(argIndex) {
    for (let i = this._arg[argIndex].getEdgeIterator(); i.hasNext(); ) {
      const e = i.next()
      const eLoc = e.getLabel().getLocation(argIndex)
      for (let eiIt = e.getEdgeIntersectionList().iterator(); eiIt.hasNext(); ) {
        const ei = eiIt.next()
        const n = this._nodes.addNode(ei.coord)
        if (eLoc === Location.BOUNDARY) n.setLabelBoundary(argIndex); else 
        if (n.getLabel().isNull(argIndex)) n.setLabel(argIndex, Location.INTERIOR)
        
      }
    }
  }
  labelIsolatedNodes() {
    for (let ni = this._nodes.iterator(); ni.hasNext(); ) {
      const n = ni.next()
      const label = n.getLabel()
      Assert.isTrue(label.getGeometryCount() > 0, 'node with empty label found')
      if (n.isIsolated()) 
        if (label.isNull(0)) this.labelIsolatedNode(n, 0); else this.labelIsolatedNode(n, 1)
      
    }
  }
  updateIM(im) {
    for (let ei = this._isolatedEdges.iterator(); ei.hasNext(); ) {
      const e = ei.next()
      e.updateIM(im)
    }
    for (let ni = this._nodes.iterator(); ni.hasNext(); ) {
      const node = ni.next()
      node.updateIM(im)
      node.updateIMFromEdges(im)
    }
  }
  computeDisjointIM(im) {
    const ga = this._arg[0].getGeometry()
    if (!ga.isEmpty()) {
      im.set(Location.INTERIOR, Location.EXTERIOR, ga.getDimension())
      im.set(Location.BOUNDARY, Location.EXTERIOR, ga.getBoundaryDimension())
    }
    const gb = this._arg[1].getGeometry()
    if (!gb.isEmpty()) {
      im.set(Location.EXTERIOR, Location.INTERIOR, gb.getDimension())
      im.set(Location.EXTERIOR, Location.BOUNDARY, gb.getBoundaryDimension())
    }
  }
}
