import Exception from '../lang/Exception'

export default class NoSuchElementException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ NoSuchElementException })[0]
  }
}