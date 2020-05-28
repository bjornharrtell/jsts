import Assert from '../util/Assert'
export default class SegmentPointComparator {
  static relativeSign(x0, x1) {
    if (x0 < x1) return -1
    if (x0 > x1) return 1
    return 0
  }
  static compare(octant, p0, p1) {
    if (p0.equals2D(p1)) return 0
    const xSign = SegmentPointComparator.relativeSign(p0.x, p1.x)
    const ySign = SegmentPointComparator.relativeSign(p0.y, p1.y)
    switch (octant) {
    case 0:
      return SegmentPointComparator.compareValue(xSign, ySign)
    case 1:
      return SegmentPointComparator.compareValue(ySign, xSign)
    case 2:
      return SegmentPointComparator.compareValue(ySign, -xSign)
    case 3:
      return SegmentPointComparator.compareValue(-xSign, ySign)
    case 4:
      return SegmentPointComparator.compareValue(-xSign, -ySign)
    case 5:
      return SegmentPointComparator.compareValue(-ySign, -xSign)
    case 6:
      return SegmentPointComparator.compareValue(-ySign, xSign)
    case 7:
      return SegmentPointComparator.compareValue(xSign, -ySign)
    }
    Assert.shouldNeverReachHere('invalid octant value')
    return 0
  }
  static compareValue(compareSign0, compareSign1) {
    if (compareSign0 < 0) return -1
    if (compareSign0 > 0) return 1
    if (compareSign1 < 0) return -1
    if (compareSign1 > 0) return 1
    return 0
  }
}
