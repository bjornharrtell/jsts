import Exception from './Exception'

export default class RuntimeException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ RuntimeException })[0]
  }
}
