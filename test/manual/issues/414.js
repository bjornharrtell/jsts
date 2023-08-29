import expect from 'expect.js'

import WKTReader from '../../../src/org/locationtech/jts/io/WKTReader.js'
import WKTWriter from '../../../src/org/locationtech/jts/io/WKTWriter.js'
import BufferOp from '../../../src/org/locationtech/jts/operation/buffer/BufferOp.js'

//import '../../../src/org/locationtech/jts/monkey.js'

describe('Test (#414)', function() {
  const reader = new WKTReader()
  const writer = new WKTWriter()
  const input = 'GEOMETRYCOLLECTION (POLYGON ((929464.61 6574944.91, 929464.86 6574947.11, 929466.77 6574960.5, 929469.11 6574967.8, 929469.53 6574968.52, 929473.14 6574967.11, 929514.66 6574950.92, 929514.19 6574950.07, 929502.7 6574929.15, 929464.61 6574944.91)),POLYGON ((929464.44 6574943.48, 929464.61 6574944.91, 929502.7 6574929.15, 929464.44 6574943.48)),POLYGON ((929464.0190200877 6574940.014871169, 929464.4436511227 6574943.475951197, 929502.7021457119 6574929.150352478, 929499.4081529963 6574923.458372557, 929464.0190200877 6574940.014871169)))'
  const expected = 'POLYGON ((929464.0190200877 6574940.014871169, 929464.4436511227 6574943.475951197, 929491.1756866102 6574933.466346338, 929464.44 6574943.48, 929464.61 6574944.91, 929464.86 6574947.11, 929466.77 6574960.5, 929469.11 6574967.8, 929469.53 6574968.52, 929473.14 6574967.11, 929514.66 6574950.92, 929514.19 6574950.07, 929502.7005265789 6574929.150958749, 929502.7021457119 6574929.150352478, 929499.4081529963 6574923.458372557, 929464.0190200877 6574940.014871169))'
  const gc = reader.read(input)

  it('should be able to buffer GC', function() {
    const result = BufferOp.bufferOp(gc, 0)
    const actual = writer.write(result)
    expect(actual).to.eql(expected)
    const result2 = BufferOp.bufferOp(gc, 0)
    const actual2 = writer.write(result2)
    expect(actual2).to.eql(expected)
  })
})
