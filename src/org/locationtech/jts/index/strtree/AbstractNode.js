import Boundable from './Boundable'
import ArrayList from '../../../../../java/util/ArrayList'
import Serializable from '../../../../../java/io/Serializable'
import Assert from '../../util/Assert'
export default class AbstractNode {
  constructor() {
    AbstractNode.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._childBoundables = new ArrayList()
    this._bounds = null
    this._level = null
    if (arguments.length === 0) {} else if (arguments.length === 1) {
      const level = arguments[0]
      this._level = level
    }
  }
  getLevel() {
    return this._level
  }
  size() {
    return this._childBoundables.size()
  }
  getChildBoundables() {
    return this._childBoundables
  }
  addChildBoundable(childBoundable) {
    Assert.isTrue(this._bounds === null)
    this._childBoundables.add(childBoundable)
  }
  isEmpty() {
    return this._childBoundables.isEmpty()
  }
  getBounds() {
    if (this._bounds === null) 
      this._bounds = this.computeBounds()
    
    return this._bounds
  }
  get interfaces_() {
    return [Boundable, Serializable]
  }
}
