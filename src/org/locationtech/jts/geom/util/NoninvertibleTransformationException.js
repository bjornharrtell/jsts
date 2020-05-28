import Exception from '../../../../../java/lang/Exception'
export default class NoninvertibleTransformationException extends Exception {
  constructor() {
    super()
    NoninvertibleTransformationException.constructor_.apply(this, arguments)
  }
  static constructor_() {
    if (arguments.length === 0) {
      Exception.constructor_.call(this)
    } else if (arguments.length === 1) {
      const msg = arguments[0]
      Exception.constructor_.call(this, msg)
    }
  }
}
