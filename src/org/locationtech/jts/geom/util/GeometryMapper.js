import Geometry from '../Geometry.js'
import GeometryCollection from '../GeometryCollection'
import hasInterface from '../../../../../hasInterface.js'
import Collection from '../../../../../java/util/Collection.js'
import ArrayList from '../../../../../java/util/ArrayList.js'
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
    } else {
      throw 'GeometryMapper Map argument type unknow'
    }
  }

  /**
   * Maps the atomic elements of a {@link Geometry}
   * (which may be atomic or composite)
   * using a {@link MapOp} mapping operation
   * into an atomic <tt>Geometry</tt> or a flat collection
   * of the most specific type.
   * <tt>null</tt> and empty values returned from the mapping operation
   * are discarded.
   * 
   * @param geom the geometry to map
   * @param emptyDim the dimension of empty geometry to create
   * @param op the mapping operation
   * @return the mapped result
   */
   static flatMap()
   {
    if (arguments[0] instanceof Geometry && typeof(arguments[1]) === 'number' && hasInterface(arguments[2], MapOp)) {
      const mapped = new ArrayList();
      const geom = arguments[0]
      const op = arguments[2]
      GeometryMapper.flatMap(geom, op, mapped);
  
      if (mapped.size() == 0) {
        return geom.getFactory().createEmpty(arguments[1]);
      }
      if (mapped.size() == 1)
        return mapped.get(0);
      return geom.getFactory().buildGeometry(mapped);

    } else if (arguments[0] instanceof Geometry && hasInterface(arguments[1], MapOp) && arguments[2] instanceof ArrayList) {
      const geom = arguments[0]
      const op = arguments[1]
      const mapped = arguments[2]
      for (let i = 0; i < geom.getNumGeometries(); i++) {
        const g = geom.getGeometryN(i);
        if (g instanceof GeometryCollection) {
          GeometryMapper.flatMap(g, op, mapped);
        }
        else {
          const res = op.map(g);
          if (res != null && ! res.isEmpty()) {
            GeometryMapper.addFlat(res, mapped);
          }
        }
      }
    } else {
      throw 'GeometryMapper flatmap argument type unknown'
    }
     
   }
   
  static addFlat(geom, geomList) {
     if (geom.isEmpty()) return;
     if (geom instanceof GeometryCollection) {
       for (let i = 0; i < geom.getNumGeometries(); i++) {
         GeometryMapper.addFlat(geom.getGeometryN(i), geomList);
       }
     }
     else {
       geomList.add(geom);
     }
   }



}

function MapOp() {}

GeometryMapper.MapOp = MapOp
