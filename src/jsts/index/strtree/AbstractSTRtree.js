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
 */



/**
 * Constructs an AbstractSTRtree with the specified maximum number of child
 * nodes that a node may have
 *
 * @param {Integer} nodeCapacity
 *
 * @constuctor
 */
jsts.index.strtree.AbstractSTRtree = function(nodeCapacity) {
  this.itemBoundables = [];

  // TODO: Assert.isTrue(nodeCapacity > 1, "Node capacity must be greater than 1");
  this.nodeCapacity = nodeCapacity;
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
jsts.index.strtree.AbstractSTRtree.IntersectsOp.prototype.intersects = function(aBounds, bBounds) {
  throw new jsts.error.AbstractMethodInvocationError();
};


/**
 * @type {jsts.index.strtree.AbstractNode}
 * @protected
 */
jsts.index.strtree.AbstractSTRtree.prototype.root = null;


/**
 * @type {boolean}
 * @private
 */
jsts.index.strtree.AbstractSTRtree.prototype.built = false;


/**
 * @type {Array}
 * @private
 */
jsts.index.strtree.AbstractSTRtree.prototype.itemBoundables = null;


/**
 * @type {number}
 * @private
 */
jsts.index.strtree.AbstractSTRtree.prototype.nodeCapacity = null;


/**
 * Creates parent nodes, grandparent nodes, and so forth up to the root
 * node, for the data that has been inserted into the tree. Can only be
 * called once, and thus can be called only after all of the data has been
 * inserted into the tree.
 */
jsts.index.strtree.AbstractSTRtree.prototype.build = function() {
  // TODO: Assert.isTrue(!built);
  this.root = this.itemBoundables.length === 0
         ? this.createNode(0)
         : this.createHigherLevels(itemBoundables, -1);
  this.built = true;
};


/**
 * @param {number} level
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.prototype.createNode = function(level) {
  throw new jsts.error.AbstractMethodInvocationError();
};


/**
 * Sorts the childBoundables then divides them into groups of size M, where
 * M is the node capacity.
 */
jsts.index.strtree.AbstractSTRtree.prototype.createParentBoundables = function(childBoundables, newLevel) {
  // TODO: Assert.isTrue(!childBoundables.isEmpty());
  var parentBoundables = [];
  parentBoundables.push(this.createNode(newLevel));
  var sortedChildBoundables = [];
  for (var i = 0; i < parentBoundables.length; i++) {
    sortedChildBoundables.push(parentBoundables[i]);
  }
  sortedChildBoundables.sort(this.getComparator);
  for (var i = 0; i < sortedChildBoundables.length; i++) {
    var childBoundable = sortedChildBoundables[i];
    if (this.lastNode(parentBoundables).getChildBoundables().length === this.getNodeCapacity()) {
      parentBoundables.add(createNode(newLevel));
    }
    this.lastNode(parentBoundables).addChildBoundable(childBoundable);
  }
  return parentBoundables;
};


/**
 * @param {Array} nodes
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.prototype.lastNode = function(nodes) {
  return this.nodes[this.nodes.length - 1];
};


/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.compareDoubles = function(a, b) {
  return a > b ? 1
      : a < b ? -1
      : 0;
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
  // TODO: Assert.isTrue(!boundablesOfALevel.isEmpty());
  var parentBoundables = this.createParentBoundables(boundablesOfALevel, level + 1);
  if (parentBoundables.length === 1) {
    return parentBoundables[0];
  }
  return this.createHigherLevels(parentBoundables, level + 1);
};


/**
 * @return {jsts.index.strtree.AbstractNode}
 */
jsts.index.strtree.AbstractSTRtree.prototype.getRoot = function() {
  if (! this.built) this.build();
  return this.root;
};


/**
 * Returns the maximum number of child nodes that a node may have
 *
 * return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.getNodeCompacity = function() {
  return this.nodeCapacity;
};


/**
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.size = function() {
  if (arguments.length === 1) {
    return this.size2(arguments[0]);
  }

  if (!this.built) { this.build(); }
  if (this.itemBoundables.length === 0) {
    return 0;
  }
  return this.size2(root);
};

/**
 * @param {jsts.index.strtree.AbstractNode=} [node].
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.size2 = function(node) {
  var size = 0;
  var childBoundables = node.getChildBoundables();
  for (var i = 0; i < childBoundables.length; i++) {
    var childBoundable = childBoundables[i];
    if (childBoundable instanceof jsts.index.strtree.AbstractNode) {
      size += this.size(childBoundable);
    }
    else if (childBoundable instanceof jsts.index.strtree.ItemBoundable) {
      size += 1;
    }
  }
  return size;
};


/**
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.depth = function() {
  if (arguments.length === 1) {
    return this.depth2(arguments[0]);
  }

  if (!this.built) { this.build(); }
  if (this.itemBoundables.length === 0) {
    return 0;
  }
  return this.depth2(root);
};

/**
 * @param {jsts.index.strtree.AbstractNode} [node].
 * @return {number}
 */
jsts.index.strtree.AbstractSTRtree.prototype.depth2 = function() {
  var maxChildDepth = 0;
  var childBoundables = node.getChildBoundables();
  for (var i = 0; i < childBoundables.length; i++) {
    var childBoundable = childBoundables[i];
    if (childBoundable instanceof jsts.index.strtree.AbstractNode) {
      var childDepth = this.depth(childBoundable);
      if (childDepth > maxChildDepth)
        maxChildDepth = childDepth;
    }
  }
  return maxChildDepth + 1;
};


/**
 *
 * @param {Object} bounds
 * @param {Object} item
 */
jsts.index.strtree.AbstractSTRtree.prototype.insert = function(bounds, item) {
  // TODO: Assert.isTrue(!built, "Cannot insert items into an STR packed R-tree after it has been built.");
  this.itemBoundables.add(new jsts.index.strtree.ItemBoundable(bounds, item));
};

// TODO: port rest

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
