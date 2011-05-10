/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/*jslint forin: true */


/**
 * @namespace
 */
jsts = {
  version: '1.11-SNAPSHOT'
};


/**
 * @namespace
 */
jsts.error = {};



/**
 * @param {String}
 *          message User defined error message.
 * @constructor
 */
jsts.error.IllegalArgumentError = function(message) {
  this.name = 'IllegalArgumentError';
  this.message = (message || '');
};
jsts.error.IllegalArgumentError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.AbstractMethodInvocationError = function() {
  this.name = 'AbstractMethodInvocationError';
  this.message = 'Abstract method called, should be implemented in subclass.';
};
jsts.error.AbstractMethodInvocationError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.NotImplementedError = function() {
  this.name = 'NotImplementedError';
  this.message = 'This method has not yet been implemented.';
};
jsts.error.NotImplementedError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.NotRepresentableError = function(message) {
  this.name = 'NotRepresentableError';
  this.message = (message || '');
};
jsts.error.NotRepresentableError.prototype = new Error();
