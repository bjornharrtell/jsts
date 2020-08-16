export default class Exception extends Error {
  constructor(message) {
    super(message)
    this.name = Object.keys({ Exception })[0]
  }
  toString() {
    return this.message
  }
}
