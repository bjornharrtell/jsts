import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
export default class HilbertCode {
  static deinterleave(x) {
    x = x & 0x55555555
    x = (x | x >> 1) & 0x33333333
    x = (x | x >> 2) & 0x0F0F0F0F
    x = (x | x >> 4) & 0x00FF00FF
    x = (x | x >> 8) & 0x0000FFFF
    return x
  }
  static encode(level, x, y) {
    const lvl = HilbertCode.levelClamp(level)
    x = x << 16 - lvl
    y = y << 16 - lvl
    let a = x ^ y
    let b = 0xFFFF ^ a
    let c = 0xFFFF ^ (x | y)
    let d = x & (y ^ 0xFFFF)
    let A = a | b >> 1
    let B = a >> 1 ^ a
    let C = c >> 1 ^ b & d >> 1 ^ c
    let D = a & c >> 1 ^ d >> 1 ^ d
    a = A
    b = B
    c = C
    d = D
    A = a & a >> 2 ^ b & b >> 2
    B = a & b >> 2 ^ b & (a ^ b) >> 2
    C ^= a & c >> 2 ^ b & d >> 2
    D ^= b & c >> 2 ^ (a ^ b) & d >> 2
    a = A
    b = B
    c = C
    d = D
    A = a & a >> 4 ^ b & b >> 4
    B = a & b >> 4 ^ b & (a ^ b) >> 4
    C ^= a & c >> 4 ^ b & d >> 4
    D ^= b & c >> 4 ^ (a ^ b) & d >> 4
    a = A
    b = B
    c = C
    d = D
    C ^= a & c >> 8 ^ b & d >> 8
    D ^= b & c >> 8 ^ (a ^ b) & d >> 8
    a = C ^ C >> 1
    b = D ^ D >> 1
    let i0 = x ^ y
    let i1 = b | 0xFFFF ^ (i0 | a)
    i0 = (i0 | i0 << 8) & 0x00FF00FF
    i0 = (i0 | i0 << 4) & 0x0F0F0F0F
    i0 = (i0 | i0 << 2) & 0x33333333
    i0 = (i0 | i0 << 1) & 0x55555555
    i1 = (i1 | i1 << 8) & 0x00FF00FF
    i1 = (i1 | i1 << 4) & 0x0F0F0F0F
    i1 = (i1 | i1 << 2) & 0x33333333
    i1 = (i1 | i1 << 1) & 0x55555555
    const index = (i1 << 1 | i0) >> 32 - 2 * lvl
    return Math.trunc(index)
  }
  static checkLevel(level) {
    if (level > HilbertCode.MAX_LEVEL) 
      throw new IllegalArgumentException('Level must be in range 0 to ' + HilbertCode.MAX_LEVEL)
    
  }
  static size(level) {
    HilbertCode.checkLevel(level)
    return Math.trunc(Math.pow(2, 2 * level))
  }
  static maxOrdinate(level) {
    HilbertCode.checkLevel(level)
    return Math.trunc(Math.pow(2, level)) - 1
  }
  static prefixScan(x) {
    x = x >> 8 ^ x
    x = x >> 4 ^ x
    x = x >> 2 ^ x
    x = x >> 1 ^ x
    return x
  }
  static decode(level, index) {
    HilbertCode.checkLevel(level)
    const lvl = HilbertCode.levelClamp(level)
    index = index << 32 - 2 * lvl
    const i0 = HilbertCode.deinterleave(index)
    const i1 = HilbertCode.deinterleave(index >> 1)
    const t0 = (i0 | i1) ^ 0xFFFF
    const t1 = i0 & i1
    const prefixT0 = HilbertCode.prefixScan(t0)
    const prefixT1 = HilbertCode.prefixScan(t1)
    const a = (i0 ^ 0xFFFF) & prefixT1 | i0 & prefixT0
    const x = (a ^ i1) >> 16 - lvl
    const y = (a ^ i0 ^ i1) >> 16 - lvl
    return new Coordinate(x, y)
  }
  static levelClamp(level) {
    let lvl = level < 1 ? 1 : level
    lvl = lvl > HilbertCode.MAX_LEVEL ? HilbertCode.MAX_LEVEL : lvl
    return lvl
  }
  static level(numPoints) {
    const pow2 = Math.trunc(Math.log(numPoints) / Math.log(2))
    let level = Math.trunc(pow2 / 2)
    const size = HilbertCode.size(level)
    if (size < numPoints) level += 1
    return level
  }
}
HilbertCode.MAX_LEVEL = 16
