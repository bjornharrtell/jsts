import Geometry from '../geom/Geometry.js'
import hasInterface from '../../../../hasInterface.js'
import Collection from '../../../../java/util/Collection.js'
import ArrayList from '../../../../java/util/ArrayList.js'
import TreeMap from '../../../../java/util/TreeMap.js'
export default class VertexTaggedGeometryDataMapper {
  constructor() {
    VertexTaggedGeometryDataMapper.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._coordDataMap = new TreeMap()
  }
  loadSourceGeometries() {
    if (hasInterface(arguments[0], Collection)) {
      const geoms = arguments[0]
      for (let i = geoms.iterator(); i.hasNext(); ) {
        const geom = i.next()
        this.loadVertices(geom.getCoordinates(), geom.getUserData())
      }
    } else if (arguments[0] instanceof Geometry) {
      const geomColl = arguments[0]
      for (let i = 0; i < geomColl.getNumGeometries(); i++) {
        const geom = geomColl.getGeometryN(i)
        this.loadVertices(geom.getCoordinates(), geom.getUserData())
      }
    }
  }
  getCoordinates() {
    return new ArrayList(this._coordDataMap.keySet())
  }
  transferData(targetGeom) {
    for (let i = 0; i < targetGeom.getNumGeometries(); i++) {
      const geom = targetGeom.getGeometryN(i)
      const vertexKey = geom.getUserData()
      if (vertexKey === null) continue
      geom.setUserData(this._coordDataMap.get(vertexKey))
    }
  }
  loadVertices(pts, data) {
    for (let i = 0; i < pts.length; i++) 
      this._coordDataMap.put(pts[i], data)
    
  }
}
