import WKTWriter from '../../io/WKTWriter.js';
import HalfEdge from '../../edgegraph/HalfEdge.js';
import CoordinateArrays from '../../geom/CoordinateArrays.js';
export default class OverlayEdge extends HalfEdge {
  constructor() {
    super();
    OverlayEdge.constructor_.apply(this, arguments);
  }
  static constructor_() {
    this._pts = null;
    this._direction = null;
    this._dirPt = null;
    this._label = null;
    this._isInResultArea = false;
    this._isInResultLine = false;
    this._isVisited = false;
    this._nextResultEdge = null;
    this._edgeRing = null;
    this._maxEdgeRing = null;
    this._nextResultMaxEdge = null;
    let orig = arguments[0], dirPt = arguments[1], direction = arguments[2], label = arguments[3], pts = arguments[4];
    HalfEdge.constructor_.call(this, orig);
    this._dirPt = dirPt;
    this._direction = direction;
    this._pts = pts;
    this._label = label;
  }
  static createEdge(pts, lbl, direction) {
    let origin = null;
    let dirPt = null;
    if (direction) {
      origin = pts[0];
      dirPt = pts[1];
    } else {
      let ilast = pts.length - 1;
      origin = pts[ilast];
      dirPt = pts[ilast - 1];
    }
    return new OverlayEdge(origin, dirPt, direction, lbl, pts);
  }
  static createEdgePair(pts, lbl) {
    let e0 = OverlayEdge.createEdge(pts, lbl, true);
    let e1 = OverlayEdge.createEdge(pts, lbl, false);
    e0.link(e1);
    return e0;
  }
  static nodeComparator() {
    return new (class {
      get interfaces_() {
        return [Comparator<OverlayEdge>];
      }
      compare(e1, e2) {
        return e1.orig().compareTo(e2.orig());
      }
    })();
  }
  symOE() {
    return this.sym();
  }
  markInResultArea() {
    this._isInResultArea = true;
  }
  getCoordinates() {
    return this._pts;
  }
  nextResultMax() {
    return this._nextResultMaxEdge;
  }
  resultSymbol() {
    if (this._isInResultArea) return " resA";
    if (this._isInResultLine) return " resL";
    return "";
  }
  isInResultLine() {
    return this._isInResultLine;
  }
  getCoordinate() {
    return this.orig();
  }
  isInResultAreaBoth() {
    return this._isInResultArea && this.symOE()._isInResultArea;
  }
  directionPt() {
    return this._dirPt;
  }
  addCoordinates(coords) {
    let isFirstEdge = coords.size() > 0;
    if (this._direction) {
      let startIndex = 1;
      if (isFirstEdge) startIndex = 0;
      for (let i = startIndex; i < this._pts.length; i++) {
        coords.add(this._pts[i], false);
      }
    } else {
      let startIndex = this._pts.length - 2;
      if (isFirstEdge) startIndex = this._pts.length - 1;
      for (let i = startIndex; i >= 0; i--) {
        coords.add(this._pts[i], false);
      }
    }
  }
  nextResult() {
    return this._nextResultEdge;
  }
  getCoordinatesOriented() {
    if (this._direction) {
      return this._pts;
    }
    let copy = this._pts.clone();
    CoordinateArrays.reverse(copy);
    return copy;
  }
  setNextResultMax(e) {
    this._nextResultMaxEdge = e;
  }
  setEdgeRing(edgeRing) {
    this._edgeRing = edgeRing;
  }
  isInResultEither() {
    return this.isInResult() || this.symOE().isInResult();
  }
  getEdgeRingMax() {
    return this._maxEdgeRing;
  }
  isResultLinked() {
    return this._nextResultEdge !== null;
  }
  isForward() {
    return this._direction;
  }
  setEdgeRingMax(maximalEdgeRing) {
    this._maxEdgeRing = maximalEdgeRing;
  }
  unmarkFromResultAreaBoth() {
    this._isInResultArea = false;
    this.symOE()._isInResultArea = false;
  }
  markInResultLine() {
    this._isInResultLine = true;
    this.symOE()._isInResultLine = true;
  }
  getLabel() {
    return this._label;
  }
  markVisitedBoth() {
    this.markVisited();
    this.symOE().markVisited();
  }
  isResultMaxLinked() {
    return this._nextResultMaxEdge !== null;
  }
  getLocation(index, position) {
    return this._label.getLocation(index, position, this._direction);
  }
  markVisited() {
    this._isVisited = true;
  }
  oNextOE() {
    return this.oNext();
  }
  setNextResult(e) {
    this._nextResultEdge = e;
  }
  toString() {
    let orig = this.orig();
    let dest = this.dest();
    let dirPtStr = this._pts.length > 2 ? ", " + WKTWriter.format(this.directionPt()) : "";
    return "OE( " + WKTWriter.format(orig) + dirPtStr + " .. " + WKTWriter.format(dest) + " ) " + this._label.toString(this._direction) + this.resultSymbol() + " / Sym: " + this.symOE().getLabel().toString(this.symOE()._direction) + this.symOE().resultSymbol();
  }
  getEdgeRing() {
    return this._edgeRing;
  }
  isInResultArea() {
    return this._isInResultArea;
  }
  isInResult() {
    return this._isInResultArea || this._isInResultLine;
  }
  isVisited() {
    return this._isVisited;
  }
  markInResultAreaBoth() {
    this._isInResultArea = true;
    this.symOE()._isInResultArea = true;
  }
}
