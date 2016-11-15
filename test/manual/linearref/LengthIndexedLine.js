import expect from 'expect.js'
import Coordinate from 'org/locationtech/jts/geom/Coordinate'
import WKTReader from 'org/locationtech/jts/io/WKTReader'
import WKTWriter from 'org/locationtech/jts/io/WKTWriter'
import LengthIndexedLine from 'org/locationtech/jts/linearref/LengthIndexedLine'

const reader = new WKTReader()
const writer = new WKTWriter()

describe('LengthIndexedLine', function () {
  describe('indexOf', function () {
    it('should be able to calc start and end indexOf', function () {
      const linestring = reader.read('LINESTRING(1 1,2 2)')
      const lengthIndexedLine = new LengthIndexedLine(linestring)
      const indexOfStart = lengthIndexedLine.indexOf(new Coordinate(1, 1))
      const indexOfMid = lengthIndexedLine.indexOf(new Coordinate(1.5, 1.5))
      const indexOfEnd = lengthIndexedLine.indexOf(new Coordinate(2, 2))
      expect(indexOfStart).to.eql(0)
      expect(indexOfMid).to.eql(0.7071067811865476)
      expect(indexOfEnd).to.eql(1.4142135623730951)
    })

    it('should be able to calc start and end indexOf', function () {
      const linestring = reader.read('LINESTRING(1 1,2 2)')
      const lengthIndexedLine = new LengthIndexedLine(linestring)
      const part1 = lengthIndexedLine.extractLine(0, 0.7071067811865476)
      const part2 = lengthIndexedLine.extractLine(0.7071067811865476, 1.4142135623730951)
      expect(writer.write(part1)).to.eql('LINESTRING(1 1,1.5 1.5)')
      expect(writer.write(part2)).to.eql('LINESTRING(1.5 1.5,2 2)')
    })
  })
})
