import expect from 'expect.js'

import IsValidOp from 'jsts/org/locationtech/jts/operation/valid/IsValidOp'
import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'

describe('IsValidOp', function () {

  it('Basic valid LineString validity test', function() {
    const reader = new WKTReader()
    const g = reader.read('LINESTRING (240 190, 120 120)')
    const isValid = IsValidOp.isValid(g)
    expect(isValid).to.be.ok()
  })

  it('Basic valid Polygon validity test', function() {
    const reader = new WKTReader()
    const g = reader.read('POLYGON ((30 10, 40 40, 20 40, 10 20, 30 10))')
    const isValid = IsValidOp.isValid(g)
    expect(isValid).to.be.ok()
  })

  it('Basic invalid Polygon validity test', function() {
    const reader = new WKTReader()
    const g = reader.read('POLYGON ((0 0, 0 2, 2 0, 2 2, 0 0))')
    const isValid = IsValidOp.isValid(g)
    expect(isValid).to.not.be.ok()
  })
})
