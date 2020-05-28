export default class Item {
  constructor() {
    Item.constructor_.apply(this, arguments)
  }
  static constructor_() {
    this._env = null
    this._item = null
    const env = arguments[0], item = arguments[1]
    this._env = env
    this._item = item
  }
  getEnvelope() {
    return this._env
  }
  getItem() {
    return this._item
  }
  toString() {
    return 'Item: ' + this._env.toString()
  }
}
