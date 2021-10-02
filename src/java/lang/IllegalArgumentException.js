import Exception from './Exception.js'

export default class IllegalArgumentException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ IllegalArgumentException })[0]
  }
}
