import WKTWriter from '../../io/WKTWriter'
import CoordinateArraySequence from '../../geom/impl/CoordinateArraySequence'
import DD from '../../math/DD'
import System from '../../../../../java/lang/System'
import Triangle from '../../geom/Triangle'
export default class TrianglePredicate {
  static triArea(a, b, c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
  }
  static isInCircleDDNormalized(a, b, c, p) {
    const adx = DD.valueOf(a.x).selfSubtract(p.x)
    const ady = DD.valueOf(a.y).selfSubtract(p.y)
    const bdx = DD.valueOf(b.x).selfSubtract(p.x)
    const bdy = DD.valueOf(b.y).selfSubtract(p.y)
    const cdx = DD.valueOf(c.x).selfSubtract(p.x)
    const cdy = DD.valueOf(c.y).selfSubtract(p.y)
    const abdet = adx.multiply(bdy).selfSubtract(bdx.multiply(ady))
    const bcdet = bdx.multiply(cdy).selfSubtract(cdx.multiply(bdy))
    const cadet = cdx.multiply(ady).selfSubtract(adx.multiply(cdy))
    const alift = adx.multiply(adx).selfAdd(ady.multiply(ady))
    const blift = bdx.multiply(bdx).selfAdd(bdy.multiply(bdy))
    const clift = cdx.multiply(cdx).selfAdd(cdy.multiply(cdy))
    const sum = alift.selfMultiply(bcdet).selfAdd(blift.selfMultiply(cadet)).selfAdd(clift.selfMultiply(abdet))
    const isInCircle = sum.doubleValue() > 0
    return isInCircle
  }
  static checkRobustInCircle(a, b, c, p) {
    const nonRobustInCircle = TrianglePredicate.isInCircleNonRobust(a, b, c, p)
    const isInCircleDD = TrianglePredicate.isInCircleDDSlow(a, b, c, p)
    const isInCircleCC = TrianglePredicate.isInCircleCC(a, b, c, p)
    const circumCentre = Triangle.circumcentre(a, b, c)
    System.out.println('p radius diff a = ' + Math.abs(p.distance(circumCentre) - a.distance(circumCentre)) / a.distance(circumCentre))
    if (nonRobustInCircle !== isInCircleDD || nonRobustInCircle !== isInCircleCC) {
      System.out.println('inCircle robustness failure (double result = ' + nonRobustInCircle + ', DD result = ' + isInCircleDD + ', CC result = ' + isInCircleCC + ')')
      System.out.println(WKTWriter.toLineString(new CoordinateArraySequence([a, b, c, p])))
      System.out.println('Circumcentre = ' + WKTWriter.toPoint(circumCentre) + ' radius = ' + a.distance(circumCentre))
      System.out.println('p radius diff a = ' + Math.abs(p.distance(circumCentre) / a.distance(circumCentre) - 1))
      System.out.println('p radius diff b = ' + Math.abs(p.distance(circumCentre) / b.distance(circumCentre) - 1))
      System.out.println('p radius diff c = ' + Math.abs(p.distance(circumCentre) / c.distance(circumCentre) - 1))
      System.out.println()
    }
  }
  static isInCircleDDFast(a, b, c, p) {
    const aTerm = DD.sqr(a.x).selfAdd(DD.sqr(a.y)).selfMultiply(TrianglePredicate.triAreaDDFast(b, c, p))
    const bTerm = DD.sqr(b.x).selfAdd(DD.sqr(b.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, c, p))
    const cTerm = DD.sqr(c.x).selfAdd(DD.sqr(c.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, b, p))
    const pTerm = DD.sqr(p.x).selfAdd(DD.sqr(p.y)).selfMultiply(TrianglePredicate.triAreaDDFast(a, b, c))
    const sum = aTerm.selfSubtract(bTerm).selfAdd(cTerm).selfSubtract(pTerm)
    const isInCircle = sum.doubleValue() > 0
    return isInCircle
  }
  static isInCircleCC(a, b, c, p) {
    const cc = Triangle.circumcentre(a, b, c)
    const ccRadius = a.distance(cc)
    const pRadiusDiff = p.distance(cc) - ccRadius
    return pRadiusDiff <= 0
  }
  static isInCircleNormalized(a, b, c, p) {
    const adx = a.x - p.x
    const ady = a.y - p.y
    const bdx = b.x - p.x
    const bdy = b.y - p.y
    const cdx = c.x - p.x
    const cdy = c.y - p.y
    const abdet = adx * bdy - bdx * ady
    const bcdet = bdx * cdy - cdx * bdy
    const cadet = cdx * ady - adx * cdy
    const alift = adx * adx + ady * ady
    const blift = bdx * bdx + bdy * bdy
    const clift = cdx * cdx + cdy * cdy
    const disc = alift * bcdet + blift * cadet + clift * abdet
    return disc > 0
  }
  static isInCircleDDSlow(a, b, c, p) {
    const px = DD.valueOf(p.x)
    const py = DD.valueOf(p.y)
    const ax = DD.valueOf(a.x)
    const ay = DD.valueOf(a.y)
    const bx = DD.valueOf(b.x)
    const by = DD.valueOf(b.y)
    const cx = DD.valueOf(c.x)
    const cy = DD.valueOf(c.y)
    const aTerm = ax.multiply(ax).add(ay.multiply(ay)).multiply(TrianglePredicate.triAreaDDSlow(bx, by, cx, cy, px, py))
    const bTerm = bx.multiply(bx).add(by.multiply(by)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, cx, cy, px, py))
    const cTerm = cx.multiply(cx).add(cy.multiply(cy)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, bx, by, px, py))
    const pTerm = px.multiply(px).add(py.multiply(py)).multiply(TrianglePredicate.triAreaDDSlow(ax, ay, bx, by, cx, cy))
    const sum = aTerm.subtract(bTerm).add(cTerm).subtract(pTerm)
    const isInCircle = sum.doubleValue() > 0
    return isInCircle
  }
  static isInCircleNonRobust(a, b, c, p) {
    const isInCircle = (a.x * a.x + a.y * a.y) * TrianglePredicate.triArea(b, c, p) - (b.x * b.x + b.y * b.y) * TrianglePredicate.triArea(a, c, p) + (c.x * c.x + c.y * c.y) * TrianglePredicate.triArea(a, b, p) - (p.x * p.x + p.y * p.y) * TrianglePredicate.triArea(a, b, c) > 0
    return isInCircle
  }
  static isInCircleRobust(a, b, c, p) {
    return TrianglePredicate.isInCircleNormalized(a, b, c, p)
  }
  static triAreaDDSlow(ax, ay, bx, by, cx, cy) {
    return bx.subtract(ax).multiply(cy.subtract(ay)).subtract(by.subtract(ay).multiply(cx.subtract(ax)))
  }
  static triAreaDDFast(a, b, c) {
    const t1 = DD.valueOf(b.x).selfSubtract(a.x).selfMultiply(DD.valueOf(c.y).selfSubtract(a.y))
    const t2 = DD.valueOf(b.y).selfSubtract(a.y).selfMultiply(DD.valueOf(c.x).selfSubtract(a.x))
    return t1.selfSubtract(t2)
  }
}
