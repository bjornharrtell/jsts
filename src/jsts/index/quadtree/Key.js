/**
 * A Key is a unique identifier for a node in a quadtree.
 * It contains a lower-left point and a level number. The level number
 * is the power of two for the size of the node envelope
 *
 * @version 1.7
 */
jsts.index.quadtree.Key = OpenLayers.Class();

jsts.index.quadtree.Key.prototype.computeQuadLevel = function(env){
  var dx,dy,dMax,level;
  
  dx = env.getWidth();
  dy = env.getHeight();
  dMax = dx > dy ? dx : dy;
  level = jsts.index.DoubleBits.prototype.exponent(dMax) + 1;
  return level;
};

jsts.index.quadtree.Key.prototype.initialize = function(itemEnv){
  // the fields which make up the key
  this.pt = new jsts.geom.Coordinate();
  this.level = 0;
  // auxiliary data which is derived from the key for use in computation
  this.env = null;
  
  this.computeKey(itemEnv);
};

jsts.index.quadtree.Key.prototype.getPoint = function(){
  return this.pt;
};

jsts.index.quadtree.Key.prototype.getLevel = function(){
  return this.level;
};

jsts.index.quadtree.Key.prototype.getEnvelope = function(){
  return this.env;
};

jsts.index.quadtree.Key.prototype.getCentre = function(){
  var x,y;
  x = (this.env.getMinX() + this.env.getMaxX())/2;
  y = (this.env.getMinY() + this.env.getMaxY())/2;
  return new jsts.geom.Coordinate(x,y);
};

/**
 * Will call appropriate computeKey* method depending on arguments.
 */
jsts.index.quadtree.Key.prototype.computeKey = function(){
  if(arguments[0] instanceof jsts.geom.Envelope){
    this.computeKeyFromEnvelope(arguments[0]);
  }else{
    this.computeKeyFromLevel(arguments[0], arguments[1]);
  }
};
/**
 * return a square envelope containing the argument envelope,
 * whose extent is a power of two and which is based at a power of 2
 */
jsts.index.quadtree.Key.prototype.computeKeyFromEnvelope = function(itemEnv){
  this.level = jsts.index.quadtree.Key.prototype.computeQuadLevel(itemEnv);
  this.env = new jsts.geom.Envelope();
  this.computeKey(this.level,itemEnv);
  while(! this.env.contains(itemEnv)){
    this.level += 1;
    this.computeKey(this.level, itemEnv);
  }
};

jsts.index.quadtree.Key.prototype.computeKeyFromLevel = function(level,itemEnv){
  var quadSize = jsts.index.DoubleBits.prototype.powerOf2(level);
  this.pt.x = Math.floor(itemEnv.getMinX() / quadSize) * quadSize;
  this.pt.y = Math.floor(itemEnv.getMinY() / quadSize) * quadSize;
  this.env.init(this.pt.x, this.pt.x+quadSize, this.pt.y, this.pt.y + quadSize);
};