import expect from 'expect.js'

import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import DelaunayTriangulationBuilder from 'org/locationtech/jts/triangulate/DelaunayTriangulationBuilder'
import WKTReader from 'org/locationtech/jts/io/WKTReader'

import 'org/locationtech/jts/monkey'

describe('DelauneyTriangulationBuilder', function () {
  var geomFact = new GeometryFactory()
  var reader = new WKTReader()

  var runDelaunay = function (sitesWKT, computeTriangles) {
    var sites = reader.read(sitesWKT)
    var builder = new DelaunayTriangulationBuilder()
    builder.setSites(sites)

    var result = null
    if (computeTriangles) {
      result = builder.getTriangles(geomFact)
    } else {
      result = builder.getEdges(geomFact)
    }

    return result
  }

  var runDelaunayEdges = function (sitesWKT) {
    return runDelaunay(sitesWKT, false)
  }

  it('can be constructed', function () {
    var builder = new DelaunayTriangulationBuilder()
    expect(builder).to.be.an(DelaunayTriangulationBuilder)
  })

  it('can build from multipoints', function () {
    var wkt = 'MULTIPOINT ((10 10 1), (10 20 2), (20 20 3))'
    var expected = reader.read('MULTILINESTRING ((10 20, 20 20), (10 10, 10 20), (10 10, 20 20))')
    var result = runDelaunayEdges(wkt)
    expect(result.equalsExact(expected)).to.be.ok()

    var expectedTri = reader.read('GEOMETRYCOLLECTION (POLYGON ((10 20, 10 10, 20 20, 10 20)))')
    result = runDelaunay(wkt, true)

    expect(result.equalsExact(expectedTri)).to.be.ok()
  })
})
