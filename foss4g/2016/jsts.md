# Introduction

* Björn Harrtell<!-- .element: class="fragment" -->
* GIS consultant at Sweco Position in Malmö, Sweden<!-- .element: class="fragment" -->
* I like Open Source<!-- .element: class="fragment" -->


# JSTS

A port of Java Topology Suite<!-- .element: class="fragment" -->



# Quick orientation


# Java Topology Suite

* A Java library of spatial predicates and operations <!-- .element: class="fragment" -->
![JTS](example-intersection.gif "JTS")<!-- .element: class="fragment" -->
* Dates back to 2002 <!-- .element: class="fragment" -->
* Used in one or another way in prominent Open Source GIS software like QGIS, PostGIS and GeoTools <!-- .element: class="fragment" -->

Note:
What is Java Topology Suite?

It's a Java library of spatial predicates and operations which dates back to 2002 and has been used in prominent Open Source GIS software like QGIS, PostGIS and GeoTools.


# Due credit

![Martin Davis](martin_davis.jpg "Martin Davis")<!-- .element: class="fragment" -->

* Founder of JTS project<!-- .element: class="fragment" -->
* Recieved the Sol Katz award in 2011<!-- .element: class="fragment" -->

Note:
This guy is Martin Davis. He founded the JTS project and recieved the Sol Katz award in 2011 for his contributions.


# JTS ports

* C++ (GEOS, used in PostGIS) <!-- .element: class="fragment" -->
* Python (Shapely) <!-- .element: class="fragment" -->
* C# (NTS) <!-- .element: class="fragment" -->
* JavaScript (JSTS) <!-- .element: class="fragment" -->

Note:
JTS has been ported to C++, Python, C# and with JSTS also JavaScript.


# JSTS 0.x

* 2011 <!-- .element: class="fragment" -->
* Manual effort <!-- .element: class="fragment" -->

Note:
I started work on JSTS back in 2011 and it was a manual effort.

My motivation to do it was firstly that I was curious if it was at all possible and secondly I was in need of a programming hobby that did not require alot of thinking (or so I thought). My approach was naive and I did not investigate the architecture or scope of original source in any depth before trying to simply manually translate the initial classes.


# Small beginnings

## Java version <!-- .element: class="fragment" -->
```java
public Coordinate(double x, double y, double z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
```
<!-- .element: class="fragment" -->

## JavaScript version <!-- .element: class="fragment" -->
```js
jsts.geom.Coordinate = function(x, y) {
  this.x = x;
  this.y = y;
};
```
<!-- .element: class="fragment" -->

Note:
A central class in JTS is of course the Coordinate class, which has a constructor that looks like this. Converting Coordinate to JavaScript is trivial and this is in the first commited code to JSTS in 2011 where I ignore the z-axis. A namespace is simulated with a JavaScript object called jsts.


## Working implementation

* August 2011 <!-- .element: class="fragment" -->
* 200 files, x lines of code <!-- .element: class="fragment" -->
* Selective port of Java collection classes <!-- .element: class="fragment" -->

Note:
The initial working version of JSTS, 0.9.0, required porting almost 200 files. Had I known this was required for basic functionality at the start I probably would have given up.

Halfway into the working implementation I realized alot of the Java code involved using Java collection classes like ArrayList and porting this to native JavaScript arrays required alot of rewriting. This process could be simplified by simply porting Java collection classes first. This made porting code much more straight forward. Unfortunately as I had already done half of the port, this meant that some initially ported code used a native JavaScript arrays as input/output instead of an instance of an ArrayList. This caused alot of problems later on and is the reason that CascadedPolygonUnion was never completed in JSTS 0.x.



# JSTS 1.0

* Wanted to update JSTS to upstream but not manually <!-- .element: class="fragment" -->
* Issue opened at GitHub in May 2015 discussion with Martin followed <!-- .element: class="fragment" -->
* First beta release january 2016 <!-- .element: class="fragment" -->
* 1.0.0 released february 2016 <!-- .element: class="fragment" -->

Note:
Fast forward to 2015. JSTS 0.x lagged behind upstream, so I wanted to update it but not manually.

I was motivated alot by Martins interest and encouragement so I really want to thank him for that.

I made rapid progress early 2016 with stable release 1.0.0 done in february 2016.

# How was it done?

# Existing tools

* GWT <!-- .element: class="fragment" -->
* Eclipse VJET <!-- .element: class="fragment" -->

Note:
I first started to look at existing tools.

GWT obfuscates the Java API in the compiled JavaScript. VJET seemed promising but activity stopped in early incubation process. So none of the existing tools seemed to work.


# Learning stuff

* ECMAScript 2015 <!-- .element: class="fragment" -->
* ESTree (AST) <!-- .element: class="fragment" -->
* Beginning to think AST to AST transformation is possible <!-- .element: class="fragment" -->

Note:
In 2015 I learned about ECMAScript 2015, the new version of JavaScript and that it could be transpiled to ES5 that existing browsers expects. The transpliation works with something called AST or Abstract Source Tree which and for JavaScript there is a defacto standard AST specification called ESTree that can be represented as JSON. Show http://esprima.org ?


# Java AST

* Javaparser <!-- .element: class="fragment" -->
* Missing type bindings analysis <!-- .element: class="fragment" -->
* Eclipse JDT <!-- .element: class="fragment" -->
* java2estree <!-- .element: class="fragment" -->
 * estree representation in Java
 * JSON serializer (Jackson)

Note:
To be able to do AST to AST transformation I would also need an AST representation of Java. First I found Javaparser which is a very nice AST parser for Java, but after some experimentation I realized it missed type binding information which is needed to determine details about a identifier.

So I looked for alternatives and realized there must be both an AST parser and statical analysis in the Eclipse IDE used to provide code completion and syntax checking.

I used Eclipse JDT in my tool java2estree, written in my favorite language Scala. To serialize ESTree into JSON I used the Java library Jackson.


# Difficulties

* Java class != ECMAScript 2015 class
* Overloading
* Performance
* Floating point woes (DD)

Note:

At first I thought ECMAScript 2015 would be a good target for the transformation, mainly because it introduces classes. I got initial functionality working with ECMAScript 2015 but there was sublte bugs and ugly workarounds needed because classes in ECMAScrip 2015 and Java has small but important differences.

https://github.com/bjornharrtell/jsts/blob/1.0.0-beta1/src/org/locationtech/jts/geom/Coordinate.js
https://github.com/bjornharrtell/jsts/blob/1.0.0-beta4/src/org/locationtech/jts/geom/Coordinate.js

An ECMAScript 2015 class constructor cannot call itself which in effect is what overloading Java constructors require.

If in Java you combine overloading with inheritance you get a really hard to analyze overload resolution. For JSTS I only handle what was required to translate JTS.

Performance was worse than JSTS 0.x until the final simplication for constructor and overloading translation.

https://github.com/bjornharrtell/jsts/blob/1.0.0-rc3/src/org/locationtech/jts/geom/Coordinate.js

One of the last bugs that had to be taken care of before making 1.0.0 stable was failing validity tests. The reason turned out to be DoubleBits, a part of JTS that uses bit manipulation to get better accuracy for some mathematical operations.



# Thanks for listening

* https://github.com/bjornharrtell/jsts/
