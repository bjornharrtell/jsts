import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'
import CommonBitsOp from 'org/locationtech/jts/precision/CommonBitsOp'
import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import PrecisionModel from 'org/locationtech/jts/geom/PrecisionModel'

describe('CommonBitsOp', function() {
    var pm = new PrecisionModel( 1e20 );
    var gf = new GeometryFactory( pm );
    var wkt1 = "POLYGON ((210 210, 210 220, 220 220, 220 210, 210 210))";
    var wkt2 = "POLYGON ((225 225, 225 215, 215 215, 215 225, 225 225))";

    var readerF = new WKTReader(gf);
    var reader = new WKTReader();
    var g1 = readerF.read(wkt1);
    var g2 = reader.read(wkt2);
    
    var cbo = new CommonBitsOp(true);

    it('Tests an issue where CommonBitsRemover was not persisting changes to some kinds of CoordinateSequences', function() {
        var res = cbo.intersection(g1, g2);
        var expected = g1.intersection(g2);
        //expected = read("POLYGON ((220 215, 215 215, 215 220, 220 220, 220 215))");
        var result = res.norm().equalsExact(expected.norm());
        expect(result).to.be.true;
    });
});
