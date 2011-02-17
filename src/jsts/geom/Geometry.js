/* Copyright (c) 2011 by Björn Harrtell.
 * Published under the GNU Lesser GPL 2.1 license.
 * See https://github.com/bjornharrtell/jsts/blob/master/license.txt for the
 * full text of the license.
 */

/**
 * The base class for all geometric objects.
 *
 *  <H3>Binary Predicates</H3>
 * Because it is not clear at this time
 * what semantics for spatial
 *  analysis methods involving <code>GeometryCollection</code>s would be useful,
 *  <code>GeometryCollection</code>s are not supported as arguments to binary
 *  predicates (other than <code>convexHull</code>) or the <code>relate</code>
 *  method.
 *
 *  <H3>Set-Theoretic Methods</H3>
 *
 *  The spatial analysis methods will
 *  return the most specific class possible to represent the result. If the
 *  result is homogeneous, a <code>Point</code>, <code>LineString</code>, or
 *  <code>Polygon</code> will be returned if the result contains a single
 *  element; otherwise, a <code>MultiPoint</code>, <code>MultiLineString</code>,
 *  or <code>MultiPolygon</code> will be returned. If the result is
 *  heterogeneous a <code>GeometryCollection</code> will be returned. <P>
 *
 *  Because it is not clear at this time what semantics for set-theoretic
 *  methods involving <code>GeometryCollection</code>s would be useful,
 * <code>GeometryCollections</code>
 *  are not supported as arguments to the set-theoretic methods.
 *
 *  <H4>Representation of Computed Geometries </H4>
 *
 *  The SFS states that the result
 *  of a set-theoretic method is the "point-set" result of the usual
 *  set-theoretic definition of the operation (SFS 3.2.21.1). However, there are
 *  sometimes many ways of representing a point set as a <code>Geometry</code>.
 *  <P>
 *
 *  The SFS does not specify an unambiguous representation of a given point set
 *  returned from a spatial analysis method. One goal of JTS is to make this
 *  specification precise and unambiguous. JTS will use a canonical form for
 *  <code>Geometry</code>s returned from spatial analysis methods. The canonical
 *  form is a <code>Geometry</code> which is simple and noded:
 *  <UL>
 *    <LI> Simple means that the Geometry returned will be simple according to
 *    the JTS definition of <code>isSimple</code>.
 *    <LI> Noded applies only to overlays involving <code>LineString</code>s. It
 *    means that all intersection points on <code>LineString</code>s will be
 *    present as endpoints of <code>LineString</code>s in the result.
 *  </UL>
 *  This definition implies that non-simple geometries which are arguments to
 *  spatial analysis methods must be subjected to a line-dissolve process to
 *  ensure that the results are simple.
 *
 *  <H4> Constructed Points And The Precision Model </H4>
 *
 *  The results computed by the set-theoretic methods may contain constructed
 *  points which are not present in the input <code>Geometry</code>.
 *  These new points arise from intersections between line segments in the
 *  edges of the input <code>Geometry</code>s. In the general case it is not
 *  possible to represent constructed points exactly. This is due to the fact
 *  that the coordinates of an intersection point may contain twice as many bits
 *  of precision as the coordinates of the input line segments. In order to
 *  represent these constructed points explicitly, JTS must truncate them to fit
 *  the <code>PrecisionModel</code>.
 *
 *  Unfortunately, truncating coordinates moves them slightly. Line segments
 *  which would not be coincident in the exact result may become coincident in
 *  the truncated representation. This in turn leads to "topology collapses" --
 *  situations where a computed element has a lower dimension than it would in
 *  the exact result.
 *
 *  When JTS detects topology collapses during the computation of spatial
 *  analysis methods, it will throw an exception. If possible the exception will
 *  report the location of the collapse.
 *
 *  #equals(Object) and #hashCode are not overridden, so that when two
 *  topologically equal Geometries are added to HashMaps and HashSets, they
 *  remain distinct. This behaviour is desired in many cases.
 */



/**
 * Creates a new <tt>Geometry</tt> via the specified GeometryFactory.
 *
 * @constructor
 * @param {jsts.geom.GeometryFactory}
 *          factory The jsts.geom.GeometryFactory to use to create the Geometry.
 */
jsts.geom.Geometry = function(factory) {
  this.factory = factory;
  this.SRID = factory.getSRID();
};


/**
 * The {@link GeometryFactory} used to create this Geometry.
 */
jsts.geom.Geometry.prototype.factory = null;


/**
 * The bounding box of this <code>Geometry</code>.
 */
jsts.geom.Geometry.prototype.envelope = null;


/**
 * The ID of the Spatial Reference System used by this <code>Geometry</code>
 */
jsts.geom.Geometry.prototype.SRID = null;


/**
 *  Returns the name of this object's <code>com.vivid.jts.geom</code>
 *  interface.
 *
 *@return {String} the name of this <code>Geometry</code>s most specific <code>jsts.geom</code>
 *      interface
 */
jsts.geom.Geometry.prototype.getGeometryType = function() {};


/**
 *  Returns the ID of the Spatial Reference System used by the <code>Geometry</code>.
 *
 *  JTS supports Spatial Reference System information in the simple way
 *  defined in the SFS. A Spatial Reference System ID (SRID) is present in
 *  each <code>Geometry</code> object. <code>Geometry</code> provides basic
 *  accessor operations for this field, but no others. The SRID is represented
 *  as an integer.
 *
 *@return {int}   the ID of the coordinate space in which the <code>Geometry</code>
 *      is defined.
 *
 */
jsts.geom.Geometry.prototype.getSRID() {
  return this.SRID;
}


/**
 * Gets the factory which contains the context in which this geometry was created.
 *
 * @return {jsts.geom.GeometryFactory} the factory for this geometry.
 */
jsts.geom.Geometry.prototype.getFactory() {
  return this.factory;
}


/**
 * Gets the user data object for this geometry, if any.
 *
 * @return {Object} the user data object, or <code>null</code> if none set.
 */
jsts.geom.Geometry.prototype.getUserData() {
  return userData;
}


/**
 * Returns the number of {@link Geometry}s in a {@link GeometryCollection}
 * (or 1, if the geometry is not a collection).
 *
 * @return {int} the number of geometries contained in this geometry.
 */
jsts.geom.Geometry.prototype.getNumGeometries() {
  return 1;
}


