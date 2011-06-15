/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 *  A query-only R-tree created using the Sort-Tile-Recursive (STR) algorithm.
 *  For two-dimensional spatial data.
 * <P>
 *  The STR packed R-tree is simple to implement and maximizes space
 *  utilization; that is, as many leaves as possible are filled to capacity.
 *  Overlap between nodes is far less than in a basic R-tree. However, once the
 *  tree has been built (explicitly or on the first call to #query), items may
 *  not be added or removed.
 * <P>
 * Described in: P. Rigaux, Michel Scholl and Agnes Voisard.
 * <i>Spatial Databases With Application To GIS</i>.
 * Morgan Kaufmann, San Francisco, 2002.
 *
 * @version 1.7
 */



/**
 * Constructs an STRtree with the default node capacity or with the
 * given maximum number of child nodes that a node may have.
 * <p>
 * The minimum recommended capacity setting is 4.
 *
 *
 * @param {number} [nodeCapacity].
 * @extends {jsts.index.strtree.AbstractSTRtree}
 * @extends {jsts.index.SpatialIndex}
 * @constructor
 */
jsts.index.strtree.STRtree = function(nodeCapacity) {
  nodeCapacity = nodeCapacity || jsts.index.strtree.STRtree.DEFAULT_NODE_CAPACITY;
  jsts.index.strtree.AbstractSTRtree.call(this, nodeCapacity);
};

OpenLayers.inherit(jsts.index.strtree.STRtree,
                   jsts.index.strtree.AbstractSTRtree,
                   jsts.index.SpatialIndex);


/**
 * @type {Object} implements function for comparison
 * @private
 */
jsts.index.strtree.STRtree.prototype.xComparator = {
  compare: function(o1, o2) {
    return jsts.index.strtree.AbstractSTRtree.prototype.compareDoubles(
        jsts.index.strtree.STRtree.prototype.centreX(o1.getBounds()),
        jsts.index.strtree.STRtree.prototype.centreX(o2.getBounds())
    );
  }
};


/**
 * @type {Object} implements function for comparison
 * @private
 */
jsts.index.strtree.STRtree.prototype.yComparator = {
  compare: function(o1, o2) {
    return jsts.index.strtree.AbstractSTRtree.prototype.compareDoubles(
        jsts.index.strtree.STRtree.prototype.centreY(o1.getBounds()),
        jsts.index.strtree.STRtree.prototype.centreY(o2.getBounds())
    );
  }
};


/**
 * @param {jsts.geom.Envelope} e
 * @return {number}
 */
jsts.index.strtree.STRtree.prototype.centreX = function(e) {
  return jsts.index.strtree.STRtree.prototype.avg(e.getMinX(), e.getMaxX());
};


/**
 * @param {jsts.geom.Envelope} e
 * @return {number}
 */
jsts.index.strtree.STRtree.prototype.centreY = function(e) {
  return jsts.index.strtree.STRtree.prototype.avg(e.getMinY(), e.getMaxY());
};


/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
jsts.index.strtree.STRtree.prototype.avg = function(a, b) {
  return (a + b) / 2.0;
};


/**
 * @type {Object}
 * @extends {jsts.index.strtree.AbstractSTRtree.IntersectsOp}
 * @private
 */
jsts.index.strtree.STRtree.prototype.intersectsOp = {
  intersects: function(aBounds, bBounds) {
    return aBounds.intersects(bBounds);
  }
};


/**
 * Creates the parent level for the given child level. First, orders the items
 * by the x-values of the midpoints, and groups them into vertical slices.
 * For each slice, orders the items by the y-values of the midpoints, and
 * group them into runs of size M (the node capacity). For each run, creates
 * a new (parent) node.
 *
 * @param {Array} childBoundables
 * @param {number} newLevel
 * @return {Array}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.createParentBoundables = function(childBoundables, newLevel) {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {Array.<Array>} verticalSlices
 * @param {number} newLevel
 * @return {Array.<Array>}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.createParentBoundablesFromVerticalSlices = function(verticalSlices, newLevel) {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {Array} childBoundables
 * @param {number} newLevel
 * @return {Array}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.createParentBoundablesFromVerticalSlice = function(childBoundables, newLevel) {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {Array} childBoundables
 * @param {number} sliceCount
 * @return {Array.<Array>}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.verticalSlices = function(childBoundables, sliceCount) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @type {number}
 * @const
 * @private
 */
jsts.index.strtree.STRtree.DEFAULT_NODE_CAPACITY = 10;


/**
 * @param {number} level
 * @return {jsts.index.strtree.AbstractNode}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.createNode = function(level) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @return {jsts.index.strtree.AbstractSTRtree.IntersectsOp}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.getIntersectsOp = function() {
  return this.intersectsOp;
};


/**
 * Inserts an item having the given bounds into the tree.
 *
 * @param {jsts.geom.Envelope} itemEnv
 * @param {Object} item
 * @public
 */
jsts.index.strtree.STRtree.prototype.insert = function(itemEnv, item) {
  throw new jsts.error.NotImplementedError();
};


/**
 * Returns items whose bounds intersect the given envelope.
 *
 * @param {jsts.geom.Envelope} searchEnv
 * @param {jsts.index.ItemVisitor} visitor
 * @return {?Array}
 * @public
 */
jsts.index.strtree.STRtree.prototype.query = function(searchEnv, visitor) {
  throw new jsts.error.NotImplementedError();
};


/**
 * Removes a single item from the tree.
 *
 * @param {jsts.geom.Envelope} itemEnv the Envelope of the item to remove.
 * @param {Object} item the item to remove.
 * @return {boolean} <code>true</code> if the item was found.
 * @public
 */
jsts.index.strtree.STRtree.prototype.insert = function(itemEnv, item) {
  throw new jsts.error.NotImplementedError();
};


/**
 * Returns the number of items in the tree.
 *
 * @return {number} the number of items in the tree.
 * @public
 */
jsts.index.strtree.STRtree.prototype.size = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * Returns the number of items in the tree.
 *
 * @return {number} the number of items in the tree.
 * @public
 */
jsts.index.strtree.STRtree.prototype.depth = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * @return {Object}
 * @protected
 */
jsts.index.strtree.STRtree.prototype.getComparator = function() {
  return this.yComparator;
};
