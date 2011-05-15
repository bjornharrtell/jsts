/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
/**
 * Unions a collection of Geometry or a single Geometry
 * (which may be a collection) together.
 * By using this special-purpose operation over a collection of geometries
 * it is possible to take advantage of various optimizations to improve performance.
 * Heterogeneous {@link GeometryCollection}s are fully supported.
 * <p>
 * The result obeys the following contract:
 * <ul>
 * <li>Unioning a set of overlapping {@link Polygons}s has the effect of
 * merging the areas (i.e. the same effect as
 * iteratively unioning all individual polygons together).
 *
 * <li>Unioning a set of {@link LineString}s has the effect of <b>fully noding</b>
 * and <b>dissolving</b> the input linework.
 * In this context "fully noded" means that there will be a node or endpoint in the output
 * for every endpoint or line segment crossing in the input.
 * "Dissolved" means that any duplicate (e.g. coincident) line segments or portions
 * of line segments will be reduced to a single line segment in the output.
 * This is consistent with the semantics of the
 * {@link Geometry#union(Geometry)} operation.
 * If <b>merged</b> linework is required, the {@link LineMerger} class can be used.
 *
 * <li>Unioning a set of {@link Points}s has the effect of merging
 * al identical points (producing a set with no duplicates).
 * </ul>
 *
 * <tt>UnaryUnion</tt> always operates on the individual components of MultiGeometries.
 * So it is possible to use it to "clean" invalid self-intersecting MultiPolygons
 * (although the polygon components must all still be individually valid.)
 *
 */



/**
 *
 * @param {Geometry|Geometry[]} geoms  a Geometry or Geometry collection.
 * @param {GeometryFactory} gemFact a GeometryFactory.
 * @constructor
 */
jsts.operation.union.UnaryUnionOp = function(geoms, gemFact) {
  this.geomFact = geomFact;
  this.extract(geoms);
};


/**
 *
 * @param {Geometry|Geometry[]} geoms a Geometry or Geometry collection.
 * @param {Geometryfactory} gemFact a GeometryFactory.
 * @return {Geometry}
 */
jsts.operation.union.UnaryUnionOp.union = function(geoms, gemFact) {
  var op = new jsts.operation.union.UnaryUnionOp(geoms, gemFact);
  return op.union();
};


/**
 * @type {Polygon[]}
 */
jsts.operation.union.UnaryUnionOp.prototype.polygons = [];


/**
 * @type {Line[]}
 */
jsts.operation.union.UnaryUnionOp.prototype.lines = [];


/**
 * @type {Point[]}
 */
jsts.operation.union.UnaryUnionOp.prototype.points = [];


/**
 * @type {GeometryFactory}
 */
jsts.operation.union.UnaryUnionOp.prototype.geomFact = null;


/**
 * @param {Geometry|Geometry[]} geoms a Geometry or Geometry collection.
 */
jsts.operation.union.UnaryUnionOp.prototype.extract = function(geoms) {

};


/**
 * Gets the union of the input geometries.
 * If no input geometries were provided, a POINT EMPTY is returned.
 *
 * @return {Geometry} a Geometry containing the union.
 * @return {GeomatryCollection} an empty GEOMETRYCOLLECTION if no geometries were provided in the input.
 */
jsts.operation.union.UnaryUnionOp.prototype.union = function() {

};


/**
 * Computes the union of two geometries,
 * either of both of which may be null.
 *
 * @param {Geometry} g0 a Geometry.
 * @param {Geometry} g1 a Geometry.
 * @return {Geometry} the union of the input(s).
 * @return {null} null if both inputs are null.
 * @private
 */
jsts.operation.union.UnaryUnionOp.prototype.unionWithNull = function(g0, g1) {

};


/**
 * Computes a unary union with no extra optimization,
 * and no short-circuiting.
 * Due to the way the overlay operations
 * are implemented, this is still efficient in the case of linear
 * and puntal geometries.
 *
 * @param {Geometry} g0
 * @return the union of the input geometry.
 * @private
 */
jsts.operation.union.UnaryUnionOp.prototype.untionNoOpt = function(g0) {

};
