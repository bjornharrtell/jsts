import Exception from '../../../../java/lang/Exception'
export default class NotRepresentableException extends Exception {
  constructor() {
    super()
    NotRepresentableException.constructor_.apply(this, arguments)
  }
  static constructor_() {
    Exception.constructor_.call(this, 'Projective point not representable on the Cartesian plane.')
  }
}
