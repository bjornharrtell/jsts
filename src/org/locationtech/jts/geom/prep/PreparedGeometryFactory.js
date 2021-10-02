import PreparedPoint from './PreparedPoint.js'
import hasInterface from '../../../../../hasInterface.js'
import Lineal from '../Lineal.js'
import PreparedLineString from './PreparedLineString.js'
import Polygonal from '../Polygonal.js'
import PreparedPolygon from './PreparedPolygon.js'
import Puntal from '../Puntal.js'
import BasicPreparedGeometry from './BasicPreparedGeometry.js'
export default class PreparedGeometryFactory {
  static prepare(geom) {
    return new PreparedGeometryFactory().create(geom)
  }
  create(geom) {
    if (hasInterface(geom, Polygonal)) return new PreparedPolygon(geom)
    if (hasInterface(geom, Lineal)) return new PreparedLineString(geom)
    if (hasInterface(geom, Puntal)) return new PreparedPoint(geom)
    return new BasicPreparedGeometry(geom)
  }
}
