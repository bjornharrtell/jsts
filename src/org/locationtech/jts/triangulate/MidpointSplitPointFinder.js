import Coordinate from '../geom/Coordinate'
import ConstraintSplitPointFinder from './ConstraintSplitPointFinder'
export default class MidpointSplitPointFinder {
  constructor () {
    MidpointSplitPointFinder.constructor_.apply(this, arguments)
  }

  findSplitPoint (seg, encroachPt) {
    const p0 = seg.getStart()
    const p1 = seg.getEnd()
    return new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
  }

  getClass () {
    return MidpointSplitPointFinder
  }

  get interfaces_ () {
    return [ConstraintSplitPointFinder]
  }
}
MidpointSplitPointFinder.constructor_ = function () {}