/**
 * Returns an element {@link Geometry} from a {@link GeometryCollection}
 * (or <code>this</code>, if the geometry is not a collection).
 *
 * @param {int} n the index of the geometry element.
 * @return {Geometry} the n'th geometry contained in this geometry.
 */
jsts.geom.Geometry.prototype.getGeometryN(n) {
  return this;
}


/**
 * A simple scheme for applications to add their own custom data to a Geometry.
 * An example use might be to add an object representing a Coordinate Reference System.
 *
 * Note that user data objects are not present in geometries created by
 * construction methods.
 *
 * @param {Object} userData an object, the semantics for which are defined by the
 * application using this Geometry.
 */
jsts.geom.Geometry.prototype.setUserData(userData) {
  this.userData = userData;
}


/**
 *  Returns the <code>PrecisionModel</code> used by the <code>Geometry</code>.
 *
 *@return  {PrecisionModel}  the specification of the grid of allowable points, for this
 *      <code>Geometry</code> and all other <code>Geometry</code>s
 */
jsts.geom.Geometry.prototype.getPrecisionModel() {
  return this.factory.getPrecisionModel();
}


/**
 *  Returns a vertex of this <code>Geometry</code>
 *  (usually, but not necessarily, the first one).
 *  The returned coordinate should not be assumed
 *  to be an actual Coordinate object used in
 *  the internal representation.
 *
 *@return {Coordinate}   a {@link Coordinate} which is a vertex of this <code>Geometry</code>.
 *@return null if this Geometry is empty
 */
jsts.geom.Geometry.prototype.getCoordinate = function() {};


/**
 *  Returns an array containing the values of all the vertices for
 *  this geometry.
 *  If the geometry is a composite, the array will contain all the vertices
 *  for the components, in the order in which the components occur in the geometry.
 *  <p>
 *  In general, the array cannot be assumed to be the actual internal
 *  storage for the vertices.  Thus modifying the array
 *  may not modify the geometry itself.
 *  Use the {@link CoordinateSequence#setOrdinate} method
 *  (possibly on the components) to modify the underlying data.
 *  If the coordinates are modified,
 *  {@link #geometryChanged} must be called afterwards.
 *
 *@return  {Coordinate[]}  the vertices of this <code>Geometry</code>
 *@see geometryChanged
 *@see CoordinateSequence#setOrdinate
 */
jsts.geom.Geometry.prototype.getCoordinates = function() {};


/**
 *  Returns the count of this <code>Geometry</code>s vertices. The <code>Geometry</code>
 *  s contained by composite <code>Geometry</code>s must be
 *  Geometry's; that is, they must implement <code>getNumPoints</code>
 *
 *@return  {int}  the number of vertices in this <code>Geometry</code>
 */
jsts.geom.Geometry.prototype.getNumPoints = function() {};


/**
 * Tests whether this {@link Geometry} is simple.
 * In general, the SFS specification of simplicity
 * follows the rule:
 *  <UL>
 *    <LI> A Geometry is simple iff the only self-intersections are at
 *    boundary points.
 *  </UL>
 * Simplicity is defined for each {@link Geometry} subclass as follows:
 * <ul>
 * <li>Valid polygonal geometries are simple by definition, so
 * <code>isSimple</code> trivially returns true.
 * <li>Linear geometries are simple iff they do not self-intersect at points
 * other than boundary points.
 * <li>Zero-dimensional geometries (points) are simple iff they have no
 * repeated points.
 * <li>Empty <code>Geometry</code>s are always simple
 * <ul>
 *
 * @return {boolean}   <code>true</code> if this <code>Geometry</code> has any points of
 *      self-tangency, self-intersection or other anomalous points.
 * @see #isValid
 */
jsts.geom.Geometry.prototype.isSimple = function() {
  this.checkNotGeometryCollection(this);
  IsSimpleOp op = new IsSimpleOp(this);
  return op.isSimple();
};


/**
 *  Tests the validity of this <code>Geometry</code>.
 *  Subclasses provide their own definition of "valid".
 *
 *@return  {boolean}  <code>true</code> if this <code>Geometry</code> is valid
 *
 * @see IsValidOp
 */
jsts.geom.Geometry.prototype.isValid = function() {
  IsValidOp isValidOp = new IsValidOp(this);
  return isValidOp.isValid();
};


/**
 *  Returns whether or not the set of points in this <code>Geometry</code> is
 *  empty.
 *
 *@return  {boolean}  <code>true</code> if this <code>Geometry</code> equals the empty
 *      geometry
 */
jsts.geom.Geometry.prototype.isEmpty = function() {};


/**
 *  Returns the minimum distance between this <code>Geometry</code>
 *  and the <code>Geometry</code> g
 *
 * @param  {Geometry} g  the <code>Geometry</code> from which to compute the distance.
 * @return the distance between the geometries.
 * @return {double} 0 if either input geometry is empty.
 * @throws IllegalArgumentException if g is null
 */
jsts.geom.Geometry.prototype.distance = function(g) {
  return DistanceOp.distance(this, g);
};


/**
 * Tests whether the distance from this <code>Geometry</code>
 * to another is less than or equal to a specified value.
 *
 * @param {Geometry} geom the Geometry to check the distance to.
 * @param {double} distance the distance value to compare.
 * @return {boolean} <code>true</code> if the geometries are less than <code>distance</code> apart.
 */
jsts.geom.Geometry.prototype.isWithinDistance = function(geom, distance) {
  var envDist = this.getEnvelopeInternal().distance(geom.getEnvelopeInternal());
  if (envDist > distance)
    return false;
  return DistanceOp.isWithinDistance(this, geom, distance);
};


/**
 *  Returns the area of this <code>Geometry</code>.
 *  Areal Geometries have a non-zero area.
 *  They override this function to compute the area.
 *  Others return 0.0
 *
 *@return {double} the area of the Geometry
 */
jsts.geom.Geometry.prototype.getArea = function() {
  return 0.0;
};


/**
 *  Returns the length of this <code>Geometry</code>.
 *  Linear geometries return their length.
 *  Areal geometries return their perimeter.
 *  They override this function to compute the area.
 *  Others return 0.0
 *
 *@return the length of the Geometry
 */
jsts.geom.Geometry.prototype.getLength = function() {
  return 0.0;
};


/**
 * Computes the centroid of this <code>Geometry</code>.
 * The centroid
 * is equal to the centroid of the set of component Geometries of highest
 * dimension (since the lower-dimension geometries contribute zero
 * "weight" to the centroid)
 *
 * @return a {@link Point} which is the centroid of this Geometry.
 */
