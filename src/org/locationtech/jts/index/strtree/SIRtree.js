import Interval from './Interval'
import Comparator from '../../../../../java/util/Comparator'
import AbstractSTRtree from './AbstractSTRtree'
export default class SIRtree extends AbstractSTRtree {
  constructor() {
    super()
    SIRtree.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._comparator = new (class {
      get interfaces_() {
        return [Comparator]
      }
      compare(o1, o2) {
        return AbstractSTRtree.compareDoubles(o1.getBounds().getCentre(), o2.getBounds().getCentre())
      }
    })()
    this._intersectsOp = new (class {
      get interfaces_() {
        return [IntersectsOp]
      }
      intersects(aBounds, bBounds) {
        return aBounds.intersects(bBounds)
      }
    })()
    if (arguments.length === 0) {
      SIRtree.constructor_.call(this, 10)
    } else if (arguments.length === 1) {
      const nodeCapacity = arguments[0]
      AbstractSTRtree.constructor_.call(this, nodeCapacity)
    }
  }
  createNode(level) {
    return new (class {
      computeBounds() {
        let bounds = null
        for (let i = this.getChildBoundables().iterator(); i.hasNext(); ) {
          const childBoundable = i.next()
          if (bounds === null) 
            bounds = new Interval(childBoundable.getBounds())
          else 
            bounds.expandToInclude(childBoundable.getBounds())
          
        }
        return bounds
      }
    })(level)
  }
  insert() {
    if (arguments.length === 3) {
      const x1 = arguments[0], x2 = arguments[1], item = arguments[2]
      super.insert.call(this, new Interval(Math.min(x1, x2), Math.max(x1, x2)), item)
    } else {
      return super.insert.apply(this, arguments)
    }
  }
  getIntersectsOp() {
    return this._intersectsOp
  }
  query() {
    if (arguments.length === 1) {
      const x = arguments[0]
      return this.query(x, x)
    } else if (arguments.length === 2) {
      const x1 = arguments[0], x2 = arguments[1]
      return super.query.call(this, new Interval(Math.min(x1, x2), Math.max(x1, x2)))
    }
  }
  getComparator() {
    return this._comparator
  }
}
