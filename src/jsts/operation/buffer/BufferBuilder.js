/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */



/**
 * Builds the buffer geometry for a given input geometry and precision model.
 * Allows setting the level of approximation for circular arcs, and the
 * precision model in which to carry out the computation.
 * <p>
 * When computing buffers in floating point double-precision it can happen that
 * the process of iterated noding can fail to converge (terminate). In this case
 * a TopologyException will be thrown. Retrying the computation in a fixed
 * precision can produce more robust results.
 *
 * @param {jsts.operation.buffer.BufferParameters}
 *          bufParams
 * @constructor
 */
jsts.operation.buffer.BufferBuilder = function(bufParams) {
  this.bufParams = bufParams;

  this.edgeList = new jsts.geomgraph.EdgeList();
};


/**
 * Compute the change in depth as an edge is crossed from R to L
 *
 * @param {Label}
 *          label
 * @return {Number}
 */
jsts.operation.buffer.depthDelta = function(label) {
  var lLoc = label.getLocation(0, jsts.geomgraph.Position.LEFT);
  var rLoc = label.getLocation(0, jsts.geomgraph.Position.RIGHT);
  if (lLoc === jsts.geom.Location.INTERIOR &&
      rLoc === jsts.geom.Location.EXTERIOR)
    return 1;
  else if (lLoc === jsts.geom.Location.EXTERIOR &&
      rLoc === jsts.geom.Location.INTERIOR)
    return -1;
  return 0;
};


/**
 * @type {BufferParameters}
 * @private
 */
jsts.operation.buffer.prototype.bufParams = null;


/**
 * @type {PrecisionModel}
 * @private
 */
jsts.operation.buffer.prototype.workingPrecisionModel = null;


/**
 * @type {Noder}
 * @private
 */
jsts.operation.buffer.prototype.workingNoder = null;


/**
 * @type {GeometryFactory}
 * @private
 */
jsts.operation.buffer.prototype.geomFact = null;


/**
 * @type {PlanarGraph}
 * @private
 */
jsts.operation.buffer.prototype.graph = null;


/**
 * @type {EdgeList}
 * @private
 */
jsts.operation.buffer.prototype.edgeList = null;


/**
 * Sets the precision model to use during the curve computation and noding, if
 * it is different to the precision model of the Geometry. If the precision
 * model is less than the precision of the Geometry precision model, the
 * Geometry must have previously been rounded to that precision.
 *
 * @param pm
 *          the precision model to use.
 */
jsts.operation.buffer.prototype.setWorkingPrecisionModel = function(pm) {
  workingPrecisionModel = pm;
};


/**
 * Sets the {@link Noder} to use during noding. This allows choosing fast but
 * non-robust noding, or slower but robust noding.
 *
 * @param noder
 *          the noder to use.
 */
jsts.operation.buffer.prototype.setNoder = function(noder) {
  workingNoder = noder;
};

jsts.operation.buffer.prototype.buffer = function(g, distance) {
  var precisionModel = workingPrecisionModel;
  if (precisionModel == null)
    precisionModel = g.getPrecisionModel();

  // factory must be the same as the one used by the input
  this.geomFact = g.getFactory();

  var curveBuilder = new OffsetCurveBuilder(precisionModel, bufParams);

  var curveSetBuilder = new OffsetCurveSetBuilder(g, distance, curveBuilder);

  var bufferSegStrList = curveSetBuilder.getCurves();

  // short-circuit test
  if (bufferSegStrList.size() <= 0) {
    return createEmptyResultGeometry();
  }

  this.computeNodedEdges(bufferSegStrList, precisionModel);
  this.graph = new PlanarGraph(new OverlayNodeFactory());
  this.graph.addEdges(edgeList.getEdges());

  var subgraphList = this.createSubgraphs(this.graph);
  var polyBuilder = new PolygonBuilder(this.geomFact);
  this.buildSubgraphs(subgraphList, polyBuilder);
  var resultPolyList = polyBuilder.getPolygons();

  // just in case...
  if (resultPolyList.length <= 0) {
    return this.createEmptyResultGeometry();
  }

  var resultGeom = geomFact.buildGeometry(resultPolyList);
  return resultGeom;
};


/**
 * @private
 */
jsts.operation.buffer.prototype.getNoder = function(precisionModel) {
  if (workingNoder !== null)
    return workingNoder;

  // otherwise use a fast (but non-robust) noder
  var noder = new MCIndexNoder();
  var li = new RobustLineIntersector();
  li.setPrecisionModel(precisionModel);
  noder.setSegmentIntersector(new IntersectionAdder(li));
  return noder;
};


