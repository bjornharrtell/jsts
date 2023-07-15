import ItemVisitor from './ItemVisitor.js'
import ArrayList from '../../../../java/util/ArrayList.js'
export default class ArrayListVisitor {
  constructor() {
    ArrayListVisitor.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._items = new ArrayList()
  }
  getItems() {
    return this._items
  }
  visitItem(item) {
    this._items.add(item)
  }
  get interfaces_() {
    return [ItemVisitor]
  }
}
