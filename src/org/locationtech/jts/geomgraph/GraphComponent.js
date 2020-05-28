import Assert from '../util/Assert'
export default class GraphComponent {
  constructor() {
    GraphComponent.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._label = null
    this._isInResult = false
    this._isCovered = false
    this._isCoveredSet = false
    this._isVisited = false
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const label = arguments[0]
      this._label = label
    }
  }
  setVisited(isVisited) {
    this._isVisited = isVisited
  }
  setInResult(isInResult) {
    this._isInResult = isInResult
  }
  isCovered() {
    return this._isCovered
  }
  isCoveredSet() {
    return this._isCoveredSet
  }
  setLabel(label) {
    this._label = label
  }
  getLabel() {
    return this._label
  }
  setCovered(isCovered) {
    this._isCovered = isCovered
    this._isCoveredSet = true
  }
  updateIM(im) {
    Assert.isTrue(this._label.getGeometryCount() >= 2, 'found partial label')
    this.computeIM(im)
  }
  isInResult() {
    return this._isInResult
  }
  isVisited() {
    return this._isVisited
  }
}
