# JSTS

A port of Java Topology Suite<!-- .element: class="fragment" -->

Note:
This is a talk about JSTS, a port of Java Topology Suite.


# About me

* Björn Harrtell<!-- .element: class="fragment" -->
* Malmö, Sweden<!-- .element: class="fragment" -->
* I like Open Source<!-- .element: class="fragment" -->

Note:
My name is Björn Harrtell, I come from Sweden and live in a city called Malmö.

https://www.google.se/maps/@54.4856214,12.8718359,6z

Anyway it's nice to be here in Bonn. Even though I've been working with GIS and open source for almost ten years it's my first time at FOSS4G so I'm happy to finally be here.


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

It's a Java library of spatial predicates and operations. That can be for instance an intersection as demonstrated here. JTS dates back to 2002 and has been used in prominent Open Source GIS software like QGIS, PostGIS and GeoTools.


# Due credit

![Martin Davis](martin_davis.jpg "Martin Davis")<!-- .element: class="fragment" -->

* Founder of JTS project<!-- .element: class="fragment" -->
* Recieved the Sol Katz award in 2011<!-- .element: class="fragment" -->

Note:
I want to give due credit. This guy is Martin Davis. He founded the JTS project and recieved the Sol Katz award in 2011 for his contributions.


# JTS ports

* C++ (GEOS, used in PostGIS) <!-- .element: class="fragment" -->
* Python (Shapely) <!-- .element: class="fragment" -->
* C# (NTS) <!-- .element: class="fragment" -->
* JavaScript (JSTS) <!-- .element: class="fragment" -->

Note:
The widespread use of JTS is probably because it has been ported to C++, Python, C# and with JSTS also JavaScript.


# JSTS 0.x

* 2011 <!-- .element: class="fragment" -->
* Manual effort <!-- .element: class="fragment" -->

Note:
I started work on JSTS back in 2011 and it was a manual effort.

My motivation to do it was firstly that I was curious if it was at all possible. My approach was perhaps a bit naive and I did not investigate the architecture or scope of original source in any depth before trying to simply translate the initial classes manually.


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
* 158 files, ~30000 lines of code <!-- .element: class="fragment" -->
* Test cases from JTS was critical <!-- .element: class="fragment" -->
* Selective port of Java collection classes <!-- .element: class="fragment" -->

Note:
The initial working version of JSTS, 0.9.0, required porting almost 200 files. Had I known this was required for basic functionality at the start I probably would have given up.

I was able to port test cases from JTS quite easily because they where specified as XML. This turned out to be absolutely critical to be able to progress on the actual port.

Halfway into the working implementation I realized alot of work was spent rewriting code using Java collection classes like ArrayList to code using JavaScript arrays. I ported the parts of Java collection classes needed which made porting the remaining JTS code much faster and easier. But I didn't want to redo what I had already ported and that turned out to cause alot of problems later on and is the reason CascadedPolygonUnion was never completed in the old JSTS.



# The road to JSTS 1.0

* Wanted to update JSTS to upstream but not manually <!-- .element: class="fragment" -->
* Issue "Automated port" opened at GitHub in May 2015 <!-- .element: class="fragment" -->
* Success! <!-- .element: class="fragment" -->
* First beta release january 2016 <!-- .element: class="fragment" -->
* 1.0.0 released february 2016 <!-- .element: class="fragment" -->

Note:
Fast forward to 2015. Existing JSTS lagged behind upstream, so I wanted to update it but not manually.

Issue "Automated port" opened at GitHub in May 2015 and I managed to get Martins interest and encouragement which motivated me alot.

I made rapid progress early 2016 with stable release 1.0.0 done in february 2016.


# How was it done?


# Existing tools

* Google Web Toolkit (GWT) <!-- .element: class="fragment" -->
* Eclipse VJET <!-- .element: class="fragment" -->

Note:
I first started to look at existing tools. The most known Java to JavaScript compiler is probably Google Web Toolkit.

The problem with Google Web Toolkit is that it obfuscates the Java API in the compiled JavaScript. Newer versions of Google Web Toolkit has some support to export APIs but it requires changes to the source and has also has restrictions. VJET seemed promising but activity stopped in early incubation process. My conclusion was that none of the existing tools did the trick.


# Learning stuff

* ES6 (aka. ECMAScript 2015) <!-- .element: class="fragment" -->
* Transpilation via Abstract Syntax Trees<!-- .element: class="fragment" -->
* ESTree, a JavaScript AST spec in JSON <!-- .element: class="fragment" -->
* Was it possible to translate JTS to JavaScript using transpilation? <!-- .element: class="fragment" -->

Note:
In 2015 I learned about ES6, the new version of JavaScript and that it could be transpiled to whatever version of JavaScript that existing browsers expects. The transpilation works with something called abstract syntax trees. Syntax trees have existed for a long time since they are used in compilators, and are also useful for integrated development environments for features like autocompletion and syntax checking. For JavaScript there is a defacto standard AST called ESTree represented as JSON.

Learning about this stuff made me think that perhaps it was possible to use transpilation to port JTS to JavaScript.


# Java parsing

