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
 * @param {String}
 *          message User defined error message.
 * @constructor
 */
jsts.IllegalArgumentError = function(message) {
};
jsts.IllegalArgumentError = OpenLayers.Class(Error);
jsts.IllegalArgumentError.initialize = function(message) {
  this.name = 'IllegalArgumentError';
  this.message = (message || '');
};



/**
 * @constructor
 */
jsts.AbstractMethodInvocationError = function() {
};
jsts.AbstractMethodInvocationError = OpenLayers.Class(Error);
jsts.AbstractMethodInvocationError.initialize = function() {
  this.name = 'AbstractMethodInvocationError';
  this.message = 'Abstract method called, should be implemented in subclass.';
};
