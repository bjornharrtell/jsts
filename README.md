# JSTS

[![Build Status](https://travis-ci.org/bjornharrtell/jsts.svg)](https://travis-ci.org/bjornharrtell/jsts)

JSTS is a JavaScript (ES6 aka. ECMAScript 2015) library of spatial predicates and functions for processing geometry conforming to the Simple Features Specification for SQL published by the Open Geospatial Consortium. JSTS is also a JavaScript port of the well established Java library [JTS](https://github.com/locationtech/jts).

The primary goal of the project is to provide web mapping applications with a complete library for processing and analyzing simple geometries but JSTS can also be used as a free standing geometry library.

JSTS was made using automatic translation of the original JTS Java source via AST to AST transformation preserving the [JTS API](http://bjornharrtell.github.io/jsts/1.0.0-beta2/apidocs/), except for the io
related classes which has been selectively and manually ported with support for WKT, GeoJSON and
OpenLayers 3.

A [Google group](http://groups.google.com/group/jsts-devs) is available for discussions.

A [port](http://bjornharrtell.github.com/jsts/1.0.0-beta4/validationsuite/index.html) of [JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html) provides additional tests.

Basic functionality togheter with OpenLayers 3 is demonstrated[here](http://bjornharrtell.github.io/jsts).

## Usage

### Browser

An ES5 compatible build for browser use is available [here](https://cdn.rawgit.com/bjornharrtell/jsts/gh-pages/1.0.0-beta4/jsts.min.js).

Including the above build as a script will import a global object `jsts` exposing everthing under `org.locationtech.jts` in the JTS API.

### Node JS

Install using `npm install jsts@1.0.0-beta2` after which `require('jsts')` will import an object that exposes everthing under `org.locationtech.jts` in the JTS API.
