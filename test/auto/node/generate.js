/* eslint no-unused-expressions: "off" */

import $ from 'cheerio'
import { expect } from 'chai'

import GeometryFactory from 'org/locationtech/jts/geom/GeometryFactory'
import PrecisionModel from 'org/locationtech/jts/geom/PrecisionModel'
import WKTReader from 'org/locationtech/jts/io/WKTReader'
import WKTWriter from 'org/locationtech/jts/io/WKTWriter'
import 'org/locationtech/jts/monkey'

import BufferResultMatcher from '../BufferResultMatcher'

/**
 * @return GeometryFactory with PrecisionModel from test XML (undefined if no such info in XML)
 */
function createGeometryFactory(precisionModelInfo) {
  if (precisionModelInfo.length === 1) {
    const type = precisionModelInfo.attr('type')
    if (type !== 'FLOATING') {
      var scale = parseFloat(precisionModelInfo.attr('scale'))
      return new GeometryFactory(new PrecisionModel(scale))
    } else {
      return new GeometryFactory()
    }
  } else {
    return new GeometryFactory()
  }
}



/**
 * Translate JTS XML testcase document to Mocha suites
 */
export default function(doc, title) {
  const cases = $('case', doc)
  const geometryFactory = createGeometryFactory($('precisionModel', doc))
  const reader = new WKTReader(geometryFactory)
  const writer = new WKTWriter(geometryFactory)

  function fail(r, e, i) {
    const rt = r ? writer.write(r) : 'undefined'
    throw new Error(`\nResult: ${rt}\nExpected: ${e}\nInput: ${i}`)
  }

  /**
   * Translate JTS XML "test" to a Jasmine test spec
   */
  const generateSpec = function(a, b, opname, arg2, arg3, expected) {
    // fix opnames to real methods where needed
    if (opname === 'convexhull') opname = 'convexHull'
    else if (opname === 'getboundary') opname = 'getBoundary'
    else if (opname === 'symdifference') opname = 'symDifference'

    it('Executing ' + opname + ' on test geometry', function() {
      const at = writer.write(a)
      const bt = b ? writer.write(b) : 'undefined'
      const inputs = ' Input geometry A: ' + at + ' B: ' + bt

      var result

      // switch execution logic depending on opname
      if (opname === 'buffer') {
        result = a[opname](parseFloat(arg2))
      } else if (opname === 'getCentroid') {
        result = a[opname]()
      } else {
        if (arg3) {
          result = a[opname](b, arg3)
        } else {
          result = a[opname](b)
        }
      }

      // switch comparison logic depending on opname
      // TODO: should be a cleaner approach...
      if (opname === 'relate' || opname === 'contains' ||
        opname === 'intersects' || opname === 'equalsExact' ||
        opname === 'equalsNorm' || opname === 'isSimple' || opname === 'isValid') {
        var expectedBool = expected === 'true'
        if (expectedBool !== result) {
          fail(result, expectedBool, inputs)
        } else {
          expect(true).to.be.true
        }
      } else if (opname === 'distance') {
        const expectedDistance = parseFloat(expected)
        if (result !== expectedDistance) {
          fail(result, parseFloat(expectedDistance), inputs)
        } else {
          expect(true).to.be.true
        }
      } else if (opname === 'buffer') {
        const expectedGeometry = reader.read(expected)
        result.normalize()
        expectedGeometry.normalize()
        var matcher = new BufferResultMatcher()
        if (!matcher.isBufferResultMatch(result, expectedGeometry, parseFloat(arg2))) {
          fail(result, expected, inputs)
        } else {
          expect(true).to.be.true
        }
      } else {
        const expectedGeometry = reader.read(expected)
        result.normalize()
        expectedGeometry.normalize()
        if (!result.equalsExact(expectedGeometry)) {
          fail(result, writer.write(expectedGeometry), inputs)
        } else {
          expect(true).to.be.true
        }
      }
    })
  }

  for (var i = 0; i < cases.length; i++) {
    var testcase = cases[i]
    var desc = $('desc', testcase).text().trim()
    describe(title + ' - ' + desc, function () {
      var awkt = $('a', testcase).text().trim().replace(/\n/g, '')
      var bwkt = $('b', testcase).text().trim().replace(/\n/g, '')
      var tests = $('test', testcase)
      for (var j = 0; j < tests.length; j++) {
        var test = tests[j]
        var opname = $('op', test).attr('name')
        var arg2 = $('op', test).attr('arg2')
        var arg3 = $('op', test).attr('arg3')
        var expected = $('op', test).text().trim().replace(/\n/g, '')
        try {
          var a = reader.read(awkt)
          var b = bwkt.length > 0 ? reader.read(bwkt) : undefined
          generateSpec(a, b, opname, arg2, arg3, expected)
        } catch (e) {}
      }
    })
  }
}