jsts.geom.Geometry.prototype.getCentroid = function() {
  if (isEmpty()) { return null; }
  Coordinate centPt = null;
  int dim = getDimension();
  if (dim == 0) {
    CentroidPoint cent = new CentroidPoint();
    cent.add(this);
    centPt = cent.getCentroid();
  }
  else if (dim == 1) {
    CentroidLine cent = new CentroidLine();
    cent.add(this);
    centPt = cent.getCentroid();
  }
  else {
    CentroidArea cent = new CentroidArea();
    cent.add(this);
    centPt = cent.getCentroid();
  }
  return createPointFromInternalCoord(centPt, this);

};


/**
 * Computes an interior point of this <code>Geometry</code>.
 * An interior point is guaranteed to lie in the interior of the Geometry,
 * if it possible to calculate such a point exactly. Otherwise,
 * the point may lie on the boundary of the geometry.
 *
 * @return {Point} a {@link Point} which is in the interior of this Geometry.
 */
jsts.geom.Geometry.prototype.getInteriorPoint = function()
    {
  Coordinate interiorPt = null;
  int dim = getDimension();
  if (dim == 0) {
    InteriorPointPoint intPt = new InteriorPointPoint(this);
    interiorPt = intPt.getInteriorPoint();
  }
  else if (dim == 1) {
    InteriorPointLine intPt = new InteriorPointLine(this);
    interiorPt = intPt.getInteriorPoint();
  }
  else {
    InteriorPointArea intPt = new InteriorPointArea(this);
    interiorPt = intPt.getInteriorPoint();
  }
  return createPointFromInternalCoord(interiorPt, this);
};


/**
 * Returns the dimension of this geometry.
 * The dimension of a geometry is is the topological
 * dimension of its embedding in the 2-D Euclidean plane.
 * In the JTS spatial model, dimension values are in the set {0,1,2}.
 * <p>
 * Note that this is a different concept to the dimension of
 * the vertex {@link Coordinate}s.
 * The geometry dimension can never be greater than the coordinate dimension.
 * For example, a 0-dimensional geometry (e.g. a Point)
 * may have a coordinate dimension of 3 (X,Y,Z).
 *
 *@return {int} the topological dimension of this geometry.
 */
jsts.geom.Geometry.prototype.getDimension = function() {};


/**
 * Returns the boundary, or an empty geometry of appropriate dimension
 * if this <code>Geometry</code>  is empty.
 * (In the case of zero-dimensional geometries, '
 * an empty GeometryCollection is returned.)
 * For a discussion of this function, see the OpenGIS Simple
 * Features Specification. As stated in SFS Section 2.1.13.1, "the boundary
 * of a Geometry is a set of Geometries of the next lower dimension."
 *
 *@return {Geometry}   the closure of the combinatorial boundary of this <code>Geometry</code>
 */
jsts.geom.Geometry.prototype.getBoundary = function() {};


/**
 *  Returns the dimension of this <code>Geometry</code>s inherent boundary.
 *
 *@return  {int}  the dimension of the boundary of the class implementing this
 *      interface, whether or not this object is the empty geometry. Returns
 *      <code>Dimension.FALSE</code> if the boundary is the empty geometry.
 */
jsts.geom.Geometry.prototype.getBoundaryDimension = function() {};


/**
 *  Returns this <code>Geometry</code>s bounding box. If this <code>Geometry</code>
 *  is the empty geometry, returns an empty <code>Point</code>. If the <code>Geometry</code>
 *  is a point, returns a non-empty <code>Point</code>. Otherwise, returns a
 *  <code>Polygon</code> whose points are (minx, miny), (maxx, miny), (maxx,
 *  maxy), (minx, maxy), (minx, miny).
 *
 *@return  {Geometry}  an empty <code>Point</code> (for empty <code>Geometry</code>s), a
 *      <code>Point</code> (for <code>Point</code>s) or a <code>Polygon</code>
 *      (in all other cases)
 */
jsts.geom.Geometry.prototype.getEnvelope = function() {
  return this.getFactory().toGeometry(this.getEnvelopeInternal());
};


/**
 *  Returns the minimum and maximum x and y values in this <code>Geometry</code>
 *  , or a null <code>Envelope</code> if this <code>Geometry</code> is empty.
 *
 *@return {Envelope}   this <code>Geometry</code>s bounding box; if the <code>Geometry</code>
 *      is empty, <code>Envelope#isNull</code> will return <code>true</code>
 */
jsts.geom.Geometry.prototype.getEnvelopeInternal = function() {
  if (this.envelope == null) {
    this.envelope = this.computeEnvelopeInternal();
  }
  return envelope;
};


/**
 * Tests whether this geometry is disjoint from the specified geometry.
 * <p>
 * The <code>disjoint</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>The two geometries have no point in common
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 * <code>[FF*FF****]</code>
 * <li><code>! g.intersects(this)</code>
 * (<code>disjoint</code> is the inverse of <code>intersects</code>)
 * </ul>
 *
 *@param {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return {boolean}       <code>true</code> if the two <code>Geometry</code>s are
 *      disjoint
 *
 * @see Geometry#intersects
 */
jsts.geom.Geometry.prototype.disjoint = function(g) {
  return !this.intersects(g);
};


/**
 * Tests whether this geometry touches the
 * specified geometry.
 * <p>
 * The <code>touches</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>The geometries have at least one point in common, but their interiors do not intersect.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 *   <code>[FT*******]</code> or <code>[F**T*****]</code> or <code>[F***T****]</code>
 * </ul>
 * If both geometries have dimension 0, this predicate returns <code>false</code>
 *
 *@param  {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return  {boolean}      <code>true</code> if the two <code>Geometry</code>s touch;
 *      Returns <code>false</code> if both <code>Geometry</code>s are points
 */
jsts.geom.Geometry.prototype.touches = function(g)  {
  // short-circuit test
  if (!this.getEnvelopeInternal().intersects(g.getEnvelopeInternal()))
    return false;
  return this.relate(g).isTouches(this.getDimension(), g.getDimension());
};


/**
 * Tests whether this geometry intersects the specified geometry.
 * <p>
 * The <code>intersects</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>The two geometries have at least one point in common
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 *    <code>[T********]</code>
 * or <code>[*T*******]</code>
 * or <code>[***T*****]</code>
 * or <code>[****T****]</code>
 * <li><code>! g.disjoint(this)</code>
 * (<code>intersects</code> is the inverse of <code>disjoint</code>)
 * </ul>
 *
 *@param  {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return  {boolean}      <code>true</code> if the two <code>Geometry</code>s intersect
 *
 * @see Geometry#disjoint
 */
