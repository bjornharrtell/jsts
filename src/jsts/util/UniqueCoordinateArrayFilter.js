/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/geom/CoordinateFilter.js
   */

  var ArrayList = javascript.util.ArrayList;
  var TreeSet = javascript.util.TreeSet;

  var CoordinateFilter = jsts.geom.CoordinateFilter;

  /**
   * A {@link CoordinateFilter} that builds a set of <code>Coordinate</code>s.
   * The set of coordinates contains no duplicate points.
   *
   * @constructor
   */
  var UniqueCoordinateArrayFilter = function() {
    this.treeSet = new TreeSet();
    this.list = new ArrayList();
  };


  UniqueCoordinateArrayFilter.prototype = new CoordinateFilter();

  UniqueCoordinateArrayFilter.prototype.treeSet = null;
  UniqueCoordinateArrayFilter.prototype.list = null;


  /**
   * Returns the gathered <code>Coordinate</code>s.
   *
   * @return the <code>Coordinate</code>s collected by this
   *         <code>CoordinateArrayFilter.</code>
   */
  UniqueCoordinateArrayFilter.prototype.getCoordinates = function() {
    return this.list.toArray();
  };

  UniqueCoordinateArrayFilter.prototype.filter = function(coord) {
    if (!this.treeSet.contains(coord)) {
      this.list.add(coord);
      this.treeSet.add(coord);
    }
  };

  jsts.util.UniqueCoordinateArrayFilter = UniqueCoordinateArrayFilter;
})();
