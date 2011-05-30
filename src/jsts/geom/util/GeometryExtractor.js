/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * @requires jsts/geom/GeometryFilter.js
 */



/**
 * Constructs a filter with a list in which to store the elements found.
 *
 * @param clz the class of the components to extract (null means all types).
 * @param {[]} comps the list to extract into.
 * @augments GeometryFilter
 * @constructor
 */
jsts.geom.util.GeometryExtractor = function(clz, comps) {
  this.clz = clz;
  this.comps = comps;
};

jsts.geom.util.GeometryExtractor.prototype = new jsts.geom.GeometryFilter();


/**
 * @private
 */
jsts.geom.util.GeometryExtractor.prototype.clz = null;


/**
 * @private
 */
jsts.geom.util.GeometryExtractor.prototype.comps = null;


/**
 * Extracts the components of type <tt>clz</tt> from a {@link Geometry}
 * and adds them to the provided {@link List} if provided.
 *
 * @param {Geometry} geom the geometry from which to extract.
 * @param {Object} clz
 * @param {[]} [list] the list to add the extracted elements to.
 *
 * @return {[]}
 */
jsts.geom.util.GeometryExtractor.extract = function(geom, clz, list) {
  list = list || [];
  if (geom instanceof clz) {
    list.add(geom);
  }
  else if (geom instanceof jsts.geom.GeometryCollection) {
    geom.apply(new jsts.geom.util.GeometryExtractor(clz, list));
  }
  //skip non-LineString elemental geometries

  return list;
};


/**
 * @param {Geometry} geom
 */
jsts.geom.util.GeometryExtractor.prototype.filter = function(geom) {
  if (this.clz === null || geom instanceof this.clz) {
    this.comps.push(geom);
  }
};
