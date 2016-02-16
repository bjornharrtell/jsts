/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
export default function OperationNotSupported(message) {
  this.message = message || '';
};
OperationNotSupported.prototype = new Error();


/**
 * @type {string}
 */
OperationNotSupported.prototype.name = 'OperationNotSupported';
