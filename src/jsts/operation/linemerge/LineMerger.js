/* Copyright (c) 2015 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Merges a collection of linear components to form maximal-length linestrings. 
 * <p> 
 * Merging stops at nodes of degree 1 or degree 3 or more.
 * In other words, all nodes of degree 2 are merged together. 
 * The exception is in the case of an isolated loop, which only has degree-2 nodes.
 * In this case one of the nodes is chosen as a starting point.
 * <p> 
 * The direction of each
 * merged LineString will be that of the majority of the LineStrings from which it
 * was derived.
 * <p>
 * Any dimension of Geometry is handled - the constituent linework is extracted to 
 * form the edges. The edges must be correctly noded; that is, they must only meet
 * at their endpoints.  The LineMerger will accept non-noded input
 * but will not merge non-noded edges.
 * <p>
 * Input lines which are empty or contain only a single unique coordinate are not included
 * in the merging.
 *
 * @version 1.7
 *
 * @constructor
 *
 * Creates a new line merger.
 *
 */
jsts.operation.linemerge.LineMerger = function() {
    this.graph = new jsts.operation.linemerge.LineMergeGraph();
    this.mergedLineStrings = null;
    this.factory = null;
    this.edgeStrings = null;
};

/**
 * Adds a Geometry to be processed. May be called multiple times.
 * Any dimension of Geometry may be added; the constituent linework will be
 * extracted.
 * 
 * @param geometry geometry to be line-merged
 */
jsts.operation.linemerge.LineMerger.prototype.addGeometry = function(geometry) {
    var _this = this;
    var filter = new jsts.geom.GeometryComponentFilter();
    filter.filter = function(component) {
        if (component instanceof jsts.geom.LineString) {
          _this.addLineString(component);
        }
    };
    geometry.apply(filter);
};

/**
 * Adds a collection of Geometries to be processed. May be called multiple times.
 * Any dimension of Geometry may be added; the constituent linework will be
 * extracted.
 * 
 * @param geometries the geometries to be line-merged
 */
jsts.operation.linemerge.LineMerger.prototype.addCollection = function(geometries) {
    this.mergedLineStrings = null;
    for (var i = 0; i < geometries.getNumGeometries(); ++i) {
      var geometry = geometries.getGeometryN(i);
      this.addGeometry(geometry);
    }
};

jsts.operation.linemerge.LineMerger.prototype.addLineString = function(lineString) {
    if (this.factory == null) {
      this.factory = lineString.getFactory();
    }
    this.graph.addEdge(lineString);
};

jsts.operation.linemerge.LineMerger.prototype.merge = function() {
    if (this.mergedLineStrings != null) { return; }
    
    // reset marks (this allows incremental processing)
    jsts.planargraph.GraphComponent.setMarked(this.graph.nodeIterator(), false);
    jsts.planargraph.GraphComponent.setMarked(this.graph.edgeIterator(), false);
    
    this.edgeStrings = [];
    this.buildEdgeStringsForObviousStartNodes();
    this.buildEdgeStringsForIsolatedLoops();
    this.mergedLineStrings = [];
    for (var i = 0; i < this.edgeStrings.length; ++i) {
      var edgeString = this.edgeStrings[i];
      this.mergedLineStrings.push(edgeString.toLineString());
    }    
};

jsts.operation.linemerge.LineMerger.prototype.buildEdgeStringsForObviousStartNodes = function() {
    this.buildEdgeStringsForNonDegree2Nodes();
};

jsts.operation.linemerge.LineMerger.prototype.buildEdgeStringsForIsolatedLoops = function() {
    this.buildEdgeStringsForUnprocessedNodes();
};

jsts.operation.linemerge.LineMerger.prototype.buildEdgeStringsForUnprocessedNodes = function() {
    for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
      var node = i.next();
      if (!node.isMarked()) { 
        jsts.util.Assert.isTrue(node.getDegree() == 2);
        this.buildEdgeStringsStartingAt(node);
        node.setMarked(true);
      }
    }
};

jsts.operation.linemerge.LineMerger.prototype.buildEdgeStringsForNonDegree2Nodes = function() {
    for (var i = this.graph.getNodes().iterator(); i.hasNext(); ) {
      var node = i.next();
      if (node.getDegree() != 2) { 
        this.buildEdgeStringsStartingAt(node);
        node.setMarked(true);
      }
    }
};

jsts.operation.linemerge.LineMerger.prototype.buildEdgeStringsStartingAt = function(node) {
    for (var i = node.getOutEdges().iterator(); i.hasNext(); ) {
      var directedEdge = i.next();
      if (directedEdge.getEdge().isMarked()) { continue; }
      this.edgeStrings.push(this.buildEdgeStringStartingWith(directedEdge));
    }
};

jsts.operation.linemerge.LineMerger.prototype.buildEdgeStringStartingWith = function(start) {
    var edgeString = new jsts.operation.linemerge.EdgeString(this.factory);
    var current = start;
    do {
      edgeString.add(current);
      current.getEdge().setMarked(true);
      current = current.getNext();      
    } while (current != null && current != start);
    return edgeString;
};

/**
 * Gets the {@link LineString}s created by the merging process.
 * 
 * @return the collection of merged LineStrings
 */
jsts.operation.linemerge.LineMerger.prototype.getMergedLineStrings = function() {
    this.merge();
    return this.mergedLineStrings;
};
