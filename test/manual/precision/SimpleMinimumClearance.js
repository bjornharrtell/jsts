
import expect from 'expect.js'

import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'
import PrecisionModel from 'jsts/org/locationtech/jts/geom/PrecisionModel'
import GeometryFactory from 'jsts/org/locationtech/jts/geom/GeometryFactory'
import SimpleMinimumClearance from 'jsts/org/locationtech/jts/precision/SimpleMinimumClearance'

describe('SimpleMinimumClearance', function() {
    var pmFloat = new PrecisionModel();
    var gfFloat = new GeometryFactory(pmFloat, 0);
    var reader = new WKTReader(gfFloat);

    it('distance Polygon basic', function() {
        var g = reader.read("POLYGON (( 0 0, 0 1, 1 1, 1 0, 0 0 ))");
        var distance = SimpleMinimumClearance.getDistance(g);
        expect(distance).to.equal(1);
    });

    it('distance Collection basic', function() {
        var g = reader.read("GEOMETRYCOLLECTION( POINT(4 6), LINESTRING(4 6, 7 10) )");
        var distance = SimpleMinimumClearance.getDistance(g);
        expect(distance).to.equal(5);
    });
});
