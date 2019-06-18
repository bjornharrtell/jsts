/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
export default function NoSuchElementException (message) {
  this.message = message || ''
};
NoSuchElementException.prototype = new Error()

/**
 * @type {string}
 */
NoSuchElementException.prototype.name = 'NoSuchElementException'
