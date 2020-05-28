import Boundable from './Boundable'
import Serializable from '../../../../../java/io/Serializable'
export default class ItemBoundable {
  constructor() {
    ItemBoundable.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._bounds = null
    this._item = null
    const bounds = arguments[0], item = arguments[1]
    this._bounds = bounds
    this._item = item
  }
  getItem() {
    return this._item
  }
  getBounds() {
    return this._bounds
  }
  get interfaces_() {
    return [Boundable, Serializable]
  }
}
