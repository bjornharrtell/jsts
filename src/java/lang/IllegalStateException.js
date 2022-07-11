import Exception from './Exception.js'

export default class IllegalStateException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ IllegalStateException })[0]
  }
}
