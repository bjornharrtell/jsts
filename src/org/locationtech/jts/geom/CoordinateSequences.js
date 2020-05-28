import hasInterface from '../../../../hasInterface'
import Coordinate from './Coordinate'
import Double from '../../../../java/lang/Double'
import CoordinateSequence from './CoordinateSequence'
export default class CoordinateSequences {
  static copyCoord(src, srcPos, dest, destPos) {
    const minDim = Math.min(src.getDimension(), dest.getDimension())
    for (let dim = 0; dim < minDim; dim++) 
      dest.setOrdinate(destPos, dim, src.getOrdinate(srcPos, dim))
    
  }
  static isRing(seq) {
    const n = seq.size()
    if (n === 0) return true
    if (n <= 3) return false
    return seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y)
  }
  static scroll() {
    if (arguments.length === 2) {
      if (hasInterface(arguments[0], CoordinateSequence) && Number.isInteger(arguments[1])) {
        const seq = arguments[0], indexOfFirstCoordinate = arguments[1]
        CoordinateSequences.scroll(seq, indexOfFirstCoordinate, CoordinateSequences.isRing(seq))
      } else if (hasInterface(arguments[0], CoordinateSequence) && arguments[1] instanceof Coordinate) {
        const seq = arguments[0], firstCoordinate = arguments[1]
        const i = CoordinateSequences.indexOf(firstCoordinate, seq)
        if (i <= 0) return null
        CoordinateSequences.scroll(seq, i)
      }
    } else if (arguments.length === 3) {
      const seq = arguments[0], indexOfFirstCoordinate = arguments[1], ensureRing = arguments[2]
      const i = indexOfFirstCoordinate
      if (i <= 0) return null
      const copy = seq.copy()
      const last = ensureRing ? seq.size() - 1 : seq.size()
      for (let j = 0; j < last; j++) 
        for (let k = 0; k < seq.getDimension(); k++) seq.setOrdinate(j, k, copy.getOrdinate((indexOfFirstCoordinate + j) % last, k))
      
      if (ensureRing) 
        for (let k = 0; k < seq.getDimension(); k++) seq.setOrdinate(last, k, seq.getOrdinate(0, k))
      
    }
  }
  static isEqual(cs1, cs2) {
    const cs1Size = cs1.size()
    const cs2Size = cs2.size()
    if (cs1Size !== cs2Size) return false
    const dim = Math.min(cs1.getDimension(), cs2.getDimension())
    for (let i = 0; i < cs1Size; i++) 
      for (let d = 0; d < dim; d++) {
        const v1 = cs1.getOrdinate(i, d)
        const v2 = cs2.getOrdinate(i, d)
        if (cs1.getOrdinate(i, d) === cs2.getOrdinate(i, d)) continue
        if (Double.isNaN(v1) && Double.isNaN(v2)) continue
        return false
      }
    
    return true
  }
  static minCoordinateIndex() {
    if (arguments.length === 1) {
      const seq = arguments[0]
      return CoordinateSequences.minCoordinateIndex(seq, 0, seq.size() - 1)
    } else if (arguments.length === 3) {
      const seq = arguments[0], from = arguments[1], to = arguments[2]
      let minCoordIndex = -1
      let minCoord = null
      for (let i = from; i <= to; i++) {
        const testCoord = seq.getCoordinate(i)
        if (minCoord === null || minCoord.compareTo(testCoord) > 0) {
          minCoord = testCoord
          minCoordIndex = i
        }
      }
      return minCoordIndex
    }
  }
  static extend(fact, seq, size) {
    const newseq = fact.create(size, seq.getDimension())
    const n = seq.size()
    CoordinateSequences.copy(seq, 0, newseq, 0, n)
    if (n > 0) 
      for (let i = n; i < size; i++) CoordinateSequences.copy(seq, n - 1, newseq, i, 1)
    
    return newseq
  }
  static reverse(seq) {
    const last = seq.size() - 1
    const mid = Math.trunc(last / 2)
    for (let i = 0; i <= mid; i++) 
      CoordinateSequences.swap(seq, i, last - i)
    
  }
  static swap(seq, i, j) {
    if (i === j) return null
    for (let dim = 0; dim < seq.getDimension(); dim++) {
      const tmp = seq.getOrdinate(i, dim)
      seq.setOrdinate(i, dim, seq.getOrdinate(j, dim))
      seq.setOrdinate(j, dim, tmp)
    }
  }
  static copy(src, srcPos, dest, destPos, length) {
    for (let i = 0; i < length; i++) 
      CoordinateSequences.copyCoord(src, srcPos + i, dest, destPos + i)
    
  }
  static ensureValidRing(fact, seq) {
    const n = seq.size()
    if (n === 0) return seq
    if (n <= 3) return CoordinateSequences.createClosedRing(fact, seq, 4)
    const isClosed = seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y)
    if (isClosed) return seq
    return CoordinateSequences.createClosedRing(fact, seq, n + 1)
  }
  static indexOf(coordinate, seq) {
    for (let i = 0; i < seq.size(); i++) 
      if (coordinate.x === seq.getOrdinate(i, CoordinateSequence.X) && coordinate.y === seq.getOrdinate(i, CoordinateSequence.Y)) 
        return i
      
    
    return -1
  }
  static createClosedRing(fact, seq, size) {
    const newseq = fact.create(size, seq.getDimension())
    const n = seq.size()
    CoordinateSequences.copy(seq, 0, newseq, 0, n)
    for (let i = n; i < size; i++) CoordinateSequences.copy(seq, 0, newseq, i, 1)
    return newseq
  }
  static minCoordinate(seq) {
    let minCoord = null
    for (let i = 0; i < seq.size(); i++) {
      const testCoord = seq.getCoordinate(i)
      if (minCoord === null || minCoord.compareTo(testCoord) > 0) 
        minCoord = testCoord
      
    }
    return minCoord
  }
}
