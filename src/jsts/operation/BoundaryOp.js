

/**
 * Computes the boundary of a {@link Geometry}.
 * Allows specifying the {@link BoundaryNodeRule} to be used.
 * This operation will always return a {@link Geometry} of the appropriate
 * dimension for the boundary (even if the input geometry is empty).
 * The boundary of zero-dimensional geometries (Points) is
 * always the empty {@link GeometryCollection}.
 *
 * @author Martin Davis
 * @version 1.7
 */

jsts.operation.BoundaryOp = function(geom, bnRule) {
  this.geom = geom;
  this.geomFact = geom.getFactory();
  this.bnRule = bnRule || jsts.algorithm.BoundaryNodeRule.MOD2_BOUNDARY_RULE;
};


/**
   * @type {Geometry}
   * @private
   */
jsts.operation.BoundaryOp.prototype.geom = null;


/**
   * @type {GeometryFactory}
   * @private
   */
jsts.operation.BoundaryOp.prototype.geomFact = null;


/**
   * @type {BoundaryNodeRule}
   * @private
   */
jsts.operation.BoundaryOp.prototype.bnRule = null;


/**
   * @return {Geometry}
   */
jsts.operation.BoundaryOp.prototype.getBoundary = function()  {
  if (this.geom instanceof jsts.geom.LineString) return this.boundaryLineString(this.geom);
  if (this.geom instanceof jsts.geom.MultiLineString) return this.boundaryMultiLineString(this.geom);
  return this.geom.getBoundary();
};


/**
   * @return {MultiPoint}
   * @private
   */
jsts.operation.BoundaryOp.prototype.getEmptyMultiPoint = function()  {
  return this.geomFact.createMultiPoint(null);
};


/**
   * @param {MultiLineString} mLine
   * @return {Geometry}
   * @private
   */
jsts.operation.BoundaryOp.prototype.boundaryMultiLineString = function(mLine)  {
  if (this.geom.isEmpty()) {
    return this.getEmptyMultiPoint();
  }

  var bdyPts = this.computeBoundaryCoordinates(mLine);

  // return Point or MultiPoint
  if (bdyPts.length == 1) {
    return this.geomFact.createPoint(bdyPts[0]);
  }
  // this handles 0 points case as well
  return this.geomFact.createMultiPoint(bdyPts);
};


/**
   * @type {Object}
   * @private
   */
jsts.operation.BoundaryOp.prototype.endpointMap = null;


/**
   * @param {MultiLineString} mLine
   * @return {Array.<Coordinate>}
   * @private
   */
jsts.operation.BoundaryOp.prototype.computeBoundaryCoordinates = function(mLine)  {
  var bdyPts = [];

  // TODO: find out how to port the treemap stuff...

  /*endpointMap = new TreeMap();
  for (var i = 0; i < mLine.getNumGeometries(); i++) {
    var line = mLine.getGeometryN(i);
    if (line.getNumPoints() == 0)
      continue;
    this.addEndpoint(line.getCoordinateN(0));
    this.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1));
  }*/

  /*for (Iterator it = endpointMap.entrySet().iterator(); it.hasNext(); ) {
      Map.Entry entry = (Map.Entry) it.next();
      Counter counter = (Counter) entry.getValue();
      int valence = counter.count;
      if (bnRule.isInBoundary(valence)) {
        bdyPts.push(entry.getKey());
      }
    }*/

  return bdyPts;
};


/**
   * @param {Coordinate} pt
   * @private
   */
jsts.operation.BoundaryOp.prototype.addEndpoint = function(pt)   {
  var counter = endpointMap.get(pt);
  if (counter == null) {
    counter = new Counter();
    endpointMap.put(pt, counter);
  }
  counter.count++;
};


/**
   * @param {LineString} line
   * @return {Geometry}
   * @private
   */
jsts.operation.BoundaryOp.prototype.boundaryLineString = function(line)  {
  if (this.geom.isEmpty()) {
    return this.getEmptyMultiPoint();
  }

  if (line.isClosed()) {
    // check whether endpoints of valence 2 are on the boundary or not
    var closedEndpointOnBoundary = this.bnRule.isInBoundary(2);
    if (closedEndpointOnBoundary) {
      return line.getStartPoint();
    }
    else {
      return this.geomFact.createMultiPoint(null);
    }
  }
  return this.geomFact.createMultiPoint([line.getStartPoint(),
        line.getEndPoint()]
  );
};


/**
 * Stores an integer count, for use as a Map entry.
 *
 * @author Martin Davis
 * @version 1.7
 */
/*class Counter
{

int count;
}*/
