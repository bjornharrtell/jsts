export default class Exception {
  constructor(message) {
    this.message = message
  }
  toString() {
    return this.message
  }
}
