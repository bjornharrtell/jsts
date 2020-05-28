export default class NumberUtil {
  static equalsWithTolerance(x1, x2, tolerance) {
    return Math.abs(x1 - x2) <= tolerance
  }
}
