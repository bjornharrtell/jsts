/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
export default function EmptyStackException(message) {
  this.message = message || '';
};
EmptyStackException.prototype = new Error();


/**
 * @type {string}
 */
EmptyStackException.prototype.name = 'EmptyStackException';
