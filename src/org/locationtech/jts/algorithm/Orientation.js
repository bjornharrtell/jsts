import hasInterface from '../../../../hasInterface'
import IllegalArgumentException from '../../../../java/lang/IllegalArgumentException'
import CGAlgorithmsDD from './CGAlgorithmsDD'
import CoordinateSequence from '../geom/CoordinateSequence'
export default class Orientation {
  static index(p1, p2, q) {
    return CGAlgorithmsDD.orientationIndex(p1, p2, q)
  }
  static isCCW() {
    if (arguments[0] instanceof Array) {
      const ring = arguments[0]
      const nPts = ring.length - 1
      if (nPts < 3) throw new IllegalArgumentException('Ring has fewer than 4 points, so orientation cannot be determined')
      let hiPt = ring[0]
      let hiIndex = 0
      for (let i = 1; i <= nPts; i++) {
        const p = ring[i]
        if (p.y > hiPt.y) {
          hiPt = p
          hiIndex = i
        }
      }
      let iPrev = hiIndex
      do {
        iPrev = iPrev - 1
        if (iPrev < 0) iPrev = nPts
      } while (ring[iPrev].equals2D(hiPt) && iPrev !== hiIndex)
      let iNext = hiIndex
      do 
        iNext = (iNext + 1) % nPts
      while (ring[iNext].equals2D(hiPt) && iNext !== hiIndex)
      const prev = ring[iPrev]
      const next = ring[iNext]
      if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) return false
      const disc = Orientation.index(prev, hiPt, next)
      let isCCW = null
      if (disc === 0) 
        isCCW = prev.x > next.x
      else 
        isCCW = disc > 0
      
      return isCCW
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      const ring = arguments[0]
      const nPts = ring.size() - 1
      if (nPts < 3) throw new IllegalArgumentException('Ring has fewer than 4 points, so orientation cannot be determined')
      let hiPt = ring.getCoordinate(0)
      let hiIndex = 0
      for (let i = 1; i <= nPts; i++) {
        const p = ring.getCoordinate(i)
        if (p.y > hiPt.y) {
          hiPt = p
          hiIndex = i
        }
      }
      let prev = null
      let iPrev = hiIndex
      do {
        iPrev = iPrev - 1
        if (iPrev < 0) iPrev = nPts
        prev = ring.getCoordinate(iPrev)
      } while (prev.equals2D(hiPt) && iPrev !== hiIndex)
      let next = null
      let iNext = hiIndex
      do {
        iNext = (iNext + 1) % nPts
        next = ring.getCoordinate(iNext)
      } while (next.equals2D(hiPt) && iNext !== hiIndex)
      if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) return false
      const disc = Orientation.index(prev, hiPt, next)
      let isCCW = null
      if (disc === 0) 
        isCCW = prev.x > next.x
      else 
        isCCW = disc > 0
      
      return isCCW
    }
  }
}
Orientation.CLOCKWISE = -1
Orientation.RIGHT = Orientation.CLOCKWISE
Orientation.COUNTERCLOCKWISE = 1
Orientation.LEFT = Orientation.COUNTERCLOCKWISE
Orientation.COLLINEAR = 0
Orientation.STRAIGHT = Orientation.COLLINEAR
