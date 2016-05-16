# JSTS



# Quick orientation


# Java Topology Suite (JTS)

![Martin Davis](martin_davis.jpg "Martin Davis")

* Founder of JTS project
* Recieved the Sol Katz award in 2011


# JTS is...

* A Java library of spatial predicates and operations
* Dates back to 2002
* Used in one or another way in prominent Open Source GIS software like QGIS, PostGIS and GeoTools


# Ported to...

* C++
* Python
* C#
* JavaScript



# JSTS 0.x

* 2011
* Manual effort



# Small beginnings

```java
public Coordinate(double x, double y, double z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
```

```js
jsts.geom.Coordinate = function(x, y) {
  this.x = x;
  this.y = y;
};
```



# And...

* Existing tools GWT, vjet
* ECMAScript 2015 and ESTree (AST)
* Beginning to think AST to AST transformation is possible
* Java AST?
* Javaparser https://github.com/javaparser/javaparser
* Missing type bindings analysis
* Eclipse JDT
* Emulating java.* stuff
* Overloading...
* Class woes
* Floating point woes (DD)
