/*
  javascript.util is a port of selected parts of java.util to JavaScript which
  main purpose is to ease porting Java code to JavaScript.

  Copyright (C) 2011 by Björn Harrtell

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
(function() {var b=null;function d(){return function(){}}function e(a,c){var f=a.split("."),l=window;!(f[0]in l)&&l.execScript&&l.execScript("var "+f[0]);for(var m;f.length&&(m=f.shift());)!f.length&&c!==void 0?l[m]=c:l=l[m]?l[m]:l[m]={}}e("javascript.util.version","0.3.1");function g(a){this.message=a||""}e("javascript.util.OperationNotSupported",g);g.prototype=Error();g.prototype.name="OperationNotSupported";g.prototype.name=g.prototype.name;function h(a){this.message=a||""}
e("javascript.util.IndexOutOfBoundsException",h);h.prototype=Error();h.prototype.name="IndexOutOfBoundsException";h.prototype.name=h.prototype.name;function i(a){this.message=a||""}e("javascript.util.NoSuchElementException",i);i.prototype=Error();i.prototype.name="NoSuchElementException";i.prototype.name=i.prototype.name;e("javascript.util.SortedMap",d());function j(){}e("javascript.util.Map",j);j.prototype.get=d();j.prototype.get=j.prototype.get;j.prototype.put=d();j.prototype.put=j.prototype.put;
j.prototype.size=d();j.prototype.size=j.prototype.size;j.prototype.b=d();j.prototype.values=j.prototype.b;function k(){}e("javascript.util.Iterator",k);k.prototype.e=d();k.prototype.hasNext=k.prototype.e;k.prototype.next=d();k.prototype.next=k.prototype.next;k.prototype.remove=d();k.prototype.remove=k.prototype.remove;function n(){}e("javascript.util.Collection",n);n.prototype.add=d();n.prototype.add=n.prototype.add;n.prototype.g=d();n.prototype.isEmpty=n.prototype.g;n.prototype.f=d();
n.prototype.iterator=n.prototype.f;n.prototype.size=d();n.prototype.size=n.prototype.size;function o(){}e("javascript.util.List",o);o.prototype=new n;o.prototype.get=d();o.prototype.get=o.prototype.get;o.prototype.c=d();o.prototype.addAll=o.prototype.c;function p(a){this.a=[];a instanceof n&&this.c(a)}e("javascript.util.ArrayList",p);p.prototype=new o;p.prototype.a=b;p.prototype.add=function(a){this.a.push(a);return!0};p.prototype.add=p.prototype.add;
p.prototype.c=function(a){for(a=a.f();a.e();)this.add(a.next());return!0};p.prototype.addAll=p.prototype.c;p.prototype.f=function(){return new q(this)};p.prototype.iterator=p.prototype.f;p.prototype.get=function(a){if(a<0||a>=this.size())throw new h;return this.a[a]};p.prototype.get=p.prototype.get;p.prototype.g=function(){return this.a.length===0};p.prototype.isEmpty=p.prototype.g;p.prototype.size=function(){return this.a.length};p.prototype.size=p.prototype.size;function q(a){this.d=a}
p.Iterator=q;q.prototype.d=b;q.prototype.position=0;q.prototype.next=function(){if(this.position===this.d.size())throw new i;return this.d.get(this.position++)};q.prototype.next=q.prototype.next;q.prototype.e=function(){return this.position<this.d.size()?!0:!1};q.prototype.hasNext=q.prototype.e;q.prototype.remove=function(){throw new g;};q.prototype.remove=q.prototype.remove;function r(){this.object={}}e("javascript.util.HashMap",r);r.prototype.object=b;
r.prototype.get=function(a){return this.object[a]||b};r.prototype.get=r.prototype.get;r.prototype.put=function(a,c){return this.object[a]=c};r.prototype.put=r.prototype.put;r.prototype.b=function(){var a=new p,c;for(c in this.object)this.object.hasOwnProperty(c)&&a.add(this.object[c]);return a};r.prototype.values=r.prototype.b;r.prototype.size=function(){return this.b().size()};r.prototype.size=r.prototype.size;function s(){this.a=[]}e("javascript.util.TreeMap",s);s.prototype.a=b;
s.prototype.get=function(a){for(var c=0;c<this.a.length;c++){var f=this.a[c];if(f.key.compareTo(a)===0)return f.value}return b};s.prototype.get=s.prototype.get;s.prototype.put=function(a,c){var f=this.get(a);if(f){var l=f.value;f.value=c;return l}for(var l={key:a,value:c},m=0;m<this.a.length;m++)if(f=this.a[m],f.key.compareTo(a)===1)return this.a.splice(m,0,l),b;this.a.push({key:a,value:c});return b};s.prototype.put=s.prototype.put;
s.prototype.b=function(){for(var a=new p,c=0;c<this.a.length;c++)a.add(this.a[c].value);return a};s.prototype.values=s.prototype.b;s.prototype.size=function(){return this.b().size()};s.prototype.size=s.prototype.size;})();
