import PolygonExtracter from '../../geom/util/PolygonExtracter'
import OverlapUnion from './OverlapUnion'
import STRtree from '../../index/strtree/STRtree'
import Geometry from '../../geom/Geometry'
import hasInterface from '../../../../../hasInterface'
import GeometryFactory from '../../geom/GeometryFactory'
import Polygonal from '../../geom/Polygonal'
import ArrayList from '../../../../../java/util/ArrayList'
import List from '../../../../../java/util/List'
export default class CascadedPolygonUnion {
  constructor() {
    CascadedPolygonUnion.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._inputPolys = null
    this._geomFactory = null
    const polys = arguments[0]
    this._inputPolys = polys
    if (this._inputPolys === null) this._inputPolys = new ArrayList()
  }
  static restrictToPolygons(g) {
    if (hasInterface(g, Polygonal)) 
      return g
    
    const polygons = PolygonExtracter.getPolygons(g)
    if (polygons.size() === 1) return polygons.get(0)
    return g.getFactory().createMultiPolygon(GeometryFactory.toPolygonArray(polygons))
  }
  static getGeometry(list, index) {
    if (index >= list.size()) return null
    return list.get(index)
  }
  static union(polys) {
    const op = new CascadedPolygonUnion(polys)
    return op.union()
  }
  reduceToGeometries(geomTree) {
    const geoms = new ArrayList()
    for (let i = geomTree.iterator(); i.hasNext(); ) {
      const o = i.next()
      let geom = null
      if (hasInterface(o, List)) 
        geom = this.unionTree(o)
      else if (o instanceof Geometry) 
        geom = o
      
      geoms.add(geom)
    }
    return geoms
  }
  union() {
    if (this._inputPolys === null) throw new IllegalStateException('union() method cannot be called twice')
    if (this._inputPolys.isEmpty()) return null
    this._geomFactory = this._inputPolys.iterator().next().getFactory()
    const index = new STRtree(CascadedPolygonUnion.STRTREE_NODE_CAPACITY)
    for (let i = this._inputPolys.iterator(); i.hasNext(); ) {
      const item = i.next()
      index.insert(item.getEnvelopeInternal(), item)
    }
    this._inputPolys = null
    const itemTree = index.itemsTree()
    const unionAll = this.unionTree(itemTree)
    return unionAll
  }
  binaryUnion() {
    if (arguments.length === 1) {
      const geoms = arguments[0]
      return this.binaryUnion(geoms, 0, geoms.size())
    } else if (arguments.length === 3) {
      const geoms = arguments[0], start = arguments[1], end = arguments[2]
      if (end - start <= 1) {
        const g0 = CascadedPolygonUnion.getGeometry(geoms, start)
        return this.unionSafe(g0, null)
      } else if (end - start === 2) {
        return this.unionSafe(CascadedPolygonUnion.getGeometry(geoms, start), CascadedPolygonUnion.getGeometry(geoms, start + 1))
      } else {
        const mid = Math.trunc((end + start) / 2)
        const g0 = this.binaryUnion(geoms, start, mid)
        const g1 = this.binaryUnion(geoms, mid, end)
        return this.unionSafe(g0, g1)
      }
    }
  }
  repeatedUnion(geoms) {
    let union = null
    for (let i = geoms.iterator(); i.hasNext(); ) {
      const g = i.next()
      if (union === null) union = g.copy(); else union = union.union(g)
    }
    return union
  }
  unionSafe(g0, g1) {
    if (g0 === null && g1 === null) return null
    if (g0 === null) return g1.copy()
    if (g1 === null) return g0.copy()
    return this.unionActual(g0, g1)
  }
  unionActual(g0, g1) {
    const union = OverlapUnion.union(g0, g1)
    
    return CascadedPolygonUnion.restrictToPolygons(union)
  }
  unionTree(geomTree) {
    const geoms = this.reduceToGeometries(geomTree)
    const union = this.binaryUnion(geoms)
    return union
  }
  bufferUnion() {
    if (arguments.length === 1) {
      const geoms = arguments[0]
      const factory = geoms.get(0).getFactory()
      const gColl = factory.buildGeometry(geoms)
      const unionAll = gColl.buffer(0.0)
      return unionAll
    } else if (arguments.length === 2) {
      const g0 = arguments[0], g1 = arguments[1]
      const factory = g0.getFactory()
      const gColl = factory.createGeometryCollection([g0, g1])
      const unionAll = gColl.buffer(0.0)
      return unionAll
    }
  }
}
CascadedPolygonUnion.STRTREE_NODE_CAPACITY = 4
