import expect from 'expect.js'

import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'
import MinimumClearance from 'jsts/org/locationtech/jts/precision/MinimumClearance'

describe('MinimumClearance', function() {
    var reader = new WKTReader();

    describe('2 Identical Points', function() {
        runTest("MULTIPOINT ((100 100), (100 100))", 1.7976931348623157E308);
    });

    describe('3 Points', function() {
        runTest("MULTIPOINT ((100 100), (10 100), (30 100))", 20);
    });

    describe('Triangle', function() {
        runTest("POLYGON ((100 100, 300 100, 200 200, 100 100))", 100);
    });

    function runTest(wkt, value) {
        it('checked ' + value, function() {
            var g = reader.read(wkt);
            var rp = MinimumClearance.getDistance(g);
            expect(rp).to.equal(value);
        });
    }
});
