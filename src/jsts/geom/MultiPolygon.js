/**
 * @constructor
 * @extends {OpenLayers.Geometry.LineString}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.MultiPolygon = function() {

};
jsts.geom.MultiPolygon = OpenLayers.Class(jsts.geom.GeometryCollection);
