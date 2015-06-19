/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

/** @namespace */
jsts = {
  version: '0.16.0',
  /** @namespace */
  algorithm: {
    /** @namespace */
    distance: {},
    /** @namespace */
    locate: {}
  },
  /** @namespace */
  error: {},
  /** @namespace */
  geom: {
    /** @namespace */
    util: {}
  },
  /** @namespace */
  geomgraph: {
    /** @namespace */
    index: {}
  },
  /** @namespace */
  index: {
    /** @namespace */
    bintree: {},
    /** @namespace */
    chain: {},
    /** @namespace */
    kdtree: {},
    /** @namespace */
    quadtree: {},
    /** @namespace */
    strtree: {}
  },
  /** @namespace */
  io: {},
  /** @namespace */
  noding: {
    /** @namespace */
    snapround: {}
  },
  /** @namespace */
  operation: {
    /** @namespace */
    buffer: {},
    /** @namespace */
    distance: {},
    /** @namespace */
    overlay: {
      /** @namespace */
      snap: {}
    },
    /** @namespace */
    polygonize: {},
    /** @namespace */
    predicate: {},
    /** @namespace */
    relate: {},
    /** @namespace */
    union: {},
    /** @namespace */
    valid: {}
  },
  /** @namespace */
  planargraph: {},
  /** @namespace */
  precision: {},
  /** @namespace */
  simplify: {},
  /** @namespace */
  triangulate: {
    /** @namespace */
    quadedge: {}
  },
  /** @namespace */
  util: {}
};

/**
 * Implement String.trim if native support is missing.
 */
if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}

/**
 * Implement Array.forEach if native support is missing.
 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
    if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

/**
 * Global function intended for use as a generic abstract method.
 * @private
 */
jsts.abstractFunc = function() {
  throw new jsts.error.AbstractMethodInvocationError();
};

jsts.error = {};



/**
 * @constructor
 */
jsts.error.IllegalArgumentError = function(message) {
  this.name = 'IllegalArgumentError';
  this.message = message;
};
jsts.error.IllegalArgumentError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.TopologyError = function(message, pt) {
  this.name = 'TopologyError';
  this.message = pt ? message + ' [ ' + pt + ' ]' : message;
};
jsts.error.TopologyError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.AbstractMethodInvocationError = function() {
  this.name = 'AbstractMethodInvocationError';
  this.message = 'Abstract method called, should be implemented in subclass.';
};
jsts.error.AbstractMethodInvocationError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.NotImplementedError = function() {
  this.name = 'NotImplementedError';
  this.message = 'This method has not yet been implemented.';
};
jsts.error.NotImplementedError.prototype = new Error();



/**
 * @constructor
 */
jsts.error.NotRepresentableError = function(message) {
  this.name = 'NotRepresentableError';
  this.message = message;
};
jsts.error.NotRepresentableError.prototype = new Error();



/**
 * @constructor message
 */
jsts.error.LocateFailureError = function(message) {
  this.name = 'LocateFailureError';
  this.message = message;
};
jsts.error.LocateFailureError.prototype = new Error();

if (typeof module !== "undefined") module.exports = jsts;

