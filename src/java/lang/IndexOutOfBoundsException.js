import Exception from './Exception'

export default class IndexOutOfBoundsException extends Exception {
  constructor(message) {
    super(message)
    this.name = Object.keys({ IndexOutOfBoundsException })[0]
  } 
}