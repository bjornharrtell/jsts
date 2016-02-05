export default class Integer {
  constructor(value) {
    this.value = value
  }
  static isNaN(n) {
    return Number.isNaN(n)
  }
  intValue() {
    return this.value
  }
  compareTo(o) {
    if (this.value < o) return -1;
    if (this.value > o) return 1;
    return 0;
  }
}
