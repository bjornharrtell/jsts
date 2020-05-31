export default class Exception {
  message
  constructor(message) {
    this.message = message
  }
  toString() {
    return this.message
  }
}
