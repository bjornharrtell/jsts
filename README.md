# JSTS

[![Build Status](https://travis-ci.org/bjornharrtell/jsts.svg)](https://travis-ci.org/bjornharrtell/jsts)
[![codecov](https://codecov.io/gh/bjornharrtell/jsts/branch/master/graph/badge.svg)](https://codecov.io/gh/bjornharrtell/jsts)
![npm](https://img.shields.io/npm/v/jsts.svg)

JSTS is an ECMAScript library of spatial predicates and functions for processing geometry conforming to the Simple Features Specification for SQL published by the Open Geospatial Consortium. JSTS is also a port of the well established Java library [JTS](https://github.com/locationtech/jts).

The primary goal of the project is to provide web mapping applications with a complete library for processing and analyzing simple geometries but JSTS can also be used as a free standing geometry library.

JSTS was made using automatic translation of the original JTS Java source via AST to AST transformation preserving the [JTS API](http://locationtech.github.io/jts/javadoc/), except for the I/O related classes which has been selectively and manually ported with support for WKT, GeoJSON and OpenLayers 3+.

A [Google group](http://groups.google.com/group/jsts-devs) is available for discussions.

A [port](http://bjornharrtell.github.com/jsts/1.6.1/validationsuite/index.html) of [JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html) provides additional tests.

Basic functionality together with OpenLayers is demonstrated [here](http://bjornharrtell.github.io/jsts).

## Browser or Node.js use

An ES5 (the most common JavaScript variant) compatible build for browsers is available [here](https://unpkg.com/jsts@1.6.1/dist/jsts.min.js).

An ES6+ compatible build for browsers is available [here](https://unpkg.com/jsts/dist/jsts.min.js).

Including the above build as a script will import a global object `jsts` exposing similar public API as `org.locationtech.jts` in the [JTS API](http://locationtech.github.io/jts/javadoc/).

For Node.js, install using `npm install jsts` after which `require('jsts')` will import an object with the same properties as `jsts` in the browser build.

I/O related classes in JTS had to be manually ported. From the original formats WKT and GeoJSON are supported. A direct reader/writer for OpenLayers 3+ geometries exist. See the [API documentation](http://bjornharrtell.github.io/jsts/1.6.1/doc/) for these specific classes.

## ES6 modules use

As of version 1.4.0 it's possible to depend on the source modules directly using the NPM package. For most environments it will require a bundler like [Rollup](https://rollupjs.org/) to work. [topolis](https://github.com/bjornharrtell/topolis) serves as an example project depending on JSTS in this way. The example page also exists in a version that loads JSTS as modules in supporting browsers [](http://bjornharrtell.github.io/jsts/index_modules.html).

## Caveats

* In a few cases Java overloading cannot be correctly translated to JavaScript. One such case is `createMultiPoint` in `GeometryFactory` which only works with `Point[]` arguments.
* In some cases you might get a `TopologyException` thrown as an `Error`. This is expected if a calculation fails due to precision issues. To resolve this issue try reducing precision in the input and at the same time make sure the input is valid as defined by the [OGC Simple Features specification](http://www.opengeospatial.org/standards/sfs). To reduce precision [GeometryPrecisionReducer](http://locationtech.github.io/jts/javadoc/org/locationtech/jts/precision/GeometryPrecisionReducer.html) can be used.
* Shortcut methods on Geometry from upstream API are not available (`.buffer`, `.intersects` and more) unless using the bundled ES5 version that has these monkey patched in. The shortcut methods have been removed because they cause difficult circular dependencies. You can find the equivalent methods on the appropriate `operation` class.
