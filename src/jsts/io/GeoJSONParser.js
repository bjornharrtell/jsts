/* Copyright (c) 2011, 2012 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */
(function() {

    jsts.io.GeoJSONParser = function(geometryFactory) {
        this.geometryFactory = geometryFactory || new jsts.geom.GeometryFactory();
        this.geometryTypes = [ 'point', 'multipoint', 'linestring', 'multilinestring', 'polygon', 'multipolygon' ];
    };

    jsts.io.GeoJSONParser.prototype.read = function(json) {
        var obj;
        if (typeof json === 'string') {
            obj = JSON.parse(json);
        } else {
            obj = json;
        }

        return this.parse.geometry.apply(this, [ obj ]);
    };

    jsts.io.GeoJSONParser.prototype.parse = {
        // entry functions
        'geometry': function(obj) {
            var type = obj.type.toLowerCase();

            if (!this.parse[type]) {
                throw new Error('Unknown GeoJSON type: ' + obj.type);
            }

            if (this.geometryTypes.indexOf(type) != -1) {
                return this.parse[type].apply(this, [ obj.coordinates ]);
            } else if (type === 'geometrycollection') {
                return this.parse[type].apply(this, [ obj.geometries ]);
            }

            // feature or feature collection
            return this.parse[type].apply(this, [ obj ]);
        },

        'feature': function(obj) {
            var feature = {};
            // copy features
            for (var key in obj) {
                feature[key] = obj[key];
            }
            // parse geometry
            if (obj.geometry) {
                var type = obj.geometry.type.toLowerCase();
                if (!this.parse[type]) {
                    throw new Error('Unknown GeoJSON type: ' + obj.type);
                }
                feature.geometry = this.parse.geometry.apply(this, [ obj.geometry ]);
            }
            // bbox?
            if (obj.bbox) {
                feature.bbox = this.parse.bbox.apply(this, [ obj.bbox ]);
            }

            return feature;
        },

        'featurecollection': function(obj) {
            var featureCollection = {};

            if (obj.features) {
                featureCollection.features = [];

                for (var i = 0; i < obj.features.length; ++i) {
                    featureCollection.features.push(this.parse.geometry.apply(this, [ obj.features[i] ]));
                }
            }

            if (obj.bbox) {
                featureCollection.bbox = this.parse.bbox.apply(this, [ obj.bbox ]);
            }


            return featureCollection;
        },


        // utility functions
        'coordinates': function(array) {
            var coordinates = [];
            for (var i = 0; i < array.length; ++i) {
                var sub = array[i];
                coordinates.push(new jsts.geom.Coordinate(sub[0], sub[1]));
            }
            return coordinates;
        },

        'bbox': function(array) {
            return this.geometryFactory.createLinearRing([
                new jsts.geom.Coordinate(array[0], array[1]),
                new jsts.geom.Coordinate(array[2], array[1]),
                new jsts.geom.Coordinate(array[2], array[3]),
                new jsts.geom.Coordinate(array[0], array[3]),
                new jsts.geom.Coordinate(array[0], array[1]),
            ]);
        },


        // GeoJSON geometry types
        'point': function(array) {
            var coordinate = new jsts.geom.Coordinate(array[0], array[1]);
            return this.geometryFactory.createPoint(coordinate);
        },

        'multipoint': function(array) {
            var points = [];
            for (var i = 0; i < array.length; ++i) {
                points.push(this.parse.point.apply(this, [ array[i] ]));
            }
            return this.geometryFactory.createMultiPoint(points);
        },

        'linestring': function(array) {
            var coordinates = this.parse.coordinates.apply(this, [ array ]);
            return this.geometryFactory.createLineString(coordinates);
        },

        'multilinestring': function(array) {
            var lineStrings = [];
            for (var i = 0; i < array.length; ++i) {
                lineStrings.push(this.parse.linestring.apply(this, [ array[i] ]));
            }
            return this.geometryFactory.createMultiLineString(lineStrings);
        },

        'polygon': function(array) {
            // shell
            var shellCoordinates = this.parse.coordinates.apply(this, [ array[0] ]);
            var shell = this.geometryFactory.createLinearRing(shellCoordinates);

            // holes
            var holes = [];
            for (var i = 1; i < array.length; ++i) {
                var hole = array[i];
                var coordinates = this.parse.coordinates.apply(this, [ hole ]);
                var linearRing = this.geometryFactory.createLinearRing(coordinates);
                holes.push(linearRing);
            }

            return this.geometryFactory.createPolygon(shell, holes);
        },

        'multipolygon': function(array) {
            var polygons = [];
            for (var i = 0; i < array.length; ++i) {
                var polygon = array[i];
                polygons.push(this.parse.polygon.apply(this, [ polygon ]));
            }
            return this.geometryFactory.createMultiPolygon(polygons);
        },

        'geometrycollection': function(array) {
            var geometries = [];
            for (var i = 0; i < array.length; ++i) {
                var geometry = array[i];
                geometries.push(this.parse.geometry.apply(this, [ geometry ]));
            }
            return this.geometryFactory.createGeometryCollection(geometries);
        }
    };

    jsts.io.GeoJSONParser.prototype.write = function(geometry) {
        var geoJson = {
            'type': null
        };

        if (geometry instanceof Array) {
            // XXX: TODO
        } else if (geometry.CLASS_NAME.indexOf('jsts.geom') == 0) {
            geoJson = this.extract.geometry.apply(this, [ geometry]);
        }

        return geoJson;
    };

    jsts.io.GeoJSONParser.prototype.extract = {
        'geometry': function(geometry) {
            var type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
            if (!this.extract[type]) {
                return null;
            }

            return {
                'type': type[0].toUpperCase() + type.slice(1),
                'geometry': this.extract[type].apply(this, [ geometry ])
            };
        },


        'coordinate': function(coordinate) {
            return [ coordinate.x, coordinate.y ];
        },

        'point': function(point) {
            var coordinate = point.coordinate;
            return this.extract.coordinate.apply(this, [ coordinate ]);
        },

        'multipoint': function(multipoint) {
            var array = [];
            for (var i = 0; i < multipoint.geometries.length; ++i) {
                var point = multipoint.geometries[i];
                array.push(this.extract.point.apply(this, [ point ]));
            }
            return array;
        },

        'linestring': function(linestring) {
            var array = [];
            for (var i = 0; i < linestring.points.length; ++i) {
                var coordinate = linestring.points[i];
                array.push(this.extract.coordinate.apply(this, [ coordinate ]));
            }
            return array;
        },

        'multilinestring': function(multilinestring) {
            var array = [];
            for (var i = 0; i < multilinestring.geometries.length; ++i) {
                var linestring = multilinestring.geometries[i];
                array.push(this.extract.linestring.apply(this, [ linestring ]));
            }
            return array;
        },

        'polygon': function(polygon) {
            var array = [];
            array.push(this.extract.linestring.apply(this, [ polygon.shell ]));
            for (var i = 0; i < polygon.holes.length; ++i) {
                var hole = polygon.holes[i];
                array.push(this.extract.linestring.apply(this, [ hole ]));
            }
            return array;
        },

        'multipolygon': function(multipolygon) {
            var array = [];
            for (var i = 0; i < multipolygon.geometries.length; ++i) {
                var polygon = multipolygon.geometries[i];
                array.push(this.extract.polygon.apply(this, [ polygon ]));
            }
            return array;
        },

        'geometrycollection': function(collection) {
            var array = [];
            for (var i = 0; i < collection.geometries.length; ++i) {
                var geometry = collection.geometries[i];
                array.push(this.extractGeometry.apply(this, [ geometry ]));
            }
            return array;
        }
    };
})();
