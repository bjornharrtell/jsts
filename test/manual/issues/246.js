import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'

describe('Class.isAssignableFrom used but not ported from Java (#246)', function () {
  var reader = new WKTReader()

  it('Unary union for GeometryCollection should work', function () {
    const gc = reader.read('GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))')
    const union = gc.union()
  })
})
