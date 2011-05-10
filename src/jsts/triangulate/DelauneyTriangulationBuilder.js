/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
*/



/**
 * A utility class which creates Delaunay Trianglulations from collections of
 * points and extract the resulting triangulation edges or triangles as
 * geometries.
 *
 * Initializes a new DelauneyTriangulationBuilder
 *
 * @constructor
 */
jsts.triangulate.DelauneyTriangulationBuilder = function() {

  this.siteCoords = null;
  this.tolerance = 0.0;
  this.subdiv = null;
};


/**
 * Extracts the unique {@link Coordinate}s from the given {@link Geometry}.
 *
 * @param {jsts.geom.Geometry}
 *          geom the geometry to extract from.
 * @return {Array{jsts.geom.Coordinate}} An array of the unique Coordinates
 */
jsts.triangulate.DelauneyTriangulationBuilder.extractUniqueCoordinates = function(
    geom) {
  if (geom === undefined || geom === null) {
    return new jsts.geom.CoordinateList();
  }

  var coords = geom.getCoordinates();
  return jsts.triangulate.DelauneyTriangulationBuilder.unique(coords);
};


/**
 * Removes any duplicates in the passed array.
 *
 * @param {Array{jsts.geom.Coordinate}}
 *          coords The input coordinates
 * @return {Array{jsts.geom.Coordinate}} An array stripped out of any duplicates
 */
jsts.triangulate.DelauneyTriangulationBuilder.unique = function(coords) {
  // Sort the coordinates by their compareTo-function
  coords.sort(function(a, b) {
    return a.compareTo(b);
  });

  coordList = new jsts.geom.CoordinateList(coords, false);
  return coordList;
};


/**
 * Converts an array of coordinates to an array of vertexes
 *
 * @param {Array{jsts.geom.Coordinate}}
 *          coords the input coordinates
 * @return {Array{jsts.triangulate.quadedge.Vertex}} The created vertexes
 */
jsts.triangulate.DelauneyTriangulationBuilder.toVertices = function(coords) {
  var verts = new Array(coords.length), i = 0, il = coords.length, coord;

  for (i; i < il; i++) {
    coord = coords[i];
    verts[i] = new jsts.triangulate.quadedge.Vertex(coord);
  }

  return verts;
};


/**
 * Computes the {jsts.geom.Envelope} of an array of {jsts.geom.Coordinate}s
 *
 * @param {Array{jsts.geom.Coordinate}}
 *          coords the input coordinates
 * @return {jsts.geom.Envelope} The created envelope.
 *
 */
jsts.triangulate.DelauneyTriangulationBuilder.envelope = function(coords) {
  var env = new jsts.geom.Envelope(), i = 0, il = coords.length;

  for (i; i < il; i++) {
    env.expandToInclude(coords[i]);
  }

  return env;
};


/**
 * Sets the sites which will be triangulated. Calls the correct setSites*
 * function after argument-checking
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.setSites = function() {
  var arg = arguments[0];

  if (arg instanceof jsts.geom.Geometry ||
      arg instanceof jsts.geom.Coordinate || arg instanceof jsts.geom.Point ||
      arg instanceof jsts.geom.MultiPoint ||
      arg instanceof jsts.geom.LineString ||
      arg instanceof jsts.geom.MultiLineString ||
      arg instanceof jsts.geom.LinearRing || arg instanceof jsts.geom.Polygon ||
      arg instanceof jsts.geom.MultiPolygon) {
    this.setSitesFromGeometry(arg);
  } else {
    this.setSitesFromCollection(arg);
  }
};


/**
 * Sets the sites (point or vertices) which will be triangulated. All vertices
 * of the given geometry will be used as sites.
 *
 * @param {jsts.geom.Geometry}
 *          geom the geometry from which the sites will be extracted.
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.setSitesFromGeometry = function(
    geom) {
  // remove any duplicate points (they will cause the triangulation to fail)
  this.siteCoords = jsts.triangulate.DelauneyTriangulationBuilder
      .extractUniqueCoordinates(geom);
};


/**
 * Sets the sites (point or vertices) which will be triangulated from a
 * collection of {@link Coordinate}s.
 *
 * @param {Array{Coordinates}}
 *          coords a collection of Coordinates.
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.setSitesFromCollection = function(
    coords) {
  // remove any duplicate points (they will cause the triangulation to fail)
  this.siteCoords = jsts.triangulate.DelauneyTriangulationBuilder.extractUniqueCoordinates
      .unique(coords);
};


/**
 * Sets the snapping tolerance which will be used to improved the robustness of
 * the triangulation computation. A tolerance of 0.0 specifies that no snapping
 * will take place.
 *
 * @param {Number}
 *          tolerance the tolerance distance to use.
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.setTolerance = function(
    tolerance) {
  this.tolerance = tolerance;
};


/**
 * Creates the delauney-triangulation.
 *
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.create = function() {
  if (this.subdiv === null) {
    var siteEnv, vertices, triangulator;

    siteEnv = jsts.triangulate.DelauneyTriangulationBuilder
        .envelope(this.siteCoords);
    vertices = jsts.triangulate.DelauneyTriangulationBuilder
        .toVertices(this.siteCoords);
    this.subdiv = new jsts.triangulate.quadedge.QuadEdgeSubdivision(siteEnv,
        this.tolerance);
    triangulator = new jsts.triangulate.IncrementalDelauneyTriangulator(
        this.subdiv);
    triangulator.insertSites(vertices);
  }
};


/**
 * Gets the {jsts.triangulate.quadedge.QuadEdgeSubdivision} which models the
 * computed triangulation.
 *
 * @return {jsts.triangulate.quadedge.QuadEdgeSubdivision} containing the
 *         triangulation.
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.getSubdivision = function() {
  this.create();
  return this.subdiv;
};


/**
 * Gets the edges of the computed triangulation as a {@link MultiLineString}.
 *
 * @param {jsts.geom.GeometryFactory}
 *          geomFact the geometry factory to use to create the output.
 * @return {jsts.geom.Geometry} the edges of the triangulation.
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.getEdges = function(
    geomFact) {
  this.create();
  return this.subdiv.getEdges(geomFact);
};


/**
 * Gets the faces of the computed triangulation as a {@link GeometryCollection}
 * of {@link Polygon}.
 *
 * @param {jsts.geom.GeometryFactory}
 *          geomFact the geometry factory to use to create the output.
 * @return {jsts.geom.Geometry} the faces of the triangulation.
 */
jsts.triangulate.DelauneyTriangulationBuilder.prototype.getTriangles = function(
    geomFact) {
  this.create();
  return this.subdiv.getTriangles(geomFact);
};
