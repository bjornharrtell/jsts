import Exception from './Exception.js'

export default class RuntimeException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ RuntimeException })[0]
  }
}
