export default class MonotoneChain {
  constructor() {
    MonotoneChain.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.mce = null
    this.chainIndex = null
    const mce = arguments[0], chainIndex = arguments[1]
    this.mce = mce
    this.chainIndex = chainIndex
  }
  computeIntersections(mc, si) {
    this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si)
  }
}
