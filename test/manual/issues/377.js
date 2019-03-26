import expect from 'expect.js'

import GeoJSONReader from 'org/locationtech/jts/io/GeoJSONReader'
import PointLocator from 'org/locationtech/jts/algorithm/PointLocator.js'


describe('Test (#377)', function () {
  const reader = new GeoJSONReader()

  it('isValid should not throw an exception for this Polygon', function () {
    const poly = reader.read({type: 'Polygon', coordinates: [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]]})
    const point = reader.read({type: 'Point', coordinates: [1.5, 1.5]})
    const pl = new PointLocator()
    const isInside = pl.intersects(point, poly);
    expect(isInside).to.be(true)
  })
})