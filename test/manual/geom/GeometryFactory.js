// import expect from 'expect.js'

import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'

const factory = new GeometryFactory()

describe('GeometryFactory', function () {
  describe('createPolygon', function () {
    it('should be able to create empty polygon', function () {
      const polygon = factory.createPolygon();
    })
  })
})
