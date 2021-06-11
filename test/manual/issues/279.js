// import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'
import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader'
import PrecisionModel from 'jsts/org/locationtech/jts/geom/PrecisionModel'
import GeometryPrecisionReducer from 'jsts/org/locationtech/jts/precision/GeometryPrecisionReducer'

import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Test (#279)', function () {
  const reader = new GeoJSONReader()
  const precisionModel = new PrecisionModel(6)
  const reducer = new GeometryPrecisionReducer(precisionModel)

  it('isValid should not throw an exception for this Polygon', function () {
    // const p = reader.read('POLYGON((460901 -33906,3961797 -2530706,2293179 -4841460,599984 -3210077,460901 -33906))')
    const data = fs.readFileSync(__dirname + '/debug_diff_a.json').toString()
    const a = reader.read(data)
    // const valid = p.isValid()
    reducer.reduce(a)
  })
})
