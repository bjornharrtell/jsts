import Exception from './Exception'

export default class IllegalArgumentException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ IllegalArgumentException })[0]
  }
}
