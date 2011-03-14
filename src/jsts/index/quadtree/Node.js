/**
 * Represents a node of a {@link Quadtree}. Nodes contain items which have a
 * spatial extent corresponding to the node's position in the quadtree.
 * 
 * @version 1.7
 */
jsts.index.quadtree.Node = OpenLayers.Class(jsts.index.quadtree.NodeBase);

jsts.index.quadtree.Node.prototype.createNode = function(env) {
  var key, node;
  key = new jsts.index.quadtree.Key(env);
  node = new jsts.index.quadtree.Node(key.getEnvelope(), key.getLevel());

  return node;
};

jsts.index.quadtree.Node.prototype.createExpanded = function(node, addEnv) {
  var expandEnv = new jsts.geom.Envelope(addEnv), largerNode;

  if (node != null)
    expandEnv.expandToInclude(node.env);

  largerNode = jsts.index.quadtree.Node.prototype.createNode(expandEnv);
  if (node != null)
    largerNode.insertNode(node);

  return largerNode;
};

jsts.index.quadtree.Node.prototype.initialize = function(env, level) {
  jsts.index.quadtree.NodeBase.prototype.initialize.apply(this, arguments);
  
  this.env = env;
  this.level = level;
  this.centre = new jsts.geom.Coordinate();
  this.centre.x = (env.getMinX() + env.getMaxX()) / 2;
  this.centre.y = (env.getMinY() + env.getMaxY()) / 2;
};

jsts.index.quadtree.Node.prototype.getEnvelope = function() {
  return this.env;
};

jsts.index.quadtree.Node.prototype.isSearchMatch = function(searchEnv) {
  return this.env.intersects(searchEnv);
};

/**
 * Returns the subquad containing the envelope. Creates the subquad if it does
 * not already exist.
 */
jsts.index.quadtree.Node.prototype.getNode = function(searchEnv) {
  var subnodeIndex = this.getSubnodeIndex(searchEnv, this.centre), node;

  // if subquadIndex is -1 searchEnv is not contained in a subquad
  if (subnodeIndex !== -1) {
    // create the quad if it does not exist
    node = this.getSubnode(subnodeIndex);
    // recursively search the found/created quad
    return node.getNode(searchEnv);
  } else {
    return this;
  }
};

/**
 * Returns the smallest <i>existing</i> node containing the envelope.
 */
jsts.index.quadtree.Node.prototype.find = function(searchEnv) {
  var subnodeIndex = this.getSubnodeIndex(searchEnv, this.centre), node;
  if (subnodeIndex === -1)
    return this;

  if (this.subnode[subnodeIndex] !== null) {
    // query lies in subquad, so search it
    node = this.subnode[subnodeIndex];
    return node.find(searchEnv);
  }

  // no existing subquad, so return this one anyway
  return this;
};

jsts.index.quadtree.Node.prototype.insertNode = function(node) {
  var index = this.getSubnodeIndex(node.env, this.centre), childNode;
  if (node.level === this.level - 1) {
    this.subnode[index] = node;
  } else {
    // the quad is not a direct child, so make a new child quad to contain it
    // and recursively insert the quad
    childNode = this.createSubnode(index);
    childNode.insertNode(node);
    this.subnode[index] = childNode;
  }
};

/**
 * get the subquad for the index. If it doesn't exist, create it
 */
jsts.index.quadtree.Node.prototype.getSubnode = function(index) {
  if (this.subnode[index] === null) {
    this.subnode[index].createSubnode(index);
  }
  return this.subnode[index];
};

jsts.index.quadtree.Node.prototype.createSubnode = function(index) {
  var minx = 0.0, maxx = 0.0, miny = 0.0, maxy = 0.0, sqEnv, node;
  // create a new subquad in the appropriate quadrant
  switch (index) {
  case 0:
    minx = this.env.getMinX();
    maxx = this.centre.x;
    miny = this.env.getMinY();
    maxy = this.centre.y;
    break;
  case 1:
    minx = this.centre.x;
    maxx = this.env.getMaxX();
    miny = this.env.getMinY();
    maxy = this.centre.y;
    break;
  case 2:
    minx = this.env.getMinX();
    maxx = this.centre.x;
    miny = this.centre.y;
    maxy = this.env.getMaxY();
    break;
  case 3:
    minx = this.centre.x;
    maxx = this.env.getMaxX();
    miny = this.centre.y;
    maxy = this.env.getMaxY();
    break;
  }

  sqEnv = new jsts.geom.Envelope(minx, maxx, miny, maxy);
  node = new jsts.index.quadtree.Node(sqEnv, this.level - 1);

  return node;
};
