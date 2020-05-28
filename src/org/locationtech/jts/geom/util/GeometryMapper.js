import Geometry from '../Geometry'
import hasInterface from '../../../../../hasInterface'
import Collection from '../../../../../java/util/Collection'
import ArrayList from '../../../../../java/util/ArrayList'
export default class GeometryMapper {
  static map() {
    if (arguments[0] instanceof Geometry && hasInterface(arguments[1], MapOp)) {
      const geom = arguments[0], op = arguments[1]
      const mapped = new ArrayList()
      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const g = op.map(geom.getGeometryN(i))
        if (g !== null) mapped.add(g)
      }
      return geom.getFactory().buildGeometry(mapped)
    } else if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], MapOp)) {
      const geoms = arguments[0], op = arguments[1]
      const mapped = new ArrayList()
      for (let i = geoms.iterator(); i.hasNext(); ) {
        const g = i.next()
        const gr = op.map(g)
        if (gr !== null) mapped.add(gr)
      }
      return mapped
    }
  }
}
function MapOp() {}
GeometryMapper.MapOp = MapOp
