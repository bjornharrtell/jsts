/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Base class for STRtree and SIRtree. STR-packed R-trees are described in:
 * P. Rigaux, Michel Scholl and Agnes Voisard. Spatial Databases With
 * Application To GIS. Morgan Kaufmann, San Francisco, 2002.
 * <p>
 * This implementation is based on Boundables rather than just AbstractNodes,
 * because the STR algorithm operates on both nodes and
 * data, both of which are treated here as Boundables.
 *
 * @see STRtree
 * @see SIRtree
 *
 * @version 1.7
 */


/**
 * Constructs an AbstractSTRtree with the specified maximum number of child
 * nodes that a node may have
 *
 * @param {Integer} nodeCapacity
 */
jsts.index.strtree.AbstractSTRtree = function(nodeCapacity) {

};



/**
 * A test for intersection between two bounds, necessary because subclasses
 * of AbstractSTRtree have different implementations of bounds.
 *
 * @interface
 * @constructor
 * @public
 */
jsts.index.strtree.AbstractSTRtree.IntersectsOp = function() {

};


/**
 * For STRtrees, the bounds will be Envelopes; for SIRtrees, Intervals;
 * for other subclasses of AbstractSTRtree, some other class.
 *
 * @param {Object} aBounds the bounds of one spatial object.
 * @param {Object} bBounds the bounds of another spatial object.
 * @return {boolean} whether the two bounds intersect.
 */
jsts.index.strtree.AbstractSTRtree.IntersectsOp.protoype.intersects = function(aBounds, bBounds) {
  throw new jsts.error.AbstractMethodInvocationError();
};


/**
 * @type {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.protoype.root;


/**
 * @type {boolean}
 * @private
 */
jsts.index.strtree.AbstractSTRtree.protoype.built = false;


/**
 * @type {Array}
 * @private
 */
jsts.index.strtree.AbstractSTRtree.protoype.itemBoundables = [];


/**
 * @type {number}
 * @private
 */
jsts.index.strtree.AbstractSTRtree.protoype.nodeCapacity;


/**
 * Creates parent nodes, grandparent nodes, and so forth up to the root
 * node, for the data that has been inserted into the tree. Can only be
 * called once, and thus can be called only after all of the data has been
 * inserted into the tree.
 */
jsts.index.strtree.AbstractSTRtree.protoype.build = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * @param {number} level
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.protoype.createNode = function(level) {
  throw new jsts.error.AbstractMethodInvocationError();
};


/**
 * Sorts the childBoundables then divides them into groups of size M, where
 * M is the node capacity.
 */
jsts.index.strtree.AbstractSTRtree.protoype.createParentBoundables = function(childBoundables, newLevel) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @param {Array} nodes
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.protoype.lastNode = function(nodes) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @param {number} a
 * @param {number} b
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.protoype.compareDoubles = function(a, b) {
  throw new jsts.error.NotImplementedError();
};


/**
 * Creates the levels higher than the given level
 *
 * @param {Array} boundablesOfALevel
 *            the level to build on.
 * @param {number} level
 *            the level of the Boundables, or -1 if the boundables are item
 *            boundables (that is, below level 0).
 * @return {jsts.index.strtree.AbstractNode} the root, which may be a ParentNode or a LeafNode.
 * @private
 */
jsts.index.strtree.AbstractSTRtree.prototype.createHigherLevels = function(boundablesOfALevel, level) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.prototype.getRoot = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * Returns the maximum number of child nodes that a node may have
 *
 * return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.getNodeCompacity = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * @param {jsts.index.strtree.AbstractNode=} [node].
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.size = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * @param {jsts.index.strtree.AbstractNode} [node].
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.depth = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {Object} bounds
 * @param {Object} item
 */
jsts.index.strtree.AbstractSTRtree.prototype.insert = function(bounds, item) {
  throw new jsts.error.NotImplementedError();
};


/**
 * Also buils the tree if necessar.
 * TODO: Provide better documentation of parameter combinations
 *
 * @param {Object} searchBounds
 * @param {jsts.index.ItemVisitor} [visitor].
 * @param {jsts.index.strtree.AbstractNode} [node].
 * @param {Array} [matches].
 * @return {Array}
 */
jsts.index.strtree.AbstractSTRtree.prototype.query = function(searchBounds) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @return {jsts.index.strtree.AbstractSTRtree.IntersectOp}
 */
jsts.index.strtree.AbstractSTRtree.prototype.getIntersectsOp = function() {
  throw new jsts.error.AbstractMethodInvocationError();
};


/**
 * Gets a tree structure (as a nested list)
 * corresponding to the structure of the items and nodes in this tree.
 * <p>
 * The returned {@link List}s contain either {@link Object} items,
 * or Lists which correspond to subtrees of the tree
 * Subtrees which do not contain any items are not included.
 * <p>
 * Builds the tree if necessary.
 *
 * @return {Array} a List of items and/or Lists.
 */
jsts.index.strtree.AbstractSTRtree.prototype.itemsTree = function() {
  throw new jsts.error.NotImplementedError();
};


/**
 * Removes an item from the tree.
 * (Builds the tree, if necessary.)
 *
 * @param {Object} searchBounds
 * @param {jsts.index.strtree.AbstractNode} [node].
 * @param {Object] item}
 * @return {boolean}
 */
jsts.index.strtree.AbstractSTRtree.prototype.remove = function(searchBounds) {
  throw new jsts.error.NotImplementedError();
};


/**
 *
 * @param {jsts.index.strtree.AbstractNode} node
 * @param {Object} item
 * @return {boolean}
 */
jsts.index.strtree.AbstractSTRtree.prototype.removeItem = function(node, item) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @param {number} level
 * @param {jsts.index.strtree.AbstractNode} [top].
 * @param {Array} [boundables].
 * @return {?Array}
 */
jsts.index.strtree.AbstractSTRtree.prototype.boundablesAtLevel = function(level, top, boundables) {
  throw new jsts.error.NotImplementedError();
};


/**
 * @return {Comparator}
 */
jsts.index.strtree.AbstractSTRtree.prototype.getComparator = function() {
  throw new jsts.error.AbstractMethodInvocationError();
};