* Javaparser <!-- .element: class="fragment" -->
* Missing type binding information <!-- .element: class="fragment" -->
* Eclipse JDT <!-- .element: class="fragment" -->
* java2estree <!-- .element: class="fragment" -->
* ESTree representation in Scala <!-- .element: class="fragment" -->
* JSON serializer (Jackson) <!-- .element: class="fragment" -->
* ESTree to JavaScript (Astring) <!-- .element: class="fragment" -->

Note:
To be able to do transpilation I would need a representation for Java. First I found Javaparser which is a very nice AST parser for Java, but after some experimentation I realized it missed a critical feature which was type binding information.

So I looked for alternatives and realized there must be both Java syntax tree parser and type binding information in an integrated development environment like Eclipse to provide code completion and syntax checking.

The result was java2estree, a tool I wrote to translate Java into ESTree JSON. I wrote jsts2estree in Scala, which by the way probably is my favourite language. With Scala I was able to define the whole ESTree specification in a serialisable structure with only 327 LOC and the code looks alot like the specification itself. To serialize the in memory structure into JSON I used the Java library Jackson, essentially making that a one liner.

I also needed a tool to turn ESTree JSON into JavaScript. There are many such tools available, the one I use is called Astring.


# Difficulties

* Java class != ES6 class <!-- .element: class="fragment" -->
* Overloading <!-- .element: class="fragment" -->

Note:
At first I thought ES6 would be a good target for the transformation because it introduces classes with similar syntax as Java. I got initial functionality working with ES6 but soon I hit hard to fix bugs and ugly workarounds where needed. It turns out classes in Java and ES6 have small but important differences which boils down to that Java has support for overloading and JavaScript does not.


<!-- -- data-transition="fade" -->
```js
export default class Coordinate {
  constructor(...args) {
    (() => {
      this.x = null;
      this.y = null;
      this.z = null;
    })();
    const overloads = (...args) => {
      switch (args.length) {
        case 0:
          return ((...args) => {
            let [] = args;
            overloads.call(this, 0.0, 0.0);
          })(...args);
        case 1:
          return ((...args) => {
            let [c] = args;
            overloads.call(this, c.x, c.y, c.z);
          })(...args);
        case 2:
          return ((...args) => {
            let [x, y] = args;
            overloads.call(this, x, y, Coordinate.NULL_ORDINATE);
          })(...args);
        case 3:
          return ((...args) => {
            let [x, y, z] = args;
            this.x = x;
            this.y = y;
            this.z = z;
          })(...args);
      }
    };
    return overloads.apply(this, args);
  }
```

Note:
The initial translated Coordinate class constructor in beta 1 looked quite terrible. It has too many nested levels of inner functions and uses the rest/spread operator to extract parameters.


<!-- -- data-transition="fade" -->
```js
export default class Coordinate {
  constructor(...args) {
    this.x = null;
    this.y = null;
    this.z = null;
    const overloaded = (...args) => {
      if (args.length === 0) {
        let [] = args;
        overloaded.call(this, 0.0, 0.0);
      } else if (args.length === 1) {
        let [c] = args;
        overloaded.call(this, c.x, c.y, c.z);
      } else if (args.length === 2) {
        let [x, y] = args;
        overloaded.call(this, x, y, Coordinate.NULL_ORDINATE);
      } else if (args.length === 3) {
        let [x, y, z] = args;
        this.x = x;
        this.y = y;
        this.z = z;
      }
    };
    return overloaded.apply(this, args);
  }
```

Note:
At beta 4 I was able to reduce the number of wrapper functions.


<!-- -- data-transition="fade" -->
```js
export default function Coordinate() {
  this.x = null;
  this.y = null;
  this.z = null;
  if (arguments.length === 0) {
    Coordinate.call(this, 0.0, 0.0);
  } else if (arguments.length === 1) {
    let c = arguments[0];
    Coordinate.call(this, c.x, c.y, c.z);
  } else if (arguments.length === 2) {
    let x = arguments[0], y = arguments[1];
    Coordinate.call(this, x, y, Coordinate.NULL_ORDINATE);
  } else if (arguments.length === 3) {
    let x = arguments[0], y = arguments[1], z = arguments[2];
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
```
.<br>
.<br>
.<br>

Note:
At release candidate 3 I reached the version used in the stable version which drops ES6 classes and does not use rest/spread operator.

The main reason for using a standard function was that an ES6 class constructor cannot call itself which in effect what I need to do to simulate Java overloading. For derived classes that needs to also call a superclass constructor this becomes even more complex.


# Difficulties

* Performance <!-- .element: class="fragment" -->
* IsValid test failures (DoubleBits) <!-- .element: class="fragment" -->

Note:
It also turned out that performance was actually alot worse than old JSTS 0.x until the final simplication for constructor and overloading translation.

One of the last bugs that had to be taken care of before making a stable relase was that I had some failing validity tests. The reason turned out to be DoubleBits, a part of JTS that uses bit manipulation to get better accuracy for some mathematical operations. So, in the end DoubleBits had to be manually translated and I guess that means I actually failed my goal to create an automated port. Oh well...



# Thanks for listening

* https://github.com/bjornharrtell/jsts/
