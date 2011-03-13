/**
 * @constructor
 * @extends {OpenLayers.Geometry.LineString}
 * @extends {jsts.geom.Geometry}
 */
jsts.geom.MultiPoint = function() {

};
jsts.geom.MultiPoint = OpenLayers.Class(jsts.geom.GeometryCollection);
