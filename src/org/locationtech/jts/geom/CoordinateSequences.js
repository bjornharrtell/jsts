import hasInterface from '../../../../hasInterface'
import StringUtil from '../util/StringUtil'
import Double from '../../../../java/lang/Double'
import CoordinateSequence from './CoordinateSequence'
import StringBuilder from '../../../../java/lang/StringBuilder'
export default class CoordinateSequences {
  constructor () {
    CoordinateSequences.constructor_.apply(this, arguments)
  }

  static copyCoord (src, srcPos, dest, destPos) {
    const minDim = Math.min(src.getDimension(), dest.getDimension())
    for (let dim = 0; dim < minDim; dim++) {
      dest.setOrdinate(destPos, dim, src.getOrdinate(srcPos, dim))
    }
  }

  static isRing (seq) {
    const n = seq.size()
    if (n === 0) return true
    if (n <= 3) return false
    return seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y)
  }

  static isEqual (cs1, cs2) {
    const cs1Size = cs1.size()
    const cs2Size = cs2.size()
    if (cs1Size !== cs2Size) return false
    const dim = Math.min(cs1.getDimension(), cs2.getDimension())
    for (let i = 0; i < cs1Size; i++) {
      for (let d = 0; d < dim; d++) {
        const v1 = cs1.getOrdinate(i, d)
        const v2 = cs2.getOrdinate(i, d)
        if (cs1.getOrdinate(i, d) === cs2.getOrdinate(i, d)) continue
        if (Double.isNaN(v1) && Double.isNaN(v2)) continue
        return false
      }
    }
    return true
  }

  static extend (fact, seq, size) {
    const newseq = fact.create(size, seq.getDimension())
    const n = seq.size()
    CoordinateSequences.copy(seq, 0, newseq, 0, n)
    if (n > 0) {
      for (let i = n; i < size; i++) CoordinateSequences.copy(seq, n - 1, newseq, i, 1)
    }
    return newseq
  }

  static reverse (seq) {
    const last = seq.size() - 1
    const mid = Math.trunc(last / 2)
    for (let i = 0; i <= mid; i++) {
      CoordinateSequences.swap(seq, i, last - i)
    }
  }

  static swap (seq, i, j) {
    if (i === j) return null
    for (let dim = 0; dim < seq.getDimension(); dim++) {
      const tmp = seq.getOrdinate(i, dim)
      seq.setOrdinate(i, dim, seq.getOrdinate(j, dim))
      seq.setOrdinate(j, dim, tmp)
    }
  }

  static copy (src, srcPos, dest, destPos, length) {
    for (let i = 0; i < length; i++) {
      CoordinateSequences.copyCoord(src, srcPos + i, dest, destPos + i)
    }
  }

  static toString () {
    if (arguments.length === 1 && hasInterface(arguments[0], CoordinateSequence)) {
      const cs = arguments[0]
      const size = cs.size()
      if (size === 0) return '()'
      const dim = cs.getDimension()
      const builder = new StringBuilder()
      builder.append('(')
      for (let i = 0; i < size; i++) {
        if (i > 0) builder.append(' ')
        for (let d = 0; d < dim; d++) {
          if (d > 0) builder.append(',')
          builder.append(StringUtil.toString(cs.getOrdinate(i, d)))
        }
      }
      builder.append(')')
      return builder.toString()
    }
  }

  static ensureValidRing (fact, seq) {
    const n = seq.size()
    if (n === 0) return seq
    if (n <= 3) return CoordinateSequences.createClosedRing(fact, seq, 4)
    const isClosed = seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y)
    if (isClosed) return seq
    return CoordinateSequences.createClosedRing(fact, seq, n + 1)
  }

  static createClosedRing (fact, seq, size) {
    const newseq = fact.create(size, seq.getDimension())
    const n = seq.size()
    CoordinateSequences.copy(seq, 0, newseq, 0, n)
    for (let i = n; i < size; i++) CoordinateSequences.copy(seq, 0, newseq, i, 1)
    return newseq
  }

  getClass () {
    return CoordinateSequences
  }

  get interfaces_ () {
    return []
  }
}
CoordinateSequences.constructor_ = function () {}
