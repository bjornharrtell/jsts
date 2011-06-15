/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/**
 * Combines {@link Geometry}s
 * to produce a {@link GeometryCollection} of the most appropriate type.
 * Input geometries which are already collections
 * will have their elements extracted first.
 * No validation of the result geometry is performed.
 * (The only case where invalidity is possible is where {@link Polygonal} geometries
 * are combined and result in a self-intersection).
 *
 * @see GeometryFactory#buildGeometry
 */



/**
 * Creates a new combiner for a collection of geometries
 *
 * @param {Array} geoms the geometries to combine.
 * @constructor
 */
jsts.geom.util.GeometryCombiner = function(geoms) {
  this.geomFactory = jsts.geom.util.GeometryCombiner.extractFactory(geoms);
  this.inputGeoms = geoms;
};


/**
 * Combines a collection of geometries.
 *
 * @param {Array} geoms the geometries to combine.
 * @return {jsts.geom.Geometry} the combined geometry.
 * @public
 */
jsts.geom.util.GeometryCombiner.combiner = function(geoms) {
  var combiner = new jsts.geom.util.GeometryCombiner(geoms);
  return combiner.combine();
};


/**
 * Combines two or three geometries.
 *
 * @param {jsts.geom.Geometry} g0 a geometry to combine.
 * @param {jsts.geom.Geometry} g1 a geometry to combine.
 * @param {jsts.geom.Geometry=} [g2] a geometry to combine.
 * @return {jsts.geom.Geometry} the combined geometry.
 * @public
 */
jsts.geom.util.GeometryCombiner.combine = function() {
  var combiner = jsts.geom.util.GeometryCombiner([].slice.call(arguments));
  return combiner.combine();
};


/**
 * @type {jsts.geom.GeometryFactory}
 * @private
 */
jsts.geom.util.GeometryCombiner.prototype.geomFactory = null;


/**
 * @type {boolean}
 * @private
 */
jsts.geom.util.GeometryCombiner.prototype.skipEmpty = false;


/**
 * @type {Array}
 * @private
 */
jsts.geom.util.GeometryCombiner.prototype.inputGeoms;


/**
 * Extracts the GeometryFactory used by the geometries in a collection
 *
 * @param {Array} geoms
 * @return {jsts.geom.GeometryFactory} a GeometryFactory.
 * @public
 */
jsts.geom.util.GeometryCombiner.extractFactory = function(geoms) {
  if (geoms.length === 0) {
    return null;
  }
  return geoms[0].getFactory();
};


/**
 * Computes the combination of the input geometries
 * to produce the most appropriate {@link Geometry} or {@link GeometryCollection}
 *
 * @return {jsts.geom.Geometry} a Geometry which is the combination of the inputs.
 * @public
 */
jsts.geom.util.GeometryCombiner.prototype.combine = function() {
  var elems = [];
  for (var i = 0, l = this.inputGeoms.length; i < l; i++) {
    var g = this.inputGeoms[i];
    this.extractElements(g, elems);
  }
  if (elems.length === 0) {
    if (this.geomFactory !== null) {
      // return an empty GC
      return this.geomFactory.createGeometryCollection(null);
    }
    return null;
  }
  // return the "simplest possible" geometry
  return this.geomFactory.buildGeometry(elems);
};


/**
 * @param {jsts.geom.Geometry} geom
 * @param {Array} elems
 * @private
 */
jsts.geom.util.GeometryCombiner.prototype.extractElements = function(geom, elems) {
  if (geom === null) {
    return;
  }

  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var elemGeom = geom.getGeometryN(i);
    if (this.skipEmpty && elemGeom.isEmpty()) {
      continue;
    }
    elems.add(elemGeom);
  }
};
