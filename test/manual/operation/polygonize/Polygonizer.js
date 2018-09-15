import expect from 'expect.js'

import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import WKTReader from 'org/locationtech/jts/io/WKTReader'
import Polygonizer from 'org/locationtech/jts/operation/polygonize/Polygonizer'

describe('Polygonizer', function () {
  it('Basic Polygonizer test', function () {
    let reader = new WKTReader();
    let lineString = reader.read('LINESTRING (30 10, 40 40, 20 40, 10 20, 30 10)');
    
    var polygonizer = new Polygonizer();
    expect(polygonizer).to.be.ok();
    
    polygonizer.add(lineString);
    var polygons = polygonizer.getPolygons();
    var count = polygons.size();

    expect(count).to.be(1);
  })
})
