import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'
import EnhancedPrecisionOp from 'org/locationtech/jts/precision/EnhancedPrecisionOp'

describe('EnhancedPrecisionOp', function() {
    var reader = new WKTReader();

    var wkt1 = "POLYGON ((708653.498611049 2402311.54647056, 708708.895756966 2402203.47250014, 708280.326454234 2402089.6337791, 708247.896591321 2402252.48269854, 708367.379593851 2402324.00761653, 708248.882609455 2402253.07294874, 708249.523621829 2402244.3124463, 708261.854734465 2402182.39086576, 708262.818392579 2402183.35452387, 708653.498611049 2402311.54647056))";
    var wkt2 = "POLYGON ((708258.754920656 2402197.91172757, 708257.029447455 2402206.56901508, 708652.961095455 2402312.65463437, 708657.068786251 2402304.6356364, 708258.754920656 2402197.91172757))";
    var g1 = reader.read(wkt1);
    var g2 = reader.read(wkt2);
	var buf = 10;

	describe('union', function() {
		it('Cannot be done with simple union', function() {
			var wasException = false;
			try {
				g1.union(g2);
			} catch (ex) {
				wasException = true;
			}
			expect(wasException).to.be.true;
		});

		it('Computed with EnhancedPrecisionOp', function() {
			var res = EnhancedPrecisionOp.union(g1, g2);
			expect(res).to.be.defined;
		});
	});

	describe('intersection', function() {
		it('Cannot be done with simple intersection', function() {
			var wasException = false;
			try {
				g1.intersection(g2);
			} catch (ex) {
				wasException = true;
			}
			expect(wasException).to.be.true;
		});

		it('Computed with EnhancedPrecisionOp', function() {
			var res = EnhancedPrecisionOp.intersection(g1, g2);
			expect(res).to.be.defined;
		});
	});

	describe('buffer', function() {
		it('Cannot be done with simple buffer', function() {
			var wasException = false;
			try {
				g1.buffer(buf);
			} catch (ex) {
				wasException = true;
			}
			expect(wasException).to.be.true;
		});

		it('Computed with EnhancedPrecisionOp', function() {
			var res = EnhancedPrecisionOp.buffer(g1, buf);
			expect(res).to.be.defined;
		});
	});

	describe('symDifference', function() {
		it('Cannot be done with simple symDifference', function() {
			var wasException = false;
			try {
				g1.union(g2);
			} catch (ex) {
				wasException = true;
			}
			expect(wasException).to.be.true;
		});

		it('Computed with EnhancedPrecisionOp', function() {
			var res = EnhancedPrecisionOp.symDifference(g1, g2);
			expect(res).to.be.defined;
		});
	});

	describe('difference', function() {
		it('Cannot be done with simple difference', function() {
			var wasException = false;
			try {
				g1.difference(g2);
			} catch (ex) {
				wasException = true;
			}
			expect(wasException).to.be.true;
		});

		it('Computed with EnhancedPrecisionOp', function() {
			var res = EnhancedPrecisionOp.difference(g1, g2);
			expect(res).to.be.defined;
		});
	});
});
