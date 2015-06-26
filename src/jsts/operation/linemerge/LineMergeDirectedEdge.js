/* Copyright (c) 2015 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * A {@link com.vividsolutions.jts.planargraph.DirectedEdge} of a 
 * {@link LineMergeGraph}. 
 *
 * @version 1.7
 *
 * Constructs a LineMergeDirectedEdge connecting the <code>from</code> node to the
 * <code>to</code> node.
 *
 * @param directionPt
 *                  specifies this DirectedEdge's direction (given by an imaginary
 *                  line from the <code>from</code> node to <code>directionPt</code>)
 * @param edgeDirection
 *                  whether this DirectedEdge's direction is the same as or
 *                  opposite to that of the parent Edge (if any)
 * @constructor
 */
jsts.operation.linemerge.LineMergeDirectedEdge = function(from, to, directionPt, edgeDirection) {
    jsts.planargraph.DirectedEdge.call(this, from, to, directionPt, edgeDirection); 
};

jsts.operation.linemerge.LineMergeDirectedEdge.prototype = new jsts.planargraph.DirectedEdge();
jsts.operation.linemerge.LineMergeDirectedEdge.constructor = jsts.operation.linemerge.LineMergeDirectedEdge;

/**
 * Returns the directed edge that starts at this directed edge's end point, or null
 * if there are zero or multiple directed edges starting there.  
 * @return the directed edge
 */
jsts.operation.linemerge.LineMergeDirectedEdge.prototype.getNext = function() {
    if (this.getToNode().getDegree() != 2) {
      return null;
    }
    if (this.getToNode().getOutEdges().getEdges().get(0) == this.getSym()) {
      return this.getToNode().getOutEdges().getEdges().get(1);
    }
    jsts.util.Assert.isTrue(this.getToNode().getOutEdges().getEdges().get(1) == this.getSym());

    return this.getToNode().getOutEdges().getEdges().get(0);
};
