/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * A contiguous portion of 1D-space. Used internally by SIRtree.
 * @see SIRtree
 *
 * @version 1.7
 */



/**
 * @param {jsts.index.strtree.Interval} [other].
 * @param {number} [min].
 * @param {number} [max].
 * @constructor
 */
jsts.index.strtree.Interval = function() {
  var other;
  if (arguments.length == 1) {
    other = arguments[0];
    return jsts.index.strtree.Interval(other.min, other.max);
  }
  else if (arguments.length == 1) {
    //TODO: Implement Assert.isTrue?
    this.min = arguments[0];
    this.max = arguments[1];
  }
};


/**
 * @type {number}
 * @private
 */
jsts.index.strtree.Interval.prototype.min;


/**
 * @type {number}
 * @private
 */
jsts.index.strtree.Interval.prototype.max;


/**
 * @return {number}
 * @public
 */
jsts.index.strtree.Interval.prototype.getCentre = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {jsts.index.strtree.Interval} other
 * @return {jsts.index.strtree.Interval} this.
 * @public
 */
jsts.index.strtree.Interval.prototype.expandToInclude = function(other) {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {jsts.index.strtree.Interval} other
 * @return {boolean}
 * @public
 */
jsts.index.strtree.Interval.prototype.intersects = function(other) {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {Object} o
 * @return {boolean}
 * @public
 */
jsts.index.strtree.Interval.prototype.equals = function(o) {
  throw new jsts.error.NotImplementedError();
};
