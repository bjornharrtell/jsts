/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @param {MonotoneChainEdge}
 *          mce
 * @param {int}
 *          chainIndex 
 */
jsts.geomgraph.index.MonotoneChain = function(mce, chainIndex) {
  this.mce = mce;
  this.chainIndex = chainIndex;
};

/**
 * @type {MonotoneChainEdge} 
 */
jsts.geomgraph.index.MonotoneChain.prototype.mce = null;

/**
 * @type {int} 
 */
jsts.geomgraph.index.MonotoneChain.prototype.chainIndex = null;

jsts.geomgraph.index.MonotoneChain.prototype.computeIntersections = function(
    mc, si) {
  this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
};