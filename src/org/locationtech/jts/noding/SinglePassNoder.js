import Noder from './Noder'
export default class SinglePassNoder {
  constructor() {
    SinglePassNoder.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._segInt = null
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const segInt = arguments[0]
      this.setSegmentIntersector(segInt)
    }
  }
  setSegmentIntersector(segInt) {
    this._segInt = segInt
  }
  get interfaces_() {
    return [Noder]
  }
}
