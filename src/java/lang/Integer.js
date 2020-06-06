export default class Integer {
  constructor(value) {
    this.value = value
  }

  intValue() {
    return this.value
  }

  compareTo(o) {
    if (this.value < o)
      return -1
    if (this.value > o)
      return 1
    return 0
  }

  static compare(x, y) {
    if (x < y)
      return -1
    if (x > y)
      return 1
    return 0
  }

  static isNan(n) {
    return Number.isNaN(n)
  }

  static valueOf(value) {
    return new Integer(value)
  }
}
