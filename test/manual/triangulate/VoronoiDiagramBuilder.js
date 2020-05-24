import expect from 'expect.js'

import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import VoronoiDiagramBuilder from 'org/locationtech/jts/triangulate/VoronoiDiagramBuilder'
import WKTReader from 'org/locationtech/jts/io/WKTReader'

describe('VoronoiDiagramBuilder', function () {
  var geomFact = new GeometryFactory()
  var reader = new WKTReader()

  var runVoronoi = function (sitesWKT) {
    var sites = reader.read(sitesWKT)
    var builder = new VoronoiDiagramBuilder()
    builder.setSites(sites)

    var result = builder.getDiagram(geomFact)
    return result
  }

  it('can be constructed', function () {
    var builder = new VoronoiDiagramBuilder()
    expect(builder).to.be.an(VoronoiDiagramBuilder)
  })

  it('can build from multipoints', function () {
    var wkt = 'MULTIPOINT ((10 10), (20 70), (60 30), (80 70))'

    var expectedTri = reader.read('GEOMETRYCOLLECTION(POLYGON((-82.19544457292888 -82.19544457292888,-82.19544457292888 56.199240762154815,27.857142857142858 37.857142857142854,75.87817782917155 -82.19544457292888,-82.19544457292888 -82.19544457292888)),POLYGON((-82.19544457292888 56.199240762154815,-82.19544457292888 162.19544457292886,50 162.19544457292886,50 60,27.857142857142858 37.857142857142854,-82.19544457292888 56.199240762154815)),POLYGON((27.857142857142858 37.857142857142854,50 60,172.19544457292886 -1.0977222864644336,172.19544457292886 -82.19544457292888,75.87817782917155 -82.19544457292888,27.857142857142858 37.857142857142854)),POLYGON((50 60,50 162.19544457292886,172.19544457292886 162.19544457292886,172.19544457292886 -1.0977222864644336,50 60)))')
    expectedTri.normalize()

    var computedTri = runVoronoi(wkt)
    computedTri.normalize()

    expect(computedTri.equalsExact(expectedTri, 1.0e-7)).to.be.ok()
  })
})
