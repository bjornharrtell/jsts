/* Copyright (c) 2015 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * An edge of a {@link LineMergeGraph}. The <code>marked</code> field indicates
 * whether this Edge has been logically deleted from the graph.
 *
 * @version 1.7
 *
 * @constructor
 * Constructs a LineMergeEdge with vertices given by the specified LineString.
 */
jsts.operation.linemerge.LineMergeEdge = function(line) {
    jsts.planargraph.Edge.call(this); 
    this.line = line;
};

jsts.operation.linemerge.LineMergeEdge.prototype = new jsts.planargraph.Edge();
jsts.operation.linemerge.LineMergeEdge.constructor = jsts.operation.linemerge.LineMergeEdge;

/**
 * Returns the LineString specifying the vertices of this edge.
 */
jsts.operation.linemerge.LineMergeEdge.prototype.getLine = function() {
    return this.line;
};
