/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/noding/SinglePassNoder.js
 */

/**
 * @constructor
 */
jsts.noding.MCIndexNoder = function() {
  this.monoChains = [];
  this.index = new jsts.index.strtree.STRtree();
};

jsts.noding.MCIndexNoder.prototype = new jsts.noding.SinglePassNoder();
jsts.noding.MCIndexNoder.constructor = jsts.noding.MCIndexNoder;

/**
 * @type {Array}
 * @private
 */
jsts.noding.MCIndexNoder.prototype.monoChains = null;
/**
 * @type {SpatialIndex}
 * @private
 */
jsts.noding.MCIndexNoder.prototype.index = null;
/**
 * @type {number}
 * @private
 */
jsts.noding.MCIndexNoder.prototype.idCounter = 0;

/**
 * @type {Array}
 * @private
 */
jsts.noding.MCIndexNoder.prototype.nodedSegStrings = null;
/**
 * statistics
 *
 * @type {number}
 * @private
 */
jsts.noding.MCIndexNoder.prototype.nOverlaps = 0;


jsts.noding.MCIndexNoder.prototype.getMonotoneChains = function() {
  return this.monoChains;
};

jsts.noding.MCIndexNoder.prototype.getIndex = function() {
  return this.index;
};

jsts.noding.MCIndexNoder.prototype.getNodedSubstrings = function() {
  return jsts.noding.NodedSegmentString
      .getNodedSubstrings(this.nodedSegStrings);
};

jsts.noding.MCIndexNoder.prototype.computeNodes = function(inputSegStrings) {
  this.nodedSegStrings = inputSegStrings;
  for (var i = 0; i < inputSegStrings.length; i++) {
    this.add(inputSegStrings[i]);
  }
  this.intersectChains();
};

/**
 * @private
 */
jsts.noding.MCIndexNoder.prototype.intersectChains = function() {
  var overlapAction = new jsts.noding.MCIndexNoder.SegmentOverlapAction(
      this.segInt);

  for (var i = 0; i < this.monoChains.length; i++) {
    var queryChain = this.monoChains[i];
    var overlapChains = this.index.query(queryChain.getEnvelope());
    for (var j = 0; j < this.overlapChains.length; j++) {
      var testChain = this.overlapChains[j];
      /**
       * following test makes sure we only compare each pair of chains once and
       * that we don't compare a chain to itself
       */
      if (testChain.getId() > queryChain.getId()) {
        queryChain.computeOverlaps(testChain, overlapAction);
        this.nOverlaps++;
      }
      // short-circuit if possible
      if (this.segInt.isDone())
        return;
    }
  }
};

/**
 * @private
 */
jsts.noding.MCIndexNoder.prototype.add = function(segStr) {
  var segChains = jsts.index.chain.MonotoneChainBuilder.getChains(segStr
      .getCoordinates(), segStr);
  for (var i = 0; i < segChains.length; i++) {
    var mc = segChains[i];
    mc.setId(idCounter++);
    this.index.insert(mc.getEnvelope(), mc);
    this.monoChains.add(mc);
  }
};

/**
 * @requires jsts/index/chain/MonotoneChainOverlapAction.js
 */

/**
 * constructor
 */
jsts.noding.MCIndexNoder.SegmentOverlapAction = function(si) {
  this.si = si;

};
jsts.noding.MCIndexNoder.SegmentOverlapAction.prototype = new jsts.index.chain.MonotoneChainOverlapAction();
jsts.noding.MCIndexNoder.SegmentOverlapAction.constructor = jsts.noding.MCIndexNoder.SegmentOverlapAction;

/**
 * @type {SegmentIntersector}
 * @private
 */
jsts.noding.MCIndexNoder.SegmentOverlapAction.prototype.si = null;


jsts.noding.MCIndexNoder.SegmentOverlapAction.prototype.overlap = function(mc1,
    start1, mc2, start2) {
  var ss1 = mc1.getContext();
  var ss2 = mc2.getContext();
  si.processIntersections(ss1, start1, ss2, start2);
};
