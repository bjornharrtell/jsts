export default class Item {
  constructor () {
    Item.constructor_.apply(this, arguments)
  }

  getEnvelope () {
    return this._env
  }

  getItem () {
    return this._item
  }

  toString () {
    return 'Item: ' + this._env.toString()
  }

  getClass () {
    return Item
  }

  get interfaces_ () {
    return []
  }
}
Item.constructor_ = function () {
  this._env = null
  this._item = null
  const env = arguments[0]; const item = arguments[1]
  this._env = env
  this._item = item
}
