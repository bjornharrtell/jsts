import IllegalArgumentException from '../../../../../java/lang/IllegalArgumentException'
import AbstractNode from './AbstractNode'
import EnvelopeDistance from './EnvelopeDistance'
import Comparable from '../../../../../java/lang/Comparable'
export default class BoundablePair {
  constructor() {
    BoundablePair.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._boundable1 = null
    this._boundable2 = null
    this._distance = null
    this._itemDistance = null
    const boundable1 = arguments[0], boundable2 = arguments[1], itemDistance = arguments[2]
    this._boundable1 = boundable1
    this._boundable2 = boundable2
    this._itemDistance = itemDistance
    this._distance = this.distance()
  }
  static area(b) {
    return b.getBounds().getArea()
  }
  static isComposite(item) {
    return item instanceof AbstractNode
  }
  maximumDistance() {
    return EnvelopeDistance.maximumDistance(this._boundable1.getBounds(), this._boundable2.getBounds())
  }
  expandToQueue(priQ, minDistance) {
    const isComp1 = BoundablePair.isComposite(this._boundable1)
    const isComp2 = BoundablePair.isComposite(this._boundable2)
    if (isComp1 && isComp2) {
      if (BoundablePair.area(this._boundable1) > BoundablePair.area(this._boundable2)) {
        this.expand(this._boundable1, this._boundable2, false, priQ, minDistance)
        return null
      } else {
        this.expand(this._boundable2, this._boundable1, true, priQ, minDistance)
        return null
      }
    } else if (isComp1) {
      this.expand(this._boundable1, this._boundable2, false, priQ, minDistance)
      return null
    } else if (isComp2) {
      this.expand(this._boundable2, this._boundable1, true, priQ, minDistance)
      return null
    }
    throw new IllegalArgumentException('neither boundable is composite')
  }
  isLeaves() {
    return !(BoundablePair.isComposite(this._boundable1) || BoundablePair.isComposite(this._boundable2))
  }
  compareTo(o) {
    const nd = o
    if (this._distance < nd._distance) return -1
    if (this._distance > nd._distance) return 1
    return 0
  }
  expand(bndComposite, bndOther, isFlipped, priQ, minDistance) {
    const children = bndComposite.getChildBoundables()
    for (let i = children.iterator(); i.hasNext(); ) {
      const child = i.next()
      let bp = null
      if (isFlipped) 
        bp = new BoundablePair(bndOther, child, this._itemDistance)
      else 
        bp = new BoundablePair(child, bndOther, this._itemDistance)
      
      if (bp.getDistance() < minDistance) 
        priQ.add(bp)
      
    }
  }
  getBoundable(i) {
    if (i === 0) return this._boundable1
    return this._boundable2
  }
  getDistance() {
    return this._distance
  }
  distance() {
    if (this.isLeaves()) 
      return this._itemDistance.distance(this._boundable1, this._boundable2)
    
    return this._boundable1.getBounds().distance(this._boundable2.getBounds())
  }
  get interfaces_() {
    return [Comparable]
  }
}
