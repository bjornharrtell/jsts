JSTS Topology Suite
===================

Aims to port [JTS Topology Suite](http://tsusiatsoftware.net/jts/main.html) to
JavaScript with OpenLayers compatiblity. The core geometry classes are
inherited from OpenLayers.Geometry and extended with API as close as possible
to the corresponding JTS Topology Suite geometry classes.

Code is conformant to the
[Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) and
[JSLint](http://www.jslint.com/)

[Unit tests](http://bjornharrtell.github.com/jsts/test/SpecRunner.html) are made
using the [Jasmine testing framework](https://github.com/pivotal/jasmine).

A [port](http://bjornharrtell.github.com/jsts/validationsuite/index.html) of
[JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html) provides
additional tests.

Currently the port implements APIs for the the core geom.* classes and the validation
suite is sort of half-way ported. The large work of porting the algorithms of
JTS Topology Suite has yet to be started.

The code is licensed using the MIT license to encourage use and easy contribution.

Development environment
-----------------------

* Eclipse 3.6 (Helios) using custom builders to check and enforce the Google JavaScript Style Guide and JSLint
* Custom builders requirements:
  * Installed Closure Linter from http://code.google.com/closure/utilities
  * Installed Rhino (http://www.mozilla.org/rhino/)
  * External JavaScript fulljslint.js and json2.js from https://github.com/douglascrockford in /tools
* Assumes OpenLayers 2.10 distribution in project root from http://www.openlayers.org/
* Assumes OS Ubuntu/Linux

Design changes
--------------

These are effective/potential changes from the original JTS Topology Suite:

* Skip abstracted CoordinateSequence interface/implementation
* Unified Coordinate/Point classes