/**
 * @private
 */
jsts.operation.buffer.prototype.computeNodedEdges = function(bufferSegStrList,
    precisionModel) {
  var noder = getNoder(precisionModel);
  noder.computeNodes(bufferSegStrList);
  var nodedSegStrings = noder.getNodedSubstrings();
  for (var i = nodedSegStrings.iterator(); i.hasNext();) {
    var segStr = i.next();
    var oldLabel = segStr.getData();
    var edge = new Edge(segStr.getCoordinates(), new Label(oldLabel));
    this.insertUniqueEdge(edge);
  }
};


/**
 * Inserted edges are checked to see if an identical edge already exists. If so,
 * the edge is not inserted, but its label is merged with the existing edge.
 *
 * @protected
 */
jsts.operation.buffer.prototype.insertUniqueEdge = function(e) {
  var existingEdge = edgeList.findEqualEdge(e);

  // If an identical edge already exists, simply update its label
  if (existingEdge != null) {
    var existingLabel = existingEdge.getLabel();

    var labelToMerge = e.getLabel();
    // check if new edge is in reverse direction to existing edge
    // if so, must flip the label before merging it
    if (!existingEdge.isPointwiseEqual(e)) {
      labelToMerge = new Label(e.getLabel());
      labelToMerge.flip();
    }
    existingLabel.merge(labelToMerge);

    // compute new depth delta of sum of edges
    var mergeDelta = depthDelta(labelToMerge);
    var existingDelta = existingEdge.getDepthDelta();
    var newDelta = existingDelta + mergeDelta;
    existingEdge.setDepthDelta(newDelta);
  } else { // no matching existing edge was found
    // add this new edge to the list of edges in this graph
    // e.setName(name + edges.size());
    edgeList.add(e);
    e.setDepthDelta(depthDelta(e.getLabel()));
  }
};


/**
 * @param {PlanarGraph}
 *          graph
 * @private
 */
jsts.operation.buffer.prototype.createSubgraphs = function(graph) {
  var subgraphList = [];
  for (var i = graph.getNodes().iterator(); i.hasNext();) {
    var node = i.next();
    if (!node.isVisited()) {
      var subgraph = new BufferSubgraph();
      subgraph.create(node);
      subgraphList.add(subgraph);
    }
  }
  /**
   * Sort the subgraphs in descending order of their rightmost coordinate. This
   * ensures that when the Polygons for the subgraphs are built, subgraphs for
   * shells will have been built before the subgraphs for any holes they
   * contain.
   */
  Collections.sort(subgraphList, Collections.reverseOrder());
  return subgraphList;
};


/**
 * Completes the building of the input subgraphs by depth-labelling them, and
 * adds them to the PolygonBuilder. The subgraph list must be sorted in
 * rightmost-coordinate order.
 *
 * @param {Array}
 *          subgraphList the subgraphs to build.
 * @param {PolygonBuilder}
 *          polyBuilder the PolygonBuilder which will build the final polygons.
 * @private
 */
jsts.operation.buffer.prototype.buildSubgraphs = function(subgraphList,
    polyBuilder) {
  var processedGraphs = [];
  for (var i = subgraphList.iterator(); i.hasNext();) {
    var subgraph = i.next();
    var p = subgraph.getRightmostCoordinate();
    var locater = new SubgraphDepthLocater(processedGraphs);
    var outsideDepth = locater.getDepth(p);
    subgraph.computeDepth(outsideDepth);
    subgraph.findResultEdges();
    processedGraphs.add(subgraph);
    polyBuilder.add(subgraph.getDirectedEdges(), subgraph.getNodes());
  }
};


/**
 * TODO: need to replace usage of iterator
 *
 * @private
 */
jsts.operation.buffer.convertSegStrings = function(it) {
  var fact = new jsts.geom.GeometryFactory();
  var lines = [];
  while (it.hasNext()) {
    var ss = it.next();
    var line = fact.createLineString(ss.getCoordinates());
    lines.add(line);
  }
  return fact.buildGeometry(lines);
};


/**
 * Gets the standard result for an empty buffer. Since buffer always returns a
 * polygonal result, this is chosen to be an empty polygon.
 *
 * @return the empty result geometry.
 * @private
 */
jsts.operation.buffer.prototype.createEmptyResultGeometry = function() {
  var emptyGeom = this.geomFact.createPolygon(null, null);
  return emptyGeom;
};
