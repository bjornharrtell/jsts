import expect from 'expect.js'

import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import VoronoiDiagramBuilder from 'org/locationtech/jts/triangulate/VoronoiDiagramBuilder'
import WKTReader from 'org/locationtech/jts/io/WKTReader'

import 'org/locationtech/jts/monkey'

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

    var expectedTri = reader.read('GEOMETRYCOLLECTION (POLYGON ((-60 52.5, -60 140, 50 140, 50 60, 27.857142857142854 37.857142857142854, -60 52.5)), POLYGON ((-60 -60, -60 52.5, 27.857142857142854 37.857142857142854, 67 -60, -60 -60)), POLYGON ((150 10, 150 -60, 67 -60, 27.857142857142854 37.857142857142854, 50 60, 150 10)), POLYGON ((50 140, 150 140, 150 10, 50 60, 50 140)))')
    expectedTri.normalize()

    var computedTri = runVoronoi(wkt)
    computedTri.normalize()

    expect(computedTri.equalsExact(expectedTri, 1.0e-7)).to.be.ok()
  })
})
