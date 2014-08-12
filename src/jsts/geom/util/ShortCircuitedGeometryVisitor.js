/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
 
/**
 * Port source:
 * /jts/jts/java/src/com/vividsolutions/jts/geom/util/ShortCircuitedGeometryVisitor.java
 * Revision: 707
 */

(function() {

/**
 * A visitor to {@link Geometry} componets, which 
 * allows short-circuiting when a defined condition holds.
 *
 * @version 1.7
 */
jsts.geom.util.ShortCircuitedGeometryVisitor = function() {

};

jsts.geom.util.ShortCircuitedGeometryVisitor.prototype.isDone = false;

jsts.geom.util.ShortCircuitedGeometryVisitor.prototype.applyTo = function(geom) {
    for (var i = 0; i < geom.getNumGeometries() && ! this.isDone; i++) {
      var element = geom.getGeometryN(i);
      if (! (element instanceof jsts.geom.GeometryCollection)) {
        this.visit(element);
        if (this.isDone()) {
          this.isDone = true;
          return;
        }
      }
      else
        this.applyTo(element);
    }
  }

jsts.geom.util.ShortCircuitedGeometryVisitor.prototype.visit = function(element) {};

jsts.geom.util.ShortCircuitedGeometryVisitor.prototype.isDone = function() {};

})();
