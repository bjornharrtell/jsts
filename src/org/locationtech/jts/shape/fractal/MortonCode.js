import Coordinate from '../../geom/Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
export default class MortonCode {
  static deinterleave(x) {
    x = x & 0x55555555
    x = (x | x >> 1) & 0x33333333
    x = (x | x >> 2) & 0x0F0F0F0F
    x = (x | x >> 4) & 0x00FF00FF
    x = (x | x >> 8) & 0x0000FFFF
    return x
  }
  static encode(x, y) {
    return (MortonCode.interleave(y) << 1) + MortonCode.interleave(x)
  }
  static checkLevel(level) {
    if (level > MortonCode.MAX_LEVEL) 
      throw new IllegalArgumentException('Level must be in range 0 to ' + MortonCode.MAX_LEVEL)
    
  }
  static size(level) {
    MortonCode.checkLevel(level)
    return Math.trunc(Math.pow(2, 2 * level))
  }
  static maxOrdinate(level) {
    MortonCode.checkLevel(level)
    return Math.trunc(Math.pow(2, level)) - 1
  }
  static interleave(x) {
    x &= 0x0000ffff
    x = (x ^ x << 8) & 0x00ff00ff
    x = (x ^ x << 4) & 0x0f0f0f0f
    x = (x ^ x << 2) & 0x33333333
    x = (x ^ x << 1) & 0x55555555
    return x
  }
  static decode(index) {
    const x = MortonCode.deinterleave(index)
    const y = MortonCode.deinterleave(index >> 1)
    return new Coordinate(x, y)
  }
  static level(numPoints) {
    const pow2 = Math.trunc(Math.log(numPoints) / Math.log(2))
    let level = Math.trunc(pow2 / 2)
    const size = MortonCode.size(level)
    if (size < numPoints) level += 1
    return level
  }
}
MortonCode.MAX_LEVEL = 16
