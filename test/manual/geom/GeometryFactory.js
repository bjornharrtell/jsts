// import expect from 'expect.js'

import GeometryFactory from '../../../src/org/locationtech/jts/geom/GeometryFactory.js'

const factory = new GeometryFactory()

describe('GeometryFactory', function() {
  describe('createPolygon', function() {
    it('should be able to create empty polygon', function() {
      factory.createPolygon()
    })
  })
})
