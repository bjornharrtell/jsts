const expect = require('expect.js')

const {
  WKTReader, // 'org/locationtech/jts/io/WKTReader'
  RelateOp, // 'org/locationtech/jts/operation/relate/RelateOp'
  GeometryFactory, // 'org/locationtech/jts/geom/GeometryFactory'
  PrecisionModel, // 'org/locationtech/jts/geom/PrecisionModel'
  GeometryPrecisionReducer, // 'org/locationtech/jts/precision/GeometryPrecisionReducer'
} = require('../../../')

describe('Test (#295)', function () {
  const reader = new WKTReader()
  const ls1 = reader.read('LINESTRING(0 0, 1 1)')
  const ls2 = reader.read('LINESTRING(0 1, 1 0)')

  it('RelateOp.relate should produce 0F1FF0102', function () {
    const result = RelateOp.relate(ls1, ls2).toString()
    expect(result).to.eql('0F1FF0102')
  })
})
