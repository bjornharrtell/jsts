/**
 * @constructor
 * @extends {OpenLayers.Geometry.LineString}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.MultiLineString = function() {

};
jsts.geom.MultiLineString = OpenLayers.Class(jsts.geom.GeometryCollection);
