import expect from 'expect.js'

import WKTParser from 'jsts/org/locationtech/jts/io/WKTParser'

const parser = new WKTParser()

describe('WKTParser', function() {
  function roundtrip(wkt) {
    const expected = wkt
    const g = parser.read(expected)
    const actual = parser.write(g)
    expect(expected).to.equal(actual)
  }

  it('roundtrips', function() {
    roundtrip('POINT EMPTY')
    roundtrip('POINT (30 10)')
    roundtrip('LINESTRING (30 10, 10 30, 40 40)')
    roundtrip('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
    roundtrip('POLYGON ((35 10, 45 45, 15 40, 10 20, 35 10), (20 30, 35 35, 30 20, 20 30))')
    roundtrip('MULTIPOINT ((10 40), (40 30), (20 20), (30 10))')
  })
})
