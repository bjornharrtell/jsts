import Exception from './Exception.js'

export default class UnsupportedOperationException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ UnsupportedOperationException })[0]
  }
}
