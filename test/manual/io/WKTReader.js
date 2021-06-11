import expect from 'expect.js'

import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'

const reader = new WKTReader()

describe('WKTReader', function() {
  it('should be able to read a Polygon', function() {
    reader.read('POLYGON((57.722165171745836 14.202919006347656,57.71909404549173 14.21055793762207,57.71753546383143 14.212703704833984,57.71675614783365 14.212446212768555,57.715655908448745 14.212532043457031,57.71382210182487 14.21030044555664,57.71244668589343 14.20832633972168,57.71354702281898 14.205236434936523,57.712584229838065 14.202919006347656,57.71515162088769 14.201374053955078,57.71528915455559 14.196224212646484,57.71758130542645 14.192447662353516,57.72065256003978 14.196138381958008,57.72092758505232 14.199399948120117,57.72207350010876 14.201288223266602,57.722165171745836 14.202919006347656))')
  })

  it('should be able to read a 3D Point', function() {
    const p = reader.read('POINT Z (1 1 1)')
    const c = p.getCoordinate()
    expect(c.x).to.equal(1)
    expect(c.y).to.equal(1)
    expect(c.z).to.equal(1)
  })

  it('should be able to read a 3D Point with zeroes', function() {
    const p = reader.read('POINT Z (0 0 0)')
    const c = p.getCoordinate()
    expect(c.x).to.equal(0)
    expect(c.y).to.equal(0)
    expect(c.z).to.equal(0)
  })

  it('should be able to read a MultiPolygon', function() {
    reader.read('MULTIPOLYGON (((20 0, 20 80, 100 80, 200 80, 200 0, 20 0)), ((100 80, 80 120, 120 120, 100 80)))')
  })
})