jsts.geom.Geometry.prototype.intersects = function(g) {

  // short-circuit envelope test
  if (! getEnvelopeInternal().intersects(g.getEnvelopeInternal()))
    return false;

  /**
   * TODO: (MD) Add optimizations:
   *
   * - for P-A case:
   * If P is in env(A), test for point-in-poly
   *
   * - for A-A case:
   * If env(A1).overlaps(env(A2))
   * test for overlaps via point-in-poly first (both ways)
   * Possibly optimize selection of point to test by finding point of A1
   * closest to centre of env(A2).
   * (Is there a test where we shouldn't bother - e.g. if env A
   * is much smaller than env B, maybe there's no point in testing
   * pt(B) in env(A)?
   */

  // optimization for rectangle arguments
  if (isRectangle()) {
    return RectangleIntersects.intersects((Polygon) this, g);
  }
  if (g.isRectangle()) {
    return RectangleIntersects.intersects((Polygon) g, this);
  }
  // general case
  return relate(g).isIntersects();
};


/**
 * Tests whether this geometry crosses the
 * specified geometry.
 * <p>
 * The <code>crosses</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>The geometries have some but not all interior points in common.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 *   <ul>
 *    <li><code>[T*T******]</code> (for P/L, P/A, and L/A situations)
 *    <li><code>[T*****T**]</code> (for L/P, A/P, and A/L situations)
 *    <li><code>[0********]</code> (for L/L situations)
 *   </ul>
 * </ul>
 * For any other combination of dimensions this predicate returns <code>false</code>.
 * <p>
 * The SFS defined this predicate only for P/L, P/A, L/L, and L/A situations.
 * JTS extends the definition to apply to L/P, A/P and A/L situations as well,
 * in order to make the relation symmetric.
 *
 *@param {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return  {boolean}      <code>true</code> if the two <code>Geometry</code>s cross.
 */
jsts.geom.Geometry.prototype.crosses = function(g) {
  // short-circuit test
  if (! getEnvelopeInternal().intersects(g.getEnvelopeInternal()))
    return false;
  return relate(g).isCrosses(getDimension(), g.getDimension());
};


/**
 * Tests whether this geometry is within the
 * specified geometry.
 * <p>
 * The <code>within</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>Every point of this geometry is a point of the other geometry,
 * and the interiors of the two geometries have at least one point in common.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 * <code>[T*F**F***]</code>
 * <li><code>g.contains(this)</code>
 * (<code>within</code> is the converse of <code>contains</code>)
 * </ul>
 * An implication of the definition is that
 * "The boundary of a Geometry is not within the Geometry".
 * In other words, if a geometry A is a subset of
 * the points in the boundary of a geomtry B, <code>A.within(B) = false</code>
 *
 *@param {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return   {boolean}     <code>true</code> if this <code>Geometry</code> is within
 *      <code>other</code>
 *
 * @see Geometry#contains
 */
jsts.geom.Geometry.prototype.within = function(g) {
  return g.contains(this);
};


/**
 * Tests whether this geometry contains the
 * specified geometry.
 * <p>
 * The <code>contains</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>Every point of the other geometry is a point of this geometry,
 * and the interiors of the two geometries have at least one point in common.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 * <code>[T*****FF*]</code>
 * <li><code>g.within(this)</code>
 * (<code>contains</code> is the converse of <code>within</code>)
 * </ul>
 * An implication of the definition is that "Geometries do not
 * contain their boundary".  In other words, if a geometry A is a subset of
 * the points in the boundary of a geometry B, <code>B.contains(A) = false</code>
 *
 *@param {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return  {boolean}      <code>true</code> if this <code>Geometry</code> contains <code>g</code>
 *
 * @see Geometry#within
 */
jsts.geom.Geometry.prototype.contains = function(Geometry g) {
  // short-circuit test
  if (! getEnvelopeInternal().contains(g.getEnvelopeInternal()))
    return false;
  // optimization for rectangle arguments
  if (isRectangle()) {
    return RectangleContains.contains((Polygon) this, g);
  }
  // general case
  return relate(g).isContains();
};


/**
 * Tests whether this geometry overlaps the
 * specified geometry.
 * <p>
 * The <code>overlaps</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>The geometries have at least one point each not shared by the other
 * (or equivalently neither covers the other),
 * they have the same dimension,
 * and the intersection of the interiors of the two geometries has
 * the same dimension as the geometries themselves.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 *   <code>[T*T***T**]</code> (for two points or two surfaces)
 *   or <code>[1*T***T**]</code> (for two curves)
 * </ul>
 * If the geometries are of different dimension this predicate returns <code>false</code>.
 *
 *@param {Geometry}g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return  {boolean}      <code>true</code> if the two <code>Geometry</code>s overlap.
 */
jsts.geom.Geometry.prototype.overlaps = function(g) {
  // short-circuit test
  if (! getEnvelopeInternal().intersects(g.getEnvelopeInternal()))
    return false;
  return relate(g).isOverlaps(getDimension(), g.getDimension());
};


/**
 * Tests whether this geometry covers the
 * specified geometry.
 * <p>
 * The <code>covers</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>Every point of the other geometry is a point of this geometry.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 *    <code>[T*****FF*]</code>
 * or <code>[*T****FF*]</code>
 * or <code>[***T**FF*]</code>
 * or <code>[****T*FF*]</code>
 * <li><code>g.coveredBy(this)</code>
 * (<code>covers</code> is the converse of <code>coveredBy</code>)
 * </ul>
 * If either geometry is empty, the value of this predicate is <tt>false</tt>.
 * <p>
 * This predicate is similar to {@link #contains},
 * but is more inclusive (i.e. returns <tt>true</tt> for more cases).
 * In particular, unlike <code>contains</code> it does not distinguish between
 * points in the boundary and in the interior of geometries.
 * For most situations, <code>covers</code> should be used in preference to <code>contains</code>.
 * As an added benefit, <code>covers</code> is more amenable to optimization,
 * and hence should be more performant.
 *
 *@param {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return   {boolean}     <code>true</code> if this <code>Geometry</code> covers <code>g</code>
 *
 * @see Geometry#contains
 * @see Geometry#coveredBy
 */
