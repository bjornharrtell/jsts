# JSTS

A port of Java Topology Suite<!-- .element: class="fragment" -->


# Me

* Björn Harrtell<!-- .element: class="fragment" -->
* GIS consultant at Sweco Position in Malmö, Sweden<!-- .element: class="fragment" -->
* I like Open Source<!-- .element: class="fragment" -->



# Quick orientation

Note:
First a quick orientation.


# Java Topology Suite

* A Java library of spatial predicates and operations <!-- .element: class="fragment" -->
![JTS](example-intersection.gif "JTS")<!-- .element: class="fragment" -->
* Dates back to 2002 <!-- .element: class="fragment" -->
* Used in prominent Open Source GIS software like QGIS, PostGIS and GeoTools <!-- .element: class="fragment" -->

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
* Success! <!-- .element: class="fragment" -->
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
In 2015 I learned about ECMAScript 2015, the new version of JavaScript and that it could be transpiled to ES5 that existing browsers expects. The transpilation works with something called Abstract Source Tree or AST that can be understood as a simple as possible tree structure representing the code. ASTs have existed for a long time since it's used in compilators, and it's also useful for IDEs to support features like autocompletion. For JavaScript there is a defacto standard AST called ESTree that can be represented as JSON.

This made me thing that AST to AST transformation is possible.


# Java AST

* Javaparser <!-- .element: class="fragment" -->
* Missing type bindings analysis <!-- .element: class="fragment" -->
* Eclipse JDT <!-- .element: class="fragment" -->
* java2estree <!-- .element: class="fragment" -->
 * estree representation in Java
 * JSON serializer (Jackson)
* Astring <!-- .element: class="fragment" -->

Note:
To be able to do AST to AST transformation I would also need an AST representation of Java. First I found Javaparser which is a very nice AST parser for Java, but after some experimentation I realized it missed type binding information which is needed to determine details about a identifier.

So I looked for alternatives and realized there must be both an AST parser and type binding analysis in the Eclipse IDE used to provide code completion and syntax checking.

The result was java2estree, a tool I wrote to translate Java into ESTree JSON in which I used Eclipse JDT. To serialize ESTree into JSON I used the Java library Jackson. I also have to mention that java2estree is written in Scala which is probably my favorite language.

https://github.com/bjornharrtell/java2estree/blob/master/src/main/scala/org/wololo/estree/estree.scala

I was able to define the whole ESTree specification in a serialisable structure with 327 LOC almost identical to the specification itself.

https://github.com/davidbonnet/astring

I also needed a tool to turn ESTree JSON into JavaScript. There are many such tools available, the one I use is called Astring by David Bonnet.


# Difficulties

* Java class != ECMAScript 2015 class <!-- .element: class="fragment" -->
* Overloading <!-- .element: class="fragment" -->
* Performance <!-- .element: class="fragment" -->
* IsValid test failures (DoubleBits) <!-- .element: class="fragment" -->

Note:

At first I thought ECMAScript 2015 would be a good target for the transformation, mainly because it introduces classes. I got initial functionality working with ECMAScript 2015 but there was sublte bugs and ugly workarounds needed because classes in ECMAScrip 2015 and Java has small but important differences.

https://github.com/bjornharrtell/jsts/blob/1.0.0-beta1/src/org/locationtech/jts/geom/Coordinate.js

At beta 1 the constructor for Coordinate was looking quite terrible. I had overloaded constructors wrapped in anonymous arrow functions and I used the rest/spread operator to extract local variables from args.

https://github.com/bjornharrtell/jsts/blob/1.0.0-beta4/src/org/locationtech/jts/geom/Coordinate.js

At beta 4 I was able to reduce the number of wrapper functions.

https://github.com/bjornharrtell/jsts/blob/1.0.0-rc3/src/org/locationtech/jts/geom/Coordinate.js

At release candidate 3 I reached the version used in the stable version which drops ECMAScript 2015 classes and does not use rest/spread operator.

The main reason for using a standard function was that an ECMAScript 2015 class constructor cannot call itself which in effect is what overloading Java constructors require. Another difference is that ECMAScript 2015 classes require you to call super before using this in a derived class. When using a standard function there are no such restrictions.

It also turned out that performance was worse than JSTS 0.x until the final simplication for constructor and overloading translation.

One of the last bugs that had to be taken care of before making 1.0.0 stable was failing validity tests. The reason turned out to be DoubleBits, a part of JTS that uses bit manipulation to get better accuracy for some mathematical operations.



# Thanks for listening

* https://github.com/bjornharrtell/jsts/
