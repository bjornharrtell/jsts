import Location from '../../geom/Location'
import EdgeEnd from '../../geomgraph/EdgeEnd'
import Position from '../../geomgraph/Position'
import GeometryGraph from '../../geomgraph/GeometryGraph'
import Label from '../../geomgraph/Label'
import ArrayList from '../../../../../java/util/ArrayList'
import Edge from '../../geomgraph/Edge'
export default class EdgeEndBundle extends EdgeEnd {
  constructor() {
    super()
    EdgeEndBundle.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._edgeEnds = new ArrayList()
    if (arguments.length === 1) {
      const e = arguments[0]
      EdgeEndBundle.constructor_.call(this, null, e)
    } else if (arguments.length === 2) {
      const boundaryNodeRule = arguments[0], e = arguments[1]
      EdgeEnd.constructor_.call(this, e.getEdge(), e.getCoordinate(), e.getDirectedCoordinate(), new Label(e.getLabel()))
      this.insert(e)
    }
  }
  insert(e) {
    this._edgeEnds.add(e)
  }
  print(out) {
    out.println('EdgeEndBundle--> Label: ' + this._label)
    for (let it = this.iterator(); it.hasNext(); ) {
      const ee = it.next()
      ee.print(out)
      out.println()
    }
  }
  iterator() {
    return this._edgeEnds.iterator()
  }
  getEdgeEnds() {
    return this._edgeEnds
  }
  computeLabelOn(geomIndex, boundaryNodeRule) {
    let boundaryCount = 0
    let foundInterior = false
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      const loc = e.getLabel().getLocation(geomIndex)
      if (loc === Location.BOUNDARY) boundaryCount++
      if (loc === Location.INTERIOR) foundInterior = true
    }
    let loc = Location.NONE
    if (foundInterior) loc = Location.INTERIOR
    if (boundaryCount > 0) 
      loc = GeometryGraph.determineBoundary(boundaryNodeRule, boundaryCount)
    
    this._label.setLocation(geomIndex, loc)
  }
  computeLabelSide(geomIndex, side) {
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      if (e.getLabel().isArea()) {
        const loc = e.getLabel().getLocation(geomIndex, side)
        if (loc === Location.INTERIOR) {
          this._label.setLocation(geomIndex, side, Location.INTERIOR)
          return null
        } else if (loc === Location.EXTERIOR) {
          this._label.setLocation(geomIndex, side, Location.EXTERIOR)
        }
      }
    }
  }
  getLabel() {
    return this._label
  }
  computeLabelSides(geomIndex) {
    this.computeLabelSide(geomIndex, Position.LEFT)
    this.computeLabelSide(geomIndex, Position.RIGHT)
  }
  updateIM(im) {
    Edge.updateIM(this._label, im)
  }
  computeLabel(boundaryNodeRule) {
    let isArea = false
    for (let it = this.iterator(); it.hasNext(); ) {
      const e = it.next()
      if (e.getLabel().isArea()) isArea = true
    }
    if (isArea) this._label = new Label(Location.NONE, Location.NONE, Location.NONE); else this._label = new Label(Location.NONE)
    for (let i = 0; i < 2; i++) {
      this.computeLabelOn(i, boundaryNodeRule)
      if (isArea) this.computeLabelSides(i)
    }
  }
}
