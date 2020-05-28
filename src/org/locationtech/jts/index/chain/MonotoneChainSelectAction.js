import LineSegment from '../../geom/LineSegment'
export default class MonotoneChainSelectAction {
  constructor() {
    MonotoneChainSelectAction.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this.selectedSegment = new LineSegment()
  }
  select() {
    if (arguments.length === 1) {
      const seg = arguments[0]
    } else if (arguments.length === 2) {
      const mc = arguments[0], startIndex = arguments[1]
      mc.getLineSegment(startIndex, this.selectedSegment)
      this.select(this.selectedSegment)
    }
  }
}
