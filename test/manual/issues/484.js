import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'

describe('Test (#484)', function() {
  it('equalsNorm should work', function() {
    const reader = new WKTReader()
    const a = reader.read('MULTIPOLYGON (((0 0, 10 0, 10 10, 0 0)), ((15 5, 15 10, 20 10, 20 5, 15 5)))')
    const b = reader.read('POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')
    const equalsNorm = a.equalsNorm(b)
    expect(equalsNorm).not.ok()
  })
  it('equalsNorm should work also other way', function() {
    const reader = new WKTReader()
    const a = reader.read('MULTIPOLYGON (((0 0, 10 0, 10 10, 0 0)), ((15 5, 15 10, 20 10, 20 5, 15 5)))')
    const b = reader.read('POLYGON ((0 0, 10 0, 10 10, 0 10, 0 0))')
    const equalsNorm = b.equalsNorm(a)
    expect(equalsNorm).not.ok()
  })
})