jsts.geom.Geometry.prototype.covers = function(g) {
  // short-circuit test
  if (! getEnvelopeInternal().covers(g.getEnvelopeInternal()))
    return false;
  // optimization for rectangle arguments
  if (isRectangle()) {
    // since we have already tested that the test envelope is covered
    return true;
  }
  return relate(g).isCovers();
};


/**
 * Tests whether this geometry is covered by the
 * specified geometry.
 * <p>
 * The <code>coveredBy</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>Every point of this geometry is a point of the other geometry.
 * <li>The DE-9IM Intersection Matrix for the two geometries matches
 *    <code>[T*F**F***]</code>
 * or <code>[*TF**F***]</code>
 * or <code>[**FT*F***]</code>
 * or <code>[**F*TF***]</code>
 * <li><code>g.covers(this)</code>
 * (<code>coveredBy</code> is the converse of <code>covers</code>)
 * </ul>
 * If either geometry is empty, the value of this predicate is <tt>false</tt>.
 * <p>
 * This predicate is similar to {@link #within},
 * but is more inclusive (i.e. returns <tt>true</tt> for more cases).
 *
 *@param {Geometry} g  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return  {boolean}      <code>true</code> if this <code>Geometry</code> is covered by <code>g</code>
 *
 * @see Geometry#within
 * @see Geometry#covers
 */
jsts.geom.Geometry.prototype.coveredBy = function(Geometry g) {
  return g.covers(this);
};


/**
 * Tests whether the elements in the DE-9IM
 * {@link IntersectionMatrix} for the two <code>Geometry</code>s match the elements in <code>intersectionPattern</code>.
 * The pattern is a 9-character string, with symbols drawn from the following set:
 *  <UL>
 *    <LI> 0 (dimension 0)
 *    <LI> 1 (dimension 1)
 *    <LI> 2 (dimension 2)
 *    <LI> T ( matches 0, 1 or 2)
 *    <LI> F ( matches FALSE)
 *    <LI> * ( matches any value)
 *  </UL>
 *  For more information on the DE-9IM, see the <i>OpenGIS Simple Features
 *  Specification</i>.
 *
 *@param  other                the <code>Geometry</code> with which to compare
 *      this <code>Geometry</code>
 *@param  intersectionPattern  the pattern against which to check the
 *      intersection matrix for the two <code>Geometry</code>s
 *@return                      <code>true</code> if the DE-9IM intersection
 *      matrix for the two <code>Geometry</code>s match <code>intersectionPattern</code>
 * @see IntersectionMatrix
 */
public boolean relate(Geometry g, String intersectionPattern) {
  return relate(g).matches(intersectionPattern);
}


/**
 *  Returns the DE-9IM {@link IntersectionMatrix} for the two <code>Geometry</code>s.
 *
 *@param  other  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return        an {@link IntersectionMatrix} describing the intersections of the interiors,
 *      boundaries and exteriors of the two <code>Geometry</code>s
 */
public IntersectionMatrix relate(Geometry g) {
  checkNotGeometryCollection(this);
  checkNotGeometryCollection(g);
  return RelateOp.relate(this, g);
}


/**
 * Tests whether this geometry is equal to the
 * specified geometry.
 * <p>
 * The <code>equals</code> predicate has the following equivalent definitions:
 * <ul>
 * <li>The two geometries have at least one point in common,
 * and no point of either geometry lies in the exterior of the other geometry.
 * <li>The DE-9IM Intersection Matrix for the two geometries is T*F**FFF*
 * </ul>
 * <b>Note</b> that this method computes topologically equality, not structural or
 * vertex-wise equality.
 *
 *@param  other  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return        <code>true</code> if the two <code>Geometry</code>s are equal
 */
public boolean equals(Geometry g) {
  // short-circuit test
  if (! getEnvelopeInternal().equals(g.getEnvelopeInternal()))
    return false;
  return relate(g).isEquals(getDimension(), g.getDimension());
}

public String toString() {
  return toText();
}


/**
 *  Returns the Well-known Text representation of this <code>Geometry</code>.
 *  For a definition of the Well-known Text format, see the OpenGIS Simple
 *  Features Specification.
 *
 *@return    the Well-known Text representation of this <code>Geometry</code>
 */
public String toText() {
  WKTWriter writer = new WKTWriter();
  return writer.write(this);
}


/**
 * Computes a buffer area around this geometry having the given width. The
 * buffer of a Geometry is the Minkowski sum or difference of the geometry
 * with a disc of radius <code>abs(distance)</code>.
 * <p>
 * Mathematically-exact buffer area boundaries can contain circular arcs.
 * To represent these arcs using linear geometry they must be approximated with line segments.
 * The buffer geometry is constructed using 8 segments per quadrant to approximate
 * the circular arcs.
 * The end cap style is <tt>CAP_ROUND</tt>.
 * <p>
 * The buffer operation always returns a polygonal result. The negative or
 * zero-distance buffer of lines and points is always an empty {@link Polygon}.
 * This is also the result for the buffers of degenerate (zero-area) polygons.
 *
 * @param distance
 *          the width of the buffer (may be positive, negative or 0).
 * @return a polygonal geometry representing the buffer region (which may be
 *         empty).
 *
 * @throws TopologyException
 *           if a robustness error occurs
 *
 * @see #buffer(double, int)
 * @see #buffer(double, int, int)
 */
public Geometry buffer(double distance) {
  return BufferOp.bufferOp(this, distance);
}


/**
 * Computes a buffer area around this geometry having the given width and with
 * a specified accuracy of approximation for circular arcs.
 * <p>
 * Mathematically-exact buffer area boundaries can contain circular arcs.
 * To represent these arcs
 * using linear geometry they must be approximated with line segments. The
 * <code>quadrantSegments</code> argument allows controlling the accuracy of
 * the approximation by specifying the number of line segments used to
 * represent a quadrant of a circle
 * <p>
 * The buffer operation always returns a polygonal result. The negative or
 * zero-distance buffer of lines and points is always an empty {@link Polygon}.
 * This is also the result for the buffers of degenerate (zero-area) polygons.
 *
 * @param distance
 *          the width of the buffer (may be positive, negative or 0).
 * @param quadrantSegments
 *          the number of line segments used to represent a quadrant of a
 *          circle.
 * @return a polygonal geometry representing the buffer region (which may be
 *         empty).
 *
 * @throws TopologyException
 *           if a robustness error occurs
 *
 * @see #buffer(double)
 * @see #buffer(double, int, int)
 */
