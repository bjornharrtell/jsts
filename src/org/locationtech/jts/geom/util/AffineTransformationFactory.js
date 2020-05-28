import Coordinate from '../Coordinate'
import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import AffineTransformation from './AffineTransformation'
import AffineTransformationBuilder from './AffineTransformationBuilder'
import Angle from '../../algorithm/Angle'
export default class AffineTransformationFactory {
  static createFromBaseLines(src0, src1, dest0, dest1) {
    const rotPt = new Coordinate(src0.x + dest1.x - dest0.x, src0.y + dest1.y - dest0.y)
    const ang = Angle.angleBetweenOriented(src1, src0, rotPt)
    const srcDist = src1.distance(src0)
    const destDist = dest1.distance(dest0)
    if (srcDist === 0.0) return new AffineTransformation()
    const scale = destDist / srcDist
    const trans = AffineTransformation.translationInstance(-src0.x, -src0.y)
    trans.rotate(ang)
    trans.scale(scale, scale)
    trans.translate(dest0.x, dest0.y)
    return trans
  }
  static createFromControlVectors() {
    if (arguments.length === 2) {
      if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
        const src0 = arguments[0], dest0 = arguments[1]
        const dx = dest0.x - src0.x
        const dy = dest0.y - src0.y
        return AffineTransformation.translationInstance(dx, dy)
      } else if (arguments[0] instanceof Array && arguments[1] instanceof Array) {
        const src = arguments[0], dest = arguments[1]
        if (src.length !== dest.length) throw new IllegalArgumentException('Src and Dest arrays are not the same length')
        if (src.length <= 0) throw new IllegalArgumentException('Too few control points')
        if (src.length > 3) throw new IllegalArgumentException('Too many control points')
        if (src.length === 1) return AffineTransformationFactory.createFromControlVectors(src[0], dest[0])
        if (src.length === 2) return AffineTransformationFactory.createFromControlVectors(src[0], src[1], dest[0], dest[1])
        return AffineTransformationFactory.createFromControlVectors(src[0], src[1], src[2], dest[0], dest[1], dest[2])
      }
    } else if (arguments.length === 4) {
      const src0 = arguments[0], src1 = arguments[1], dest0 = arguments[2], dest1 = arguments[3]
      const rotPt = new Coordinate(dest1.x - dest0.x, dest1.y - dest0.y)
      const ang = Angle.angleBetweenOriented(src1, src0, rotPt)
      const srcDist = src1.distance(src0)
      const destDist = dest1.distance(dest0)
      if (srcDist === 0.0) return null
      const scale = destDist / srcDist
      const trans = AffineTransformation.translationInstance(-src0.x, -src0.y)
      trans.rotate(ang)
      trans.scale(scale, scale)
      trans.translate(dest0.x, dest0.y)
      return trans
    } else if (arguments.length === 6) {
      const src0 = arguments[0], src1 = arguments[1], src2 = arguments[2], dest0 = arguments[3], dest1 = arguments[4], dest2 = arguments[5]
      const builder = new AffineTransformationBuilder(src0, src1, src2, dest0, dest1, dest2)
      return builder.getTransformation()
    }
  }
}
