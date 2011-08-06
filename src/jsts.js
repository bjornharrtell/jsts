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
(function() {function b() {return function() {}}function c(a,i) {var o = a.split('.'), j = window;!(o[0] in j) && j.execScript && j.execScript('var ' + o[0]);for (var p; o.length && (p = o.shift());) !o.length && i !== void 0 ? j[p] = i : j = j[p] ? j[p] : j[p] = {}}function d(a) {this.message = a || ''}c('javascript.util.OperationNotSupported', d);d.prototype = Error();d.prototype.name = 'OperationNotSupported';d.prototype.name = d.prototype.name;function e(a) {this.message = a || ''}c('javascript.util.IndexOutOfBoundsException', e);e.prototype = Error();
e.prototype.name = 'IndexOutOfBoundsException';e.prototype.name = e.prototype.name;function f(a) {this.message = a || ''}c('javascript.util.NoSuchElementException', f);f.prototype = Error();f.prototype.name = 'NoSuchElementException';f.prototype.name = f.prototype.name;function g() {}c('javascript.util.Iterator', g);g.prototype.d = b();g.prototype.hasNext = g.prototype.d;g.prototype.next = b();g.prototype.next = g.prototype.next;g.prototype.remove = b();g.prototype.remove = g.prototype.remove;function h() {}
c('javascript.util.Collection', h);h.prototype.add = b();h.prototype.add = h.prototype.add;h.prototype.e = b();h.prototype.isEmpty = h.prototype.e;h.prototype.f = b();h.prototype.iterator = h.prototype.f;h.prototype.size = b();h.prototype.size = h.prototype.size;function k() {}c('javascript.util.List', k);k.prototype = new h;k.prototype.get = b();k.prototype.get = k.prototype.get;function l() {this.a = []}c('javascript.util.ArrayList', l);l.prototype = new k;l.prototype.a = null;l.prototype.add = function(a) {this.a.push(a);return!0};
l.prototype.add = l.prototype.add;l.prototype.f = function() {function a() {}a.prototype.c = this;a.prototype.position = 0;a.prototype.next = function() {if (this.position === this.c.size())throw new f;return this.c.get(this.position++)};a.prototype.next = a.prototype.next;a.prototype.d = function() {return this.position < this.c.size() ? !0 : !1};a.prototype.hasNext = a.prototype.d;a.prototype.remove = function() {throw new d;};a.prototype.remove = a.prototype.remove;return new a};l.prototype.iterator = l.prototype.f;
l.prototype.get = function(a) {if (a < 0 || a >= this.size())throw new e;return this.a[a]};l.prototype.get = l.prototype.get;l.prototype.e = function() {return this.a.length === 0};l.prototype.isEmpty = l.prototype.e;l.prototype.size = function() {return this.a.length};l.prototype.size = l.prototype.size;function m() {}c('javascript.util.Map', m);m.prototype.get = b();m.prototype.get = m.prototype.get;m.prototype.put = b();m.prototype.put = m.prototype.put;m.prototype.size = b();m.prototype.size = m.prototype.size;m.prototype.b = b();
m.prototype.values = m.prototype.b;function n() {this.object = {}}c('javascript.util.HashMap', n);n.prototype.object = null;n.prototype.get = function(a) {return this.object[a]};n.prototype.get = n.prototype.get;n.prototype.put = function(a,i) {return this.object[a] = i};n.prototype.put = n.prototype.put;n.prototype.b = function() {var a = new l, i;for (i in this.object)this.object.hasOwnProperty(i) && a.add(this.object[i]);return a};n.prototype.values = n.prototype.b;n.prototype.size = function() {return this.b().size()};
n.prototype.size = n.prototype.size;})();