public Geometry buffer(double distance, int quadrantSegments) {
  return BufferOp.bufferOp(this, distance, quadrantSegments);
}


/**
 * Computes a buffer area around this geometry having the given
 * width and with a specified accuracy of approximation for circular arcs,
 * and using a specified end cap style.
 * <p>
 * Mathematically-exact buffer area boundaries can contain circular arcs.
 * To represent these arcs using linear geometry they must be approximated with line segments.
 * The <code>quadrantSegments</code> argument allows controlling the
 * accuracy of the approximation
 * by specifying the number of line segments used to represent a quadrant of a circle
 * <p>
 * The end cap style specifies the buffer geometry that will be
 * created at the ends of linestrings.  The styles provided are:
 * <ul>
 * <li><tt>BufferOp.CAP_ROUND</tt> - (default) a semi-circle
 * <li><tt>BufferOp.CAP_BUTT</tt> - a straight line perpendicular to the end segment
 * <li><tt>BufferOp.CAP_SQUARE</tt> - a half-square
 * </ul>
 * <p>
 * The buffer operation always returns a polygonal result. The negative or
 * zero-distance buffer of lines and points is always an empty {@link Polygon}.
 * This is also the result for the buffers of degenerate (zero-area) polygons.
 *
 *@param  distance  the width of the buffer (may be positive, negative or 0)
 *@param quadrantSegments the number of line segments used to represent a quadrant of a circle
 *@param endCapStyle the end cap style to use
 *@return a polygonal geometry representing the buffer region (which may be empty)
 *
 * @throws TopologyException if a robustness error occurs
 *
 * @see #buffer(double)
 * @see #buffer(double, int)
 * @see BufferOp
 */
public Geometry buffer(double distance, int quadrantSegments, int endCapStyle) {
  return BufferOp.bufferOp(this, distance, quadrantSegments, endCapStyle);
}


/**
 *  Computes the smallest convex <code>Polygon</code> that contains all the
 *  points in the <code>Geometry</code>. This obviously applies only to <code>Geometry</code>
 *  s which contain 3 or more points; the results for degenerate cases are
 *  specified as follows:
 *  <TABLE>
 *    <TR>
 *      <TH>    Number of <code>Point</code>s in argument <code>Geometry</code>   </TH>
 *      <TH>    <code>Geometry</code> class of result     </TH>
 *    </TR>
 *    <TR>
 *      <TD>        0      </TD>
 *      <TD>        empty <code>GeometryCollection</code>      </TD>
 *    </TR>
 *    <TR>  <TD>      1     </TD>
 *      <TD>     <code>Point</code>     </TD>
 *    </TR>
 *    <TR>
 *      <TD>      2     </TD>
 *      <TD>     <code>LineString</code>     </TD>
 *    </TR>
 *    <TR>
 *      <TD>       3 or more     </TD>
 *      <TD>      <code>Polygon</code>     </TD>
 *    </TR>
 *  </TABLE>
 *
 *@return {Geometry}   the minimum-area convex polygon containing this <code>Geometry</code>'
 *      s points
 */
jsts.geom.Geometry.prototype.convexHull = function() {
  return (new ConvexHull(this)).getConvexHull();
};


/**
 * Computes a <code>Geometry</code> representing the points shared by this
 * <code>Geometry</code> and <code>other</code>.
 * {@link GeometryCollection}s support intersection with
 * homogeneous collection types, with the semantics that
 * the result is a {@link GeometryCollection} of the
 * intersection of each element of the target with the argument.
 *
 * @param  {Geometry} other the <code>Geometry</code> with which to compute the intersection.
 * @return {Geometry} the points common to the two <code>Geometry</code>s.
 * @throws TopologyException if a robustness error occurs
 * @throws IllegalArgumentException if the argument is a non-empty GeometryCollection
 */
jsts.geom.Geometry.prototype.intersection = function(other) {
  /**
   * TODO: MD - add optimization for P-A case using Point-In-Polygon
   */
  // special case: if one input is empty ==> empty
  if (this.isEmpty()) return this.getFactory().createGeometryCollection(null);
  if (other.isEmpty()) return this.getFactory().createGeometryCollection(null);

  // compute for GCs
  if (isGeometryCollection(this)) {
    final Geometry g2 = other;
    return GeometryCollectionMapper.map(
        (GeometryCollection) this,
        new GeometryCollectionMapper.MapOp() {
          public Geometry map(Geometry g) {
            return g.intersection(g2);
          }
        });
  }
  //  if (isGeometryCollection(other))
  //    return other.intersection(this);

  checkNotGeometryCollection(this);
  checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.INTERSECTION);
};


/**
 *  Computes a <code>Geometry</code> representing all the points in this <code>Geometry</code>
 *  and <code>other</code>.
 *
 *@param {Geometry} other  the <code>Geometry</code> with which to compute the union
 *@return {Geometry}       a set combining the points of this <code>Geometry</code> and
 *      the points of <code>other</code>
 * @throws TopologyException if a robustness error occurs
 * @throws IllegalArgumentException if either input is a non-empty GeometryCollection
 */
jsts.geom.Geometry.prototype.union = function(other) {
  // special case: if either input is empty ==> other input
  if (this.isEmpty()) return (Geometry) other.clone();
  if (other.isEmpty()) return (Geometry) clone();

  // TODO: optimize if envelopes of geometries do not intersect

  checkNotGeometryCollection(this);
  checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.UNION);
};


/**
 *  Computes a <code>Geometry</code> representing the points making up this
 *  <code>Geometry</code> that do not make up <code>other</code>. This method
 *  returns the closure of the resultant <code>Geometry</code>.
 *
 *@param {Geometry} other  the <code>Geometry</code> with which to compute the
 *      difference
 *@return {Geometry}       the point set difference of this <code>Geometry</code> with
 *      <code>other</code>
 * @throws TopologyException if a robustness error occurs
 * @throws IllegalArgumentException if either input is a non-empty GeometryCollection
 */
jsts.geom.Geometry.prototype.difference = function(other) {
  // mod to handle empty cases better - return type of input
  //if (this.isEmpty() || other.isEmpty()) return (Geometry) clone();

  // special case: if A.isEmpty ==> empty; if B.isEmpty ==> A
  if (this.isEmpty()) return this.getFactory().createGeometryCollection(null);
  if (other.isEmpty()) return (Geometry) clone();

  checkNotGeometryCollection(this);
  checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.DIFFERENCE);
};


