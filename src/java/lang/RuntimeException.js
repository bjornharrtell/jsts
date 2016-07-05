export default function RuntimeException (message) {
  this.name = 'RuntimeException'
  this.message = message
  this.stack = (new Error()).stack
  Error.call(this, message)
}

RuntimeException.prototype = Object.create(Error.prototype)
RuntimeException.prototype.constructor = Error
