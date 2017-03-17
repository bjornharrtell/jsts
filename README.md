# JSTS

[![Build Status](https://travis-ci.org/bjornharrtell/jsts.svg)](https://travis-ci.org/bjornharrtell/jsts)
[![codecov](https://codecov.io/gh/bjornharrtell/jsts/branch/master/graph/badge.svg)](https://codecov.io/gh/bjornharrtell/jsts)

JSTS is an ECMAScript 2015 library of spatial predicates and functions for processing geometry conforming to the Simple Features Specification for SQL published by the Open Geospatial Consortium. JSTS is also a port of the well established Java library [JTS](https://github.com/locationtech/jts).

The primary goal of the project is to provide web mapping applications with a complete library for processing and analyzing simple geometries but JSTS can also be used as a free standing geometry library.

JSTS was made using automatic translation of the original JTS Java source via AST to AST transformation preserving the [JTS API](http://bjornharrtell.github.io/jsts/1.3.0/apidocs/), except for the io related classes which has been selectively and manually ported with support for WKT, GeoJSON and OpenLayers.

A [Google group](http://groups.google.com/group/jsts-devs) is available for discussions.

A [port](http://bjornharrtell.github.com/jsts/1.3.0/validationsuite/index.html) of [JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html) provides additional tests.

Basic functionality together with OpenLayers 3 is demonstrated [here](http://bjornharrtell.github.io/jsts).

## Browser or Node.js use

An ES5 (the most common JavaScript variant) compatible build for browsers is available [here](https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.3.0/jsts.min.js).

Including the above build as a script will import a global object `jsts` exposing similar public API as `org.locationtech.jts` in the [JTS API](http://bjornharrtell.github.io/jsts/1.3.0/apidocs/).

For Node.js, install using `npm install jsts` after which `require('jsts')` will import an object with the same properties as `jsts` in the browser build.

I/O related classes in JTS had to be manually ported. From the original formats WKT and GeoJSON are supported. A direct reader/writer for OpenLayers 3 geometries exist. See the [API documentation](http://bjornharrtell.github.io/jsts/1.3.0/doc/) for these specific classes.

## Caveats

* In a few cases Java overloading cannot be correctly translated to JavaScript. One such case is `createMultiPoint` in `GeometryFactory` which only works with `Point[]` arguments.
* In some cases you might get a `TopologyException` thrown as an `Error`. This is expected if a calculation fails due to precision issues. To resolve this issue try reducing precision in the input and at the same time make sure the input is valid as defined by the [OGC Simple Features specification](http://www.opengeospatial.org/standards/sfs). To reduce precision [GeometryPrecisionReducer](http://bjornharrtell.github.io/jsts/1.3.0/apidocs/org/locationtech/jts/precision/GeometryPrecisionReducer.html) can be used.