/**
 *  Returns a set combining the points in this <code>Geometry</code> not in
 *  <code>other</code>, and the points in <code>other</code> not in this
 *  <code>Geometry</code>. This method returns the closure of the resultant
 *  <code>Geometry</code>.
 *
 *@param {Geometry} other  the <code>Geometry</code> with which to compute the symmetric
 *      difference
 *@return  {Geometry}      the point set symmetric difference of this <code>Geometry</code>
 *      with <code>other</code>
 * @throws TopologyException if a robustness error occurs
 * @throws IllegalArgumentException if either input is a non-empty GeometryCollection
 */
jsts.geom.Geometry.prototype.symDifference = function(other)
    {
  // special case: if either input is empty ==> other input
  if (this.isEmpty()) return (Geometry) other.clone();
  if (other.isEmpty()) return (Geometry) clone();

  checkNotGeometryCollection(this);
  checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(this, other, OverlayOp.SYMDIFFERENCE);
};


/**
 * Computes the union of all the elements of this geometry. Heterogeneous
 * {@link GeometryCollection}s are fully supported.
 *
 * The result obeys the following contract:
 * <ul>
 * <li>Unioning a set of {@link LineString}s has the effect of fully noding
 * and dissolving the linework.
 * <li>Unioning a set of {@link Polygon}s will always
 * return a {@link Polygonal} geometry (unlike {link #union(Geometry)},
 * which may return geometrys of lower dimension if a topology collapse occurred.
 * </ul>
 *
 * @return {Geometry}
 *
 * @see UnaryUnionOp
 */
jsts.geom.Geometry.prototype.union = function() {
  return UnaryUnionOp.union(this);
};


/**
 * Returns true if the two <code>Geometry</code>s are exactly equal,
 * up to a specified distance tolerance.
 * Two Geometries are exactly equal within a distance tolerance
 * if and only if:
 * <ul>
 * <li>they have the same class
 * <li>they have the same values for their vertices,
 * within the given tolerance distance, in exactly the same order.
 * </ul>
 * If this and the other <code>Geometry</code>s are
 * composites and any children are not <code>Geometry</code>s, returns
 * <code>false</code>.
 *
 * @param {Geometry} other  the <code>Geometry</code> with which to compare this <code>Geometry.</code>
 * @parm {double} tolerance distance at or below which two <code>Coordinate</code>s
 *   are considered equal
 * @return {boolean} <code>true</code> if this and the other <code>Geometry</code>
 *   are of the same class and have equal internal data.
 */
jsts.geom.Geometry.prototype.equalsExact = function(other, tolerance) {};


/**
 *  Returns true if the two <code>Geometry</code>s are exactly equal.
 * Two Geometries are exactly equal iff:
 * <ul>
 * <li>they have the same class
 * <li>they have the same values of Coordinates in their internal
 * Coordinate lists, in exactly the same order.
 * </ul>
 * If this and the other <code>Geometry</code>s are
 *  composites and any children are not <code>Geometry</code>s, returns
 *  false.
 * <p>
 *  This provides a stricter test of equality than
 *  <code>equals</code>.
 *
 *@param {Geometry} other  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return {boolean}       <code>true</code> if this and the other <code>Geometry</code>
 *      are of the same class and have equal internal data.
 */
jsts.geom.Geometry.prototype.equalsExact = function(other) { return equalsExact(other, 0); };


/**
 * Creates and returns a full copy of this {@link Geometry} object
 * (including all coordinates contained by it).
 * Subclasses are responsible for overriding this method and copying
 * their internal data.  Overrides should call this method first.
 *
 * @return {Object} a clone of this instance.
 */
jsts.geom.Geometry.prototype.clone = function() {
  Geometry clone = (Geometry) super.clone();
  if (clone.envelope != null) { clone.envelope = new Envelope(clone.envelope); }
  return clone;
};


/**
 *  Converts this <code>Geometry</code> to <b>normal form</b> (or <b>
 *  canonical form</b> ). Normal form is a unique representation for <code>Geometry</code>
 *  s. It can be used to test whether two <code>Geometry</code>s are equal
 *  in a way that is independent of the ordering of the coordinates within
 *  them. Normal form equality is a stronger condition than topological
 *  equality, but weaker than pointwise equality. The definitions for normal
 *  form use the standard lexicographical ordering for coordinates. "Sorted in
 *  order of coordinates" means the obvious extension of this ordering to
 *  sequences of coordinates.
 */
jsts.geom.Geometry.prototype.normalize = function() {};


/**
 *  Returns whether this <code>Geometry</code> is greater than, equal to,
 *  or less than another <code>Geometry</code>. <P>
 *
 *  If their classes are different, they are compared using the following
 *  ordering:
 *  <UL>
 *    <LI> Point (lowest)
 *    <LI> MultiPoint
 *    <LI> LineString
 *    <LI> LinearRing
 *    <LI> MultiLineString
 *    <LI> Polygon
 *    <LI> MultiPolygon
 *    <LI> GeometryCollection (highest)
 *  </UL>
 *  If the two <code>Geometry</code>s have the same class, their first
 *  elements are compared. If those are the same, the second elements are
 *  compared, etc.
 *
 *@param {Geometry} o  a <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@return {int}   a positive number, 0, or a negative number, depending on whether
 *      this object is greater than, equal to, or less than <code>o</code>, as
 *      defined in "Normal Form For Geometry" in the JTS Technical
 *      Specifications
 */
jsts.geom.Geometry.prototype.compareTo = function(other) {
  if (getClassSortIndex() != other.getClassSortIndex()) {
    return getClassSortIndex() - other.getClassSortIndex();
  }
  if (isEmpty() && other.isEmpty()) {
    return 0;
  }
  if (isEmpty()) {
    return -1;
  }
  if (other.isEmpty()) {
    return 1;
  }
  return compareToSameClass(o);
};


/**
 *  Returns whether this <code>Geometry</code> is greater than, equal to,
 *  or less than another <code>Geometry</code>,
 * using the given {@link CoordinateSequenceComparator}.
 * <P>
 *
 *  If their classes are different, they are compared using the following
 *  ordering:
 *  <UL>
 *    <LI> Point (lowest)
 *    <LI> MultiPoint
 *    <LI> LineString
 *    <LI> LinearRing
 *    <LI> MultiLineString
 *    <LI> Polygon
 *    <LI> MultiPolygon
 *    <LI> GeometryCollection (highest)
 *  </UL>
 *  If the two <code>Geometry</code>s have the same class, their first
 *  elements are compared. If those are the same, the second elements are
 *  compared, etc.
 *
 *@param {Geometry} other  a <code>Geometry</code> with which to compare this <code>Geometry</code>
 *@param {CoordinateSequenceComparator} comp a <code>CoordinateSequenceComparator</code>
 *
 *@return    a positive number, 0, or a negative number, depending on whether
 *      this object is greater than, equal to, or less than <code>o</code>, as
 *      defined in "Normal Form For Geometry" in the JTS Technical
 *      Specifications
 */
