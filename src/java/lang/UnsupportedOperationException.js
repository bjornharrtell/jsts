import Exception from './Exception'

export default class UnsupportedOperationException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ UnsupportedOperationException })[0]
  }
}
