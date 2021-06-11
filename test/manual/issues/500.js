


import expect from 'expect.js'

import WKTReader from 'jsts/org/locationtech/jts/io/WKTReader'
import IsValidOp from 'jsts/org/locationtech/jts/operation/valid/IsValidOp'

describe('Test (#500)', function() {
  it('should identify bow-tie as invalid', function() {
    const reader = new WKTReader()
    const input = 'POLYGON((707810.6501649775 6203839.710451188,707667.9370024777 6203832.7841332685,707819.3148635529 6203756.570151922,707667.4663610795 6203750.476297979,707810.6501649775 6203839.710451188))'
    const p = reader.read(input)
    const result = IsValidOp.isValid(p)
    expect(result).to.equal(false)
  })
})
