/* Copyright (c) 2011 by The Authors.
 * Published under the LGPL 2.1 license.
 * See /license-notice.txt for the full text of the license notice.
 * See /license.txt for the full text of the license.
 */

jsts = {
  version: '0.1-SNAPSHOT'
};


/**
 * Global function intended for use as a generic abstract method.
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
jsts.error.TopologyError = function(message) {
  this.name = 'TopologyError';
  this.message = message;
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

// inline inclusion of javascript.util
var javascript = function() {};javascript.util = function() {};javascript.util.OperationNotSupported = function(a) {if (a)this.message = a};javascript.util.OperationNotSupported.prototype = Error();javascript.util.OperationNotSupported.prototype.name = 'OperationNotSupported';javascript.util.IndexOutOfBoundsException = function(a) {if (a)this.message = a};javascript.util.IndexOutOfBoundsException.prototype = Error();javascript.util.IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';
javascript.util.NoSuchElementException = function(a) {if (a)this.message = a};javascript.util.NoSuchElementException.prototype = Error();javascript.util.NoSuchElementException.prototype.name = 'NoSuchElementException';javascript.util.Collection = function() {};javascript.util.Collection.prototype.add = function() {};javascript.util.Collection.prototype.isEmpty = function() {};javascript.util.Collection.prototype.iterator = function() {};javascript.util.Collection.prototype.size = function() {};javascript.util.List = function() {};
javascript.util.List.prototype.get = function() {};javascript.util.ArrayList = function() {this.array = []};javascript.util.ArrayList.prototype.array = null;javascript.util.ArrayList.prototype.add = function(a) {this.array.push(a);return!0};
javascript.util.ArrayList.prototype.iterator = function() {var a = function() {};a.prototype.arrayList = this;a.prototype.position = 0;a.prototype.next = function() {if (this.position === this.arrayList.size())throw new javascript.util.NoSuchElementException;return this.arrayList.get(this.position++)};a.prototype.hasNext = function() {return this.position < this.arrayList.size() ? !0 : !1};a.prototype.remove = function() {new javascript.util.OperationNotSupported};return new a};
javascript.util.ArrayList.prototype.get = function(a) {if (a < 0 || a >= this.size())throw new javascript.util.IndexOutOfBoundsException;return this.array[a]};javascript.util.ArrayList.prototype.isEmpty = function() {return this.array.length === 0};javascript.util.ArrayList.prototype.size = function() {return this.array.length};javascript.util.Iterator = function() {};javascript.util.Iterator.prototype.hasNext = function() {};javascript.util.Iterator.prototype.next = function() {};
javascript.util.Iterator.prototype.remove = function() {};
