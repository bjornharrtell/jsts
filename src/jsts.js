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
 * In addition to the mandatory C and P parameters, an arbitrary number of
 * objects can be passed, which will extend C.
 *
 * @param {Object}
 *          C the class that inherits P.
 * @param {Object}
 *          P the superclass to inherit from.
 */
jsts.inherit = function(C, P) {
  var F = function() {
  };
  F.prototype = P.prototype;
  C.prototype = new F();
  var i, l, o;
  for (i = 2, l = arguments.length; i < l; i++) {
    o = arguments[i];
    if (typeof o === 'function') {
      o = o.prototype;
    }
    jsts.extend(C.prototype, o);
  }
};


/**
 * Copy all properties of a source object to a destination object. Modifies the
 * passed in destination object. Any properties on the source object that are
 * set to undefined will not be (re)set on the destination object.
 *
 * @param {Object}
 *          destination The object that will be modified.
 * @param {Object}
 *          source The object with properties to be set on the destination.
 *
 * @return {Object} The destination object.
 */
jsts.extend = function(destination, source) {
  destination = destination || {};
  var property;
  if (source) {
    for (property in source) {
      var value = source[property];
      if (value !== undefined) {
        destination[property] = value;
      }
    }
  }
  return destination;
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
