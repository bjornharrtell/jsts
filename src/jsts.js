/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the MIT license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

/*jslint forin: true */


/**
 * jsts namespace
 */
jsts = {
  version: '1.11.0'
};



/**
 * @param {String} message User defined error message.
 * @constructor
 */
jsts.IllegalArgumentError = function(message) {
  this.name = 'IllegalArgumentError';
  this.message = (message || '');
};
jsts.inherit(jsts.IllegalArgumentError, Error);



/**
 * @constructor
 */
jsts.AbstractMethodInvocationError = function() {
  this.name = 'AbstractMethodInvocationError';
  this.message = 'Abstract method called, should be implemented in subclass.';
};
jsts.inherit(jsts.AbstractMethodInvocationError, Error);
