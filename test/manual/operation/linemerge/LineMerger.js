import expect from 'expect.js'

import WKTReader from 'org/locationtech/jts/io/WKTReader'
import WKTWriter from 'org/locationtech/jts/io/WKTWriter'
import LineMerger from 'org/locationtech/jts/operation/linemerge/LineMerger'

describe('LineMerger', function() {
  it('#373', function() {
    const reader = new WKTReader()
    const ls1 = reader.read('LINESTRING(0 0, 1 1)')
    const ls2 = reader.read('LINESTRING(1 1, 2 2)')
    const lineMerger = new LineMerger()
    lineMerger.add(ls1)
    lineMerger.add(ls2)
    lineMerger.merge()
    const mergedLineStrings = lineMerger.getMergedLineStrings()
    const mergedLineString = mergedLineStrings.get(0)
    const writer = new WKTWriter()
    const result = writer.write(mergedLineString)
    expect(result).to.equal('LINESTRING (0 0, 1 1, 2 2)')
  })
})
