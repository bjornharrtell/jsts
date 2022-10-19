import expect from 'expect.js'

import GeoJSONReader from '../../../src/org/locationtech/jts/io/GeoJSONReader.js'
import IsSimple from '../../../src/org/locationtech/jts/operation/IsSimpleOp.js'

describe('Test (#481)', function() {
  it('GeoJSONReader', function() {
    const reader = new GeoJSONReader()
    const data = '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[6.053837,-11.227935],[-54.36,-30.24],[-15.336387,19.204063],[-23.04,39.96],[-33.12,59.04],[5.76,75.96],[19.372278,29.48046],[47.52,42.84],[36.72661,21.098373],[86.76,7.56],[68.4,-19.44],[35.919432,0],[29.6638,-7.645403],[29.6638,-7.645403],[6.053837,-11.227935]]]}}'
    const feature = reader.read(data)
    const isSimple = IsSimple.isSimple(feature.geometry)
    expect(isSimple).ok()
  })
})
