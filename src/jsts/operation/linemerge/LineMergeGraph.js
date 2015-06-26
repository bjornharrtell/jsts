/* Copyright (c) 2015 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * A planar graph of edges that is analyzed to sew the edges together. The 
 * <code>marked</code> flag on @{link com.vividsolutions.planargraph.Edge}s 
 * and @{link com.vividsolutions.planargraph.Node}s indicates whether they have been
 * logically deleted from the graph.
 *
 * @version 1.7
 */
jsts.operation.linemerge.LineMergeGraph = function() {
    jsts.planargraph.PlanarGraph.call(this); 
};

jsts.operation.linemerge.LineMergeGraph.prototype = new jsts.planargraph.PlanarGraph();
jsts.operation.linemerge.LineMergeGraph.constructor = jsts.operation.linemerge.LineMergeGraph;

/**
 * Adds an Edge, DirectedEdges, and Nodes for the given LineString representation
 * of an edge. 
 * Empty lines or lines with all coordinates equal are not added.
 * 
 * @param lineString the linestring to add to the graph
 */
jsts.operation.linemerge.LineMergeGraph.prototype.addEdge = function(lineString) {
    if (lineString.isEmpty()) { return; }
    
    var coordinates = jsts.geom.CoordinateArrays.removeRepeatedPoints(lineString.getCoordinates());
    
    // don't add lines with all coordinates equal
    if (coordinates.length <= 1) return;
    
    var startCoordinate = coordinates[0];
    var endCoordinate = coordinates[coordinates.length - 1];
    var startNode = this.getNode(startCoordinate);
    var endNode = this.getNode(endCoordinate);
    var directedEdge0 = new jsts.operation.linemerge.LineMergeDirectedEdge(startNode, endNode,
        coordinates[1], true);
    var directedEdge1 = new jsts.operation.linemerge.LineMergeDirectedEdge(endNode, startNode,
        coordinates[coordinates.length - 2], false);
    var edge = new jsts.operation.linemerge.LineMergeEdge(lineString);
    edge.setDirectedEdges(directedEdge0, directedEdge1);
    this.add(edge);
};

jsts.operation.linemerge.LineMergeGraph.prototype.getNode = function(coordinate) {
    var node = this.findNode(coordinate);
    if (node == null)
    {
        node = new jsts.planargraph.Node(coordinate);
        this.add(node);
    }
    return node;
};
