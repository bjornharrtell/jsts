# JSTS

[![Build Status](https://travis-ci.org/bjornharrtell/jsts.svg)](https://travis-ci.org/bjornharrtell/jsts)

JSTS is a JavaScript (ES6 aka. ECMAScript 2015) library of spatial predicates and functions for processing geometry conforming to the Simple Features Specification for SQL published by the Open Geospatial Consortium. JSTS is also a JavaScript port of the well established Java library [JTS](https://github.com/locationtech/jts) with a built in parser for OpenLayers 3 interopability.

The primary goal of the project is to provide web mapping applications with a complete library for processing and analyzing simple geometries but JSTS can also be used as a free standing geometry library.

JSTS was made using automatic translation of the original JTS Java source via AST to AST transformation preserving the [JTS API](http://bjornharrtell.github.io/jsts/1.0.0-beta2/apidocs/).

An ES5 compatible build for browser use is available [here](https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.0.0-beta2/jsts.min.js).

A [Google group](http://groups.google.com/group/jsts-devs) is available for discussions.

A [port](http://bjornharrtell.github.com/jsts/1.0.0-beta2/validationsuite/index.html) of [JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html) provides additional tests.

Basic functionality is [demonstrated in an example](http://bjornharrtell.github.io/jsts/1.0.0-beta2/examples/demo.html) using OpenLayers 3.
