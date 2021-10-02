import expect from 'expect.js'

import WKTReader from '../../../../src/org/locationtech/jts/io/WKTReader.js'
import Polygonizer from '../../../../src/org/locationtech/jts/operation/polygonize/Polygonizer.js'

describe('Polygonizer', function() {
  it('Basic Polygonizer test', function() {
    const reader = new WKTReader()
    const lineString = reader.read('LINESTRING (30 10, 40 40, 20 40, 10 20, 30 10)')

    var polygonizer = new Polygonizer()
    expect(polygonizer).to.be.ok()

    polygonizer.add(lineString)
    var polygons = polygonizer.getPolygons()
    var count = polygons.size()

    expect(count).to.be(1)
  })
})
