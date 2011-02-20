JSTS Topology Suite
===================

Aims to port [JTS Topology Suite](http://tsusiatsoftware.net/jts/main.html) to javascript.

Code is conformant to the [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

Testcases are made using the [Jasmine testing framework](https://github.com/pivotal/jasmine).

A nice future goal would be to also port the [JTS Validation Suite](http://www.vividsolutions.com/jts/tests/index.html).

The work is currently in its very initial stages, but pull requests are of course welcome. :)

Design changes
--------------

This is WIP but currently these are the potential changes from the original JTS Topology Suite:

* Skip abstracted CoordinateSequence interface/implementation.
* TODO: Unify Coordinate/Point classes.
