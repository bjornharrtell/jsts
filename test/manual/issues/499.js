import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'
import PrecisionModel from '../../../src/org/locationtech/jts/geom/PrecisionModel.js'
import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'

const createGeometryWithGeometryFactory = (wkt, digits) => {
  const gf = createGeometryFactory(digits)
  const reader = new WKTReader(gf)
  return reader.read(wkt)
}

const createGeometryFactory = (digits) => {
  const scale = Math.pow(10, digits)
  const pm = new PrecisionModel(scale)
  return new GeometryFactory(pm)
}

it('createMultiPoint', () => {
  const gf = createGeometryFactory(2)
  const geom = createGeometryWithGeometryFactory('MULTIPOINT ((180 270), (330 270), (330 150), (180 150))', 2)
})

it('createMultiPointWithEmpty', () => {
  const gf = createGeometryFactory(2)
  const geom = createGeometryWithGeometryFactory('MULTIPOINT ((180 270), (330 270), (330 150), (180 150), EMPTY)', 2)
})

it('createMultiLineString', () => {
  const gf = createGeometryFactory(2)
  const geom = createGeometryWithGeometryFactory(
    'MULTILINESTRING ((100 300, 200 300), (200 300, 100 200), (100 200, 200 200))',
    2
  )
})

it('createMultiLineStringWithEmpty', () => {
  const gf = createGeometryFactory(2)
  const geom = createGeometryWithGeometryFactory(
    'MULTILINESTRING ((100 300, 200 300), (200 300, 100 200), (100 200, 200 200), EMPTY)',
    2
  )
})

it('createMultiPolygon', () => {
  const gf = createGeometryFactory(2)
  const geom = createGeometryWithGeometryFactory(
    'MULTIPOLYGON (((200 270, 260 270, 260 210, 200 210, 200 270)),((270 200, 330 200, 330 150, 270 150, 270 200)))',
    2
  )
})

it('createMultiPolygonWithEmpty', () => {
  const gf = createGeometryFactory(2)
  const geom = createGeometryWithGeometryFactory(
    'MULTIPOLYGON (((200 270, 260 270, 260 210, 200 210, 200 270)),((270 200, 330 200, 330 150, 270 150, 270 200)), EMPTY)',
    2
  )
})