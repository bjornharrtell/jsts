import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import TopologyException from 'org/locationtech/jts/geom/TopologyException'
import OverlayOp from 'org/locationtech/jts/operation/overlay/OverlayOp'

describe('GeometryComponentFilter is not defined on polygon intersection (#258)', function () {
  const factory = new GeometryFactory()

  it('Intersection small invalid Polygons should cause a TopologyException', function () {
    const coordinates = [
      new Coordinate(50.3282361844247, 43.051352042895246),
      new Coordinate(50.3286311088063, 43.05588339079827),
      new Coordinate(50.3289594043318, 43.05119738555413),
      new Coordinate(50.32935432871337, 43.0557287321717),
      new Coordinate(50.3282361844247, 43.051352042895246)
    ]

    const polygon1 = factory.createPolygon(factory.createLinearRing(coordinates))
    const polygon2 = factory.createPolygon(factory.createLinearRing(coordinates))

    expect(() => OverlayOp.intersection(polygon1, polygon2)).to.throwError(e => expect(e).to.be.a(TopologyException))
  })
})
