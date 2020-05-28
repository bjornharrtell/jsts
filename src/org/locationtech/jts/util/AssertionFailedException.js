import RuntimeException from '../../../../java/lang/RuntimeException'
export default class AssertionFailedException extends RuntimeException {
  constructor() {
    super()
    AssertionFailedException.constructor_.apply(this, arguments)
  }
  static constructor_() {
    if (arguments.length === 0) {
      RuntimeException.constructor_.call(this)
    } else if (arguments.length === 1) {
      const message = arguments[0]
      RuntimeException.constructor_.call(this, message)
    }
  }
}
