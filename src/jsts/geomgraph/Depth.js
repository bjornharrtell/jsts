/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

(function() {

  /**
   * @requires jsts/geom/Location.js
   * @requires jsts/geomgraph/Position.js
   */

  var Location = jsts.geom.Location;
  var Position = jsts.geomgraph.Position;

/**
 * A Depth object records the topological depth of the sides of an Edge for up
 * to two Geometries.
 *
 * @version 1.7
 */
var Depth = function() {
// initialize depth array to a sentinel value
  this.depth = [[], []];
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 3; j++) {
      this.depth[i][j] = Depth.NULL_VALUE;
    }
  }
}

  Depth.NULL_VALUE = -1;

  Depth.depthAtLocation = function(location)
  {
    if (location == Location.EXTERIOR) return 0;
    if (location == Location.INTERIOR) return 1;
    return Depth.NULL_VALUE;
  }

  Depth.prototype.depth = null;


  Depth.prototype.getDepth = function(geomIndex,  posIndex)
  {
    return this.depth[geomIndex][posIndex];
  }
  Depth.prototype.setDepth = function(geomIndex,  posIndex,  depthValue)
  {
    this.depth[geomIndex][posIndex] = depthValue;
  }
  Depth.prototype.getLocation = function(geomIndex,  posIndex)
  {
    if (this.depth[geomIndex][posIndex] <= 0) return Location.EXTERIOR;
    return Location.INTERIOR;
  }
  Depth.prototype.add = function(geomIndex,  posIndex,  location)
  {
    if (location == Location.INTERIOR)
      this.depth[geomIndex][posIndex]++;
  }
  /**
   * A Depth object is null (has never been initialized) if all depths are null.
   */
  Depth.prototype.isNull = function()
  {
    if (arguments.length > 1) {
      this.isNull2.apply(this, arguments);
    }

    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.depth[i][j] != Depth.NULL_VALUE)
          return false;
      }
    }
    return true;
  }
  Depth.prototype.isNull2 = function(geomIndex)
  {
    if (arguments.length > 2) {
      this.isNull3.apply(this, arguments);
    }

    return this.depth[geomIndex][1] == Depth.NULL_VALUE;
  }
  Depth.prototype.isNull3 = function(geomIndex,  posIndex)
  {
    return this.depth[geomIndex][posIndex] == Depth.NULL_VALUE;
  }
  Depth.prototype.add = function(lbl)
  {
    for (var i = 0; i < 2; i++) {
      for (var j = 1; j < 3; j++) {
        var loc = lbl.getLocation(i, j);
        if (loc == Location.EXTERIOR || loc == Location.INTERIOR) {
          // initialize depth if it is null, otherwise add this location value
          if (this.isNull(i, j)) {
            this.depth[i][j] = Depth.depthAtLocation(loc);
          }
          else
            this.depth[i][j] += Depth.depthAtLocation(loc);
        }
      }
    }
  }
  Depth.prototype.getDelta = function(geomIndex)
  {
    return this.depth[geomIndex][Position.RIGHT] - this.depth[geomIndex][Position.LEFT];
  }
  /**
   * Normalize the depths for each geometry, if they are non-null. A normalized
   * depth has depth values in the set { 0, 1 }. Normalizing the depths involves
   * reducing the depths by the same amount so that at least one of them is 0.
   * If the remaining value is > 0, it is set to 1.
   */
  Depth.prototype.normalize = function()
  {
    for (var i = 0; i < 2; i++) {
      if (! this.isNull(i)) {
        var minDepth = depth[i][1];
        if (this.depth[i][2] < minDepth)
          minDepth = this.depth[i][2];

        if (minDepth < 0) minDepth = 0;
        for (var j = 1; j < 3; j++) {
          var newValue = 0;
          if (this.depth[i][j] > minDepth)
            newValue = 1;
          this.depth[i][j] = newValue;
        }
      }
    }
  }

  Depth.prototype.toString = function()
  {
    return;
        'A: ' + this.depth[0][1] + ',' + this.depth[0][2]
      + ' B: ' + this.depth[1][1] + ',' + this.depth[1][2];
  }

  jsts.geomgraph.Depth = Depth;

})();
