export default class StringBuffer {
  constructor(str) {
    this.str = str
  }
  append(e) {
    this.str += e
  }
  setCharAt(i, c) {
    this.str = this.str.substr(0, i) + c + this.str.substr(i + 1)
  }
  toString() {
    return this.str
  }
}