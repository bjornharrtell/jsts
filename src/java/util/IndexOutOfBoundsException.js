/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
export default function IndexOutOfBoundsException (message) {
  this.message = message || ''
};
IndexOutOfBoundsException.prototype = new Error()

/**
 * @type {string}
 */
IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException'
