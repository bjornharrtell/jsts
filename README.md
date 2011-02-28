JSTS Topology Suite
===================

Aims to port [JTS Topology Suite](http://tsusiatsoftware.net/jts/main.html) to JavaScript.

Code is conformant to the [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Testcases are made using the [Jasmine testing framework](https://github.com/pivotal/jasmine).

A nice future goal would be to also port the [JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html).

This project is currently in its very initial stages, but pull requests are of course welcome. :) 

The code is licensed as JTS Topology Suite using LGPL 2.1. Contribution and copyright agreements will be handled as it becomes relevant (hoping for sooner than later/never).

Development environment
-----------------------

* Eclipse 3.6 (Helios) using custom builders to check and enforce the Google JavaScript Style Guide
* Custom builders requirements:
  * Installed Closure Linter from http://code.google.com/closure/utilities
  * Installed Rhino 
  * External JavaScript fulljslint.js and json2.js from https://github.com/douglascrockford in project root
* Assumes OS Ubuntu/Linux

Design changes
--------------

These are the effective and potential changes from the original JTS Topology Suite:

* Skip abstracted CoordinateSequence interface/implementation
* TODO: Unify Coordinate/Point classes (?)
