import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import GeoJSONReader from '../../../src/org/locationtech/jts/io/GeoJSONReader.js'
import PrecisionModel from '../../../src/org/locationtech/jts/geom/PrecisionModel.js'
import GeometryPrecisionReducer from '../../../src/org/locationtech/jts/precision/GeometryPrecisionReducer.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('Test (#279)', function() {
  const reader = new GeoJSONReader()
  const precisionModel = new PrecisionModel(6)
  const reducer = new GeometryPrecisionReducer(precisionModel)

  it('isValid should not throw an exception for this Polygon', function() {
    // const p = reader.read('POLYGON((460901 -33906,3961797 -2530706,2293179 -4841460,599984 -3210077,460901 -33906))')
    const json = fs.readFileSync(__dirname + '/debug_diff_a.json', 'utf8')
    const a = reader.read(json)
    // const valid = p.isValid()
    reducer.reduce(a)
  })
})
