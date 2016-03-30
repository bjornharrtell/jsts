import expect from 'expect.js'

import WKTWriter from 'org/locationtech/jts/io/WKTWriter'

describe('WKTWriter', function () {
  it('should be able to create a LINESTRING from two points', function () {
    const p0 = { x: 10.0, y: 20.0 }
    const p1 = { x: 30.0, y: 40.0 }
    const p2 = { x: 10.123, y: 20.234 }
    const p3 = { x: 30.524, y: 40.944 }
    let lineString = WKTWriter.toLineString(p0, p1)
    expect(lineString).to.eql('LINESTRING ( 10 20, 30 40 )')

    lineString = WKTWriter.toLineString(p2, p3)
    expect(lineString).to.eql('LINESTRING ( 10.123 20.234, 30.524 40.944 )')
  })
})
