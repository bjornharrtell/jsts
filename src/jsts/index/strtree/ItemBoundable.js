/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Boundable wrapper for a non-Boundable spatial object. Used internally by
 * AbstractSTRtree.
 *
 * @version 1.7
 */



/**
 * @param {Object} bounds
 * @param {Object} item
 * @extends {jsts.index.strtree.Boundable}
 * @constructor
 */
jsts.index.strtree.ItemBoundable = function(bounds, item) {
  this.bounds = bounds;
  this.item = item;
};

OpenLayers.inherit(jsts.index.strtree.ItemBoundable, jsts.index.strtree.Boundable);


/**
 * @type {Object}
 * @private
 */
jsts.index.strtree.ItemBoundable.prototype.bounds;


/**
 * @type {Object}
 * @private
 */
jsts.index.strtree.ItemBoundable.prototype.item;


/**
 * @return {Object}
 * @public
 */
jsts.index.strtree.ItemBoundable.prototype.getBounds = function() {
  return this.bounds;
};


/**
 * @return {Object}
 * @public
 */
jsts.index.strtree.ItemBoundable.prototype.getItem = function() {
  return this.item;
};