jsts.geom.Geometry.prototype.compareTo = function(other,  comp) {
  if (getClassSortIndex() != other.getClassSortIndex()) {
    return getClassSortIndex() - other.getClassSortIndex();
  }
  if (isEmpty() && other.isEmpty()) {
    return 0;
  }
  if (isEmpty()) {
    return -1;
  }
  if (other.isEmpty()) {
    return 1;
  }
  return compareToSameClass(o, comp);
};


/**
 *  Returns whether the two <code>Geometry</code>s are equal, from the point
 *  of view of the <code>equalsExact</code> method. Called by <code>equalsExact</code>
 *  . In general, two <code>Geometry</code> classes are considered to be
 *  "equivalent" only if they are the same class. An exception is <code>LineString</code>
 *  , which is considered to be equivalent to its subclasses.
 *
 *@param {Geometry} other  the <code>Geometry</code> with which to compare this <code>Geometry</code>
 *      for equality
 *@return  {boolean}      <code>true</code> if the classes of the two <code>Geometry</code>
 *      s are considered to be equal by the <code>equalsExact</code> method.
 */
jsts.geom.Geometry.prototype.isEquivalentClass = function(other) {
  return this.getClass().getName().equals(other.getClass().getName());
};


/**
 *  Throws an exception if <code>g</code>'s class is <code>GeometryCollection</code>
 *  . (Its subclasses do not trigger an exception).
 *
 *@param {Geometry} g                          the <code>Geometry</code> to check
 *@throws  IllegalArgumentException  if <code>g</code> is a <code>GeometryCollection</code>
 *      but not one of its subclasses
 */
jsts.geom.Geometry.prototype.checkNotGeometryCollection = function(g) {
  //Don't use instanceof because we want to allow subclasses
  if (g.getClass().getName().equals('com.vividsolutions.jts.geom.GeometryCollection')) {
    throw new IllegalArgumentException('This method does not support GeometryCollection arguments');
  }
};

jsts.geom.Geometry.prototype.isGeometryCollection = function(g)
    {
  return (instanceof jsts.geom.GeometryCollection);
};


/**
 *  Returns the minimum and maximum x and y values in this <code>Geometry</code>
 *  , or a null <code>Envelope</code> if this <code>Geometry</code> is empty.
 *  Unlike <code>getEnvelopeInternal</code>, this method calculates the <code>Envelope</code>
 *  each time it is called; <code>getEnvelopeInternal</code> caches the result
 *  of this method.
 *
 *@return    this <code>Geometry</code>s bounding box; if the <code>Geometry</code>
 *      is empty, <code>Envelope#isNull</code> will return <code>true</code>
 */
protected abstract Envelope computeEnvelopeInternal();


/**
 *  Returns whether this <code>Geometry</code> is greater than, equal to,
 *  or less than another <code>Geometry</code> having the same class.
 *
 *@param  o  a <code>Geometry</code> having the same class as this <code>Geometry</code>
 *@return    a positive number, 0, or a negative number, depending on whether
 *      this object is greater than, equal to, or less than <code>o</code>, as
 *      defined in "Normal Form For Geometry" in the JTS Technical
 *      Specifications
 */
protected abstract int compareToSameClass(Object o);


/**
 *  Returns whether this <code>Geometry</code> is greater than, equal to,
 *  or less than another <code>Geometry</code> of the same class.
 * using the given {@link CoordinateSequenceComparator}.
 *
 *@param  o  a <code>Geometry</code> having the same class as this <code>Geometry</code>
 *@param comp a <code>CoordinateSequenceComparator</code>
 *@return    a positive number, 0, or a negative number, depending on whether
 *      this object is greater than, equal to, or less than <code>o</code>, as
 *      defined in "Normal Form For Geometry" in the JTS Technical
 *      Specifications
 */
protected abstract int compareToSameClass(Object o, CoordinateSequenceComparator comp);


/**
 *  Returns the first non-zero result of <code>compareTo</code> encountered as
 *  the two <code>Collection</code>s are iterated over. If, by the time one of
 *  the iterations is complete, no non-zero result has been encountered,
 *  returns 0 if the other iteration is also complete. If <code>b</code>
 *  completes before <code>a</code>, a positive number is returned; if a
 *  before b, a negative number.
 *
 *@param  a  a <code>Collection</code> of <code>Comparable</code>s
 *@param  b  a <code>Collection</code> of <code>Comparable</code>s
 *@return    the first non-zero <code>compareTo</code> result, if any;
 *      otherwise, zero
 */
protected int compare(Collection a, Collection b) {
  Iterator i = a.iterator();
  Iterator j = b.iterator();
  while (i.hasNext() && j.hasNext()) {
    Comparable aElement = (Comparable) i.next();
    Comparable bElement = (Comparable) j.next();
    int comparison = aElement.compareTo(bElement);
    if (comparison != 0) {
      return comparison;
    }
  }
  if (i.hasNext()) {
    return 1;
  }
  if (j.hasNext()) {
    return -1;
  }
  return 0;
}

protected boolean equal(Coordinate a, Coordinate b, double tolerance) {
  if (tolerance == 0) { return a.equals(b); }
  return a.distance(b) <= tolerance;
}

private int getClassSortIndex() {
  if (sortedClasses == null)
    initSortedClasses();

  for (int i = 0; i < sortedClasses.length; i++) {
    if (sortedClasses[i].isInstance(this))
      return i;
  }
  Assert.shouldNeverReachHere('Class not supported: ' + this.getClass());
  return -1;
}

private static void initSortedClasses()
{
  sortedClasses = new Class[] {
    Point.class,
    MultiPoint.class,
    LineString.class,
    LinearRing.class,
    MultiLineString.class,
    Polygon.class,
    MultiPolygon.class,
    GeometryCollection.class };
}

private Point createPointFromInternalCoord(Coordinate coord, Geometry exemplar)
{
  exemplar.getPrecisionModel().makePrecise(coord);
  return exemplar.getFactory().createPoint(coord);
}
