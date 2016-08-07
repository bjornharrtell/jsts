import expect from 'expect.js'

// import WKTReader from 'org/locationtech/jts/io/WKTReader'
import GeoJSONReader from 'org/locationtech/jts/io/GeoJSONReader'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import PrecisionModel from 'org/locationtech/jts/geom/PrecisionModel'
import GeometryPrecisionReducer from 'org/locationtech/jts/precision/GeometryPrecisionReducer'

describe('Test (#279)', function () {
  const reader = new GeoJSONReader()
  const precisionModel = new PrecisionModel(6)
  const reducer = new GeometryPrecisionReducer(precisionModel)

  it('isValid should not throw an exception for this Polygon', function () {
    //const p = reader.read('POLYGON((460901 -33906,3961797 -2530706,2293179 -4841460,599984 -3210077,460901 -33906))')
    const a = reader.read(JSON.stringify(require('./debug_diff_a.json')))
    // const valid = p.isValid()
    const result = reducer.reduce(a)
  })
})
