export default class Integer {
  #value
  constructor(value) {
    this.#value = value
  }
  intValue () {
    return this.#value
  }
  compareTo (o) {
    if (this.#value < o) return -1
    if (this.#value > o) return 1
    return 0
  }
  static isNan(n) {
    return Number.isNaN(n)
  }
}