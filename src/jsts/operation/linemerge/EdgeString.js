/* Copyright (c) 2015 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * A sequence of {@link LineMergeDirectedEdge}s forming one of the lines that will
 * be output by the line-merging process.
 *
 * @version 1.7
 *
 * @constructor
 */
jsts.operation.linemerge.EdgeString = function(factory) {
    this.factory = factory;
    this.directedEdges = [];
    this.coordinates = null;
};

/**
 * Adds a directed edge which is known to form part of this line.
 */
jsts.operation.linemerge.EdgeString.prototype.add = function(directedEdge) {
    this.directedEdges.push(directedEdge);
};

jsts.operation.linemerge.EdgeString.prototype.getCoordinates = function() {
    if (this.coordinates===null)
    {
        var forwardDirectedEdges = 0;
        var reverseDirectedEdges = 0;
        var coordinateList = new jsts.geom.CoordinateList();
        for (var i = 0; i < this.directedEdges.length; ++i) {
            var directedEdge = this.directedEdges[i];
            if (directedEdge.getEdgeDirection()) {
                forwardDirectedEdges++;
            }
            else {
                reverseDirectedEdges++;
            }
            coordinateList.add(directedEdge.getEdge().getLine().getCoordinates(), false, directedEdge.getEdgeDirection());
        }
        this.coordinates = coordinateList.toCoordinateArray();
        if (reverseDirectedEdges > forwardDirectedEdges) {
            this.coordinates = this.coordinates.reverse();
        }
    }
    return this.coordinates;
};

/**
 * Converts this EdgeString into a LineString.
 */
jsts.operation.linemerge.EdgeString.prototype.toLineString = function() {
    return this.factory.createLineString(this.getCoordinates());
};
