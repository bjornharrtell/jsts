/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
export default function UnsupportedOperationException (message) {
  this.message = message || ''
};
UnsupportedOperationException.prototype = new Error()

/**
 * @type {string}
 */
UnsupportedOperationException.prototype.name = 'OperationNotSupported'
