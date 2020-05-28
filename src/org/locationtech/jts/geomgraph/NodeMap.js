import Location from '../geom/Location'
import Coordinate from '../geom/Coordinate'
import Node from './Node'
import ArrayList from '../../../../java/util/ArrayList'
import TreeMap from '../../../../java/util/TreeMap'
export default class NodeMap {
  constructor() {
    NodeMap.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.nodeMap = new TreeMap()
    this.nodeFact = null
    const nodeFact = arguments[0]
    this.nodeFact = nodeFact
  }
  find(coord) {
    return this.nodeMap.get(coord)
  }
  addNode() {
    if (arguments[0] instanceof Coordinate) {
      const coord = arguments[0]
      let node = this.nodeMap.get(coord)
      if (node === null) {
        node = this.nodeFact.createNode(coord)
        this.nodeMap.put(coord, node)
      }
      return node
    } else if (arguments[0] instanceof Node) {
      const n = arguments[0]
      const node = this.nodeMap.get(n.getCoordinate())
      if (node === null) {
        this.nodeMap.put(n.getCoordinate(), n)
        return n
      }
      node.mergeLabel(n)
      return node
    }
  }
  print(out) {
    for (let it = this.iterator(); it.hasNext(); ) {
      const n = it.next()
      n.print(out)
    }
  }
  iterator() {
    return this.nodeMap.values().iterator()
  }
  values() {
    return this.nodeMap.values()
  }
  getBoundaryNodes(geomIndex) {
    const bdyNodes = new ArrayList()
    for (let i = this.iterator(); i.hasNext(); ) {
      const node = i.next()
      if (node.getLabel().getLocation(geomIndex) === Location.BOUNDARY) bdyNodes.add(node)
    }
    return bdyNodes
  }
  add(e) {
    const p = e.getCoordinate()
    const n = this.addNode(p)
    n.add(e)
  }
}
