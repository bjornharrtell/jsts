JSTS Topology Suite
===================

DISCLAIMER: The current status of this project is unfinished non-production quality.
You are hereby invited to help change that. :)

The JSTS Topology Suite is a JavaScript library of spatial predicates and functions 
for processing geometry conforming to the Simple Features Specification for SQL published by
the Open Geospatial Consortium. JSTS Topology Suite is also a JavaScript port of the well 
established Java library [JTS Topology Suite](http://tsusiatsoftware.net/jts/main.html) with
OpenLayers compatibility. The core geometry classes are inherited from OpenLayers.Geometry
and extended with API as close as possible to the corresponding JTS Topology Suite geometry classes.

Currently JSTS Topology Suite implements APIs for the the core geom.* classes and the validation
suite is sort of half-way ported. QuadTree index have been ported. A fait bit of ground work has been
done to port core geometry predicate/functions.

The goal of the project is to provide OpenLayers applications with a complete library for processing
and analysing simple geometries.

A [Google group](http://groups.google.com/group/jsts-devs) is available for developer discussions.

Code is conformant to the
[Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) and
[JSLint](http://www.jslint.com/).

[Unit tests](http://bjornharrtell.github.com/jsts/test/SpecRunner.html) are made
using the [Jasmine testing framework](https://github.com/pivotal/jasmine).

A recent trunk snapshot of [API docs is available](http://bjornharrtell.github.com/jsts/doc/api/index.html). 

A [port](http://bjornharrtell.github.com/jsts/validationsuite/index.html) of
[JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html) provides
additional tests.

The code is licensed using the LGPL 2.1 license.

Development environment
-----------------------

* Eclipse 3.6 (Helios) using custom builders to check and enforce the Google JavaScript Style Guide and JSLint
* Custom builders requirements:
  * Installed Closure Linter from http://code.google.com/closure/utilities
  * Compiled 'shell' sample from V8 JavaScript Engine (http://code.google.com/apis/v8) in /tools
  * External JavaScript jslint.js and json2.js from https://github.com/douglascrockford in /tools
* Assumes OpenLayers 2.10 distribution in project root from http://www.openlayers.org/
* Assumes OS Ubuntu/Linux

Design changes
--------------

These are effective/potential changes from the original JTS Topology Suite:

* Skip abstracted CoordinateSequence interface/implementation
