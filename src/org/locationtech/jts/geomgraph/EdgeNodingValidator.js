import BasicSegmentString from '../noding/BasicSegmentString'
import FastNodingValidator from '../noding/FastNodingValidator'
import ArrayList from '../../../../java/util/ArrayList'
export default class EdgeNodingValidator {
  constructor() {
    EdgeNodingValidator.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._nv = null
    const edges = arguments[0]
    this._nv = new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges))
  }
  static toSegmentStrings(edges) {
    const segStrings = new ArrayList()
    for (let i = edges.iterator(); i.hasNext(); ) {
      const e = i.next()
      segStrings.add(new BasicSegmentString(e.getCoordinates(), e))
    }
    return segStrings
  }
  static checkValid(edges) {
    const validator = new EdgeNodingValidator(edges)
    validator.checkValid()
  }
  checkValid() {
    this._nv.checkValid()
  }
}
