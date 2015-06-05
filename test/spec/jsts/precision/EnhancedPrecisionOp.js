/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

describe('jsts.precision.EnhancedPrecisionOp', function() {
    var reader = new jsts.io.WKTReader();

    var wkt1 = "POLYGON ((708653.498611049 2402311.54647056, 708708.895756966 2402203.47250014, 708280.326454234 2402089.6337791, 708247.896591321 2402252.48269854, 708367.379593851 2402324.00761653, 708248.882609455 2402253.07294874, 708249.523621829 2402244.3124463, 708261.854734465 2402182.39086576, 708262.818392579 2402183.35452387, 708653.498611049 2402311.54647056))";
    var wkt2 = "POLYGON ((708258.754920656 2402197.91172757, 708257.029447455 2402206.56901508, 708652.961095455 2402312.65463437, 708657.068786251 2402304.6356364, 708258.754920656 2402197.91172757))";
    var g1 = reader.read(wkt1);
    var g2 = reader.read(wkt2);


    it('Cannot be done with simple intersection', function() {
        var wasException = false;
        try {
            g1.intersection(g2);
        } catch (ex) {
            wasException = true;
        }
        expect(wasException).toBeTruthy();
    });

    it('Computed with EnhancedPrecisionOp', function() {
        var res = jsts.precision.EnhancedPrecisionOp.intersection(g1, g2);
        expect(res).toBeDefined();
    });
});
